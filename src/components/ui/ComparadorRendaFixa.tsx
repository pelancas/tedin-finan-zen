import { useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type RateType = "prefixado" | "cdi" | "cdi_spread" | "ipca";
type TimeUnit = "months" | "years";

interface InvestmentSide {
  type: string;
  rateType: RateType;
  rateValue: number;
}

interface Results {
  netAnnualA: number;
  netAnnualB: number;
  grossA: number;
  grossB: number;
  netGainA: number;
  netGainB: number;
  irRate: number;
  winA: boolean;
  months: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const INVESTMENT_TYPES = [
  "CDB",
  "LCI",
  "LCA",
  "LC",
  "LIG",
  "CRI",
  "CRA",
  "DEBÊNTURE",
  "DEBÊNTURE INCENTIVADA",
  "TESOURO DIRETO",
];

const TAX_EXEMPT: Record<string, boolean> = {
  LCI: true,
  LCA: true,
  LC: false,
  LIG: true,
  CRI: true,
  CRA: true,
  DEBÊNTURE: false,
  "DEBÊNTURE INCENTIVADA": true,
  CDB: false,
  "TESOURO DIRETO": false,
};

const RATE_LABELS: Record<RateType, string> = {
  prefixado: "% a.a.",
  cdi: "% do CDI",
  cdi_spread: "% a.a.",
  ipca: "% a.a.",
};

const RATE_PREFIXES: Record<RateType, string | null> = {
  prefixado: null,
  cdi: null,
  cdi_spread: "CDI +",
  ipca: "IPCA +",
};

const RATE_DEFAULTS: Record<RateType, number> = {
  prefixado: 13,
  cdi: 120,
  cdi_spread: 2,
  ipca: 6,
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: "'Work Sans', sans-serif",
    background: "#F7F9FC",
    color: "#1A2332",
    minHeight: "100vh",
    padding: "32px 16px 48px",
  },
  wrapper: {
    maxWidth: 920,
    margin: "0 auto",
  },
  header: {
    marginBottom: 32,
  },
  h1: {
    fontSize: 28,
    fontWeight: 800,
    color: "#1A2332",
    letterSpacing: -0.5,
    margin: 0,
  },
  headerP: {
    fontSize: 14,
    fontWeight: 400,
    color: "#6B7A90",
    marginTop: 4,
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 2px 12px rgba(26,35,50,0.07)",
  },
  baseRates: {
    background: "#ffffff",
    borderRadius: 16,
    padding: "14px 20px",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 24,
    boxShadow: "0 2px 12px rgba(26,35,50,0.07)",
    flexWrap: "wrap" as const,
  },
  baseRatePill: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    fontWeight: 500,
    color: "#6B7A90",
  },
  dot: (color: string): React.CSSProperties => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: color,
    display: "inline-block",
  }),
  timeCard: {
    background: "#ffffff",
    borderRadius: 16,
    padding: "20px 24px",
    marginBottom: 20,
    boxShadow: "0 2px 12px rgba(26,35,50,0.07)",
    display: "flex",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap" as const,
  },
  timeLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1A2332",
    letterSpacing: 0.3,
    whiteSpace: "nowrap" as const,
  },
  timeInputGroup: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 200,
  },
  timeInput: {
    width: 100,
    border: "none",
    background: "#F7F9FC",
    borderRadius: 10,
    padding: "10px 14px",
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#1A2332",
    outline: "none",
  },
  unitToggle: {
    display: "flex",
    background: "#F7F9FC",
    borderRadius: 10,
    padding: 3,
    gap: 2,
  },
  unitBtn: (active: boolean): React.CSSProperties => ({
    border: "none",
    background: active ? "#ffffff" : "transparent",
    padding: "7px 16px",
    borderRadius: 8,
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: active ? "#27AE60" : "#6B7A90",
    cursor: "pointer",
    boxShadow: active ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.2s",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginBottom: 20,
  },
  invCard: (color: string): React.CSSProperties => ({
    background: "#ffffff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 2px 12px rgba(26,35,50,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    borderTop: `3px solid ${color}`,
  }),
  cardTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
    color: "#6B7A90",
  },
  tagDot: (color: string): React.CSSProperties => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: color,
  }),
  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#6B7A90",
    letterSpacing: 0.3,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  infoIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 15,
    height: 15,
    borderRadius: "50%",
    background: "#E2E8F0",
    fontSize: 9,
    fontWeight: 700,
    color: "#6B7A90",
    cursor: "help",
    position: "relative" as const,
  },
  select: {
    width: "100%",
    border: "none",
    background: "#F7F9FC",
    borderRadius: 10,
    padding: "11px 36px 11px 14px",
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: "#1A2332",
    appearance: "none" as const,
    cursor: "pointer",
    outline: "none",
  },
  rateToggle: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap" as const,
  },
  rateBtn: (active: boolean, color: string): React.CSSProperties => ({
    border: `1.5px solid ${active ? color : "#E2E8F0"}`,
    background: active ? color : "transparent",
    borderRadius: 8,
    padding: "6px 12px",
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: active ? "#fff" : "#6B7A90",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    transition: "all 0.2s",
  }),
  rateRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#F7F9FC",
    borderRadius: 10,
    padding: "10px 14px",
  },
  ratePrefix: {
    fontSize: 12,
    fontWeight: 500,
    color: "#6B7A90",
    whiteSpace: "nowrap" as const,
    minWidth: 60,
  },
  rateInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#1A2332",
    outline: "none",
    width: 0,
    minWidth: 0,
  },
  rateSuffix: {
    fontSize: 14,
    fontWeight: 600,
    color: "#6B7A90",
  },
  taxBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 6,
    background: "#E8FAF1",
    color: "#27AE60",
  },
  calcBtn: {
    width: "100%",
    padding: 16,
    border: "none",
    borderRadius: 16,
    background: "linear-gradient(135deg, #27AE60, #2ECC71)",
    color: "#fff",
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 0.3,
    boxShadow: "0 4px 16px rgba(39,174,96,0.35)",
    marginBottom: 20,
    transition: "all 0.2s",
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 16,
  },
  resultCard: (gradient: string): React.CSSProperties => ({
    borderRadius: 16,
    padding: 22,
    position: "relative",
    overflow: "hidden",
    background: gradient,
    color: "#fff",
  }),
  resLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
    opacity: 0.85,
    marginBottom: 4,
  },
  resType: {
    fontSize: 14,
    fontWeight: 600,
    opacity: 0.9,
    marginBottom: 12,
  },
  resRate: {
    fontSize: 40,
    fontWeight: 800,
    letterSpacing: -1,
    lineHeight: 1,
  },
  resRateSpan: {
    fontSize: 18,
    fontWeight: 600,
    opacity: 0.85,
  },
  resSub: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 8,
    fontWeight: 500,
  },
  winnerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    padding: "4px 10px",
    fontSize: 11,
    fontWeight: 700,
    marginTop: 10,
  },
  verdictCard: (isGreen: boolean): React.CSSProperties => ({
    background: "#ffffff",
    borderRadius: 16,
    padding: "22px 24px",
    boxShadow: "0 2px 12px rgba(26,35,50,0.07)",
    borderLeft: `4px solid ${isGreen ? "#2ECC71" : "#F39C12"}`,
    marginBottom: 0,
  }),
  verdictText: {
    fontSize: 14,
    fontWeight: 400,
    color: "#1A2332",
    lineHeight: 1.65,
    margin: 0,
  },
  disclaimer: {
    textAlign: "center" as const,
    fontSize: 12,
    color: "#6B7A90",
    marginTop: 16,
    fontWeight: 400,
  },
  cdiInput: {
    width: 70,
    border: "none",
    background: "#F7F9FC",
    borderRadius: 8,
    padding: "5px 8px",
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#1A2332",
    outline: "none",
  },
  selectWrapper: {
    position: "relative" as const,
  },
  selectArrow: {
    position: "absolute" as const,
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6B7A90",
    fontSize: 12,
    pointerEvents: "none" as const,
  },
};

// ─── Helper functions ─────────────────────────────────────────────────────────
function irRate(months: number): number {
  if (months <= 6) return 0.225;
  if (months <= 12) return 0.2;
  if (months <= 24) return 0.175;
  return 0.15;
}

function fmt(n: number): string {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InvestmentCardProps {
  side: "a" | "b";
  color: string;
  label: string;
  investment: InvestmentSide;
  onChange: (next: InvestmentSide) => void;
}

function InvestmentCard({
  side,
  color,
  label,
  investment,
  onChange,
}: InvestmentCardProps) {
  const rateTypes: RateType[] = ["prefixado", "cdi", "cdi_spread", "ipca"];
  const rateTypeLabels: Record<RateType, string> = {
    prefixado: "Pré-fixado",
    cdi: "% do CDI",
    cdi_spread: "CDI + Taxa",
    ipca: "IPCA + Taxa",
  };

  const isExempt = TAX_EXEMPT[investment.type];
  const prefix = RATE_PREFIXES[investment.rateType];
  const suffix = RATE_LABELS[investment.rateType];

  function handleRateTypeChange(rt: RateType) {
    onChange({
      ...investment,
      rateType: rt,
      rateValue: RATE_DEFAULTS[rt],
    });
  }

  return (
    <div style={styles.invCard(color)}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={styles.cardTag}>
          <div style={styles.tagDot(color)} />
          {label}
        </div>
        {isExempt && <span style={styles.taxBadge}>✓ Isento IR</span>}
      </div>

      {/* Tipo de investimento */}
      <div style={styles.fieldGroup}>
        <div style={styles.fieldLabel}>
          Tipo de investimento{" "}
          <span style={styles.infoIcon} title="Escolha o título de renda fixa">
            i
          </span>
        </div>
        <div style={styles.selectWrapper}>
          <select
            value={investment.type}
            onChange={(e) => onChange({ ...investment, type: e.target.value })}
            style={styles.select}
          >
            {INVESTMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span style={styles.selectArrow}>▾</span>
        </div>
      </div>

      {/* Tipo de rentabilidade */}
      <div style={styles.fieldGroup}>
        <div style={styles.fieldLabel}>Tipo de rentabilidade</div>
        <div style={styles.rateToggle}>
          {rateTypes.map((rt) => (
            <button
              key={rt}
              style={styles.rateBtn(investment.rateType === rt, color)}
              onClick={() => handleRateTypeChange(rt)}
            >
              {rateTypeLabels[rt]}
            </button>
          ))}
        </div>
      </div>

      {/* Rentabilidade */}
      <div style={styles.fieldGroup}>
        <div style={styles.fieldLabel}>
          Rentabilidade{" "}
          <span style={styles.infoIcon} title="Taxa anual bruta">
            i
          </span>
        </div>
        <div style={styles.rateRow}>
          {prefix && <span style={styles.ratePrefix}>{prefix}</span>}
          <input
            type="number"
            value={investment.rateValue}
            step={investment.rateType === "cdi" ? 1 : 0.1}
            min={0}
            onChange={(e) =>
              onChange({ ...investment, rateValue: parseFloat(e.target.value) || 0 })
            }
            style={styles.rateInput}
          />
          <span style={styles.rateSuffix}>{suffix}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ComparadorRendaFixa() {
  const [cdiRate, setCdiRate] = useState(14.65);
  const [timeValue, setTimeValue] = useState(12);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("months");
  const [results, setResults] = useState<Results | null>(null);

  const [investA, setInvestA] = useState<InvestmentSide>({
    type: "LCA",
    rateType: "prefixado",
    rateValue: 13,
  });

  const [investB, setInvestB] = useState<InvestmentSide>({
    type: "CDB",
    rateType: "cdi",
    rateValue: 120,
  });

  const months = timeUnit === "years" ? Math.round(timeValue * 12) : timeValue;
  const timeEquiv =
    timeUnit === "years"
      ? `= ${months} meses`
      : `= ${(timeValue / 12).toFixed(1)} anos`;

  function getAnnualRate(inv: InvestmentSide): number {
    const cdi = cdiRate / 100;
    const ipca = 0.045;
    const val = inv.rateValue / 100;
    if (inv.rateType === "prefixado") return val;
    if (inv.rateType === "cdi") return cdi * val;
    if (inv.rateType === "cdi_spread") return cdi + val;
    if (inv.rateType === "ipca") return ipca + val;
    return val;
  }

  const calculate = useCallback(() => {
    const rateA = getAnnualRate(investA);
    const rateB = getAnnualRate(investB);
    const exemptA = TAX_EXEMPT[investA.type];
    const exemptB = TAX_EXEMPT[investB.type];
    const ir = irRate(months);

    const monthRateA = Math.pow(1 + rateA, 1 / 12) - 1;
    const monthRateB = Math.pow(1 + rateB, 1 / 12) - 1;

    const grossA = Math.pow(1 + monthRateA, months) - 1;
    const grossB = Math.pow(1 + monthRateB, months) - 1;

    const netGainA = exemptA ? grossA : grossA * (1 - ir);
    const netGainB = exemptB ? grossB : grossB * (1 - ir);

    const netAnnualA = (Math.pow(1 + netGainA, 12 / months) - 1) * 100;
    const netAnnualB = (Math.pow(1 + netGainB, 12 / months) - 1) * 100;

    setResults({
      netAnnualA,
      netAnnualB,
      grossA: rateA * 100,
      grossB: rateB * 100,
      netGainA,
      netGainB,
      irRate: ir,
      winA: netAnnualA >= netAnnualB,
      months,
    });
  }, [investA, investB, cdiRate, months]);

  // ── Verdict text ──────────────────────────────────────────────────────────
  function buildVerdict(r: Results) {
    const timeLabel = r.months === 1 ? "1 mês" : `${r.months} meses`;
    const diff = Math.abs(r.netAnnualA - r.netAnnualB).toFixed(2).replace(".", ",");
    const winner = r.winA ? investA.type : investB.type;
    const loser = r.winA ? investB.type : investA.type;
    const winRate = r.winA ? r.netAnnualA : r.netAnnualB;

    const principal = 1000;
    const finalA = principal * (1 + r.netGainA);
    const finalB = principal * (1 + r.netGainB);
    const yieldA = finalA - principal;
    const yieldB = finalB - principal;

    const exemptA = TAX_EXEMPT[investA.type];
    const exemptB = TAX_EXEMPT[investB.type];
    const irLabel_A = exemptA ? "Isento de IR" : `IR ${(r.irRate * 100).toFixed(1)}%`;
    const irLabel_B = exemptB ? "Isento de IR" : `IR ${(r.irRate * 100).toFixed(1)}%`;

    return {
      netAnnualAFmt: r.netAnnualA.toFixed(2).replace(".", ","),
      netAnnualBFmt: r.netAnnualB.toFixed(2).replace(".", ","),
      timeLabel,
      diff,
      winner,
      loser,
      finalA,
      finalB,
      yieldA,
      yieldB,
      irLabel_A,
      irLabel_B,
      exemptAny: exemptA || exemptB,
    };
  }

  // ── Responsive grid (simple media-query via CSS-in-JS workaround) ──────────
  const isNarrow = typeof window !== "undefined" && window.innerWidth <= 640;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @media (max-width: 640px) {
          .renda-fixa-grid { grid-template-columns: 1fr !important; }
          .renda-fixa-results-grid { grid-template-columns: 1fr !important; }
        }
        .calc-btn-hover:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(39,174,96,0.45) !important;
        }
        .calc-btn-hover:active { transform: translateY(0); }
        .select-focus:focus { background: #EBF9F2 !important; }
        .time-input:focus { background: #EBF9F2 !important; }
      `}</style>

      <div style={styles.root}>
        <div style={styles.wrapper}>

          {/* Header */}
          <header style={styles.header}>
            <h1 style={styles.h1}>Comparador de Renda Fixa</h1>
            <p style={styles.headerP}>
              Compare dois investimentos e descubra qual rende mais para o seu perfil
            </p>
          </header>

          {/* Base rates bar */}
          <div style={styles.baseRates}>
            <div style={styles.baseRatePill}>
              <span style={styles.dot("#2ECC71")} />
              CDI:{" "}
              <strong style={{ color: "#1A2332", fontWeight: 700 }}>
                {cdiRate.toFixed(2).replace(".", ",")}%
              </strong>{" "}
              a.a.
            </div>
            <div style={styles.baseRatePill}>
              <span style={styles.dot("#F39C12")} />
              IPCA: <strong style={{ color: "#1A2332", fontWeight: 700 }}>4,50%</strong> a.a.
            </div>
            <span style={{ fontSize: 11, color: "#6B7A90", marginLeft: "auto" }}>
              Taxas de referência · atualizar se necessário
            </span>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#6B7A90" }}>CDI %</span>
              <input
                type="number"
                value={cdiRate}
                step={0.01}
                onChange={(e) => setCdiRate(parseFloat(e.target.value) || 0)}
                style={styles.cdiInput}
                className="select-focus"
              />
            </div>
          </div>

          {/* Time card */}
          <div style={styles.timeCard}>
            <label style={styles.timeLabel}>⏱ Tempo de investimento</label>
            <div style={styles.timeInputGroup}>
              <input
                type="number"
                value={timeValue}
                min={1}
                onChange={(e) => setTimeValue(parseInt(e.target.value) || 1)}
                style={styles.timeInput}
                className="time-input"
              />
              <div style={styles.unitToggle}>
                <button
                  style={styles.unitBtn(timeUnit === "months")}
                  onClick={() => setTimeUnit("months")}
                >
                  Meses
                </button>
                <button
                  style={styles.unitBtn(timeUnit === "years")}
                  onClick={() => setTimeUnit("years")}
                >
                  Anos
                </button>
              </div>
            </div>
            <span style={{ fontSize: 13, color: "#6B7A90", fontWeight: 500 }}>
              {timeEquiv}
            </span>
          </div>

          {/* Investment cards grid */}
          <div
            className="renda-fixa-grid"
            style={{ ...styles.grid }}
          >
            <InvestmentCard
              side="a"
              color="#2ECC71"
              label="Investimento A"
              investment={investA}
              onChange={setInvestA}
            />
            <InvestmentCard
              side="b"
              color="#F39C12"
              label="Investimento B"
              investment={investB}
              onChange={setInvestB}
            />
          </div>

          {/* CTA */}
          <button
            className="calc-btn-hover"
            style={styles.calcBtn}
            onClick={calculate}
          >
            Calcular e Comparar →
          </button>

          {/* Results */}
          {results && (() => {
            const v = buildVerdict(results);
            const exemptA = TAX_EXEMPT[investA.type];
            const exemptB = TAX_EXEMPT[investB.type];
            return (
              <div>
                <div
                  className="renda-fixa-results-grid"
                  style={styles.resultsGrid}
                >
                  {/* Card A */}
                  <div style={styles.resultCard("linear-gradient(135deg, #1DB954 0%, #2ECC71 100%)")}>
                    <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                    <div style={styles.resLabel}>Investimento A</div>
                    <div style={styles.resType}>{investA.type}</div>
                    <div style={styles.resRate}>
                      {v.netAnnualAFmt}{" "}
                      <span style={styles.resRateSpan}>% a.a. líq.</span>
                    </div>
                    <div style={styles.resSub}>
                      Bruto: {results.grossA.toFixed(2).replace(".", ",")}% · {v.irLabel_A}
                    </div>
                    {results.winA && (
                      <div style={styles.winnerBadge}>🏆 Melhor opção</div>
                    )}
                  </div>

                  {/* Card B */}
                  <div style={styles.resultCard("linear-gradient(135deg, #E67E22 0%, #F39C12 100%)")}>
                    <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                    <div style={styles.resLabel}>Investimento B</div>
                    <div style={styles.resType}>{investB.type}</div>
                    <div style={styles.resRate}>
                      {v.netAnnualBFmt}{" "}
                      <span style={styles.resRateSpan}>% a.a. líq.</span>
                    </div>
                    <div style={styles.resSub}>
                      Bruto: {results.grossB.toFixed(2).replace(".", ",")}% · {v.irLabel_B}
                    </div>
                    {!results.winA && (
                      <div style={styles.winnerBadge}>🏆 Melhor opção</div>
                    )}
                  </div>
                </div>

                {/* Verdict */}
                <div style={styles.verdictCard(results.winA)}>
                  <p style={styles.verdictText}>
                    O investimento{" "}
                    <strong>{investA.type}</strong> renderá{" "}
                    <strong>{v.netAnnualAFmt}% a.a. líquido</strong>, enquanto o{" "}
                    <strong>{investB.type}</strong> renderá{" "}
                    <strong>{v.netAnnualBFmt}% a.a. líquido</strong>, considerando um período de{" "}
                    <strong>{v.timeLabel}</strong>. Nessas condições, o{" "}
                    <strong>{v.winner}</strong> é{" "}
                    <strong>{v.diff}% mais rentável</strong> que o{" "}
                    <strong>{v.loser}</strong> ao ano.{" "}
                    {v.exemptAny ? "A isenção de IR foi considerada no cálculo." : ""}{" "}
                    Lembrando que essas condições são sazonais e podem mudar.
                    <br />
                    <br />
                    <strong>Se você investir R$ 1.000,00:</strong>
                    <br />
                    📗 <strong>{investA.type}</strong> → valor final{" "}
                    <strong>R$ {fmt(v.finalA)}</strong>{" "}
                    <span style={{ color: "#27AE60", fontWeight: 600 }}>
                      (+ R$ {fmt(v.yieldA)})
                    </span>
                    <br />
                    📙 <strong>{investB.type}</strong> → valor final{" "}
                    <strong>R$ {fmt(v.finalB)}</strong>{" "}
                    <span style={{ color: "#E67E22", fontWeight: 600 }}>
                      (+ R$ {fmt(v.yieldB)})
                    </span>
                  </p>
                </div>

                <p style={styles.disclaimer}>
                  ⚠ As taxas são sazonais e podem mudar. Esta calculadora tem caráter informativo.
                </p>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}
