
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import { useTools } from "@/hooks/useTools";
import { Link } from "react-router-dom";

const FeaturedToolsSection = () => {
  const { data: tools = [], isLoading, error } = useTools();

  // Get first 6 tools as featured tools (you can modify this logic later)
  const featuredTools = tools.slice(0, 6);

  const handleVisitWebsite = (url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (error) {
    console.error('Error loading featured tools:', error);
  }

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

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="glass-effect border-muted/20">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <Skeleton className="h-12 w-12 rounded" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-20 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Error loading featured tools</h3>
            <p className="text-muted-foreground">
              Please try again later or refresh the page
            </p>
          </div>
        )}

        {/* Featured Tools Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => (
              <Card
                key={tool.id}
                className="group cursor-pointer glass-effect hover:bg-muted/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-muted/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="group-hover:scale-110 transition-transform duration-300">
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
                          🔧
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {tool.category && (
                        <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                    {tool.tool_name || 'Unnamed Tool'}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {tool.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-400">
                      Free to Premium
                    </span>
                    {tool.tool_url ? (
                      <Button
                        size="sm"
                        onClick={() => handleVisitWebsite(tool.tool_url)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Try Now
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        disabled
                        className="bg-muted text-muted-foreground cursor-not-allowed"
                      >
                        No Link
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/explore-tools">
            <Button
              variant="outline"
              size="lg"
              className="border-muted-foreground/20 text-muted-foreground hover:bg-muted/50 px-8 py-3 rounded-xl transition-all duration-300"
            >
              View All Tools
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToolsSection;
