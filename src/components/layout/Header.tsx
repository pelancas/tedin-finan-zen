import { Link, useLocation } from "react-router-dom";
import { Info, Menu, X, ChevronDown, TrendingUp, Calculator, BarChart3 } from "lucide-react";
import { useState, useRef, useEffect, ElementType } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo-no-bg-sm.png";
import iconLeao from "@/assets/icon-leao.png";
import iconConsultoria from "@/assets/icon-consultoria.png";

const planejamentoItems = [
  { name: "Despesas", href: "/despesas" },
  { name: "Calculadora de aposentadoria", href: "/ferramentas/aposentadoria" },
  { name: "Metas de investimentos", href: "/ferramentas/metas" },
  { name: "Primeiro milhão", href: "/ferramentas/primeiro-milhao" },
];

const investimentosItems = [
  { name: "Fundos", href: "/investimentos/fundos" },
  { name: "FII", href: "/investimentos/fii" },
  { name: "Ações", href: "/investimentos/acoes" },
];

const rendaFixaItems = [
  { name: "Comparador de renda fixa", href: "/ferramentas/renda-fixa" },
  { name: "Guias", href: "/investimentos/renda-fixa/guias" },
];

const sobreItem = { name: "Sobre", href: "/sobre", icon: Info };

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [planejamentoOpen, setPlanejamentoOpen] = useState(false);
  const [investimentosOpen, setInvestimentosOpen] = useState(false);
  const [mobilePlanejamentoOpen, setMobilePlanejamentoOpen] = useState(false);
  const [mobileInvestimentosOpen, setMobileInvestimentosOpen] = useState(false);
  const [rendaFixaOpen, setRendaFixaOpen] = useState(false);
  const [mobileRendaFixaOpen, setMobileRendaFixaOpen] = useState(false);
  const planejamentoRef = useRef<HTMLDivElement>(null);
  const investimentosRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (planejamentoRef.current && !planejamentoRef.current.contains(e.target as Node)) {
        setPlanejamentoOpen(false);
      }
      if (investimentosRef.current && !investimentosRef.current.contains(e.target as Node)) {
        setInvestimentosOpen(false);
        setRendaFixaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPlanejamentoActive = location.pathname === "/despesas" || location.pathname.startsWith("/ferramentas");
  const isInvestimentosActive = location.pathname.startsWith("/investimentos");

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-14" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Planejamento Dropdown */}
          <div className="relative" ref={planejamentoRef}>
            <button
              onClick={() => setPlanejamentoOpen(!planejamentoOpen)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isPlanejamentoActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Calculator className="h-5 w-5" />
              Planejamento
              <ChevronDown className={cn("h-3 w-3 transition-transform", planejamentoOpen && "rotate-180")} />
            </button>
            {planejamentoOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
                {planejamentoItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setPlanejamentoOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 text-sm transition-colors",
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

          {/* Investimentos Dropdown */}
          <div className="relative" ref={investimentosRef}>
            <button
              onClick={() => { setInvestimentosOpen(!investimentosOpen); setRendaFixaOpen(false); }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isInvestimentosActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <TrendingUp className="h-5 w-5" />
              Investimentos
              <ChevronDown className={cn("h-3 w-3 transition-transform", investimentosOpen && "rotate-180")} />
            </button>
            {investimentosOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
                {/* Renda Fixa with sub-dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setRendaFixaOpen(!rendaFixaOpen)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors",
                      location.pathname.startsWith("/investimentos/renda-fixa")
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    Renda Fixa
                    <ChevronDown className={cn("h-3 w-3 transition-transform", rendaFixaOpen && "rotate-180")} />
                  </button>
                  {rendaFixaOpen && (
                    <div className="ml-4 border-l border-border">
                      {rendaFixaItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => { setInvestimentosOpen(false); setRendaFixaOpen(false); }}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors",
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
                {investimentosItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setInvestimentosOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 text-sm transition-colors",
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

          {/* Impostos */}
          <Link
            to="/imposto"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              location.pathname === "/imposto"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <img src={iconLeao} alt="Impostos" className="h-5 w-5 object-contain" />
            Impostos
          </Link>

          {/* Consultoria */}
          <Link
            to="/consultoria"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              location.pathname.startsWith("/consultoria")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <img src={iconConsultoria} alt="Consultoria" className="h-5 w-5 object-contain" />
            Consultoria
          </Link>

          {/* Sobre */}
          <Link
            to={sobreItem.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              location.pathname === sobreItem.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Info className="h-4 w-4" />
            {sobreItem.name}
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
              <Calculator className="h-6 w-6" />
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
              <TrendingUp className="h-6 w-6" />
              Investimentos
              <ChevronDown className={cn("h-3 w-3 ml-auto transition-transform", mobileInvestimentosOpen && "rotate-180")} />
            </button>
            {mobileInvestimentosOpen && (
              <div className="ml-8 flex flex-col gap-1">
                {/* Renda Fixa sub-menu mobile */}
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
                {investimentosItems.map((item) => (
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

            {/* Mobile Impostos */}
            <Link
              to="/imposto"
              onClick={closeMobile}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === "/imposto"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <img src={iconLeao} alt="Impostos" className="h-6 w-6 object-contain" />
              Impostos
            </Link>

            {/* Mobile Consultoria */}
            <Link
              to="/consultoria"
              onClick={closeMobile}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname.startsWith("/consultoria")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <img src={iconConsultoria} alt="Consultoria" className="h-6 w-6 object-contain" />
              Consultoria
            </Link>

            {/* Mobile Sobre */}
            <Link
              to="/sobre"
              onClick={closeMobile}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === "/sobre"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Info className="h-5 w-5" />
              Sobre
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
