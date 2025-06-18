
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedToolsSection from "@/components/FeaturedToolsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <FeaturedToolsSection />
      <Footer />
    </div>
  );
};

export default Index;
