import { Link } from "react-router-dom";
import Logo from "@/assets/logo-no-bg.png";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Linkedin } from "lucide-react";

const planejamentoItems = [
  { name: "Despesas", href: "/despesas" },
  { name: "Calculadora de aposentadoria", href: "/ferramentas/aposentadoria" },
  { name: "Metas de investimentos", href: "/ferramentas/metas" },
];

const rendaFixaItems = [
  { name: "Comparador de renda fixa", href: "/ferramentas/renda-fixa" },
  { name: "Guias", href: "/investimentos/rendafixa" },
];

const investimentosItems = [
  { name: "Fundos", href: "/investimentos/fundos" },
  { name: "FII", href: "/investimentos/fii" },
  { name: "Ações", href: "/investimentos/acoes" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pt-12 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Logo + CTA */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-12" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Direcionando suas finanças com educação, ferramentas e consultoria personalizada.
            </p>
            <Button asChild className="w-fit mt-2">
              <Link to="/orientaplus">Saiba mais</Link>
            </Button>

            {/* Redes sociais */}
            <div className="flex items-center gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Planejamento */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Planejamento</h3>
            <ul className="flex flex-col gap-2">
              {planejamentoItems.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investimentos */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Renda Fixa</h3>
            <ul className="flex flex-col gap-2 mb-4">
              {rendaFixaItems.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Outros Investimentos</h3>
            <ul className="flex flex-col gap-2">
              {investimentosItems.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Outros */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Mais</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/imposto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Impostos
                </Link>
              </li>
              <li>
                <Link to="/orientaplus" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Orienta+
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Orienta. Direcionando suas finanças.
          </p>
        </div>
      </div>
    </footer>
  );
}
