import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  const telegramUrl = "https://t.me/+qyTeUgsGYGdhY2M8";

  useEffect(() => {
    // Google Analytics tracking only - NO Lead event here
    // Lead event fires on /join page only
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Thank You',
        page_location: window.location.href
      });
    }
  }, []);

  const handleTelegramClick = () => {
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'telegram_button_click', {
        event_category: 'engagement',
        event_label: 'thank_you_page_telegram'
      });
    }
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center p-4">
      {/* Enhanced Background System */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="backdrop-blend-v1 backdrop-morph absolute inset-0" />
        <div className="backdrop-dots-v1 dots-drift absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vpfx-bg/15 to-vpfx-bg/35" />
      </div>
      
      <div className="max-w-md w-full surface-panel-v2 rounded-2xl p-8 text-center relative z-10">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2" data-testid="text-thankyou-title">
            You're Almost There!
          </h1>
          <p className="text-gray-300" data-testid="text-thankyou-description">
            Click the button below to join our Telegram community and start receiving free signals.
          </p>
        </div>

        <div className="mb-6 p-4 bg-cyan-900/30 rounded-xl border border-cyan-500/20">
          <p className="text-cyan-300 text-sm font-medium mb-2">What you'll get:</p>
          <ul className="text-gray-300 text-sm space-y-1 text-left">
            <li>✓ Free daily gold & forex signals</li>
            <li>✓ Market analysis & insights</li>
            <li>✓ Educational trading content</li>
            <li>✓ Community support</li>
          </ul>
        </div>

        <Button 
          onClick={handleTelegramClick}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-6 text-lg font-bold"
          data-testid="button-join-telegram"
        >
          <svg 
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M9.04 15.3l-.38 5.33c.54 0 .78-.23 1.06-.5l2.55-2.45 5.29 3.87c.97.53 1.67.25 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.45-1.67L1.1 9.46c-1.41.55-1.39 1.34-.24 1.7l5.1 1.59 11.85-7.48c.56-.34 1.06-.15.64.21L9.04 15.3z"/>
          </svg>
          Join Telegram Community
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          By joining, you agree to our community guidelines
        </p>
      </div>
    </div>
  );
}
