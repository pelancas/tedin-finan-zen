import { useRef, useState } from "react";
import { CalculadoraSidebar } from "@/components/layout/CalculadoraSidebar";
import { CalculadoraTextBlock } from "@/components/layout/CalculadoraTextBlock";

// ─── Types ────────────────────────────────────────────────────────────────────
type Classificacao = "confortavel" | "possivel" | "arriscado";

interface Results {
  precoImovel: number;
  entrada: number;
  percentualEntrada: number;
  financiamento: number;
  parcelaEstimada: number;
  sobraMensal: number;
  classificacao: Classificacao;
  limiteConfortavel: number;
  limitePossivel: number;
  entradaExcedeDisponivel: boolean;
}

// ─── Regras usadas no cálculo ───────────────────────────────────────────────
// Comprometimento de renda com a parcela do imóvel — a mesma lógica que os
// bancos usam para aprovar financiamento habitacional no Brasil.
const PERCENTUAL_CONFORTAVEL = 0.2; // 20% da renda — cenário conservador
const PERCENTUAL_POSSIVEL = 0.3; // 30% da renda — regra clássica dos bancos

// ─── Helpers ──────────────────────────────────────────────────────────────────
const parseBRL = (v: string) => parseFloat(v.replace(/\./g, "").replace(",", ".")) || 0;

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const maskBRL = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10) / 100;
  return num.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
};

/** Parcela mensal (PMT) de um financiamento pela tabela Price. */
function pmt(principal: number, meses: number, taxaMensal: number): number {
  if (principal <= 0 || meses <= 0) return 0;
  if (taxaMensal === 0) return principal / meses;
  return (principal * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -meses));
}

/** Financiamento máximo sustentado por uma parcela mensal — inverso do PMT. */
function maxFinanciamento(parcelaMax: number, meses: number, taxaMensal: number): number {
  if (parcelaMax <= 0 || meses <= 0) return 0;
  if (taxaMensal === 0) return parcelaMax * meses;
  return (parcelaMax * (1 - Math.pow(1 + taxaMensal, -meses))) / taxaMensal;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  accent,
  delay = 0,
  visible,
}: {
  label: string;
  value: string;
  sub?: string;
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
      <p className="result-value">{value}</p>
      {sub && <p className="result-sub">{sub}</p>}
    </div>
  );
}

const TIER_CONFIG: Record<
  Classificacao,
  { titulo: string; cor: string; corFundo: string; descricao: string }
> = {
  confortavel: {
    titulo: "Confortável",
    cor: "#0e6b3a",
    corFundo: "rgba(29,175,102,0.08)",
    descricao: "A parcela cabe folgada na sua renda, sem apertar o orçamento.",
  },
  possivel: {
    titulo: "Possível",
    cor: "#9a6200",
    corFundo: "rgba(232,160,32,0.1)",
    descricao: "Dentro do limite que os bancos costumam aprovar, mas exige planejamento.",
  },
  arriscado: {
    titulo: "Arriscado",
    cor: "#b42318",
    corFundo: "rgba(220,38,38,0.08)",
    descricao: "Comprometeria mais renda do que o recomendado — reavalie antes de seguir.",
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CalculadoraPossoComprar() {
  const [renda, setRenda] = useState("");
  const [rendaMesBaixo, setRendaMesBaixo] = useState<boolean | null>(null);
  const [patrimonioDisponivel, setPatrimonioDisponivel] = useState("");
  const [gastosMensais, setGastosMensais] = useState("");
  const [precoImovel, setPrecoImovel] = useState("");
  const [entrada, setEntrada] = useState("");
  const [prazoAnos, setPrazoAnos] = useState("30");
  const [taxaAnual, setTaxaAnual] = useState("11,0");

  const [results, setResults] = useState<Results | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const rendaValor = parseBRL(renda);
    const disponivel = parseBRL(patrimonioDisponivel);
    const gastos = parseBRL(gastosMensais);
    const preco = parseBRL(precoImovel);
    const entradaValor = parseBRL(entrada);
    const anos = parseInt(prazoAnos, 10) || 0;
    const taxa = (parseFloat(taxaAnual.replace(",", ".")) || 0) / 100;

    if (!preco || !anos) return;

    const meses = anos * 12;
    const rm = Math.pow(1 + taxa, 1 / 12) - 1;

    const financiamento = Math.max(0, preco - entradaValor);
    const parcelaEstimada = pmt(financiamento, meses, rm);

    const capacidadeConfortavel = Math.max(0, rendaValor * PERCENTUAL_CONFORTAVEL);
    const capacidadePossivel = Math.max(0, rendaValor * PERCENTUAL_POSSIVEL);

    const limiteConfortavel = maxFinanciamento(capacidadeConfortavel, meses, rm) + disponivel;
    const limitePossivel = maxFinanciamento(capacidadePossivel, meses, rm) + disponivel;

    const classificacao: Classificacao =
      preco <= limiteConfortavel ? "confortavel" : preco <= limitePossivel ? "possivel" : "arriscado";

    setResults({
      precoImovel: preco,
      entrada: entradaValor,
      percentualEntrada: preco > 0 ? (entradaValor / preco) * 100 : 0,
      financiamento,
      parcelaEstimada,
      sobraMensal: rendaValor - gastos - parcelaEstimada,
      classificacao,
      limiteConfortavel,
      limitePossivel,
      entradaExcedeDisponivel: disponivel > 0 && entradaValor > disponivel,
    });

    setResultsVisible(false);
    setTimeout(() => setResultsVisible(true), 50);

    if (window.innerWidth < 768) {
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        150,
      );
    }
  };

  const tier = results ? TIER_CONFIG[results.classificacao] : null;

  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        .vt-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
          --vt-cream:   #FFFDF5;
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

        /* Section heading */
        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); display: flex; align-items: center; gap: 0.6rem; }
        .vt-section-heading h2 svg { color: var(--vt-dark); flex-shrink: 0; }
        .vt-section-heading p { color: #607060; font-size: 1rem; font-weight: 400; }

        /* Card */
        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        /* Two-column form layout */
        .vt-two-col { display: flex; flex-direction: column; gap: 1.25rem; }
        @media (min-width: 640px) {
          .vt-two-col { flex-direction: row; align-items: stretch; gap: 1.5rem; }
          .vt-col { flex: 1; }
        }
        .vt-col { display: flex; flex-direction: column; gap: 1rem; }
        .vt-col-heading { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #8aab96; margin: 0.5rem 0 -0.35rem; }
        .vt-col-heading:first-child { margin-top: 0; }

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

        .vt-inline-row { display: flex; gap: 0.75rem; }
        .vt-inline-row .vt-field { flex: 1; }

        /* Toggle Fixa / Varia */
        .vt-toggle {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem;
          background: #f7f9f7; border: 1.5px solid #d0dbd2; border-radius: 0.6rem; padding: 0.3rem;
        }
        .vt-toggle-btn {
          padding: 0.55rem 0.5rem; border: none; border-radius: 0.4rem; background: transparent;
          font-family: 'Work Sans', sans-serif; font-size: 0.8rem; font-weight: 700; color: #607060;
          cursor: pointer; transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .vt-toggle-btn.active { background: var(--vt-dark); color: #fff; box-shadow: 0 2px 8px rgba(29,175,102,0.3); }

        /* CTA button */
        .vt-btn {
          width: 100%; margin-top: 1.5rem;
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
        .vt-results-grid + .vt-results-grid { margin-top: 0.75rem; }

        .result-card { background: #fff; border-radius: 0.75rem; padding: 1.25rem 1.5rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); border: none; box-shadow: 0 4px 16px rgba(26,69,55,0.18); }
        .result-card--highlight .result-label { color: #7ab898; }
        .result-card--highlight .result-value { color: #fff; font-size: 1.5rem; }
        .result-card--highlight .result-sub { color: #a3b8ac; }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.35rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.75rem; font-weight: 500; color: #8aab96; margin-top: 0.25rem; }
        .result-sub.negativo { color: #dc2626; font-weight: 700; }

        /* Badge de classificação */
        .vt-status-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;
          padding: 0.4rem 0.9rem; border-radius: 999px; margin-top: 0.75rem;
        }

        /* Tiers — Confortável / Possível / Arriscado */
        .vt-tier-grid { display: grid; gap: 0.75rem; margin-top: 0.75rem; }
        @media (min-width: 640px) { .vt-tier-grid { grid-template-columns: repeat(3, 1fr); } }
        .vt-tier-card {
          border-radius: 0.75rem; padding: 1.25rem; border: 2px solid transparent;
          background: #f7f9f7; transition: all 0.3s ease;
          opacity: 0; transform: translateY(12px);
        }
        .vt-tier-card.visible { opacity: 1; transform: translateY(0); }
        .vt-tier-card.active { border-color: currentColor; box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
        .vt-tier-title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem; }
        .vt-tier-value { font-size: 1.25rem; font-weight: 900; color: var(--vt-darker); margin-bottom: 0.4rem; }
        .vt-tier-desc { font-size: 0.78rem; color: #607060; line-height: 1.4; }

        /* Alerta */
        .vt-alert {
          margin-top: 0.75rem; padding: 0.85rem 1.1rem;
          background: #fff5f5; border-left: 4px solid #dc2626; border-radius: 0 0.6rem 0.6rem 0;
          font-size: 0.85rem; font-weight: 500; color: #7f1d1d;
        }

        /* Frase de conclusao */
        .vt-conclusion {
          margin-top: 1.25rem; padding: 1rem 1.25rem;
          background: #f0faf5; border-left: 4px solid var(--vt-dark); border-radius: 0 0.6rem 0.6rem 0;
          font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s;
        }
        .vt-conclusion.visible { opacity: 1; transform: translateY(0); }
        .vt-conclusion strong { color: #0e6b3a; }
      `}</style>

      <div className="vt-root">
        {/* ── Hero ── */}
        <section className="vt-hero">
          <div className="vt-hero-inner">
            <nav className="vt-breadcrumb">
              <a href="#/">Home</a>
              <span>/</span>
              <a href="#/">Imóveis</a>
              <span>/</span>
              <span style={{ color: "#d9d4c4" }}>Calculadora</span>
            </nav>
            <h1>
              Posso comprar <span>este imóvel?</span>
            </h1>
            <p>
              Cruzamos sua renda, patrimônio e compromissos mensais com o preço do imóvel e as
              condições do financiamento, para você saber se essa compra é confortável, possível
              ou arriscada — antes de assinar qualquer proposta.
            </p>
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
          {/* ── Left: Calculator ── */}
          <div>
            <div className="vt-section-heading">
              <h2>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Avalie a compra do seu imóvel
              </h2>
              <p>Preencha sua situação financeira e os dados do imóvel que você está avaliando.</p>
            </div>

            <div className="vt-card">
              <div className="vt-two-col">
                {/* Coluna esquerda: renda e patrimônio */}
                <div className="vt-col">
                  <p className="vt-col-heading">Sua renda mensal</p>
                  <div className="vt-field">
                    <label className="vt-label">Renda média últimos 6 meses</label>
                    <div className="vt-input-wrap">
                      <span className="vt-prefix">R$</span>
                      <input
                        className="vt-input has-prefix"
                        placeholder="Ex: 8.000,00"
                        value={renda}
                        onChange={(e) => setRenda(maskBRL(e.target.value))}
                      />
                    </div>
                  </div>

                  {parseBRL(renda) > 0 && (
                    <div className="vt-field">
                      <label className="vt-label">
                        Sua renda em algum desses meses foi menor que R${" "}
                        {formatBRL(parseBRL(renda) / 3)}?
                      </label>
                      <div className="vt-toggle">
                        <button
                          type="button"
                          className={"vt-toggle-btn" + (rendaMesBaixo === true ? " active" : "")}
                          onClick={() => setRendaMesBaixo(true)}
                        >
                          Sim
                        </button>
                        <button
                          type="button"
                          className={"vt-toggle-btn" + (rendaMesBaixo === false ? " active" : "")}
                          onClick={() => setRendaMesBaixo(false)}
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="vt-field">
                    <label className="vt-label">Patrimônio disponível para imóvel</label>
                    <div className="vt-input-wrap">
                      <span className="vt-prefix">R$</span>
                      <input
                        className="vt-input has-prefix"
                        placeholder="Ex: 250.000,00"
                        value={patrimonioDisponivel}
                        onChange={(e) => setPatrimonioDisponivel(maskBRL(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="vt-field">
                    <label className="vt-label">Gastos mensais</label>
                    <div className="vt-input-wrap">
                      <span className="vt-prefix">R$</span>
                      <input
                        className="vt-input has-prefix"
                        placeholder="Ex: 3.500,00"
                        value={gastosMensais}
                        onChange={(e) => setGastosMensais(maskBRL(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                {/* Coluna direita: o imóvel e o financiamento */}
                <div className="vt-col">
                  <p className="vt-col-heading">O imóvel</p>
                  <div className="vt-field">
                    <label className="vt-label">Preço do imóvel</label>
                    <div className="vt-input-wrap">
                      <span className="vt-prefix">R$</span>
                      <input
                        className="vt-input has-prefix"
                        placeholder="Ex: 900.000,00"
                        value={precoImovel}
                        onChange={(e) => setPrecoImovel(maskBRL(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="vt-field">
                    <label className="vt-label">Entrada que pretende dar</label>
                    <div className="vt-input-wrap">
                      <span className="vt-prefix">R$</span>
                      <input
                        className="vt-input has-prefix"
                        placeholder="Ex: 250.000,00"
                        value={entrada}
                        onChange={(e) => setEntrada(maskBRL(e.target.value))}
                      />
                    </div>
                  </div>

                  <p className="vt-col-heading">Condições do financiamento</p>
                  <div className="vt-inline-row">
                    <div className="vt-field">
                      <label className="vt-label">Prazo</label>
                      <div className="vt-input-wrap">
                        <input
                          className="vt-input has-suffix"
                          type="number"
                          min={1}
                          max={35}
                          placeholder="30"
                          value={prazoAnos}
                          onChange={(e) => setPrazoAnos(e.target.value)}
                        />
                        <span className="vt-suffix">anos</span>
                      </div>
                    </div>
                    <div className="vt-field">
                      <label className="vt-label">Taxa de juros</label>
                      <div className="vt-input-wrap">
                        <input
                          className="vt-input has-suffix"
                          placeholder="11,0"
                          value={taxaAnual}
                          onChange={(e) => setTaxaAnual(e.target.value)}
                        />
                        <span className="vt-suffix">% a.a.</span>
                      </div>
                    </div>
                  </div>

                  <button className="vt-btn" onClick={calculate}>
                    Avaliar imóvel
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div ref={resultsRef}>
              {results && tier && (
                <>
                  <div className="vt-results-grid">
                    <StatCard
                      label="Preço do imóvel"
                      value={`R$ ${formatBRL(results.precoImovel)}`}
                      accent="#abccb5"
                      visible={resultsVisible}
                    />
                    <StatCard
                      label="Entrada"
                      value={`R$ ${formatBRL(results.entrada)}`}
                      sub={`${results.percentualEntrada.toFixed(0)}% do preço`}
                      accent="#e8a020"
                      delay={60}
                      visible={resultsVisible}
                    />
                    <StatCard
                      label="Financiamento"
                      value={`R$ ${formatBRL(results.financiamento)}`}
                      accent="#abccb5"
                      delay={120}
                      visible={resultsVisible}
                    />
                  </div>

                  <div className="vt-results-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <div
                      className="result-card result-card--highlight"
                      style={{
                        transitionDelay: "180ms",
                        opacity: resultsVisible ? 1 : 0,
                        transform: resultsVisible ? "translateY(0)" : "translateY(12px)",
                        transition: "opacity 0.45s ease, transform 0.45s ease",
                      }}
                    >
                      <p className="result-label">Parcela estimada</p>
                      <p className="result-value">R$ {formatBRL(results.parcelaEstimada)}/mês</p>
                      <p className="result-sub">
                        {prazoAnos} anos, {taxaAnual}% ao ano
                      </p>
                      <span
                        className="vt-status-badge"
                        style={{ background: tier.corFundo, color: tier.cor }}
                      >
                        {tier.titulo}
                      </span>
                    </div>
                    <StatCard
                      label="Sobra mensal estimada"
                      value={`R$ ${formatBRL(Math.abs(results.sobraMensal))}${results.sobraMensal < 0 ? " (falta)" : ""}`}
                      sub="renda − gastos − parcela"
                      accent={results.sobraMensal < 0 ? "#dc2626" : "#1daf66"}
                      delay={240}
                      visible={resultsVisible}
                    />
                  </div>

                  {results.entradaExcedeDisponivel && (
                    <div className="vt-alert">
                      A entrada informada é maior do que o patrimônio disponível — reveja os
                      valores antes de seguir em frente.
                    </div>
                  )}

                  {rendaMesBaixo === true && (
                    <div className="vt-alert">
                      Sua renda variou bastante nos últimos 6 meses — priorize a faixa{" "}
                      <strong>Confortável</strong>, para não apertar o orçamento num mês mais
                      fraco.
                    </div>
                  )}

                  <div className="vt-section-heading" style={{ marginTop: "2rem", marginBottom: "0" }}>
                    <h2 style={{ fontSize: "1.3rem" }}>Sua faixa de preço</h2>
                    <p>Com base na sua renda e no patrimônio disponível para o imóvel.</p>
                  </div>
                  <div className="vt-tier-grid">
                    {(["confortavel", "possivel", "arriscado"] as Classificacao[]).map((key, i) => {
                      const cfg = TIER_CONFIG[key];
                      const valor =
                        key === "confortavel"
                          ? `até R$ ${formatBRL(results.limiteConfortavel)}`
                          : key === "possivel"
                            ? `até R$ ${formatBRL(results.limitePossivel)}`
                            : `acima de R$ ${formatBRL(results.limitePossivel)}`;
                      return (
                        <div
                          key={key}
                          className={
                            "vt-tier-card" +
                            (resultsVisible ? " visible" : "") +
                            (results.classificacao === key ? " active" : "")
                          }
                          style={{
                            color: cfg.cor,
                            background: cfg.corFundo,
                            transitionDelay: `${300 + i * 80}ms`,
                          }}
                        >
                          <p className="vt-tier-title">{cfg.titulo}</p>
                          <p className="vt-tier-value">{valor}</p>
                          <p className="vt-tier-desc">{cfg.descricao}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className={"vt-conclusion" + (resultsVisible ? " visible" : "")}>
                    Este imóvel de <strong>R$ {formatBRL(results.precoImovel)}</strong> está na
                    faixa <strong>{tier.titulo.toLowerCase()}</strong> para o seu momento
                    financeiro — com uma parcela estimada de{" "}
                    <strong>R$ {formatBRL(results.parcelaEstimada)} por mês</strong>.
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <CalculadoraSidebar
            promo={{
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",
              imageAlt: "Casa com selo de avaliação de risco",
              badge: "Antes de comprar",
              title: "Relatório de Avaliação de Riscos",
              description: "Confira certidões e processos do vendedor antes de fechar negócio.",
              href: "#/relatorio-avaliacao-riscos",
            }}
            resources={[
              { icon: "calc", title: "Calculadora do Milhão", desc: "Quanto tempo até seu primeiro milhão.", href: "#/planejamento/calculadoras/milhao" },
              { icon: "calc", title: "Calculadora de Metas", desc: "O poder do tempo ao seu favor.", href: "#/planejamento/calculadoras/metas" },
              { icon: "stats", title: "Comparador de Renda Fixa", desc: "Calcule qual melhor produto.", href: "#/investimentos/renda-fixa/comparador" },
              { icon: "article", title: "Formas de Economizar", desc: "Pequenas mudanças, grandes resultados.", href: "#/planejamento/despesas" },
            ]}
          />
        </main>

        <CalculadoraTextBlock>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Como saber se você pode comprar um imóvel?
          </h2>

          <p>
            A pergunta não é só "o banco aprova o financiamento?" — é se a parcela cabe na sua
            vida sem sufocar seu orçamento todo mês. Os bancos costumam aprovar financiamentos em
            que a parcela compromete até 30% da renda mensal do comprador. É uma referência útil,
            mas não é garantia de conforto: comprometer o teto que o banco permite, ano após ano,
            deixa pouca margem para imprevistos.
          </p>

          <p>
            Por isso esta calculadora trabalha com três faixas sobre a mesma renda informada. A
            faixa <strong>confortável</strong> considera um comprometimento mais conservador (20%)
            — o cenário em que a parcela cabe mesmo nos meses mais fracos. A faixa{" "}
            <strong>possível</strong> usa o limite clássico de 30% — o que um banco típico
            aprovaria. Acima disso, entra a faixa <strong>arriscada</strong>: tecnicamente pode
            ser aprovado, mas comprometeria renda demais.
          </p>

          <p>
            Por isso pedimos a <strong>média dos últimos 6 meses</strong>, em vez de um valor
            fixo — evita superestimar sua capacidade de pagamento com base num mês bom isolado.
            E se em algum desses meses sua renda caiu abaixo de um terço da média, é sinal de que
            ela é instável: nesse caso, vale priorizar a faixa confortável, que já assume uma
            margem maior de segurança.
          </p>

          <p>
            O patrimônio disponível para o imóvel também importa: quanto mais você entra à vista,
            menor o financiamento e menor a parcela — o que empurra o preço do imóvel que você
            "pode comprar" para cima.
          </p>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8">
            <p className="text-foreground font-semibold mb-0">
              <strong>Em resumo:</strong> some seu patrimônio disponível ao financiamento máximo
              que sua renda sustenta, e você tem o teto real do que pode comprar. Use a
              calculadora acima com o preço do imóvel que você está avaliando para ver onde ele se
              encaixa.
            </p>
          </div>
        </CalculadoraTextBlock>
      </div>
    </>
  );
}
