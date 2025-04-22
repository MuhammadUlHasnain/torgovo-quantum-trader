import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Search, Filter, ArrowUpDown, TrendingUp, TrendingDown, Play, Pause, Settings, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "lucide-react";
const botData = [{
  id: "bot-1",
  name: "BTC/USDT Grid",
  type: "GRID",
  exchange: "Binance",
  pair: "BTC/USDT",
  profit: 127.53,
  profitPercent: 12.7,
  status: "active",
  trades: 125,
  created: "2023-12-10T13:45:00Z",
  settings: {
    gridLines: 20,
    upperLimit: 65000,
    lowerLimit: 55000,
    investment: 1000
  }
}, {
  id: "bot-2",
  name: "ETH Martingale",
  type: "Martingale",
  exchange: "Bybit",
  pair: "ETH/USDT",
  profit: 89.21,
  profitPercent: 8.9,
  status: "active",
  trades: 78,
  created: "2024-01-15T09:30:00Z",
  settings: {
    initialOrderSize: 0.1,
    priceDeviation: 2,
    safetyOrderSize: 0.2,
    maxSafetyOrders: 5,
    investment: 1500
  }
}, {
  id: "bot-3",
  name: "SOL/USDT Grid",
  type: "GRID",
  exchange: "Binance",
  pair: "SOL/USDT",
  profit: -14.32,
  profitPercent: -1.4,
  status: "active",
  trades: 52,
  created: "2024-02-05T15:20:00Z",
  settings: {
    gridLines: 15,
    upperLimit: 120,
    lowerLimit: 90,
    investment: 800
  }
}, {
  id: "bot-4",
  name: "DOGE Grid",
  type: "GRID",
  exchange: "Binance",
  pair: "DOGE/USDT",
  profit: 45.67,
  profitPercent: 4.5,
  status: "paused",
  trades: 93,
  created: "2024-01-28T11:15:00Z",
  settings: {
    gridLines: 25,
    upperLimit: 0.15,
    lowerLimit: 0.10,
    investment: 500
  }
}, {
  id: "bot-5",
  name: "AVAX Martingale",
  type: "Martingale",
  exchange: "Bybit",
  pair: "AVAX/USDT",
  profit: 67.89,
  profitPercent: 6.7,
  status: "active",
  trades: 42,
  created: "2024-02-15T14:30:00Z",
  settings: {
    initialOrderSize: 0.5,
    priceDeviation: 3,
    safetyOrderSize: 1,
    maxSafetyOrders: 3,
    investment: 1200
  }
}];
const BotManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("profit");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const filteredBots = botData.filter(bot => {
    if (searchTerm && !bot.name.toLowerCase().includes(searchTerm.toLowerCase()) && !bot.pair.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filterType !== "all" && bot.type !== filterType) {
      return false;
    }
    if (filterStatus !== "all" && bot.status !== filterStatus) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "profit":
        comparison = a.profit - b.profit;
        break;
      case "trades":
        comparison = a.trades - b.trades;
        break;
      case "date":
        comparison = new Date(a.created).getTime() - new Date(b.created).getTime();
        break;
      default:
        comparison = 0;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });
  const selectedBotDetails = selectedBot ? botData.find(bot => bot.id === selectedBot) : null;
  return <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Bot Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor all your trading bots in one place.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search bots by name or pair..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="GRID">GRID</SelectItem>
                    <SelectItem value="Martingale">Martingale</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      <SelectValue placeholder="Sort By" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="profit">Profit</SelectItem>
                    <SelectItem value="trades">Trades</SelectItem>
                    <SelectItem value="date">Date Created</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  {sortOrder === "asc" ? "↑" : "↓"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">
                <div className="flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  Your Bots
                </div>
              </CardTitle>
              <CardDescription>
                {filteredBots.length} bot{filteredBots.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredBots.length > 0 ? filteredBots.map(bot => <div key={bot.id} className={`p-3 rounded-md cursor-pointer transition-colors ${selectedBot === bot.id ? 'bg-torgovo-purple/10 border border-torgovo-purple/40' : 'hover:bg-muted/50 border border-transparent'}`} onClick={() => setSelectedBot(bot.id)}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{bot.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {bot.exchange} • {bot.pair}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className={`flex items-center ${bot.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {bot.profit >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                            ${Math.abs(bot.profit).toFixed(2)}
                          </div>
                          <div className="flex items-center text-xs">
                            <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${bot.status === "active" ? "bg-green-500" : "bg-yellow-500"}`} />
                            <span className="capitalize">{bot.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>) : <div className="text-center py-8 text-muted-foreground">
                    No bots found matching your filters
                  </div>}
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            {selectedBotDetails ? <>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-2xl">{selectedBotDetails.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {selectedBotDetails.type} Bot • {selectedBotDetails.exchange} • {selectedBotDetails.pair}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {selectedBotDetails.status === "active" ? <Button variant="outline" size="sm">
                          <Pause className="mr-1 h-4 w-4" />
                          Pause
                        </Button> : <Button variant="outline" size="sm">
                          <Play className="mr-1 h-4 w-4" />
                          Start
                        </Button>}
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                      <TabsTrigger value="history">Trade History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 my-px">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Profit</p>
                          <p className={`text-2xl font-semibold ${selectedBotDetails.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                            ${selectedBotDetails.profit.toFixed(2)}
                            <span className="text-base ml-1 font-normal text-muted-foreground">
                              ({selectedBotDetails.profitPercent}%)
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Trades</p>
                          <p className="text-2xl font-semibold">
                            {selectedBotDetails.trades}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date Created</p>
                          <p className="text-base font-medium">
                            {new Date(selectedBotDetails.created).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <div className="flex items-center mt-1">
                            <div className={`mr-2 h-2 w-2 rounded-full ${selectedBotDetails.status === "active" ? "bg-green-500" : "bg-yellow-500"}`} />
                            <span className="capitalize font-medium">{selectedBotDetails.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 mb-6 rounded-md bg-muted/20 border border-border">
                        <h3 className="text-base font-semibold mb-1">Bot Description</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedBotDetails.type === "GRID" ? <span>
                              This Grid bot trades {selectedBotDetails.pair} on {selectedBotDetails.exchange} with 
                              {` ${selectedBotDetails.settings.gridLines} `}grid lines between 
                              ${selectedBotDetails.settings.lowerLimit} and ${selectedBotDetails.settings.upperLimit}.
                            </span> : <span>
                              This Martingale bot trades {selectedBotDetails.pair} on {selectedBotDetails.exchange} with 
                              an initial order size of {selectedBotDetails.settings.initialOrderSize} and up to 
                              {selectedBotDetails.settings.maxSafetyOrders} safety orders.
                            </span>}
                        </p>
                      </div>
                      <div className="w-full bg-muted/20 rounded-md border border-border flex flex-col items-center justify-center py-8 min-h-[220px]">
                        <LineChart className="h-10 w-10 text-muted-foreground/50" />
                        <span className="mt-2 text-muted-foreground text-sm">Performance Chart</span>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="performance">
                      <div className="space-y-6">
                        <div className="bg-muted/20 rounded-md border border-border h-[300px] flex items-center justify-center">
                          <LineChart className="h-12 w-12 text-muted-foreground/50" />
                          <span className="ml-2 text-muted-foreground">Detailed Performance Charts</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-4 bg-muted/30 rounded-md">
                            <p className="text-sm text-muted-foreground">Win Rate</p>
                            <p className="text-xl font-semibold">72.3%</p>
                          </div>
                          <div className="p-4 bg-muted/30 rounded-md">
                            <p className="text-sm text-muted-foreground">Average Profit</p>
                            <p className="text-xl font-semibold">$1.37</p>
                          </div>
                          <div className="p-4 bg-muted/30 rounded-md">
                            <p className="text-sm text-muted-foreground">Daily Profit</p>
                            <p className="text-xl font-semibold">$4.28</p>
                          </div>
                          <div className="p-4 bg-muted/30 rounded-md">
                            <p className="text-sm text-muted-foreground">Max Drawdown</p>
                            <p className="text-xl font-semibold">-2.4%</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="settings">
                      <div className="space-y-4">
                        <Button variant="outline" className="float-right">
                          <Settings className="mr-2 h-4 w-4" />
                          Edit Settings
                        </Button>
                        <h3 className="text-lg font-medium">Bot Configuration</h3>
                        {selectedBotDetails.type === "GRID" ? <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-md bg-muted/20">
                              <h4 className="text-sm font-medium mb-2">Grid Parameters</h4>
                              <ul className="space-y-2">
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Grid Lines:</span>
                                  <span className="font-medium">{selectedBotDetails.settings.gridLines}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Upper Limit:</span>
                                  <span className="font-medium">${selectedBotDetails.settings.upperLimit}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Lower Limit:</span>
                                  <span className="font-medium">${selectedBotDetails.settings.lowerLimit}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Investment:</span>
                                  <span className="font-medium">${selectedBotDetails.settings.investment}</span>
                                </li>
                              </ul>
                            </div>
                            <div className="p-4 rounded-md bg-muted/20">
                              <h4 className="text-sm font-medium mb-2">Advanced Settings</h4>
                              <ul className="space-y-2">
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Grid Type:</span>
                                  <span className="font-medium">Arithmetic</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Take Profit:</span>
                                  <span className="font-medium">Grid Profit Only</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Auto Close:</span>
                                  <span className="font-medium">Disabled</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Stop Loss:</span>
                                  <span className="font-medium">None</span>
                                </li>
                              </ul>
                            </div>
                          </div> : <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-md bg-muted/20">
                              <h4 className="text-sm font-medium mb-2">Martingale Parameters</h4>
                              <ul className="space-y-2">
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Initial Order Size:</span>
                                  <span className="font-medium">{selectedBotDetails.settings.initialOrderSize} {selectedBotDetails.pair.split('/')[0]}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Price Deviation:</span>
                                  <span className="font-medium">{selectedBotDetails.settings.priceDeviation}%</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Safety Order Size:</span>
                                  <span className="font-medium">{selectedBotDetails.settings.safetyOrderSize} {selectedBotDetails.pair.split('/')[0]}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Max Safety Orders:</span>
                                  <span className="font-medium">{selectedBotDetails.settings.maxSafetyOrders}</span>
                                </li>
                              </ul>
                            </div>
                            <div className="p-4 rounded-md bg-muted/20">
                              <h4 className="text-sm font-medium mb-2">Advanced Settings</h4>
                              <ul className="space-y-2">
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Investment:</span>
                                  <span className="font-medium">${selectedBotDetails.settings.investment}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Safety Order Volume Scale:</span>
                                  <span className="font-medium">1.5x</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Take Profit:</span>
                                  <span className="font-medium">2.5%</span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Strategy:</span>
                                  <span className="font-medium">Long</span>
                                </li>
                              </ul>
                            </div>
                          </div>}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="history">
                      <div className="rounded-md border bg-muted/10 p-2 md:p-4">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full table-auto text-sm">
                            <thead>
                              <tr className="border-b bg-muted/40">
                                <th className="h-12 px-4 text-left font-medium">Date & Time</th>
                                <th className="h-12 px-4 text-left font-medium">Type</th>
                                <th className="h-12 px-4 text-right font-medium">Price</th>
                                <th className="h-12 px-5 text-right font-medium w-40">Quantity</th>
                                <th className="h-12 px-4 text-right font-medium">Profit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b transition-colors hover:bg-muted/30 even:bg-muted/15">
                                <td className="p-3 align-middle text-left">2024-03-15 14:23:10</td>
                                <td className="p-3 align-middle text-green-500 font-semibold text-left">BUY</td>
                                <td className="p-3 align-middle text-right">$58,432.10</td>
                                <td className="p-3 align-middle text-right w-40">0.0025 BTC</td>
                                <td className="p-3 align-middle text-right text-muted-foreground">-</td>
                              </tr>
                              <tr className="border-b transition-colors hover:bg-muted/30 even:bg-muted/15">
                                <td className="p-3 align-middle text-left">2024-03-15 16:45:22</td>
                                <td className="p-3 align-middle text-red-500 font-semibold text-left">SELL</td>
                                <td className="p-3 align-middle text-right">$59,103.45</td>
                                <td className="p-3 align-middle text-right w-40">0.0025 BTC</td>
                                <td className="p-3 align-middle text-right text-green-500 font-semibold">$1.68</td>
                              </tr>
                              <tr className="border-b transition-colors hover:bg-muted/30 even:bg-muted/15">
                                <td className="p-3 align-middle text-left">2024-03-15 18:12:05</td>
                                <td className="p-3 align-middle text-green-500 font-semibold text-left">BUY</td>
                                <td className="p-3 align-middle text-right">$58,750.30</td>
                                <td className="p-3 align-middle text-right w-40">0.0025 BTC</td>
                                <td className="p-3 align-middle text-right text-muted-foreground">-</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">
                          Load More
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </> : <div className="flex flex-col items-center justify-center p-12 text-center">
                <Bot className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No Bot Selected</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Select a bot from the list to view its details, analytics, and settings.
                </p>
                <Button className="mt-6 bg-torgovo-purple hover:bg-torgovo-purple/90">
                  Create New Bot
                </Button>
              </div>}
          </Card>
        </div>
      </div>
    </div>;
};
export default BotManagement;