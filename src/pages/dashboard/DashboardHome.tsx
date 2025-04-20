
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Bot, LineChart, Activity, TrendingUp, TrendingDown, Percent, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for charts - In a real app, this would come from an API
const performanceData = [
  { month: "Jan", profit: 2100 },
  { month: "Feb", profit: 1800 },
  { month: "Mar", profit: 2400 },
  { month: "Apr", profit: 2000 },
  { month: "May", profit: 2700 },
  { month: "Jun", profit: 3200 },
  { month: "Jul", profit: 3800 },
];

// Mock data for active bots
const activeBots = [
  { id: "bot-1", name: "BTCUSDT Grid", type: "GRID", profit: 127.53, profitPercent: 12.7, status: "active" },
  { id: "bot-2", name: "ETH Martingale", type: "Martingale", profit: 89.21, profitPercent: 8.9, status: "active" },
  { id: "bot-3", name: "SOL/USDT DCA", type: "GRID", profit: -14.32, profitPercent: -1.4, status: "active" },
  { id: "bot-4", name: "DOGE Grid", type: "GRID", profit: 45.67, profitPercent: 4.5, status: "paused" },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your trading performance and active bots.
        </p>
      </div>
      
      {/* Performance Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-torgovo-purple">
              $12,546.09
            </div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+12.5%</span>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Since last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              7
            </div>
            <div className="flex items-center pt-1 text-xs text-torgovo-blue">
              <span>5 GRID, 2 Martingale</span>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              3 in profit, 4 in recovery
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              1,284
            </div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+2.5%</span>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              892 profitable trades
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              69.5%
            </div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+1.2%</span>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Compared to last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content area */}
      <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-8">
        {/* Left column - Performance Chart */}
        <Card className="col-span-full md:col-span-4 lg:col-span-5">
          <CardHeader>
            <CardTitle>Trading Performance</CardTitle>
            <CardDescription>
              Your profit/loss over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {/* In a real application, use a chart library here */}
              <div className="bg-muted/20 rounded-md border border-border w-full h-full flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-2 text-muted-foreground">Performance Chart</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Right column - Quick Actions */}
        <Card className="col-span-full md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-torgovo-purple hover:bg-torgovo-purple/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Bot
            </Button>
            
            <Button variant="outline" className="w-full">
              <Database className="mr-2 h-4 w-4" />
              Connect Exchange
            </Button>
            
            <Button variant="outline" className="w-full">
              <LineChart className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Bot Settings
            </Button>
          </CardContent>
        </Card>
        
        {/* Active Bots Table */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Active Bots</CardTitle>
            <CardDescription>
              Your currently running trading bots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="h-10 px-4 text-left font-medium">Name</th>
                      <th className="h-10 px-4 text-left font-medium">Type</th>
                      <th className="h-10 px-4 text-left font-medium">Profit</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeBots.map((bot) => (
                      <tr key={bot.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">{bot.name}</td>
                        <td className="p-4 align-middle">{bot.type}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center">
                            <span className={bot.profit >= 0 ? "text-green-500" : "text-red-500"}>
                              ${Math.abs(bot.profit).toFixed(2)}
                            </span>
                            <span className={`ml-2 flex items-center ${bot.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {bot.profit >= 0 ? (
                                <TrendingUp className="mr-1 h-3 w-3" />
                              ) : (
                                <TrendingDown className="mr-1 h-3 w-3" />
                              )}
                              {Math.abs(bot.profitPercent)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center">
                            <div className={`mr-2 h-2 w-2 rounded-full ${
                              bot.status === "active" ? "bg-green-500" : "bg-yellow-500"
                            }`} />
                            <span className="capitalize">{bot.status}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            {bot.status === "active" ? (
                              <Button variant="outline" size="sm">Pause</Button>
                            ) : (
                              <Button variant="outline" size="sm">Start</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
