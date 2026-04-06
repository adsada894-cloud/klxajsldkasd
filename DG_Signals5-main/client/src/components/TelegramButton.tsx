import { MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

/* vp-h9j4: Interface definitions */
interface ChannelButtonConfig {
  href: string;
  variant?: 'compact' | 'expanded';
  customClass?: string;
  children?: React.ReactNode;
}

/* vp-i0k5: Telegram Button Tracking Function */
const vpTrackTelegramClick = () => { 
  try {
    // Meta Pixel Telegram tracking
    if (typeof window !== 'undefined' && typeof fbq === 'function') {
      fbq('track', 'Lead', { 
        content_name: 'Telegram Channel Access',
        content_category: 'Social Channel'
      });
    }
    
    // CAPI Tracking
    if (typeof window !== 'undefined') {
      const event_id = (crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : (Date.now() + "_" + Math.random().toString(16).slice(2));
      
      const payload = {
        event_name: 'Lead',
        event_id: event_id,
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        test_event_code: 'TEST27679',
        custom_data: {
          content_name: 'Telegram Channel Access',
          content_category: 'Social Channel'
        }
      };

      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function(err) { console.log("CAPI Error:", err); });
    }
  } catch (e) {
    console.error("Telegram Tracking Error:", e);
  }
};

export default function ChannelButton({ 
  href, 
  variant = 'expanded', 
  customClass,
  children 
}: ChannelButtonConfig) {
  const [waveEffects, setWaveEffects] = useState<Array<{ uid: number; posX: number; posY: number }>>([]);

  const processClick = (e: MouseEvent<HTMLAnchorElement>) => {
    vpTrackTelegramClick();
    const bounds = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - bounds.left;
    const posY = e.clientY - bounds.top;
    const uid = Date.now();

    setWaveEffects(current => [...current, { uid, posX, posY }]);

    setTimeout(() => {
      setWaveEffects(current => current.filter(wave => wave.uid !== uid));
    }, 820);
  };

  const variantStyles = {
    compact: 'px-6 py-3 text-sm',
    expanded: 'px-8 py-4 text-lg'
  };

  const isLocalRoute = href.startsWith('/');
  
  return (
    <a
      href={href}
      target={isLocalRoute ? undefined : "_blank"}
      rel={isLocalRoute ? undefined : "noopener noreferrer"}
      onClick={processClick}
      data-track-telegram="true"
      data-testid="button-channel-cta"
      className={cn(
        "cta-primary-v3 inline-flex items-center gap-3 rounded-2xl font-black text-vpfx-bg transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-95 motion-safe:hover:shadow-lg motion-safe:active:shadow-sm",
        variantStyles[variant],
        customClass
      )}
    >
      {/* Wave Ripple Effects */}
      {waveEffects.map(wave => (
        <span
          key={wave.uid}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
          style={{
            left: wave.posX,
            top: wave.posY,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Channel Platform Icon */}
      <svg 
        className={cn(
          "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
          variant === 'compact' ? 'w-5 h-5' : 'w-6 h-6'
        )}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.4c.55-.35.84-.16.52.2l-9.58 8.75z" />
      </svg>

      {/* Button Label */}
      <span>{children || "Access Free Channel"}</span>
    </a>
  );
}