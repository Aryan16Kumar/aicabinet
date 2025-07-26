
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleCategoriesClick = () => {
    navigate('/explore-tools');
    // Small delay to ensure page loads before trying to trigger category filter
    setTimeout(() => {
      const categorySelect = document.querySelector('[data-category-select]');
      if (categorySelect) {
        (categorySelect as HTMLElement).click();
      }
    }, 100);
  };

  const handleFeaturedClick = () => {
    navigate('/#featured');
    // Scroll to featured section after navigation
    setTimeout(() => {
      const featuredSection = document.getElementById('featured');
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-card/50 border-t border-muted/20 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <rect x="3" y="4" width="18" height="2" rx="1" fill="currentColor" />
                  <rect x="3" y="8" width="18" height="2" rx="1" fill="currentColor" />
                  <rect x="3" y="12" width="12" height="2" rx="1" fill="currentColor" />
                  <rect x="3" y="16" width="8" height="2" rx="1" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold ml-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AiCabinet
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Your organized space for discovering, comparing, and accessing the best AI tools. 
              Curated for professionals across all industries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/explore-tools" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <button onClick={handleCategoriesClick} className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={handleFeaturedClick} className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Featured
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/submit-tool" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Submit Tool
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Simplified without copyright */}
        <div className="pt-8 border-t border-muted/20 flex justify-center items-center">
          <p className="text-muted-foreground text-sm">
            Made with ❤️ for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
