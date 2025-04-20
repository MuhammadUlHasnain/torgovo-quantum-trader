
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowRight, ArrowUp, Bot, Info, MessageSquare, Plus, Settings } from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Monitor and manage your trading bots.</p>
          </div>
          <Button className="bg-torgovo-purple hover:bg-torgovo-purple/80">
            <Plus className="mr-2 h-4 w-4" /> Create New Bot
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <ArrowUp className="h-4 w-4 text-torgovo-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-torgovo-blue">+$1,853.27</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 GRID, 4 Martingale</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,432</div>
              <p className="text-xs text-muted-foreground">238 in the last 24h</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-torgovo-blue">72.5%</div>
              <p className="text-xs text-muted-foreground">+3.2% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Bots</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="history">Trade History</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "BTC/USDT Grid", 
                  type: "GRID", 
                  exchange: "Binance", 
                  profit: "+$327.56", 
                  active: "2d 14h", 
                  deals: 52,
                  positive: true
                },
                { 
                  name: "ETH/USDT Martingale", 
                  type: "Martingale", 
                  exchange: "Bybit", 
                  profit: "-$42.12", 
                  active: "6h 23m", 
                  deals: 8,
                  positive: false
                },
                { 
                  name: "SOL/USDT Grid", 
                  type: "GRID", 
                  exchange: "Binance", 
                  profit: "+$105.28", 
                  active: "12h 47m", 
                  deals: 37,
                  positive: true
                },
              ].map((bot, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-muted/20">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{bot.name}</CardTitle>
                      <div className="flex items-center gap-1 text-xs rounded-full px-2 py-1 bg-primary/10">
                        <span className="text-primary">{bot.type}</span>
                      </div>
                    </div>
                    <CardDescription>{bot.exchange}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Profit/Loss</p>
                        <p className={`text-lg font-bold ${bot.positive ? "text-torgovo-blue" : "text-destructive"}`}>
                          {bot.profit}
                        </p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-sm text-muted-foreground">Active for</p>
                        <p className="text-lg font-medium">{bot.active}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completed deals</span>
                        <span>{bot.deals}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">Settings</Button>
                      <Button size="sm" className="flex-1 bg-torgovo-blue hover:bg-torgovo-blue/80">View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Bots</CardTitle>
                <CardDescription>
                  View your completed bot sessions and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This is a preview of the completed bots section.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trade History</CardTitle>
                <CardDescription>
                  View your complete trading history across all bots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This is a preview of the trade history section.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="fixed bottom-5 right-5">
          <Button className="w-12 h-12 rounded-full bg-torgovo-purple hover:bg-torgovo-purple-dim shadow-lg flex items-center justify-center">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
