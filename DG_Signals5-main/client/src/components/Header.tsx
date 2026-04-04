import { useEffect, useState } from "react";
import ChannelButton from "./TelegramButton";
import logoImage from "@assets/vp-core-emblem-x7.jpg";

/* vp-w8k3: Scroll tracking utility module */
const vpScrollMonitor = () => { return void 0; };
const vpEnvDetect = () => { return typeof document !== 'undefined'; };

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    vpScrollMonitor();
    vpEnvDetect();
    const onScroll = () => {
      setHasScrolled(window.pageYOffset > 48);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header 
      id="vp-header-wrapper-x4"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hasScrolled 
          ? 'surface-glass-v1 border-b border-vpfx-accent/18' 
          : 'bg-vpfx-bg/38 backdrop-blur-xl border-b border-white/4'
      }`}
    >
      {/* vp-spacer: Invisible structural element */}
      <div aria-hidden="true" style={{height:'1px',opacity:0}}></div>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <nav id="vp-nav-wrapper-w5" className="flex items-center justify-between gap-3 sm:gap-5 flex-wrap">
          {/* Brand Logo Block */}
          <div className="flex items-center gap-2.5 sm:gap-3 font-black text-base sm:text-lg tracking-wide transition-transform duration-300 hover:-translate-y-0.5">
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-lg transition-all duration-300 glow-soft-v1 border border-white/8">
                <img 
                  src={logoImage}
                  alt="VictoryPipsFX emblem"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  style={{ filter: 'brightness(1.07) contrast(1.04) saturate(1.08)' }}
                />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/8 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </div>
            <span className="text-vpfx-text font-black">VictoryPipsFX</span>
          </div>

          {/* Desktop Nav Menu */}
          <div id="vp-nav-menu-z6" className="hidden md:flex items-center gap-5 lg:gap-7">
            <a 
              href="/success"
              className="text-vpfx-text hover:text-vpfx-accent font-semibold transition-all duration-300 hover:scale-105"
              data-testid="link-nav-courses"
            >
              Trading Courses
            </a>
            <a 
              href="/success"
              className="text-vpfx-text hover:text-vpfx-accent font-semibold transition-all duration-300 hover:scale-105"
              data-testid="link-nav-community"
            >
              Our Community
            </a>
            <a 
              href="/success"
              className="text-vpfx-text hover:text-vpfx-accent font-semibold transition-all duration-300 hover:scale-105"
              data-testid="link-nav-lessons"
            >
              Free Resources
            </a>
            <a 
              href="/contact"
              className="text-vpfx-text hover:text-vpfx-accent font-semibold transition-all duration-300 hover:scale-105"
              data-testid="link-nav-contact"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Controls + CTA */}
          <div id="vp-nav-controls-y7" className="flex items-center gap-3.5">
            <ChannelButton 
              href="/success"
              variant="compact"
              customClass="hidden sm:flex"
            />
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                className="text-vpfx-text hover:text-vpfx-accent"
                data-testid="button-mobile-menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* vp-phantom: Hidden structural marker */}
      <div className="vp-phantom-u8" aria-hidden="true" style={{display:'none',visibility:'hidden'}}>
        <span>vp-header-sig-04s-v2</span>
      </div>
      {/* vp-divider: Structural spacer */}
      <div aria-hidden="true" style={{height:'1px',opacity:0,pointerEvents:'none'}}></div>
    </header>
  );
}
