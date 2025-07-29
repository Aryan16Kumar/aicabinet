
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/explore-tools" },
    { name: "About", href: "/about" }
  ];

  const categories = [
    "Design",
    "Development",
    "Marketing",
    "Education",
    "Productivity",
    "Video & Audio",
    "Data Analytics"
  ];

  const handleCategoriesClick = () => {
    navigate('/explore-tools');
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/explore-tools?category=${encodeURIComponent(category)}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl">🗄️</div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AiCabinet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger 
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200 outline-none"
                data-category-select
              >
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-popover border border-border shadow-lg">
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={handleCategoriesClick}
                >
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category} 
                    className="cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/submit-tool">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Submit Tool
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Categories in Mobile Menu */}
              <div className="px-3 py-2">
                <div className="text-muted-foreground font-medium mb-2">Categories</div>
                <button
                  onClick={() => {
                    handleCategoriesClick();
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategorySelect(category);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="px-3 py-2">
                <Link to="/submit-tool" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Submit Tool
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
