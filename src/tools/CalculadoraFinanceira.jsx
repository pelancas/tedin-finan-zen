import { useState, useEffect, useRef, useCallback } from "react";

const LOGO_SRC = "/favicon.png";

const TAXA_ANUAL = 0.055;
const TAXA_MENSAL = Math.pow(1 + TAXA_ANUAL, 1 / 12) - 1;

function fmt(v) {
  return "R$ " + Math.round(v).toLocaleString("pt-BR");
}
function fmtDec(v) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcSaldo(p, a, m) {
  let s = p;
  for (let i = 1; i <= m; i++) s = s * (1 + TAXA_MENSAL) + a;
  return s;
}

function calcAporte(p, m, alvo) {
  const f = Math.pow(1 + TAXA_MENSAL, m);
  if (f === 1) return (alvo - p * f) / m;
  return (alvo - p * f) * TAXA_MENSAL / (f - 1);
}

function calcularDados(idadeAtual, idadeMeta, patrimonio, aporteMensal, rendaMeta, modo) {
  const anos = Math.max(1, idadeMeta - idadeAtual);
  const meses = anos * 12;
  let saldo, aporteEfetivo;

  if (modo === "aporte") {
    aporteEfetivo = aporteMensal;
    saldo = calcSaldo(patrimonio, aporteEfetivo, meses);
  } else {
    const saldoNecessario = rendaMeta / TAXA_MENSAL;
    saldo = saldoNecessario;
    aporteEfetivo = Math.max(0, calcAporte(patrimonio, meses, saldoNecessario));
  }

  const totalInvestido = Math.max(0, patrimonio + aporteEfetivo * meses);
  const jurosGanhos = Math.max(0, saldo - totalInvestido);
  const rendaPassiva = saldo * TAXA_MENSAL;

  const extra = 200;
  let mesesAntec = 0, sv = patrimonio;
  for (let m = 1; m <= meses; m++) {
    sv = sv * (1 + TAXA_MENSAL) + aporteEfetivo + extra;
    if (sv >= saldo && mesesAntec === 0) mesesAntec = meses - m;
  }

  return {
    anos, meses, saldo, aporteEfetivo, totalInvestido, jurosGanhos, rendaPassiva,
    anosAntec: (mesesAntec / 12).toFixed(1),
    mid1Age: Math.round(idadeAtual + anos / 3),
    mid2Age: Math.round(idadeAtual + (2 * anos) / 3),
    extra,
  };
}

function desenharGrafico(canvas, p, a, meses, modo) {
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = 200 * dpr;
  canvas.style.width = rect.width + "px";
  canvas.style.height = "200px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const W = rect.width, H = 200;
  ctx.clearRect(0, 0, W, H);

  const steps = 80;
  const values = [];
  for (let i = 0; i <= steps; i++) {
    const m = Math.round((i * meses) / steps);
    let sv = p;
    for (let mm = 1; mm <= m; mm++) sv = sv * (1 + TAXA_MENSAL) + a;
    values.push(sv);
  }

  const maxV = Math.max(...values, 1);
  const padX = 8, padY = 16;
  const px = (i) => padX + (i / steps) * (W - padX * 2);
  const py = (v) => H - padY - (v / maxV) * (H - padY * 2);

  const line = modo === "aporte" ? "#1daf66" : "#FFA726";
  const g0   = modo === "aporte" ? "rgba(29,175,102,0.18)" : "rgba(255,167,38,0.15)";
  const g1   = modo === "aporte" ? "rgba(29,175,102,0.01)" : "rgba(255,167,38,0.01)";
  const dot  = modo === "aporte" ? "#a8e6c8" : "#FFD08A";

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, g0); grad.addColorStop(1, g1);
  ctx.beginPath(); ctx.moveTo(px(0), py(values[0]));
  for (let i = 1; i <= steps; i++) ctx.lineTo(px(i), py(values[i]));
  ctx.lineTo(px(steps), H - padY); ctx.lineTo(px(0), H - padY);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  ctx.beginPath(); ctx.moveTo(px(0), py(values[0]));
  for (let i = 1; i <= steps; i++) ctx.lineTo(px(i), py(values[i]));
  ctx.strokeStyle = line; ctx.lineWidth = 2.5; ctx.lineJoin = "round"; ctx.stroke();

  [0, Math.round(steps/3), Math.round(2*steps/3), steps].forEach((i, idx, arr) => {
    ctx.beginPath(); ctx.arc(px(i), py(values[i]), 5, 0, Math.PI * 2);
    ctx.fillStyle   = idx === arr.length - 1 ? dot : "#fff";
    ctx.strokeStyle = idx === arr.length - 1 ? dot : line;
    ctx.lineWidth = 2.5; ctx.fill(); ctx.stroke();
  });
}

/* Icons */
const IconTrend  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const IconCheck  = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconWave   = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1daf66" strokeWidth="2.2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const IconCoin   = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFA726" strokeWidth="2.2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const IconBolt   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1daf66" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
const IconShield = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFA726" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconAporte = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const IconRenda  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
  input[type=number] { -moz-appearance: textfield; }
  :root {
    --deep:#1daf66; --dark:#1A2E35; --accent:#FFA726; --bg:#FFFDF5;
    --card:#fff; --text:#1A2E35; --muted:#475569; --border:#e2e8e4;
    --shadow:0 2px 20px rgba(26,46,53,0.07);
  }

  .vt-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
          --vt-cream:   #FFFDF5;
        }

        /* Hero */
        .vt-hero {
          background: #1A2E35;
          padding: 3rem 1.5rem 3.5rem;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .vt-hero { padding: 4rem 5rem 4.5rem; }
        }
        .vt-hero-inner { max-width: 72rem; margin: 0 auto; position: relative; z-index: 1; }
        .vt-breadcrumb { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; }
        .vt-breadcrumb a, .vt-breadcrumb span { font-size: 0.8rem; font-weight: 500; color: #8aab96; text-decoration: none; }
        .vt-breadcrumb a:hover { color: var(--vt-light); }
        .vt-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin-bottom: 1rem; }
        .vt-hero h1 span { color: var(--vt-light); }
        .vt-hero p { color: #a3b8ac; font-size: 1.1rem; font-weight: 300; max-width: 36rem; }
        .vt-hero-blob { position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem; opacity: 0.06; pointer-events: none; }

  .cr { font-family:'Work Sans',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; padding:40px 20px; }
  .cc { max-width:1020px; margin:0 auto; }
  .ch1 { font-size:28px; font-weight:800; color:var(--dark); margin-bottom:4px; }
  .csub { font-size:13px; color:var(--muted); margin-bottom:32px; line-height:1.5; }
  .cla { display:grid; grid-template-columns:300px 1fr; gap:24px; align-items:start; }
  .cco { display:flex; flex-direction:column; gap:12px; }
  .ccard { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px; box-shadow:var(--shadow); }
  .clbl { font-size:10px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
  .cage { display:flex; align-items:center; gap:8px; }
  .cage input { width:70px; font-family:inherit; font-size:22px; font-weight:700; border:none; background:transparent; color:var(--text); outline:none; }
  .cagel { font-size:11px; color:var(--muted); align-self:flex-end; padding-bottom:4px; }
  .cages { flex:1; height:1px; background:var(--border); margin:0 4px; }
  .cvrow { display:flex; align-items:baseline; gap:4px; }
  .cpfx { font-size:14px; font-weight:600; color:var(--muted); }
  .cvin { font-family:inherit; font-size:20px; font-weight:700; border:none; background:transparent; color:var(--text); outline:none; width:100%; }
  .crrow { display:flex; justify-content:space-between; align-items:center; }
  .crla { font-size:13px; color:var(--muted); display:flex; align-items:center; gap:6px; }
  .crva { font-size:18px; font-weight:700; color:var(--deep); }
  .ctog { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:6px; box-shadow:var(--shadow); display:grid; grid-template-columns:1fr 1fr; gap:4px; }
  .ctbtn { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; padding:12px 8px; border-radius:12px; border:none; cursor:pointer; font-family:inherit; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; background:transparent; color:var(--muted); transition:background 0.2s,color 0.2s,box-shadow 0.2s; }
  .ctbtn.ta { background:var(--deep); color:#fff; box-shadow:0 2px 12px rgba(29,175,102,0.3); }
  .ctbtn.tr { background:var(--accent); color:#fff; box-shadow:0 2px 12px rgba(255,167,38,0.35); }
  .cpan { margin-top:4px; }
  .cpan.pr .ccard { border-color:var(--accent); }
  .clogo { display:flex; justify-content:center; padding-top:8px; }
  .clogo img { width:96px; height:auto; opacity:0.9; transition:opacity 0.2s,transform 0.2s; }
  .clogo img:hover { opacity:1; transform:scale(1.04); }
  .cres { background:var(--card); border:1px solid var(--border); border-radius:20px; padding:28px; box-shadow:var(--shadow); min-width:0; overflow:hidden; }
  .crh { margin-bottom:20px; }
  .chb { display:grid; grid-template-columns:1fr auto; gap:12px; align-items:stretch; }
  .cdb { display:flex; align-items:center; justify-content:space-between; gap:16px; border-radius:14px; padding:16px 20px; margin-bottom:4px; }
  .cdb.da { background:linear-gradient(135deg,#e8faf2,#d4f5e4); border:1.5px solid #a8e6c8; }
  .cdb.dr { background:linear-gradient(135deg,#fff5e6,#ffeacc); border:1.5px solid #ffd08a; }
  .cdbl { display:flex; flex-direction:column; gap:3px; }
  .cdbe { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; }
  .da .cdbe { color:#189954; } .dr .cdbe { color:#e07b00; }
  .cdbs { font-size:12px; font-weight:500; color:var(--muted); }
  .cdbv { font-size:30px; font-weight:800; line-height:1.1; letter-spacing:-0.5px; }
  .da .cdbv { color:#1daf66; } .dr .cdbv { color:#FFA726; }
  .cdbi { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .da .cdbi { background:rgba(29,175,102,0.18); } .dr .cdbi { background:rgba(255,167,38,0.18); }
  .ctcard { background:#f5f7f6; border:1.5px solid var(--border); border-radius:14px; padding:16px 20px; display:flex; flex-direction:column; justify-content:center; gap:3px; min-width:180px; }
  .ctce { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); }
  .ctcv { font-size:26px; font-weight:800; color:var(--dark); line-height:1.1; letter-spacing:-0.5px; }
  .cbadge { display:inline-flex; align-items:center; gap:4px; font-size:11px; color:var(--deep); font-weight:600; margin-top:4px; }
  .ccha { position:relative; height:200px; margin:20px 0 8px; overflow:hidden; }
  canvas.cch { width:100%; height:100%; display:block; }
  .cchl { display:flex; justify-content:space-between; font-size:10px; color:var(--muted); font-weight:500; padding:0 2px; margin-bottom:24px; }
  .cchl span:last-child { color:var(--deep); font-weight:700; }
  .cst { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; padding-top:20px; border-top:1px solid var(--border); }
  .cstl { font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted); margin-bottom:6px; }
  .cstv { font-size:18px; font-weight:700; word-break:break-word; }
  .cstv.g { color:var(--deep); } .cstv.o { color:var(--accent); }
  .cstu { height:2px; border-radius:2px; margin-top:6px; width:40px; }
  .ctips { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:24px; }
  .ctip { background:#edf7f1; border-radius:14px; padding:16px; }
  .ctip.ot { background:#fff8ed; }
  .ctip h4 { font-size:13px; font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:6px; }
  .ctip p { font-size:12px; color:var(--muted); line-height:1.5; }
  @media(max-width:700px){
    .cla{grid-template-columns:1fr;}
    .chb{grid-template-columns:1fr;}
    .ctcard{min-width:unset;}
    .ctips{grid-template-columns:1fr;}
    .cres{padding:16px;}
  }
`;

export default function CalculadoraFinanceira() {
  const [modo, setModo]               = useState("aporte");
  const [idadeAtual, setIdadeAtual]   = useState(25);
  const [idadeMeta, setIdadeMeta]     = useState(55);
  const [patrimonio, setPatrimonio]   = useState(50000);
  const [patrimonioStr, setPatrimonioStr] = useState("50000");
  const [aporteM, setAporteM]         = useState(2500);
  const [aporteStr, setAporteStr]     = useState("2500");
  const [rendaMeta, setRendaMeta]     = useState(10000);
  const [rendaStr, setRendaStr]       = useState("10000");
  const canvasRef = useRef(null);

  const d = calcularDados(idadeAtual, idadeMeta, patrimonio, aporteM, rendaMeta, modo);
  const isA = modo === "aporte";

  const redraw = useCallback(() => {
    if (canvasRef.current)
      desenharGrafico(canvasRef.current, patrimonio, d.aporteEfetivo, d.meses, modo);
  }, [patrimonio, d.aporteEfetivo, d.meses, modo]);

  useEffect(() => {
    redraw();
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, [redraw]);

  return (
    <>
      <style>{CSS}</style>
      <div className="cr" style={{ backgroundColor: "#1A2E35" }}>

                {/* ── Hero ── */}
        <section className="vt-hero">
          <div className="vt-hero-inner">
            <nav className="vt-breadcrumb">
              <a href="#">Home</a>
              <span>/</span>
              <a href="#">Ferramentas</a>
              <span>/</span>
              <span style={{ color: "#d9d4c4" }}>Calculadora</span>
            </nav>
            <h1>
              Calculadora de{" "}
              <span>Aposentadoria</span>
            </h1>
            <p>
              Uma calculadora de renda mensal de aposentadoria estima quanto você poderá receber por mês no futuro com base nas contribuições, no tempo de investimento e na taxa de rendimento. Com esses dados, ela projeta o valor acumulado e transforma esse montante em uma renda mensal estimada para a aposentadoria.

            </p>
          </div>
          {/* Decorative blob */}
          <svg className="vt-hero-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
              fill="#abccb5"
              transform="translate(100 100)"
            />
          </svg>
        </section>


        {/* Calculadora */}
        <div className="cc">


          <div className="cla">
            <div className="cco">

              <div className="ccard">
                <div className="clbl">Idade Atual e Meta</div>
                <div className="cage">
                  <input type="number" value={idadeAtual} min={18} max={80} onChange={e => setIdadeAtual(parseInt(e.target.value))} />
                  <span className="cagel">anos</span>
                  <div className="cages" />
                  <input type="number" value={idadeMeta} min={20} max={90} onChange={e => setIdadeMeta(parseInt(e.target.value))} />
                  <span className="cagel">anos</span>
                </div>
              </div>

              <div className="ccard">
                <div className="clbl">Patrimônio Atual</div>
                <div className="cvrow">
                  <span className="cpfx">R$</span>
                  <input className="cvin" type="number" value={patrimonioStr} min={0} step={1000} onChange={e => { setPatrimonioStr(e.target.value); const n = parseFloat(e.target.value); setPatrimonio(isNaN(n) ? 0 : n); }} />
                </div>
              </div>

              <div className="ctog">
                <button className={"ctbtn"+(isA?" ta":"")} onClick={()=>setModo("aporte")}><IconAporte/>Aporte Mensal</button>
                <button className={"ctbtn"+(!isA?" tr":"")} onClick={()=>setModo("renda")}><IconRenda/>Renda Esperada</button>
              </div>

              {isA ? (
                <div className="cpan pa">
                  <div className="ccard">
                    <div className="clbl">Aporte Mensal</div>
                    <div className="cvrow">
                      <span className="cpfx">R$</span>
                      <input className="cvin" type="number" value={aporteStr} min={0} step={100} onChange={e => { setAporteStr(e.target.value); const n = parseFloat(e.target.value); setAporteM(isNaN(n) ? 0 : n); }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cpan pr">
                  <div className="ccard">
                    <div className="clbl">Renda Passiva Esperada / mês</div>
                    <div className="cvrow">
                      <span className="cpfx" style={{color:"#FFA726"}}>R$</span>
                      <input className="cvin" type="number" value={rendaStr} min={0} step={500} style={{color:"#FFA726"}} onChange={e => { setRendaStr(e.target.value); const n = parseFloat(e.target.value); setRendaMeta(isNaN(n) ? 0 : n); }} />
                    </div>
                  </div>
                </div>
              )}

              <div className="ccard">
                <div className="clbl">Rentabilidade Real</div>
                <div className="crrow">
                  <span className="crla"><IconTrend/>Taxa de Juros Real</span>
                  <span className="crva">5,5% ao ano</span>
                </div>
              </div>

              <div className="clogo"><img src={LOGO_SRC} alt="Orienta" /></div>

            </div>

            <div className="cres">
              <div className="crh">
                <div className="chb">
                  <div className={"cdb "+(isA?"da":"dr")}>
                    <div className="cdbl">
                      <div className="cdbe">{isA?"Renda passiva gerada":"Aporte necessário"}</div>
                      <div className="cdbv">{isA?fmtDec(d.rendaPassiva)+"/mês":fmtDec(d.aporteEfetivo)+"/mês"}</div>
                      <div className="cdbs">{isA?"com base no seu planejamento":"para atingir sua meta"}</div>
                    </div>
                    <div className="cdbi">{isA?<IconWave/>:<IconCoin/>}</div>
                  </div>
                  <div className="ctcard">
                    <div className="ctce">Total acumulado</div>
                    <div className="ctcv">{fmt(d.saldo)}</div>
                    <div className="cbadge"><IconCheck/>Independência aos {idadeMeta} anos</div>
                  </div>
                </div>
              </div>

              <div className="ccha"><canvas ref={canvasRef} className="cch"/></div>
              <div className="cchl">
                <span>HOJE ({idadeAtual})</span>
                <span>{d.mid1Age} ANOS</span>
                <span>{d.mid2Age} ANOS</span>
                <span>META ({idadeMeta} ANOS)</span>
              </div>

              <div className="cst">
                <div>
                  <div className="cstl">Total Investido</div>
                  <div className="cstv">{fmt(d.totalInvestido)}</div>
                  <div className="cstu" style={{background:"#e2e8e4"}}/>
                </div>
                <div>
                  <div className="cstl">Juros Acumulados</div>
                  <div className="cstv g">{fmt(d.jurosGanhos)}</div>
                  <div className="cstu" style={{background:"#1daf66"}}/>
                </div>
                <div>
                  <div className="cstl">Renda Passiva</div>
                  <div className="cstv o">{fmtDec(d.rendaPassiva)} /mês</div>
                  <div className="cstu" style={{background:"#FFA726"}}/>
                </div>
              </div>

              <div className="ctips">
                <div className="ctip">
                  <h4><IconBolt/>{isA?"Otimização de Aportes":"Patrimônio Alvo"}</h4>
                  <p>{isA
                    ? `Adicionar R$ ${d.extra.toLocaleString("pt-BR")} extras/mês anteciparia sua independência em ${d.anosAntec} anos.`
                    : `Para gerar ${fmtDec(rendaMeta)}/mês você precisa acumular ${fmt(d.saldo)} em ${d.anos} anos.`
                  }</p>
                </div>
                <div className="ctip ot">
                  <h4><IconShield/>Poder de Compra</h4>
                  <p>Este cálculo utiliza juros reais (acima da inflação), garantindo que os valores reflitam o poder de compra de hoje.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}