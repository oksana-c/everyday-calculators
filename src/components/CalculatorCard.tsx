import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CalculatorInfo } from "@/data/calculators";

interface CalculatorCardProps {
  calculator: CalculatorInfo;
}

const CalculatorCard = ({ calculator }: CalculatorCardProps) => {
  const Icon = calculator.icon;

  return (
    <Link
      to={calculator.path}
      className="group block bg-card border border-border hover:shadow-md transition-all duration-150"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-accent">
            <Icon className="h-5 w-5 text-accent-foreground" />
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-150" />
        </div>
        <h3 className="carbon-productive-heading-02 text-card-foreground mb-1">
          {calculator.name}
        </h3>
        <p className="carbon-body-01 text-muted-foreground">
          {calculator.description}
        </p>
      </div>
      <div className="h-[2px] bg-transparent group-hover:bg-primary transition-colors duration-150" />
    </Link>
  );
};

export default CalculatorCard;
