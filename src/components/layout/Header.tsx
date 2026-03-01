import { Link, useLocation } from "react-router-dom";
import { Info, Menu, X, ChevronDown, LucideIcon } from "lucide-react";
import { useState, useRef, useEffect, ElementType } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import tedinLogo from "@/assets/tedin-logo-new.png";
import iconDespesas from "@/assets/icon-despesas.png";
import iconLeao from "@/assets/icon-leao.png";
import iconConsultoria from "@/assets/icon-consultoria.png";
import iconFerramentas from "@/assets/icon-ferramentas.png";

const ferramentasItems = [
  { name: "Minha aposentadoria", href: "/ferramentas/aposentadoria" },
  { name: "Metas de investimento", href: "/ferramentas/metas" },
  { name: "Cálculo de financiamento", href: "/ferramentas/financiamento" },
  { name: "Comparador de investimentos", href: "/ferramentas/investimentos" },
  { name: "Indicadores fundamentalistas", href: "/ferramentas/indicadores" },
];

const mainNavItems = [
  { name: "Despesas", href: "/despesas", icon: iconDespesas, isImage: true },
  { name: "IR - Imposto", href: "/imposto", icon: iconLeao, isImage: true },
  { name: "Consultoria", href: "/consultoria", icon: iconConsultoria, isImage: true },
];

const sobreItem = { name: "Sobre", href: "/sobre", icon: Info, isImage: false };

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ferramentasOpen, setFerramentasOpen] = useState(false);
  const [mobileFerramentasOpen, setMobileFerramentasOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFerramentasOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFerramentasActive = location.pathname.startsWith("/ferramentas");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={tedinLogo} alt="TEdin" className="h-14" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.isImage ? (
                <img src={item.icon as string} alt={item.name} className="h-5 w-5 object-contain" />
              ) : (
                (() => {
                  const Icon = item.icon as ElementType;
                  return <Icon className="h-4 w-4" />;
                })()
              )}
              {item.name}
            </Link>
          ))}

          {/* Ferramentas Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setFerramentasOpen(!ferramentasOpen)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isFerramentasActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <img src={iconFerramentas} alt="Ferramentas" className="h-5 w-5 object-contain" />
              Ferramentas
              <ChevronDown className={cn("h-3 w-3 transition-transform", ferramentasOpen && "rotate-180")} />
            </button>

            {ferramentasOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
                {ferramentasItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setFerramentasOpen(false)}
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

          {/* Sobre Link */}
          {(() => {
            const Icon = sobreItem.icon as ElementType;
            return (
              <Link
                to={sobreItem.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === sobreItem.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {sobreItem.name}
              </Link>
            );
          })()}
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
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.isImage ? (
                  <img src={item.icon as string} alt={item.name} className="h-6 w-6 object-contain" />
                ) : (
                  (() => {
                    const Icon = item.icon as ElementType;
                    return <Icon className="h-5 w-5" />;
                  })()
                )}
                {item.name}
              </Link>
            ))}

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
              <img src={iconFerramentas} alt="Ferramentas" className="h-6 w-6 object-contain" />
              Ferramentas
              <ChevronDown className={cn("h-3 w-3 ml-auto transition-transform", mobileFerramentasOpen && "rotate-180")} />
            </button>

            {mobileFerramentasOpen && (
              <div className="ml-8 flex flex-col gap-1">
                {ferramentasItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => { setMobileMenuOpen(false); setMobileFerramentasOpen(false); }}
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

            {/* Mobile Sobre */}
            {(() => {
              const Icon = sobreItem.icon as ElementType;
              return (
                <Link
                  to={sobreItem.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === sobreItem.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {sobreItem.name}
                </Link>
              );
            })()}
          </div>
        </nav>
      )}
    </header>
  );
}
