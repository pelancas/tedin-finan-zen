import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Shield, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useDocumentMeta } from "@/hooks/use-document-meta";

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

// ─── Result Card ─────────────────────────────────────────────────────────────

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: "#f0faf5",
      borderLeft: "4px solid #1daf66",
      borderRadius: "8px",
      padding: "16px 20px",
    }}>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>{label}</p>
      <p style={{ fontSize: "22px", fontWeight: 700, color: "#1A2E35" }}>R$ {value}</p>
    </div>
  );
}

// ─── Input Field ─────────────────────────────────────────────────────────────

function InputField({
  label,
  value,
  onChange,
  hint,
  prefix = "R$",
  type = "brl",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  prefix?: string;
  type?: "brl" | "number";
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "brl") onChange(maskBRL(e.target.value));
    else onChange(e.target.value.replace(/\D/g, ""));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "14px", fontWeight: 600, color: "#1A2E35" }}>{label}</label>
      {hint && <p style={{ fontSize: "12px", color: "#888", marginTop: "-4px" }}>{hint}</p>}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{
          position: "absolute", left: "12px", fontSize: "14px",
          color: "#888", pointerEvents: "none", userSelect: "none",
        }}>
          {prefix}
        </span>
        <input
          value={value}
          onChange={handleChange}
          inputMode="numeric"
          style={{
            width: "100%", padding: "10px 12px 10px 38px",
            border: "1.5px solid #e2e8f0", borderRadius: "8px",
            fontSize: "15px", outline: "none", background: "#fff",
            fontFamily: "inherit",
          }}
          onFocus={e => (e.target.style.borderColor = "#1daf66")}
          onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
        />
      </div>
    </div>
  );
}

// ─── Calculadora Seguro de Vida ───────────────────────────────────────────────

function CalculadoraVida() {
  const [dividas, setDividas] = useState("");
  const [renda, setRenda] = useState("");
  const [anos, setAnos] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    const D = parseBRL(dividas);
    const R = parseBRL(renda);
    const A = parseInt(anos, 10) || 0;
    const P = parseBRL(patrimonio);
    const cs = D + R * A * 12 - P;
    setResultado(Math.max(0, cs));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{
        background: "#fffdf5", border: "1px solid #fde68a", borderRadius: "10px",
        padding: "14px 16px", display: "flex", gap: "10px", alignItems: "flex-start",
      }}>
        <Info size={16} style={{ color: "#d97706", marginTop: "1px", flexShrink: 0 }} />
        <p style={{ fontSize: "13px", color: "#92400e", lineHeight: "1.5" }}>
          Você só precisa de seguro de vida se <strong>tem alguém que depende da sua renda</strong>.
          Se não tem dependentes, não há necessidade.
        </p>
      </div>

      <div className="seg-inputs-grid">
        <InputField
          label="Dívidas totais"
          value={dividas}
          onChange={setDividas}
          hint="Financiamento, dívidas, etc."
        />
        <InputField
          label="Renda mensal atual"
          value={renda}
          onChange={setRenda}
          hint="Quanto você ganha por mês"
        />
        <InputField
          label="Anos de dependência"
          value={anos}
          onChange={setAnos}
          hint="Ex.: até o filho se estabilizar"
          prefix="#"
          type="number"
        />
        <InputField
          label="Patrimônio atual"
          value={patrimonio}
          onChange={setPatrimonio}
          hint="Investimentos, reserva, etc."
        />
      </div>

      <div style={{
        background: "#f8fafc", borderRadius: "8px", padding: "12px 14px",
        border: "1px solid #e2e8f0",
      }}>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "4px", fontWeight: 600 }}>Fórmula</p>
        <p style={{ fontSize: "13px", color: "#555", fontFamily: "monospace" }}>
          Capital Segurado = Dívidas + (Renda × Anos × 12) − Patrimônio
        </p>
      </div>

      <button
        onClick={calcular}
        style={{
          background: "#1daf66", color: "#fff", border: "none",
          borderRadius: "8px", padding: "12px 24px", fontSize: "15px",
          fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit",
        }}
      >
        Calcular
      </button>

      {resultado !== null && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <ResultCard
            label="Capital Segurado recomendado"
            value={formatBRL(resultado)}
          />
          {resultado === 0 && (
            <div style={{
              background: "#f0faf5", border: "1px solid #86efac", borderRadius: "8px",
              padding: "12px 16px",
            }}>
              <p style={{ fontSize: "13px", color: "#166534" }}>
                Com base nos valores informados, seu patrimônio atual já cobre as necessidades.
                Reavalie se realmente precisa de um seguro de vida no momento.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Calculadora Seguro de Acidentes Pessoais ─────────────────────────────────

function CalculadoraAcidentes() {
  const [dividas, setDividas] = useState("");
  const [renda, setRenda] = useState("");
  const [inss, setInss] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    const D = parseBRL(dividas);
    const R = parseBRL(renda);
    const I = parseBRL(inss);
    const P = parseBRL(patrimonio);
    const cs = D + ((R - I) * 12) / 0.05 - P;
    setResultado(Math.max(0, cs));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{
        background: "#fffdf5", border: "1px solid #fde68a", borderRadius: "10px",
        padding: "14px 16px", display: "flex", gap: "10px", alignItems: "flex-start",
      }}>
        <Info size={16} style={{ color: "#d97706", marginTop: "1px", flexShrink: 0 }} />
        <p style={{ fontSize: "13px", color: "#92400e", lineHeight: "1.5" }}>
          Este seguro cobre acidentes que te impedem de trabalhar mas não te matam.
          A seguradora paga <strong>proporcional</strong> ao tipo de acidente — perda de um dedo não gera o valor total.
        </p>
      </div>

      <div className="seg-inputs-grid">
        <InputField
          label="Dívidas totais"
          value={dividas}
          onChange={setDividas}
          hint="Financiamento, dívidas, etc."
        />
        <InputField
          label="Renda mensal atual"
          value={renda}
          onChange={setRenda}
          hint="Quanto você ganha por mês"
        />
        <InputField
          label="Renda INSS / benefício"
          value={inss}
          onChange={setInss}
          hint="Se não tem INSS, deixe em 0"
        />
        <InputField
          label="Patrimônio atual"
          value={patrimonio}
          onChange={setPatrimonio}
          hint="Investimentos, reserva, etc."
        />
      </div>

      <div style={{
        background: "#f8fafc", borderRadius: "8px", padding: "12px 14px",
        border: "1px solid #e2e8f0",
      }}>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "4px", fontWeight: 600 }}>Fórmula</p>
        <p style={{ fontSize: "13px", color: "#555", fontFamily: "monospace" }}>
          Capital Segurado = Dívidas + [(Renda − INSS) × 12] ÷ 5% − Patrimônio
        </p>
      </div>

      <button
        onClick={calcular}
        style={{
          background: "#1daf66", color: "#fff", border: "none",
          borderRadius: "8px", padding: "12px 24px", fontSize: "15px",
          fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit",
        }}
      >
        Calcular
      </button>

      {resultado !== null && (
        <ResultCard
          label="Capital Segurado recomendado"
          value={formatBRL(resultado)}
        />
      )}
    </div>
  );
}

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
  const [activeTab, setActiveTab] = useState<"vida" | "acidentes">("vida");

  useDocumentMeta(
    "Calculadora de Seguro de Vida e Acidentes | Orienta",
    "Calcule gratuitamente quanto de seguro de vida ou acidentes pessoais você realmente precisa, sem depender de corretor, com a calculadora da Orienta.",
  );

  return (
    <Layout>
      <style>{`
        .seg-inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .seg-calc-card { padding: 32px; }
        .seg-tips-card { padding: 28px 32px; }
        .seg-faq-card  { padding: 8px 32px; }
        @media (max-width: 560px) {
          .seg-inputs-grid { grid-template-columns: 1fr; }
          .seg-calc-card   { padding: 20px; }
          .seg-tips-card   { padding: 20px; }
          .seg-faq-card    { padding: 8px 16px; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: "#1A2E35", padding: "72px 0 56px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <Shield size={20} style={{ color: "#1daf66" }} />
            <span style={{
              fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#1daf66",
            }}>
              Seguros
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800,
            color: "#fff", lineHeight: 1.2, marginBottom: "16px",
          }}>
            Calculadora de Seguros Pessoais
          </h1>
          <p style={{
            fontSize: "17px", color: "#94a3b8", lineHeight: "1.7",
            maxWidth: "600px",
          }}>
            Descubra exatamente quanto de capital segurado você precisa — sem pagar por
            coberturas desnecessárias. Calcule o seguro de vida e o seguro de acidentes
            pessoais de forma independente.
          </p>
        </div>
      </section>

      {/* Calculadoras */}
      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>

          {/* Tabs */}
          <div style={{
            display: "flex", gap: "8px", marginBottom: "32px",
            background: "#f1f5f9", borderRadius: "10px", padding: "4px",
          }}>
            {(["vida", "acidentes"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: "10px 16px", borderRadius: "8px",
                  border: "none", cursor: "pointer", fontSize: "14px",
                  fontWeight: 600, fontFamily: "inherit",
                  transition: "all 0.2s",
                  background: activeTab === tab ? "#fff" : "transparent",
                  color: activeTab === tab ? "#1A2E35" : "#64748b",
                  boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                }} 
              >
                {tab === "vida" ? "Seguro de Vida" : "Seguro de Invalidez"}
              </button>
            ))}
          </div>

          {/* Calculator Card */}
          <div className="seg-calc-card" style={{
            background: "#fff", borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1A2E35", marginBottom: "8px" }}>
              {activeTab === "vida" ? "Seguro de Vida" : "Seguro de Invalidez Permanente por Acidente (IPA)"}
            </h2>
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>
              {activeTab === "vida"
                ? "Quanto sua família precisa para manter o padrão de vida sem a sua renda. Cálculo simplificado que não considera inflação nem rendimento do capital"
                : "Quanto você precisaria para viver sem trabalhar em caso de acidente incapacitante."
              }
            </p>

            {activeTab === "vida" ? <CalculadoraVida /> : <CalculadoraAcidentes />}
          </div>

        </div>
      </section>

      {/* O que são os seguros */}
      <section style={{ background: "#f8fafc", padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1A2E35", marginBottom: "8px" }}>
            O que são esses seguros?
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "40px" }}>
            Entenda o que cada seguro cobre antes de contratar.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                titulo: "Seguro de Vida",
                cor: "#1daf66",
                descricao: "Cobre a sua morte. Quando o segurado morre, a seguradora paga o capital segurado aos beneficiários. Só faz sentido se você tem dependentes que vivem da sua renda — cônjuge, filhos, pais. Se ninguém depende de você financeiramente, não há necessidade.",
              },
              {
                titulo: "Seguro de Invalidez Permanente por Acidente (IPA)",
                cor: "#FFA726",
                descricao: "Paga se você sofrer um acidente que cause perda de mobilidade ou de algum sentido (visão, audição, etc.) de forma permanente. Atenção: a seguradora paga proporcional ao tipo de acidente — perder um dedo não gera o valor total contratado. O cálculo leva em conta se você teria renda mesmo sem trabalhar.",
              },
              {
                titulo: "Seguro de Doenças Graves",
                cor: "#e64545",
                descricao: "Pago ao contrair uma das doenças cobertas (alguns tipos de câncer, infarto, AVC, etc.). Importante: ele não cobre todos os cânceres nem todos os estágios. É recomendado para poucos, especialmente quem tem histórico familiar relevante. Exige análise cuidadosa das coberturas antes de contratar.",
              },
            ].map(({ titulo, cor, descricao }) => (
              <div key={titulo} style={{
                background: "#fff", borderRadius: "12px", padding: "24px",
                borderLeft: `4px solid ${cor}`, border: "1px solid #e2e8f0",
                borderLeftWidth: "4px", borderLeftColor: cor,
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

      {/* Como burlar */}
      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          {/* Como burlar */}
          <div className="seg-tips-card" style={{
            background: "#f0faf5", borderRadius: "16px",
            border: "1px solid #86efac",
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#166534", marginBottom: "12px" }}>
              Como conseguir o seguro que você precisa
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{
                  background: "#1daf66", color: "#fff", borderRadius: "50%",
                  width: "22px", height: "22px", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0,
                }}>1</span>
                <p style={{ fontSize: "14px", color: "#166534", lineHeight: "1.6" }}>
                  <strong>Insurtechs:</strong> startups de seguro como Azos e MAG permitem cotar online apenas um produto, sem pacotes forçados. Seguradoras menores com processo digital — um seguro de R$ 1 milhão pode custar cerca de R$ 60/mês dependendo do perfil.
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{
                  background: "#1daf66", color: "#fff", borderRadius: "50%",
                  width: "22px", height: "22px", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0,
                }}>2</span>
                <p style={{ fontSize: "14px", color: "#166534", lineHeight: "1.6" }}>
                  <strong>Insistência com o corretor:</strong> é possível contratar um seguro de vida sem embutir outros. Se o corretor diz que "não tem como", ele está errado — ou escolhendo não vender. Exija o produto que você quer, com base no cálculo da necessidade real.
                </p>
              </div>
            </div>
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
            O vocabulário do mercado de seguros, sem enrolação.
          </p>

          <div className="seg-faq-card" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
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
    </Layout>
  );
}
