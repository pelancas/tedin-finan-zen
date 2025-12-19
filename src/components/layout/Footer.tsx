import { Link } from "react-router-dom";
import tedinLogo from "@/assets/tedin-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src={tedinLogo} alt="TEdin" className="h-12" />
          </Link>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} TEdin. Simplificando suas finanças.
          </p>
          
          <nav className="flex gap-4">
            <Link to="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Início
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
