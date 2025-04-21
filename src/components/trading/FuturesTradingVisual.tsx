
import React from "react";

const FuturesTradingVisual = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h3 className="text-xl font-medium text-torgovo-purple mb-4">Futures Trading Visualization</h3>
      <div className="relative w-full h-64 border border-border rounded">
        {/* Background chart pattern */}
        <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full opacity-20">
          <path 
            d="M0,100 C25,120 50,80 75,110 C100,140 125,60 150,40 C175,20 200,60 225,80 C250,100 275,140 300,120 C325,100 350,60 375,80 C400,100 425,140 450,120" 
            fill="none" 
            stroke="#9b87f5" 
            strokeWidth="2"
          />
        </svg>
        
        {/* Entry point */}
        <div className="absolute left-[30%] top-[55%]">
          <div className="w-4 h-4 rounded-full bg-torgovo-purple animate-pulse"></div>
          <div className="absolute left-6 top-0 text-xs text-torgovo-purple">
            Long Entry (5x Leverage)
          </div>
        </div>
        
        {/* Liquidation price */}
        <div className="absolute left-[30%] top-[85%]">
          <div className="w-full border-t-2 border-destructive border-dashed absolute -left-[30%]"></div>
          <div className="absolute left-6 top-0 text-xs text-destructive">
            Liquidation Price
          </div>
        </div>
        
        {/* Trailing take profit */}
        <div className="absolute left-[70%] top-[20%]">
          <div className="w-full border-t-2 border-torgovo-purple/60 border-dashed absolute -left-[70%] opacity-70"></div>
          <div className="absolute left-6 top-0 text-xs text-torgovo-purple">
            Trailing Take Profit
          </div>
        </div>
        
        {/* Add margin safety */}
        <div className="absolute left-[50%] top-[75%]">
          <div className="px-2 py-1 bg-torgovo-blue/20 text-xs rounded border border-torgovo-blue/40">
            Add Margin Safety
          </div>
        </div>
        
        {/* 5-second check indicators */}
        {[20, 40, 60, 80].map((pos, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-torgovo-purple" style={{ left: `${pos}%`, bottom: '5px' }}></div>
        ))}
        <div className="absolute bottom-1 left-2 text-xs text-muted-foreground">
          5-second price checks
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Futures bots use leverage to amplify potential returns while our advanced risk management 
        systems help protect against liquidation events.
      </p>
    </div>
  );
};

export default FuturesTradingVisual;
