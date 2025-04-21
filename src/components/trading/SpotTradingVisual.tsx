
import React from "react";

const SpotTradingVisual = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h3 className="text-xl font-medium text-torgovo-blue mb-4">Spot Trading Visualization</h3>
      <div className="relative w-full h-64 border border-border rounded">
        {/* Background chart pattern */}
        <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full opacity-20">
          <path 
            d="M0,150 C50,120 100,180 150,120 C200,60 250,90 300,40 C350,90 400,20 450,50" 
            fill="none" 
            stroke="#9b87f5" 
            strokeWidth="2"
          />
        </svg>
        
        {/* Entry point */}
        <div className="absolute left-[25%] top-[60%]">
          <div className="w-4 h-4 rounded-full bg-torgovo-blue animate-pulse"></div>
          <div className="absolute left-6 top-0 text-xs text-torgovo-blue">
            Entry Point
          </div>
        </div>
        
        {/* Stop Loss */}
        <div className="absolute left-[25%] top-[80%]">
          <div className="w-full border-t border-destructive/60 border-dashed absolute -left-[25%]"></div>
          <div className="absolute left-6 top-0 text-xs text-destructive">
            Stop Loss
          </div>
        </div>
        
        {/* Take Profit */}
        <div className="absolute left-[60%] top-[30%]">
          <div className="w-4 h-4 rounded-full bg-torgovo-purple animate-pulse"></div>
          <div className="absolute left-6 top-0 text-xs text-torgovo-purple">
            Take Profit
          </div>
        </div>
        
        {/* Indicator zone */}
        <div className="absolute left-[20%] top-[50%] w-[15%] h-[20%] border border-torgovo-blue/40 bg-torgovo-blue/10 rounded"></div>
        <div className="absolute left-2 top-2 text-xs text-muted-foreground">
          RSI &lt; 30: Buy Signal
        </div>
        <div className="absolute right-2 top-2 text-xs text-muted-foreground">
          RSI &gt; 70: Sell Signal
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Spot bots execute precise entries and exits based on your technical indicators, 
        with automatic stop-loss and take-profit management.
      </p>
    </div>
  );
};

export default SpotTradingVisual;
