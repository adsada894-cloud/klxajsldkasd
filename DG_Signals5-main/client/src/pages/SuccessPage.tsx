import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [timeRemaining, setTimeRemaining] = useState(6);
  const channelDestination = "https://t.me/+wrdCCR1ReiAyYzVk";

  useEffect(() => {
    // STEP 1: Fire Lead event FIRST (before any redirect)
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'Lead');
      console.log('[v11] Lead event fired');
    }

    // STEP 2: Google Analytics tracking
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Success Confirmation',
        page_location: window.location.href
      });
    }

    // STEP 3: DOM interaction listener for Meta validation
    const continueBtn = document.getElementById("continue-btn-dg4");
    if (continueBtn) {
      continueBtn.addEventListener("click", function() {
        console.log("Lead confirmation interaction registered.");
        // Manual redirect on button click
        window.location.href = channelDestination;
      });
    }

    // STEP 4: Countdown timer - redirect AFTER 6 seconds (after Lead fires)
    const countdown = setInterval(() => {
      setTimeRemaining((current) => {
        if (current <= 1) {
          clearInterval(countdown);
          window.location.href = channelDestination;
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div id="confirmation-box-dg4" className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-cyan-500/20">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Success — Your Access Is Confirmed
        </h1>
        
        <p className="text-gray-300 mb-6">
          You will be redirected to our Telegram channel shortly.
        </p>
        
        <div className="text-cyan-400 text-lg mb-6">
          Redirecting in <span className="font-bold">{timeRemaining}</span> seconds...
        </div>
        
        <button
          id="continue-btn-dg4"
          data-testid="button-continue"
          className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Continue Now
        </button>
        
        <p className="text-gray-500 text-sm mt-4">
          Click the button above if you're not redirected automatically.
        </p>
      </div>
      
      {/* Fingerprint marker */}
      <div style={{height: '1px', opacity: 0}} data-success-fp="dg4" aria-hidden="true" />
    </div>
  );
}
