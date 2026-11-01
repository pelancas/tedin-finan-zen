import { useRef, useState } from "react";
import { Scale, TriangleAlert } from "lucide-react";
import { CalculadoraSidebar } from "@/components/layout/CalculadoraSidebar";
import { OutrasFerramentas } from "@/components/OutrasFerramentas";
import { ShareRow } from "@/components/ShareRow";
import {
  LIMITE_FATURAMENTO_MEI_MENSAL,
  faturamentoPjEquivalente,
  salarioCltEquivalente,
  simularClt,
  simularPj,
  type OpcoesPj,
  type RegimePj,
  type ResultadoClt,
  type ResultadoPj,
} from "@/lib/clt-pj";

const parseBRL = (v: string) => parseFloat(v.replace(/\./g, "").replace(",", ".")) || 0;

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const maskBRL = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits, 10) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
};

type Direcao = "clt_para_pj" | "pj_para_clt";

const REGIME_LABEL: Record<RegimePj, string> = {
  simples_iii: "Simples Nacional — Anexo III",
  simples_v: "Simples Nacional — Anexo V",
  mei: "MEI",
};

const BENEFICIOS = [
  { key: "alimentacao", label: "Vale refeição / alimentação", placeholder: "Ex: 800,00" },
  { key: "saude", label: "Plano de saúde", placeholder: "Ex: 600,00" },
  { key: "vida", label: "Seguro de vida", placeholder: "Ex: 60,00" },
  { key: "outros", label: "Outros benefícios", placeholder: "Ex: 300,00" },
] as const;

type BeneficioKey = (typeof BENEFICIOS)[number]["key"];

const Linha = ({ label, valor: v, tipo }: { label: string; valor: number; tipo?: "menos" | "mais" | "total" }) => (
  <div className={`vt-row${tipo === "total" ? " vt-row--total" : ""}`}>
    <span>{label}</span>
    <span className={tipo === "menos" ? "vt-neg" : undefined}>
      {tipo === "menos" ? "− " : tipo === "mais" ? "+ " : ""}R$ {formatBRL(Math.abs(v))}
    </span>
  </div>
);

interface Comparacao {
  direcao: Direcao;
  regime: RegimePj;
  clt: ResultadoClt;
  pj: ResultadoPj;
  beneficiosMensal: number;
}

export default function CalculadoraCltPj() {
  const [direcao, setDirecao] = useState<Direcao>("clt_para_pj");
  const [valor, setValor] = useState("");
  const [regime, setRegime] = useState<RegimePj>("simples_iii");
  const [contador, setContador] = useState("200,00");
  const [semFerias, setSemFerias] = useState(true);
  const [ativos, setAtivos] = useState<Record<BeneficioKey, boolean>>({
    alimentacao: false,
    saude: false,
    vida: false,
    outros: false,
  });
  const [valores, setValores] = useState<Record<BeneficioKey, string>>({
    alimentacao: "",
    saude: "",
    vida: "",
    outros: "",
  });

  const [comparacao, setComparacao] = useState<Comparacao | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const podeCalcular = parseBRL(valor) > 0;

  const calcular = () => {
    if (!podeCalcular) return;

    const base = parseBRL(valor);
    const beneficiosMensal = BENEFICIOS.reduce(
      (soma, b) => soma + (ativos[b.key] ? parseBRL(valores[b.key]) : 0),
      0,
    );
    const opcoes: OpcoesPj = {
      regime,
      contadorMensal: parseBRL(contador),
      semFeriasRemuneradas: semFerias,
    };

    let clt: ResultadoClt;
    let pj: ResultadoPj;
    if (direcao === "clt_para_pj") {
      clt = simularClt(base, beneficiosMensal);
      pj = simularPj(faturamentoPjEquivalente(clt.pacoteMensal, opcoes), opcoes);
    } else {
      pj = simularPj(base, opcoes);
      clt = simularClt(salarioCltEquivalente(pj.rendaLiquidaMensal, beneficiosMensal), beneficiosMensal);
    }

    setComparacao({ direcao, regime, clt, pj, beneficiosMensal });

    setResultsVisible(false);
    setTimeout(() => setResultsVisible(true), 50);

    if (window.innerWidth < 768) {
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        150,
      );
    }
  };

  const fadeIn = (delay: number) => ({
    opacity: resultsVisible ? 1 : 0,
    transform: resultsVisible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
  });

  const mostrarMeiAviso =
    comparacao !== null &&
    comparacao.regime === "mei" &&
    comparacao.pj.faturamentoMensal > LIMITE_FATURAMENTO_MEI_MENSAL;

  const diferenca =
    comparacao && comparacao.clt.salarioBruto > 0
      ? (comparacao.pj.faturamentoMensal / comparacao.clt.salarioBruto - 1) * 100
      : 0;

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

        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; margin-top: 1.25rem; }
        @media (min-width: 640px) {
          .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .vt-two-col .vt-label { min-height: 2.1em; }
        }
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

        .vt-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .vt-toggle button {
          padding: 0.85rem 0.75rem; border-radius: 0.6rem; border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.9rem; font-weight: 700; color: #607060;
          cursor: pointer; transition: all 0.2s; line-height: 1.3;
        }
        .vt-toggle button:hover { border-color: var(--vt-dark); }
        .vt-toggle button.active { background: var(--vt-darker); border-color: var(--vt-darker); color: #fff; }

        .vt-benefits { margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid #e2e8e2; }
        .vt-benefit { display: grid; grid-template-columns: 1fr; gap: 0.6rem; padding: 0.7rem 0; }
        @media (min-width: 640px) { .vt-benefit { grid-template-columns: 1fr 1fr; align-items: center; gap: 1.5rem; } }
        .vt-check { display: flex; align-items: center; gap: 0.6rem; font-size: 0.92rem; font-weight: 600; color: var(--vt-darker); cursor: pointer; }
        .vt-check input { width: 1.1rem; height: 1.1rem; accent-color: var(--vt-dark); cursor: pointer; flex-shrink: 0; }

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
        .vt-callout svg { color: #d97706; flex-shrink: 0; margin-top: 2px; }

        .result-card { border-radius: 0.9rem; padding: 1.25rem 1.5rem; margin-top: 0.75rem; }
        .result-card--tone-gold { background: rgb(255, 206, 116); }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.35rem; color: var(--vt-darker); }
        .result-value { font-size: 1.75rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.82rem; font-weight: 500; color: #5c4a1f; margin-top: 0.25rem; line-height: 1.5; }

        .vt-compare { display: grid; grid-template-columns: 1fr; gap: 0.75rem; margin-top: 0.75rem; }
        @media (min-width: 640px) { .vt-compare { grid-template-columns: 1fr 1fr; } }
        .vt-col { background: #f8faf8; border: 1px solid #e2e8e2; border-radius: 0.9rem; padding: 1.25rem 1.5rem; }
        .vt-col--dark { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); border-color: transparent; box-shadow: 0 4px 16px rgba(26,69,55,0.18); }
        .vt-col-title { font-size: 1.1rem; font-weight: 900; color: var(--vt-darker); margin-bottom: 0.5rem; }
        .vt-col-sub { font-size: 0.75rem; font-weight: 500; color: #607060; margin-bottom: 0.5rem; }
        .vt-col--dark .vt-col-title { color: #fff; }
        .vt-col--dark .vt-col-sub { color: #a3b8ac; }
        .vt-row { display: flex; justify-content: space-between; gap: 1rem; padding: 0.5rem 0; font-size: 0.88rem; font-weight: 500; color: #3f5647; border-top: 1px solid #e2e8e2; }
        .vt-row:first-of-type { border-top: none; }
        .vt-row span:last-child { font-weight: 700; white-space: nowrap; color: var(--vt-darker); }
        .vt-row .vt-neg { color: #b42318; }
        .vt-row--total { margin-top: 0.25rem; border-top: 2px solid #d0dbd2; font-size: 0.95rem; }
        .vt-row--total span:first-child { font-weight: 800; color: var(--vt-darker); }
        .vt-row--total span:last-child { font-weight: 900; font-size: 1rem; }
        .vt-col--dark .vt-row { color: #cfe3d6; border-color: rgba(255,255,255,0.14); }
        .vt-col--dark .vt-row span:last-child, .vt-col--dark .vt-row--total span:first-child { color: #fff; }
        .vt-col--dark .vt-row .vt-neg { color: #fda29b; }
        .vt-col--dark .vt-row--total { border-color: rgba(255,255,255,0.3); }

        .vt-conclusion { margin-top: 1.25rem; font-size: 0.95rem; color: #3f5647; line-height: 1.7; }
        .vt-conclusion strong { color: var(--vt-darker); }
      `}</style>

      <div className="vt-root">
        <section className="vt-hero">
          <div className="vt-hero-inner">
            <nav className="vt-breadcrumb">
              <a href="#/">Home</a>
              <span>/</span>
              <a href="#/planejamento/despesas">Ferramentas</a>
              <span>/</span>
              <span style={{ color: "#d9d4c4" }}>CLT x PJ</span>
            </nav>
            <h1>
              <Scale size={36} style={{ color: "#1daf66" }} />
              <span>CLT</span> ou <span>PJ</span>: quanto cobrar?
            </h1>
            <p>
              Informe o valor de uma proposta e descubra quanto a outra modalidade precisa pagar
              para você ganhar o mesmo — já contando impostos, 13º, férias, FGTS e benefícios.
            </p>
            <ShareRow title="Calculadora CLT x PJ | Orienta" style={{ marginTop: "20px" }} />
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
              <h2>Compare uma proposta CLT com uma PJ</h2>
              <p>Escolha de qual lado você tem a proposta e informe o valor.</p>
            </div>

            <div className="vt-card">
              <div className="vt-field">
                <label className="vt-label">Eu tenho uma proposta…</label>
                <div className="vt-toggle">
                  <button
                    type="button"
                    className={direcao === "clt_para_pj" ? "active" : ""}
                    onClick={() => setDirecao("clt_para_pj")}
                  >
                    CLT — quanto devo cobrar como PJ?
                  </button>
                  <button
                    type="button"
                    className={direcao === "pj_para_clt" ? "active" : ""}
                    onClick={() => setDirecao("pj_para_clt")}
                  >
                    PJ — qual salário CLT equivale?
                  </button>
                </div>
              </div>

              <div className="vt-two-col">
                <div className="vt-field">
                  <label className="vt-label">
                    {direcao === "clt_para_pj" ? "Salário bruto CLT (mensal)" : "Valor mensal da nota fiscal PJ"}
                  </label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      className="vt-input has-prefix"
                      placeholder="Ex: 8.000,00"
                      inputMode="numeric"
                      value={valor}
                      onChange={(e) => setValor(maskBRL(e.target.value))}
                    />
                  </div>
                </div>
                <div className="vt-field">
                  <label className="vt-label">Regime da sua empresa PJ</label>
                  <select
                    className="vt-select"
                    value={regime}
                    onChange={(e) => setRegime(e.target.value as RegimePj)}
                  >
                    <option value="simples_iii">{REGIME_LABEL.simples_iii}</option>
                    <option value="simples_v">{REGIME_LABEL.simples_v}</option>
                    <option value="mei">{REGIME_LABEL.mei}</option>
                  </select>
                </div>
              </div>

              <div className="vt-two-col">
                <div className="vt-field">
                  <label className="vt-label">Custo mensal do contador</label>
                  <div className="vt-input-wrap">
                    <span className="vt-prefix">R$</span>
                    <input
                      className="vt-input has-prefix"
                      placeholder="Ex: 200,00"
                      inputMode="numeric"
                      value={contador}
                      onChange={(e) => setContador(maskBRL(e.target.value))}
                    />
                  </div>
                </div>
                <div className="vt-field">
                  <label className="vt-label">Férias</label>
                  <label className="vt-check">
                    <input type="checkbox" checked={semFerias} onChange={(e) => setSemFerias(e.target.checked)} />
                    Não recebo nos 30 dias de férias
                  </label>
                  <span className="vt-hint">Na PJ, mês parado é mês sem nota fiscal.</span>
                </div>
              </div>

              <div className="vt-benefits">
                <label className="vt-label">Benefícios que você quer manter (opcional)</label>
                <p className="vt-hint" style={{ marginTop: "0.35rem" }}>
                  Na CLT a empresa paga. Na PJ, quem paga é você — então o valor entra na conta.
                </p>
                {BENEFICIOS.map((b) => (
                  <div className="vt-benefit" key={b.key}>
                    <label className="vt-check">
                      <input
                        type="checkbox"
                        checked={ativos[b.key]}
                        onChange={(e) => setAtivos((prev) => ({ ...prev, [b.key]: e.target.checked }))}
                      />
                      {b.label}
                    </label>
                    {ativos[b.key] && (
                      <div className="vt-input-wrap">
                        <span className="vt-prefix">R$</span>
                        <input
                          className="vt-input has-prefix"
                          placeholder={b.placeholder}
                          inputMode="numeric"
                          aria-label={`${b.label} (valor mensal)`}
                          value={valores[b.key]}
                          onChange={(e) => setValores((prev) => ({ ...prev, [b.key]: maskBRL(e.target.value) }))}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button type="button" className="vt-btn" disabled={!podeCalcular} onClick={calcular}>
                Comparar
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              {comparacao && (
                <div ref={resultsRef} style={{ borderTop: "1px solid #e2e8e2", marginTop: "1.75rem", paddingTop: "1.25rem" }}>
                  <div className="result-card result-card--tone-gold" style={fadeIn(0)}>
                    {comparacao.direcao === "clt_para_pj" ? (
                      <>
                        <p className="result-label">Para ganhar o mesmo, cobre como PJ</p>
                        <p className="result-value">R$ {formatBRL(comparacao.pj.faturamentoMensal)} /mês</p>
                        <p className="result-sub">
                          {diferenca >= 0 ? `${diferenca.toFixed(0)}% a mais` : `${Math.abs(diferenca).toFixed(0)}% a menos`} que
                          o salário CLT de R$ {formatBRL(comparacao.clt.salarioBruto)}.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="result-label">Salário CLT equivalente</p>
                        <p className="result-value">R$ {formatBRL(comparacao.clt.salarioBruto)} /mês</p>
                        <p className="result-sub">
                          Para você ficar no mesmo patamar de uma PJ de R$ {formatBRL(comparacao.pj.faturamentoMensal)}.
                        </p>
                      </>
                    )}
                  </div>

                  {mostrarMeiAviso && (
                    <div className="vt-callout">
                      <TriangleAlert size={18} />
                      <span>
                        O MEI fatura no máximo R$ {formatBRL(LIMITE_FATURAMENTO_MEI_MENSAL)} por mês (R$ 81 mil por ano).
                        Esse valor passa do limite — escolha o Simples Nacional.
                      </span>
                    </div>
                  )}

                  <div className="vt-compare" style={fadeIn(80)}>
                    <div className="vt-col">
                      <p className="vt-col-title">CLT</p>
                      <p className="vt-col-sub">Valores mensais, médios no ano</p>
                      <Linha label="Salário bruto" valor={comparacao.clt.salarioBruto} />
                      <Linha label="INSS" valor={comparacao.clt.inss} tipo="menos" />
                      <Linha label="IRRF" valor={comparacao.clt.irrf} tipo="menos" />
                      <Linha label="13º e 1/3 de férias (líquidos)" valor={comparacao.clt.decimoFeriasMensal} tipo="mais" />
                      <Linha label="FGTS depositado pela empresa" valor={comparacao.clt.fgtsMensal} tipo="mais" />
                      {comparacao.beneficiosMensal > 0 && (
                        <Linha label="Benefícios pagos pela empresa" valor={comparacao.beneficiosMensal} tipo="mais" />
                      )}
                      <Linha label="Pacote total" valor={comparacao.clt.pacoteMensal} tipo="total" />
                    </div>

                    <div className="vt-col vt-col--dark">
                      <p className="vt-col-title">PJ — {REGIME_LABEL[comparacao.regime]}</p>
                      <p className="vt-col-sub">Valores mensais, médios no ano</p>
                      <Linha label="Nota fiscal mensal" valor={comparacao.pj.faturamentoMensal} />
                      {comparacao.pj.feriasSemReceita > 0.005 && (
                        <Linha label="Férias sem receber" valor={comparacao.pj.feriasSemReceita} tipo="menos" />
                      )}
                      <Linha
                        label={`${comparacao.regime === "mei" ? "Guia DAS do MEI" : "DAS"} (${(comparacao.pj.aliquotaEfetiva * 100).toFixed(1).replace(".", ",")}%)`}
                        valor={comparacao.pj.imposto}
                        tipo="menos"
                      />
                      {comparacao.pj.contador > 0 && (
                        <Linha label="Contador" valor={comparacao.pj.contador} tipo="menos" />
                      )}
                      {comparacao.regime !== "mei" && (
                        <>
                          <Linha label="INSS do pró-labore" valor={comparacao.pj.inssProLabore} tipo="menos" />
                          {comparacao.pj.irrfProLabore > 0 && (
                            <Linha label="IRRF do pró-labore" valor={comparacao.pj.irrfProLabore} tipo="menos" />
                          )}
                        </>
                      )}
                      <Linha label="Renda líquida" valor={comparacao.pj.rendaLiquidaMensal} tipo="total" />
                      {comparacao.beneficiosMensal > 0 && (
                        <>
                          <Linha label="Benefícios que você paga" valor={comparacao.beneficiosMensal} tipo="menos" />
                          <Linha label="Sobra no bolso" valor={comparacao.pj.rendaLiquidaMensal - comparacao.beneficiosMensal} tipo="total" />
                        </>
                      )}
                    </div>
                  </div>

                  <p className="vt-conclusion" style={fadeIn(160)}>
                    {comparacao.direcao === "clt_para_pj" ? (
                      <>
                        Um CLT de <strong>R$ {formatBRL(comparacao.clt.salarioBruto)}</strong> entrega um
                        pacote de <strong>R$ {formatBRL(comparacao.clt.pacoteMensal)}</strong> por mês. Como PJ,
                        você precisa faturar <strong>R$ {formatBRL(comparacao.pj.faturamentoMensal)}</strong> para
                        chegar no mesmo valor.
                      </>
                    ) : (
                      <>
                        Uma PJ de <strong>R$ {formatBRL(comparacao.pj.faturamentoMensal)}</strong> rende
                        {" "}<strong>R$ {formatBRL(comparacao.pj.rendaLiquidaMensal)}</strong> por mês depois dos custos.
                        Para o mesmo pacote na CLT, a proposta precisa ser de
                        {" "}<strong>R$ {formatBRL(comparacao.clt.salarioBruto)}</strong> de salário bruto.
                      </>
                    )}{" "}
                    É uma <strong>estimativa</strong>: não considera dependentes, vale-transporte, PLR,
                    multa do FGTS em caso de demissão nem a estabilidade que só a CLT oferece.
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8e2" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1A2E35", marginBottom: "8px" }}>
                Compartilhe esta calculadora
              </p>
              <ShareRow title="Calculadora CLT x PJ | Orienta" label="" />
            </div>
          </div>

          <CalculadoraSidebar
            promo={{
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",
              imageAlt: "Pessoa revisando documentos de seguro",
              badge: "Vai virar PJ?",
              title: "Não esqueça do seguro de vida",
              description: "Sem empresa pagando, a proteção da sua família passa a ser sua conta.",
              href: "#/seguros/cotacao",
            }}
            resources={[
              { icon: "calc", title: "Cotação de seguros", desc: "Quanto custa um seguro de vida.", href: "#/seguros/cotacao" },
              { icon: "calc", title: "Calculadora de Aposentadoria", desc: "Na PJ, a previdência é com você.", href: "#/planejamento/calculadoras/aposentadoria" },
              { icon: "article", title: "Controle de Despesas", desc: "Organize a renda variável.", href: "#/planejamento/despesas" },
            ]}
          />
        </main>

        <OutrasFerramentas exclude="/planejamento/calculadoras/clt-pj" />
      </div>
    </>
  );
}
