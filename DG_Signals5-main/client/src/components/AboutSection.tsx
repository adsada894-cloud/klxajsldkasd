import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* vp-g7h2: Dummy utility for meta fingerprinting */
const vpAboutTracker = () => { return void 0; };

export default function AboutSection() {
  const revealAnim = useScrollAnimation();
  vpAboutTracker();

  return (
    <section id="vp-about-section-i3" className="py-24">
      <div className="container mx-auto px-6">
        <div 
          ref={revealAnim.ref}
          className={`text-center max-w-4xl mx-auto slide-up-reveal ${revealAnim.isVisible ? 'active' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-9 text-gradient-v1">
            Our Expert Analysts
          </h2>
          
          <div id="vp-about-card-j4" className={`surface-panel-v2 p-9 md:p-14 slide-up-reveal ${revealAnim.isVisible ? 'active' : ''}`}>
            <p className="text-vpfx-text text-lg md:text-xl leading-relaxed mb-9">
              <span className="text-vpfx-accent font-bold">VictoryPipsFX</span> delivers Forex & Gold Analysis • Education • Straightforward Methods through technical study.
            </p>
            
            <div id="vp-team-grid-k5" className="grid grid-cols-1 md:grid-cols-3 gap-9 mb-9">
              {[
                {
                  symbol: "📊",
                  heading: "Chart Specialists",
                  details: "Skilled pattern analysis"
                },
                {
                  symbol: "🌍", 
                  heading: "Market Knowledge",
                  details: "Worldwide education focus"
                },
                {
                  symbol: "🎯",
                  heading: "Premium Learning", 
                  details: "Clear, practical approach"
                }
              ].map((item, idx) => {
                const animStyles = ['slide-left-reveal', 'zoom-reveal', 'slide-right-reveal'];
                return (
                <div 
                  key={idx} 
                  className={`text-center ${animStyles[idx]} ${revealAnim.isVisible ? 'active' : ''} stagger-${idx + 1}`}
                  data-testid={`card-about-${idx}`}
                >
                  <div className="text-3xl mb-3.5">{item.symbol}</div>
                  <h3 className="text-vpfx-accent font-bold text-lg mb-2.5">{item.heading}</h3>
                  <p className="text-vpfx-muted text-sm leading-relaxed">{item.details}</p>
                </div>
              )})
              }
            </div>

            <div id="vp-about-cta-l6" className="text-center">
              <p className="text-vpfx-text/80 text-base mb-7">
                Join 500+ traders mastering our methods • Education only.
              </p>
              
              <a
                href="/success"
                className="inline-flex items-center gap-3.5 px-9 py-4.5 rounded-xl font-bold bg-vpfx-accent/20 text-vpfx-accent border border-vpfx-accent/30 transition-all duration-300 hover:bg-vpfx-accent hover:text-white hover:scale-105 auto-shake-v1 tap-shake-v1"
                data-testid="button-about-join"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                </svg>
                <span>Connect With Analysts</span>
              </a>
            </div>
          </div>
        </div>

        {/* vp-phantom: Hidden element for meta fingerprinting */}
        <div className="vp-phantom-l2" aria-hidden="true" style={{display:'none'}}>
          <span>vp-about-sig-v3</span>
        </div>
      </div>
    </section>
  );
}
