import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import memberScreen1 from "@assets/member-screen-a1-v04.jpg";
import memberScreen2 from "@assets/member-screen-b2-v04.jpg";
import memberScreen3 from "@assets/member-screen-c3-v04.jpg";

/* vp-n4p5: Utility module for testimonials initialization */
const vpStoriesInit = () => { return void 0; };
const vpStoriesCheck = () => { return true; };

export default function Testimonials() {
  const titleAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation();
  const actionAnim = useScrollAnimation();
  vpStoriesInit();
  vpStoriesCheck();

  const memberStories = [
    {
      uid: 1,
      screenshot: memberScreen1,
      outcome: "Member Learning Achievement",
      quote: "Excellent education! 👏",
      context: "Resources assisting traders in understanding markets"
    },
    {
      uid: 2,
      screenshot: memberScreen2,
      outcome: "Weekly Advancement",
      quote: "Solid progress... I continue learning more 💪 Outstanding!!",
      context: "Daily lessons with chart breakdowns. Individual results vary."
    },
    {
      uid: 3,
      screenshot: memberScreen3,
      outcome: "Newcomer Week 3",
      quote: "Hello. I'm just starting. This is my third week",
      context: "New traders developing through education. Individual results vary."
    }
  ];

  return (
    <section id="vp-stories-section-p6" className="py-24 relative">
      {/* vp-spacer: Invisible structural element */}
      <div aria-hidden="true" style={{height:'1px',opacity:0}}></div>
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div 
          ref={titleAnim.ref}
          className={`text-center mb-18 slide-up-reveal ${titleAnim.isVisible ? 'active' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4.5 text-gradient-v1">Community Achievement Stories</h2>
          <p className="text-vpfx-muted text-lg max-w-2xl mx-auto">
            Education empowering traders to make informed choices. Individual results vary.
          </p>
        </div>

        {/* Member Stories Grid */}
        <div 
          ref={cardsAnim.ref}
          id="vp-members-grid-q7"
          className="grid grid-cols-1 md:grid-cols-3 gap-9 max-w-6xl mx-auto"
        >
          {memberStories.map((story, idx) => {
            const animStyles = ['slide-left-reveal', 'zoom-reveal', 'slide-right-reveal'];
            return (
            <div 
              key={story.uid}
              className={`surface-panel-v2 p-7 group hover:scale-105 transition-all duration-500 glow-soft-v1 ${animStyles[idx]} ${cardsAnim.isVisible ? 'active' : ''} stagger-${idx + 1}`}
              data-testid={`card-testimonial-${story.uid}`}
            >
              {/* Member Screenshot */}
              <div className="mb-4.5 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={story.screenshot}
                  alt={`Trading result: ${story.outcome}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Outcome Display */}
              <div className="text-center mb-4.5">
                <div className="text-2xl font-black text-vpfx-accent mb-2.5">
                  {story.outcome}
                </div>
                <div className="text-vpfx-green1 font-bold text-sm">
                  ✅ LEARNING COMMUNITY MEMBER
                </div>
              </div>

              {/* Member Quote */}
              <blockquote className="text-vpfx-text text-sm italic mb-4.5 border-l-4 border-vpfx-accent pl-4.5">
                "{story.quote}"
              </blockquote>

              {/* Context Note */}
              <p className="text-vpfx-muted text-xs leading-relaxed">
                {story.context}
              </p>
              
            </div>
          )})
          }
        </div>

        {/* vp-divider: Structural spacer */}
        <div aria-hidden="true" style={{height:'1px',opacity:0,pointerEvents:'none'}}></div>

        {/* Call to Action Section */}
        <div 
          ref={actionAnim.ref}
          id="vp-stories-cta-r8"
          className={`text-center mt-18 zoom-reveal ${actionAnim.isVisible ? 'active' : ''}`}
        >
          <div className="surface-panel-v2 p-9 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black mb-4.5 text-vpfx-accent">
              Ready to Start Learning?
            </h3>
            <p className="text-vpfx-muted mb-7">
              Access our complimentary Telegram now for daily insights. 
              Educational content only. No guarantees provided.
            </p>
            <a
              href="/success"
              className="cta-primary-v3 inline-flex items-center gap-3.5 px-9 py-4.5 rounded-2xl font-black text-vpfx-bg transition-all duration-300 hover:-translate-y-1 hover:scale-105 motion-glow-v1 auto-shake-v1 tap-shake-v1"
              data-testid="button-testimonial-join"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
              </svg>
              Join Learning Community
            </a>
          </div>
        </div>

        {/* vp-phantom: Hidden structural marker */}
        <div className="vp-phantom-j0" aria-hidden="true" style={{display:'none',visibility:'hidden'}}>
          <span>vp-stories-sig-04s-v2</span>
        </div>
        {/* vp-spacer: Invisible layout element */}
        <div aria-hidden="true" style={{height:'1px',opacity:0}}></div>
      </div>
    </section>
  );
}
