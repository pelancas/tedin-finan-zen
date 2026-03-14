import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Results {
  monthlyPayment: number;
  totalSaved: number;
  interestEarned: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const parseBRL = (v: string) =>
  parseFloat(v.replace(/\./g, "").replace(",", ".")) || 0;

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const maskBRL = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10) / 100;
  return num.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function ResultCard({
  label,
  value,
  accent,
  delay = 0,
  visible,
}: {
  label: string;
  value: string;
  accent: string;
  delay?: number;
  visible: boolean;
}) {
  return (
    <div
      className="result-card"
      style={{
        borderLeft: `4px solid ${accent}`,
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      <p className="result-label">{label}</p>
      <p className="result-value">R$ {value}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CalculadoraMetasFinanceiras() {
  const [goal, setGoal] = useState("");
  const [initial, setInitial] = useState("");
  const [period, setPeriod] = useState("");
  const [unit, setUnit] = useState<"Anos" | "Meses">("Anos");
  const [rate, setRate] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const FV = parseBRL(goal);
    const PV = parseBRL(initial);
    const r = (parseFloat(rate.replace(",", ".")) || 0) / 100;
    const rawPeriod = parseInt(period, 10) || 0;
    const n = unit === "Anos" ? rawPeriod * 12 : rawPeriod;

    if (!FV || !n) return;

    // Monthly interest rate
    const rm = Math.pow(1 + r, 1 / 12) - 1;

    let monthly = 0;
    if (rm === 0) {
      monthly = Math.max(0, (FV - PV) / n);
    } else {
      // PMT formula: FV = PV*(1+rm)^n + PMT * [((1+rm)^n - 1) / rm]
      const factor = Math.pow(1 + rm, n);
      monthly = Math.max(0, (FV - PV * factor) / ((factor - 1) / rm));
    }

    const totalContributions = monthly * n + PV;
    const interestEarned = Math.max(0, FV - totalContributions);

    setResults({
      monthlyPayment: monthly,
      totalSaved: FV,
      interestEarned,
    });

    setResultsVisible(false);
    setTimeout(() => setResultsVisible(true), 50);
  };

  // Scroll to results on mobile after calculation
  useEffect(() => {
    if (results && resultsRef.current) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setTimeout(
          () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
          100
        );
      }
    }
  }, [results]);

  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .vt-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #FFA726;
          --vt-darker:  #1A2E35;
          --vt-mid:     #1daf66;
          --vt-light:   #FFFDF5;
          --vt-cream:   #FFFDF5;
        }

        /* Hero */
        .vt-hero {
          background: var(--vt-darker);
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

        /* Layout */
        .vt-main { max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem; display: grid; gap: 3rem; }
        @media (min-width: 768px) { .vt-main { padding: 3rem 5rem; } }
        @media (min-width: 1024px) { .vt-main { grid-template-columns: 1fr 340px; } }

        /* Section heading */
        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); display: flex; align-items: center; gap: 0.6rem; }
        .vt-section-heading h2 svg { color: var(--vt-dark); flex-shrink: 0; }
        .vt-section-heading p { color: #607060; font-size: 1rem; font-weight: 400; }

        /* Card */
        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        /* Form grid */
        .vt-form-grid { display: grid; gap: 1.25rem; }
        @media (min-width: 640px) { .vt-form-grid { grid-template-columns: 1fr 1fr; } }

        .vt-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .vt-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vt-dark); }
        .vt-input-wrap { position: relative; }
        .vt-prefix, .vt-suffix {
          position: absolute; top: 50%; transform: translateY(-50%);
          font-weight: 600; font-size: 0.85rem; color: #8aab96; pointer-events: none;
        }
        .vt-prefix { left: 1rem; }
        .vt-suffix { right: 1rem; }
        .vt-input {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-input:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }
        .vt-input.has-prefix { padding-left: 2.8rem; }
        .vt-input.has-suffix { padding-right: 2.5rem; }

        .vt-period-row { display: flex; gap: 0.5rem; }
        .vt-select {
          width: 35%; padding: 0.9rem 0.75rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.9rem; font-weight: 600; color: var(--vt-darker);
          outline: none; cursor: pointer; transition: border-color 0.2s;
        }
        .vt-select:focus { border-color: var(--vt-dark); }

        /* CTA button */
        .vt-btn {
          width: 100%; margin-top: 0.5rem;
          background: var(--vt-dark); color: #fff;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1rem;
          letter-spacing: 0.01em; padding: 1rem 2rem; border-radius: 0.6rem; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: background 0.2s, transform 0.15s;
        }
        .vt-btn:hover { background: #16382c; transform: translateY(-1px); }
        .vt-btn:active { transform: translateY(0); }
        .vt-btn svg { transition: transform 0.2s; }
        .vt-btn:hover svg { transform: translateX(4px); }

        /* Result cards */
        .vt-results-grid { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
        @media (min-width: 640px) { .vt-results-grid { grid-template-columns: repeat(3, 1fr); } }

        .result-card {
          background: #fff; border-radius: 0.75rem; padding: 1.25rem 1.5rem;
          box-shadow: 0 1px 3px rgba(26,69,55,0.06);
        }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.4rem; font-weight: 900; color: var(--vt-darker); }

        /* ── Sidebar ── */
        .vt-aside { display: flex; flex-direction: column; gap: 1.5rem; }

        /* Promo card */
        .vt-promo { border-radius: 1rem; overflow: hidden; position: relative; }
        .vt-promo img { width: 100%; height: 16rem; object-fit: cover; display: block; transition: transform 0.5s; }
        .vt-promo:hover img { transform: scale(1.04); }
        .vt-promo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, var(--vt-darker) 40%, transparent);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem;
        }
        .vt-badge {
          display: inline-block; margin-bottom: 0.5rem;
          background: var(--vt-mid); color: #fff;
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
          padding: 0.25rem 0.6rem; border-radius: 0.25rem;
        }
        .vt-promo h3 { color: #fff; font-size: 1.1rem; font-weight: 800; margin-bottom: 0.4rem; }
        .vt-promo p { color: #a3b8ac; font-size: 0.85rem; margin-bottom: 0.75rem; }
        .vt-promo-link { color: var(--vt-light); font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 0.3rem; text-decoration: none; }
        .vt-promo-link:hover { text-decoration: underline; }

        /* Resources */
        .vt-resources h3 { font-size: 1.05rem; font-weight: 800; color: var(--vt-darker); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
        .vt-resources h3 svg { color: var(--vt-dark); }
        .vt-resources ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }
        .vt-resource-link { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.85rem 0; text-decoration: none; color: #4a6450; transition: color 0.2s; }
        .vt-resource-link:hover { color: var(--vt-dark); }
        .vt-resource-link:hover .vt-resource-icon { color: var(--vt-dark); }
        .vt-resource-icon { color: #9ab8a0; flex-shrink: 0; margin-top: 1px; transition: color 0.2s; }
        .vt-resource-title { font-size: 0.875rem; font-weight: 600; margin-bottom: 0.15rem; }
        .vt-resource-desc { font-size: 0.75rem; color: #8aab96; }
        .vt-divider { border: none; border-top: 1px solid #e8ede9; margin: 0; }
      `}</style>

      <div className="vt-root">
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
              <span>Metas Financeiras</span>
            </h1>
            <p>
              Planeje seu futuro com precisão. Defina seus objetivos e descubra
              o caminho exato para a sua liberdade financeira através de
              cálculos baseados em rendimentos reais.
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

        {/* ── Main ── */}
        <main className="vt-main">
          {/* ── Left: Calculator ── */}
          <div>
            <div className="vt-section-heading">
              <h2>
                {/* Savings icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8.5 3.3 1.5 4.2C6 18 6 19 6 19h12s0-1-.5-2.8c1-.9 1.5-2.4 1.5-4.2 0-1-.25-1.75-.5-2.5L20 8s1-5-1-3z"/>
                  <path d="M2 9v1c0 1.1.9 2 2 2h1"/>
                  <path d="M16 11h0"/>
                </svg>
                Quanto preciso poupar por mês?
              </h2>
              <p>Diga-nos quanto você quer guardar e quando quer atingir sua meta.</p>
            </div>

            <div className="vt-card">
              <div className="vt-form-grid">
                {/* Goal */}
                <div className="vt-field">
                  <label className="vt-label">Meta de Economia (R$)</label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      className="vt-input has-prefix"
                      placeholder="Ex: 50.000,00"
                      value={goal}
                      onChange={(e) => setGoal(maskBRL(e.target.value))}
                    />
                  </div>
                </div>

                {/* Initial balance */}
                <div className="vt-field">
                  <label className="vt-label">Saldo Inicial (R$)</label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      className="vt-input has-prefix"
                      placeholder="Ex: 5.000,00"
                      value={initial}
                      onChange={(e) => setInitial(maskBRL(e.target.value))}
                    />
                  </div>
                </div>

                {/* Period */}
                <div className="vt-field">
                  <label className="vt-label">Prazo para Crescer</label>
                  <div className="vt-period-row">
                    <input
                      className="vt-input"
                      style={{ flex: 1 }}
                      placeholder="Valor"
                      type="number"
                      min={1}
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                    />
                    <select
                      className="vt-select"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as "Anos" | "Meses")}
                    >
                      <option>Anos</option>
                      <option>Meses</option>
                    </select>
                  </div>
                </div>

                {/* Rate */}
                <div className="vt-field">
                  <label className="vt-label">Taxa de Juros (% ao ano)</label>
                  <div className="vt-input-wrap">
                    <input
                      className="vt-input has-suffix"
                      placeholder="Ex: 10,5"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <span className="vt-suffix">%</span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button className="vt-btn" onClick={calculate}>
                Calcular Meta
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>

            {/* Results */}
            <div className="vt-results-grid" ref={resultsRef}>
              <ResultCard
                label="Total a Poupar"
                value={results ? formatBRL(results.totalSaved) : "0,00"}
                accent="#1a4537"
                delay={0}
                visible={resultsVisible}
              />
              <ResultCard
                label="Parcela Mensal"
                value={results ? formatBRL(results.monthlyPayment) : "0,00"}
                accent="#618c70"
                delay={80}
                visible={resultsVisible}
              />
              <ResultCard
                label="Juros Ganhos"
                value={results ? formatBRL(results.interestEarned) : "0,00"}
                accent="#abccb5"
                delay={160}
                visible={resultsVisible}
              />
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="vt-aside">
            {/* Promo card */}
            <div className="vt-promo">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH"
                alt="Moedas empilhadas com planta crescendo"
              />
              <div className="vt-promo-overlay">
                <span className="vt-badge">Destaque</span>
                <h3>Guia de Investimentos 2024</h3>
                <p>Descubra as melhores taxas para seu perfil.</p>
                <a href="#" className="vt-promo-link">
                  Saiba mais
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="vt-card vt-resources">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                Recursos Úteis
              </h3>
              <ul>
                {[
                  { icon: "article", title: "28 Formas de Economizar", desc: "Pequenas mudanças, grandes resultados." },
                  { icon: "stats", title: "Controle de Gastos Mensais", desc: "Planilha gratuita para download." },
                  { icon: "bank", title: "Renda Fixa vs Variável", desc: "Qual o melhor para sua meta?" },
                  { icon: "calc", title: "Calculadora de Juros Compostos", desc: "O poder do tempo ao seu favor." },
                ].map((item, i, arr) => (
                  <li key={i}>
                    <a href="#" className="vt-resource-link">
                      <svg className="vt-resource-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {item.icon === "article" && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>}
                        {item.icon === "stats" && <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>}
                        {item.icon === "bank" && <><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></>}
                        {item.icon === "calc" && <><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></>}
                      </svg>
                      <div>
                        <p className="vt-resource-title">{item.title}</p>
                        <p className="vt-resource-desc">{item.desc}</p>
                      </div>
                    </a>
                    {i < arr.length - 1 && <hr className="vt-divider" />}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
