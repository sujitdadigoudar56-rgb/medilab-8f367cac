import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import HealthPackages from "@/components/HealthPackages";
import PopularTests from "@/components/PopularTests";
import Specialists from "@/components/Specialists";
import FamilyWellness from "@/components/FamilyWellness";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HealthPackages />
      <PopularTests />
      <HowItWorks />
      <Specialists />
      <FamilyWellness />
      <About />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
