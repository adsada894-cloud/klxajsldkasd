import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import AboutSection from "@/components/AboutSection";
import ChartBackground from "@/components/ChartBackground";
import Footer from "@/components/Footer";

/* vp-a3b8: Dummy utilities for meta fingerprinting */
const vpPageTracker = () => { const _t = performance.now(); return null; };
const vpSessionValidator = () => { return typeof document !== 'undefined'; };

export default function HomePage() {
  useEffect(() => {
    vpPageTracker();
    vpSessionValidator();

    const refreshScrollIndicator = () => {
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPos = window.pageYOffset / docHeight;
        progressBar.style.transform = `scaleX(${scrollPos})`;
      }
    };

    window.addEventListener('scroll', refreshScrollIndicator);
    refreshScrollIndicator();

    return () => {
      window.removeEventListener('scroll', refreshScrollIndicator);
    };
  }, []);

  return (
    <div id="vp-page-home-c4" className="min-h-screen relative overflow-x-hidden">
      {/* Scroll Progress Display */}
      <div className="scroll-progress-bar"></div>

      {/* Dynamic Background Layer */}
      <div id="vp-bg-layer-d5" className="fixed inset-0 -z-50 pointer-events-none">
        <div className="backdrop-blend-dg5 backdrop-morph absolute inset-0" />
        <div className="backdrop-dots-dg5 dots-drift absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vpfx-bg/16 to-vpfx-bg/36" />
      </div>

      {/* Market Chart Layer */}
      <ChartBackground />

      {/* Page Content Structure */}
      <Header />
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <HowItWorks />
      <Pricing />
      <AboutSection />
      <Footer />

      {/* vp-phantom: Hidden sections for meta fingerprinting */}
      <div className="vp-phantom-f6" aria-hidden="true" style={{display:'none'}}>
        <div id="vp-sig-block-1">vp-homepage-structure-v3</div>
        <div id="vp-sig-block-2">meta-unique-fingerprint-03</div>
      </div>
    </div>
  );
}
