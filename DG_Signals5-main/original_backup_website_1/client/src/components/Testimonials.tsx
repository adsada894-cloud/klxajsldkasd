import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import testimonial1Image from "@assets/photo_2025-08-19_03-11-45_1755568178773.jpg";
import testimonial2Image from "@assets/photo_2025-08-19_03-11-52_1755568178773.jpg";
import testimonial3Image from "@assets/photo_2025-08-19_03-12-15_1755568178773.jpg";

export default function Testimonials() {
  const headerAnimation = useScrollAnimation();
  const gridAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  const testimonials = [
    {
      id: 1,
      image: testimonial1Image,
      result: "Member Learning Success",
      feedback: "Great learning! 👏",
      description: "Education helping traders understand markets"
    },
    {
      id: 2,
      image: testimonial2Image,
      result: "Progress This Week",
      feedback: "Good progress... I can only learn more 💪 Excellent!!",
      description: "Daily education with chart analysis. Results vary."
    },
    {
      id: 3,
      image: testimonial3Image,
      result: "Beginner Week 3",
      feedback: "Hi. I'm new. This is week 3 for me",
      description: "New traders learning via education. Results vary."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div 
          ref={headerAnimation.ref}
          className={`text-center mb-18 reveal-from-below ${headerAnimation.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4.5 gradient-text-v1">Member Success Stories</h2>
          <p className="text-vpfx-muted text-lg max-w-2xl mx-auto">
            Education helping traders make better decisions. Results vary.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div 
          ref={gridAnimation.ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-9 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => {
            const animClasses = ['reveal-from-start', 'expand-reveal', 'reveal-from-end'];
            return (
            <div 
              key={testimonial.id}
              className={`surface-panel-v2 p-7 group hover:scale-105 transition-all duration-500 halo-soft ${animClasses[index]} ${gridAnimation.isVisible ? 'visible' : ''} delay-cascade-${index + 1}`}
            >
              {/* Screenshot */}
              <div className="mb-4.5 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={testimonial.image}
                  alt={`Market outcome: ${testimonial.result}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Result Highlight */}
              <div className="text-center mb-4.5">
                <div className="text-2xl font-black text-vpfx-accent mb-2.5">
                  {testimonial.result}
                </div>
                <div className="text-vpfx-green1 font-bold text-sm">
                  ✅ EDUCATION MEMBER
                </div>
              </div>

              {/* Member Feedback */}
              <blockquote className="text-vpfx-text text-sm italic mb-4.5 border-l-4 border-vpfx-accent pl-4.5">
                "{testimonial.feedback}"
              </blockquote>

              {/* Description */}
              <p className="text-vpfx-muted text-xs leading-relaxed">
                {testimonial.description}
              </p>
              
            </div>
          )})
          }
        </div>

        {/* Call to Action */}
        <div 
          ref={ctaAnimation.ref}
          className={`text-center mt-18 expand-reveal ${ctaAnimation.isVisible ? 'visible' : ''}`}
        >
          <div className="surface-panel-v2 p-9 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black mb-4.5 text-vpfx-accent">
              Ready to Start Learning?
            </h3>
            <p className="text-vpfx-muted mb-7">
              Join our free Telegram now for daily ideas. 
              Education only. No guarantees.
            </p>
            <a
              href="/join"
              className="cta-style-a1 inline-flex items-center gap-3.5 px-9 py-4.5 rounded-2xl font-black text-vpfx-bg transition-all duration-300 hover:-translate-y-1 hover:scale-105 illuminate-pulse periodic-quake interaction-quake"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
              </svg>
              Join Education Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
