
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              Privacy 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
                Policy
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Effective Date: June 28, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-lg leading-relaxed">
              At AiCabinet, we are committed to protecting your privacy and ensuring a secure experience while browsing and using our platform.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-lg leading-relaxed mb-4">
                We do not collect any personal information from visitors browsing tools on our site.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                However, if you choose to submit a tool suggestion via our form, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>Your name (if entered)</li>
                <li>Your email address (for follow-up)</li>
                <li>Tool details (name, URL, description)</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                This information is used solely for internal review and tool evaluation purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-lg leading-relaxed mb-4">We use submitted data to:</p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>Review and approve AI tools for listing</li>
                <li>Contact you (if necessary) for more information about a submission</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                We do not sell, rent, or share your personal data with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cookies</h2>
              <p className="text-lg leading-relaxed mb-4">
                AiCabinet may use basic cookies or analytics tools (like Google Analytics) to improve performance and user experience. These do not identify individuals.
              </p>
              <p className="text-lg leading-relaxed">
                You can disable cookies in your browser settings if you prefer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Links</h2>
              <p className="text-lg leading-relaxed">
                Our site links to external AI tools and services. Once you leave AiCabinet and visit third-party websites, their own privacy policies apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
              <p className="text-lg leading-relaxed">
                All data is securely stored using encrypted databases through Supabase. Only authorized team members can access submitted data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-lg leading-relaxed mb-4">You may request:</p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>To view any personal data we hold about you</li>
                <li>To delete your submitted information</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                To make such a request, contact us at [your support email].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Policy Updates</h2>
              <p className="text-lg leading-relaxed">
                We may update this policy occasionally. Updates will be posted on this page with the new effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-lg leading-relaxed">
                For any privacy concerns or questions, please reach out to:
              </p>
              <p className="text-lg leading-relaxed mt-2">
                📧 [your support email]
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Privacy;
