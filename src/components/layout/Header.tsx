import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Star, Wrench, FileText, Instagram, Building2, Shield, TrendingUp, Calculator } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo-no-bg-sm.webp";

export const SOBRE_URL = "https://www.instagram.com/orienta.financas/";

export const primeirosSeguros = [
  { name: "Calculadora de seguros", href: "/seguros" },
  { name: "Artigos", href: "/seguros/conteudos" },
];

export const primeirosInvestimentos = [
  { name: "Ações", href: "/investimentos/acoes" },
  { name: "FII", href: "/investimentos/fii" },
  { name: "Fundos", href: "/investimentos/fundos" },
  { name: "Renda Fixa", href: "/investimentos/renda-fixa" },
];

export const primeirosPlanejamento = [
  { name: "Calculadora de aposentadoria", href: "/planejamento/calculadoras/aposentadoria" },
  { name: "Controle de Despesas", href: "/planejamento/despesas" },
  { name: "Artigos", href: "/planejamento/conteudos" },
];

export const ferramentasItems = [
  { name: "Controle de Despesas", href: "/planejamento/despesas" },
  { name: "Calculadora de aposentadoria", href: "/planejamento/calculadoras/aposentadoria" },
  { name: "Calculadora de metas", href: "/planejamento/calculadoras/metas" },
  { name: "Calculadora do milhão", href: "/planejamento/calculadoras/milhao" },
  { name: "Comparador de renda fixa", href: "/investimentos/renda-fixa/comparador" },
  { name: "Posso comprar este imóvel?", href: "/imoveis/calculadoras/posso-comprar" },
];

export const artigosItems = [
  { name: "A Venda Casada de Seguros", href: "/seguros/conteudos?post=a-venda-casada-de-seguros" },
  {
    name: "O que a Previdência Social tem a ver com o meu café com leite?",
    href: "/planejamento/conteudos?post=previdencia-social-e-o-cafe-com-leite",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [primeirosOpen, setPrimeirosOpen] = useState(false);
  const [ferramentasOpen, setFerramentasOpen] = useState(false);
  const [artigosOpen, setArtigosOpen] = useState(false);
  const [mobilePrimeirosOpen, setMobilePrimeirosOpen] = useState(false);
  const [mobileFerramentasOpen, setMobileFerramentasOpen] = useState(false);
  const [mobileArtigosOpen, setMobileArtigosOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const primeirosRef = useRef<HTMLDivElement>(null);
  const ferramentasRef = useRef<HTMLDivElement>(null);
  const artigosRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return;
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      if (currentScrollY < 10) {
        setHeaderVisible(true);
      } else if (delta > 5) {
        setHeaderVisible(false);
        setPrimeirosOpen(false);
        setFerramentasOpen(false);
        setArtigosOpen(false);
      } else if (delta < -5) {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      setHeaderVisible(true);
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (primeirosRef.current && !primeirosRef.current.contains(e.target as Node)) {
        setPrimeirosOpen(false);
      }
      if (ferramentasRef.current && !ferramentasRef.current.contains(e.target as Node)) {
        setFerramentasOpen(false);
      }
      if (artigosRef.current && !artigosRef.current.contains(e.target as Node)) {
        setArtigosOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPrimeirosActive =
    location.pathname.startsWith("/seguros") ||
    location.pathname.startsWith("/investimentos") ||
    location.pathname === "/planejamento/calculadoras/aposentadoria";
  const isFerramentasActive =
    location.pathname.startsWith("/planejamento") ||
    location.pathname === "/investimentos/renda-fixa/comparador" ||
    location.pathname.startsWith("/imoveis");
  const isArtigosActive =
    location.pathname.startsWith("/seguros/conteudos") ||
    location.pathname.startsWith("/planejamento/conteudos");

  const closeMobile = () => setMobileMenuOpen(false);

  const closeAllDesktopDropdowns = () => {
    setPrimeirosOpen(false);
    setFerramentasOpen(false);
    setArtigosOpen(false);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-white border-b border-border relative transition-transform duration-300",
      !headerVisible && "-translate-y-full"
    )}>
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="hidden md:block h-14" />
          <img src="/favicon.png" alt="Logo" className="md:hidden h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 h-full">

          {/* Seus Primeiros — destaque */}
          <div ref={primeirosRef} className="relative flex items-center h-full">
            <button
              onClick={() => { setPrimeirosOpen(!primeirosOpen); setFerramentasOpen(false); setArtigosOpen(false); }}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm shrink-0 whitespace-nowrap",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                primeirosOpen && "ring-2 ring-primary/40",
                isPrimeirosActive && !primeirosOpen && "ring-2 ring-primary/20"
              )}
            >
              <Star className="h-3.5 w-3.5 shrink-0" />
              Seus Primeiros
              <ChevronDown className={cn("h-3 w-3 transition-transform", primeirosOpen && "rotate-180")} />
            </button>

            {primeirosOpen && (
              <div className="absolute left-0 top-full mt-3 w-72 border bg-white shadow-lg z-40 rounded-xl overflow-hidden">
                <div className="py-3">
                  <div>
                    <p className="flex items-center gap-1.5 px-4 pt-1 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      Imóveis
                    </p>
                    <span className="block px-4 pb-2 pl-8 text-sm text-muted-foreground/60 italic">Em breve</span>
                  </div>

                  <div className="mt-1 border-t pt-2">
                    <p className="flex items-center gap-1.5 px-4 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Shield className="h-3.5 w-3.5" />
                      Seguros
                    </p>
                    {primeirosSeguros.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeAllDesktopDropdowns}
                        className={cn(
                          "block px-4 py-1.5 pl-8 text-sm transition-colors hover:text-primary hover:bg-muted/50",
                          location.pathname === item.href
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-1 border-t pt-2">
                    <p className="flex items-center gap-1.5 px-4 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Investimentos
                    </p>
                    {primeirosInvestimentos.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeAllDesktopDropdowns}
                        className={cn(
                          "block px-4 py-1.5 pl-8 text-sm transition-colors hover:text-primary hover:bg-muted/50",
                          location.pathname === item.href
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-1 border-t pt-2">
                    <p className="flex items-center gap-1.5 px-4 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Calculator className="h-3.5 w-3.5" />
                      Planejamentos
                    </p>
                    {primeirosPlanejamento.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeAllDesktopDropdowns}
                        className={cn(
                          "block px-4 py-1.5 pl-8 text-sm transition-colors hover:text-primary hover:bg-muted/50",
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
            )}
          </div>

          {/* Ferramentas */}
          <div ref={ferramentasRef} className="relative flex items-center h-full">
            <button
              onClick={() => { setFerramentasOpen(!ferramentasOpen); setPrimeirosOpen(false); setArtigosOpen(false); }}
              className={cn(
                "flex items-center gap-2 px-5 h-20 text-sm font-medium transition-colors border-b-2",
                isFerramentasActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Ferramentas
              <ChevronDown className={cn("h-3 w-3 transition-transform", ferramentasOpen && "rotate-180")} />
            </button>

            {ferramentasOpen && (
              <div className="absolute left-0 top-full mt-3 w-72 border bg-white shadow-lg z-40 rounded-xl overflow-hidden">
                <div className="py-3">
                  {ferramentasItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={closeAllDesktopDropdowns}
                      className={cn(
                        "block px-4 py-1.5 text-sm transition-colors hover:text-primary hover:bg-muted/50",
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
            )}
          </div>

          {/* Artigos */}
          <div ref={artigosRef} className="relative flex items-center h-full">
            <button
              onClick={() => { setArtigosOpen(!artigosOpen); setPrimeirosOpen(false); setFerramentasOpen(false); }}
              className={cn(
                "flex items-center gap-2 px-5 h-20 text-sm font-medium transition-colors border-b-2",
                isArtigosActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Artigos
              <ChevronDown className={cn("h-3 w-3 transition-transform", artigosOpen && "rotate-180")} />
            </button>

            {artigosOpen && (
              <div className="absolute left-0 top-full mt-3 w-72 border bg-white shadow-lg z-40 rounded-xl overflow-hidden">
                <div className="py-3">
                  {artigosItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={closeAllDesktopDropdowns}
                      className="block px-4 py-1.5 text-sm transition-colors hover:text-primary hover:bg-muted/50 text-muted-foreground"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sobre */}
          <a
            href={SOBRE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 h-20 text-sm font-medium transition-colors border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            Sobre
          </a>

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
        <nav className="md:hidden border-t border-border bg-card p-4 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-2">

            {/* Mobile Seus Primeiros — destaque */}
            <button
              onClick={() => setMobilePrimeirosOpen(!mobilePrimeirosOpen)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-colors w-full shadow-sm",
                "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Star className="h-5 w-5" />
              Seus Primeiros
              <ChevronDown className={cn("h-3 w-3 ml-auto transition-transform", mobilePrimeirosOpen && "rotate-180")} />
            </button>
            {mobilePrimeirosOpen && (
              <div className="ml-8 flex flex-col gap-1">
                <p className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
                  <Building2 className="h-3 w-3" />
                  Imóveis
                </p>
                <span className="px-4 py-1 text-sm text-muted-foreground/60 italic">Em breve</span>

                <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
                  <Shield className="h-3 w-3" />
                  Seguros
                </p>
                {primeirosSeguros.map((item) => (
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

                <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3" />
                  Investimentos
                </p>
                {primeirosInvestimentos.map((item) => (
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

                <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
                  <Calculator className="h-3 w-3" />
                  Planejamentos
                </p>
                {primeirosPlanejamento.map((item) => (
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

            {/* Mobile Ferramentas */}
            <button
              onClick={() => setMobileFerramentasOpen(!mobileFerramentasOpen)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full",
                isFerramentasActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Wrench className="h-5 w-5" />
              Ferramentas
              <ChevronDown className={cn("h-3 w-3 ml-auto transition-transform", mobileFerramentasOpen && "rotate-180")} />
            </button>
            {mobileFerramentasOpen && (
              <div className="ml-8 flex flex-col gap-1">
                {ferramentasItems.map((item) => (
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

            {/* Mobile Artigos */}
            <button
              onClick={() => setMobileArtigosOpen(!mobileArtigosOpen)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full",
                isArtigosActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <FileText className="h-5 w-5" />
              Artigos
              <ChevronDown className={cn("h-3 w-3 ml-auto transition-transform", mobileArtigosOpen && "rotate-180")} />
            </button>
            {mobileArtigosOpen && (
              <div className="ml-8 flex flex-col gap-1">
                {artigosItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMobile}
                    className="px-4 py-2.5 rounded-lg text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Sobre */}
            <a
              href={SOBRE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Instagram className="h-5 w-5" />
              Sobre
            </a>

          </div>
        </nav>
      )}
    </header>
  );
}
