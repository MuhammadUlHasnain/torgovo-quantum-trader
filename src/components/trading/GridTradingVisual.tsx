
import React from "react";

const GridTradingVisual = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h3 className="text-xl font-medium text-torgovo-blue mb-4">Grid Trading Visualization</h3>
      <div className="relative w-full h-64 border border-border rounded">
        {/* Price line */}
        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between py-4">
          <div className="text-xs text-muted-foreground px-2">Upper Price: $50,000</div>
          <div className="text-xs text-muted-foreground px-2">Lower Price: $40,000</div>
        </div>
        
        {/* Grid lines - Buy orders */}
        {[0, 1, 2, 3, 4].map((index) => (
          <div 
            key={`buy-${index}`}
            className="absolute left-0 w-full border-t border-torgovo-blue/40" 
            style={{ top: `${20 + index * 16}%` }}
          >
            <div className="absolute left-2 -top-3 text-xs text-torgovo-blue">
              Buy ${(46000 - index * 1500).toLocaleString()}
            </div>
          </div>
        ))}
        
        {/* Grid lines - Sell orders */}
        {[0, 1, 2, 3, 4].map((index) => (
          <div 
            key={`sell-${index}`}
            className="absolute left-0 w-full border-t border-torgovo-purple/40" 
            style={{ bottom: `${20 + index * 16}%` }}
          >
            <div className="absolute left-2 -top-3 text-xs text-torgovo-purple">
              Sell ${(44000 + index * 1500).toLocaleString()}
            </div>
          </div>
        ))}
        
        {/* Price line */}
        <div className="absolute left-0 top-[50%] w-full border-t-2 border-dashed border-white/60">
          <div className="absolute right-2 -top-3 text-xs text-white bg-background/80 px-1">
            Current: $45,000
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Grid bots place buy orders below the current price and sell orders above it, 
        automatically profiting from price oscillations within the defined range.
      </p>
    </div>
  );
};

export default GridTradingVisual;
