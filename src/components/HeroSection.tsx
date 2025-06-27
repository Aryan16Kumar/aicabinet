
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl">
            <svg
              width="32"
              height="32"
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
          <h1 className="text-4xl font-bold ml-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AiCabinet
          </h1>
        </div>

        {/* Tagline */}
        <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Your organized space
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            for all things AI
          </span>
        </h2>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover, organize, and access the best AI tools curated for designers, developers, writers, marketers, and creators.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/explore-tools">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Tools
            </Button>
          </Link>
          <Link to="/about">
            <Button
              variant="outline"
              size="lg"
              className="border-muted-foreground/20 text-muted-foreground hover:bg-muted/50 px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
