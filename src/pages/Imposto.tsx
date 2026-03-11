import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  FileText, CheckCircle, ArrowRight, Copy, Download,
  Shield, Zap, Play, ChevronRight
} from "lucide-react";

/* ─── Vermont palette ─── */
const C = {
  dark:    "#1a4537",
  darkest: "#1c211f",
  mid:     "#618c70",
  light:   "#abccb5",
  cream:   "#d9d4c4",
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
  { icon: "✅", label: "Feito",          desc: "quando terminar de preencher aquele item na declaração." },
  { icon: "⏳", label: "Não feito",      desc: "se ainda precisar preencher." },
  { icon: "🚫", label: "Não se aplica", desc: "se o item não se aplica a você." },
  { icon: "ℹ️", label: "Quadro",         desc: "Em cada item consta o quadro da declaração onde a informação deve ser preenchida." },
];

const FEATURES = [
  "Separação clara entre Bens e Direitos e Rendimentos",
  "Campos padronizados para cada tipo de investimento",
  "Espaço para saldos, custos, impostos e rendimentos",
  "Organização pensada para facilitar a transcrição para o programa da Receita",
  "Estrutura simples, copiável e adaptável ao seu caso",
];

const VIDEOS = [
  { title: "Como declarar Ações e FIIs",     desc: "Aprenda a preencher Bens e Direitos e Rendimentos Isentos.", time: "12:45" },
  { title: "Guia de Criptoativos",            desc: "As novas regras para Bitcoin, stablecoins e NFTs em 2024.",  time: "08:20" },
];

/* ─── Inline-style helpers ─── */
const card = (extra = {}) => ({
  backgroundColor: "#fff",
  borderRadius: 16,
  border: `1px solid ${C.light}50`,
  boxShadow: "0 2px 16px rgba(26,69,55,0.07)",
  ...extra,
});

/* ======================================================
   PAGE COMPONENT
   ====================================================== */
const Imposto = () => {
  /* Google Fonts */
  useEffect(() => {
    const id = "work-sans-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id   = id;
      link.rel  = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800;900&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <Layout>
      <div style={{ fontFamily: "'Work Sans', sans-serif" }}>

        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section style={{ background: `linear-gradient(160deg, ${C.cream}55 0%, #fff 60%)`, padding: "72px 0 56px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 16px", borderRadius: 999,
                backgroundColor: `${C.light}30`, border: `1px solid ${C.light}`,
                width: "fit-content",
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  📅 Temporada IRPF 2024
                </span>
              </div>

              <h1 style={{ margin: 0, fontSize: 50, fontWeight: 900, lineHeight: 1.08, letterSpacing: "-1.5px", color: C.darkest }}>
                Planilha de Apoio à Declaração do{" "}
                <span style={{ color: C.dark }}>IRPF</span>
              </h1>

              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: `${C.darkest}bb`, maxWidth: 480 }}>
                Organize seus investimentos e declare com segurança. Menos erros,
                menos estresse — uma planilha pensada por quem entende de renda variável.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "15px 30px", borderRadius: 12,
                  backgroundColor: C.dark, color: "#fff",
                  fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
                  boxShadow: `0 6px 24px ${C.dark}40`,
                }}>
                  <Copy size={17} /> Copiar planilha agora
                </button>
                <button style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "15px 30px", borderRadius: 12,
                  backgroundColor: "transparent", color: C.darkest,
                  fontSize: 15, fontWeight: 700,
                  border: `2px solid ${C.light}`,
                  cursor: "pointer",
                }}>
                  Ver tutorial
                </button>
              </div>
            </div>

            {/* Right — status card + mini grid */}
            <div style={{ position: "relative" }}>
              <div style={{
                backgroundColor: `${C.light}20`, borderRadius: 24,
                border: `1px solid ${C.light}60`, padding: 32,
                display: "flex", flexDirection: "column", gap: 16,
              }}>
                {/* Status pill */}
                <div style={{ ...card({ padding: "20px 24px" }), display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    backgroundColor: `${C.dark}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <CheckCircle size={22} color={C.dark} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: C.darkest, fontSize: 15 }}>Documentação OK</p>
                    <p style={{ margin: 0, fontSize: 12, color: `${C.darkest}70` }}>Todos os informes validados</p>
                  </div>
                </div>

                {/* Mini investment grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {INVESTMENT_TYPES.slice(0, 6).map(t => (
                    <div key={t} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      backgroundColor: "#fff", borderRadius: 10,
                      padding: "10px 14px", fontSize: 11, fontWeight: 600, color: C.darkest,
                      border: `1px solid ${C.light}50`,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.mid, flexShrink: 0 }} />
                      {t}
                    </div>
                  ))}
                </div>

                <p style={{ textAlign: "center", fontSize: 12, color: C.mid, margin: 0, fontWeight: 600 }}>
                  + {INVESTMENT_TYPES.length - 6} outros tipos de investimento suportados
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            COMO FUNCIONA — dark strip
        ══════════════════════════════════════════════ */}
        <section id="funcionamento" style={{ backgroundColor: C.darkest, padding: "80px 32px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
                Funcionamento do Documento
              </h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,.65)", fontSize: 17, lineHeight: 1.7, maxWidth: 660, marginInline: "auto" }}>
                Este checklist ajuda a organizar as informações necessárias para
                declarar investimentos no Imposto de Renda de Pessoa Física.
              </p>
            </div>

            <div style={{
              backgroundColor: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 20, padding: "44px 48px",
            }}>
              <h3 style={{ color: C.light, fontSize: 18, fontWeight: 700, margin: "0 0 32px", display: "flex", alignItems: "center", gap: 8 }}>
                ❓ Como usar:
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                {HOW_TO_USE.map(({ icon, label, desc }) => (
                  <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>{icon}</span>
                    <p style={{ color: "rgba(255,255,255,.8)", margin: 0, lineHeight: 1.65, fontSize: 15 }}>
                      Marque <strong style={{ color: "#fff" }}>{label}</strong> {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PARA QUEM É — full investment grid
        ══════════════════════════════════════════════ */}
        <section style={{ padding: "80px 32px", backgroundColor: "#fff" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>

            <h2 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 800, color: C.darkest, letterSpacing: "-0.5px" }}>
              Para quem é essa planilha?
            </h2>
            <p style={{ margin: "0 0 40px", color: `${C.darkest}99`, fontSize: 16, lineHeight: 1.7 }}>
              Ideal para quem investe em <strong style={{ color: C.darkest }}>qualquer um dos produtos abaixo</strong>,
              mesmo que tenha poucos valores ou poucas operações:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 32 }}>
              {INVESTMENT_TYPES.map(t => (
                <div key={t} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "13px 18px", borderRadius: 12,
                  border: `1px solid ${C.light}70`,
                  backgroundColor: `${C.cream}28`,
                }}>
                  <CheckCircle size={15} color={C.mid} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.darkest }}>{t}</span>
                </div>
              ))}
            </div>

            <p style={{ margin: 0, color: `${C.darkest}99`, fontSize: 15 }}>
              Se você investe em <strong style={{ color: C.darkest }}>mais de um tipo de produto</strong>, a planilha é ainda mais importante.
            </p>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            POR QUE USAR — features + copy
        ══════════════════════════════════════════════ */}
        <section style={{ padding: "80px 32px", backgroundColor: `${C.cream}35` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{
                  ...card({ padding: "16px 20px" }),
                  display: "flex", alignItems: "flex-start", gap: 14,
                }}>
                  <ArrowRight size={17} color={C.dark} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: C.darkest, lineHeight: 1.55 }}>{f}</span>
                </div>
              ))}
              <div style={{
                padding: "18px 20px", borderRadius: 14,
                backgroundColor: `${C.dark}12`,
                border: `1px solid ${C.dark}25`,
                marginTop: 4,
              }}>
                <p style={{ margin: 0, fontWeight: 700, color: C.darkest, fontSize: 14 }}>
                  🎯 Objetivo: deixar tudo organizado antes de abrir o programa do IRPF.
                </p>
              </div>
            </div>

            {/* Copy */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h2 style={{ margin: 0, fontSize: 38, fontWeight: 900, color: C.darkest, lineHeight: 1.12, letterSpacing: "-0.8px" }}>
                O que você vai encontrar na planilha?
              </h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: `${C.darkest}cc` }}>
                Declarar investimentos é a parte mais complexa do IRPF. Pequenos erros
                nas Notas de Corretagem ou nos Preços Médios podem gerar dores de
                cabeça por anos.
              </p>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: `${C.darkest}cc` }}>
                Nossa estrutura foi pensada para garantir que você organize tudo
                antes de abrir o programa — com paz de espírito.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 4 }}>
                {[
                  { icon: Shield, label: "Segurança Fiscal",  color: C.dark },
                  { icon: Zap,    label: "Rapidez no Envio",  color: C.mid  },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon size={20} color={color} />
                    <span style={{ fontWeight: 700, fontSize: 13, color: C.darkest }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            RECURSOS / TUTORIALS
        ══════════════════════════════════════════════ */}
        <section id="recursos" style={{ padding: "80px 32px", backgroundColor: "#fff", borderTop: `1px solid ${C.light}50` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
              <div>
                <h2 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 800, color: C.darkest, letterSpacing: "-0.5px" }}>
                  Materiais de Apoio
                </h2>
                <p style={{ margin: 0, color: `${C.darkest}70`, fontSize: 15 }}>
                  Assista aos tutoriais e baixe documentos oficiais auxiliares.
                </p>
              </div>
              <button style={{
                display: "flex", alignItems: "center", gap: 6,
                color: C.darkest, fontWeight: 700, fontSize: 14,
                background: "none", border: "none", cursor: "pointer",
              }}>
                Ver todos os vídeos <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>

              {/* Video cards */}
              {VIDEOS.map(({ title, desc, time }) => (
                <div key={title} style={{ cursor: "pointer" }}>
                  <div style={{
                    position: "relative", borderRadius: 14, overflow: "hidden",
                    backgroundColor: `${C.light}40`,
                    aspectRatio: "16/9", marginBottom: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      backgroundColor: C.dark,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
                    </div>
                    <div style={{
                      position: "absolute", bottom: 10, right: 10,
                      backgroundColor: `${C.darkest}CC`, color: "#fff",
                      fontSize: 11, padding: "3px 8px", borderRadius: 6, fontWeight: 700,
                    }}>
                      {time}
                    </div>
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: C.darkest }}>{title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: `${C.darkest}70`, lineHeight: 1.55 }}>{desc}</p>
                </div>
              ))}

              {/* Download card */}
              <div style={{
                ...card({ padding: 24 }),
                display: "flex", flexDirection: "column", gap: 16,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: "50%",
                  backgroundColor: C.dark,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Download size={20} color="#fff" />
                </div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.darkest }}>
                  Manual da Receita Federal
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: `${C.darkest}70`, lineHeight: 1.6 }}>
                  Download do PDF oficial com perguntas e respostas para o exercício 2024.
                </p>
                <button style={{
                  marginTop: "auto",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "12px 16px", borderRadius: 10,
                  border: `2px solid ${C.dark}`,
                  color: C.dark, fontWeight: 700, fontSize: 14,
                  backgroundColor: "transparent", cursor: "pointer",
                }}>
                  Baixar PDF
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════ */}
        <section style={{ padding: "64px 32px" }}>
          <div style={{
            maxWidth: 1000, margin: "0 auto",
            backgroundColor: C.dark, borderRadius: 24,
            padding: "64px 48px", textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            {/* Decorative circles */}
            <div style={{
              position: "absolute", top: -80, right: -80,
              width: 240, height: 240, borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,.07)", pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: -60, left: -60,
              width: 180, height: 180, borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,.04)", pointerEvents: "none",
            }} />

            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <p style={{ margin: 0, color: "rgba(255,255,255,.55)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Não importa se investe pouco ou muito
              </p>
              <h2 style={{ margin: 0, fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: "-0.8px", lineHeight: 1.1 }}>
                Copie a planilha e facilite<br />sua declaração
              </h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,.7)", fontSize: 17, maxWidth: 520, lineHeight: 1.7 }}>
                Preencha com calma e declare com mais segurança e tranquilidade.
                Uma boa declaração começa com organização.
              </p>
              <button style={{
                display: "flex", alignItems: "center", gap: 10,
                backgroundColor: "#fff", color: C.dark,
                padding: "18px 40px", borderRadius: 14,
                fontSize: 17, fontWeight: 800,
                border: "none", cursor: "pointer",
                minWidth: 280, justifyContent: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,.2)",
              }}>
                <Copy size={19} /> Copiar planilha agora
              </button>
              <p style={{ margin: 0, color: "rgba(255,255,255,.4)", fontSize: 12 }}>
                100% Gratuita • Atualizada para 2024 • Google Sheets
              </p>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Imposto;
