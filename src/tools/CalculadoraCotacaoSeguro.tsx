import { useRef, useState } from "react";
import { Calculator, Info } from "lucide-react";
import { CalculadoraSidebar } from "@/components/layout/CalculadoraSidebar";
import { ShareRow } from "@/components/ShareRow";
import { estimarMensalidadeSeguroVida, type GeneroSelecionado } from "@/lib/cotacao-seguro";

const parseBRL = (v: string) => parseFloat(v.replace(/\./g, "").replace(",", ".")) || 0;

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const maskBRL = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits, 10) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
};

const GENERO_LABEL: Record<GeneroSelecionado, string> = {
  feminino: "feminino",
  masculino: "masculino",
  nao_informar: "não informado",
};

interface Cotacao {
  idade: number;
  genero: GeneroSelecionado;
  capitalVida: number;
  capitalInvalidez: number;
  mensalVida: number;
  mensalInvalidez: number;
}

export default function CalculadoraCotacaoSeguro() {
  const [capitalVida, setCapitalVida] = useState("");
  const [capitalInvalidez, setCapitalInvalidez] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState<GeneroSelecionado | "">("");

  const [cotacao, setCotacao] = useState<Cotacao | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const idadeNum = parseInt(idade, 10) || 0;
  const podeCalcular =
    idadeNum > 0 && genero !== "" && (parseBRL(capitalVida) > 0 || parseBRL(capitalInvalidez) > 0);

  const calcular = () => {
    if (!podeCalcular) return;

    const vida = parseBRL(capitalVida);
    const invalidez = parseBRL(capitalInvalidez);

    setCotacao({
      idade: idadeNum,
      genero,
      capitalVida: vida,
      capitalInvalidez: invalidez,
      mensalVida: estimarMensalidadeSeguroVida(vida, idadeNum, genero) ?? 0,
      mensalInvalidez: estimarMensalidadeSeguroVida(invalidez, idadeNum, genero) ?? 0,
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

  const total = cotacao ? cotacao.mensalVida + cotacao.mensalInvalidez : 0;
  const foraDaFaixa = cotacao !== null && (cotacao.idade < 35 || cotacao.idade > 50);
  const fadeIn = (delay: number) => ({
    opacity: resultsVisible ? 1 : 0,
    transform: resultsVisible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
  });

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

        .vt-hero { background: var(--vt-darker); padding: 3rem 1.5rem 3.5rem; position: relative; overflow: hidden; }
        @media (min-width: 768px) { .vt-hero { padding: 4rem 5rem 4.5rem; } }
        .vt-hero-inner { max-width: 72rem; margin: 0 auto; position: relative; z-index: 1; }
        .vt-breadcrumb { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; }
        .vt-breadcrumb a, .vt-breadcrumb span { font-size: 0.8rem; font-weight: 500; color: #8aab96; text-decoration: none; }
        .vt-breadcrumb a:hover { color: var(--vt-light); }
        .vt-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .vt-hero h1 span { color: var(--vt-light); }
        .vt-hero p { color: #a3b8ac; font-size: 1.1rem; font-weight: 300; max-width: 36rem; }
        .vt-hero-blob { position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem; opacity: 0.06; pointer-events: none; }

        .vt-main { max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem; display: grid; gap: 3rem; }
        @media (min-width: 768px) { .vt-main { padding: 3rem 5rem; } }
        @media (min-width: 1024px) { .vt-main { grid-template-columns: 1fr 340px; } }

        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); }
        .vt-section-heading p { color: #607060; font-size: 1rem; }

        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
        @media (max-width: 480px) { .vt-card { padding: 1.25rem; } }

        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; }
        @media (min-width: 640px) {
          .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .vt-two-col .vt-label { min-height: 2.1em; }
        }
        .vt-two-col + .vt-two-col { margin-top: 1.25rem; }
        .vt-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .vt-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vt-dark); line-height: 1.3; }
        .vt-hint { font-size: 0.78rem; color: #607060; }
        .vt-input-wrap { position: relative; }
        .vt-prefix { position: absolute; top: 50%; transform: translateY(-50%); left: 1rem; font-weight: 600; font-size: 0.85rem; color: #8aab96; pointer-events: none; }
        .vt-input, .vt-select {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-select { font-weight: 600; cursor: pointer; }
        .vt-input:focus, .vt-select:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }
        .vt-input.has-prefix { padding-left: 2.8rem; }

        .vt-btn {
          width: 100%; margin-top: 1.5rem;
          background: var(--vt-dark); color: #fff;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1rem;
          letter-spacing: 0.01em; padding: 1rem 2rem; border-radius: 0.6rem; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: background 0.2s, transform 0.15s;
        }
        .vt-btn:hover { background: #16382c; transform: translateY(-1px); }
        .vt-btn svg { transition: transform 0.2s; }
        .vt-btn:hover svg { transform: translateX(4px); }
        .vt-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .vt-btn:disabled:hover { background: var(--vt-dark); transform: none; }
        .vt-btn:disabled:hover svg { transform: none; }

        .vt-callout {
          background: #fffdf5; border: 1px solid #fde68a; border-radius: 0.75rem;
          padding: 0.9rem 1.1rem; display: flex; gap: 0.6rem; align-items: flex-start;
          font-size: 0.85rem; color: #92400e; line-height: 1.6; margin-top: 1rem;
        }
        .vt-callout svg { color: #d97706; flex-shrink: 0; margin-top: 1px; }

        .result-card { border-radius: 0.9rem; padding: 1.25rem 1.5rem; margin-top: 0.75rem; }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); box-shadow: 0 4px 16px rgba(26,69,55,0.18); }
        .result-card--tone-gold { background: rgb(255, 206, 116); }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.35rem; }
        .result-card--tone-gold .result-label { color: var(--vt-darker); }
        .result-value { font-size: 1.5rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.78rem; font-weight: 500; color: #5c4a1f; margin-top: 0.25rem; }
        .result-card--highlight .result-value { color: #fff; white-space: nowrap; }

        .vt-capital-row { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding-top: 0.7rem; }
        .vt-capital-row + .vt-capital-row { margin-top: 0.7rem; border-top: 1px solid rgba(255,255,255,0.14); }
        .vt-capital-row-label { font-size: 0.9rem; font-weight: 700; color: #cfe3d6; }
        .vt-capital-row-sub { display: block; font-size: 0.75rem; font-weight: 500; color: #a3b8ac; margin-top: 0.15rem; }
        @media (max-width: 480px) {
          .vt-capital-row { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
          .vt-capital-row .result-value { font-size: 1.3rem; }
        }
        .vt-conclusion { margin-top: 1.25rem; font-size: 0.95rem; color: #3f5647; line-height: 1.7; }
        .vt-conclusion strong { color: var(--vt-darker); }
      `}</style>

      <div className="vt-root">
        <section className="vt-hero">
          <div className="vt-hero-inner">
            <nav className="vt-breadcrumb">
              <a href="#/">Home</a>
              <span>/</span>
              <a href="#/seguros">Seguros</a>
              <span>/</span>
              <span style={{ color: "#d9d4c4" }}>Cotação</span>
            </nav>
            <h1>
              <Calculator size={36} style={{ color: "#1daf66" }} />
              Quanto custa um <span>seguro de vida</span>?
            </h1>
            <p>
              Informe o valor da cobertura que você quer, sua idade e seu sexo, e veja a
              estimativa de mensalidade com base em cotações médias de mercado.
            </p>
            <ShareRow title="Cotação de Seguro de Vida | Orienta" style={{ marginTop: "20px" }} />
          </div>
          <svg className="vt-hero-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
              fill="#abccb5"
              transform="translate(100 100)"
            />
          </svg>
        </section>

        <main className="vt-main">
          <div>
            <div className="vt-section-heading">
              <h2>Cotação de seguro de vida e invalidez</h2>
              <p>Preencha ao menos um dos valores de cobertura.</p>
            </div>

            <div className="vt-card">
              <div className="vt-two-col">
                <div className="vt-field">
                  <label className="vt-label">Valor do seguro de vida</label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      className="vt-input has-prefix"
                      placeholder="Ex: 500.000,00"
                      inputMode="numeric"
                      value={capitalVida}
                      onChange={(e) => setCapitalVida(maskBRL(e.target.value))}
                    />
                  </div>
                </div>
                <div className="vt-field">
                  <label className="vt-label">Valor do seguro de invalidez por acidente</label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      className="vt-input has-prefix"
                      placeholder="Ex: 500.000,00"
                      inputMode="numeric"
                      value={capitalInvalidez}
                      onChange={(e) => setCapitalInvalidez(maskBRL(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="vt-two-col">
                <div className="vt-field">
                  <label className="vt-label">Sua idade *</label>
                  <input
                    className="vt-input"
                    placeholder="Ex: 35"
                    inputMode="numeric"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  />
                </div>
                <div className="vt-field">
                  <label className="vt-label">Seu sexo *</label>
                  <select
                    className="vt-select"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value as GeneroSelecionado)}
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                    <option value="nao_informar">Não quero informar</option>
                  </select>
                </div>
              </div>

              <button type="button" className="vt-btn" disabled={!podeCalcular} onClick={calcular}>
                Ver cotação
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              {cotacao && (
                <div ref={resultsRef} style={{ borderTop: "1px solid #e2e8e2", marginTop: "1.75rem", paddingTop: "1.25rem" }}>
                  {total > 0 && (
                    <div className="result-card result-card--tone-gold" style={fadeIn(0)}>
                      <p className="result-label">Cotação de mercado (mensalidade)</p>
                      <p className="result-value">R$ {formatBRL(total)} /mês</p>
                      <p className="result-sub">
                        Cerca de R$ {formatBRL(total * 12)} por ano. Para {cotacao.idade} anos
                        {cotacao.genero !== "nao_informar" && `, sexo ${GENERO_LABEL[cotacao.genero]}`}.
                      </p>
                    </div>
                  )}

                  <div className="result-card result-card--highlight" style={fadeIn(80)}>
                    {cotacao.capitalVida > 0 && (
                      <div className="vt-capital-row">
                        <span className="vt-capital-row-label">
                          Seguro de vida
                          <span className="vt-capital-row-sub">Cobertura de R$ {formatBRL(cotacao.capitalVida)}</span>
                        </span>
                        <span className="result-value">R$ {formatBRL(cotacao.mensalVida)} /mês</span>
                      </div>
                    )}
                    {cotacao.capitalInvalidez > 0 && (
                      <div className="vt-capital-row">
                        <span className="vt-capital-row-label">
                          Seguro de invalidez por acidente
                          <span className="vt-capital-row-sub">Cobertura de R$ {formatBRL(cotacao.capitalInvalidez)}</span>
                        </span>
                        <span className="result-value">R$ {formatBRL(cotacao.mensalInvalidez)} /mês</span>
                      </div>
                    )}
                  </div>

                  {foraDaFaixa && (
                    <div className="vt-callout">
                      <Info size={16} />
                      <p>
                        Nossa tabela de referência cobre de 35 a 50 anos. Para {cotacao.idade} anos,
                        usamos o valor da faixa mais próxima — a cotação real pode ser bem diferente.
                      </p>
                    </div>
                  )}

                  <p className="vt-conclusion">
                    É apenas uma <strong>estimativa</strong> baseada em cotações médias de mercado. O
                    valor real varia por seguradora, estado de saúde e hábitos, e só é confirmado
                    numa cotação oficial.
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8e2" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1A2E35", marginBottom: "8px" }}>
                Compartilhe esta calculadora
              </p>
              <ShareRow title="Cotação de Seguro de Vida | Orienta" label="" />
            </div>
          </div>

          <CalculadoraSidebar
            promo={{
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",
              imageAlt: "Pessoa revisando documentos de seguro",
              badge: "Descubra o valor ideal",
              title: "Quanto de seguro você precisa?",
              description: "Calcule a cobertura ideal para proteger sua família.",
              href: "#/seguros",
            }}
            resources={[
              { icon: "calc", title: "Calculadora de seguros", desc: "Quanto de seguro de vida você precisa.", href: "#/seguros" },
              { icon: "article", title: "O que é um seguro?", desc: "Entenda o conceito antes de contratar.", href: "#/seguros/conteudos" },
              { icon: "calc", title: "Calculadora do Milhão", desc: "Quanto tempo até seu primeiro milhão.", href: "#/planejamento/calculadoras/milhao" },
            ]}
          />
        </main>
      </div>
    </>
  );
}
