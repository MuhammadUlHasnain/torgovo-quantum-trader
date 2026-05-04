import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Realistic BTC grid example
const UPPER = 50000;
const LOWER = 40000;
const CURRENT = 44800;

const LEVELS = [40000, 42000, 44000, 46000, 48000, 50000];

// Simulated price path that crossed levels and triggered orders.
// Each point: time t (0-100%) and price.
const PRICE_PATH = [
  { t: 0, p: 47000 },
  { t: 12, p: 48100 }, // triggered sell @ 48000
  { t: 22, p: 49900 }, // triggered sell @ 50000 (just below)
  { t: 35, p: 46100 }, // triggered sell @ 46000 confirm
  { t: 48, p: 43900 }, // triggered buy @ 44000
  { t: 60, p: 41900 }, // triggered buy @ 42000
  { t: 72, p: 39900 }, // triggered buy @ 40000
  { t: 85, p: 43000 },
  { t: 100, p: CURRENT },
];

// Triggered order markers along the path
const TRIGGERED = [
  { t: 12, price: 48000, side: "sell", qty: "0.018 BTC" },
  { t: 35, price: 46000, side: "sell", qty: "0.020 BTC" },
  { t: 48, price: 44000, side: "buy", qty: "0.022 BTC" },
  { t: 60, price: 42000, side: "buy", qty: "0.024 BTC" },
  { t: 72, price: 40000, side: "buy", qty: "0.025 BTC" },
];

const priceToY = (price: number) => {
  // 0 = top (UPPER), 1 = bottom (LOWER)
  const ratio = (UPPER - price) / (UPPER - LOWER);
  return Math.max(0, Math.min(1, ratio)) * 100;
};

const GridTradingVisual = () => {
  const pathD = PRICE_PATH.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.t} ${priceToY(pt.p)}`).join(" ");

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col">
        <h3 className="text-xl font-medium text-torgovo-blue mb-4 text-center">
          Grid Trading — BTC/USDT Example
        </h3>

        <div className="relative w-full h-80 border border-border rounded bg-background/40 overflow-hidden">
          {/* Grid lines */}
          {LEVELS.map((price) => {
            const isSell = price > CURRENT;
            const y = priceToY(price);
            return (
              <div
                key={price}
                className="absolute left-0 w-full"
                style={{ top: `${y}%` }}
              >
                <div
                  className={`border-t ${
                    isSell ? "border-orange-500/50" : "border-green-500/50"
                  }`}
                />
                <div className="flex items-center justify-between px-2 -mt-2">
                  <span
                    className={`text-[10px] font-medium px-1.5 rounded ${
                      isSell
                        ? "text-orange-400 bg-orange-500/10"
                        : "text-green-400 bg-green-500/10"
                    }`}
                  >
                    {isSell ? "Sell" : "Buy"} ${price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted-foreground">${price.toLocaleString()}</span>
                </div>
              </div>
            );
          })}

          {/* Current price marker */}
          <div
            className="absolute left-0 w-full"
            style={{ top: `${priceToY(CURRENT)}%` }}
          >
            <div className="border-t-2 border-dashed border-torgovo-purple" />
            <div className="absolute right-2 -top-3 text-[10px] text-white bg-torgovo-purple px-1.5 py-0.5 rounded">
              Current ${CURRENT.toLocaleString()}
            </div>
          </div>

          {/* Price line chart (SVG overlay) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d={pathD}
              stroke="hsl(var(--torgovo-blue, 200 100% 60%))"
              strokeWidth="0.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "rgb(96 165 250)" }}
            />
          </svg>

          {/* Triggered order markers */}
          {TRIGGERED.map((order) => (
            <Tooltip key={`${order.t}-${order.price}`}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${order.t}%`, top: `${priceToY(order.price)}%` }}
                  aria-label={`${order.side} order at $${order.price}`}
                >
                  <span
                    className={`block h-3 w-3 rounded-full ring-2 ring-background ${
                      order.side === "sell" ? "bg-orange-500" : "bg-green-500"
                    }`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {order.side === "buy" ? "Bought" : "Sold"} {order.qty} @ ${order.price.toLocaleString()}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-orange-500" /> Sell triggered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Buy triggered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-blue-400" /> Price
          </span>
        </div>

        <p className="text-sm text-muted-foreground mt-3 text-center">
          Range ${LOWER.toLocaleString()} – ${UPPER.toLocaleString()} with 6 grid levels.
          Buy orders fill below current price; sell orders fill above. Hover any marker
          to see what was filled.
        </p>
      </div>
    </TooltipProvider>
  );
};

export default GridTradingVisual;
