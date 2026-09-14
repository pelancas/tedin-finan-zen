import { Link } from "react-router-dom";
import { Shield, PiggyBank, Home, Wallet, ArrowRight, type LucideIcon } from "lucide-react";

interface FerramentaItem {
  titulo: string;
  descricao: string;
  href: string;
  icon: LucideIcon;
}

const FERRAMENTAS: FerramentaItem[] = [
  {
    titulo: "Calculadora de seguros",
    descricao: "Descubra quanto de seguro de vida ou invalidez você realmente precisa.",
    href: "/seguros",
    icon: Shield,
  },
  {
    titulo: "Calculadora de aposentadoria",
    descricao: "Descubra quanto guardar todo mês para se aposentar com tranquilidade.",
    href: "/planejamento/calculadoras/aposentadoria",
    icon: PiggyBank,
  },
  {
    titulo: "Posso comprar este imóvel?",
    descricao: "Veja se o imóvel cabe no seu orçamento antes de assinar o contrato.",
    href: "/imoveis/calculadoras/posso-comprar",
    icon: Home,
  },

];

interface OutrasFerramentasProps {
  /** Href da página atual — remove essa ferramenta da lista para não linkar para si mesma. */
  exclude?: string;
}

export function OutrasFerramentas({ exclude }: OutrasFerramentasProps) {
  const items = FERRAMENTAS.filter((item) => item.href !== exclude);

  return (
    <section style={{ padding: "64px 0", background: "#fff" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1A2E35", marginBottom: "8px" }}>
          Outras ferramentas
        </h2>
        <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px" }}>
          Continue organizando sua vida financeira com essas calculadoras gratuitas.
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px",
        }}>
          {items.map(({ titulo, descricao, href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              style={{
                display: "flex", flexDirection: "column", background: "#fff",
                borderRadius: "12px", padding: "20px", textDecoration: "none",
                boxShadow: "inset 0 0 0 1px #e2e8f0",
              }}
            >
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "#f0faf5", display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: "14px",
              }}>
                <Icon size={18} style={{ color: "#1daf66" }} />
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1A2E35", marginBottom: "6px" }}>
                {titulo}
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6", marginBottom: "14px" }}>
                {descricao}
              </p>
              <span style={{
                marginTop: "auto", display: "flex", alignItems: "center", gap: "6px",
                fontSize: "13px", fontWeight: 700, color: "#1daf66",
              }}>
                Acessar
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
