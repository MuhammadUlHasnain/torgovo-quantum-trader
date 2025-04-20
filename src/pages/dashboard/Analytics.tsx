
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for analytics
const performanceData = [
  { name: "Jan", profit: 2400, trades: 24 },
  { name: "Feb", profit: 1398, trades: 18 },
  { name: "Mar", profit: 9800, trades: 35 },
  { name: "Apr", profit: 3908, trades: 29 },
  { name: "May", profit: 4800, trades: 32 },
  { name: "Jun", profit: 3800, trades: 27 },
  { name: "Jul", profit: 4300, trades: 30 },
];

const botPerformanceData = [
  { name: "BTCUSDT Grid", profit: 4500, winRate: 68 },
  { name: "ETHUSDT Grid", profit: 3200, winRate: 72 },
  { name: "SOLUSDT Martingale", profit: 2800, winRate: 65 },
  { name: "BNBUSDT Grid", profit: 1900, winRate: 70 },
  { name: "ADAUSDT Martingale", profit: 1400, winRate: 62 },
];

const assetDistribution = [
  { name: "BTC", value: 40 },
  { name: "ETH", value: 25 },
  { name: "SOL", value: 15 },
  { name: "BNB", value: 12 },
  { name: "Other", value: 8 },
];

const COLORS = ["#9b87f5", "#7E69AB", "#1EAEDB", "#6E59A5", "#D6BCFA"];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-torgovo-purple">$24,506.00</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-torgovo-blue">68.7%</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">195</div>
            <p className="text-xs text-muted-foreground">+25 from last month</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="bots">Bot Analysis</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Trading Performance</CardTitle>
              <CardDescription>Your profit and trade count over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2B37" />
                  <XAxis dataKey="name" stroke="#7E869A" />
                  <YAxis yAxisId="left" stroke="#9b87f5" />
                  <YAxis yAxisId="right" orientation="right" stroke="#1EAEDB" />
                  <Tooltip contentStyle={{ background: "#1A1F2C", border: "none", borderRadius: "8px" }} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="profit"
                    stroke="#9b87f5"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Profit ($)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="trades"
                    stroke="#1EAEDB"
                    strokeWidth={2}
                    name="Trade Count"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bots" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Bot Performance Comparison</CardTitle>
              <CardDescription>Profit and win rate by bot</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={botPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2B37" />
                  <XAxis dataKey="name" stroke="#7E869A" />
                  <YAxis yAxisId="left" stroke="#9b87f5" />
                  <YAxis yAxisId="right" orientation="right" stroke="#1EAEDB" />
                  <Tooltip contentStyle={{ background: "#1A1F2C", border: "none", borderRadius: "8px" }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="profit" fill="#9b87f5" name="Profit ($)" />
                  <Bar yAxisId="right" dataKey="winRate" fill="#1EAEDB" name="Win Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assets" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Asset Distribution</CardTitle>
              <CardDescription>Your portfolio allocation</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-[350px] h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {assetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1A1F2C", border: "none", borderRadius: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
