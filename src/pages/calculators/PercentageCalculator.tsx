import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";

type Mode = "whatIsPercent" | "percentOf" | "percentChange";

const PercentageCalculator = () => {
  const [mode, setMode] = useState<Mode>("whatIsPercent");

  // What is X% of Y?
  const [percentValue, setPercentValue] = useState("");
  const [ofValue, setOfValue] = useState("");

  // X is what % of Y?
  const [isValue, setIsValue] = useState("");
  const [whatOfValue, setWhatOfValue] = useState("");

  // Percent change from X to Y
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const modes: { key: Mode; label: string }[] = [
    { key: "whatIsPercent", label: "X% of Y" },
    { key: "percentOf", label: "X is what % of Y" },
    { key: "percentChange", label: "% Change" },
  ];

  const calculateResult = (): string | null => {
    switch (mode) {
      case "whatIsPercent": {
        const p = parseFloat(percentValue);
        const v = parseFloat(ofValue);
        if (isNaN(p) || isNaN(v)) return null;
        return (p / 100 * v).toFixed(4).replace(/\.?0+$/, "");
      }
      case "percentOf": {
        const x = parseFloat(isValue);
        const y = parseFloat(whatOfValue);
        if (isNaN(x) || isNaN(y) || y === 0) return null;
        return (x / y * 100).toFixed(4).replace(/\.?0+$/, "") + "%";
      }
      case "percentChange": {
        const f = parseFloat(fromValue);
        const t = parseFloat(toValue);
        if (isNaN(f) || isNaN(t) || f === 0) return null;
        const change = ((t - f) / Math.abs(f)) * 100;
        const sign = change >= 0 ? "+" : "";
        return sign + change.toFixed(4).replace(/\.?0+$/, "") + "%";
      }
    }
  };

  const result = calculateResult();

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages, find what percent one number is of another, or determine the percentage change between two values."
      categoryName="Utility"
      categoryPath="/"
    >
      <div className="max-w-xl">
        {/* Mode tabs */}
        <div className="flex border-b border-border mb-8">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                mode === m.key
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Input fields */}
        {mode === "whatIsPercent" && (
          <div className="space-y-4">
            <p className="carbon-body-02 text-foreground mb-4">
              What is <strong>{percentValue || "X"}</strong>% of <strong>{ofValue || "Y"}</strong>?
            </p>
            <InputField
              label="Percentage (%)"
              value={percentValue}
              onChange={setPercentValue}
              placeholder="e.g. 25"
            />
            <InputField
              label="Of number"
              value={ofValue}
              onChange={setOfValue}
              placeholder="e.g. 200"
            />
          </div>
        )}

        {mode === "percentOf" && (
          <div className="space-y-4">
            <p className="carbon-body-02 text-foreground mb-4">
              <strong>{isValue || "X"}</strong> is what % of <strong>{whatOfValue || "Y"}</strong>?
            </p>
            <InputField
              label="Value (X)"
              value={isValue}
              onChange={setIsValue}
              placeholder="e.g. 50"
            />
            <InputField
              label="Total (Y)"
              value={whatOfValue}
              onChange={setWhatOfValue}
              placeholder="e.g. 200"
            />
          </div>
        )}

        {mode === "percentChange" && (
          <div className="space-y-4">
            <p className="carbon-body-02 text-foreground mb-4">
              Percentage change from <strong>{fromValue || "X"}</strong> to <strong>{toValue || "Y"}</strong>
            </p>
            <InputField
              label="From"
              value={fromValue}
              onChange={setFromValue}
              placeholder="e.g. 100"
            />
            <InputField
              label="To"
              value={toValue}
              onChange={setToValue}
              placeholder="e.g. 150"
            />
          </div>
        )}

        {/* Result */}
        <div className="mt-8 p-6 bg-card border border-border">
          <span className="carbon-label-01 block mb-2">Result</span>
          <span className="text-3xl font-light text-foreground font-mono">
            {result ?? "—"}
          </span>
        </div>
      </div>
    </CalculatorLayout>
  );
};

// Reusable Carbon-style input
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) => (
  <div>
    <label className="carbon-label-01 block mb-1.5">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-10 px-4 bg-card border-b-2 border-border text-sm text-foreground placeholder:text-carbon-text-placeholder focus:border-primary focus:outline-none transition-colors"
    />
  </div>
);

export default PercentageCalculator;
