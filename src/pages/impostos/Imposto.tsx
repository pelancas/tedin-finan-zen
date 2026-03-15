import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  CalendarDays, CheckCircle, Clock, Ban, Info,
  ShieldCheck, Zap, Play, Download, ArrowRight,
  ExternalLink
} from "lucide-react";

/* ─── HTML palette ─── */
const C = {
  primary:    "#1daf66",
  secondary:  "#FFA726",
  accentDark: "#1A2E35",
  accentDeep: "#0F2A2A",
  bgLight:    "#FFFDF5",
  bgDark:     "#0F2A2A",
  white:      "#ffffff",
};

/* ─── Data ─── */
const INVESTMENT_TYPES = [
  "FII", "Ações", "Títulos Bancários (CDB, LCI, LCA, etc.)",
  "Títulos Públicos", "Títulos Privados", "Previdência",
  "Investimentos Internacionais", "Fundos de Investimento",
  "Poupança e Conta Corrente", "Cashback",
  "Criptomoedas", "COE", "Derivativos", "FIDC",
];

const HOW_TO_USE = [
  {
    icon: CheckCircle,
    color: "#1daf66",
    label: "Feito",
    desc: "quando terminar de preencher aquele item na declaração.",
  },
  {
    icon: Clock,
    color: "#FFA726",
    label: "Não feito",
    desc: "se ainda precisar preencher.",
  },
  {
    icon: Ban,
    color: "rgba(255,255,255,.4)",
    label: "Não se aplica",
    desc: "se o item não se aplica a você.",
  },
  {
    icon: Info,
    color: "#1daf66",
    label: "Quadro",
    desc: "Em cada item consta o quadro da declaração onde a informação deve ser preenchida.",
  },
];

const VIDEOS = [
  {
    title: "Como declarar Ações e FIIs",
    desc:  "Aprenda a preencher Bens e Direitos e Rendimentos Isentos.",
    time:  "12:45",
  },
  {
    title: "Guia de Criptoativos",
    desc:  "As novas regras para Bitcoin, stablecoins e NFTs em 2024.",
    time:  "08:20",
  },
];

const inner = { maxWidth: 1160, margin: "0 auto" };

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
const Imposto = () => {
  useEffect(() => {
    const id = "work-sans-font";
    if (!document.getElementById(id)) {
      const lnk = document.createElement("link");
      lnk.id   = id;
      lnk.rel  = "stylesheet";
      lnk.href = "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap";
      document.head.appendChild(lnk);
    }
  }, []);

  return (
    <Layout>
      <div style={{ fontFamily: "'Work Sans', sans-serif", backgroundColor: C.bgLight, color: C.accentDark }}>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{
            ...inner,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}>

            {/* Left copy */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 14px", borderRadius: 999, width: "fit-content",
                backgroundColor: `${C.secondary}1a`,
                border: `1px solid ${C.secondary}35`,
              }}>
                <CalendarDays size={13} color={C.secondary} />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Temporada 2024
                </span>
              </div>

              <h1 style={{ margin: 0, fontSize: 52, fontWeight: 900, lineHeight: 1.06, letterSpacing: "-1.8px", color: C.accentDeep }}>
                Guia do Imposto de Renda para{" "}
                <span style={{ color: C.primary }}>Investidores</span>
              </h1>

              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: `${C.accentDark}cc`, maxWidth: 500 }}>
                Simplifique sua declaração anual, organize seus ativos e evite a malha fina
                com nosso guia completo passo a passo.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", paddingTop: 8 }}>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "16px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700,
                  cursor: "pointer", border: "none",
                  backgroundColor: C.primary, color: C.white,
                  boxShadow: `0 8px 24px ${C.primary}40`,
                }}>
                  <Download size={16} /> Baixar Checklist PDF
                </button>

              </div>
            </div>

            {/* Right — decorative card */}
            <div style={{ position: "relative" }}>
              <div style={{
                background: `linear-gradient(135deg, ${C.primary}1a 0%, ${C.secondary}12 100%)`,
                border: `1px solid ${C.white}`,
                borderRadius: 24,
                overflow: "hidden",
                padding: 32,
                boxShadow: "0 8px 40px rgba(15,42,42,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 340,
              }}>
                <img
                  src="/src/assets/IRPF1.png"
                  alt="IRPF"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 16,
                    display: "block",
                  }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            FUNCIONAMENTO DO DOCUMENTO
        ══════════════════════════════════════════ */}
        <section id="checklist" style={{ backgroundColor: C.accentDeep, padding: "80px 24px" }}>
          <div style={inner}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 36, fontWeight: 700, color: C.white, letterSpacing: "-0.5px" }}>
                Funcionamento do Documento
              </h2>
              <p style={{ margin: "0 auto", color: "rgba(255,255,255,.75)", fontSize: 16, lineHeight: 1.7, maxWidth: 720 }}>
                Este checklist ajuda a organizar as informações necessárias para declarar
                investimentos no Imposto de Renda de Pessoa Física.
              </p>
            </div>

            <div style={{
              backgroundColor: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 24,
              padding: "40px 48px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <Info size={20} color={C.secondary} />
                <span style={{ fontWeight: 700, fontSize: 18, color: C.secondary }}>Como usar:</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {HOW_TO_USE.map(({ icon: Icon, color, label, desc }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <Icon size={20} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 15, color: "rgba(255,255,255,.88)", lineHeight: 1.65 }}>
                      Marque <strong style={{ color: C.white }}>{label}</strong> {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            POR QUE UTILIZAR
        ══════════════════════════════════════════ */}
        <section style={{ padding: "96px 24px" }}>
          <div style={{
            ...inner,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}>

          {/* Left — document previews */}
          <div style={{ position: "relative", paddingBottom: 56, paddingRight: 32 }}>

            {/* Card de trás — rotacionado +4deg */}
            <div style={{
              position: "absolute",
              bottom: 0, right: 0,
              width: "72%",
              borderRadius: 18,
              overflow: "hidden",
              transform: "rotate(4deg)",
              boxShadow: "0 4px 24px rgba(15,42,42,0.1)",
              zIndex: 0,
            }}>
              <img
                src="/src/assets/IRPF2.png"
                alt="IRPF 2"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>

            {/* Card da frente — rotacionado -2deg */}
            <div style={{
              position: "relative",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 16px 56px rgba(15,42,42,0.14)",
              zIndex: 1,
              transform: "rotate(-2deg)",
            }}>
              <img
                src="/src/assets/IRPF2.png"
                alt="IRPF 2"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>

          </div>

            {/* Right copy */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h2 style={{ margin: 0, fontSize: 42, fontWeight: 900, color: C.accentDeep, lineHeight: 1.1, letterSpacing: "-0.8px" }}>
                Por que utilizar nosso material de apoio?
              </h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.85, color: `${C.accentDark}cc` }}>
                Declarar investimentos é a parte mais complexa do IRPF. Pequenos erros
                nas Notas de Corretagem ou nos Preços Médios podem gerar dores de cabeça por anos.
              </p>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.85, color: `${C.accentDark}cc` }}>
                Nosso método foi validado por contadores especialistas em renda variável para
                garantir que você tenha paz de espírito.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, paddingTop: 8 }}>
                {[
                  { icon: ShieldCheck, label: "Segurança Fiscal",  color: C.accentDeep },
                  { icon: Zap,         label: "Rapidez no Envio",  color: C.secondary  },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "14px 16px", borderRadius: 12,
                    backgroundColor: C.white,
                    border: `1px solid ${C.accentDark}12`,
                    boxShadow: "0 2px 12px rgba(15,42,42,0.06)",
                  }}>
                    <Icon size={18} color={color} />
                    <span style={{ fontWeight: 700, fontSize: 13, color: C.accentDeep }}>{label}</span>
                  </div>
                ))}
              </div>

              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                color: C.primary, fontWeight: 700, fontSize: 14,
                textDecoration: "none", marginTop: 4,
              }}>
                Saiba mais sobre as novas regras de 2024
                <ArrowRight size={15} />
              </a>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            PARA QUEM É
        ══════════════════════════════════════════ */}


        {/* ══════════════════════════════════════════
            MATERIAIS DE APOIO
        ══════════════════════════════════════════ */}
        <section id="recursos" style={{
          backgroundColor: C.bgLight,
          padding: "88px 24px",
          borderTop: `1px solid ${C.accentDark}10`,
        }}>
          <div style={inner}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52 }}>
              <div>
                <h2 style={{ margin: "0 0 10px", fontSize: 34, fontWeight: 800, color: C.accentDeep, letterSpacing: "-0.5px" }}>
                  Materiais de Apoio
                </h2>
                <p style={{ margin: 0, color: `${C.accentDark}70`, fontSize: 15 }}>
                  Assista aos tutoriais e baixe documentos oficiais auxiliares.
                </p>
              </div>
              {/*<button style={{
                display: "flex", alignItems: "center", gap: 7,
                background: "none", border: "none", cursor: "pointer",
                color: C.accentDark, fontWeight: 700, fontSize: 14,
              }}>
                Ver todos os vídeos <ExternalLink size={14} />
              </button>*/}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>

              {VIDEOS.map(({ title, desc, time }) => (
                <div key={title} style={{ cursor: "pointer" }}>
                  <div style={{
                    position: "relative", borderRadius: 14, overflow: "hidden",
                    background: `linear-gradient(135deg, ${C.accentDeep}22, ${C.primary}18)`,
                    aspectRatio: "16/9", marginBottom: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `1px solid ${C.accentDark}14`,
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      backgroundColor: C.primary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 4px 20px ${C.primary}50`,
                    }}>
                      <Play size={22} color={C.white} fill={C.white} style={{ marginLeft: 3 }} />
                    </div>
                    <div style={{
                      position: "absolute", bottom: 10, right: 10,
                      backgroundColor: "rgba(15,42,42,.85)", color: C.white,
                      fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                    }}>
                      {time}
                    </div>
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: C.accentDeep }}>{title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: `${C.accentDark}70`, lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}

              {/* PDF card */}
              <div style={{
                backgroundColor: C.white,
                borderRadius: 18,
                border: `2px solid ${C.primary}18`,
                boxShadow: "0 2px 16px rgba(15,42,42,0.06)",
                padding: 28,
                display: "flex", flexDirection: "column", gap: 16,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: -24, right: -24,
                  width: 88, height: 88, borderRadius: "50%",
                  backgroundColor: `${C.primary}08`, pointerEvents: "none",
                }} />
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  backgroundColor: C.primary,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Download size={20} color={C.white} />
                </div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.accentDeep }}>
                  Manual da Receita Federal
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: `${C.accentDark}70`, lineHeight: 1.6 }}>
                  Download do PDF oficial com perguntas e respostas para o exercício 2024.
                </p>
                <button style={{
                  marginTop: "auto",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "12px 16px", borderRadius: 10,
                  border: `2px solid ${C.primary}`,
                  color: C.primary, fontWeight: 700, fontSize: 14,
                  backgroundColor: "transparent", cursor: "pointer",
                }}>
                  Baixar PDF
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════ */}
        <section style={{ padding: "64px 24px" }}>
          <div style={{
            ...inner,
            maxWidth: 980,
            backgroundColor: C.primary,
            borderRadius: 28,
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 256, height: 256, borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,.1)",
              transform: "translate(30%, -30%)", pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0,
              width: 256, height: 256, borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,.05)",
              transform: "translate(-30%, 30%)", pointerEvents: "none",
            }} />

            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
              <h2 style={{ margin: 0, fontSize: 44, fontWeight: 900, color: C.white, letterSpacing: "-1px", lineHeight: 1.1 }}>
                Pronto para dominar seu IR?
              </h2>
              <p style={{ margin: 0, fontSize: 17, color: "rgba(255,255,255,.8)", lineHeight: 1.7, maxWidth: 560 }}>
                Junte-se a mais de 50.000 investidores que já usaram nosso checklist para ficar em dia com a lei.
              </p>
              <button style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                minWidth: 280, padding: "18px 36px",
                borderRadius: 18, border: "none",
                backgroundColor: C.white, color: C.primary,
                fontSize: 17, fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}>
                OBTER CHECKLIST AGORA
              </button>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,.55)" }}>
                100% Gratuito • Atualizado para 2024 • PDF Seguro
              </p>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Imposto;
