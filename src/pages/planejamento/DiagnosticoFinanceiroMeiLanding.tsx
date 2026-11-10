import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock, Gift, Briefcase, ArrowRight, ChevronDown, ChevronUp,
  ClipboardList, BarChart3, Compass,
} from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import postMeis from "@/assets/post-meis-orientacao.png";
import postDesafio from "@/assets/post-desafio-conta-propria.png";
import postGuardam from "@/assets/post-brasileiros-guardam.png";
import postPreocupacao from "@/assets/post-maior-preocupacao.png";

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
    texto: "Um panorama claro de onde você está hoje, pensado para quem tem renda que varia de mês a mês.",
  },
  {
    icon: Compass,
    cor: "#3b82f6",
    titulo: "Saiba por onde começar",
    texto: "Próximos passos práticos, na ordem certa, e as ferramentas da Orienta para cada etapa.",
  },
];

const PUBLICO = [
  "Autônomos e profissionais liberais",
  "MEIs e donos de pequenos negócios",
  "PJs e freelancers",
  "Quem tem renda variável e não sabe quanto vai ganhar no mês seguinte",
  "Quem nunca fez um diagnóstico das próprias finanças",
];

const POSTS = [
  { src: postMeis, alt: "MEIs que continuam abertos depois de 5 anos: 34% sem orientação e 65% com orientação (Sebrae, 2026)" },
  { src: postDesafio, alt: "74% dos freelancers e PJs dizem que o maior desafio é não saber quanto vão ganhar todo mês (Pesquisa HUG, 2026)" },
  { src: postGuardam, alt: "Só 12 em cada 100 brasileiros conseguem pagar as contas e ainda guardar um pouco (Onze e Icatu, 2025)" },
  { src: postPreocupacao, alt: "49% dos brasileiros se preocupam mais com dinheiro, contra 19% com saúde (Onze e Icatu, 2025)" },
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
    pergunta: "Serve para quem tem renda variável?",
    resposta: "Foi feito justamente para isso. As perguntas consideram que sua renda muda de mês a mês, algo que a maioria dos diagnósticos tradicionais ignora.",
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
    pergunta: "Quando a ferramenta será lançada?",
    resposta: "Já está no ar. Clique em “Fazer meu diagnóstico” e responda em cerca de 3 minutos.",
  },
];

/**
 * Landing da futura ferramenta de diagnóstico financeiro (gratuita, ~3 min) para
 * autônomos, MEIs, PJs e freelancers. A ferramenta ainda não existe: o CTA
 * principal é "Em breve" e leva para o Instagram. Layout inspirado em
 * `SeguroVidaCotacaoLanding`.
 */
export default function DiagnosticoFinanceiroMeiLanding() {
  useDocumentMeta(
    "Diagnóstico Financeiro MEI Grátis para Autônomos e MEIs | Orienta",
    "Descubra em 3 minutos como estão as finanças de quem trabalha por conta própria. Diagnóstico financeiro gratuito para autônomos, MEIs, PJs e freelancers.",
  );

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
          display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center;
          width: 100%;
        }
        @media (min-width: 1024px) {
          .dfl-grid { grid-template-columns: 1fr minmax(0, 420px); gap: 3.5rem; }
        }

        .dfl-badges { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.5rem; }
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
        .dfl-title .accent { color: var(--vt-light); }
        .dfl-title .accent-alt { color: var(--vt-mid); }

        .dfl-sub {
          font-size: 1.05rem; line-height: 1.65; color: #a3b8ac;
          max-width: 34rem; margin-bottom: 2rem;
        }

        .dfl-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }

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

        .dfl-right { position: relative; width: 100%; max-width: 420px; margin: 0 auto; padding: 0 0 1.5rem; }
        .dfl-post {
          display: block; width: 100%; height: auto; border-radius: 1.25rem;
          box-shadow: 0 20px 45px rgba(0,0,0,0.35);
        }
        .dfl-post-back {
          position: absolute; top: 1.5rem; left: 0; width: 88%;
          transform: rotate(-6deg); opacity: 0.55; z-index: 0;
        }
        .dfl-post-front { position: relative; z-index: 1; transform: rotate(3deg); width: 88%; margin-left: 12%; }

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

        .dfl-posts { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        .dfl-posts img {
          width: 100%; height: auto; display: block; border-radius: 1rem;
          box-shadow: 0 8px 24px rgba(26,46,53,0.15);
        }

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
            <div>
              <div className="dfl-badges">
                <span className="dfl-badge"><Gift size={16} />100% gratuito</span>
                <span className="dfl-badge"><Clock size={16} />Leva 3 minutos</span>
                <span className="dfl-badge"><Briefcase size={16} />Para quem trabalha por conta própria</span>
              </div>

              <h1 className="dfl-title">
                Como estão as suas <span className="accent-alt">finanças</span>?{" "}
                Descubra em <span className="accent">3 minutos</span>
              </h1>

              <p className="dfl-sub">
                Diagnóstico financeiro gratuito para autônomos, MEIs, PJs e freelancers.
                Responda a perguntas rápidas e saiba onde você está e por onde começar,
                mesmo com renda que muda todo mês.
              </p>

              <div className="dfl-actions">
                <Link className="dfl-btn" to={DIAGNOSTICO_URL}>
                  Fazer meu diagnóstico
                  <ArrowRight size={20} />
                </Link>
              </div>
              <p className="dfl-note">Gratuito, leva cerca de 3 minutos e o resultado aparece na hora.</p>
            </div>

            <div className="dfl-right">
              <img src={postDesafio} alt="" aria-hidden="true" className="dfl-post dfl-post-back" />
              <img src={postMeis} alt={POSTS[0].alt} className="dfl-post dfl-post-front" />
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
            <h2 className="dfl-h2">Por que fazer um diagnóstico?</h2>
            <p className="dfl-lead">
              Quem trabalha por conta própria carrega o peso de uma renda incerta. Os números mostram
              como é comum começar sem clareza, e o quanto ter orientação faz diferença.
            </p>
            <div className="dfl-posts">
              {POSTS.map((p) => (
                <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
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
            <p className="dfl-lead">Se a sua renda depende de você, este diagnóstico foi pensado para o seu dia a dia.</p>
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
          <Link className="dfl-btn" to={DIAGNOSTICO_URL}>
            Fazer meu diagnóstico
            <ArrowRight size={20} />
          </Link>
        </section>
      </div>
    </ToolPageLayout>
  );
}
