
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    
    if (selectedCategory && selectedCategory !== "all") {
      params.set('category', selectedCategory);
    }
    
    if (selectedPricing && selectedPricing !== "all") {
      params.set('pricing', selectedPricing);
    }
    
    navigate(`/explore-tools?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold mb-6">
            Find Your Perfect 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
              AI Tool
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Search through our curated collection of AI tools by task, profession, or category
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8 border border-muted/20 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                What are you looking for?
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="e.g., image generation, code completion, copywriting..."
                  className="pl-12 bg-background/50 border-muted/30 focus:border-blue-400 rounded-xl h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            <div className="lg:w-48 w-full space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-background/50 border-muted/30 focus:border-blue-400 rounded-xl h-12">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-card border-muted/30">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Writing">Writing</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Productivity">Productivity</SelectItem>
                  <SelectItem value="Video & Audio">Video & Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:w-48 w-full space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Pricing
              </label>
              <Select value={selectedPricing} onValueChange={setSelectedPricing}>
                <SelectTrigger className="bg-background/50 border-muted/30 focus:border-blue-400 rounded-xl h-12">
                  <SelectValue placeholder="All Pricing" />
                </SelectTrigger>
                <SelectContent className="bg-card border-muted/30">
                  <SelectItem value="all">All Pricing</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-12 px-8 transition-all duration-300 transform hover:scale-105"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
