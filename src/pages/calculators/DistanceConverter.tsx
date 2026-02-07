import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";

interface Unit {
  name: string;
  category: string;
  toMeters: number;
}

const units: Unit[] = [
  { name: "Millimeters (mm)", category: "Metric", toMeters: 0.001 },
  { name: "Centimeters (cm)", category: "Metric", toMeters: 0.01 },
  { name: "Meters (m)", category: "Metric", toMeters: 1 },
  { name: "Kilometers (km)", category: "Metric", toMeters: 1000 },
  { name: "Inches (in)", category: "Imperial", toMeters: 0.0254 },
  { name: "Feet (ft)", category: "Imperial", toMeters: 0.3048 },
  { name: "Yards (yd)", category: "Imperial", toMeters: 0.9144 },
  { name: "Miles (mi)", category: "Imperial", toMeters: 1609.344 },
  { name: "Nautical Miles (nmi)", category: "Other", toMeters: 1852 },
];

const DistanceConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState(units[4].name); // Inches
  const [toUnit, setToUnit] = useState(units[1].name); // cm

  const convert = (): string | null => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return null;

    const from = units.find((u) => u.name === fromUnit);
    const to = units.find((u) => u.name === toUnit);
    if (!from || !to) return null;

    const meters = val * from.toMeters;
    const result = meters / to.toMeters;

    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const result = convert();

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
      title="Distance Converter"
      description="Convert between metric and imperial distance units — millimeters, centimeters, meters, kilometers, inches, feet, yards and miles."
      categoryName="Utility"
      categoryPath="/"
    >
      <div className="max-w-xl">
        <div className="space-y-4 mb-6">
          <div>
            <label className="carbon-label-01 block mb-1.5">Amount</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 10"
              className="w-full h-10 px-4 bg-card border-b-2 border-border text-sm text-foreground placeholder:text-carbon-text-placeholder focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="carbon-label-01 block mb-1.5">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-10 px-4 bg-card border-b-2 border-border text-sm text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
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

          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="px-4 py-2 text-sm text-primary hover:bg-accent transition-colors"
            >
              ↕ Swap units
            </button>
          </div>

          <div>
            <label className="carbon-label-01 block mb-1.5">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full h-10 px-4 bg-card border-b-2 border-border text-sm text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
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
            <span className="text-3xl font-light text-foreground font-mono">
              {result ?? "—"}
            </span>
            {result && (
              <span className="text-sm text-muted-foreground">
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
            <RefRow left="1 inch" right="2.54 cm" />
            <RefRow left="1 foot" right="30.48 cm" />
            <RefRow left="1 yard" right="0.9144 m" />
            <RefRow left="1 mile" right="1.609 km" />
            <RefRow left="1 km" right="0.6214 mi" />
            <RefRow left="1 m" right="3.281 ft" />
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

export default DistanceConverter;
