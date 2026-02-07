import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";

interface Unit {
  name: string;
  category: string;
  toMl: number; // convert to ml as base
}

const units: Unit[] = [
  { name: "Milliliters (ml)", category: "Metric", toMl: 1 },
  { name: "Liters (L)", category: "Metric", toMl: 1000 },
  { name: "Teaspoons (tsp)", category: "US", toMl: 4.92892 },
  { name: "Tablespoons (tbsp)", category: "US", toMl: 14.7868 },
  { name: "Fluid Ounces (fl oz)", category: "US", toMl: 29.5735 },
  { name: "Cups (cup)", category: "US", toMl: 236.588 },
  { name: "Pints (pt)", category: "US", toMl: 473.176 },
  { name: "Quarts (qt)", category: "US", toMl: 946.353 },
  { name: "Gallons (gal)", category: "US", toMl: 3785.41 },
];

const CookingUnitConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState(units[5].name); // Cups
  const [toUnit, setToUnit] = useState(units[0].name); // ml

  const convert = (): string | null => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return null;

    const from = units.find((u) => u.name === fromUnit);
    const to = units.find((u) => u.name === toUnit);
    if (!from || !to) return null;

    const mlValue = val * from.toMl;
    const result = mlValue / to.toMl;

    return result.toFixed(4).replace(/\.?0+$/, "");
  };

  const result = convert();

  // Group units by category
  const grouped = units.reduce((acc, unit) => {
    if (!acc[unit.category]) acc[unit.category] = [];
    acc[unit.category].push(unit);
    return acc;
  }, {} as Record<string, Unit[]>);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <CalculatorLayout
      title="Cooking Unit Converter"
      description="Convert between common cooking measurements — cups, tablespoons, teaspoons, milliliters, liters and more."
      categoryName="Cooking"
      categoryPath="/"
    >
      <div className="max-w-xl">
        <div className="space-y-4 mb-6">
          {/* Amount */}
          <div>
            <label className="carbon-label-01 block mb-1.5">Amount</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 2"
              className="w-full h-12 px-4 bg-card border-b-2 border-border text-base text-foreground placeholder:text-carbon-text-placeholder focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* From unit */}
          <div>
            <label className="carbon-label-01 block mb-1.5">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-12 px-4 bg-card border-b-2 border-border text-base text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {Object.entries(grouped).map(([category, categoryUnits]) => (
                <optgroup key={category} label={category}>
                  {categoryUnits.map((u) => (
                    <option key={u.name} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Swap */}
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="px-4 py-2 text-base text-primary hover:bg-accent transition-colors"
            >
              ↕ Swap units
            </button>
          </div>

          {/* To unit */}
          <div>
            <label className="carbon-label-01 block mb-1.5">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full h-12 px-4 bg-card border-b-2 border-border text-base text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {Object.entries(grouped).map(([category, categoryUnits]) => (
                <optgroup key={category} label={category}>
                  {categoryUnits.map((u) => (
                    <option key={u.name} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="p-6 bg-card border border-border">
          <span className="carbon-label-01 block mb-2">Result</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-light text-foreground font-mono">
              {result ?? "—"}
            </span>
            {result && (
              <span className="text-base text-muted-foreground">
                {toUnit.replace(/\(.*\)/, "").trim().toLowerCase()}
              </span>
            )}
          </div>
        </div>

        {/* Quick reference */}
        <div className="mt-8 border border-border">
          <div className="px-4 py-3 bg-secondary border-b border-border">
            <span className="carbon-productive-heading-01">Quick reference</span>
          </div>
          <div className="divide-y divide-border">
            <RefRow left="1 cup" right="236.6 ml" />
            <RefRow left="1 tbsp" right="14.8 ml" />
            <RefRow left="1 tsp" right="4.9 ml" />
            <RefRow left="1 fl oz" right="29.6 ml" />
            <RefRow left="1 cup" right="16 tbsp" />
            <RefRow left="1 tbsp" right="3 tsp" />
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

const RefRow = ({ left, right }: { left: string; right: string }) => (
  <div className="flex items-center justify-between px-4 py-2.5 carbon-body-01">
    <span className="text-foreground font-mono">{left}</span>
    <span className="text-muted-foreground">=</span>
    <span className="text-foreground font-mono">{right}</span>
  </div>
);

export default CookingUnitConverter;
