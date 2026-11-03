import { useState, useRef, useEffect } from "react";
import { CalculadoraSidebar } from "@/components/layout/CalculadoraSidebar";
import { CalculadoraTextBlock } from "@/components/layout/CalculadoraTextBlock";
import { ShareRow } from "@/components/ShareRow";
import { OutrasFerramentas } from "@/components/OutrasFerramentas";

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

const parseMeses = (v: string) => parseFloat(v.replace(",", ".")) || 0;

const STEPS = [
  {
    title: "Seu salário",
    question: "Qual foi o seu 4º pior mês de rendimento dos últimos meses?",
    hint: "Ordene seus meses do pior para o melhor e pegue o 4º da lista. Esse valor é o salário fixo que você vai se pagar todo mês.",
  },
  {
    title: "Seu teto",
    question: "Quantos meses de salário você quer manter de teto na reserva?",
    hint: "É o limite da reserva. Tudo o que passar desse valor, depois de você se pagar, vai para a aposentadoria.",
  },
  {
    title: "Sua reserva",
    question: "Quanto você já tem de reserva?",
    hint: "Some o que você tem guardado hoje para emergências e para cobrir os meses ruins.",
  },
];

interface Results {
  salario: number;
  meses: number;
  teto: number;
  reserva: number;
  falta: number;
  excedente: number;
  mesesCobertos: number;
  pct: number;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CalculadoraReservaDinamica() {
  const [step, setStep] = useState(0);
  const [salary, setSalary] = useState("");
  const [months, setMonths] = useState("6");
  const [reserve, setReserve] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [error, setError] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const validate = (s: number) => {
    if (s === 0 && parseBRL(salary) <= 0) return "Informe o valor do seu 4º pior mês para continuar.";
    if (s === 1 && parseMeses(months) <= 0) return "Informe quantos meses de salário você quer de teto.";
    return "";
  };

  const next = () => {
    const err = validate(step);
    setError(err);
    if (!err) setStep(step + 1);
  };

  const back = () => {
    setError("");
    setStep(Math.max(0, step - 1));
  };

  const calculate = () => {
    const err = validate(0) || validate(1);
    if (err) {
      setError(err);
      setStep(validate(0) ? 0 : 1);
      return;
    }
    setError("");

    const salario = parseBRL(salary);
    const meses = parseMeses(months);
    const reserva = parseBRL(reserve);
    const teto = salario * meses;

    setResults({
      salario,
      meses,
      teto,
      reserva,
      falta: Math.max(0, teto - reserva),
      excedente: Math.max(0, reserva - teto),
      mesesCobertos: reserva / salario,
      pct: Math.min(100, (reserva / teto) * 100),
    });

    setResultsVisible(false);
    setTimeout(() => setResultsVisible(true), 50);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (step < STEPS.length - 1) next();
    else calculate();
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

  const fmtMeses = (n: number) => n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  const atingiuTeto = results ? results.reserva >= results.teto : false;
  const last = step === STEPS.length - 1;

  return (
    <>
      <style>{`
        .vt-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
        }

        /* Hero */
        .vt-hero { background: var(--vt-darker); padding: 3rem 1.5rem 3.5rem; position: relative; overflow: hidden; }
        @media (min-width: 768px) { .vt-hero { padding: 4rem 5rem 4.5rem; } }
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

        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); }
        .vt-section-heading p { color: #607060; font-size: 1rem; font-weight: 400; }

        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        /* Stepper */
        .vt-steps { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.75rem; }
        .vt-step-dot {
          display: flex; align-items: center; gap: 0.5rem; flex: 0 0 auto;
          background: none; border: none; padding: 0; cursor: default;
          font-family: 'Work Sans', sans-serif; font-size: 0.8rem; font-weight: 700; color: #a3b8ac;
        }
        .vt-step-dot.clickable { cursor: pointer; }
        .vt-step-num {
          width: 1.9rem; height: 1.9rem; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: #eef3ee; color: #8aab96; font-weight: 800; font-size: 0.85rem;
          transition: background 0.2s, color 0.2s;
        }
        .vt-step-dot.active { color: var(--vt-darker); }
        .vt-step-dot.active .vt-step-num { background: var(--vt-dark); color: #fff; }
        .vt-step-dot.done { color: #0e6b3a; }
        .vt-step-dot.done .vt-step-num { background: #d9f2e4; color: #0e6b3a; }
        .vt-step-line { flex: 1; height: 2px; background: #e2e8e2; min-width: 0.75rem; }
        .vt-step-line.done { background: var(--vt-dark); }
        @media (max-width: 639px) { .vt-step-dot span.vt-step-name { display: none; } .vt-step-dot.active span.vt-step-name { display: inline; } }

        .vt-question { font-size: 1.25rem; font-weight: 800; color: var(--vt-darker); line-height: 1.3; margin-bottom: 0.5rem; }
        .vt-hint { font-size: 0.92rem; color: #607060; margin-bottom: 1.25rem; }

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
          font-family: 'Work Sans', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-input:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(29,175,102,0.15); }
        .vt-input.has-prefix { padding-left: 2.8rem; }
        .vt-input.has-suffix { padding-right: 4.5rem; }

        .vt-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
        .vt-chip {
          border: 1.5px solid #d0dbd2; background: #fff; color: var(--vt-darker);
          border-radius: 999px; padding: 0.4rem 0.9rem; cursor: pointer;
          font-family: 'Work Sans', sans-serif; font-size: 0.85rem; font-weight: 600;
          transition: border-color 0.2s, background 0.2s;
        }
        .vt-chip:hover { border-color: var(--vt-dark); }
        .vt-chip.on { background: var(--vt-dark); border-color: var(--vt-dark); color: #fff; }

        .vt-teto-preview { margin-top: 0.9rem; font-size: 0.9rem; color: #607060; }
        .vt-teto-preview strong { color: var(--vt-darker); }
        .vt-error { margin-top: 0.75rem; font-size: 0.85rem; font-weight: 600; color: #b45309; }

        .vt-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
        .vt-btn {
          flex: 1; background: var(--vt-dark); color: #fff;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1rem;
          letter-spacing: 0.01em; padding: 1rem 2rem; border-radius: 0.6rem; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: background 0.2s, transform 0.15s;
        }
        .vt-btn:hover { background: #16382c; transform: translateY(-1px); }
        .vt-btn:active { transform: translateY(0); }
        .vt-btn svg { transition: transform 0.2s; }
        .vt-btn:hover svg { transform: translateX(4px); }
        .vt-btn-ghost {
          flex: 0 0 auto; background: #fff; color: var(--vt-darker); border: 1.5px solid #d0dbd2;
          font-family: 'Work Sans', sans-serif; font-weight: 700; font-size: 0.95rem;
          padding: 1rem 1.5rem; border-radius: 0.6rem; cursor: pointer; transition: border-color 0.2s;
        }
        .vt-btn-ghost:hover { border-color: var(--vt-dark); }

        /* Results */
        .vt-results-grid { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
        @media (min-width: 640px) { .vt-results-grid { grid-template-columns: repeat(3, 1fr); } }
        .result-card { background: #fff; border-radius: 0.75rem; padding: 1.25rem 1.5rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); box-shadow: 0 4px 16px rgba(26,69,55,0.18); }
        .result-card--highlight .result-label { color: #7ab898; }
        .result-card--highlight .result-value { color: #fff; }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.4rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.8rem; color: #607060; margin-top: 0.25rem; }
        .result-card--highlight .result-sub { color: #a3b8ac; }

        .vt-progress { margin-top: 0.75rem; padding: 1.25rem 1.5rem; background: #fff; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
        .vt-progress-head { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: #607060; margin-bottom: 0.6rem; }
        .vt-progress-track { height: 0.9rem; background: #eef3ee; border-radius: 999px; overflow: hidden; }
        .vt-progress-bar { height: 100%; border-radius: 999px; background: var(--vt-dark); transition: width 0.8s cubic-bezier(.3,.7,.2,1); }
        .vt-progress-bar.full { background: var(--vt-mid); }

        .vt-conclusion {
          margin-top: 1rem; padding: 1rem 1.25rem; background: #f0faf5;
          border-left: 4px solid var(--vt-dark); border-radius: 0 0.6rem 0.6rem 0;
          font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s;
        }
        .vt-conclusion.visible { opacity: 1; transform: translateY(0); }
        .vt-conclusion strong { color: #0e6b3a; }

        .vt-how { margin-top: 1rem; padding: 1.25rem 1.5rem; background: #fff; border: 1px solid #e2e8e2; border-radius: 0.75rem; }
        .vt-how h3 { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--vt-dark); margin-bottom: 0.6rem; }
        .vt-how ul { padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.92rem; color: #607060; list-style: disc; }
      `}</style>

      <div className="vt-root">
        {/* ── Hero ── */}
        <section className="vt-hero">
          <div className="vt-hero-inner">
            <nav className="vt-breadcrumb">
              <a href="#/">Home</a>
              <span>/</span>
              <a href="#/planejamento/calculadoras/metas">Ferramentas</a>
              <span>/</span>
              <span style={{ color: "#d9d4c4" }}>Reserva Dinâmica</span>
            </nav>
            <h1>
              Calculadora de <span>Reserva Dinâmica</span>
            </h1>
            <p>
              Para quem tem renda instável: toda renda entra na reserva e, todo mês, a reserva paga o seu salário fixo. O que passar do teto vai para a aposentadoria.
            </p>
            <ShareRow title="Calculadora de Reserva Dinâmica | Orienta" style={{ marginTop: "20px" }} />
          </div>
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
          <div>
            <div className="vt-section-heading">
              <h2>Monte a sua reserva em 3 passos</h2>
              <p>Responda uma pergunta de cada vez e descubra o teto e quanto falta para chegar lá.</p>
            </div>

            <div className="vt-card" onKeyDown={onKeyDown}>
              {/* Stepper */}
              <div className="vt-steps" role="list">
                {STEPS.map((s, i) => (
                  <div key={s.title} style={{ display: "contents" }}>
                    <button
                      type="button"
                      role="listitem"
                      className={
                        "vt-step-dot" + (i === step ? " active" : i < step ? " done clickable" : "")
                      }
                      aria-current={i === step ? "step" : undefined}
                      onClick={() => i < step && setStep(i)}
                    >
                      <span className="vt-step-num">{i < step ? "✓" : i + 1}</span>
                      <span className="vt-step-name">{s.title}</span>
                    </button>
                    {i < STEPS.length - 1 && <div className={"vt-step-line" + (i < step ? " done" : "")} />}
                  </div>
                ))}
              </div>

              <p className="vt-question">{STEPS[step].question}</p>
              <p className="vt-hint">{STEPS[step].hint}</p>

              {step === 0 && (
                <div className="vt-field">
                  <label className="vt-label" htmlFor="rd-salario">4º pior mês (R$)</label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      id="rd-salario"
                      className="vt-input has-prefix"
                      inputMode="numeric"
                      placeholder="Ex: 4.000,00"
                      value={salary}
                      onChange={(e) => setSalary(maskBRL(e.target.value))}
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="vt-field">
                  <label className="vt-label" htmlFor="rd-meses">Meses de salário</label>
                  <div className="vt-input-wrap">
                    <input
                      id="rd-meses"
                      className="vt-input has-suffix"
                      inputMode="decimal"
                      placeholder="Ex: 6"
                      value={months}
                      onChange={(e) => setMonths(e.target.value.replace(/[^\d,.]/g, ""))}
                      autoFocus
                    />
                    <span className="vt-suffix">meses</span>
                  </div>
                  <div className="vt-chips">
                    {["3", "6", "9", "12"].map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={"vt-chip" + (months === m ? " on" : "")}
                        onClick={() => setMonths(m)}
                      >
                        {m} meses
                      </button>
                    ))}
                  </div>
                  {parseBRL(salary) > 0 && parseMeses(months) > 0 && (
                    <p className="vt-teto-preview">
                      Teto = {fmtMeses(parseMeses(months))} × R$ {formatBRL(parseBRL(salary))} ={" "}
                      <strong>R$ {formatBRL(parseBRL(salary) * parseMeses(months))}</strong>
                    </p>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="vt-field">
                  <label className="vt-label" htmlFor="rd-reserva">Reserva hoje (R$)</label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      id="rd-reserva"
                      className="vt-input has-prefix"
                      inputMode="numeric"
                      placeholder="Ex: 12.000,00 (pode ser zero)"
                      value={reserve}
                      onChange={(e) => setReserve(maskBRL(e.target.value))}
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {error && <p className="vt-error" role="alert">{error}</p>}

              <div className="vt-actions">
                {step > 0 && (
                  <button type="button" className="vt-btn-ghost" onClick={back}>
                    Voltar
                  </button>
                )}
                <button type="button" className="vt-btn" onClick={last ? calculate : next}>
                  {last ? "Calcular Reserva" : "Próximo passo"}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Results */}
            <div ref={resultsRef}>
              {results && (
                <>
                  <div className="vt-results-grid">
                    {[
                      { label: "Salário que você se paga", value: `R$ ${formatBRL(results.salario)}`, sub: "4º pior mês", hl: false },
                      { label: "Teto da reserva", value: `R$ ${formatBRL(results.teto)}`, sub: `${fmtMeses(results.meses)} meses de salário`, hl: true },
                      {
                        label: atingiuTeto ? "Acima do teto" : "Falta para o teto",
                        value: `R$ ${formatBRL(atingiuTeto ? results.excedente : results.falta)}`,
                        sub: atingiuTeto ? "pode ir para a aposentadoria" : `reserva atual: R$ ${formatBRL(results.reserva)}`,
                        hl: false,
                      },
                    ].map((c, i) => (
                      <div
                        key={c.label}
                        className={"result-card" + (c.hl ? " result-card--highlight" : "")}
                        style={{
                          borderLeft: c.hl ? undefined : "4px solid #abccb5",
                          opacity: resultsVisible ? 1 : 0,
                          transform: resultsVisible ? "translateY(0)" : "translateY(12px)",
                          transition: "opacity 0.45s ease, transform 0.45s ease",
                          transitionDelay: `${i * 80}ms`,
                        }}
                      >
                        <p className="result-label">{c.label}</p>
                        <p className="result-value">{c.value}</p>
                        <p className="result-sub">{c.sub}</p>
                      </div>
                    ))}
                  </div>

                  <div className="vt-progress" style={{ opacity: resultsVisible ? 1 : 0, transition: "opacity 0.45s ease 0.25s" }}>
                    <div className="vt-progress-head">
                      <span>Sua reserva hoje cobre {fmtMeses(results.mesesCobertos)} {results.mesesCobertos === 1 ? "mês" : "meses"} de salário</span>
                      <span>{Math.round(results.pct)}% do teto</span>
                    </div>
                    <div className="vt-progress-track" role="progressbar" aria-valuenow={Math.round(results.pct)} aria-valuemin={0} aria-valuemax={100}>
                      <div
                        className={"vt-progress-bar" + (atingiuTeto ? " full" : "")}
                        style={{ width: resultsVisible ? `${results.pct}%` : "0%" }}
                      />
                    </div>
                  </div>

                  <div className={"vt-conclusion" + (resultsVisible ? " visible" : "")}>
                    {atingiuTeto ? (
                      <>
                        Sua reserva já está no teto de <strong>R$ {formatBRL(results.teto)}</strong>. Depois de pagar seu
                        salário de <strong>R$ {formatBRL(results.salario)}</strong>, tudo o que passar do teto pode ir para a aposentadoria.
                      </>
                    ) : (
                      <>
                        Pague-se <strong>R$ {formatBRL(results.salario)}</strong> por mês. Continue colocando toda a renda na reserva até
                        chegar em <strong>R$ {formatBRL(results.teto)}</strong>: faltam{" "}
                        <strong>R$ {formatBRL(results.falta)}</strong>.
                      </>
                    )}
                  </div>

                  <div className="vt-how">
                    <h3>Como funciona</h3>
                    <ul>
                      <li>A renda de cada mês entra na reserva. O salário é pago no fim do mês.</li>
                      <li>O teto só vale depois do pagamento. O que passar dele vai para a aposentadoria.</li>
                      <li>Se a reserva não tiver o salário inteiro, ela paga o que tem e você repõe nos meses melhores.</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          <CalculadoraSidebar
            promo={{
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",
              imageAlt: "Moedas empilhadas com planta crescendo",
              badge: "Destaque",
              title: "Quanto de seguro de vida você precisa?",
              description: "Descubra o capital ideal para proteger quem depende de você.",
              href: "#/seguros",
            }}
            resources={[
              { icon: "calc", title: "Calculadora de Aposentadoria", desc: "Para onde vai o que passa do teto.", href: "#/planejamento/calculadoras/aposentadoria" },
              { icon: "calc", title: "Calculadora de Metas", desc: "O poder do tempo ao seu favor.", href: "#/planejamento/calculadoras/metas" },
              { icon: "stats", title: "Comparador de Renda Fixa", desc: "Onde deixar a sua reserva.", href: "#/investimentos/renda-fixa/comparador" },
              { icon: "article", title: "Controle de Despesas", desc: "Pequenas mudanças, grandes resultados.", href: "#/planejamento/despesas" },
            ]}
          />
        </main>

        <CalculadoraTextBlock>
          <h2 className="text-3xl font-bold text-foreground mb-6">Pense em baldes d'água</h2>

          <figure className="my-6 rounded-lg border border-border bg-white p-4">
            <svg
              viewBox="150 20 800 480"
              role="img"
              aria-labelledby="reserva-baldes-title"
              style={{ width: "100%", height: "auto", display: "block", fontFamily: "'Work Sans', sans-serif" }}
            >
              <title id="reserva-baldes-title">
                A renda cai como uma torneira na Conta 2, que paga um salário constante para a Conta 1. O que passa do teto vai para a aposentadoria.
              </title>
              <g stroke="#1A2E35" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
                {/* sombras */}
                <g stroke="none" fill="#e2e8e8">
                  <polygon points="728,160 718,458 706,458 716,160" />
                  <polygon points="348,340 341,458 332,458 338,340" />
                </g>

                {/* torneira */}
                <line x1="430" y1="58" x2="430" y2="70" />
                <circle cx="430" cy="45" r="13" fill="#2ecc71" />
                <rect x="298" y="70" width="310" height="38" rx="6" fill="#f39c12" />
                <rect x="285" y="63" width="14" height="52" rx="4" fill="#1A2E35" />
                <rect x="580" y="70" width="36" height="64" rx="8" fill="#f39c12" />
                <rect x="572" y="134" width="52" height="12" rx="4" fill="#1A2E35" />

                {/* Conta 2 */}
                <polygon points="478,158 722,158 712,450 488,450" fill="#fff" />
                <polygon points="486,262 714,262 709,447 491,447" fill="#2ecc71" stroke="none" />
                <polygon points="478,158 722,158 712,450 488,450" fill="none" />
                <line x1="474" y1="154" x2="845" y2="154" strokeWidth="12" />

                {/* teto */}
                <line x1="470" y1="241" x2="727" y2="241" stroke="#f39c12" strokeWidth="5" strokeDasharray="14 9" />
                <rect x="395" y="229" width="68" height="26" rx="13" fill="#f39c12" stroke="none" />

                {/* Conta 1 */}
                <polygon points="228,338 342,338 335,450 235,450" fill="#2ecc71" />
                <line x1="222" y1="333" x2="346" y2="333" strokeWidth="12" />

                {/* cano e válvula */}
                <rect x="335" y="416" width="158" height="28" fill="#fff3df" strokeWidth="5" />
                <line x1="413" y1="414" x2="413" y2="398" />
                <line x1="396" y1="397" x2="432" y2="397" />
                <circle cx="413" cy="430" r="16" fill="#f39c12" />

                {/* aposentadoria */}
                <polygon points="775,274 925,274 912,450 787,450" fill="#fff" />
                <line x1="767" y1="269" x2="932" y2="269" strokeWidth="12" />
              </g>

              {/* sol */}
              <circle cx="875" cy="84" r="11" fill="#f39c12" />
              <g stroke="#2ecc71" strokeWidth="5" strokeLinecap="round">
                <line x1="875" y1="46" x2="875" y2="60" />
                <line x1="875" y1="108" x2="875" y2="122" />
                <line x1="836" y1="84" x2="850" y2="84" />
                <line x1="900" y1="84" x2="914" y2="84" />
                <line x1="848" y1="57" x2="858" y2="67" />
                <line x1="892" y1="101" x2="902" y2="111" />
                <line x1="902" y1="57" x2="892" y2="67" />
                <line x1="858" y1="101" x2="848" y2="111" />
              </g>

              {/* rótulos */}
              <g fill="#1A2E35" fontWeight="800" fontSize="22" textAnchor="middle">
                <text x="285" y="487">CONTA 1</text>
                <text x="600" y="487">CONTA 2</text>
                <text x="850" y="487">APOSENTADORIA</text>
              </g>
              <text x="270" y="96" fill="#1A2E35" fontWeight="800" fontSize="22" textAnchor="end">RENDA</text>
              <text x="429" y="247" fill="#1A2E35" fontWeight="800" fontSize="15" textAnchor="middle">TETO</text>
            </svg>
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              A renda cai na Conta 2, que paga um valor fixo para a Conta 1. O que passa do teto transborda para a aposentadoria.
            </figcaption>
          </figure>

          <p>
            Quem tem renda instável, como autônomos, freelancers, comissionados e empresários, convive com meses muito bons e meses muito ruins. A reserva dinâmica transforma essa montanha-russa em um salário previsível, usando duas contas:
          </p>

          <ul>
            <li>
              <strong>Conta 1 — onde ficam seus gastos.</strong> É a conta que você usa no dia a dia: aluguel, mercado, cartão e lazer saem dela. Todo mês ela recebe o mesmo valor, como se fosse um salário.
            </li>
            <li>
              <strong>Conta 2 — onde fica sua renda.</strong> Tudo o que você ganha entra aqui, seja muito ou pouco. Ela funciona como a reserva e, todo mês, transfere o salário fixo para a Conta 1.
            </li>
          </ul>

          <p>
            Assim, nos meses fortes a Conta 2 enche, e nos meses fracos ela continua pagando o seu salário sem sufoco.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Por que o 4º pior mês?</h3>

          <p>
            Pegar o melhor mês seria otimista demais, e o pior mês pode ser um ponto fora da curva. O 4º pior mês dos últimos meses é um valor que você já provou conseguir alcançar com certa frequência, por isso é um bom salário para se pagar sem esvaziar a reserva.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">E o teto?</h3>

          <p>
            O teto é quantos meses de salário você quer manter guardados. Ele protege você nos meses fracos, mas a reserva não precisa crescer para sempre: depois de pagar o salário, tudo o que passar do teto pode ser investido na aposentadoria.
          </p>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8">
            <p className="text-foreground font-semibold mb-0">
              <strong>Em resumo:</strong> defina um salário, defina um teto e deixe a reserva absorver a instabilidade da sua renda. Simulação ilustrativa, não é recomendação financeira.
            </p>
          </div>
        </CalculadoraTextBlock>

        <OutrasFerramentas />
      </div>
    </>
  );
}
