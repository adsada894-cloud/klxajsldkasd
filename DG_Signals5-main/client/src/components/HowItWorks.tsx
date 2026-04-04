import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* vp-v5w0: Dummy utility for meta fingerprinting */
const vpStepsTracker = () => { return void 0; };

export default function HowItWorks() {
  const revealAnim = useScrollAnimation();
  vpStepsTracker();

  return (
    <section id="vp-steps-section-x1" className="py-24">
      <div className="container mx-auto px-6">
        <div 
          ref={revealAnim.ref}
          className={`text-center mb-18 slide-up-reveal ${revealAnim.isVisible ? 'active' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-7 text-gradient-v1">
            Simple. Quick. Results-Driven.
          </h2>
          <p className="text-vpfx-text/80 text-lg max-w-2xl mx-auto">
            Market Insights & Learning • Begin in 4 Steps
          </p>
        </div>

        <div id="vp-steps-grid-y2" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 max-w-6xl mx-auto">
          {[
            {
              stepNum: "1",
              symbol: "📱",
              heading: "Access Community",
              details: "Enter our complimentary education group"
            },
            {
              stepNum: "2", 
              symbol: "📱",
              heading: "Receive Insights",
              details: "Market perspectives shared regularly"
            },
            {
              stepNum: "3",
              symbol: "💰",
              heading: "Analyze Charts", 
              details: "Examine ideas with detailed annotations"
            },
            {
              stepNum: "4",
              symbol: "🎯",
              heading: "Advance Skills",
              details: "Education to enhance your abilities"
            }
          ].map((step, idx) => (
            <div 
              key={idx}
              className={`surface-panel-v2 p-7 text-center group hover:scale-105 transition-all duration-500 glow-soft-v1 relative lift-reveal ${revealAnim.isVisible ? 'active' : ''} stagger-${idx + 1}`}
              data-testid={`card-step-${step.stepNum}`}
            >
              {/* Step Indicator */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-9 h-9 bg-vpfx-accent text-white rounded-full flex items-center justify-center font-black text-sm">
                {step.stepNum}
              </div>

              {/* Step Icon */}
              <div className="text-3xl mb-4.5 mt-5 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {idx === 0 ? (
                  <svg className="w-8 h-8 text-vpfx-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                  </svg>
                ) : (
                  step.symbol
                )}
              </div>

              {/* Step Title */}
              <h3 className="text-vpfx-accent font-black text-lg mb-3.5">
                {step.heading}
              </h3>

              {/* Step Details */}
              <p className="text-vpfx-muted text-sm leading-relaxed">
                {step.details}
              </p>
            </div>
          ))}
        </div>

        {/* Primary Action */}
        <div id="vp-steps-cta-z3" className="text-center mt-14">
          <a
            href="/success"
            className="inline-flex items-center gap-3.5 px-11 py-5 rounded-2xl font-black bg-gradient-to-r from-vpfx-accent to-cyan-400 text-white border-2 border-vpfx-accent/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 glow-soft-v1 auto-shake-v1 tap-shake-v1 text-xl shadow-2xl"
            data-testid="button-steps-join"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.90l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
            </svg>
            <span>Join Learning Community</span>
          </a>
        </div>

        {/* vp-phantom: Hidden element for meta fingerprinting */}
        <div className="vp-phantom-j0" aria-hidden="true" style={{display:'none'}}>
          <span>vp-steps-sig-v3</span>
        </div>
      </div>
    </section>
  );
}
