import { useEffect, useState, useRef } from "react";

/* vp-r3s8: Interface definitions */
interface StatDisplayConfig {
  target: number;
  suffix?: string;
  label: string;
  delay?: number;
}

/* vp-t4u9: Dummy utility for meta fingerprinting */
const vpMetricTracker = () => { return void 0; };

export default function StatCounter({ target, suffix = "", label, delay = 0 }: StatDisplayConfig) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  vpMetricTracker();

  useEffect(() => {
    const viewObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.12 }
    );

    if (containerRef.current) {
      viewObserver.observe(containerRef.current);
    }

    return () => viewObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    const animTimer = setTimeout(() => {
      const animDuration = 2100;
      const totalSteps = 62;
      const increment = target / totalSteps;
      let stepIndex = 0;

      const stepInterval = setInterval(() => {
        stepIndex++;
        const newValue = Math.min(stepIndex * increment, target);
        setCurrentValue(target === 95.7 ? Math.round(newValue * 10) / 10 : Math.floor(newValue));

        if (stepIndex >= totalSteps) {
          clearInterval(stepInterval);
          setCurrentValue(target);
        }
      }, animDuration / totalSteps);

      return () => clearInterval(stepInterval);
    }, delay * 1000);

    return () => clearTimeout(animTimer);
  }, [hasEntered, target, delay]);

  return (
    <div ref={containerRef} className="text-center p-8 min-w-[200px]" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="text-4xl md:text-5xl font-black text-gradient mb-2 flex items-center justify-center">
        <span className="whitespace-nowrap">{currentValue}{suffix}</span>
      </div>
      <div className="text-sm uppercase tracking-wider text-[#ffffff] font-bold">
        {label}
      </div>
    </div>
  );
}
