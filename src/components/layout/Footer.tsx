import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">TE</span>
            <span className="text-xl font-bold text-secondary">din</span>
          </div>
          
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
