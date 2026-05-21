import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";

const OZ_PER_LB = 16;
const GRAMS_PER_LB = 453.59237;
const GRAMS_PER_OZ = 28.349523125;

const formatNum = (n: number, decimals = 4) =>
  n.toFixed(decimals).replace(/\.?0+$/, "");

const WeightConverter = () => {
  const [pounds, setPounds] = useState("");

  const val = parseFloat(pounds);
  const hasValue = !isNaN(val);

  const totalLb = hasValue ? val : 0;
  const wholeLb = hasValue ? Math.floor(totalLb) : 0;
  const remainderOz = hasValue ? (totalLb - wholeLb) * OZ_PER_LB : 0;
  // Round ounces to 2 decimals for display; handle rounding up to 16
  let displayOz = Math.round(remainderOz * 100) / 100;
  let displayLb = wholeLb;
  if (displayOz >= 16) {
    displayOz = 0;
    displayLb += 1;
  }

  const totalOz = hasValue ? totalLb * OZ_PER_LB : 0;
  const grams = hasValue ? totalLb * GRAMS_PER_LB : 0;
  const kilograms = grams / 1000;

  return (
    <CalculatorLayout
      title="Weight Converter"
      description="Convert decimal pounds into a readable pounds and ounces value, plus ounces, grams and kilograms."
      categoryName="Utility"
      categoryPath="/"
    >
      <div className="max-w-xl">
        <div className="mb-6">
          <label className="carbon-label-01 block mb-1.5">Pounds (decimal)</label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={pounds}
              onChange={(e) => setPounds(e.target.value)}
              placeholder="e.g. 7.85"
              className="w-full h-12 pl-4 pr-12 bg-card border-b-2 border-border text-base text-foreground placeholder:text-carbon-text-placeholder focus:border-primary focus:outline-none transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-primary font-mono">
              lb
            </span>
          </div>
        </div>

        {/* Primary result: Lb and Oz */}
        <div className="p-6 bg-card border border-border mb-4">
          <span className="carbon-label-01 block mb-2">Pounds and ounces</span>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-light text-foreground font-mono">
              {hasValue ? displayLb : "—"}
            </span>
            <span className="text-base text-muted-foreground">lb</span>
            <span className="text-4xl font-light text-foreground font-mono">
              {hasValue ? displayOz : "—"}
            </span>
            <span className="text-base text-muted-foreground">oz</span>
          </div>
        </div>

        {/* Secondary equivalents */}
        <div className="border border-border">
          <div className="px-4 py-3 bg-secondary border-b border-border">
            <span className="carbon-productive-heading-01">Equivalents</span>
          </div>
          <div className="divide-y divide-border">
            <ResultRow
              label="Total ounces"
              value={hasValue ? formatNum(totalOz, 4) : "—"}
              unit="oz"
            />
            <ResultRow
              label="Grams"
              value={hasValue ? formatNum(grams, 2) : "—"}
              unit="g"
            />
            <ResultRow
              label="Kilograms"
              value={hasValue ? formatNum(kilograms, 4) : "—"}
              unit="kg"
            />
          </div>
        </div>

        {/* Quick reference */}
        <div className="mt-8 border border-border">
          <div className="px-4 py-3 bg-secondary border-b border-border">
            <span className="carbon-productive-heading-01">Quick reference</span>
          </div>
          <div className="divide-y divide-border">
            <RefRow left="1 lb" right="16 oz" />
            <RefRow left="1 lb" right="453.592 g" />
            <RefRow left="1 oz" right="28.3495 g" />
            <RefRow left="1 kg" right="2.2046 lb" />
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

const ResultRow = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) => (
  <div className="flex items-center justify-between px-4 py-3">
    <span className="carbon-body-01 text-muted-foreground">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-foreground font-mono">{value}</span>
      <span className="text-muted-foreground text-sm">{unit}</span>
    </div>
  </div>
);

const RefRow = ({ left, right }: { left: string; right: string }) => (
  <div className="flex items-center justify-between px-4 py-2.5 carbon-body-01">
    <span className="text-foreground font-mono">{left}</span>
    <span className="text-muted-foreground">=</span>
    <span className="text-foreground font-mono">{right}</span>
  </div>
);

export default WeightConverter;
