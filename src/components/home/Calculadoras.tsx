import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Target, Trophy, BarChart2 } from "lucide-react";

const calculadoras = [
  {
    icon: TrendingUp,
    label: "Aposentadoria",
    description: "Descubra quanto guardar por mês para se aposentar com tranquilidade.",
    href: "/planejamento/calculadoras/aposentadoria",
    color: "#1daf66",
    bg: "rgba(29,175,102,0.1)",
  },
  {
    icon: Target,
    label: "Metas financeiras",
    description: "Planeje quanto tempo leva para atingir qualquer objetivo financeiro.",
    href: "/planejamento/calculadoras/metas",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    icon: Trophy,
    label: "Calculadora do milhão",
    description: "Veja em quanto tempo seu dinheiro chega a R$1.000.000.",
    href: "/planejamento/calculadoras/milhao",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
  },
  {
    icon: BarChart2,
    label: "Comparador de renda fixa",
    description: "Compare CDB, LCI, LCA, Tesouro e outros produtos lado a lado.",
    href: "/investimentos/renda-fixa/comparador",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
  },
];

export function Calculadoras() {
  return (
    <section style={{
      background: "#f8faf8",
      padding: "5rem 1.5rem",
      fontFamily: "'Work Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#1daf66", marginBottom: "0.6rem",
          }}>
            Ferramentas
          </p>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900,
            color: "#1A2E35", lineHeight: 1.1, margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}>
            Calculadoras
          </h2>
          <p style={{ color: "#607060", fontSize: "1rem", margin: 0, maxWidth: "36rem" }}>
            Simule, compare e planeje com ferramentas práticas — sem precisar de uma planilha.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}>
          {calculadoras.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link key={calc.href} to={calc.href} style={{ textDecoration: "none" }}>
                <article style={{
                  background: "#fff",
                  border: "1px solid #e2e8e2",
                  borderRadius: "1rem",
                  padding: "1.75rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  boxShadow: "0 1px 3px rgba(26,69,55,0.06)",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = calc.color;
                    el.style.boxShadow = `0 6px 20px ${calc.color}22`;
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#e2e8e2";
                    el.style.boxShadow = "0 1px 3px rgba(26,69,55,0.06)";
                    el.style.transform = "none";
                  }}
                >
                  {/* Ícone */}
                  <div style={{
                    width: "3rem", height: "3rem", borderRadius: "0.75rem",
                    background: calc.bg, display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon size={22} color={calc.color} />
                  </div>

                  {/* Texto */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flexGrow: 1 }}>
                    <h3 style={{
                      fontSize: "1.05rem", fontWeight: 800, color: "#1A2E35",
                      margin: 0, lineHeight: 1.2,
                    }}>
                      {calc.label}
                    </h3>
                    <p style={{
                      fontSize: "0.875rem", color: "#607060",
                      lineHeight: 1.55, margin: 0,
                    }}>
                      {calc.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.35rem",
                    fontSize: "0.8rem", fontWeight: 700, color: calc.color,
                  }}>
                    Acessar <ArrowRight size={13} />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
