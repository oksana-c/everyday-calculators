import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/calculators";
import { getCalculatorsByCategory } from "@/data/calculators";

interface CategorySectionProps {
  category: Category;
}

const tagColors = {
  blue: "bg-carbon-tag-bg-blue text-carbon-tag-text-blue",
  green: "bg-carbon-tag-bg-green text-carbon-tag-text-green",
  warm: "bg-carbon-tag-bg-warm text-carbon-tag-text-warm",
  purple: "bg-carbon-tag-bg-purple text-carbon-tag-text-purple",
};

const CategoryTag = ({ category }: { category: Category }) => (
  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${tagColors[category.tagColor]}`}>
    {category.name}
  </span>
);

export { CategoryTag };
export default CategoryTag;
