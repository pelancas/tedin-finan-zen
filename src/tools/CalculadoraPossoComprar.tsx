import { useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { CalculadoraSidebar } from "@/components/layout/CalculadoraSidebar";
import { CalculadoraTextBlock } from "@/components/layout/CalculadoraTextBlock";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ShareRow } from "@/components/ShareRow";
import { OutrasFerramentas } from "@/components/OutrasFerramentas";

// ─── Types ────────────────────────────────────────────────────────────────────
type Variacao = "pouca" | "media" | "muita";
type Limitante = "entrada" | "renda";

interface Results {
  precoRecomendado: number;
  entradaEfetiva: number;
  custosCartorarios: number;
  financiamento: number;
  parcelaEstimada: number;
  percentualRendaComprometida: number;
  percentualEntradaFinal: number;
  limitante: Limitante;
}

// ─── Regras usadas no cálculo ───────────────────────────────────────────────
// Custos cartorários (ITBI, escritura, registro) estimados como % do valor do
// imóvel — saem do valor informado para entrada + custos, não do preço à parte.
const PCT_CUSTOS_CARTORARIOS = 0.07;
// A entrada precisa representar pelo menos 20% do valor do imóvel — trava o
// preço máximo que a entrada disponível sustenta.
const PCT_MIN_ENTRADA_IMOVEL = 0.2;
// Valores pré-preenchidos do financiamento simulado — a pessoa pode ajustá-los.
const TAXA_ANUAL_PADRAO = "14,0";
const PRAZO_ANOS_PADRAO = "30";
// O prazo nunca pode passar disso, mesmo se a pessoa digitar um valor maior.
const PRAZO_ANOS_MAXIMO = 30;

// Quanto da renda pode ir para a parcela, de acordo com a variação da renda —
// renda mais instável usa uma fatia menor, para sobrar margem de segurança.
const PERCENTUAL_RENDA: Record<Variacao, number> = {
  pouca: 0.25,
  media: 0.2,
  muita: 0.15,
};

const VARIACAO_CONFIG: Record<Variacao, { label: string; limiarPct: number; prefixo: string }> = {
  pouca: { label: "Pouco", limiarPct: 0.1, prefixo: "até" },
  media: { label: "Médio", limiarPct: 0.25, prefixo: "até" },
  muita: { label: "Muito", limiarPct: 0.25, prefixo: "mais de" },
};

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

/** Descreve a variação em reais, com base na renda informada, em vez de só em %. */
function descricaoVariacao(variacao: Variacao, renda: number): string {
  const cfg = VARIACAO_CONFIG[variacao];
  const valor = renda * cfg.limiarPct;
  return `Variação de ${cfg.prefixo} R$ ${formatBRL(valor)} entre meses`;
}

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
function InfoTooltip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="vt-tooltip-btn" aria-label="Mais informações">
          <HelpCircle size={14} />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[240px] text-xs leading-snug">{text}</TooltipContent>
    </Tooltip>
  );
}

function StatCard({
  label,
  value,
  sub,
  subAsPill = false,
  delay = 0,
  visible,
}: {
  label: string;
  value: string;
  sub?: string;
  subAsPill?: boolean;
  delay?: number;
  visible: boolean;
}) {
  return (
    <div
      className="result-card result-card--tone-green"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      <p className="result-label">{label}</p>
      <p className="result-value">{value}</p>
      {sub && (subAsPill ? <span className="result-pill">{sub}</span> : <p className="result-sub">{sub}</p>)}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CalculadoraPossoComprar() {
  const [renda, setRenda] = useState("");
  const [variacaoRenda, setVariacaoRenda] = useState<Variacao | null>(null);
  const [disponivelEntrada, setDisponivelEntrada] = useState("");
  const [prazoAnos, setPrazoAnos] = useState(PRAZO_ANOS_PADRAO);
  const [taxaAnual, setTaxaAnual] = useState(TAXA_ANUAL_PADRAO);

  const [results, setResults] = useState<Results | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const rendaPreenchida = parseBRL(renda) > 0;

  const calculate = () => {
    const rendaValor = parseBRL(renda);
    const disponivel = parseBRL(disponivelEntrada);
    const anos = Math.min(PRAZO_ANOS_MAXIMO, parseInt(prazoAnos, 10) || 0);
    const taxa = (parseFloat(taxaAnual.replace(",", ".")) || 0) / 100;

    if (!rendaValor || !disponivel || !variacaoRenda || !anos) return;

    const meses = anos * 12;
    const rm = Math.pow(1 + taxa, 1 / 12) - 1;

    // Os custos cartorários saem do valor disponível (entrada + custos) e
    // equivalem a 7% do preço do imóvel — por isso dependem do preço que
    // ainda estamos calculando. Isolando o preço nas duas equações abaixo:
    //   disponivel = entrada + 7%×preço  e  entrada ≥ 20%×preço (teto da entrada)
    //   disponivel = entrada + 7%×preço  e  financiamento = preço − entrada (teto da renda)
    const precoPorEntrada = disponivel / (PCT_MIN_ENTRADA_IMOVEL + PCT_CUSTOS_CARTORARIOS);

    const percentualRenda = PERCENTUAL_RENDA[variacaoRenda];
    const parcelaMax = rendaValor * percentualRenda;
    const financiamentoPorRenda = maxFinanciamento(parcelaMax, meses, rm);
    const precoPorRenda = (financiamentoPorRenda + disponivel) / (1 + PCT_CUSTOS_CARTORARIOS);

    const limitante: Limitante = precoPorEntrada <= precoPorRenda ? "entrada" : "renda";
    const precoRecomendado = Math.min(precoPorEntrada, precoPorRenda);

    const custosCartorarios = PCT_CUSTOS_CARTORARIOS * precoRecomendado;
    const entradaEfetiva = Math.max(0, disponivel - custosCartorarios);
    const financiamento = Math.max(0, precoRecomendado - entradaEfetiva);
    const parcelaEstimada = pmt(financiamento, meses, rm);

    setResults({
      precoRecomendado,
      entradaEfetiva,
      custosCartorarios,
      financiamento,
      parcelaEstimada,
      percentualRendaComprometida: rendaValor > 0 ? (parcelaEstimada / rendaValor) * 100 : 0,
      percentualEntradaFinal: precoRecomendado > 0 ? (entradaEfetiva / precoRecomendado) * 100 : 0,
      limitante,
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

        /* Two-column form layout — grid, para as linhas ficarem alinhadas entre as colunas */
        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; }
        @media (min-width: 640px) {
          .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        }
        .vt-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .vt-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vt-dark); line-height: 1.3; }
        /* Reserva a mesma altura (até 2 linhas) para rótulos pareados lado a lado,
           ancorando o texto embaixo — assim os dois inputs abaixo ficam alinhados
           mesmo quando um rótulo é mais longo e quebra linha e o outro não. */
        .vt-label-align { display: flex; align-items: flex-end; min-height: 2.3rem; }
        .vt-label-row { display: flex; align-items: center; gap: 0.3rem; }
        .vt-tooltip-btn {
          display: inline-flex; align-items: center; justify-content: center;
          background: none; border: none; padding: 0; margin: 0; line-height: 0;
          color: #8aab96; cursor: help; flex-shrink: 0;
        }
        .vt-tooltip-btn:hover { color: var(--vt-dark); }
        .vt-hint { font-size: 0.78rem; font-weight: 400; color: #607060; margin-top: -0.1rem; }
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
        /* Iguala a altura do Prazo/Taxa de juros à do seletor Pouco/Médio/Muito ao lado. */
        .vt-input--compact { padding-top: 0.74rem; padding-bottom: 0.74rem; }

        .vt-inline-row { display: flex; gap: 0.75rem; }
        .vt-inline-row .vt-field { flex: 1; }

        /* Toggle Pouca / Média / Muita */
        .vt-toggle {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.35rem;
          background: #f7f9f7; border: 1.5px solid #d0dbd2; border-radius: 0.6rem; padding: 0.3rem;
        }
        .vt-toggle-btn {
          padding: 0.55rem 0.5rem; border: none; border-radius: 0.4rem; background: transparent;
          font-family: 'Work Sans', sans-serif; font-size: 0.8rem; font-weight: 700; color: #607060;
          cursor: pointer; transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .vt-toggle-btn.active { background: var(--vt-dark); color: #fff; box-shadow: 0 2px 8px rgba(29,175,102,0.3); }
        .vt-toggle-btn:disabled { opacity: 0.45; cursor: not-allowed; }

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

        .result-card { background: #fff; border-radius: 0.9rem; padding: 1.25rem 1.5rem; box-shadow: none; }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); border: none; box-shadow: 0 4px 16px rgba(26,69,55,0.18); border-radius: 0.9rem; }
        .result-card--highlight .result-label { color: #7ab898; }
        .result-card--highlight .result-value { color: #fff; font-size: 1.5rem; }
        .result-card--highlight .result-sub { color: #a3b8ac; }

        .result-card--tone-green { background: rgba(29,175,102,0.08); }
        .result-card--tone-green .result-label { color: #0e6b3a; }

        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.35rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.75rem; font-weight: 500; color: #8aab96; margin-top: 0.25rem; }
        .result-pill {
          display: inline-flex; align-items: center; margin-top: 0.6rem;
          background: rgba(29,175,102,0.18); color: #0e6b3a;
          font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.75rem; border-radius: 999px;
        }

        .vt-info {
          margin-top: 0.75rem; padding: 0.9rem 1.25rem;
          background: rgba(29,175,102,0.08); border-radius: 0.9rem;
          font-size: 0.85rem; font-weight: 500; color: #0e6b3a;
        }
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
              Qual imóvel <span>você pode comprar?</span>
            </h1>
            <p>
              Descubra qual valor máximo de imóvel você pode comprar, financiando!
            </p>
            <ShareRow title="Posso Comprar Este Imóvel? | Orienta" style={{ marginTop: "20px" }} />
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
                Descubra o imóvel recomendado para você
              </h2>
              <p>Preencha sua renda e o quanto você tem disponível para dar entrada.</p>
            </div>

            <div className="vt-card">
              <div className="vt-two-col">
                <div className="vt-field">
                  <label className="vt-label vt-label-align">Renda média últimos 6 meses</label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      className="vt-input has-prefix"
                      placeholder="Ex: 8.000,00"
                      value={renda}
                      onChange={(e) => {
                        const v = maskBRL(e.target.value);
                        setRenda(v);
                        if (!parseBRL(v)) setVariacaoRenda(null);
                      }}
                    />
                  </div>
                </div>

                <div className="vt-field">
                  <label className="vt-label vt-label-align">
                    Valor disponível para entrada, custos cartorários e impostos
                  </label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      className="vt-input has-prefix"
                      placeholder="Ex: 150.000,00"
                      value={disponivelEntrada}
                      onChange={(e) => setDisponivelEntrada(maskBRL(e.target.value))}
                    />
                  </div>
                </div>

                <div className="vt-field">
                  <label className="vt-label">Quanto sua renda varia mês a mês?</label>
                  <div className="vt-toggle">
                    {(["pouca", "media", "muita"] as Variacao[]).map((v) => (
                      <button
                        key={v}
                        type="button"
                        disabled={!rendaPreenchida}
                        className={"vt-toggle-btn" + (variacaoRenda === v ? " active" : "")}
                        onClick={() => setVariacaoRenda(v)}
                      >
                        {VARIACAO_CONFIG[v].label}
                      </button>
                    ))}
                  </div>
                  {!rendaPreenchida && (
                    <p className="vt-hint">Informe sua renda para escolher a variação.</p>
                  )}
                  {rendaPreenchida && variacaoRenda && (
                    <p className="vt-hint">
                      {descricaoVariacao(variacaoRenda, parseBRL(renda))} — usaremos{" "}
                      {(PERCENTUAL_RENDA[variacaoRenda] * 100).toFixed(0)}% da sua renda na
                      parcela.
                    </p>
                  )}
                </div>

                <div className="vt-field">
                  <div className="vt-inline-row">
                    <div className="vt-field">
                      <div className="vt-label-row">
                        <label className="vt-label">Prazo</label>
                        <InfoTooltip text="É o prazo total do financiamento, em anos. O prazo máximo considerado aqui é de 30 anos." />
                      </div>
                      <div className="vt-input-wrap">
                        <input
                          className="vt-input has-suffix vt-input--compact"
                          type="number"
                          min={1}
                          max={PRAZO_ANOS_MAXIMO}
                          placeholder={PRAZO_ANOS_PADRAO}
                          value={prazoAnos}
                          onChange={(e) => {
                            const v = e.target.value;
                            const num = parseInt(v, 10);
                            setPrazoAnos(!isNaN(num) && num > PRAZO_ANOS_MAXIMO ? String(PRAZO_ANOS_MAXIMO) : v);
                          }}
                        />
                        <span className="vt-suffix">anos</span>
                      </div>
                    </div>
                    <div className="vt-field">
                      <div className="vt-label-row">
                        <label className="vt-label">Juros</label>
                        <InfoTooltip text="Consideramos 14% ao ano como padrão. Para saber a taxa real do seu financiamento, consulte o CET (Custo Efetivo Total) do banco e a TR (Taxa Referencial) vigente." />
                      </div>
                      <div className="vt-input-wrap">
                        <input
                          className="vt-input has-suffix vt-input--compact"
                          placeholder={TAXA_ANUAL_PADRAO}
                          value={taxaAnual}
                          onChange={(e) => setTaxaAnual(e.target.value)}
                        />
                        <span className="vt-suffix">% a.a.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="vt-btn" onClick={calculate}>
                Calcular imóvel recomendado
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Results */}
            <div ref={resultsRef}>
              {results && (
                <>
                  <div className="vt-results-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div
                      className="result-card result-card--highlight"
                      style={{
                        transitionDelay: "0ms",
                        opacity: resultsVisible ? 1 : 0,
                        transform: resultsVisible ? "translateY(0)" : "translateY(12px)",
                        transition: "opacity 0.45s ease, transform 0.45s ease",
                      }}
                    >
                      <p className="result-label">Imóvel recomendado</p>
                      <p className="result-value">até R$ {formatBRL(results.precoRecomendado)}</p>
                      <p className="result-sub">
                        Financiamento de {prazoAnos} anos a {taxaAnual}% ao ano
                      </p>
                    </div>
                  </div>

                  <div className="vt-results-grid">
                    <StatCard
                      label="Entrada utilizada"
                      value={`R$ ${formatBRL(results.entradaEfetiva)}`}
                      sub={`${results.percentualEntradaFinal.toFixed(0)}% do imóvel`}
                      subAsPill
                      delay={60}
                      visible={resultsVisible}
                    />
                    <StatCard
                      label="Custos (cartórios e ITBI)"
                      value={`R$ ${formatBRL(results.custosCartorarios)}`}
                      delay={120}
                      visible={resultsVisible}
                    />
                    <StatCard
                      label="Financiamento"
                      value={`R$ ${formatBRL(results.financiamento)}`}
                      sub={`Parcela de R$ ${formatBRL(results.parcelaEstimada)}/mês`}
                      delay={180}
                      visible={resultsVisible}
                    />
                  </div>

                  <div className="vt-info">
                    {results.limitante === "entrada"
                      ? "O valor foi limitado pela sua entrada disponível: sua renda sustentaria uma parcela maior, mas a entrada precisa representar pelo menos 20% do imóvel."
                      : "O valor foi limitado pela sua capacidade de pagamento mensal, considerando a variação da sua renda."}
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
            Como calculamos o imóvel que você pode comprar?
          </h2>

          <p>
            Em vez de avaliar um preço de imóvel que você já tem em mente, esta calculadora parte
            da sua renda e do valor que você tem disponível para entrada e custos cartoriais, e
            devolve o valor máximo de imóvel recomendado para o seu momento financeiro.
          </p>

          <p>
            Do valor informado para entrada + custos, descontamos os{" "}
            <strong>custos cartorários</strong> — ITBI, escritura e registro, estimados em{" "}
            <strong>7% do valor do imóvel</strong> — e o restante vira a entrada efetiva. Essa
            entrada precisa representar <strong>pelo menos 20% do valor do imóvel</strong> — o
            que já define um teto de preço só com base no que você tem guardado.
          </p>

          <p>
            Do lado da renda, pedimos a <strong>média dos últimos 6 meses</strong> e o quanto ela
            varia mês a mês, porque isso muda quanto dela pode ir com segurança para a parcela:
            renda <strong>pouco variável</strong> (até 10%) permite comprometer até 25%; renda com{" "}
            <strong>variação média</strong> (até 25%) usa 20%; e renda <strong>muito variável</strong>{" "}
            (acima de 25%) usa apenas 15%, para deixar margem nos meses mais fracos. Por padrão
            simulamos o financiamento com prazo de {PRAZO_ANOS_PADRAO} anos e taxa de{" "}
            {TAXA_ANUAL_PADRAO}% ao ano, mas você pode ajustar os dois valores na calculadora — o
            prazo máximo permitido é de {PRAZO_ANOS_MAXIMO} anos. A parcela é calculada pela{" "}
            <strong>Tabela Price</strong>, com valor fixo do início ao fim do financiamento.
          </p>

          <p>
            O valor final recomendado é sempre o <strong>menor</strong> entre o teto que sua
            entrada sustenta e o teto que sua renda sustenta — o que estiver mais apertado é quem
            define até onde você pode ir com segurança.
          </p>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8">
            <p className="text-foreground font-semibold mb-0">
              <strong>Em resumo:</strong> informe sua renda, o quanto ela varia e o valor
              disponível para entrada e custos, e a calculadora acima mostra o preço máximo de
              imóvel recomendado, a parcela estimada e o que limita esse valor.
            </p>
          </div>
        </CalculadoraTextBlock>

        <OutrasFerramentas exclude="/imoveis/calculadoras/posso-comprar" />
      </div>
    </>
  );
}
