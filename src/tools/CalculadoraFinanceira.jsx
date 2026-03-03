import { useState, useEffect, useRef, useCallback } from "react";

const TAXA_ANUAL = 0.05;
const TAXA_MENSAL = Math.pow(1 + TAXA_ANUAL, 1 / 12) - 1;

function fmt(v) {
  return (
    "R$ " +
    v.toLocaleString("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

function fmtDec(v) {
  return (
    "R$ " +
    v.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function calcularDados(idadeAtual, idadeMeta, patrimonioInicial, aporteMensal) {
  const anos = Math.max(1, idadeMeta - idadeAtual);
  const meses = anos * 12;

  let saldo = patrimonioInicial;
  for (let m = 1; m <= meses; m++) {
    saldo = saldo * (1 + TAXA_MENSAL) + aporteMensal;
  }

  const totalInvestido = patrimonioInicial + aporteMensal * meses;
  const jurosGanhos = saldo - totalInvestido;
  const rendaPassiva = saldo * TAXA_MENSAL;

  const extra = 200;
  let saldoNorm = patrimonioInicial;
  let mesesAntecipado = 0;
  for (let m = 1; m <= meses; m++) {
    saldoNorm = saldoNorm * (1 + TAXA_MENSAL) + aporteMensal + extra;
    if (saldoNorm >= saldo && mesesAntecipado === 0) {
      mesesAntecipado = meses - m;
    }
  }
  const anosAntec = (mesesAntecipado / 12).toFixed(1);

  const mid1Age = Math.round(idadeAtual + anos / 3);
  const mid2Age = Math.round(idadeAtual + (2 * anos) / 3);

  return {
    anos,
    meses,
    saldo,
    totalInvestido,
    jurosGanhos,
    rendaPassiva,
    anosAntec,
    mid1Age,
    mid2Age,
    extra,
  };
}

function desenharGrafico(canvas, patrimonioInicial, aporteMensal, meses) {
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = 200 * dpr;
  canvas.style.width = rect.width + "px";
  canvas.style.height = "200px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const W = rect.width,
    H = 200;
  ctx.clearRect(0, 0, W, H);

  const steps = 80;
  const values = [];
  for (let i = 0; i <= steps; i++) {
    const m = Math.round((i * meses) / steps);
    let sv = patrimonioInicial;
    for (let mm = 1; mm <= m; mm++) sv = sv * (1 + TAXA_MENSAL) + aporteMensal;
    values.push(sv);
  }

  const maxV = Math.max(...values);
  const padX = 8,
    padY = 16;
  const px = (i) => padX + (i / steps) * (W - padX * 2);
  const py = (v) => H - padY - (v / maxV) * (H - padY * 2);

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "rgba(46,204,113,0.25)");
  grad.addColorStop(1, "rgba(46,204,113,0.01)");
  ctx.beginPath();
  ctx.moveTo(px(0), py(values[0]));
  for (let i = 1; i <= steps; i++) ctx.lineTo(px(i), py(values[i]));
  ctx.lineTo(px(steps), H - padY);
  ctx.lineTo(px(0), H - padY);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(px(0), py(values[0]));
  for (let i = 1; i <= steps; i++) ctx.lineTo(px(i), py(values[i]));
  ctx.strokeStyle = "#2ECC71";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  const dotPositions = [0, Math.round(steps / 3), Math.round((2 * steps) / 3), steps];
  dotPositions.forEach((i, idx) => {
    const x = px(i),
      y = py(values[i]);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = idx === dotPositions.length - 1 ? "#F39C12" : "#fff";
    ctx.strokeStyle = idx === dotPositions.length - 1 ? "#F39C12" : "#2ECC71";
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();
  });
}

/* ── Icons ── */
const IconTrend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconBolt = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F39C12" strokeWidth="2.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ── Styles ── */
const styles = {
  root: {
    fontFamily: "'Work Sans', -apple-system, sans-serif",
    color: "#1A2332",
    overflowX: "hidden",
    width: "100%",
  },
  container: { maxWidth: 1000, margin: "0 auto", padding: "0 16px", width: "100%", boxSizing: "border-box" },
  h1: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 28,
    fontWeight: 800,
    color: "#1A2332",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7A99",
    marginBottom: 32,
    maxWidth: 260,
    lineHeight: 1.5,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "290px 1fr",
    gap: 24,
    alignItems: "start",
    overflow: "hidden",
  },
  controls: { display: "flex", flexDirection: "column", gap: 12 },
  card: {
    background: "#FFFFFF",
    border: "1px solid #E8EDF5",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6B7A99",
    marginBottom: 10,
  },
  ageRow: { display: "flex", alignItems: "center", gap: 8 },
  ageInput: {
    width: 70,
    fontSize: 22,
    fontWeight: 700,
    border: "none",
    background: "transparent",
    color: "#1A2332",
    outline: "none",
    fontFamily: "inherit",
    MozAppearance: "textfield",
  },
  ageLabel: { fontSize: 11, color: "#6B7A99", alignSelf: "flex-end", paddingBottom: 4 },
  ageSep: { flex: 1, height: 1, background: "#E8EDF5", margin: "0 4px" },
  valueRow: { display: "flex", alignItems: "baseline", gap: 4 },
  currencyPrefix: { fontSize: 14, fontWeight: 600, color: "#6B7A99" },
  valueInput: {
    fontSize: 20,
    fontWeight: 700,
    border: "none",
    background: "transparent",
    color: "#1A2332",
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
    MozAppearance: "textfield",
    minWidth: 0,
  },
  rateRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  rateLabelInner: { fontSize: 13, color: "#6B7A99", display: "flex", alignItems: "center", gap: 6 },
  rateValue: { fontSize: 18, fontWeight: 700, color: "#27AE60" },
  btnGenerate: {
    background: "#2ECC71",
    color: "white",
    border: "none",
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "inherit",
    transition: "background 0.2s, transform 0.1s",
  },
  results: {
    background: "#FFFFFF",
    border: "1px solid #E8EDF5",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
    minWidth: 0,
    overflow: "hidden",
  },
  resultsHeader: { marginBottom: 20 },
  resultsEyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#27AE60",
    marginBottom: 4,
  },
  resultsTitle: { fontFamily: "'Work Sans', sans-serif", fontSize: 22, fontWeight: 800 },
  resultsTitleHighlight: { color: "#F39C12" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 12,
  },
  totalLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6B7A99",
    marginBottom: 2,
  },
  totalValue: { fontSize: 28, fontWeight: 800, color: "#1A2332", lineHeight: 1, wordBreak: "break-word" },
  independenceBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    color: "#27AE60",
    fontWeight: 600,
    marginTop: 4,
  },
  chartArea: { position: "relative", height: 200, margin: "20px 0 8px", overflow: "hidden" },
  chartLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 10,
    color: "#6B7A99",
    fontWeight: 500,
    padding: "0 2px",
    marginBottom: 24,
  },
  chartLabelLast: { color: "#F39C12", fontWeight: 700 },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    paddingTop: 20,
    borderTop: "1px solid #E8EDF5",
  },
  statLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6B7A99",
    marginBottom: 6,
  },
  statValue: { fontSize: 18, fontWeight: 700, wordBreak: "break-word" },
  statUnderline: { height: 2, borderRadius: 2, marginTop: 6, width: 40 },
  tipsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 },
  tipCard: { background: "#F0FAF5", borderRadius: 14, padding: 16 },
  tipCardOrange: { background: "#FFF8EC", borderRadius: 14, padding: 16 },
  tipH4: { fontSize: 13, fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 },
  tipP: { fontSize: 12, color: "#6B7A99", lineHeight: 1.5 },
};

/* ── Responsive CSS (injected once) ── */
const responsiveCSS = `
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }

  @media (max-width: 768px) {
    .calc-layout-grid {
      grid-template-columns: 1fr !important;
    }
    .calc-results-header-row {
      flex-direction: column !important;
      gap: 8px !important;
    }
    .calc-results-header-row > div:last-child {
      text-align: left !important;
    }
    .calc-results-title-el {
      font-size: 18px !important;
    }
    .calc-total-value-el {
      font-size: 22px !important;
    }
    .calc-stats-grid {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 8px !important;
    }
    .calc-stats-grid .calc-stat-val {
      font-size: 14px !important;
    }
    .calc-tips-grid {
      grid-template-columns: 1fr !important;
    }
    .calc-chart-labels-el {
      font-size: 9px !important;
      gap: 2px !important;
    }
    .calc-results-panel {
      padding: 16px !important;
      border-radius: 14px !important;
    }
    .calc-card-el {
      padding: 14px !important;
      border-radius: 12px !important;
    }
  }
`;

/* ── Component ── */
export default function CalculadoraFinanceira() {
  const [idadeAtual, setIdadeAtual] = useState(25);
  const [idadeMeta, setIdadeMeta] = useState(55);
  const [patrimonioAtual, setPatrimonioAtual] = useState(50000);
  const [aporteMensal, setAporteMensal] = useState(2500);
  const canvasRef = useRef(null);

  const dados = calcularDados(idadeAtual, idadeMeta, patrimonioAtual, aporteMensal);

  const redrawChart = useCallback(() => {
    if (canvasRef.current) {
      desenharGrafico(canvasRef.current, patrimonioAtual, aporteMensal, dados.meses);
    }
  }, [patrimonioAtual, aporteMensal, dados.meses]);

  useEffect(() => {
    redrawChart();
    window.addEventListener("resize", redrawChart);
    return () => window.removeEventListener("resize", redrawChart);
  }, [redrawChart]);

  return (
    <>
      <style>{responsiveCSS}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <div style={styles.root}>
        <div style={styles.container}>
          <h1 style={styles.h1}>Monte sua Jornada</h1>
          <p style={styles.subtitle}>
            Ajuste os valores para visualizar seu futuro financeiro em tempo real.
          </p>

          <div className="calc-layout-grid" style={styles.layout}>
            {/* Controls */}
            <div style={styles.controls}>
              <div className="calc-card-el" style={styles.card}>
                <div style={styles.cardLabel}>Idade Atual e Meta</div>
                <div style={styles.ageRow}>
                  <input
                    style={styles.ageInput}
                    type="number"
                    value={idadeAtual}
                    min={18}
                    max={80}
                    onChange={(e) => setIdadeAtual(parseInt(e.target.value) || 18)}
                  />
                  <span style={styles.ageLabel}>anos</span>
                  <div style={styles.ageSep} />
                  <input
                    style={styles.ageInput}
                    type="number"
                    value={idadeMeta}
                    min={20}
                    max={90}
                    onChange={(e) => setIdadeMeta(parseInt(e.target.value) || 55)}
                  />
                  <span style={styles.ageLabel}>anos</span>
                </div>
              </div>

              <div className="calc-card-el" style={styles.card}>
                <div style={styles.cardLabel}>Patrimônio Atual</div>
                <div style={styles.valueRow}>
                  <span style={styles.currencyPrefix}>R$</span>
                  <input
                    style={styles.valueInput}
                    type="number"
                    value={patrimonioAtual}
                    min={0}
                    step={1000}
                    onChange={(e) => setPatrimonioAtual(parseFloat(e.target.value) || 0)}
                    onBlur={(e) => { if (!e.target.value) setPatrimonioAtual(0); }}
                  />
                </div>
              </div>

              <div className="calc-card-el" style={styles.card}>
                <div style={styles.cardLabel}>Aporte Mensal</div>
                <div style={styles.valueRow}>
                  <span style={styles.currencyPrefix}>R$</span>
                  <input
                    style={styles.valueInput}
                    type="number"
                    value={aporteMensal}
                    min={0}
                    step={100}
                    onChange={(e) => setAporteMensal(parseFloat(e.target.value) || 0)}
                    onBlur={(e) => { if (!e.target.value) setAporteMensal(0); }}
                  />
                </div>
              </div>

              <div className="calc-card-el" style={styles.card}>
                <div style={styles.cardLabel}>Rentabilidade Real</div>
                <div style={styles.rateRow}>
                  <span style={styles.rateLabelInner}>
                    <IconTrend />
                    Taxa de Juros Real
                  </span>
                  <span style={styles.rateValue}>5% /ano</span>
                </div>
              </div>

              <button
                style={styles.btnGenerate}
                onClick={redrawChart}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#27AE60")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#2ECC71")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <IconStar />
                Gerar Planejamento
              </button>
            </div>

            {/* Results */}
            <div className="calc-results-panel" style={styles.results}>
              <div style={styles.resultsHeader}>
                <div style={styles.resultsEyebrow}>Crescimento Estimado</div>
                <div className="calc-results-header-row" style={styles.headerRow}>
                  <div className="calc-results-title-el" style={styles.resultsTitle}>
                    Seu futuro em <span style={styles.resultsTitleHighlight}>{dados.anos}</span> anos
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={styles.totalLabel}>Total Acumulado</div>
                    <div className="calc-total-value-el" style={styles.totalValue}>{fmt(dados.saldo)}</div>
                    <div style={styles.independenceBadge}>
                      <IconCheck />
                      Independência Alcançada aos {idadeMeta}
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.chartArea}>
                <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
              </div>
              <div className="calc-chart-labels-el" style={styles.chartLabels}>
                <span>HOJE ({idadeAtual})</span>
                <span>{dados.mid1Age} ANOS</span>
                <span>{dados.mid2Age} ANOS</span>
                <span style={styles.chartLabelLast}>META ({idadeMeta} ANOS)</span>
              </div>

              <div className="calc-stats-grid" style={styles.statsRow}>
                <div>
                  <div style={styles.statLabel}>Total Investido</div>
                  <div className="calc-stat-val" style={styles.statValue}>{fmt(dados.totalInvestido)}</div>
                  <div style={{ ...styles.statUnderline, background: "#CDD5E0" }} />
                </div>
                <div>
                  <div style={styles.statLabel}>Juros Ganhos</div>
                  <div className="calc-stat-val" style={{ ...styles.statValue, color: "#27AE60" }}>{fmt(dados.jurosGanhos)}</div>
                  <div style={{ ...styles.statUnderline, background: "#2ECC71" }} />
                </div>
                <div>
                  <div style={styles.statLabel}>Renda Passiva</div>
                  <div className="calc-stat-val" style={{ ...styles.statValue, color: "#F39C12" }}>{fmtDec(dados.rendaPassiva)} /mês</div>
                  <div style={{ ...styles.statUnderline, background: "#F39C12" }} />
                </div>
              </div>

              <div className="calc-tips-grid" style={styles.tipsRow}>
                <div style={styles.tipCard}>
                  <h4 style={styles.tipH4}>
                    <IconBolt />
                    Otimização de Aportes
                  </h4>
                  <p style={styles.tipP}>
                    Adicionar apenas R$ {dados.extra.toLocaleString("pt-BR")} extras por mês
                    anteciparia sua independência em {dados.anosAntec} anos.
                  </p>
                </div>
                <div style={styles.tipCardOrange}>
                  <h4 style={styles.tipH4}>
                    <IconShield />
                    Poder de Compra
                  </h4>
                  <p style={styles.tipP}>
                    Este cálculo já utiliza juros reais (acima da inflação), garantindo o valor
                    real hoje.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
