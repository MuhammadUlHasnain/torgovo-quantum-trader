import type { ComparisonFeature } from "./comparison-table";

export const botComparisonFeatures: ComparisonFeature[] = [
  {
    name: "Risk Level",
    signal: "User-defined",
    grid: "Low-Medium",
    martingale: "Medium-High",
    quantumAi: "Low-Medium",
  },
  {
    name: "Suitable for Sideways Markets",
    signal: false,
    grid: true,
    martingale: false,
    quantumAi: true,
  },
  {
    name: "Suitable for Trending Markets",
    signal: true,
    grid: false,
    martingale: true,
    quantumAi: true,
  },
  {
    name: "Profit from Volatility",
    signal: false,
    grid: true,
    martingale: true,
    quantumAi: true,
  },
  {
    name: "Capital Efficiency",
    signal: "Medium",
    grid: "Medium",
    martingale: "Medium",
    quantumAi: "High",
  },
  {
    name: "Automation Level",
    signal: "Signal-driven",
    grid: "Fully automated",
    martingale: "Fully automated",
    quantumAi: "AI-managed",
  },
  {
    name: "Technical Knowledge Required",
    signal: "Medium",
    grid: "Low",
    martingale: "Medium",
    quantumAi: "Low",
  },
  {
    name: "Requires TradingView",
    signal: true,
    grid: false,
    martingale: false,
    quantumAi: false,
  },
];
