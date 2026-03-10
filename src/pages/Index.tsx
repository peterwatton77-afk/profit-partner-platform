import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import MatchedBettingExplainer from "@/components/MatchedBettingExplainer";
import HowItWorksSection from "@/components/HowItWorksSection";
import ToolsSection from "@/components/ToolsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustSignals />
      <MatchedBettingExplainer />
      <HowItWorksSection />
      <ToolsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
