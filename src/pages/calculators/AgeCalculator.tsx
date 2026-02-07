import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const calculateAge = () => {
    if (!birthDate || !targetDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth >= target) return null;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days
    const diffTime = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return { years, months, days, totalDays, totalWeeks, totalMonths };
  };

  const result = calculateAge();

  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months and days. Also shows total days, weeks and months lived."
      categoryName="Date & Time"
      categoryPath="/"
    >
      <div className="max-w-xl">
        <div className="space-y-4 mb-8">
          <div>
            <label className="carbon-label-01 block mb-1.5">Date of birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full h-12 px-4 bg-card border-b-2 border-border text-base text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="carbon-label-01 block mb-1.5">Calculate age on</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full h-12 px-4 bg-card border-b-2 border-border text-base text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Primary result */}
        <div className="p-6 bg-card border border-border mb-6">
          <span className="carbon-label-01 block mb-2">Your age</span>
          {result ? (
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-4xl font-light text-foreground font-mono">
                {result.years}
              </span>
              <span className="text-base text-muted-foreground mr-3">years</span>
              <span className="text-4xl font-light text-foreground font-mono">
                {result.months}
              </span>
              <span className="text-base text-muted-foreground mr-3">months</span>
              <span className="text-4xl font-light text-foreground font-mono">
                {result.days}
              </span>
              <span className="text-base text-muted-foreground">days</span>
            </div>
          ) : (
            <span className="text-4xl font-light text-foreground font-mono">—</span>
          )}
        </div>

        {/* Detailed breakdown */}
        {result && (
          <div className="grid grid-cols-3 gap-px bg-border">
            <StatCard label="Total days" value={result.totalDays.toLocaleString()} />
            <StatCard label="Total weeks" value={result.totalWeeks.toLocaleString()} />
            <StatCard label="Total months" value={result.totalMonths.toLocaleString()} />
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-card p-4">
    <span className="carbon-label-01 block mb-1">{label}</span>
    <span className="text-2xl font-light text-foreground font-mono">{value}</span>
  </div>
);

export default AgeCalculator;
