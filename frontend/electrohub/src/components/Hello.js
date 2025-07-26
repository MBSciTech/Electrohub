import React from "react";
// import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import ProjectHighlightsSection from "./ProjectHighlightsSection";
import AboutSection from "./AboutSection";
import Footer from "./Footer";

function Hello() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ProjectHighlightsSection />
      <AboutSection />
      <Footer />
    </>
  );
}

export default Hello;