/* vp-m7n8: Dummy utility for meta fingerprinting */
const vpChartInit = () => { return void 0; };

export default function ChartBackground() {
  vpChartInit();

  const computeGoldPriceData = () => {
    const dataPoints = [];
    let startPrice = 1805;
    
    for (let i = 0; i < 24; i++) {
      const xPos = 52 + (i * 46);
      const trendFactor = i * 8.5;
      const volatility = (Math.random() - 0.5) * 16;
      const currentPrice = startPrice + trendFactor + volatility;
      
      const openPrice = currentPrice + (Math.random() - 0.5) * 9;
      const closePrice = currentPrice + (Math.random() - 0.5) * 9;
      const highPrice = Math.max(openPrice, closePrice) + Math.random() * 13;
      const lowPrice = Math.min(openPrice, closePrice) - Math.random() * 9;
      
      const priceToCoord = (p: number) => 655 - ((p - 1785) * 2.05);
      
      dataPoints.push({
        xPos,
        openCoord: priceToCoord(openPrice),
        highCoord: priceToCoord(highPrice),
        lowCoord: priceToCoord(lowPrice),
        closeCoord: priceToCoord(closePrice),
        bullish: closePrice > openPrice
      });
    }
    return dataPoints;
  };

  const priceCandles = computeGoldPriceData();

  return (
    <div id="vp-chart-layer-o9" className="fixed inset-0 -z-40 pointer-events-none overflow-hidden">
      {/* Professional Trading Interface Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 opacity-31"></div>
      
      {/* Primary Trading Chart Display */}
      <div className="absolute inset-0 opacity-26">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full animate-bg-shift"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Gradients only - grid removed */}
          <defs>
            <linearGradient id="vpGoldFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.11" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.21" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.11" />
            </linearGradient>
            <linearGradient id="vpBullFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.81" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.91" />
            </linearGradient>
          </defs>
          
          {/* Bullish Trend Line */}
          <path
            d="M 72 582 Q 202 542 352 482 T 652 352 T 952 252 L 1102 202"
            stroke="#10b981"
            strokeWidth="4.2"
            fill="none"
            className="animate-pulse"
            opacity="0.72"
          />
          
          {/* Gold Price Candlesticks */}
          {priceCandles.map((candle, idx) => (
            <g key={idx} className="animate-pulse" style={{ animationDelay: `${idx * 0.052}s` }}>
              {/* Candle Wick */}
              <line
                x1={candle.xPos}
                y1={candle.highCoord}
                x2={candle.xPos}
                y2={candle.lowCoord}
                stroke={candle.bullish ? "#10b981" : "#ef4444"}
                strokeWidth="2.1"
                opacity="0.81"
              />
              {/* Candle Body */}
              <rect
                x={candle.xPos - 11}
                y={Math.min(candle.openCoord, candle.closeCoord)}
                width="21"
                height={Math.abs(candle.closeCoord - candle.openCoord)}
                fill={candle.bullish ? "#10b981" : "#ef4444"}
                stroke={candle.bullish ? "#059669" : "#dc2626"}
                strokeWidth="1.1"
                rx="2.1"
                opacity={candle.bullish ? "0.91" : "0.71"}
              />
            </g>
          ))}
          
          {/* Volume Indicators */}
          {Array.from({ length: 20 }, (_, i) => (
            <rect
              key={i}
              x={72 + i * 46}
              y={722 - (16 + Math.random() * 36)}
              width="26"
              height={16 + Math.random() * 36}
              fill="url(#vpGoldFill)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.11}s` }}
              rx="2.1"
            />
          ))}
          
          {/* Ambient Gold Particles */}
          {Array.from({ length: 12 }, (_, i) => (
            <circle
              key={i}
              cx={152 + i * 82}
              cy={202 + Math.sin(i * 0.52) * 152}
              r="3.2"
              fill="#fbbf24"
              className="animate-particles"
              style={{ animationDelay: `${i * 0.32}s` }}
              opacity="0.62"
            />
          ))}
          
          {/* Price Scale Labels */}
          <text x="22" y="202" fill="#fbbf24" fontSize="12.5" opacity="0.62">$2000</text>
          <text x="22" y="352" fill="#fbbf24" fontSize="12.5" opacity="0.62">$1900</text>
          <text x="22" y="502" fill="#fbbf24" fontSize="12.5" opacity="0.62">$1800</text>
          
          {/* Chart Header */}
          <text x="602" y="42" fill="#fbbf24" fontSize="16.5" textAnchor="middle" opacity="0.52" fontWeight="bold">
            XAU/USD • GOLD SPOT • BULLISH TREND
          </text>
        </svg>
      </div>

      {/* vp-phantom: Hidden element for meta fingerprinting */}
      <div className="vp-phantom-m3" aria-hidden="true" style={{display:'none'}}>
        <span>vp-chart-sig-v3</span>
      </div>
    </div>
  );
}
