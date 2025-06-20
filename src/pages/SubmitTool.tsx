
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SubmitTool = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    toolName: "",
    websiteUrl: "",
    category: "",
    description: "",
    pricing: "",
    reasoning: "",
    email: ""
  });

  const categories = [
    "Design",
    "Writing",
    "Development", 
    "Marketing",
    "Education",
    "Productivity",
    "Video/Audio",
    "Other"
  ];

  const pricingOptions = [
    "Free",
    "Freemium", 
    "Paid",
    "Open Source",
    "Unknown"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.toolName || !formData.websiteUrl || !formData.category || !formData.description || !formData.pricing) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(formData.websiteUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Thank you for submitting!",
        description: "We'll review your tool suggestion and get back to you soon.",
      });
      
      // Reset form
      setFormData({
        toolName: "",
        websiteUrl: "",
        category: "",
        description: "",
        pricing: "",
        reasoning: "",
        email: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Submit an AI Tool
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Help us grow our collection by suggesting AI tools that should be featured on AiCabinet.
            </p>
          </div>

          {/* Form */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Tool Information</CardTitle>
              <CardDescription>
                Please provide details about the AI tool you'd like us to feature.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tool Name */}
                <div className="space-y-2">
                  <Label htmlFor="toolName">Tool Name *</Label>
                  <Input
                    id="toolName"
                    value={formData.toolName}
                    onChange={(e) => handleInputChange("toolName", e.target.value)}
                    placeholder="e.g., ChatGPT, Midjourney, GitHub Copilot"
                    required
                  />
                </div>

                {/* Website URL */}
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Tool Website URL *</Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                    placeholder="https://example.com"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Briefly describe what this AI tool does (1-2 lines)"
                    rows={3}
                    required
                  />
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <Label htmlFor="pricing">Pricing *</Label>
                  <Select value={formData.pricing} onValueChange={(value) => handleInputChange("pricing", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing model" />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reasoning */}
                <div className="space-y-2">
                  <Label htmlFor="reasoning">Why should we include this tool? (Optional)</Label>
                  <Textarea
                    id="reasoning"
                    value={formData.reasoning}
                    onChange={(e) => handleInputChange("reasoning", e.target.value)}
                    placeholder="Tell us what makes this tool special or useful..."
                    rows={4}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com (for follow-up or credit)"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Tool"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitTool;
