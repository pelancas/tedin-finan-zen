import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, TrendingUp, Calculator, Receipt } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo-no-bg-sm.png";

const planejamentoItems = [
  { name: "Despesas", href: "/planejamento/despesas" },
];

const calculadorasItems = [
  { name: "Calculadora de aposentadoria", href: "/planejamento/calculadoras/aposentadoria" },
  { name: "Calculadora de metas", href: "/planejamento/calculadoras/metas" },
  { name: "Calculadora do milhão", href: "/planejamento/calculadoras/milhao" },
];

const investimentosAtivos = [
  { name: "Ações", href: "/investimentos/acoes" },
  { name: "FII", href: "/investimentos/fii" },
  { name: "Fundos", href: "/investimentos/fundos" },
];

const rendaFixaItems = [
  { name: "Renda Fixa", href: "/investimentos/renda-fixa" },
  { name: "Comparador de renda fixa", href: "/investimentos/renda-fixa/comparador" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [planejamentoOpen, setPlanejamentoOpen] = useState(false);
  const [investimentosOpen, setInvestimentosOpen] = useState(false);
  const [mobilePlanejamentoOpen, setMobilePlanejamentoOpen] = useState(false);
  const [mobileInvestimentosOpen, setMobileInvestimentosOpen] = useState(false);
  const [mobileRendaFixaOpen, setMobileRendaFixaOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const planejamentoRef = useRef<HTMLDivElement>(null);
  const investimentosRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      if (currentScrollY < 10) {
        setHeaderVisible(true);
      } else if (delta > 5) {
        setHeaderVisible(false);
        setPlanejamentoOpen(false);
        setInvestimentosOpen(false);
      } else if (delta < -5) {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (planejamentoRef.current && !planejamentoRef.current.contains(e.target as Node)) {
        setPlanejamentoOpen(false);
      }
      if (investimentosRef.current && !investimentosRef.current.contains(e.target as Node)) {
        setInvestimentosOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPlanejamentoActive = location.pathname.startsWith("/planejamento");
  const isInvestimentosActive = location.pathname.startsWith("/investimentos");
  const isImpostosActive = location.pathname === "/impostos";

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-white border-b border-border relative transition-transform duration-300",
      !headerVisible && "-translate-y-full"
    )}>
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-14" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0 h-full">

          {/* Planejamento */}
          <div ref={planejamentoRef}>
            <button
              onClick={() => { setPlanejamentoOpen(!planejamentoOpen); setInvestimentosOpen(false); }}
              className={cn(
                "flex items-center gap-2 px-5 h-20 text-sm font-medium transition-colors border-b-2",
                isPlanejamentoActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Planejamento
              <ChevronDown className={cn("h-3 w-3 transition-transform", planejamentoOpen && "rotate-180")} />
            </button>

            {planejamentoOpen && (
              <div className="absolute left-0 right-0 top-full border-b bg-white shadow-lg z-40">
                <div className="container py-6">
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Planejamento</h3>
                      <div className="flex flex-col gap-1">
                        {planejamentoItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setPlanejamentoOpen(false)}
                            className={cn(
                              "text-sm py-1.5 transition-colors hover:text-primary",
                              location.pathname === item.href
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Calculadoras</h3>
                      <div className="flex flex-col gap-1">
                        {calculadorasItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setPlanejamentoOpen(false)}
                            className={cn(
                              "text-sm py-1.5 transition-colors hover:text-primary",
                              location.pathname === item.href
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Investimentos */}
          <div ref={investimentosRef}>
            <button
              onClick={() => { setInvestimentosOpen(!investimentosOpen); setPlanejamentoOpen(false); }}
              className={cn(
                "flex items-center gap-2 px-5 h-20 text-sm font-medium transition-colors border-b-2",
                isInvestimentosActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Investimentos
              <ChevronDown className={cn("h-3 w-3 transition-transform", investimentosOpen && "rotate-180")} />
            </button>

            {investimentosOpen && (
              <div className="absolute left-0 right-0 top-full border-b border-border bg-white shadow-lg z-40">
                <div className="container py-6">
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Ativos</h3>
                      <div className="flex flex-col gap-1">
                        {investimentosAtivos.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setInvestimentosOpen(false)}
                            className={cn(
                              "text-sm py-1.5 transition-colors hover:text-primary",
                              location.pathname === item.href
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Renda Fixa</h3>
                      <div className="flex flex-col gap-1">
                        {rendaFixaItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setInvestimentosOpen(false)}
                            className={cn(
                              "text-sm py-1.5 transition-colors hover:text-primary",
                              location.pathname === item.href
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Impostos */}
          <Link
            to="/impostos"
            onClick={() => { setPlanejamentoOpen(false); setInvestimentosOpen(false); }}
            className={cn(
              "flex items-center gap-2 px-5 h-20 text-sm font-medium transition-colors border-b-2",
              isImpostosActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            Impostos
          </Link>

          {/* Orienta+ */}
          <Link
            to="/orientaplus"
            onClick={() => { setPlanejamentoOpen(false); setInvestimentosOpen(false); }}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
              "bg-primary text-white hover:bg-primary/90",
              location.pathname.startsWith("/orientaplus")
                ? "ring-2 ring-primary"
                : ""
            )}
          >
            Orienta +
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-card p-4">
          <div className="flex flex-col gap-2">

            {/* Mobile Planejamento */}
            <button
              onClick={() => setMobilePlanejamentoOpen(!mobilePlanejamentoOpen)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full",
                isPlanejamentoActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Calculator className="h-5 w-5" />
              Planejamento
              <ChevronDown className={cn("h-3 w-3 ml-auto transition-transform", mobilePlanejamentoOpen && "rotate-180")} />
            </button>
            {mobilePlanejamentoOpen && (
              <div className="ml-8 flex flex-col gap-1">
                {planejamentoItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMobile}
                    className={cn(
                      "px-4 py-2.5 rounded-lg text-sm transition-colors",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <p className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Calculadoras</p>
                {calculadorasItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMobile}
                    className={cn(
                      "px-4 py-2.5 rounded-lg text-sm transition-colors",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Investimentos */}
            <button
              onClick={() => setMobileInvestimentosOpen(!mobileInvestimentosOpen)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full",
                isInvestimentosActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <TrendingUp className="h-5 w-5" />
              Investimentos
              <ChevronDown className={cn("h-3 w-3 ml-auto transition-transform", mobileInvestimentosOpen && "rotate-180")} />
            </button>
            {mobileInvestimentosOpen && (
              <div className="ml-8 flex flex-col gap-1">
                {investimentosAtivos.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMobile}
                    className={cn(
                      "px-4 py-2.5 rounded-lg text-sm transition-colors",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => setMobileRendaFixaOpen(!mobileRendaFixaOpen)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors w-full",
                    location.pathname.startsWith("/investimentos/renda-fixa")
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Renda Fixa
                  <ChevronDown className={cn("h-3 w-3 transition-transform", mobileRendaFixaOpen && "rotate-180")} />
                </button>
                {mobileRendaFixaOpen && (
                  <div className="ml-4 flex flex-col gap-1 border-l border-border pl-2">
                    {rendaFixaItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeMobile}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm transition-colors",
                          location.pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Mobile Impostos */}
            <Link
              to="/impostos"
              onClick={closeMobile}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isImpostosActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Receipt className="h-5 w-5" />
              Impostos
            </Link>

            {/* Mobile Orienta+ */}
            <Link
              to="/orientaplus"
              onClick={closeMobile}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname.startsWith("/orientaplus")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              Orienta+
            </Link>

          </div>
        </nav>
      )}
    </header>
  );
}
