import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, AlertTriangle } from "lucide-react";
import BotTabs from "@/components/trading/BotTabs";
import BotFaqSection from "@/components/trading/BotFaqSection";
import FuturesTradingVisual from "@/components/trading/FuturesTradingVisual";
import ComparisonTable from "@/components/ui/comparison-table";

const FuturesBots = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="FUTURES Trading Bots"
        subtitle="Automated bots that trade futures contracts with leverage and precision."
      >
        <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
          Create Futures Bot
        </Button>
      </HeroSection>

      <BotTabs activeTab="futures" />

      <div className="container py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            What are Futures Trading Bots?
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Futures trading bots are automated systems designed to execute
                trades on futures exchanges. They leverage sophisticated
                algorithms to analyze market data and make informed trading
                decisions.
              </p>
              <p className="text-muted-foreground">
                These bots can operate 24/7, capitalizing on opportunities
                across different time zones and market conditions. They are
                particularly useful for managing the complexities of futures
                contracts, such as margin requirements and expiration dates.
              </p>
              <div className="p-4 border border-yellow-600/30 rounded-md bg-yellow-600/10 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-600">
                    Leverage Warning
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Trading futures involves substantial risk due to leverage.
                  While it can amplify profits, it can also magnify losses.
                  Always use risk management tools and understand the
                  implications of leverage.
                </p>
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-medium text-torgovo-blue mb-4">
                Key Features
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-torgovo-blue mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Automated order execution
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-torgovo-blue mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    24/7 operation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-torgovo-blue mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Risk management tools
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-torgovo-blue mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Customizable strategies
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Futures Bot Advantages
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Leverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Futures bots can utilize leverage to control larger positions
                  with less capital, amplifying potential profits.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Hedging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bots can be configured to hedge against existing positions,
                  reducing overall portfolio risk.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Market Neutrality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Futures bots can profit from both rising and falling markets,
                  offering opportunities in various market conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Popular Futures Strategies
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Trend Following</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bots identify and follow market trends, entering long
                  positions in uptrends and short positions in downtrends.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Mean Reversion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bots capitalize on price deviations from the average, buying
                  when prices are low and selling when prices are high.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Risk Management</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Stop-Loss Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set stop-loss orders to automatically exit positions when
                  prices move against you, limiting potential losses.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Position Sizing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adjust position sizes based on your risk tolerance and market
                  volatility to manage capital effectively.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ComparisonTable
        title="Bot Type Comparison"
        subtitle="See how our Futures Bot compares with other trading strategies"
        competitors={["Spot Bots", "Martingale Bots", "AI Powered Grid Bot"]}
        features={[
          {
            name: "Risk Level",
            aiGridBot: "High",
            competitor1: "Low",
            competitor2: "Medium-High", 
            competitor3: "Low-Medium"
          },
          {
            name: "Capital Efficiency",
            aiGridBot: "High",
            competitor1: "Low",
            competitor2: "Medium",
            competitor3: "Medium"
          },
          {
            name: "Profit from Volatility",
            aiGridBot: true,
            competitor1: false,
            competitor2: true,
            competitor3: true
          },
          {
            name: "Suitable for Trending Markets",
            aiGridBot: true,
            competitor1: false,
            competitor2: false,
            competitor3: false
          },
          {
            name: "Technical Knowledge Required",
            aiGridBot: "High",
            competitor1: "Low",
            competitor2: "Medium",
            competitor3: "Medium"
          }
        ]}
        className="mt-16 container mb-12"
      />
    </Layout>
  );
};

export default FuturesBots;
