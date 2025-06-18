
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const featuredTools = [
  {
    name: "GPT-4",
    category: "Writing",
    description: "Advanced language model for text generation, analysis, and conversation",
    logo: "🤖",
    price: "From $20/month",
    rating: 4.9
  },
  {
    name: "Midjourney",
    category: "Design",
    description: "AI-powered image generation from text descriptions",
    logo: "🎨",
    price: "From $10/month",
    rating: 4.8
  },
  {
    name: "GitHub Copilot",
    category: "Development",
    description: "AI pair programmer that helps you write code faster",
    logo: "👨‍💻",
    price: "From $10/month",
    rating: 4.7
  },
  {
    name: "Jasper",
    category: "Marketing",
    description: "AI content platform for marketing copy and campaigns",
    logo: "📝",
    price: "From $29/month",
    rating: 4.6
  },
  {
    name: "Synthesia",
    category: "Video",
    description: "Create AI videos from text with virtual presenters",
    logo: "🎬",
    price: "From $30/month",
    rating: 4.5
  },
  {
    name: "Notion AI",
    category: "Productivity",
    description: "AI-powered writing assistant integrated into Notion workspace",
    logo: "📋",
    price: "From $8/month",
    rating: 4.4
  }
];

const FeaturedToolsSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl font-bold mb-6">
            Featured 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
              Tools
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Top-rated AI tools trusted by thousands of professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTools.map((tool, index) => (
            <Card
              key={tool.name}
              className="group cursor-pointer glass-effect hover:bg-muted/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-muted/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {tool.logo}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400 text-sm mb-1">
                      ⭐ {tool.rating}
                    </div>
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-400">
                    {tool.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Try Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-muted-foreground/20 text-muted-foreground hover:bg-muted/50 px-8 py-3 rounded-xl transition-all duration-300"
          >
            View All Tools
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToolsSection;
