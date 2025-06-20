import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  "All Categories",
  "Design",
  "Writing",
  "Development", 
  "Marketing",
  "Education",
  "Productivity",
  "Video & Audio"
];

const aiTools = [
  {
    id: 1,
    name: "Midjourney",
    category: "Design",
    logo: "🎨",
    description: "AI-powered image generation for creative professionals and artists"
  },
  {
    id: 2,
    name: "ChatGPT",
    category: "Writing",
    logo: "✍️",
    description: "Advanced AI writing assistant for content creation and communication"
  },
  {
    id: 3,
    name: "GitHub Copilot",
    category: "Development",
    logo: "💻",
    description: "AI pair programmer that helps you write better code faster"
  },
  {
    id: 4,
    name: "Jasper",
    category: "Marketing",
    logo: "📈",
    description: "AI copywriting tool for marketing campaigns and content strategy"
  },
  {
    id: 5,
    name: "Teachable Machine",
    category: "Education",
    logo: "📚",
    description: "Easy-to-use tool for training machine learning models"
  },
  {
    id: 6,
    name: "Notion AI",
    category: "Productivity",
    logo: "⚡",
    description: "AI-powered workspace for notes, docs, and project management"
  },
  {
    id: 7,
    name: "RunwayML",
    category: "Video & Audio",
    logo: "🎬",
    description: "AI video editing and generation platform for creators"
  },
  {
    id: 8,
    name: "Figma AI",
    category: "Design",
    logo: "🎨",
    description: "AI-enhanced design tool for collaborative interface design"
  },
  {
    id: 9,
    name: "Grammarly",
    category: "Writing",
    logo: "✍️",
    description: "AI writing assistant for grammar, spelling, and style improvements"
  },
  {
    id: 10,
    name: "Cursor",
    category: "Development",
    logo: "💻",
    description: "AI-first code editor built for productivity and collaboration"
  },
  {
    id: 11,
    name: "Copy.ai",
    category: "Marketing",
    logo: "📈",
    description: "AI-powered copywriting platform for marketing teams"
  },
  {
    id: 12,
    name: "Zapier",
    category: "Productivity",
    logo: "⚡",
    description: "Automation platform connecting your favorite apps and services"
  }
];

const ExploreTools = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  // Handle URL parameter for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
              {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Tools Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="group cursor-pointer glass-effect hover:bg-muted/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-muted/20"
                >
                  <CardContent className="p-6">
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {tool.logo}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {tool.description}
                    </p>
                    <span className="text-xs text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded">
                      {tool.category}
                    </span>
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
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {tool.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      <span className="text-xs text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredTools.length === 0 && (
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
