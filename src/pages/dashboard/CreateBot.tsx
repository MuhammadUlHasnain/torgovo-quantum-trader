
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Grid, ArrowLeftRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateBot = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Create New Bot</h2>
        <p className="text-muted-foreground">
          Select a bot type to begin setting up your automated trading strategy.
        </p>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
            <span>Grid</span>
          </TabsTrigger>
          <TabsTrigger value="spot" className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            <span>Spot</span>
          </TabsTrigger>
          <TabsTrigger value="futures" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Futures</span>
          </TabsTrigger>
          <TabsTrigger value="martingale" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>Martingale</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="grid" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Grid Bot</CardTitle>
                  <CardDescription>
                    Automatically buy low and sell high in sideways markets.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Grid bots place buy and sell orders at set intervals, profiting from price fluctuations within a range.
                  </p>
                  <ul className="text-sm space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Best for sideways/ranging markets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Low-risk with defined parameters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Customizable grid size and price range</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-torgovo-blue hover:bg-torgovo-blue/80">Create Grid Bot</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Grid Bot</CardTitle>
                  <CardDescription>
                    AI-powered grid strategy with automatic parameter optimization.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI Grid Bot uses machine learning to optimize grid parameters and adapt to changing market conditions.
                  </p>
                  <ul className="text-sm space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-purple" />
                      <span>Dynamic grid adjustment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-purple" />
                      <span>Automatic trend detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-purple" />
                      <span>Performance analytics and optimization</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-torgovo-purple hover:bg-torgovo-purple/80">Create AI Grid Bot</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="spot" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Spot Trading Bot</CardTitle>
                  <CardDescription>
                    Execute precise spot market trades based on specific conditions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure trading rules based on technical indicators, price levels, or time-based entries.
                  </p>
                  <ul className="text-sm space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Technical indicator-based entries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Precise order execution</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Automatic stop-loss and take-profit</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-torgovo-blue hover:bg-torgovo-blue/80">Create Spot Bot</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="futures" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Futures Trading Bot</CardTitle>
                  <CardDescription>
                    Leverage trading with advanced risk management.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Trade futures contracts with customizable leverage and advanced risk controls.
                  </p>
                  <ul className="text-sm space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Adjustable leverage settings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Advanced position sizing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Multi-tier stop-loss system</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-torgovo-blue hover:bg-torgovo-blue/80">Create Futures Bot</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="martingale" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Martingale Bot</CardTitle>
                  <CardDescription>
                    Cost averaging strategy for trending markets.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Implements cost-averaging strategies when price moves against your position.
                  </p>
                  <ul className="text-sm space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Customizable order sizing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Maximum drawdown protection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-torgovo-blue" />
                      <span>Take profit automation</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-torgovo-blue hover:bg-torgovo-blue/80">Create Martingale Bot</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CreateBot;
