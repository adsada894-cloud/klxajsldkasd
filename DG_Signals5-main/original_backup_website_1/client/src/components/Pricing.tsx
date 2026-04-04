import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function Pricing() {
  const animation = useScrollAnimation();

  return (
    <section className="py-24 bg-vpfx-bg/50">
      <div className="container mx-auto px-6">
        <div 
          ref={animation.ref}
          className={`text-center mb-18 reveal-from-below ${animation.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-7 gradient-text-v1">
            Free VIP Access
          </h2>
          
          <div className={`max-w-4xl mx-auto surface-panel-v2 p-9 md:p-14 expand-reveal ${animation.isVisible ? 'visible' : ''}`}>
            <p className="text-vpfx-text text-lg md:text-xl leading-relaxed mb-9">
              Forex & Gold Analysis offering <span className="text-vpfx-accent font-bold">free access</span> • Education • No fees.
            </p>
            
            <div className="text-center space-y-7">
              <div className="text-vpfx-accent font-bold text-2xl mb-4.5">
                What you get FREE:
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 text-left max-w-2xl mx-auto">
                {[
                  "Market ideas and chart analysis",
                  "Real-time educational updates", 
                  "Annotated setups and case studies",
                  "Risk management included",
                  "Free VIP channel access",
                  "Professional team support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3.5">
                    <span className="text-vpfx-accent text-lg">✅</span>
                    <span className="text-vpfx-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4.5 mt-14">
              <a
                href="/join"
                className="inline-flex items-center gap-3.5 px-11 py-5 rounded-2xl font-black bg-gradient-to-r from-vpfx-accent to-cyan-400 text-white border-2 border-vpfx-accent/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 halo-soft periodic-quake interaction-quake text-xl shadow-2xl"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                </svg>
                <span>Join Free Channel</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-3.5 px-11 py-5 rounded-2xl font-black bg-white text-black border-2 border-white transition-all duration-300 hover:scale-105 periodic-quake interaction-quake shadow-2xl text-xl"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                </svg>
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
