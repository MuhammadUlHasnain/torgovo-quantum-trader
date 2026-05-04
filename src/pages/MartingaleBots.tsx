import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowRight, Check } from "lucide-react";
import FeatureSection from "@/components/ui/feature-section";
import ComparisonTable from "@/components/ui/comparison-table";
import { botComparisonFeatures } from "@/components/ui/comparison-data";
import { Link } from "react-router-dom";

const MartingaleBots = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="MARTINGALE Trading Bots"
        subtitle="Leverage cost-averaging strategies that adjust positions based on market movements for optimal results."
      >
        <Button className="bg-accent-primary hover:bg-accent-primary/90" asChild>
          <Link to="/dashboard/invest-in-bot?type=martingale">Invest Now</Link>
        </Button>
      </HeroSection>
      
      <div className="container py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What is Martingale Trading?</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The Martingale strategy is a cost-averaging approach where trade size increases after losses 
                to lower the average entry price. When the market eventually moves in the desired direction, 
                all positions can be closed at a profit.
              </p>
              <p className="text-muted-foreground">
                Martingale bots automatically manage this process by increasing position size according to 
                your predefined settings, helping to recover from drawdowns more efficiently than manual trading.
              </p>
              <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <h4 className="font-medium text-destructive">Risk Warning</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  While Martingale strategies can be effective, they carry significant risk as they require 
                  increasing capital commitment during losing streaks. Never use more capital than you can 
                  afford to lose and always set strict safety parameters.
                </p>
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-medium text-torgovo-purple mb-4">How Martingale Works</h3>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-muted-foreground">
                  <span className="text-foreground">Initial position is opened at the starting price</span>
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground">If price moves against position, additional orders are placed at preset intervals</span>
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground">Each new order is larger than the previous (e.g., 2x the size)</span>
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground">Average entry price decreases with each additional purchase</span>
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground">When price returns to profitable level, all positions are closed</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
        
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-torgovo-purple">Martingale Bot Parameters</CardTitle>
            <CardDescription>
              Customize these parameters to fine-tune your Martingale strategy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-medium">Base Order Size</h4>
                <p className="text-sm text-muted-foreground">The size of your initial position in the selected asset.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Price Deviation</h4>
                <p className="text-sm text-muted-foreground">How far the price must move against your position to trigger the next order.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Multiplier</h4>
                <p className="text-sm text-muted-foreground">How much larger each subsequent order will be compared to the previous order.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Maximum Orders</h4>
                <p className="text-sm text-muted-foreground">The maximum number of orders the bot will place in a single strategy cycle.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Take Profit</h4>
                <p className="text-sm text-muted-foreground">The price level at which all positions will be closed with profit.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Safety Orders</h4>
                <p className="text-sm text-muted-foreground">Advanced settings to limit losses during extreme market conditions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Performance Scenarios</h2>
          <div className="glass-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Scenario</th>
                    <th className="text-left p-4">Strategy</th>
                    <th className="text-left p-4">Initial Investment</th>
                    <th className="text-left p-4">Market Movement</th>
                    <th className="text-left p-4">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Optimal</td>
                    <td className="p-4">Long BTC with 3 safety orders</td>
                    <td className="p-4">$1,000</td>
                    <td className="p-4">Initial drop, then recovery</td>
                    <td className="p-4 text-torgovo-blue">+8.2% profit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Sideways Market</td>
                    <td className="p-4">Short ETH with 2 safety orders</td>
                    <td className="p-4">$1,000</td>
                    <td className="p-4">Sideways movement</td>
                    <td className="p-4 text-torgovo-blue">+3.5% profit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Strong Trend Against</td>
                    <td className="p-4">Long BTC with 5 safety orders</td>
                    <td className="p-4">$1,000</td>
                    <td className="p-4">Strong continuous downtrend</td>
                    <td className="p-4 text-destructive">-12.4% loss</td>
                  </tr>
                  <tr>
                    <td className="p-4">Strong Trend With</td>
                    <td className="p-4">Long ETH with 2 safety orders</td>
                    <td className="p-4">$1,000</td>
                    <td className="p-4">Strong continuous uptrend</td>
                    <td className="p-4 text-torgovo-blue">+15.7% profit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <FeatureSection
          title="Martingale Bot Features"
          features={[
            {
              title: "Smart Entry",
              description: "Automatically determines optimal entry points based on technical indicators and market conditions."
            },
            {
              title: "Safety Orders",
              description: "Places additional buy orders if the market moves against your position to reduce average entry price."
            },
            {
              title: "Take Profit",
              description: "Automatically closes positions when target profit levels are reached."
            },
            {
              title: "Multiple Exchange Support",
              description: "Compatible with Binance and Bybit exchanges for maximum flexibility."
            },
            {
              title: "Trailing Profit",
              description: "Dynamic take profit levels that follow price movement for maximized gains."
            },
            {
              title: "Maximum Safety Orders",
              description: "Set limits on how many safety orders can be placed to control risk exposure."
            },
          ]}
        />
        
        <ComparisonTable
          title="Bot Type Comparison"
          subtitle="See how our Martingale Bot compares with other trading strategies"
          highlight="martingale"
          features={botComparisonFeatures}
          className="mt-16 container mb-12"
        />
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Start Trading?</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="bg-torgovo-purple hover:bg-torgovo-purple/80">
              Create Martingale Bot
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

export default MartingaleBots;
