import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Simulated price path: dips, then recovers above take-profit
const PRICE_PATH = [
  { t: 0, p: 50000 },
  { t: 10, p: 49000 },
  { t: 20, p: 47500 },
  { t: 30, p: 46200 },
  { t: 42, p: 44800 },
  { t: 55, p: 45800 },
  { t: 70, p: 47800 },
  { t: 82, p: 49500 },
  { t: 100, p: 51200 },
];

// Progressive buy orders at preset deviations
const ORDERS = [
  { t: 0, price: 50000, size: 100, label: "Order 1" },
  { t: 20, price: 47500, size: 200, label: "Order 2" },
  { t: 30, price: 46200, size: 400, label: "Order 3" },
  { t: 42, price: 44800, size: 800, label: "Order 4" },
];

// Compute average entry over time as orders fill
type AvgPoint = { t: number; avg: number };
const AVG_PATH: AvgPoint[] = (() => {
  const pts: AvgPoint[] = [];
  let totalSize = 0;
  let totalCost = 0;
  ORDERS.forEach((o) => {
    totalSize += o.size;
    totalCost += o.size * o.price;
    pts.push({ t: o.t, avg: totalCost / totalSize });
  });
  pts.push({ t: 100, avg: pts[pts.length - 1].avg });
  return pts;
})();

const FINAL_AVG = AVG_PATH[AVG_PATH.length - 1].avg; // ~46466
const TAKE_PROFIT = FINAL_AVG * 1.03; // +3% take profit

const MIN_P = 44000;
const MAX_P = 52000;

const priceToY = (price: number) => {
  const ratio = (MAX_P - price) / (MAX_P - MIN_P);
  return Math.max(0, Math.min(1, ratio)) * 100;
};

const MartingaleTradingVisual = () => {
  const pricePathD = PRICE_PATH.map(
    (pt, i) => `${i === 0 ? "M" : "L"} ${pt.t} ${priceToY(pt.p)}`
  ).join(" ");

  // Average price line as stepped path
  const avgPathD = AVG_PATH.map(
    (pt, i) => `${i === 0 ? "M" : "L"} ${pt.t} ${priceToY(pt.avg)}`
  ).join(" ");

  // Find where price crosses TP — between t=82 and t=100 in our path
  // Linear interpolation: price 49500->51200 crosses TAKE_PROFIT (~47860)
  // Already crossed earlier; find first crossing.
  let tpCrossT = 100;
  for (let i = 1; i < PRICE_PATH.length; i++) {
    const a = PRICE_PATH[i - 1];
    const b = PRICE_PATH[i];
    if (a.p < TAKE_PROFIT && b.p >= TAKE_PROFIT) {
      const ratio = (TAKE_PROFIT - a.p) / (b.p - a.p);
      tpCrossT = a.t + ratio * (b.t - a.t);
      break;
    }
  }

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col">
        <h3 className="text-xl font-medium text-torgovo-purple mb-4 text-center">
          Martingale Strategy — BTC/USDT Example
        </h3>

        <div className="relative w-full h-80 border border-border rounded bg-background/40 overflow-hidden">
          {/* Take-profit horizontal line */}
          <div
            className="absolute left-0 w-full"
            style={{ top: `${priceToY(TAKE_PROFIT)}%` }}
          >
            <div className="border-t-2 border-dashed border-green-500" />
            <div className="absolute right-2 -top-3 text-[10px] text-white bg-green-600 px-1.5 py-0.5 rounded">
              Take Profit ${TAKE_PROFIT.toFixed(0)}
            </div>
          </div>

          {/* Final average entry line (for reference label) */}
          <div
            className="absolute left-0 w-full"
            style={{ top: `${priceToY(FINAL_AVG)}%` }}
          >
            <div className="absolute left-2 -top-3 text-[10px] text-torgovo-purple bg-torgovo-purple/15 px-1.5 py-0.5 rounded">
              Avg entry ${FINAL_AVG.toFixed(0)}
            </div>
          </div>

          {/* SVG overlay for paths */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Average entry stepped line */}
            <path
              d={avgPathD}
              stroke="rgb(167 139 250)"
              strokeWidth="0.4"
              strokeDasharray="1.5 1.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Price line */}
            <path
              d={pricePathD}
              stroke="rgb(96 165 250)"
              strokeWidth="0.6"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Order markers — size grows with each entry */}
          {ORDERS.map((order, idx) => {
            const sizeRatio = order.size / ORDERS[ORDERS.length - 1].size;
            const dim = 8 + sizeRatio * 14; // 8px..22px
            return (
              <Tooltip key={order.label}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${order.t}%`, top: `${priceToY(order.price)}%` }}
                    aria-label={`${order.label} at $${order.price}`}
                  >
                    <span
                      className="block rounded-full ring-2 ring-background bg-torgovo-purple"
                      style={{ height: dim, width: dim }}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {order.label}: ${order.size} @ ${order.price.toLocaleString()}
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Position closed marker */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${tpCrossT}%`, top: `${priceToY(TAKE_PROFIT)}%` }}
          >
            <span className="block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-background" />
            <div className="absolute left-4 -top-2 whitespace-nowrap text-[10px] text-green-400 bg-green-500/15 px-1.5 py-0.5 rounded">
              Position closed at profit
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-torgovo-purple" /> Buy order (size grows)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-blue-400" /> Price
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-purple-400/70" /> Avg entry
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-green-500" /> Take profit
          </span>
        </div>

        <p className="text-sm text-muted-foreground mt-3 text-center">
          As price drops, the bot adds progressively larger buy orders, dragging the average
          entry down. When price recovers above the take-profit line, the entire position
          closes in profit.
        </p>
      </div>
    </TooltipProvider>
  );
};

export default MartingaleTradingVisual;
