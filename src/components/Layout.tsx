import { Link, useLocation } from "react-router-dom";
import { Calculator } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Carbon-style Header */}
      <header className="border-b border-border bg-foreground">
        <div className="max-w-7xl mx-auto flex items-center h-12 px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground">
            <Calculator className="h-5 w-5" />
            <span className="text-base font-semibold tracking-tight">
              Calculators for Life
            </span>
          </Link>
          <nav className="ml-8 flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 h-12 flex items-center text-base transition-colors border-b-2 ${
                isHome
                  ? "border-primary text-primary-foreground"
                  : "border-transparent text-muted-foreground hover:text-primary-foreground"
              }`}
            >
              All Calculators
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <p className="carbon-label-01">
            © {new Date().getFullYear()} Calculators for Life. Built for everyday use.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
