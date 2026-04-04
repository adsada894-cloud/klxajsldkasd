/* vp-s3t8: Footer component with unique structure v4 */
const vpFooterSetup = () => { return void 0; };
const vpFooterCheck = () => { return true; };

export default function Footer() {
  vpFooterSetup();
  vpFooterCheck();
  
  return (
    <footer id="vp-footer-wrapper-u5" className="bg-vpfx-bg border-t border-vpfx-border/18 py-14 mt-18">
      {/* vp-spacer: Invisible structural element */}
      <div aria-hidden="true" style={{height:'1px',opacity:0}}></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="vp-footer-inner-v6" className="text-center space-y-9">
          
          {/* Community Proof Block */}
          <div id="vp-social-proof-w7" className="bg-gradient-to-r from-vpfx-accent/12 to-cyan-500/12 border border-vpfx-accent/18 rounded-xl p-7 max-w-2xl mx-auto">
            <div className="text-vpfx-accent font-bold text-lg mb-2.5">
              Become part of 500+ traders receiving daily market insights
            </div>
            <p className="text-vpfx-text text-sm">
              Our educational content provides straightforward methods and market analysis. No guarantees. Study real markets and enhance your trading abilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4.5 mt-4.5">
              <a
                href="/success"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold bg-vpfx-accent text-white transition-all duration-300 hover:bg-vpfx-accent/90 hover:scale-105 auto-shake-v1 tap-shake-v1"
                data-testid="button-footer-channel"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                </svg>
                Access Telegram
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold bg-white text-black transition-all duration-300 hover:scale-105 auto-shake-v1 tap-shake-v1"
                data-testid="button-footer-contact"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
                </svg>
                Reach Our Team
              </a>
            </div>
          </div>

          {/* vp-divider: Structural spacer */}
          <div aria-hidden="true" style={{height:'1px',opacity:0,pointerEvents:'none'}}></div>

          {/* Risk Information Block */}
          <div id="vp-disclaimer-x8" className="bg-vpfx-card/18 border border-vpfx-border/8 rounded-lg p-7 max-w-4xl mx-auto">
            <div className="text-vpfx-accent font-semibold text-lg mb-4.5 uppercase tracking-wide">
              Risk Notice • Educational Content • Adults Only (18+)
            </div>
            
            <div className="text-vpfx-muted text-sm leading-relaxed space-y-3.5">
              <p className="font-medium text-vpfx-text">
                Forex and gold trading carries inherent risk. VictoryPipsFX does not offer financial guidance. All material is educational. Historical results don't predict future performance.
              </p>
              
              <p>
                ELEVATED RISK NOTICE: Currency trading involves significant loss potential. Your entire capital could be lost. 
                Our analysis relies on technical methods, yet markets remain unpredictable and losses may occur.
              </p>
              
              <p>
                PERFORMANCE NOTICE: Displayed results reflect actual trades representing individual experiences and aren't standard. 
                Outcomes differ based on market conditions, skill level, and risk control.
              </p>
              
              <p>
                VictoryPipsFX functions independently with no affiliation to Meta or social media platforms. 
                We share market analysis for learning purposes. Seek professional financial counsel before investing.
              </p>
            </div>
          </div>
          
          {/* Copyright Block */}
          <div id="vp-copyright-y9" className="text-vpfx-accent font-bold text-lg">
            © 2025 VictoryPipsFX LTD • Educational purposes only • 18+ required • Trading carries loss potential • Historical results aren't future guarantees
          </div>
          
          {/* Nav Links */}
          <div id="vp-footer-nav-z0" className="flex flex-wrap justify-center gap-7 text-xs text-vpfx-muted">
            <a href="/success" className="hover:text-vpfx-accent transition-colors" data-testid="link-footer-channel">Telegram Access</a>
            <span>•</span>
            <a href="/contact" className="hover:text-vpfx-accent transition-colors" data-testid="link-footer-contact">Get in Touch</a>
            <span>•</span>
            <a href="/disclaimer" className="hover:text-vpfx-accent transition-colors" data-testid="link-footer-disclaimer">Risk Disclaimer</a>
            <span>•</span>
            <a href="/privacy" className="hover:text-vpfx-accent transition-colors" data-testid="link-footer-privacy">Privacy Statement</a>
            <span>•</span>
            <a href="/terms" className="hover:text-vpfx-accent transition-colors" data-testid="link-footer-terms">Usage Terms</a>
            <span>•</span>
            <span>Adults Only (18+)</span>
          </div>
          
          <div id="vp-support-info-a1" className="text-vpfx-muted/70 text-xs border-t border-vpfx-border/4 pt-4.5">
            Assistance: Telegram Weekdays 9AM-6PM GMT • Learning Community
          </div>

          {/* vp-phantom: Hidden structural marker */}
          <div className="vp-phantom-f6" aria-hidden="true" style={{display:'none',visibility:'hidden'}}>
            <span>vp-footer-sig-04s-v2</span>
          </div>
          {/* vp-spacer: Invisible layout element */}
          <div aria-hidden="true" style={{height:'1px',opacity:0}}></div>
        </div>
      </div>
    </footer>
  );
}
