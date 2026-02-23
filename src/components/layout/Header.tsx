import { Link, useLocation } from "react-router-dom";
import { Info, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import tedinLogo from "@/assets/tedin-logo-new.png";
import iconDespesas from "@/assets/icon-despesas.png";
import iconLeao from "@/assets/icon-leao.png";
import iconConsultoria from "@/assets/icon-consultoria.png";
import iconFerramentas from "@/assets/icon-ferramentas.png";

const navItems = [
  { name: "Despesas", href: "/despesas", icon: iconDespesas, isImage: true },
  { name: "IR - Imposto", href: "/imposto", icon: iconLeao, isImage: true },
  { name: "Consultoria", href: "/consultoria", icon: iconConsultoria, isImage: true },
  { name: "Ferramentas", href: "/ferramentas", icon: iconFerramentas, isImage: true },
  { name: "Sobre", href: "/sobre", icon: Info, isImage: false },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={tedinLogo} alt="TEdin" className="h-14" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
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
                <item.icon className="h-4 w-4" />
              )}
              {item.name}
            </Link>
          ))}
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
            {navItems.map((item) => (
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
                  <item.icon className="h-5 w-5" />
                )}
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
