import { useEffect, useState } from "react";
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import TelegramButton from "./TelegramButton";
import StatCounter from "./StatCounter";
import logoImage from "@assets/vp-core-emblem-x7.jpg";

/* vp-s5n9: Session initialization utilities */
const vpSessionTracker = () => { const _t = Date.now(); return void 0; };
const vpBrowserCheck = () => { return typeof window !== 'undefined' && typeof document !== 'undefined'; };

export default function Hero() {
  const [contentReady, setContentReady] = useState(false);
  const metricsAnim = useScrollAnimation();
  const detailsAnim = useScrollAnimation();

  useEffect(() => {
    vpSessionTracker();
    vpBrowserCheck();
    setContentReady(true);
  }, []);

  return (
    <main id="vp-main-container-l5" className="container mx-auto px-4 sm:px-6 md:px-8">
      {/* vp-phantom: Hidden structural marker */}
      <div className="vp-phantom-l5" aria-hidden="true" style={{display:'none',visibility:'hidden'}}>
        <span>vp-structure-sig-04s-v2</span>
      </div>
      {/* vp-spacer: Invisible layout element */}
      <div aria-hidden="true" style={{height:'1px',opacity:0}}></div>

      <section id="vp-hero-wrapper-o3" className="relative text-center py-12 sm:py-16 md:py-32">
        {/* Hero Content Container */}
        <div className={`transition-all duration-1000 ${contentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Brand Logo Display - Moved before tagline */}
          <div id="vp-emblem-display-a3" className="mb-7 sm:mb-9">
            <img 
              src={logoImage}
              alt="VictoryPipsFX emblem"
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto rounded-3xl shadow-2xl motion-float-v1 hover:scale-105 transition-transform duration-500 glow-soft-v1"
              style={{ filter: 'brightness(1.07) contrast(1.04) saturate(1.10)' }}
            />
          </div>

          {/* Tagline Block */}
          <div id="vp-tagline-block-l4" className="mb-4 sm:mb-5">
            <h2 className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-5 sm:mb-7 bg-[#00000000] text-[#ffffff] font-bold tracking-wide px-4">Premium Accuracy • Expert Analysts • Live Updates</h2>
          </div>

          {/* vp-divider: Structural spacer */}
          <div aria-hidden="true" style={{height:'1px',opacity:0,pointerEvents:'none'}}></div>

          {/* Primary Headline */}
          <div id="vp-headline-block-c5" className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-5 text-gradient-v1 tracking-tight leading-tight bg-[#e6e8edd6] px-4">FREE GOLD SIGNALS</h1>
          </div>
          
          {/* Feature Highlights Display */}
          <div id="vp-features-display-d4" className="mb-6 sm:mb-7 px-4">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { symbol: "⚡", label: "Daily Insights" },
                { symbol: "📈", label: "Chart Analysis" },
                { symbol: "👥", label: "Expert Analysts" },
                { symbol: "🎯", label: "96% Success Rate" }
              ].map((item, idx) => (
                <span 
                  key={idx}
                  className="surface-panel-v2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 glow-soft-v1 group"
                >
                  <span className="mr-2 sm:mr-2.5 group-hover:scale-110 transition-transform duration-300">{item.symbol}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Main CTA Button */}
          <div id="vp-cta-main-e6" className="mb-8 sm:mb-10 px-4">
            <a
              href="/success"
              className="inline-flex items-center gap-2.5 sm:gap-3.5 px-8 sm:px-11 py-4 sm:py-5 rounded-2xl font-black cta-primary-v3 text-white border-2 border-vpfx-accent/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-95 glow-soft-v1 auto-shake-v1 tap-shake-v1 text-base sm:text-xl shadow-2xl w-full sm:w-auto justify-center max-w-md mx-auto"
              data-testid="button-join-channel"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.90l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
              </svg>
              <span>Join Telegram Now</span>
            </a>
          </div>

          {/* vp-phantom: Hidden structural marker */}
          <div className="vp-phantom-n6" aria-hidden="true" style={{opacity:0,pointerEvents:'none',visibility:'hidden'}}>
            <div>vp-dom-sig-04s-v2</div>
          </div>

          {/* Stats Metrics Display */}
          <div id="vp-stats-wrapper-f7" className="mb-8 sm:mb-10 px-4">
            <div 
              ref={metricsAnim.ref}
              className={`grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7 max-w-4xl mx-auto slide-up-reveal ${metricsAnim.isVisible ? 'active' : ''}`}
            >
              <StatCounter 
                target={500}
                suffix="+"
                label="Active Learners"
                delay={0.23}
              />
              <StatCounter 
                target={25}
                suffix="k+"
                label="Community Members"
                delay={0.43}
              />
              <StatCounter 
                target={3}
                suffix="–5+"
                label="Daily Market Updates"
                delay={0.63}
              />
            </div>
          </div>

          {/* Alternate CTA Button */}
          <div id="vp-cta-alt-g8" className="mb-10 sm:mb-12 px-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 sm:gap-3.5 px-8 sm:px-11 py-4 sm:py-5 rounded-2xl font-black bg-white text-black border-2 border-white transition-all duration-300 hover:scale-105 auto-shake-v1 tap-shake-v1 shadow-2xl text-base sm:text-xl w-full sm:w-auto justify-center max-w-md mx-auto"
              data-testid="button-contact-team"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.90l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
              </svg>
              <span>Reach Our Team</span>
            </a>
          </div>

          {/* Benefits Overview Section */}
          <div id="vp-benefits-block-h9" className="max-w-4xl mx-auto mb-10 sm:mb-12 space-y-4 text-center px-4">
            <p className="text-vpfx-accent text-sm sm:text-base md:text-lg font-bold leading-relaxed">
              ✔ Daily gold & forex market analysis<br/>
              ✔ Price action educational content<br/>
              ✔ Trader community discussions<br/>
              ✔ Complimentary Telegram access
            </p>
            {/* vp-divider: Structural spacer */}
            <div aria-hidden="true" style={{height:'1px',opacity:0}}></div>
            <div className="mt-5 sm:mt-7 p-4 sm:p-5 bg-vpfx-card/18 border border-vpfx-border/8 rounded-lg max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-vpfx-muted leading-relaxed">
                <strong>Disclaimer:</strong> Educational material only, not financial guidance. Trading involves risk of capital loss. Historical performance doesn't guarantee future results.
              </p>
            </div>
          </div>

          {/* vp-phantom: Hidden structural marker */}
          <div className="vp-phantom-q7" aria-hidden="true" style={{position:'absolute',left:'-9999px',visibility:'hidden'}}>
            <p>vp-unique-fingerprint-04s-v2</p>
          </div>

        </div>
      </section>
    </main>
  );
}
