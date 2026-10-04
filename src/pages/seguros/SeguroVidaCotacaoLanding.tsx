import { useState } from "react";
import { ShieldCheck, Heart, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { AssistenteCotacaoSeguro } from "@/tools/CalculadoraCotacaoSeguro";
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
 * Variação da landing de seguro de vida (`SeguroVidaLanding`) que, em vez do
 * assistente de necessidade, mostra a calculadora de cotação de mercado
 * (`AssistenteCotacaoSeguro`) — informa cobertura, idade e sexo e vê a mensalidade.
 */
export default function SeguroVidaCotacaoLanding() {
  const [showCalculadora, setShowCalculadora] = useState(false);

  useDocumentMeta(
    "Seguro de Vida: Quanto Custa? Cotação Online | Orienta",
    "Veja quanto custa um seguro de vida e de invalidez por acidente, 100% online e gratuito. Cotação independente com base em valores médios de mercado.",
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
                Seguro de vida: descubra em <span className="accent-alt"> 30 segundos </span>o <span className="accent">custo</span>
              </h1>

              {!showCalculadora && (
                <button
                  type="button"
                  className="svl-btn"
                  onClick={() => setShowCalculadora(true)}
                >
                  Simular agora
                  <ArrowRight size={20} />
                </button>
              )}
            </div>

            <div className="svl-right">
              {showCalculadora ? (
                <div className="svl-calc-wrap">
                  <AssistenteCotacaoSeguro />
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
