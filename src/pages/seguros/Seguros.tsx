import { lazy, useState } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { OutrasFerramentas } from "@/components/OutrasFerramentas";

const CalculadoraSeguroVida = lazy(() => import("@/tools/CalculadoraSeguroVida"));

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Seguros() {
  useDocumentMeta(
    "Quanto de Seguro de Vida Você Precisa? | Calculadora Grátis | Orienta",
    "Responda 4 perguntas sobre dependentes, renda, dívidas e bens e descubra quanto de seguro de vida você realmente precisa, com a calculadora gratuita da Orienta.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraSeguroVida />

      {/* O que são os seguros */}
      <section style={{ background: "#f8fafc", padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1A2E35", marginBottom: "8px" }}>
            O que são esses seguros?
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "40px" }}></p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                titulo: "Seguro de Vida",
                descricao: "Para o assunto delicado que é a morte, esse seguro é feito para cuidar daqueles que ficam para trás. Se você tem alguém que dependa de você, do seu dinheiro, o seguro de vida é essencial.",
              },
              {
                titulo: "Seguro de Invalidez Permanente por Acidente (IPA)",
                descricao: "A sua força de trabalho está conectada à sua capacidade de levantar todos os dias e produzir. O seguro de invalidez por acidente vem para te gerar segurança financeira para qualquer acidente infeliz que tire sua capacidade de produzir.",
              },

            ].map(({ titulo, descricao }) => (
              <div key={titulo} style={{
                background: "#fff", borderRadius: "12px", padding: "24px",
                boxShadow: "inset 0 0 0 1px #e2e8f0",
              }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1A2E35", marginBottom: "8px" }}>
                  {titulo}
                </h3>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.7" }}>
                  {descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
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

      <OutrasFerramentas exclude="/seguros" />
    </ToolPageLayout>
  );
}
