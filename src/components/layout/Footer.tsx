import { Link } from "react-router-dom";
import Logo from "@/assets/logo-no-bg.png";
import { Instagram, Youtube, Building2, Shield, TrendingUp, Calculator } from "lucide-react";
import {
  SOBRE_URL,
  primeirosSeguros,
  primeirosInvestimentos,
  primeirosPlanejamento,
  ferramentasItems,
  artigosItems,
} from "@/components/layout/Header";

const primeirosGroups = [
  { key: "imoveis", label: "Imóveis", icon: Building2, comingSoon: true, links: [] as { name: string; href: string }[] },
  { key: "seguros", label: "Seguros", icon: Shield, links: primeirosSeguros },
  { key: "investimentos", label: "Investimentos", icon: TrendingUp, links: primeirosInvestimentos },
  { key: "planejamento", label: "Planejamentos", icon: Calculator, links: primeirosPlanejamento },
];

export function Footer() {
  return (
    <footer className="bg-background-dark pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Logo + descrição + social */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link to="/" className="w-fit">
              <img src={Logo} alt="Orienta" className="h-24" />
            </Link>
            <p className="max-w-xs text-sm text-white/60">
              <span className="font-semibold text-primary">Dê rumo</span> à sua vida financeira
              com educação e ferramentas que{" "}
              <span className="font-semibold text-primary">potencializam</span> suas decisões.
            </p>

            <div className="h-px w-full max-w-xs bg-white/10" />

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/orienta.financas/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-background-dark"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@OrientaFinan%C3%A7as"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-background-dark"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>

            <div className="flex flex-col gap-1.5">
              <a
                href={SOBRE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-white/60 transition-colors hover:text-primary"
              >
                Sobre
              </a>
            </div>
          </div>

          {/* Seus Primeiros — mesma estrutura do menu do header, já aberta */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              Seus Primeiros
            </h3>
            <div className="flex flex-col gap-3">
              {primeirosGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.key}>
                    <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/50">
                      <Icon className="h-3.5 w-3.5" />
                      {group.label}
                    </p>
                    {group.comingSoon ? (
                      <span className="block pl-5 text-sm italic text-white/30">Em breve</span>
                    ) : (
                      <ul className="flex flex-col gap-1.5 pl-5">
                        {group.links.map((item) => (
                          <li key={item.href}>
                            <Link
                              to={item.href}
                              className="text-sm text-white/70 transition-colors hover:text-primary"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ferramentas */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              Ferramentas
            </h3>
            <ul className="flex flex-col gap-2">
              {ferramentasItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artigos */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              Artigos
            </h3>
            <ul className="flex flex-col gap-2">
              {artigosItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/40">
            © {new Date().getFullYear()} Orienta. Dê rumo à sua vida financeira.
          </p>
        </div>
      </div>
    </footer>
  );
}
