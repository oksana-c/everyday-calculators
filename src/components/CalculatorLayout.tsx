import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  categoryName: string;
  categoryPath: string;
  children: React.ReactNode;
}

const CalculatorLayout = ({
  title,
  description,
  categoryName,
  categoryPath,
  children,
}: CalculatorLayoutProps) => {
  return (
    <div className="animate-fade-in">
      {/* Breadcrumb bar */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-base">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              {categoryName}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-base text-primary hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all calculators
          </Link>
          <h1 className="carbon-productive-heading-05 text-foreground">{title}</h1>
        </div>
      </div>

      {/* Calculator Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default CalculatorLayout;
