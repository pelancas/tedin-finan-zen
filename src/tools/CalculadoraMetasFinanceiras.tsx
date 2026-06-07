import { useState, useRef, useEffect } from "react";
import { CalculadoraSidebar } from "@/components/layout/CalculadoraSidebar";
import { CalculadoraTextBlock } from "@/components/layout/CalculadoraTextBlock";

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
  const [rate, setRate] = useState("14");
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
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
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

        /* Meta de Economia highlight */
        .vt-field-highlight {
          background: linear-gradient(135deg, #f0faf5 0%, #e8f5ee 100%);
          border: 2px solid var(--vt-dark);
          border-radius: 0.75rem;
          padding: 1rem 1rem calc(1rem + 5px);
          position: relative;
        }
        .vt-field-badge {
          display: inline-flex; align-items: center; gap: 0.3rem;
          background: var(--vt-dark); color: #fff;
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em;
          padding: 0.2rem 0.6rem; border-radius: 999px;
          margin-bottom: 0.5rem;
        }
        .vt-field-badge svg { width: 10px; height: 10px; }
        .vt-field-highlight .vt-label { color: #0e6b3a; font-size: 0.85rem; }
        .vt-field-highlight .vt-input {
          background: #fff;
          border-color: #85c9a1;
          font-size: 1.05rem;
          font-weight: 700;
        }
        .vt-field-highlight .vt-input:focus {
          border-color: var(--vt-dark);
          box-shadow: 0 0 0 3px rgba(29,175,102,0.18);
        }

        /* Form grid */
        .vt-form-grid { display: grid; gap: 1.25rem; }
        @media (min-width: 640px) { .vt-form-grid { grid-template-columns: 1fr 1fr; } }

        /* Two-col layout: meta (left) + 3 fields (right) */
        .vt-form-two-col { display: flex; flex-direction: column; gap: 1rem; }
        @media (min-width: 640px) {
          .vt-form-two-col { flex-direction: row; align-items: stretch; gap: 1.25rem; }
          .vt-form-two-col > .vt-field-highlight--full { flex: 1; }
          .vt-fields-col { flex: 1; }
        }

        /* Right column: 3 stacked fields */
        .vt-fields-col { display: flex; flex-direction: column; gap: 0.6rem; }

        /* Compact field */
        .vt-field-sm { gap: 0.3rem; }
        .vt-input-sm { padding-top: 0.45rem !important; padding-bottom: 0.45rem !important; font-size: 0.88rem !important; }
        .vt-input-sm.has-prefix { padding-left: 2.8rem !important; }
        .vt-input-sm.has-suffix { padding-right: 2.5rem !important; }
        .vt-select-sm { padding: 0.45rem 0.6rem !important; font-size: 0.85rem !important; }

        /* Meta highlight full-height */
        .vt-field-highlight--full { display: flex; flex-direction: column; justify-content: center; }
        .vt-field-hint { font-size: 0.75rem; color: #4a8a5e; margin-top: 0.4rem; font-weight: 400; }

        /* Tooltip */
        .vt-tooltip-wrap { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; }
        .vt-tooltip-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 14px; height: 14px; border-radius: 50%;
          background: #8aab96; color: #fff;
          font-size: 0.65rem; font-weight: 800; cursor: default;
          flex-shrink: 0;
        }
        .vt-tooltip-box {
          display: none;
          position: absolute; bottom: calc(100% + 6px); left: 0;
          background: #1A2E35; color: #e8f0ea;
          font-size: 0.72rem; font-weight: 400; line-height: 1.45;
          padding: 0.55rem 0.75rem; border-radius: 0.45rem;
          width: 220px; z-index: 10;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          pointer-events: none;
        }
        .vt-tooltip-box::after {
          content: ''; position: absolute; top: 100%; left: 1rem;
          border: 5px solid transparent; border-top-color: #1A2E35;
        }
        .vt-tooltip-wrap:hover .vt-tooltip-box { display: block; }

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
              Quer comprar um carro? Uma Casa? Use a calculadora para ver quanto precisa economizar para chegar onde quer.
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
              <div className="vt-form-two-col">
                {/* Goal — destaque (coluna esquerda, altura total) */}
                <div className="vt-field vt-field-highlight vt-field-highlight--full">
                  <span className="vt-field-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 23 12"/>
                    </svg>
                    Objetivo principal
                  </span>
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
                  <p className="vt-field-hint">Quanto você quer acumular no total?</p>
                </div>

                {/* Coluna direita: 3 campos compactos */}
                <div className="vt-fields-col">
                  {/* Initial balance */}
                  <div className="vt-field vt-field-sm">
                    <label className="vt-label">Saldo Inicial (R$)</label>
                    <div className="vt-input-wrap">
                      <span className="vt-prefix">R$</span>
                      <input
                        className="vt-input vt-input-sm has-prefix"
                        placeholder="Ex: 5.000,00"
                        value={initial}
                        onChange={(e) => setInitial(maskBRL(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* Period */}
                  <div className="vt-field vt-field-sm">
                    <label className="vt-label">Prazo para Crescer</label>
                    <div className="vt-period-row">
                      <input
                        className="vt-input vt-input-sm"
                        style={{ flex: 1 }}
                        placeholder="Valor"
                        type="number"
                        min={1}
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                      />
                      <select
                        className="vt-select vt-select-sm"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as "Anos" | "Meses")}
                      >
                        <option>Anos</option>
                        <option>Meses</option>
                      </select>
                    </div>
                  </div>

                  {/* Rate */}
                  <div className="vt-field vt-field-sm">
                    <label className="vt-label">
                      <span className="vt-tooltip-wrap">
                        Taxa de Juros (% ao ano)
                        <span className="vt-tooltip-icon">?</span>
                        <span className="vt-tooltip-box">
                          Taxa de juros nominal, possível de obter hoje, isento de imposto — a sugestão é 14% ao ano.
                        </span>
                      </span>
                    </label>
                    <div className="vt-input-wrap">
                      <input
                        className="vt-input vt-input-sm has-suffix"
                        placeholder="Ex: 10,5"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      />
                      <span className="vt-suffix">%</span>
                    </div>
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
          <CalculadoraSidebar
            promo={{
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",
              imageAlt: "Moedas empilhadas com planta crescendo",
              badge: "Destaque",
              title: "Cuidado com seu seguro",
              description: "Descubra como evitar erros comuns.",
              href: "#/seguros/conteudos?post=a-venda-casada-de-seguros",
            }}
            resources={[
              { icon: "article", title: "As Melhores Formas de Economizar", desc: "Pequenas mudanças, grandes resultados.", href: "#/planejamento/despesas" },
              { icon: "stats", title: "Comparador de Renda Fixa", desc: "Calcule qual melhor produto.", href: "#/investimentos/renda-fixa/comparador" },
              { icon: "bank", title: "Fundos, o que são", desc: "Qual o melhor para sua meta?", href: "#/investimentos/fundos" },
              { icon: "calc", title: "Calculadora de Aposentadoria", desc: "O poder do tempo ao seu favor.", href: "#/planejamento/calculadoras/aposentadoria" },
            ]}
          />



        </main>
            {/* Blog Section */}
        <CalculadoraTextBlock>
                   <h2 className="text-3xl font-bold text-foreground mb-6">Por que poupar dinheiro?</h2>
           
                   <p>
                     Apesar de você já ter muitas metas claras do que você quer, seja um carro, uma casa ou a sua aposentadoria, é necessário que você se planeje para identificar o que precisa para chegar onde quer. E uma das melhores formas de fazer isso é planejando uma poupança mensal, planejando os seus gastos de forma com que eles se alinhem com o seu futuro.
                   </p>
           
           
                   <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Como funciona a cálculadora</h3>
           
                   <p>
                     O que você vai preencher nessa calculadora é a sua meta, em quanto você quer chegar, o quanto você tem de dinheiro hoje no saldo inicial, o prazo que tem pra chegar nessa meta e a taxa de juros atual de algum investimento. Geralmente, você pode colocar a taxa SELIC ou o CDI.
                   </p>
           
                   <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Exemplo simples</h3>
           
                   <p>Imagine que você:</p>
           
                   <ul>
                     <li>Guarde R$ 1.000 inicialmente</li>
                     <li>Deposite R$ 200 por mês</li>
                     <li>Tenha um rendimento médio de 0,6% ao mês</li>
                   </ul>
           
                   <p>
                     No primeiro mês, os juros incidem sobre o saldo inicial. Nos meses seguintes, os juros incidem sobre todo o valor acumulado, incluindo os rendimentos anteriores.
                   </p>        

           
                    <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Dicas para poupar de forma eficaz</h3>
           
                   <ul>
                     <li>Definir um percentual da renda para guardar todos os meses</li>
                     <li>Automatizar transferências para uma conta ou investimento</li>
                     <li>Estabelecer objetivos claros, como uma reserva de emergência ou um projeto específico</li>
                     <li>Evitar utilizar os recursos poupados para despesas não planejadas</li>
                   </ul>
           
                   <p>Poupar regularmente, mesmo que em valores modestos, pode gerar um impacto significativo no longo prazo.</p>
           
                   <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8">
                     <p className="text-foreground font-semibold mb-0">
                       ✅ Em resumo: poupar é uma forma de construir estabilidade financeira e aproveitar o poder dos juros compostos. Quanto mais consistente for o hábito e maior o tempo de investimento, maior tende a ser o crescimento do patrimônio.
                     </p>
                   </div>
        </CalculadoraTextBlock>
      </div>
    </>
  );
}
