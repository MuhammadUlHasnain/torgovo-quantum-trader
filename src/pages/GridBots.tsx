import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import FeatureSection from "@/components/ui/feature-section";
import { Link } from "react-router-dom";
import ComparisonTable from "@/components/ui/comparison-table";
import BotTabs from "@/components/trading/BotTabs";
import GridTradingVisual from "@/components/trading/GridTradingVisual";
import BotFaqSection from "@/components/trading/BotFaqSection";
import TestimonialSection from "@/components/ui/testimonial-section";

const GridBots = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="GRID Trading Bots"
        subtitle="Automate your trading with powerful GRID bot strategies that work in any market condition."
      >
        <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
          Create GRID Bot
        </Button>
      </HeroSection>
      
      <BotTabs activeTab="grid" />
      
      <div className="container py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Grid Trading Strategy</h2>
            <p className="text-muted-foreground">
              Grid trading is a strategy that places multiple buy and sell orders at
              set intervals around a set price. This allows you to profit from market
              volatility within a range.
            </p>
            <p className="text-muted-foreground">
              When the price rises and hits a sell grid line, the bot automatically sells. When the price falls 
              and hits a buy grid line, it automatically buys. This creates a constant flow of small profits 
              regardless of the market direction, ideal for sideways or ranging markets with predictable 
              volatility.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-torgovo-purple">Key Benefits</h3>
              <ul className="space-y-3">
                {[
                  "Profit in sideways markets where other strategies struggle",
                  "Automated buying low and selling high without emotions",
                  "Customizable risk parameters for different market conditions",
                  "Works 24/7 without requiring constant monitoring"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-torgovo-purple mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <GridTradingVisual />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Set Your Range",
                description: "Define upper and lower price limits where you expect the asset to trade"
              },
              {
                step: "2",
                title: "Define Grid Lines",
                description: "Choose how many grid lines to place within your range (more lines = more trades)"
              },
              {
                step: "3",
                title: "Allocate Capital",
                description: "Decide how much capital to commit to the strategy"
              },
              {
                step: "4",
                title: "Let Bot Trade",
                description: "The bot automatically buys at lower grids and sells at higher grid lines"
              }
            ].map((item) => (
              <Card key={item.step} className="glass-card">
                <CardHeader>
                  <div className="h-8 w-8 rounded-full bg-torgovo-purple flex items-center justify-center mb-2">
                    <span className="font-bold text-white">{item.step}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Parameter Explanations</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Grid Size & Spacing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Grid size determines how many grid lines exist within your price range. More grids mean smaller 
                  profits per trade but more trading opportunities. Grid spacing can be arithmetic (equal dollar amounts) 
                  or geometric (percentage-based) depending on market volatility.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Price Range Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Define upper and lower price limits where you believe the asset will trade. A wider range 
                  captures more price movement but requires more capital. A narrower range requires less capital 
                  but risks the price breaking out of your grid.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Risk Management Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set stop-loss parameters to protect your capital in case of extreme market movements. You can also 
                  set take-profit targets for the entire grid and adjust position sizing for individual grid lines.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Rebalancing Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure how the bot should behave when price approaches or breaks your grid boundaries. Options 
                  include automatic grid shifting, grid expansion, or switching to a different strategy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 glass-card p-6">
          <h2 className="text-2xl font-bold mb-6">Grid Bot Performance Metrics</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                metric: "Avg. Monthly Return",
                value: "4.3% - 12.8%",
                description: "Based on BTC/USDT ranging markets"
              },
              {
                metric: "Win Rate",
                value: "94.7%",
                description: "Percentage of profitable grid setups"
              },
              {
                metric: "Avg. Trade Profit",
                value: "0.15% - 0.45%",
                description: "Profit per completed grid trade"
              }
            ].map((item) => (
              <div key={item.metric} className="text-center space-y-2">
                <h3 className="text-lg font-medium text-muted-foreground">{item.metric}</h3>
                <p className="text-3xl font-bold text-torgovo-purple">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 border border-yellow-600/30 rounded-md bg-yellow-600/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-600">Performance Disclaimer</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Past performance is not indicative of future results. The metrics shown are based on historical 
              backtests and simulations. Actual results may vary depending on market conditions, parameters 
              used, and capital deployed.
            </p>
          </div>
        </div>
        
        <TestimonialSection 
          title="What Traders Say About Our Grid Bots"
          testimonials={[
            {
              content: "I've tried several grid bots, but Torgovo's implementation is by far the most intuitive and profitable. The custom parameters give me exactly the control I need.",
              author: "Michael K.",
              role: "Day Trader, 3 years"
            },
            {
              content: "The grid strategy has transformed my crypto trading. Even in sideways markets, I'm consistently making 5-8% monthly without having to watch charts all day.",
              author: "Sarah L.",
              role: "Part-time Trader"
            },
            {
              content: "As an institution, we need reliable automation. Torgovo's grid bots have been running flawlessly for over a year, generating steady returns for our clients.",
              author: "David M.",
              role: "Portfolio Manager"
            }
          ]}
          className="mt-16"
        />
        
        <BotFaqSection 
          title="Frequently Asked Questions About Grid Bots"
          faqs={[
            {
              question: "What market conditions are best for grid bots?",
              answer: "Grid bots perform best in sideways or ranging markets with predictable volatility. They struggle in strong trending markets unless the grid range is very wide."
            },
            {
              question: "How much capital should I allocate to a grid strategy?",
              answer: "This depends on your risk tolerance and the specific asset, but typically we recommend starting with at least $500-$1,000 to ensure your grid has enough order density."
            },
            {
              question: "Can I use grid bots for multiple pairs simultaneously?",
              answer: "Yes! Depending on your subscription tier, you can run multiple grid bots on different trading pairs to diversify your automated trading strategy."
            },
            {
              question: "What happens if the price breaks out of my grid range?",
              answer: "If price breaks out above your range, your bot will hold the asset and wait. If it breaks below, your bot will be fully invested. You can set automatic rebalancing options to handle these scenarios."
            }
          ]}
          className="mt-16"
        />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Grid Trading?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Begin your automated grid trading journey today. Create your first grid bot in under 5 minutes and start capturing profits from market volatility.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
              Create GRID Bot
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              View Tutorial <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ComparisonTable
          title="Bot Type Comparison"
          subtitle="See how Grid bots compare with other trading strategies"
          competitors={["Spot Bots", "Futures Bots", "Martingale Bots"]}
          features={[
            {
              name: "Suitable for Sideways Markets",
              torgovo: true,
              competitor1: false,
              competitor2: true,
              competitor3: true
            },
            {
              name: "Profit from Volatility",
              torgovo: true,
              competitor1: false,
              competitor2: true,
              competitor3: true
            },
            {
              name: "Risk Level",
              torgovo: "Low-Medium",
              competitor1: "Low",
              competitor2: "High",
              competitor3: "Medium-High"
            },
            {
              name: "Capital Efficiency",
              torgovo: "Medium",
              competitor1: "Low",
              competitor2: "High",
              competitor3: "Medium"
            },
            {
              name: "Technical Knowledge Required",
              torgovo: "Medium",
              competitor1: "Low",
              competitor2: "High",
              competitor3: "Medium"
            }
          ]}
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default GridBots;
