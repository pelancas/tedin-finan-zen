import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock, Gift, Briefcase, ArrowRight, ChevronDown, ChevronUp,
  ClipboardList, BarChart3, Compass,
} from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import heroImg from "@/assets/hero-saiu-clt.webp";

// Meta Pixel (fbq é carregado no index.html)
const fbq = (...args: unknown[]) => (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(...args);
const trackInicio = () => fbq("trackCustom", "IniciouDiagnostico", { publico: "ex-clt" });

const DIAGNOSTICO_URL = "/planejamento/diagnostico-financeiro-mei/diagnostico";

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FaqItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: open ? "16px" : "0" }}>
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

// ─── Conteúdo ─────────────────────────────────────────────────────────────────

const PASSOS = [
  {
    icon: ClipboardList,
    cor: "#1daf66",
    titulo: "Responda em 3 minutos",
    texto: "Perguntas simples sobre sua renda, seus gastos, suas reservas e seus objetivos. Sem planilha, sem jargão.",
  },
  {
    icon: BarChart3,
    cor: "#FFA726",
    titulo: "Veja seu retrato financeiro",
    texto: "Um panorama claro de onde você está hoje, pensado para quem agora cuida sozinho de benefícios e reservas.",
  },
  {
    icon: Compass,
    cor: "#3b82f6",
    titulo: "Saiba por onde começar",
    texto: "Próximos passos práticos, na ordem certa, e as ferramentas da Orienta para cada etapa.",
  },
];

const PUBLICO = [
  "Quem saiu da CLT e agora trabalha como PJ, MEI, freelancer ou autônomo",
  "Quem perdeu benefícios como férias remuneradas, 13º, FGTS e plano de saúde e ainda não refez as contas",
  "Quem tem renda que varia e não sabe quanto vai entrar no mês seguinte",
];

const NUMEROS = [
  {
    valor: "55,6%",
    texto: "dos freelancers e PJs apontam a falta de benefícios como um grande desafio.",
    fonte: "Pesquisa HUG, 2026",
    cor: "#FFA726",
  },
  {
    valor: "1 em 2",
    texto: "entrou nesse modelo por necessidade, e não por escolha.",
    fonte: "Band, 2026",
    cor: "#1daf66",
  },
];

const FAQ = [
  {
    pergunta: "O diagnóstico é mesmo gratuito?",
    resposta: "Sim. Você responde, vê o resultado e não paga nada. A Orienta é um projeto de educação financeira independente.",
  },
  {
    pergunta: "Preciso ter documentos ou extratos à mão?",
    resposta: "Não. Valores aproximados já servem. O objetivo é te dar uma visão geral e mostrar por onde começar, não fazer uma auditoria.",
  },
  {
    pergunta: "Serve para quem acabou de sair da CLT?",
    resposta: "Foi feito justamente para isso. As perguntas consideram que você não conta mais com 13º, férias remuneradas e FGTS, e que sua renda pode mudar de mês a mês.",
  },
  {
    pergunta: "Vocês vão vender algum produto para mim?",
    resposta: "Não. O diagnóstico não é uma venda disfarçada: ele aponta o que faz sentido para o seu momento, e a decisão é sempre sua.",
  },
  {
    pergunta: "Meus dados ficam salvos?",
    resposta: "As respostas e o e-mail informados são enviados à Orienta para evoluirmos o diagnóstico e entrarmos em contato, em linha com a nossa Política de Privacidade.",
  },
  {
    pergunta: "Quanto tempo leva?",
    resposta: "Cerca de 3 minutos. Clique em “Avaliar minhas finanças” e responda às perguntas.",
  },
];

/**
 * Landing do diagnóstico financeiro (gratuito, ~3 min) voltada a quem saiu da CLT.
 * Variante de `DiagnosticoFinanceiroMeiLanding`, com foto no hero no lugar do gráfico.
 */
export default function DiagnosticoFinanceiroCltLanding() {
  useDocumentMeta(
    "Saiu da CLT? Diagnóstico Financeiro Grátis em 3 Minutos | Orienta",
    "Saiu da CLT? Como estão suas finanças? Diagnóstico financeiro gratuito para PJs, MEIs, freelancers e autônomos.",
  );

  useEffect(() => {
    fbq("track", "ViewContent", { content_category: "ex-clt" });
  }, []);

  return (
    <ToolPageLayout>
      <style>{`
        .dfl-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
        }

        .dfl-hero {
          background: var(--vt-darker);
          padding: 3.5rem 1.5rem;
          position: relative;
          overflow: hidden;
          min-height: calc(100vh - 4rem);
          display: flex;
          align-items: center;
        }
        @media (min-width: 768px) { .dfl-hero { padding: 4.5rem 5rem; } }

        .dfl-grid {
          max-width: 72rem; margin: 0 auto; position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: center;
          grid-template-areas: "text" "visual" "cta";
          width: 100%;
        }
        .dfl-text { grid-area: text; }
        .dfl-right { grid-area: visual; }
        .dfl-cta-block { grid-area: cta; }
        @media (min-width: 1024px) {
          .dfl-grid {
            grid-template-columns: 1fr minmax(0, 560px); column-gap: 2.5rem; row-gap: 0;
            grid-template-areas: "text visual" "cta visual";
            grid-template-rows: auto auto;
          }
          .dfl-text { align-self: end; }
          .dfl-cta-block { align-self: start; }
        }

        .dfl-badges { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.5rem; }
        .dfl-badge {
          display: inline-flex; align-items: center; gap: 0.45rem;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18);
          color: #d9e6de; font-size: 0.8rem; font-weight: 700;
          padding: 0.5rem 0.9rem; border-radius: 999px;
        }
        .dfl-badge svg { color: var(--vt-dark); flex-shrink: 0; }

        .dfl-title {
          font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 900; line-height: 1.15;
          letter-spacing: -0.02em; color: #fff; margin-bottom: 1.25rem;
        }
        /* mobile: título e gráfico ficam 28% mais próximos (3,25rem → 2,34rem) */
        .dfl-title { margin-bottom: 0.34rem; }
        @media (min-width: 1024px) { .dfl-title { margin-bottom: 1.25rem; } }
        .dfl-title .accent { color: var(--vt-light); }
        .dfl-title .accent-alt { color: var(--vt-mid); }

        .dfl-sub {
          font-size: 1.05rem; line-height: 1.65; color: #a3b8ac;
          max-width: 34rem; margin-bottom: 2rem;
        }

        .dfl-sub-mobile { display: block; margin: 1.25rem 0 0; }
        .dfl-sub-desktop { display: none; }
        @media (min-width: 1024px) {
          .dfl-sub-mobile { display: none; }
          .dfl-sub-desktop { display: block; }
        }

        .dfl-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1rem; }
        @media (min-width: 1024px) { .dfl-actions { justify-content: flex-start; } }

        .dfl-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: var(--vt-dark); color: #fff; text-decoration: none;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1.05rem;
          padding: 1.1rem 2.25rem; border-radius: 0.6rem; border: none;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .dfl-btn:hover { background: #16382c; transform: translateY(-1px); }
        .dfl-btn:active { transform: translateY(0); }
        .dfl-btn svg { transition: transform 0.2s; }
        .dfl-btn:hover svg { transform: translateX(4px); }

        .dfl-soon {
          display: inline-block; background: var(--vt-mid); color: var(--vt-darker);
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0.2rem 0.55rem; border-radius: 999px;
        }

        .dfl-note { margin-top: 1rem; font-size: 0.85rem; color: #8aab96; }
        .dfl-privacy { margin-top: 0.6rem; font-size: 0.78rem; color: #8aab96; }
        .dfl-privacy a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }
        .dfl-privacy-dark { margin-top: 1rem; color: #a3b8ac; }

        .dfl-right { position: relative; width: 100%; max-width: 560px; margin: 0 auto; align-self: end; }
        .dfl-glow {
          position: absolute; top: 0; bottom: 0; left: -28%; width: 180%; z-index: 0; pointer-events: none;
          background: linear-gradient(to top, rgba(29,175,102,0.9) 0%, rgba(29,175,102,0.45) 45%, rgba(29,175,102,0) 100%);
          -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
          transform: scale(1.22); transform-origin: 35% 100%;
          filter: blur(18px);
        }
        .dfl-photo { position: relative; z-index: 1; width: 180%; max-width: none; margin-left: -28%; height: auto; display: block; pointer-events: none; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.35)); }

        .dfl-hero-blob {
          position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem;
          opacity: 0.06; pointer-events: none;
        }

        .dfl-section { padding: 4rem 1.5rem; }
        .dfl-container { max-width: 72rem; margin: 0 auto; }
        .dfl-h2 {
          font-size: clamp(1.5rem, 3.2vw, 2rem); font-weight: 800; color: #1A2E35;
          letter-spacing: -0.02em; margin-bottom: 0.5rem;
        }
        .dfl-lead { font-size: 15px; color: #607060; margin-bottom: 2rem; max-width: 40rem; line-height: 1.6; }

        .dfl-cards { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        .dfl-card {
          background: #fff; border: 1px solid #e2e8e2; border-radius: 1rem; padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(26,69,55,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .dfl-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(26,69,55,0.1); }
        .dfl-icon {
          width: 2.75rem; height: 2.75rem; border-radius: 0.75rem;
          display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;
        }
        .dfl-card h3 { font-size: 1.05rem; font-weight: 800; color: #1A2E35; margin-bottom: 0.4rem; }
        .dfl-card p { font-size: 0.9rem; line-height: 1.6; color: #607060; }
        .dfl-step-n { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.08em; color: #8aab96; margin-bottom: 0.5rem; }

        .dfl-stats { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
        .dfl-stat {
          background: var(--vt-darker); border-radius: 1rem; padding: 2rem 1.75rem;
          box-shadow: 0 8px 24px rgba(26,46,53,0.15);
        }
        .dfl-stat-n { font-size: clamp(2.75rem, 7vw, 3.75rem); font-weight: 900; line-height: 1; letter-spacing: -0.03em; }
        .dfl-stat p { color: #fff; font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin: 0.9rem 0 0.75rem; }
        .dfl-stat small { color: #8aab96; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.04em; }

        .dfl-publico { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.75rem; }
        .dfl-publico li {
          display: flex; align-items: flex-start; gap: 0.75rem; background: #fff;
          border: 1px solid #e2e8e2; border-radius: 0.75rem; padding: 0.9rem 1.1rem;
          font-size: 0.95rem; font-weight: 600; color: #1A2E35;
        }
        .dfl-publico svg { color: #1daf66; flex-shrink: 0; margin-top: 2px; }

        .dfl-cta {
          background: var(--vt-darker); text-align: center; padding: 4.5rem 1.5rem;
        }
        .dfl-cta h2 {
          font-size: clamp(1.6rem, 3.5vw, 2.25rem); font-weight: 900; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 0.75rem;
        }
        .dfl-cta p { color: #a3b8ac; margin-bottom: 2rem; }
      `}</style>

      <div className="dfl-root">
        {/* Hero */}
        <section className="dfl-hero">
          <div className="dfl-grid">
            <div className="dfl-text">
              <h1 className="dfl-title">
                Saiu da <span className="accent-alt">CLT</span>? Suas finanças em{" "}
                <span className="accent">3 minutos</span>.
              </h1>
              <p className="dfl-sub dfl-sub-desktop" style={{ marginBottom: 0 }}>
                Sem 13º, férias remuneradas e FGTS, as contas mudam. Veja por onde começar.
              </p>
            </div>

            <div className="dfl-right">
              <div
                className="dfl-glow"
                aria-hidden="true"
                style={{ WebkitMaskImage: `url(${heroImg})`, maskImage: `url(${heroImg})` }}
              />
              <img
                className="dfl-photo"
                src={heroImg}
                alt="Homem sorrindo enquanto analisa suas finanças no notebook"
                width={1100}
                height={677}
              />
            </div>

            <div className="dfl-cta-block">
              <div className="dfl-actions">
                <Link className="dfl-btn" to={DIAGNOSTICO_URL} onClick={trackInicio}>
                  Avaliar minhas finanças
                  <ArrowRight size={20} />
                </Link>
              </div>
              <p className="dfl-note">Para quem deixou o emprego com carteira assinada e agora trabalha por conta própria.</p>
              <p className="dfl-privacy">
                Ao continuar, você concorda com a nossa{" "}
                <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
              </p>

              <div className="dfl-badges">
                <span className="dfl-badge"><Gift size={16} />100% gratuito</span>
                <span className="dfl-badge"><Clock size={16} />Leva 3 minutos</span>
                <span className="dfl-badge"><Briefcase size={16} />Para quem saiu da CLT</span>
              </div>
            </div>
          </div>

          <svg className="dfl-hero-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
              fill="#abccb5"
              transform="translate(100 100)"
            />
          </svg>
        </section>

        {/* Números */}
        <section className="dfl-section" style={{ background: "#f8faf8" }}>
          <div className="dfl-container">
            <h2 className="dfl-h2">Você não está sozinho</h2>
            <p className="dfl-lead">
              Deixar a CLT costuma significar abrir mão de benefícios e de uma renda previsível.
              Para muita gente, isso nem foi uma escolha.
            </p>
            <div className="dfl-stats">
              {NUMEROS.map((n) => (
                <div key={n.valor} className="dfl-stat">
                  <div className="dfl-stat-n" style={{ color: n.cor }}>{n.valor}</div>
                  <p>{n.texto}</p>
                  <small>{n.fonte}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="dfl-section" style={{ background: "#fff" }}>
          <div className="dfl-container">
            <h2 className="dfl-h2">Como vai funcionar</h2>
            <p className="dfl-lead">Três passos, sem cadastro complicado e sem conversa de vendedor.</p>
            <div className="dfl-cards">
              {PASSOS.map((p, i) => (
                <div key={p.titulo} className="dfl-card">
                  <div className="dfl-icon" style={{ background: `${p.cor}1f`, color: p.cor }}>
                    <p.icon size={22} />
                  </div>
                  <div className="dfl-step-n">PASSO {i + 1}</div>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quem é */}
        <section className="dfl-section" style={{ background: "#fff" }}>
          <div className="dfl-container" style={{ maxWidth: "800px" }}>
            <h2 className="dfl-h2">Para quem é</h2>
            <p className="dfl-lead">Se você trocou o holerite pela renda própria, este diagnóstico foi pensado para o seu dia a dia.</p>
            <ul className="dfl-publico">
              {PUBLICO.map((item) => (
                <li key={item}><ArrowRight size={18} />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "#f8fafc", padding: "64px 1.5rem" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1A2E35", marginBottom: "8px" }}>
              Perguntas frequentes
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px" }}>
              O que você provavelmente quer saber antes de começar.
            </p>
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "8px 32px" }}>
              {FAQ.map((item) => (
                <FaqItem key={item.pergunta} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="dfl-cta">
          <h2>Dê rumo à sua vida financeira</h2>
          <p>Faça o diagnóstico gratuito e descubra por onde começar.</p>
          <Link className="dfl-btn" to={DIAGNOSTICO_URL} onClick={trackInicio}>
            Avaliar minhas finanças
            <ArrowRight size={20} />
          </Link>
          <p className="dfl-privacy dfl-privacy-dark">
            Ao continuar, você concorda com a nossa{" "}
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
          </p>
        </section>
      </div>
    </ToolPageLayout>
  );
}
