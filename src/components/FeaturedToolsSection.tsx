import { useTools } from "@/hooks/useTools";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturedToolsSection = () => {
  const { data: tools = [], isLoading } = useTools();

  // Take first 6 tools as featured for now
  const featuredTools = tools.slice(0, 6);

  const handleVisitWebsite = (url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="featured" className="py-24 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">
            Featured 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
              AI Tools
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore some of the best AI tools our community loves
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton loaders
            [...Array(6)].map((_, i) => (
              <Card key={i} className="glass-effect border-muted/20">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-12 w-12 bg-muted rounded mb-4"></div>
                    <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
                    <div className="h-4 w-full bg-muted rounded mb-3"></div>
                    <div className="h-6 w-20 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Actual tools
            featuredTools.map((tool) => (
              <Card key={tool.id} className="group cursor-pointer glass-effect hover:bg-muted/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-muted/20">
                <CardContent className="p-6">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tool.logo_url ? (
                      <img 
                        src={tool.logo_url} 
                        alt={tool.tool_name || 'Tool logo'} 
                        className="w-12 h-12 object-contain rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIyNCIgeT0iMjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEyIj7wn5SCPC90ZXh0Pgo8L3N2Zz4K';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-2xl">
                        🧰
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {tool.tool_name || 'Unnamed Tool'}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {tool.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    {tool.category && (
                      <span className="text-xs text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                    )}
                    {tool.tool_url && (
                      <Button
                        size="sm"
                        onClick={() => handleVisitWebsite(tool.tool_url)}
                        className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedToolsSection;
