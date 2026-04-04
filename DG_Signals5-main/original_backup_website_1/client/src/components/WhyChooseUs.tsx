import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function WhyChooseUs() {
  const animation = useScrollAnimation();

  return (
    <section className="py-24 bg-vpfx-bg/50">
      <div className="container mx-auto px-6">
        <div 
          ref={animation.ref}
          className={`text-center mb-18 reveal-from-below ${animation.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-7 gradient-text-v1">
            Why Choose VictoryPipsFX
          </h2>
          <p className="text-vpfx-text/80 text-lg max-w-2xl mx-auto">
            Market Analysis • Education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 max-w-5xl mx-auto">
          {[
            {
              icon: "🎯",
              title: "Education First",
              description: "Clear methods for market understanding.",
              animClass: "reveal-from-start"
            },
            {
              icon: "👨‍💼",
              title: "Expert Team",
              description: "Pros delivering daily market views.",
              animClass: "expand-reveal"
            },
            {
              icon: "⚡",
              title: "Daily Market Ideas",
              description: "Education and charts via Telegram.",
              animClass: "reveal-from-end"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`surface-panel-v2 p-9 text-center group hover:scale-105 transition-all duration-500 halo-soft ${item.animClass} ${animation.isVisible ? 'visible' : ''} delay-cascade-${index + 1}`}
            >
              <div className="text-4xl mb-4.5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-vpfx-accent font-black text-xl mb-3.5">
                {item.title}
              </h3>
              <p className="text-vpfx-muted leading-relaxed">
                {item.description}
              </p>
              
              {/* CTA Button */}
              <div className="mt-7">
                <a
                  href="/join"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold bg-vpfx-accent/20 text-vpfx-accent border border-vpfx-accent/30 transition-all duration-300 hover:bg-vpfx-accent hover:text-white hover:scale-105 periodic-quake interaction-quake"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                  </svg>
                  Join Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
