
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, LayoutList, Search, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToolsByCategory } from "@/hooks/useTools";

const categories = [
  "All Categories",
  "Design",
  "Writing",
  "Development", 
  "Marketing",
  "Education",
  "Productivity",
  "Video & Audio",
  "Data & Analytics"
];

const ExploreTools = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState("grid");

  // Handle URL parameter for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const { data: tools = [], isLoading, error } = useToolsByCategory(selectedCategory);

  const filteredTools = tools.filter(tool => {
    if (!tool.tool_name && !tool.description) return false;
    
    const matchesSearch = 
      (tool.tool_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    return matchesSearch;
  });

  const handleVisitWebsite = (url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (error) {
    console.error('Error loading tools:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Explore 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
                AI Tools
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the best AI tools curated for professionals across all industries
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex items-center gap-2 border rounded-lg p-1">
                <Toggle
                  pressed={viewMode === "grid"}
                  onPressedChange={() => setViewMode("grid")}
                  size="sm"
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Toggle>
                <Toggle
                  pressed={viewMode === "list"}
                  onPressedChange={() => setViewMode("list")}
                  size="sm"
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  <LayoutList className="h-4 w-4" />
                </Toggle>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {isLoading ? (
                "Loading tools..."
              ) : (
                <>
                  Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
                  {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
                </>
              )}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-3"}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="glass-effect border-muted/20">
                  <CardContent className="p-6">
                    <Skeleton className="h-12 w-12 rounded mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-6 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold mb-2">Error loading tools</h3>
              <p className="text-muted-foreground">
                Please try again later or refresh the page
              </p>
            </div>
          )}

          {/* Tools Grid/List */}
          {!isLoading && !error && (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTools.map((tool) => (
                    <Card
                      key={tool.id}
                      className="group cursor-pointer glass-effect hover:bg-muted/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-muted/20"
                    >
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
                              🔧
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
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTools.map((tool) => (
                    <Card
                      key={tool.id}
                      className="group cursor-pointer glass-effect hover:bg-muted/50 transition-all duration-200 border-muted/20"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="group-hover:scale-110 transition-transform duration-300">
                            {tool.logo_url ? (
                              <img 
                                src={tool.logo_url} 
                                alt={tool.tool_name || 'Tool logo'} 
                                className="w-10 h-10 object-contain rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iNiIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIyMCIgeT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEwIj7wn5SCPC90ZXh0Pgo8L3N2Zz4K';
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xl">
                                🔧
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                              {tool.tool_name || 'Unnamed Tool'}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-1">
                              {tool.description || 'No description available'}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {tool.category && (
                              <span className="text-xs text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded">
                                {tool.category}
                              </span>
                            )}
                            {tool.tool_url && (
                              <Button
                                size="sm"
                                onClick={() => handleVisitWebsite(tool.tool_url)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Visit
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {!isLoading && !error && filteredTools.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No tools found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ExploreTools;
