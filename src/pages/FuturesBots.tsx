import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, AlertTriangle, Shield, Clock, LineChart, BadgePercent } from "lucide-react";
import FeatureSection from "@/components/ui/feature-section";
import BotTabs from "@/components/trading/BotTabs";
import BotFaqSection from "@/components/trading/BotFaqSection";
import FuturesTradingVisual from "@/components/trading/FuturesTradingVisual";
import ComparisonTable from "@/components/ui/comparison-table";

const FuturesBots = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="FUTURES Trading Bots"
        subtitle="Advanced automated trading with leverage for experienced traders to maximize potential returns."
      >
        <Button className="bg-torgovo-purple hover:bg-torgovo-purple/80">
          Create FUTURES Bot
        </Button>
      </HeroSection>
      
      <BotTabs activeTab="futures" />
      
      <div className="container py-12">
        <div className="p-4 border border-destructive/40 rounded-md bg-destructive/10 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h4 className="font-medium text-destructive">High Risk Warning</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Futures trading involves substantial risk of loss and is not suitable for all investors. 
            Trading with leverage can work against you as well as for you and can lead to large losses 
            as well as gains. Please ensure you fully understand the risks before trading.
          </p>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Futures Trading Automation</h2>
            <p className="text-muted-foreground">
              Futures trading bots allow traders to speculate on price movements using leverage, 
              potentially amplifying both profits and losses. Our bots implement sophisticated 
              risk management algorithms to help protect your capital while seeking optimal 
              entry and exit points.
            </p>
            <p className="text-muted-foreground">
              With our 5-second price checking mechanism, futures bots continuously monitor market 
              conditions and can rapidly respond to sudden price movements, helping to capture 
              opportunities and mitigate risks in highly volatile markets.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-torgovo-purple">Key Features</h3>
              <ul className="space-y-3">
                {[
                  "Leverage trading with customizable multipliers",
                  "Advanced liquidation protection systems",
                  "Position sizing algorithms based on risk percentage",
                  "5-second price checking mechanism",
                  "Trailing stop-loss and take-profit settings",
                  "Cross and isolated margin options"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-torgovo-purple mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <FuturesTradingVisual />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Essential Risk Management Tools</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center gap-2">
                <Shield className="h-6 w-6 text-torgovo-purple" />
                <CardTitle className="text-lg">Liquidation Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Smart algorithms that automatically adjust positions when approaching 
                  liquidation levels, reducing position size or adding margin as needed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center gap-2">
                <BadgePercent className="h-6 w-6 text-torgovo-purple" />
                <CardTitle className="text-lg">Dynamic Position Sizing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Calculate optimal position sizes based on account size, risk tolerance, 
                  and market volatility rather than fixed amounts.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center gap-2">
                <LineChart className="h-6 w-6 text-torgovo-purple" />
                <CardTitle className="text-lg">Adaptive Leverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Automatically adjusts leverage based on market volatility, using higher 
                  leverage in less volatile conditions and reducing it during high volatility.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center gap-2">
                <Clock className="h-6 w-6 text-torgovo-purple" />
                <CardTitle className="text-lg">Time-Based Exit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Set maximum duration for trades to avoid holding positions for too long, 
                  helping to reduce risk exposure during unfavorable market periods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">5-Second Price Checking Mechanism</h2>
          <div className="glass-card p-6">
            <p className="text-muted-foreground mb-6">
              Our proprietary 5-second price checking system continuously monitors market conditions 
              and executes your strategy with precision timing. Here's how it works:
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-torgovo-purple flex items-center justify-center">
                  <span className="font-bold text-white">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Real-Time Market Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Every 5 seconds, the bot analyzes current price, volume, and order book depth 
                    across multiple data sources for the most accurate market view.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-torgovo-purple flex items-center justify-center">
                  <span className="font-bold text-white">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Rapid Decision Making</h3>
                  <p className="text-muted-foreground text-sm">
                    The algorithm evaluates your strategy conditions against current market data 
                    and makes trading decisions within milliseconds.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-torgovo-purple flex items-center justify-center">
                  <span className="font-bold text-white">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Dynamic Risk Adjustment</h3>
                  <p className="text-muted-foreground text-sm">
                    Continuously recalculates position risk and adjusts stop-loss and take-profit 
                    levels based on current market volatility.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-torgovo-purple flex items-center justify-center">
                  <span className="font-bold text-white">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Execution Optimization</h3>
                  <p className="text-muted-foreground text-sm">
                    Places and modifies orders with optimal execution parameters to minimize slippage 
                    and maximize fill rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Advanced Settings</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Leverage Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure leverage from 1x to 125x depending on your risk tolerance and 
                  exchange limits. Our system includes safeguards to prevent excessive leverage 
                  in high-volatility conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Hedging Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set up simultaneous long and short positions to hedge market exposure, with custom 
                  correlation settings to optimize hedge ratios based on historical data.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Funding Rate Arbitrage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically capture funding rate differentials between perpetual futures 
                  contracts by opening positions before funding payments and closing afterward.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Performance Metrics Visualization</h2>
          <div className="glass-card p-6 text-center">
            <p className="text-muted-foreground mb-8">
              Our advanced analytics dashboard provides real-time performance monitoring of your futures trading bots.
            </p>
            <div className="h-64 flex items-center justify-center border border-border rounded-md">
              <p className="text-muted-foreground">Performance visualization dashboard placeholder</p>
            </div>
            <div className="mt-6 grid gap-8 md:grid-cols-4">
              {[
                {
                  metric: "Win Rate",
                  value: "62.4%",
                  comparison: "+4.2% vs. manual"
                },
                {
                  metric: "Avg. R:R Ratio",
                  value: "2.4:1",
                  comparison: "Target: 2:1"
                },
                {
                  metric: "Max Drawdown",
                  value: "12.7%",
                  comparison: "Limit: 15%"
                },
                {
                  metric: "Monthly Return",
                  value: "14.8%",
                  comparison: "±8.3% σ"
                }
              ].map((item) => (
                <div key={item.metric} className="text-center space-y-2">
                  <h3 className="text-lg font-medium text-muted-foreground">{item.metric}</h3>
                  <p className="text-3xl font-bold text-torgovo-purple">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.comparison}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <ComparisonTable
          title="Bot Type Comparison"
          subtitle="See how our Futures Bot compares with other trading strategies"
          competitors={["Spot Bots", "Martingale Bots", "AI Powered Grid Bot"]}
          features={[
            {
              name: "Leverage Trading",
              aiGridBot: true,
              competitor1: false,
              competitor2: true,
              competitor3: false
            },
            {
              name: "Capital Efficiency",
              aiGridBot: "High",
              competitor1: "Low",
              competitor2: "Medium",
              competitor3: "Medium"
            },
            {
              name: "Risk Level",
              aiGridBot: "High",
              competitor1: "Low",
              competitor2: "Medium-High",
              competitor3: "Low-Medium"
            },
            {
              name: "Profit Potential",
              aiGridBot: "Very High",
              competitor1: "Medium",
              competitor2: "High",
              competitor3: "Medium"
            },
            {
              name: "Market Adaptability",
              aiGridBot: "High",
              competitor1: "Medium",
              competitor2: "Low",
              competitor3: "High"
            }
          ]}
          className="mt-16"
        />
        
        <BotFaqSection 
          title="Frequently Asked Questions About Futures Bots"
          faqs={[
            {
              question: "What experience level is recommended for futures bots?",
              answer: "We recommend futures bots only for traders with at least 6-12 months of experience in spot trading and a solid understanding of leverage, liquidation risks, and futures markets."
            },
            {
              question: "How much capital should I allocate to futures trading?",
              answer: "Only trade with risk capital you can afford to lose. We recommend starting with no more than 5-10% of your total trading portfolio for futures trading due to its higher risk profile."
            },
            {
              question: "Can futures bots handle both long and short positions?",
              answer: "Yes, our futures bots can be configured for long-only, short-only, or bi-directional trading based on your strategy preferences and market outlook."
            },
            {
              question: "How does the liquidation protection system work?",
              answer: "Our system monitors your positions in real-time and employs three layers of protection: early warning alerts, automatic position sizing reduction, and emergency stop-out procedures if market moves too quickly."
            }
          ]}
          className="mt-16"
        />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Futures Trading?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Leverage your trading with our advanced futures bots. Build your strategy, set your risk parameters, and let our bots execute with precision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-torgovo-purple hover:bg-torgovo-purple/80">
              Create FUTURES Bot
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              View Tutorial <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FuturesBots;
