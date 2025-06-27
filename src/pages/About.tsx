
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              About 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
                AiCabinet
              </span>
            </h1>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-xl leading-relaxed">
              AiCabinet is your comprehensive directory for discovering and exploring the most innovative AI tools available today. We understand that the AI landscape is evolving rapidly, and finding the right tool for your specific needs can be overwhelming. That's why we've created a curated, organized space where professionals, creators, and enthusiasts can easily discover AI solutions that enhance their work and creativity.
            </p>

            <p className="text-lg leading-relaxed">
              Our mission is to democratize access to AI technology by providing a centralized platform where users can explore tools across various categories - from design and development to marketing and education. Whether you're a seasoned professional looking to streamline your workflow or a curious newcomer wanting to explore AI's possibilities, AiCabinet serves as your trusted guide in the ever-expanding world of artificial intelligence.
            </p>

            <p className="text-lg leading-relaxed">
              We carefully review and categorize each tool in our collection, ensuring that our users have access to high-quality, reliable AI solutions. Our platform is designed to save you time and help you make informed decisions about which AI tools best suit your projects and goals. Join thousands of users who trust AiCabinet to stay ahead in the AI revolution.
            </p>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center space-x-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-muted/20">
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
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2">Ready to explore?</h3>
                <p className="text-muted-foreground">Discover your next favorite AI tool today</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
