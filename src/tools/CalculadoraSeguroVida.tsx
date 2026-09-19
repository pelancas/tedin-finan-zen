import { useRef, useState } from "react";
import { toast } from "sonner";
import { CalculadoraSidebar } from "@/components/layout/CalculadoraSidebar";
import { Shield, Info, Check, Star } from "lucide-react";
import { ShareRow } from "@/components/ShareRow";

// Envio direto (POST) do Google Forms de avaliação da calculadora, sem abrir
// aba nova — entry.1761141719 = nota (1-5), entry.1264580802 = comentário.
const AVALIACAO_FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScEfEkIfRzdPqTUU96UREr8ZQQBU8obg-UtzhXlIGBlu37RXA/formResponse";

// ─── Helpers ────────────────────────────────────────────────────────────────

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

// ─── Assistente de necessidade de seguro de vida ─────────────────────────────

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS = ["Dependentes", "Renda", "Dívidas", "Bens"];
// Prazo em que a renda substituída precisaria continuar sendo paga à família.
type AnosReposicao = 5 | 10 | 15 | 20 | 25 | 30 | "vitalicio";
const ANOS_OPCOES: AnosReposicao[] = [5, 10, 15, 20, 25, 30, "vitalicio"];
// Cobertura vitalícia: capital que sustenta as despesas indefinidamente, a uma
// taxa de retirada anual segura de 5% — mesma referência usada no restante do site.
const TAXA_RETIRADA_VITALICIA = 0.05;

interface DependenteRenda {
  despesa: string;
  anos: AnosReposicao;
}

const novoDependenteRenda = (): DependenteRenda => ({ despesa: "", anos: 20 });

// Quanto uma despesa mensal representa em capital necessário, dado o prazo escolhido.
const valorReposicao = (despesaStr: string, anos: AnosReposicao) => {
  const mensal = parseBRL(despesaStr);
  if (mensal <= 0) return 0;
  return anos === "vitalicio" ? (mensal * 12) / TAXA_RETIRADA_VITALICIA : mensal * 12 * anos;
};

interface ResultadoSeguro {
  adultos: number;
  criancas: number;
  despesasDependentes: number;
  despesasTotais: number;
  dividas: number;
  bens: number;
  capitalVida: number;
  capitalInvalidez: number;
}

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="vt-steps">
      {STEP_LABELS.map((label, i) => {
        const n = (i + 1) as Step;
        const state = n < current ? "done" : n === current ? "active" : "todo";
        return (
          <div key={label} className="vt-step">
            <div className="vt-step-row">
              <span className={`vt-step-circle vt-step-circle--${state}`}>
                {state === "done" ? <Check size={14} /> : n}
              </span>
              {n < 4 && <span className={`vt-step-line${n < current ? " done" : ""}`} />}
            </div>
            <span className={`vt-step-label${state === "active" ? " active" : ""}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function QuantityStepper({
  label,
  value,
  onChange,
  max = 10,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) {
  return (
    <div className="vt-field">
      <label className="vt-label">{label}</label>
      <div className="vt-stepper">
        <button
          type="button"
          className="vt-stepper-btn"
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label={`Diminuir ${label}`}
        >
          −
        </button>
        <span className="vt-stepper-value">{value}</span>
        <button
          type="button"
          className="vt-stepper-btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Aumentar ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function SeletorAnos({
  value,
  onChange,
  showLabel = true,
}: {
  value: AnosReposicao;
  onChange: (v: AnosReposicao) => void;
  showLabel?: boolean;
}) {
  return (
    <div className="vt-field">
      {showLabel && <label className="vt-label">Por quantos anos sua família precisaria dessa renda?</label>}
      <select
        className="vt-select"
        value={String(value)}
        onChange={(e) =>
          onChange(e.target.value === "vitalicio" ? "vitalicio" : (Number(e.target.value) as AnosReposicao))
        }
      >
        {ANOS_OPCOES.map((y) => (
          <option key={y} value={y}>
            {y === "vitalicio" ? "Vitalício" : `${y} anos`}
          </option>
        ))}
      </select>

    </div>
  );
}

function EstrelasAvaliacao({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="vt-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className="vt-star-btn"
          style={{ color: n <= value ? "var(--vt-mid)" : "#d0dbd2" }}
          onClick={() => onChange(n)}
          aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
          aria-pressed={n <= value}
        >
          <Star size={30} fill={n <= value ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

function CampoBRL({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="vt-field">
      {label && <label className="vt-label">{label}</label>}
      <div className="vt-input-wrap">
        <span className="vt-prefix">R$</span>
        <input
          className="vt-input has-prefix"
          placeholder={placeholder}
          value={value}
          inputMode="numeric"
          onChange={(e) => onChange(maskBRL(e.target.value))}
        />
      </div>
      {hint && <p className="vt-hint">{hint}</p>}
    </div>
  );
}

function HighlightCard({
  label,
  value,
  sub,
  delay = 0,
  visible,
}: {
  label: string;
  value: number;
  sub?: string;
  delay?: number;
  visible: boolean;
}) {
  return (
    <div
      className="result-card result-card--highlight"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      <p className="result-label">{label}</p>
      <p className="result-value">R$ {formatBRL(value)}</p>
      {sub && <p className="result-sub">{sub}</p>}
    </div>
  );
}

/** Assistente em 4 passos — pode ser embutido sozinho em qualquer página. */
export function AssistenteSeguroVida() {
  const [step, setStep] = useState<Step>(1);

  const [suasDespesas, setSuasDespesas] = useState("");
  const [adultosRenda, setAdultosRenda] = useState<DependenteRenda[]>([]);
  const [criancasRenda, setCriancasRenda] = useState<DependenteRenda[]>([]);
  const [dividas, setDividas] = useState("");
  const [gastosAdicionais, setGastosAdicionais] = useState("");
  const [bens, setBens] = useState("");

  const [resultado, setResultado] = useState<ResultadoSeguro | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [email, setEmail] = useState("");
  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);

  const enviarAvaliacao = async () => {
    if (nota === 0 || enviandoAvaliacao) return;
    setEnviandoAvaliacao(true);
    try {
      const dados = new FormData();
      dados.append("entry.1761141719", String(nota));
      dados.append("entry.1264580802", comentario);
      dados.append("entry.1130231766", email);
      // "no-cors": o Forms não devolve CORS, então a resposta vem opaca — mas o
      // envio é entregue mesmo assim, sem precisar abrir aba nem sair da página.
      await fetch(AVALIACAO_FORM_RESPONSE_URL, { method: "POST", mode: "no-cors", body: dados });
      setAvaliacaoEnviada(true);
      toast("Obrigado pelo feedback!");
    } catch {
      toast("Não foi possível enviar sua avaliação. Tente novamente.");
    } finally {
      setEnviandoAvaliacao(false);
    }
  };

  const editarRespostas = () => {
    setResultado(null);
    setAvaliacaoEnviada(false);
    setNota(0);
    setComentario("");
    setEmail("");
  };

  const adultos = adultosRenda.length;
  const criancas = criancasRenda.length;

  const setAdultosCount = (v: number) =>
    setAdultosRenda((list) => (v > list.length ? [...list, novoDependenteRenda()] : list.slice(0, v)));
  const setCriancasCount = (v: number) =>
    setCriancasRenda((list) => (v > list.length ? [...list, novoDependenteRenda()] : list.slice(0, v)));

  const atualizarDependente = (
    lista: "adultos" | "criancas",
    indice: number,
    campo: Partial<DependenteRenda>,
  ) => {
    const setter = lista === "adultos" ? setAdultosRenda : setCriancasRenda;
    setter((list) => list.map((item, i) => (i === indice ? { ...item, ...campo } : item)));
  };

  // "Suas despesas" usa o prazo mais longo escolhido entre os dependentes (ou
  // vitalício, se algum deles escolher essa opção) — sem pedir de novo o mesmo prazo.
  const dependentesRenda = [...adultosRenda, ...criancasRenda];
  const anosSuasDespesas: AnosReposicao = dependentesRenda.some((d) => d.anos === "vitalicio")
    ? "vitalicio"
    : dependentesRenda.length > 0
      ? (Math.max(...(dependentesRenda.map((d) => d.anos) as number[])) as AnosReposicao)
      : 20;

  const despesasDependentes = dependentesRenda.reduce((soma, d) => soma + parseBRL(d.despesa), 0);
  const despesasTotais = parseBRL(suasDespesas) + despesasDependentes;
  const podeAvancarRenda = despesasTotais > 0;

  const avancar = () => setStep((s) => (Math.min(4, s + 1) as Step));
  const voltar = () => setStep((s) => (Math.max(1, s - 1) as Step));

  const calcular = () => {
    if (!podeAvancarRenda) return;

    const dividasValor = parseBRL(dividas) + parseBRL(gastosAdicionais);
    const bensValor = parseBRL(bens);

    // Seguro de vida: só substitui a renda de quem depende de você — suas
    // próprias despesas deixam de existir se você morrer, então não entram aqui.
    const necessidadeRendaVida = dependentesRenda.reduce(
      (soma, d) => soma + valorReposicao(d.despesa, d.anos),
      0,
    );
    // Seguro de invalidez: você continua vivo e precisa da sua própria renda
    // além da da família, então "suas despesas" entram na conta.
    const necessidadeRendaInvalidez = necessidadeRendaVida + valorReposicao(suasDespesas, anosSuasDespesas);

    const capitalVida = Math.max(0, necessidadeRendaVida + dividasValor - bensValor);
    const capitalInvalidez = Math.max(0, necessidadeRendaInvalidez + dividasValor - bensValor);

    setResultado({
      adultos,
      criancas,
      despesasDependentes,
      despesasTotais,
      dividas: dividasValor,
      bens: bensValor,
      capitalVida,
      capitalInvalidez,
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

  const semDependentes = adultos === 0 && criancas === 0;

  return (
    <div className="vt-card">
      {!resultado && (
        <>
          <StepIndicator current={step} />

          <div className="vt-step-panel" key={step}>
            {step === 1 && (
              <>
                <h3 className="vt-step-title">Quem depende financeiramente de você?</h3>
                <p className="vt-step-intro">
                  Isso é fundamental para nos ajudar a determinar uma estimativa mais precisa. Selecione quantos adultos e quantas crianças dependem de você.
                </p>
                <div className="vt-two-col">
                  <QuantityStepper label="Adultos" value={adultos} onChange={setAdultosCount} />
                  <QuantityStepper label="Crianças" value={criancas} onChange={setCriancasCount} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="vt-step-title">Renda a ser substituída</h3>
                <p className="vt-step-intro">
                  Considere aluguel, alimentação, combustível e outras despesas regulares.
                </p>

                <div className="vt-renda-linha">
                  <p className="vt-renda-linha-title">Suas despesas mensais</p>
                  <CampoBRL
                    value={suasDespesas}
                    onChange={setSuasDespesas}
                    placeholder="Ex: 4.000,00"
                  />
                </div>

                {adultos + criancas > 0 && (
                  <div className="vt-renda-linha">
                    <div className="vt-renda-header">
                      <span />
                      <span className="vt-label">Despesas com outras pessoas</span>
                      <span className="vt-label">Por quantos anos sua família precisaria dessa renda?</span>
                    </div>

                    {adultosRenda.map((item, i) => (
                      <div className="vt-renda-row" key={`adulto-${i}`}>
                        <p className="vt-renda-row-label">Adulto {i + 1}</p>
                        <CampoBRL
                          value={item.despesa}
                          onChange={(v) => atualizarDependente("adultos", i, { despesa: v })}
                          placeholder="Ex: 1.500,00"
                        />
                        <SeletorAnos
                          value={item.anos}
                          onChange={(v) => atualizarDependente("adultos", i, { anos: v })}
                          showLabel={false}
                        />
                      </div>
                    ))}

                    {criancasRenda.map((item, i) => (
                      <div className="vt-renda-row" key={`crianca-${i}`}>
                        <p className="vt-renda-row-label">Criança {i + 1}</p>
                        <CampoBRL
                          value={item.despesa}
                          onChange={(v) => atualizarDependente("criancas", i, { despesa: v })}
                          placeholder="Ex: 1.500,00"
                        />
                        <SeletorAnos
                          value={item.anos}
                          onChange={(v) => atualizarDependente("criancas", i, { anos: v })}
                          showLabel={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="vt-step-title">Dívidas ou gastos adicionais</h3>
                <div className="vt-two-col">
                  <CampoBRL
                    label="Dívidas pendentes a cobrir"
                    value={dividas}
                    onChange={setDividas}
                    placeholder="Ex: 60.000,00"
                    hint="Exemplos: saldo do financiamento imobiliário, empréstimos com garantia da casa própria, dívidas de cartão de crédito, financiamento de veículos, empréstimos estudantis com fiador e qualquer outra dívida que sua família precisaria quitar."
                  />
                  <CampoBRL
                    label="Gastos adicionais"
                    value={gastosAdicionais}
                    onChange={setGastosAdicionais}
                    placeholder="Ex: 50.000,00"
                    hint="Exemplos: faculdade das crianças, mudança de país ou de cidade, ou outros gastos futuros que sua família precisaria cobrir."
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className="vt-step-title">Seus bens</h3>
                <div className="vt-callout">
                  <Info size={16} />
                  <p>
                    Observação: você precisará de uma cobertura de seguro de vida menor se tiver
                    investimentos ou bens de grande valor que sua família possa vender após sua morte
                    para cobrir despesas de subsistência.
                  </p>
                </div>
                <CampoBRL
                  label="Valor de bens e investimentos disponíveis"
                  value={bens}
                  onChange={setBens}
                  placeholder="Ex: 30.000,00"
                />
              </>
            )}
          </div>

          <div className="vt-wizard-actions">
            {step > 1 ? (
              <button type="button" className="vt-btn vt-btn-secondary" onClick={voltar}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
                Voltar
              </button>
            ) : <span />}

            {step < 4 ? (
              <button
                type="button"
                className="vt-btn vt-btn-flex"
                disabled={step === 2 && !podeAvancarRenda}
                onClick={avancar}
              >
                Avançar
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            ) : (
              <button type="button" className="vt-btn vt-btn-flex" onClick={calcular}>
                Calcular
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            )}
          </div>
        </>
      )}

      {/* Avaliação + Resultado */}
      {resultado && (
        <div ref={resultsRef}>
          <div className="vt-avaliacao">
            <h3 className="vt-step-title">Avalie a ferramenta</h3>
            <p className="vt-step-intro">De 1 a 5 estrelas, o quanto essa calculadora te ajudou?</p>
            <EstrelasAvaliacao value={nota} onChange={setNota} />
            <input
              type="email"
              className="vt-input"
              style={{ marginBottom: "1rem" }}
              placeholder="Seu e-mail (opcional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="vt-textarea"
              placeholder="Deixe um comentário (opcional)"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
            <button
              type="button"
              className="vt-btn vt-btn-flex"
              disabled={nota === 0 || enviandoAvaliacao || avaliacaoEnviada}
              onClick={enviarAvaliacao}
            >
              {avaliacaoEnviada ? "Obrigado pelo feedback!" : enviandoAvaliacao ? "Enviando..." : "Enviar avaliação"}
            </button>
          </div>

          <div style={{ borderTop: "1px solid #e2e8e2", marginTop: "1.75rem", paddingTop: "1.75rem" }}>
            <div className="vt-results-grid vt-results-grid--pair">
              <HighlightCard
                label="Seguro de vida recomendado"
                value={resultado.capitalVida}
                sub={
                  resultado.capitalVida > 0
                    ? `Para proteger ${resultado.adultos} adulto(s) e ${resultado.criancas} criança(s)`
                    : undefined
                }
                visible={resultsVisible}
              />
              <HighlightCard
                label="Seguro de invalidez por acidente recomendado"
                value={resultado.capitalInvalidez}
                sub={resultado.capitalInvalidez > 0 ? "Cobre sua própria renda e a de quem depende de você" : undefined}
                delay={80}
                visible={resultsVisible}
              />
            </div>

            {semDependentes && (
              <div className="vt-callout" style={{ marginTop: "1rem" }}>
                <Info size={16} />
                <p>
                  Você não indicou nenhum adulto ou criança que dependa da sua renda. O seguro de
                  vida acima considera só dívidas e gastos adicionais — se ninguém depende de
                  você, pode não ser necessário contratá-lo. O seguro de invalidez continua
                  relevante, já que cobre sua própria renda em caso de acidente.
                </p>
              </div>
            )}

            {resultado.capitalVida === 0 && !semDependentes && (
              <div className="vt-info" style={{ marginTop: "1rem" }}>
                Com base nos valores informados, seus bens e investimentos já cobrem as
                necessidades de quem depende de você. Reavalie se realmente precisa de um seguro
                de vida agora.
              </div>
            )}

            {resultado.capitalVida > 0 && (
              <p className="vt-conclusion">
                Com base nas suas respostas, você precisaria de um{" "}
                <strong>seguro de vida de R$ {formatBRL(resultado.capitalVida)}</strong> para
                substituir R$ {formatBRL(resultado.despesasDependentes)} em despesas mensais de
                quem depende de você
                {resultado.dividas >= 1 && resultado.bens >= 1 && (
                  <>
                    , levando em consideração que você tem dívidas de R${" "}
                    {formatBRL(resultado.dividas)} e patrimônio de R$ {formatBRL(resultado.bens)}
                  </>
                )}
                {resultado.dividas >= 1 && resultado.bens < 1 && (
                  <>, levando em consideração que você tem dívidas de R$ {formatBRL(resultado.dividas)}</>
                )}
                {resultado.dividas < 1 && resultado.bens >= 1 && (
                  <>, levando em consideração que você tem patrimônio de R$ {formatBRL(resultado.bens)}</>
                )}
                .
              </p>
            )}

            {resultado.capitalInvalidez > 0 && (
              <p className="vt-conclusion">
                Para o seguro de invalidez por acidente, o valor do seguro necessário é de R${" "}
                {formatBRL(resultado.capitalInvalidez)} para substituir as suas próprias despesas
                e dos seus dependentes — cada uma pelo prazo escolhido
                {resultado.dividas >= 1 && resultado.bens >= 1 && (
                  <>
                    {" "}
                    — cobrindo R$ {formatBRL(resultado.dividas)} em dívidas e gastos adicionais e
                    considerando R$ {formatBRL(resultado.bens)} em bens e investimentos que sua
                    família já possui
                  </>
                )}
                {resultado.dividas >= 1 && resultado.bens < 1 && (
                  <> — cobrindo R$ {formatBRL(resultado.dividas)} em dívidas e gastos adicionais</>
                )}
                {resultado.dividas < 1 && resultado.bens >= 1 && (
                  <>
                    {" "}
                    — considerando R$ {formatBRL(resultado.bens)} em bens e investimentos que sua
                    família já possui
                  </>
                )}
                .
              </p>
            )}
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <button type="button" className="vt-btn vt-btn-secondary" onClick={editarRespostas}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              Editar respostas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Página completa (hero + assistente + sidebar) ───────────────────────────

/**
 * Ferramenta completa, pronta para ser embutida em qualquer página: importe
 * este componente (export default) para ter o hero, o assistente e a sidebar
 * de recursos relacionados. Para embutir só o formulário — sem hero nem
 * sidebar — use o `AssistenteSeguroVida` exportado acima.
 */
export default function CalculadoraSeguroVida() {
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
        .vt-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .vt-hero h1 span { color: var(--vt-light); }
        .vt-hero p { color: #a3b8ac; font-size: 1.1rem; font-weight: 300; max-width: 36rem; }
        .vt-hero-blob { position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem; opacity: 0.06; pointer-events: none; }

        /* Layout */
        .vt-main { max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem; display: grid; gap: 3rem; }
        @media (min-width: 768px) { .vt-main { padding: 3rem 5rem; } }
        @media (min-width: 1024px) { .vt-main { grid-template-columns: 1fr 340px; } }

        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); display: flex; align-items: center; gap: 0.6rem; }
        .vt-section-heading h2 svg { color: var(--vt-dark); flex-shrink: 0; }
        .vt-section-heading p { color: #607060; font-size: 1rem; font-weight: 400; }

        /* Card */
        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        /* Step indicator */
        .vt-steps { display: flex; align-items: flex-start; margin-bottom: 2rem; }
        .vt-step { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; flex: 1; }
        .vt-step-row { display: flex; align-items: center; width: 100%; }
        .vt-step-circle {
          width: 2rem; height: 2rem; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700; background: #f0f4f1; color: #9ab8a0;
          border: 2px solid #e2e8e2; transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .vt-step-circle--active { background: var(--vt-dark); border-color: var(--vt-dark); color: #fff; }
        .vt-step-circle--done { background: #e6f7ee; border-color: var(--vt-dark); color: var(--vt-dark); }
        .vt-step-line { flex: 1; height: 2px; background: #e2e8e2; margin: 0 0.35rem; transition: background 0.2s; }
        .vt-step-line.done { background: var(--vt-dark); }
        .vt-step-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: #9ab8a0; text-align: center; }
        .vt-step-label.active { color: var(--vt-darker); }
        @media (max-width: 480px) { .vt-step-label { display: none; } }

        .vt-step-panel { animation: vtStepIn 0.25s ease; }
        @keyframes vtStepIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .vt-step-title { font-size: 1.25rem; font-weight: 800; color: var(--vt-darker); margin-bottom: 0.4rem; }
        .vt-step-intro { color: #607060; font-size: 0.9rem; margin-bottom: 1.25rem; line-height: 1.6; }

        /* Two-column form layout */
        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; }
        @media (min-width: 640px) {
          .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        }
        .vt-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .vt-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vt-dark); line-height: 1.3; }
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

        /* Quantity stepper */
        .vt-stepper {
          display: flex; align-items: center; gap: 1rem;
          background: #f7f9f7; border: 1.5px solid #d0dbd2; border-radius: 0.6rem;
          padding: 0.5rem 1rem; width: fit-content;
        }
        .vt-stepper-btn {
          width: 2rem; height: 2rem; border-radius: 50%; border: none;
          background: var(--vt-dark); color: #fff; font-size: 1.1rem; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, transform 0.1s;
        }
        .vt-stepper-btn:hover { background: #16382c; }
        .vt-stepper-btn:active { transform: scale(0.92); }
        .vt-stepper-value { font-size: 1.15rem; font-weight: 800; color: var(--vt-darker); min-width: 1.5rem; text-align: center; }

        /* Linha de renda — "Suas despesas" e a tabela de dependentes */
        .vt-renda-linha {
          background: #fff; border: 1px solid #e2e8e2; border-radius: 0.75rem;
          padding: 1.1rem 1.25rem; margin-bottom: 1rem;
        }
        .vt-renda-linha-title {
          font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--vt-dark); margin-bottom: 0.85rem;
        }

        /* Tabela de dependentes — rótulos das colunas aparecem uma única vez;
           as colunas encolhem/crescem conforme o espaço disponível. */
        .vt-renda-header, .vt-renda-row {
          display: grid; grid-template-columns: minmax(64px, 100px) minmax(0, 1fr) minmax(0, 1fr);
          gap: 0.6rem 0.85rem; align-items: start;
        }
        .vt-renda-header {
          padding-bottom: 0.85rem; margin-bottom: 0.85rem; border-bottom: 1px solid #e2e8e2;
        }
        .vt-renda-row + .vt-renda-row {
          margin-top: 0.85rem; padding-top: 0.85rem; border-top: 1px solid #eef2ee;
        }
        .vt-renda-row-label { font-size: 0.85rem; font-weight: 800; color: var(--vt-darker); padding-top: 0.95rem; }
        /* Colunas ficam muito estreitas para o valor/select num celular — empilha
           e esconde o cabeçalho compartilhado, que não caberia legível ali. */
        @media (max-width: 640px) {
          .vt-renda-header { display: none; }
          .vt-renda-row { grid-template-columns: 1fr; gap: 0.5rem; }
          .vt-renda-row-label { padding-top: 0; }
        }

        /* Select (prazo de reposição) */
        .vt-select {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.95rem; font-weight: 600; color: var(--vt-darker);
          outline: none; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-select:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }

        /* Callout */
        .vt-callout {
          background: #fffdf5; border: 1px solid #fde68a; border-radius: 0.75rem;
          padding: 0.9rem 1.1rem; display: flex; gap: 0.6rem; align-items: flex-start;
          font-size: 0.85rem; color: #92400e; line-height: 1.6; margin-bottom: 1.25rem;
        }
        .vt-callout svg { color: #d97706; flex-shrink: 0; margin-top: 1px; }

        /* Wizard navigation */
        .vt-wizard-actions { display: flex; gap: 0.75rem; margin-top: 2rem; }
        .vt-wizard-actions .vt-btn { margin-top: 0; width: auto; min-width: 0; padding: 0.9rem 1.25rem; }
        /* Duas colunas de padding generoso (2rem) não cabem lado a lado em
           telas estreitas e empurram a página inteira para além da viewport —
           empilha os botões nesse caso. */
        @media (max-width: 420px) {
          .vt-wizard-actions { flex-direction: column; }
          .vt-wizard-actions .vt-btn-secondary { width: 100%; }
        }

        /* Avaliação da ferramenta */
        .vt-stars { display: flex; gap: 0.4rem; margin-bottom: 1.25rem; }
        .vt-star-btn {
          background: none; border: none; padding: 0; cursor: pointer; line-height: 0;
          transition: transform 0.1s;
        }
        .vt-star-btn:hover { transform: scale(1.12); }
        .vt-textarea {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem; resize: vertical;
          border: 1.5px solid #d0dbd2; background: #f7f9f7; min-height: 5rem;
          font-family: 'Work Sans', sans-serif; font-size: 0.9rem; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 1.25rem;
        }
        .vt-textarea:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }

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
        .vt-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .vt-btn:disabled:hover { background: var(--vt-dark); transform: none; }
        .vt-btn:disabled:hover svg { transform: none; }
        .vt-btn-flex { flex: 1; }
        .vt-btn-secondary { background: #fff; color: var(--vt-darker); border: 1.5px solid #d0dbd2; flex: 0 0 auto; }
        .vt-btn-secondary:hover { background: #f7f9f7; border-color: var(--vt-dark); color: var(--vt-dark); transform: none; }
        .vt-btn-secondary svg { color: var(--vt-darker); }
        .vt-btn-secondary:hover svg { transform: none; }

        /* Result cards */
        .vt-results-grid { display: grid; gap: 0.75rem; margin-top: 0.75rem; }
        @media (min-width: 640px) { .vt-results-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 640px) { .vt-results-grid--pair { grid-template-columns: 1fr 1fr; } }

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

        .vt-info {
          padding: 0.9rem 1.25rem;
          background: rgba(29,175,102,0.08); border-radius: 0.9rem;
          font-size: 0.85rem; font-weight: 500; color: #0e6b3a;
        }
        .vt-conclusion { margin-top: 1.25rem; font-size: 0.95rem; color: #3f5647; line-height: 1.7; }
        .vt-conclusion strong { color: var(--vt-darker); }
      `}</style>

      <div className="vt-root">
        {/* Hero */}
        <section className="vt-hero">
          <div className="vt-hero-inner">
            <nav className="vt-breadcrumb">
              <a href="#/">Home</a>
              <span>/</span>
              <a href="#/seguros">Seguros</a>
              <span>/</span>
              <span style={{ color: "#d9d4c4" }}>Calculadora</span>
            </nav>
            <h1>
              <Shield size={36} style={{ color: "#1daf66" }} />
              Quanto de <span>seguro de vida</span> você precisa?
            </h1>
            <p>
              Responda 4 perguntas rápidas sobre quem depende de você, sua renda, suas dívidas e
              seus bens, e descubra o capital segurado ideal para proteger sua família.
            </p>
            <ShareRow title="Calculadora de Seguro de Vida | Orienta" style={{ marginTop: "20px" }} />
          </div>
          <svg className="vt-hero-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
              fill="#abccb5"
              transform="translate(100 100)"
            />
          </svg>
        </section>

        {/* Main */}
        <main className="vt-main">
          <div>
            <div className="vt-section-heading">
              <h2>
                Calculadora de necessidade de seguro de vida
              </h2>
              <p>Um passo de cada vez — leva menos de dois minutos.</p>
            </div>

            <AssistenteSeguroVida />

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8e2" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1A2E35", marginBottom: "8px" }}>
                Compartilhe esta calculadora
              </p>
              <ShareRow title="Calculadora de Seguro de Vida | Orienta" label="" />
            </div>
          </div>

          <CalculadoraSidebar
            promo={{
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",
              imageAlt: "Pessoa revisando documentos de seguro",
              badge: "Aprenda mais",
              title: "O que é um seguro?",
              description: "Entenda o conceito antes de contratar qualquer apólice.",
              href: "#/seguros/conteudos",
            }}
            resources={[
              { icon: "article", title: "O que é um seguro?", desc: "Entenda o conceito antes de contratar.", href: "#/seguros/conteudos" },
              { icon: "calc", title: "Calculadora do Milhão", desc: "Quanto tempo até seu primeiro milhão.", href: "#/planejamento/calculadoras/milhao" },
              { icon: "calc", title: "Calculadora de Aposentadoria", desc: "Quanto guardar todo mês.", href: "#/planejamento/calculadoras/aposentadoria" },
              { icon: "bank", title: "Comparador de Renda Fixa", desc: "Calcule qual melhor produto.", href: "#/investimentos/renda-fixa/comparador" },
            ]}
          />
        </main>
      </div>
    </>
  );
}
