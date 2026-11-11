import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock, Gift, Laptop, ArrowRight, ChevronDown, ChevronUp,
  ClipboardList, BarChart3, Compass, TrendingDown,
} from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import heroImg from "@/assets/hero-freelancer.webp";

// Meta Pixel (fbq é carregado no index.html)
const fbq = (...args: unknown[]) => (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(...args);
const trackInicio = () => fbq("trackCustom", "IniciouDiagnostico", { publico: "freelancer" });

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
    texto: "Um panorama claro de onde você está hoje, considerando uma renda que muda de mês a mês e pagamentos que nem sempre caem no prazo.",
  },
  {
    icon: Compass,
    cor: "#3b82f6",
    titulo: "Saiba por onde começar",
    texto: "Próximos passos práticos, na ordem certa, e as ferramentas da Orienta para cada etapa.",
  },
];

const PUBLICO = [
  "Designers, desenvolvedores, redatores, fotógrafos, editores de vídeo, consultores e outros profissionais que trabalham por projeto",
  "Quem recebe de vários clientes, em datas diferentes, e nunca sabe ao certo quanto vai entrar no mês seguinte",
  "Quem trabalha como autônomo, PJ ou MEI e ainda não organizou reserva, aposentadoria e proteção para si",
];

const DORES = [
  "Cliente que atrasa o pagamento e deixa a conta do mês no vermelho",
  "Projeto cancelado de última hora, sem aviso e sem multa",
  "Meses de muito trabalho seguidos de meses de agenda vazia",
  "Sem 13º, férias remuneradas ou FGTS para amortecer a queda",
  "Dinheiro pessoal e dinheiro do trabalho misturados na mesma conta",
];

const NUMEROS = [
  { valor: "74,1%", texto: "dizem que a renda que varia é o maior desafio de ser freelancer.", cor: "#FFA726" },
  { valor: "33,3%", texto: "tiveram queda de renda no último ano.", cor: "#1daf66" },
];

const FAQ = [
  {
    pergunta: "O diagnóstico é mesmo gratuito?",
    resposta: "Sim. Você responde, vê o resultado e não paga nada. A Orienta é um projeto de educação financeira independente.",
  },
  {
    pergunta: "Serve para quem tem vários clientes e recebe em datas diferentes?",
    resposta: "Serve. O diagnóstico olha para a sua renda como um todo, venha ela de um cliente fixo ou de vários projetos, e considera que ela pode variar e atrasar.",
  },
  {
    pergunta: "Preciso ter documentos ou extratos à mão?",
    resposta: "Não. Valores aproximados já servem. O objetivo é te dar uma visão geral e mostrar por onde começar, não fazer uma auditoria.",
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
 * Landing do diagnóstico financeiro (gratuito, ~3 min) voltada a freelancers
 * (renda variável, pagamentos atrasados). Variante da landing CLT.
 */
export default function DiagnosticoFinanceiroFreelancerLanding() {
  useDocumentMeta(
    "Diagnóstico Financeiro para Freelancers | Orienta",
    "Cliente atrasou de novo? Descubra em 3 minutos como está a sua renda de freelancer. Diagnóstico financeiro gratuito para quem tem renda variável.",
  );

  useEffect(() => {
    fbq("track", "ViewContent", { content_category: "freelancer" });
  }, []);

  return (
    <ToolPageLayout>
      <style>{`
        .dff-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
        }

        .dff-hero {
          background: var(--vt-darker);
          padding: 3.5rem 1.5rem;
          position: relative;
          overflow: hidden;
          min-height: calc(100vh - 4rem);
          display: flex;
          align-items: center;
        }
        @media (min-width: 768px) { .dff-hero { padding: 4.5rem 5rem; } }

        .dff-grid {
          max-width: 72rem; margin: 0 auto; position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: center;
          grid-template-areas: "text" "visual" "cta";
          width: 100%;
        }
        .dff-text { grid-area: text; }
        .dff-right { grid-area: visual; }
        .dff-cta-block { grid-area: cta; }
        @media (min-width: 1024px) {
          .dff-grid {
            grid-template-columns: 1fr minmax(0, 560px); column-gap: 2.5rem; row-gap: 0;
            grid-template-areas: "text visual" "cta visual";
            grid-template-rows: auto auto;
          }
          .dff-text { align-self: end; }
          .dff-cta-block { align-self: start; }
        }

        .dff-badges { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.5rem; }
        .dff-badge {
          display: inline-flex; align-items: center; gap: 0.45rem;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18);
          color: #d9e6de; font-size: 0.8rem; font-weight: 700;
          padding: 0.5rem 0.9rem; border-radius: 999px;
        }
        .dff-badge svg { color: var(--vt-dark); flex-shrink: 0; }

        .dff-title {
          font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 900; line-height: 1.15;
          letter-spacing: -0.02em; color: #fff; margin-bottom: 1.25rem;
        }
        /* mobile: título e gráfico ficam 28% mais próximos (3,25rem → 2,34rem) */
        .dff-title { margin-bottom: 0.34rem; }
        @media (min-width: 1024px) { .dff-title { margin-bottom: 1.25rem; } }
        .dff-title .accent { color: var(--vt-light); }
        .dff-title .accent-alt { color: var(--vt-mid); }

        .dff-sub {
          font-size: 1.05rem; line-height: 1.65; color: #a3b8ac;
          max-width: 34rem; margin-bottom: 2rem;
        }

        .dff-sub-mobile { display: block; margin: 1.25rem 0 0; }
        .dff-sub-desktop { display: none; }
        @media (min-width: 1024px) {
          .dff-sub-mobile { display: none; }
          .dff-sub-desktop { display: block; }
        }

        .dff-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }

        .dff-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: var(--vt-dark); color: #fff; text-decoration: none;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1.05rem;
          padding: 1.1rem 2.25rem; border-radius: 0.6rem; border: none;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .dff-btn:hover { background: #16382c; transform: translateY(-1px); }
        .dff-btn:active { transform: translateY(0); }
        .dff-btn svg { transition: transform 0.2s; }
        .dff-btn:hover svg { transform: translateX(4px); }

        .dff-soon {
          display: inline-block; background: var(--vt-mid); color: var(--vt-darker);
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0.2rem 0.55rem; border-radius: 999px;
        }

        .dff-note { margin-top: 1rem; font-size: 0.85rem; color: #8aab96; }

        .dff-right { position: relative; width: 100%; max-width: 560px; margin: 0 auto; align-self: end; }
        .dff-media { position: relative; width: 100%; max-width: 420px; margin: 0 auto; }
        @media (max-width: 767px) { .dff-media { max-width: 233px; } }
        .dff-glow {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: linear-gradient(to top, rgba(29,175,102,0.9) 0%, rgba(29,175,102,0.45) 45%, rgba(29,175,102,0) 100%);
          -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
          transform: scale(1.22); transform-origin: 50% 100%;
          filter: blur(18px);
        }
        .dff-photo { position: relative; z-index: 1; width: 100%; height: auto; display: block; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.35)); }

        .dff-hero-blob {
          position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem;
          opacity: 0.06; pointer-events: none;
        }

        .dff-section { padding: 4rem 1.5rem; }
        .dff-container { max-width: 72rem; margin: 0 auto; }
        .dff-h2 {
          font-size: clamp(1.5rem, 3.2vw, 2rem); font-weight: 800; color: #1A2E35;
          letter-spacing: -0.02em; margin-bottom: 0.5rem;
        }
        .dff-lead { font-size: 15px; color: #607060; margin-bottom: 2rem; max-width: 40rem; line-height: 1.6; }

        .dff-cards { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        .dff-card {
          background: #fff; border: 1px solid #e2e8e2; border-radius: 1rem; padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(26,69,55,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .dff-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(26,69,55,0.1); }
        .dff-icon {
          width: 2.75rem; height: 2.75rem; border-radius: 0.75rem;
          display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;
        }
        .dff-card h3 { font-size: 1.05rem; font-weight: 800; color: #1A2E35; margin-bottom: 0.4rem; }
        .dff-card p { font-size: 0.9rem; line-height: 1.6; color: #607060; }
        .dff-step-n { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.08em; color: #8aab96; margin-bottom: 0.5rem; }

        .dff-stats { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        .dff-stat {
          background: var(--vt-darker); border-radius: 1rem; padding: 2rem 1.75rem;
          box-shadow: 0 8px 24px rgba(26,46,53,0.15);
        }
        .dff-stat-n { font-size: clamp(2.75rem, 7vw, 3.75rem); font-weight: 900; line-height: 1; letter-spacing: -0.03em; }
        .dff-stat p { color: #fff; font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin: 0.9rem 0 0.75rem; }
        .dff-stat small { color: #8aab96; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.04em; }

        .dff-hope {
          display: flex; gap: 1rem; align-items: flex-start; margin-top: 1.5rem;
          background: rgba(29,175,102,0.1); border: 1px solid rgba(29,175,102,0.3);
          border-radius: 1rem; padding: 1.5rem;
        }
        .dff-hope svg { color: #1daf66; flex-shrink: 0; margin-top: 2px; }
        .dff-hope p { font-size: 0.98rem; line-height: 1.65; color: #1A2E35; margin: 0; }

        .dff-publico { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.75rem; }
        .dff-publico li {
          display: flex; align-items: flex-start; gap: 0.75rem; background: #fff;
          border: 1px solid #e2e8e2; border-radius: 0.75rem; padding: 0.9rem 1.1rem;
          font-size: 0.95rem; font-weight: 600; color: #1A2E35;
        }
        .dff-publico svg { color: #1daf66; flex-shrink: 0; margin-top: 2px; }

        .dff-cta {
          background: var(--vt-darker); text-align: center; padding: 4.5rem 1.5rem;
        }
        .dff-cta h2 {
          font-size: clamp(1.6rem, 3.5vw, 2.25rem); font-weight: 900; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 0.75rem;
        }
        .dff-cta p { color: #a3b8ac; margin-bottom: 2rem; }
      `}</style>

      <div className="dff-root">
        {/* Hero */}
        <section className="dff-hero">
          <div className="dff-grid">
            <div className="dff-text">
              <h1 className="dff-title">
                O cliente não pagou. Você está <span className="accent-alt">preparado para isso?</span>
              </h1>
              <p className="dff-sub dff-sub-desktop" style={{ marginBottom: 0 }}>
                Descubra em <strong style={{ color: "#fff" }}>3 minutos</strong> como estão suas finanças e por onde começar.
              </p>
            </div>

            <div className="dff-right">
              <div className="dff-media">
                <div
                  className="dff-glow"
                  aria-hidden="true"
                  style={{ WebkitMaskImage: `url(${heroImg})`, maskImage: `url(${heroImg})` }}
                />
                <img
                  className="dff-photo"
                  src={heroImg}
                  alt="Freelancer sorrindo segurando um notebook"
                  width={768}
                  height={875}
                />
              </div>
            </div>

            <div className="dff-cta-block">
              <div className="dff-actions">
                <Link className="dff-btn" to={DIAGNOSTICO_URL} onClick={trackInicio}>
                  Avaliar minhas finanças
                  <ArrowRight size={20} />
                </Link>
              </div>
              <p className="dff-note">Diagnóstico financeiro, para freelancers e autônomos com renda que muda de mês a mês.</p>

              <div className="dff-badges">
                <span className="dff-badge"><Gift size={16} />100% gratuito</span>
                <span className="dff-badge"><Clock size={16} />Leva 3 minutos</span>
                <span className="dff-badge"><Laptop size={16} />Para freelancers</span>
              </div>
            </div>
          </div>

          <svg className="dff-hero-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
              fill="#abccb5"
              transform="translate(100 100)"
            />
          </svg>
        </section>

        {/* Números */}
        <section className="dff-section" style={{ background: "#fff" }}>
          <div className="dff-container">
            <h2 className="dff-h2">A renda que varia é o maior desafio</h2>
            <p className="dff-lead">
              A pesquisa HUG de 2026 ouviu freelancers sobre o dia a dia de quem vive de projeto. O resultado confirma o que você provavelmente já sente: pagamento atrasado e projeto cancelado fazem parte da rotina.
            </p>
            <div className="dff-stats">
              {NUMEROS.map((n) => (
                <div key={n.valor} className="dff-stat">
                  <div className="dff-stat-n" style={{ color: n.cor }}>{n.valor}</div>
                  <p>{n.texto}</p>
                  <small>Pesquisa HUG, 2026</small>
                </div>
              ))}
            </div>

            <div className="dff-hope">
              <TrendingDown size={26} />
              <p>
                <strong>O que dá para fazer:</strong> você não controla quando o cliente paga, mas controla quanto precisa ter de reserva, como organiza as entradas e quanto separa para os meses fracos. É isso que o diagnóstico ajuda a enxergar.
              </p>
            </div>
          </div>
        </section>

        {/* Dores */}
        <section className="dff-section" style={{ background: "#f8faf8" }}>
          <div className="dff-container" style={{ maxWidth: "800px" }}>
            <h2 className="dff-h2">Entregar o projeto é uma coisa. Receber no prazo é outra</h2>
            <p className="dff-lead">
              Quando o cliente atrasa, quem paga a conta é você. Sem salário fixo nem colchão de proteção, um único pagamento atrasado desorganiza o mês inteiro.
            </p>
            <ul className="dff-publico">
              {DORES.map((item) => (
                <li key={item}><ArrowRight size={18} />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Como funciona */}
        <section className="dff-section" style={{ background: "#fff" }}>
          <div className="dff-container">
            <h2 className="dff-h2">Como vai funcionar</h2>
            <p className="dff-lead">Três passos, sem cadastro complicado e sem conversa de vendedor.</p>
            <div className="dff-cards">
              {PASSOS.map((p, i) => (
                <div key={p.titulo} className="dff-card">
                  <div className="dff-icon" style={{ background: `${p.cor}1f`, color: p.cor }}>
                    <p.icon size={22} />
                  </div>
                  <div className="dff-step-n">PASSO {i + 1}</div>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quem é */}
        <section className="dff-section" style={{ background: "#fff" }}>
          <div className="dff-container" style={{ maxWidth: "800px" }}>
            <h2 className="dff-h2">Para quem é</h2>
            <p className="dff-lead">Se a sua renda depende dos projetos que você entrega, este diagnóstico foi pensado para o seu dia a dia.</p>
            <ul className="dff-publico">
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
        <section className="dff-cta">
          <h2>Dê rumo à sua vida financeira</h2>
          <p>Faça o diagnóstico gratuito e descubra por onde começar.</p>
          <Link className="dff-btn" to={DIAGNOSTICO_URL} onClick={trackInicio}>
            Avaliar minhas finanças
            <ArrowRight size={20} />
          </Link>
        </section>
      </div>
    </ToolPageLayout>
  );
}
