
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCategoryCounts } from "@/hooks/useCategoryCounts";

const categories = [
  {
    name: "Design",
    description: "AI tools for creative design and visual content",
    icon: "🎨"
  },
  {
    name: "Development",
    description: "Code generation, debugging, and development assistance",
    icon: "💻"
  },
  {
    name: "Writing",
    description: "Content creation, copywriting, and text enhancement",
    icon: "✍️"
  },
  {
    name: "Marketing",
    description: "Campaign creation, analytics, and growth tools",
    icon: "📈"
  },
  {
    name: "Education",
    description: "Learning tools, course creation, and knowledge sharing",
    icon: "📚"
  },
  {
    name: "Productivity",
    description: "Task automation, scheduling, and efficiency tools",
    icon: "⚡"
  },
  {
    name: "Video & Audio",
    description: "Media creation, editing, and enhancement tools",
    icon: "🎬"
  },
  {
    name: "Data & Analytics",
    description: "Data processing, visualization, and insights",
    icon: "📊"
  }
];

const CategoriesSection = () => {
  const { data: categoryCounts = [], isLoading } = useCategoryCounts();

  const getCategoryCount = (categoryName: string) => {
    const categoryData = categoryCounts.find(cat => cat.category === categoryName);
    return categoryData ? categoryData.count : 0;
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl font-bold mb-6">
            Explore by 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
              Category
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect AI tools organized by profession and use case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const toolCount = getCategoryCount(category.name);
            return (
              <Link
                key={category.name}
                to={`/explore-tools?category=${encodeURIComponent(category.name)}`}
              >
                <Card
                  className="group cursor-pointer glass-effect hover:bg-muted/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-muted/20 h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <span className="text-xs text-blue-400 font-medium">
                      {isLoading ? "Loading..." : `${toolCount} tool${toolCount !== 1 ? 's' : ''}`}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
