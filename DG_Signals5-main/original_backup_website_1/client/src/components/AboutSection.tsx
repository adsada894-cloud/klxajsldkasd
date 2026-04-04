import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function AboutSection() {
  const animation = useScrollAnimation();

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div 
          ref={animation.ref}
          className={`text-center max-w-4xl mx-auto reveal-from-below ${animation.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-9 gradient-text-v1">
            About Our Team
          </h2>
          
          <div className={`surface-panel-v2 p-9 md:p-14 reveal-from-below ${animation.isVisible ? 'visible' : ''}`}>
            <p className="text-vpfx-text text-lg md:text-xl leading-relaxed mb-9">
              <span className="text-vpfx-accent font-bold">VictoryPipsFX</span> offers Forex & Gold Analysis • Education • Clear Methods via technical study.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-9 mb-9">
              {[
                {
                  icon: "📊",
                  title: "Chart Analysts",
                  description: "Expert pattern analysis"
                },
                {
                  icon: "🌍", 
                  title: "Market Intelligence",
                  description: "Global education focus"
                },
                {
                  icon: "🎯",
                  title: "Quality Education", 
                  description: "Clear, realistic approach"
                }
              ].map((item, index) => {
                const animClasses = ['reveal-from-start', 'expand-reveal', 'reveal-from-end'];
                return (
                <div key={index} className={`text-center ${animClasses[index]} ${animation.isVisible ? 'visible' : ''} delay-cascade-${index + 1}`}>
                  <div className="text-3xl mb-3.5">{item.icon}</div>
                  <h3 className="text-vpfx-accent font-bold text-lg mb-2.5">{item.title}</h3>
                  <p className="text-vpfx-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              )})
              }
            </div>

            <div className="text-center">
              <p className="text-vpfx-text/80 text-base mb-7">
                Join 500+ traders learning our methods • Education only.
              </p>
              
              <a
                href="/join"
                className="inline-flex items-center gap-3.5 px-9 py-4.5 rounded-xl font-bold bg-vpfx-accent/20 text-vpfx-accent border border-vpfx-accent/30 transition-all duration-300 hover:bg-vpfx-accent hover:text-white hover:scale-105 periodic-quake interaction-quake"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                </svg>
                <span>Meet Expert Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
