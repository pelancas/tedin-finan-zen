import { Link } from "react-router-dom";
import Logo from "@/assets/logo-no-bg.png";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

const planejamentoLinks = [
  { name: "Despesas", href: "/planejamento/despesas" },
  { name: "Calculadora de aposentadoria", href: "/planejamento/calculadoras/aposentadoria" },
  { name: "Calculadora de metas", href: "/planejamento/calculadoras/metas" },
  { name: "Calculadora do milhão", href: "/planejamento/calculadoras/milhao" },
];

const investimentosLinks = [
  { name: "Ações", href: "/investimentos/acoes" },
  { name: "FII", href: "/investimentos/fii" },
  { name: "Fundos", href: "/investimentos/fundos" },
  { name: "Renda Fixa", href: "/investimentos/renda-fixa" },
  { name: "Comparador de renda fixa", href: "/investimentos/renda-fixa/comparador" },
];

const outrosLinks = [
  { name: "Impostos", href: "/impostos" },
  { name: "Orienta+", href: "/orientaplus" },
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
            <Button asChild className="w-fit mt-2">
              <Link to="https://wa.me/5531971778537">Entre em contato</Link>
            </Button>

            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/orienta.financas/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Planejamento */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Planejamento</h3>
            <ul className="flex flex-col gap-2">
              {planejamentoLinks.map((item) => (
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Investimentos</h3>
            <ul className="flex flex-col gap-2">
              {investimentosLinks.map((item) => (
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
              {outrosLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
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
