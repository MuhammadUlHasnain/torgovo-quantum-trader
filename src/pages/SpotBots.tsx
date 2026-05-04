
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import FeatureSection from "@/components/ui/feature-section";
import BotTabs from "@/components/trading/BotTabs";
import BotFaqSection from "@/components/trading/BotFaqSection";
import SpotTradingVisual from "@/components/trading/SpotTradingVisual";
import ComparisonTable from "@/components/ui/comparison-table";
import { Link } from "react-router-dom";

const SpotBots = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="SPOT Trading Bots"
        subtitle="Automated bots that trade spot markets with precision and efficiency."
      >
        <Button className="bg-accent-primary hover:bg-accent-primary/90" asChild>
          <Link to="/pricing?type=signal">Subscribe Now</Link>
        </Button>
      </HeroSection>
      
      <BotTabs activeTab="spot" />
      
      <div className="container py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Spot Trading Automation</h2>
            <p className="text-muted-foreground">
              Spot trading bots execute single orders at optimal prices based on your predefined strategy.
              Unlike grid or martingale bots that place multiple orders, spot bots focus on precision
              execution at specific price points or based on technical indicators.
            </p>
            <p className="text-muted-foreground">
              Our spot bots can execute market orders, limit orders, or use a combination of strategies
              to enter and exit positions. They're perfect for traders who want to automate their existing
              manual trading strategies with precise execution parameters.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-torgovo-purple">Key Features</h3>
              <ul className="space-y-3">
                {[
                  "Single order execution with precision timing",
                  "Market and limit order options",
                  "Automatic stop-loss and take-profit placement",
                  "Multi-pair support across exchanges",
                  "Technical indicator-based entry and exit"
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
            <SpotTradingVisual />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Use Cases for Spot Trading Bots</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Technical Analysis Execution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure bots to execute trades when specific technical indicators align, 
                  such as MACD crossovers, RSI thresholds, or moving average convergences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>News-Based Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set bots to monitor exchange announcements and market news, executing trades 
                  when specific keywords or events occur to capture early market movements.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>DCA Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automate dollar-cost averaging strategies by scheduling regular purchases 
                  at set intervals, regardless of price, to build positions over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Manual vs. Automated Spot Trading</h2>
          <div className="glass-card p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-torgovo-blue">Manual Trading</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Full control over each trade decision</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Requires constant market monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Subject to emotional decision-making</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Limited by human attention span</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Can adapt quickly to unexpected events</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-torgovo-purple">Automated Trading</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Executes 24/7 without fatigue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Eliminates emotional trading decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Consistent execution of strategy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Can monitor multiple markets simultaneously</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Requires clear predefined parameters</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customization Options</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Entry Conditions",
                description: "Price levels, indicator values, time-based entries, or volume thresholds"
              },
              {
                title: "Order Types",
                description: "Market, limit, stop-limit, trailing stop, or conditional orders"
              },
              {
                title: "Risk Parameters",
                description: "Position sizing, stop-loss placement, and exposure limits"
              },
              {
                title: "Take Profit Strategies",
                description: "Fixed targets, trailing takes, or partial exit strategies"
              },
              {
                title: "Time Filters",
                description: "Set trading hours, days, or avoid high volatility periods"
              },
              {
                title: "Notifications",
                description: "Custom alerts via email, SMS, or webhooks for important events"
              }
            ].map((option) => (
              <Card key={option.title} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <ComparisonTable
          title="Bot Type Comparison"
          subtitle="See how our Spot Bot compares with other trading strategies"
          competitors={["Futures Bots", "Martingale Bots", "AI Powered Grid Bot"]}
          features={[
            {
              name: "Risk Level",
              aiGridBot: "Low",
              competitor1: "High",
              competitor2: "Medium-High",
              competitor3: "Low-Medium"
            },
            {
              name: "Capital Efficiency",
              aiGridBot: "Low",
              competitor1: "High",
              competitor2: "Medium",
              competitor3: "Medium"
            },
            {
              name: "Profit from Volatility",
              aiGridBot: false,
              competitor1: true,
              competitor2: true,
              competitor3: true
            },
            {
              name: "Suitable for Sideways Markets",
              aiGridBot: false,
              competitor1: false,
              competitor2: true,
              competitor3: true
            },
            {
              name: "Technical Knowledge Required",
              aiGridBot: "Low",
              competitor1: "High",
              competitor2: "Medium",
              competitor3: "Medium"
            }
          ]}
          className="mt-16 container mb-12"
        />
        
        <BotFaqSection 
          title="Frequently Asked Questions About Spot Bots"
          faqs={[
            {
              question: "How do spot trading bots differ from grid bots?",
              answer: "Spot bots execute single entry and exit orders based on specific conditions, while grid bots place multiple orders at different price levels to profit from volatility."
            },
            {
              question: "Can I use technical indicators with spot bots?",
              answer: "Yes! Our spot bots can be configured to enter or exit positions based on over 30 technical indicators including RSI, MACD, Bollinger Bands, and moving averages."
            },
            {
              question: "What's the minimum capital needed for spot trading bots?",
              answer: "You can start with as little as $100, though having at least $500-$1,000 is recommended for more flexibility in position sizing and multiple pairs."
            },
            {
              question: "Can spot bots trade on multiple exchanges?",
              answer: "Yes, depending on your subscription tier, you can configure spot bots to trade across different exchanges, allowing for arbitrage strategies or diversification."
            }
          ]}
          className="mt-16"
        />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Automate Your Spot Trading?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Start using our powerful spot trading bots today. Set up your first bot in minutes and let it execute your strategy with precision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
              Create Spot Bot
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

export default SpotBots;
