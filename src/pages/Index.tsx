
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedToolsSection from "@/components/FeaturedToolsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <HeroSection />
        <SearchSection />
        <CategoriesSection />
        <FeaturedToolsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
