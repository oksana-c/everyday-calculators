import { Calculator, ChefHat, Clock, Percent, Ruler, Heart, DollarSign, MoveHorizontal, LucideIcon } from "lucide-react";

export interface CalculatorInfo {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: LucideIcon;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tagColor: "blue" | "green" | "warm" | "purple";
}

export const categories: Category[] = [
  {
    id: "utility",
    name: "Utility",
    description: "Essential everyday calculators for common math operations.",
    icon: Calculator,
    tagColor: "blue",
  },
  {
    id: "cooking",
    name: "Cooking",
    description: "Kitchen helpers for recipes, conversions and meal planning.",
    icon: ChefHat,
    tagColor: "green",
  },
  {
    id: "date-time",
    name: "Date & Time",
    description: "Calculate dates, durations, age and time differences.",
    icon: Clock,
    tagColor: "warm",
  },
];

export const calculators: CalculatorInfo[] = [
  {
    id: "percentage",
    name: "Percentage Calculator",
    description: "Calculate percentages, percentage change, and percentage of a number.",
    path: "/calculators/utility/percentage",
    icon: Percent,
    category: "utility",
  },
  {
    id: "distance-converter",
    name: "Distance Converter",
    description: "Convert between metric and imperial distance units like miles, kilometers, feet and more.",
    path: "/calculators/utility/distance-converter",
    icon: MoveHorizontal,
    category: "utility",
  },
  {
    id: "cooking-converter",
    name: "Unit Converter",
    description: "Convert between cups, tablespoons, teaspoons, ml, grams and more.",
    path: "/calculators/cooking/unit-converter",
    icon: Ruler,
    category: "cooking",
  },
  {
    id: "age",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, days from your date of birth.",
    path: "/calculators/date-time/age",
    icon: Heart,
    category: "date-time",
  },
];

export function getCalculatorsByCategory(categoryId: string): CalculatorInfo[] {
  return calculators.filter((c) => c.category === categoryId);
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}
