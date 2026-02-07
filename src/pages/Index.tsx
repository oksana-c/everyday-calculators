import { categories, getCalculatorsByCategory } from "@/data/calculators";
import CalculatorCard from "@/components/CalculatorCard";
import { CategoryTag } from "@/components/CategoryTag";

const Index = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <h1 className="carbon-productive-heading-07 text-foreground max-w-xl">
            Everyday Calculators
          </h1>
          <p className="carbon-body-02 text-muted-foreground mt-4 max-w-lg">
            A growing collection of calculators for percentages, cooking conversions, dates, and more.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        {categories.map((category) => {
          const calcs = getCalculatorsByCategory(category.id);
          if (calcs.length === 0) return null;

          const Icon = category.icon;

          return (
            <div key={category.id} className="mb-12 last:mb-0">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-2">
                <Icon className="h-5 w-5 text-carbon-icon-secondary" />
                <h2 className="carbon-productive-heading-03 text-foreground">
                  {category.name}
                </h2>
                <CategoryTag category={category} />
              </div>
              <p className="carbon-body-01 text-muted-foreground mb-5 ml-8">
                {category.description}
              </p>

              {/* Calculator grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {calcs.map((calc) => (
                  <CalculatorCard key={calc.id} calculator={calc} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Index;
