import { Link } from "react-router-dom";
import { ArrowRight, Building2, Shield, TrendingUp, Calculator, LucideIcon } from "lucide-react";

interface SectionLink {
  name: string;
  href: string;
}

interface Section {
  key: string;
  label: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  links: SectionLink[];
}

const sections: Section[] = [
  {
    key: "imoveis",
    label: "Imóveis",
    icon: Building2,
    comingSoon: true,
    links: [],
  },
  {
    key: "seguros",
    label: "Seguros",
    icon: Shield,
    links: [
      { name: "Calculadora de seguros", href: "/seguros" },
      { name: "Artigos", href: "/seguros/conteudos" },
    ],
  },
  {
    key: "investimentos",
    label: "Investimentos",
    icon: TrendingUp,
    links: [
      { name: "Ações", href: "/investimentos/acoes" },
      { name: "FII", href: "/investimentos/fii" },
      { name: "Fundos", href: "/investimentos/fundos" },
      { name: "Renda Fixa", href: "/investimentos/renda-fixa" },
    ],
  },
  {
    key: "planejamento",
    label: "Planejamento",
    icon: Calculator,
    links: [
      { name: "Calculadora de aposentadoria", href: "/planejamento/calculadoras/aposentadoria" },
    ],
  },
];

export function SeusPrimeiros() {
  return (
    <section style={{
      background: "#1A2E35",
      padding: "5rem 1.5rem",
      fontFamily: "'Work Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900,
            color: "#fff", lineHeight: 1.1, margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}>
            Seus Primeiros
          </h2>
          <p style={{ color: "#a3b8ac", fontSize: "1rem", margin: 0, maxWidth: "36rem" }}>
            Escolha uma área e vá direto para as ferramentas e conteúdos que mais importam para você.
          </p>
        </div>

        {/* Grid de seções */}
        <div style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <article key={section.key} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.25rem",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}>
                <div style={{
                  width: "3rem", height: "3rem", borderRadius: "0.85rem",
                  background: "rgba(29,175,102,0.15)", color: "#1daf66",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={22} />
                </div>

                <h3 style={{
                  fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: 0,
                }}>
                  {section.label}
                </h3>

                {section.comingSoon ? (
                  <span style={{ fontSize: "0.85rem", color: "#8aab96", fontStyle: "italic" }}>
                    Em breve
                  </span>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          gap: "0.5rem", textDecoration: "none",
                          padding: "0.5rem 0.6rem", margin: "0 -0.6rem",
                          borderRadius: "0.6rem",
                          fontSize: "0.875rem", fontWeight: 600, color: "#d9e6dd",
                          transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(29,175,102,0.12)";
                          (e.currentTarget as HTMLElement).style.color = "#1daf66";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "#d9e6dd";
                        }}
                      >
                        {link.name}
                        <ArrowRight size={13} />
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
