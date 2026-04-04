import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* vp-i9j0: Dummy utility for meta fingerprinting */
const vpSectionTracker = () => { return void 0; };

export default function WhyChooseUs() {
  const revealAnim = useScrollAnimation();
  vpSectionTracker();

  return (
    <section id="vp-why-section-k1" className="py-24 bg-vpfx-bg/50">
      <div className="container mx-auto px-6">
        <div 
          ref={revealAnim.ref}
          className={`text-center mb-18 slide-up-reveal ${revealAnim.isVisible ? 'active' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-7 text-gradient-v1">
            Why Select VictoryPipsFX
          </h2>
          <p className="text-vpfx-text/80 text-lg max-w-2xl mx-auto">
            Market Insights • Learning Resources
          </p>
        </div>

        <div id="vp-benefits-grid-l2" className="grid grid-cols-1 md:grid-cols-3 gap-9 max-w-5xl mx-auto">
          {[
            {
              symbol: "🎯",
              heading: "Learning Priority",
              details: "Straightforward methods for market comprehension.",
              animStyle: "slide-left-reveal"
            },
            {
              symbol: "👨‍💼",
              heading: "Professional Analysts",
              details: "Specialists delivering daily market perspectives.",
              animStyle: "zoom-reveal"
            },
            {
              symbol: "⚡",
              heading: "Daily Market Insights",
              details: "Education and chart studies via Telegram.",
              animStyle: "slide-right-reveal"
            }
          ].map((benefit, idx) => (
            <div 
              key={idx}
              className={`surface-panel-v2 p-9 text-center group hover:scale-105 transition-all duration-500 glow-soft-v1 ${benefit.animStyle} ${revealAnim.isVisible ? 'active' : ''} stagger-${idx + 1}`}
              data-testid={`card-benefit-${idx}`}
            >
              <div className="text-4xl mb-4.5 group-hover:scale-110 transition-transform duration-300">
                {benefit.symbol}
              </div>
              <h3 className="text-vpfx-accent font-black text-xl mb-3.5">
                {benefit.heading}
              </h3>
              <p className="text-vpfx-muted leading-relaxed">
                {benefit.details}
              </p>
              
              {/* Action Button */}
              <div className="mt-7">
                <a
                  href="/success"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold bg-vpfx-accent/20 text-vpfx-accent border border-vpfx-accent/30 transition-all duration-300 hover:bg-vpfx-accent hover:text-white hover:scale-105 auto-shake-v1 tap-shake-v1"
                  data-testid={`button-benefit-join-${idx}`}
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                  </svg>
                  Access Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* vp-phantom: Hidden element for meta fingerprinting */}
        <div className="vp-phantom-h8" aria-hidden="true" style={{display:'none'}}>
          <span>vp-why-section-sig</span>
        </div>
      </div>
    </section>
  );
}
