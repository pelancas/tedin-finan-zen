import { useState } from "react";
import { ShieldCheck, Heart, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { AssistenteSeguroVida } from "@/tools/CalculadoraSeguroVida";
import seguroVidaImg from "@/assets/seguro-vida-familia.png";

// ─── Glossário / FAQ ──────────────────────────────────────────────────────────

function FaqItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: "1px solid #e2e8f0",
      paddingBottom: open ? "16px" : "0",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "18px 0", background: "none",
          border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
        }}
      >
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#1A2E35", paddingRight: "16px" }}>
          {pergunta}
        </span>
        {open
          ? <ChevronUp size={18} style={{ color: "#1daf66", flexShrink: 0 }} />
          : <ChevronDown size={18} style={{ color: "#888", flexShrink: 0 }} />
        }
      </button>
      {open && (
        <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.7", paddingBottom: "4px" }}>
          {resposta}
        </p>
      )}
    </div>
  );
}

/**
 * Landing page da calculadora de seguro de vida — hero em duas colunas: texto
 * e CTA à esquerda, imagem à direita. Ao clicar no botão, a imagem dá lugar
 * ao assistente de cálculo (`AssistenteSeguroVida`, o mesmo usado em
 * `/seguros`), sem sair da página.
 */
export default function SeguroVidaLanding() {
  const [showCalculadora, setShowCalculadora] = useState(false);

  useDocumentMeta(
    "Seguro de Vida: Quanto de Proteção Você Precisa? | Orienta",
    "Descubra quanto de seguro de vida você precisa, 100% online e gratuito. Calculadora independente para proteger sua família.",
  );

  return (
    <ToolPageLayout>
      <style>{`
        .svl-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
        }

        .svl-hero {
          background: var(--vt-darker);
          padding: 3.5rem 1.5rem;
          position: relative;
          overflow: hidden;
          min-height: calc(100vh - 4rem);
          display: flex;
          align-items: center;
        }
        @media (min-width: 768px) { .svl-hero { padding: 4.5rem 5rem; } }

        .svl-grid {
          max-width: 72rem; margin: 0 auto; position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center;
          width: 100%;
        }
        @media (min-width: 1024px) {
          .svl-grid { grid-template-columns: 1fr minmax(0, 460px); gap: 3.5rem; }
        }

        .svl-badges { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.5rem; }
        .svl-badge {
          display: inline-flex; align-items: center; gap: 0.45rem;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18);
          color: #d9e6de; font-size: 0.8rem; font-weight: 700;
          padding: 0.5rem 0.9rem; border-radius: 999px;
        }
        .svl-badge svg { color: var(--vt-dark); flex-shrink: 0; }

        .svl-title {
          font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 900; line-height: 1.15;
          letter-spacing: -0.02em; color: #fff; margin-bottom: 1.5rem;
        }
        .svl-title .accent { color: var(--vt-light); }
        .svl-title .accent-alt { color: var(--vt-mid); }

        .svl-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: var(--vt-dark); color: #fff;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1.05rem;
          padding: 1.1rem 2.25rem; border-radius: 0.6rem; border: none;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .svl-btn:hover { background: #16382c; transform: translateY(-1px); }
        .svl-btn:active { transform: translateY(0); }
        .svl-btn svg { transition: transform 0.2s; }
        .svl-btn:hover svg { transform: translateX(4px); }

        .svl-right { position: relative; width: 100%; max-width: 460px; margin: 0 auto; }
        .svl-image {
          display: block; width: 100%; height: auto; border-radius: 1.5rem;
          box-shadow: 0 20px 45px rgba(0,0,0,0.35);
        }

        .svl-calc-wrap { animation: svlFadeIn 0.4s ease; }
        @keyframes svlFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .svl-hero-blob {
          position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem;
          opacity: 0.06; pointer-events: none;
        }
      `}</style>

      {/* O CSS do assistente vive em CalculadoraSeguroVida.tsx (classes vt-*);
          esta página só precisa envolvê-lo com a mesma folha de estilos. */}
      <style>{`
        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
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

        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; }
        @media (min-width: 640px) { .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; } }
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

        .vt-renda-linha {
          background: #fff; border: 1px solid #e2e8e2; border-radius: 0.75rem;
          padding: 1.1rem 1.25rem; margin-bottom: 1rem;
        }
        .vt-renda-linha-title {
          font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--vt-dark); margin-bottom: 0.85rem;
        }
        .vt-renda-header, .vt-renda-row {
          display: grid; grid-template-columns: minmax(64px, 100px) minmax(0, 1fr) minmax(0, 1fr);
          gap: 0.6rem 0.85rem; align-items: start;
        }
        .vt-renda-header { padding-bottom: 0.85rem; margin-bottom: 0.85rem; border-bottom: 1px solid #e2e8e2; }
        .vt-renda-row + .vt-renda-row { margin-top: 0.85rem; padding-top: 0.85rem; border-top: 1px solid #eef2ee; }
        .vt-renda-row-label { font-size: 0.85rem; font-weight: 800; color: var(--vt-darker); padding-top: 0.95rem; }
        .vt-renda-row .vt-label { display: none; }
        @media (max-width: 640px) {
          .vt-renda-header { display: none; }
          .vt-renda-row { grid-template-columns: 1fr; gap: 0.5rem; }
          .vt-renda-row-label { padding-top: 0; }
          .vt-renda-row .vt-label { display: block; }
        }

        .vt-select {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.95rem; font-weight: 600; color: var(--vt-darker);
          outline: none; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-select:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }

        .vt-callout {
          background: #fffdf5; border: 1px solid #fde68a; border-radius: 0.75rem;
          padding: 0.9rem 1.1rem; display: flex; gap: 0.6rem; align-items: flex-start;
          font-size: 0.85rem; color: #92400e; line-height: 1.6; margin-bottom: 1.25rem;
        }
        .vt-callout svg { color: #d97706; flex-shrink: 0; margin-top: 1px; }

        .vt-wizard-actions { display: flex; gap: 0.75rem; margin-top: 2rem; }
        .vt-wizard-actions .vt-btn { margin-top: 0; width: auto; min-width: 0; padding: 0.9rem 1.25rem; }
        @media (max-width: 420px) {
          .vt-wizard-actions { flex-direction: column; }
          .vt-wizard-actions .vt-btn-secondary { width: 100%; }
        }

        .vt-stars { display: flex; gap: 0.4rem; margin-bottom: 1.25rem; }
        .vt-star-btn { background: none; border: none; padding: 0; cursor: pointer; line-height: 0; transition: transform 0.1s; }
        .vt-star-btn:hover { transform: scale(1.12); }
        .vt-textarea {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem; resize: vertical;
          border: 1.5px solid #d0dbd2; background: #f7f9f7; min-height: 5rem;
          font-family: 'Work Sans', sans-serif; font-size: 0.9rem; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 1.25rem;
        }
        .vt-textarea:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }

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

        .vt-results-grid { display: grid; gap: 0.75rem; margin-top: 0.75rem; }
        @media (min-width: 640px) { .vt-results-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 640px) { .vt-results-grid--pair { grid-template-columns: 1fr 1fr; } }

        .result-card { background: #fff; border-radius: 0.9rem; padding: 1.25rem 1.5rem; box-shadow: none; margin-top: 0.75rem; }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); border: none; box-shadow: 0 4px 16px rgba(26,69,55,0.18); border-radius: 0.9rem; }
        .result-card--highlight .result-label { color: #7ab898; }
        .result-card--highlight .result-value { color: #fff; font-size: 1.5rem; }
        .result-card--highlight .result-sub { color: #a3b8ac; }
        .result-card--tone-green { background: rgba(29,175,102,0.08); }
        .result-card--tone-green .result-label { color: #0e6b3a; }

        .result-card--tone-gold { background: rgb(255, 206, 116); border: none; }
        .result-card--tone-gold .result-label { color: var(--vt-darker); }
        .result-card--tone-gold .result-value { color: var(--vt-darker); }

        .vt-capital-row { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding-top: 0.7rem; }
        .vt-capital-row + .vt-capital-row { margin-top: 0.7rem; border-top: 1px solid rgba(255,255,255,0.14); }
        .vt-capital-row-label { font-size: 0.9rem; font-weight: 700; color: #cfe3d6; }
        .vt-capital-row .result-value { white-space: nowrap; }
        @media (max-width: 480px) {
          .vt-capital-row { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
          .vt-capital-row .result-value { font-size: 1.3rem; }
        }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.35rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.75rem; font-weight: 500; color: #8aab96; margin-top: 0.25rem; }

        .vt-info { padding: 0.9rem 1.25rem; background: rgba(29,175,102,0.08); border-radius: 0.9rem; font-size: 0.85rem; font-weight: 500; color: #0e6b3a; }
        .vt-conclusion { margin-top: 1.25rem; font-size: 0.95rem; color: #3f5647; line-height: 1.7; }
        .vt-conclusion strong { color: var(--vt-darker); }

        .vt-avaliacao { }
      `}</style>

      <div className="svl-root">
        <section className="svl-hero">
          <div className="svl-grid">
            <div>
              <div className="svl-badges">
                <span className="svl-badge">
                  <ShieldCheck size={16} />
                  Calculadora independente
                </span>
                <span className="svl-badge">
                  <Heart size={16} />
                  Proteja sua família
                </span>
              </div>

              <h1 className="svl-title">
                Seguro de vida: entenda quanto de <span className="accent">proteção</span> você
                precisa, <span className="accent-alt">100% online</span>
              </h1>

              {!showCalculadora && (
                <button
                  type="button"
                  className="svl-btn"
                  onClick={() => setShowCalculadora(true)}
                >
                  Calcular agora
                  <ArrowRight size={20} />
                </button>
              )}
            </div>

            <div className="svl-right">
              {showCalculadora ? (
                <div className="svl-calc-wrap">
                  <AssistenteSeguroVida />
                </div>
              ) : (
                <img
                  src={seguroVidaImg}
                  alt="Casal esperando um filho, se abraçando e segurando uma foto de ultrassom"
                  className="svl-image"
                />
              )}
            </div>
          </div>

          <svg className="svl-hero-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
              fill="#abccb5"
              transform="translate(100 100)"
            />
          </svg>
        </section>

        {/* Glossário / FAQ */}
        <section style={{ background: "#f8fafc", padding: "64px 0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1A2E35", marginBottom: "8px" }}>
              Termos que você precisa conhecer
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px" }}>
              O vocabulário do mercado de seguros.
            </p>

            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "8px 32px" }}>
              {[
                {
                  pergunta: "O que é prêmio?",
                  resposta: "É o valor que você paga para ter o seguro — como uma mensalidade ou anuidade. Quanto maior o capital segurado e maior o seu risco (idade, saúde, profissão), maior será o prêmio.",
                },
                {
                  pergunta: "O que é capital segurado?",
                  resposta: "É o valor que a seguradora se compromete a pagar quando o evento coberto acontecer. Por exemplo: R$ 500 mil de capital segurado no seguro de vida significa que seus beneficiários receberão R$ 500 mil quando você morrer.",
                },
                {
                  pergunta: "O que é apólice?",
                  resposta: "É o seu contrato com a seguradora. Nele constam as coberturas, exclusões, vigência, capital segurado, dados do segurado e dos beneficiários. Leia com atenção antes de assinar.",
                },
                {
                  pergunta: "O que é vigência?",
                  resposta: "O período em que o contrato é válido. Muitos seguros de vida têm vigência anual e precisam ser renovados. Após a renovação, o prêmio pode aumentar com a idade.",
                },
                {
                  pergunta: "O que é cobertura?",
                  resposta: "O que precisa acontecer para o seguro te pagar. Ler as exclusões (o que não é coberto) é tão importante quanto ler o que é coberto. No seguro de doenças graves, por exemplo, nem todos os tipos de câncer estão cobertos.",
                },
                {
                  pergunta: "Como identificar a comissão na apólice?",
                  resposta: "Em muitas apólices, a comissão aparece em código: 1500 representa 15%, 2000 representa 20%. Às vezes vem com a letra C na frente, como C15 ou C25. Se quiser saber quanto seu corretor está ganhando, procure esses valores no documento.",
                },
              ].map((item) => (
                <FaqItem key={item.pergunta} {...item} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </ToolPageLayout>
  );
}
