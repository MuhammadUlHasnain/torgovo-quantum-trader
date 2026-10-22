import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Search, Filter, ArrowUpDown, TrendingUp, TrendingDown, Play, Pause, Settings, Trash2, Loader2, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "lucide-react";
import { toast } from "sonner";
import { botsApi, asList } from "@/lib/services";
import { errorMessage } from "@/lib/api";
import type { Order } from "@/types/api";

type Kind = "grid" | "martingale" | "signal";

interface BotRow {
  id: string;
  kind: Kind;
  name: string;
  exchange: string;
  pair: string;
  status: string; // running | paused | idle | stopped | error
  profit: number;
  trades: number;
  created: string;
  raw: any;
}

const statusDot = (s: string) =>
  s === "running" ? "bg-green-500" : s === "error" ? "bg-red-500" : s === "paused" || s === "stopped" ? "bg-yellow-500" : "bg-muted-foreground";

const BotManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("profit");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const [busyBot, setBusyBot] = useState<string | null>(null);

  const opts = { refetchInterval: 20000 };
  const gridQ = useQuery({ queryKey: ["bots", "grid"], queryFn: () => botsApi.gridBots(1), ...opts });
  const martQ = useQuery({ queryKey: ["bots", "martingale"], queryFn: () => botsApi.martingaleBots(1), ...opts });
  const sigQ = useQuery({ queryKey: ["bots", "signal"], queryFn: () => botsApi.signalBots(1), ...opts });
  const loading = gridQ.isLoading || martQ.isLoading || sigQ.isLoading;

  const bots: BotRow[] = useMemo(() => {
    const rows: BotRow[] = [];
    asList<any>(gridQ.data).forEach((b) => rows.push({
      id: b.id, kind: "grid", name: b.bot_name, exchange: b.exchange_name || b.exchange,
      pair: b.trading_pair, status: b.is_running ? "running" : (b.status ?? "idle"),
      profit: parseFloat(b.total_profit_loss ?? "0"), trades: b.total_trades ?? 0,
      created: b.created_at, raw: b,
    }));
    asList<any>(martQ.data).forEach((b) => rows.push({
      id: b.id, kind: "martingale", name: b.bot_name, exchange: b.exchange_name || b.exchange,
      pair: b.trading_pair, status: b.is_running ? "running" : (b.status ?? "idle"),
      profit: parseFloat(b.total_profit_loss ?? "0"), trades: b.total_trades ?? 0,
      created: b.created_at, raw: b,
    }));
    asList<any>(sigQ.data).forEach((b) => rows.push({
      id: b.id, kind: "signal", name: b.bot_name, exchange: b.exchange_name || b.exchange,
      pair: b.trading_pair, status: b.status ?? "idle",
      profit: parseFloat(b.total_profit_loss ?? "0"), trades: b.total_trades ?? 0,
      created: b.created_at, raw: b,
    }));
    return rows;
  }, [gridQ.data, martQ.data, sigQ.data]);

  const selectedBotDetails = selectedBot ? bots.find((b) => b.id === selectedBot) : null;

  // Order history for the selected bot (poll while open).
  const { data: ordersData } = useQuery({
    queryKey: ["bot-orders", selectedBotDetails?.kind, selectedBot],
    queryFn: () => {
      const filterKey = selectedBotDetails!.kind === "grid" ? "grid_bot" : selectedBotDetails!.kind === "martingale" ? "martingale_bot" : "signal_bot";
      return botsApi.orders({ [filterKey]: selectedBot! });
    },
    enabled: !!selectedBotDetails,
    refetchInterval: 15000,
  });
  const botOrders = asList<Order>(ordersData).slice(0, 25);

  const filteredBots = bots.filter((bot) => {
    if (searchTerm && !bot.name.toLowerCase().includes(searchTerm.toLowerCase()) && !bot.pair.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterType !== "all" && bot.kind !== filterType) return false;
    if (filterStatus !== "all" && bot.status !== filterStatus) return false;
    return true;
  }).sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "name": comparison = a.name.localeCompare(b.name); break;
      case "profit": comparison = a.profit - b.profit; break;
      case "trades": comparison = a.trades - b.trades; break;
      case "date": comparison = new Date(a.created).getTime() - new Date(b.created).getTime(); break;
      default: comparison = 0;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["bots"] });
    queryClient.invalidateQueries({ queryKey: ["bot-orders"] });
  };

  const handleStartStop = async (bot: BotRow) => {
    if (bot.kind === "signal") {
      toast.info("Signal bots are triggered by TradingView webhooks — no start/stop switch.");
      return;
    }
    setBusyBot(bot.id);
    try {
      if (bot.kind === "grid") {
        await (bot.status === "running" ? botsApi.gridStop(bot.id) : botsApi.gridStart(bot.id));
      } else {
        await (bot.status === "running" ? botsApi.martingaleStop(bot.id) : botsApi.martingaleStart(bot.id));
      }
      toast.success(bot.status === "running" ? "Bot stopped." : "Bot started.");
      invalidate();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusyBot(null);
    }
  };

  const handleDelete = async (bot: BotRow) => {
    if (!window.confirm(`Delete "${bot.name}"? This cannot be undone.`)) return;
    setBusyBot(bot.id);
    try {
      if (bot.kind === "grid") await botsApi.deleteGridBot(bot.id);
      else if (bot.kind === "martingale") await botsApi.deleteMartingaleBot(bot.id);
      else await botsApi.deleteSignalBot(bot.id);
      toast.success("Bot deleted.");
      setSelectedBot(null);
      invalidate();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusyBot(null);
    }
  };

  const fmtProfit = (v: number) => `${v >= 0 ? "" : "-"}$${Math.abs(v).toFixed(2)}`;

  return (
    <div className="space-y-6">
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
                <Input type="search" placeholder="Search bots by name or pair..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="martingale">Martingale</SelectItem>
                    <SelectItem value="signal">Signal</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
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
                {loading ? "Loading…" : `${filteredBots.length} bot${filteredBots.length !== 1 ? "s" : ""} found`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {loading ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
                ) : filteredBots.length > 0 ? filteredBots.map((bot) => (
                  <div
                    key={`${bot.kind}-${bot.id}`}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${selectedBot === bot.id ? "bg-torgovo-purple/10 border border-torgovo-purple/40" : "hover:bg-muted/50 border border-transparent"}`}
                    onClick={() => setSelectedBot(bot.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{bot.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {bot.kind === "grid" ? "Grid" : bot.kind === "martingale" ? "Martingale" : "Signal"} • {bot.exchange} • {bot.pair}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`flex items-center ${bot.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {bot.profit >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                          {fmtProfit(bot.profit)}
                        </div>
                        <div className="flex items-center text-xs">
                          <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${statusDot(bot.status)}`} />
                          <span className="capitalize">{bot.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No bots found. <Link className="text-torgovo-purple underline" to="/dashboard/create-bot">Create your first bot</Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            {selectedBotDetails ? (
              <>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-2xl">{selectedBotDetails.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {selectedBotDetails.kind === "grid" ? "Grid" : selectedBotDetails.kind === "martingale" ? "Martingale" : "Signal"} Bot • {selectedBotDetails.exchange} • {selectedBotDetails.pair}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedBotDetails.kind !== "signal" && (
                        <Button variant="outline" size="sm" disabled={busyBot === selectedBotDetails.id} onClick={() => handleStartStop(selectedBotDetails)}>
                          {busyBot === selectedBotDetails.id ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : selectedBotDetails.status === "running" ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
                          {selectedBotDetails.status === "running" ? "Stop" : "Start"}
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/bots/${selectedBotDetails.kind}/${selectedBotDetails.id}`}>
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Full View
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" disabled={busyBot === selectedBotDetails.id} onClick={() => handleDelete(selectedBotDetails)}>
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
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                      <TabsTrigger value="history">Trade History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 my-px">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Profit</p>
                          <p className={`text-2xl font-semibold ${selectedBotDetails.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {fmtProfit(selectedBotDetails.profit)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Trades</p>
                          <p className="text-2xl font-semibold">{selectedBotDetails.trades}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date Created</p>
                          <p className="text-base font-medium">{new Date(selectedBotDetails.created).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <div className="flex items-center mt-1">
                            <div className={`mr-2 h-2 w-2 rounded-full ${statusDot(selectedBotDetails.status)}`} />
                            <span className="capitalize font-medium">{selectedBotDetails.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 mb-6 rounded-md bg-muted/20 border border-border">
                        <h3 className="text-base font-semibold mb-1">Bot Description</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedBotDetails.kind === "grid" ? (
                            <span>
                              This Grid bot trades {selectedBotDetails.pair} on {selectedBotDetails.exchange} with{" "}
                              {selectedBotDetails.raw?.favor_levels ?? "?"} sell levels and {selectedBotDetails.raw?.against_levels ?? "?"} buy
                              levels spaced {selectedBotDetails.raw?.level_spacing_percent ?? "?"}% apart.
                            </span>
                          ) : selectedBotDetails.kind === "martingale" ? (
                            <span>
                              This Martingale bot trades {selectedBotDetails.pair} on {selectedBotDetails.exchange} with an order
                              amount of {selectedBotDetails.raw?.base_amount ?? "?"} USDT and a {selectedBotDetails.raw?.multiplier_factor ?? "?"}x multiplier.
                            </span>
                          ) : (
                            <span>
                              This Signal bot executes webhook alerts for {selectedBotDetails.pair} on {selectedBotDetails.exchange}.
                              Webhook URL: <code className="text-xs">{selectedBotDetails.raw?.webhook_url}</code>
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="w-full bg-muted/20 rounded-md border border-border flex flex-col items-center justify-center py-8 min-h-[220px]">
                        <LineChart className="h-10 w-10 text-muted-foreground/50" />
                        <span className="mt-2 text-muted-foreground text-sm">Performance Chart</span>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings">
                      <div className="space-y-4">
                        <Button variant="outline" className="float-right" asChild>
                          <Link to="/dashboard/create-bot">
                            <Settings className="mr-2 h-4 w-4" />
                            New Bot
                          </Link>
                        </Button>
                        <h3 className="text-lg font-medium">Bot Configuration</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-md bg-muted/20">
                            <h4 className="text-sm font-medium mb-2">Parameters</h4>
                            <ul className="space-y-2">
                              {[
                                ["Order amount", selectedBotDetails.raw?.base_amount],
                                ["Buy levels", selectedBotDetails.raw?.against_levels],
                                ["Sell levels", selectedBotDetails.raw?.favor_levels],
                                ["Level spacing", selectedBotDetails.raw?.level_spacing_percent ? `${selectedBotDetails.raw.level_spacing_percent}%` : null],
                                ...(selectedBotDetails.kind === "martingale" ? [["Multiplier", selectedBotDetails.raw?.multiplier_factor]] : []),
                                ["Take profit", selectedBotDetails.raw?.take_profit_percent ? `${selectedBotDetails.raw.take_profit_percent}%` : null],
                                ["Stop loss", selectedBotDetails.raw?.stop_loss_percent ? `${selectedBotDetails.raw.stop_loss_percent}%` : null],
                                ["Max position", selectedBotDetails.raw?.max_position_size],
                              ].filter(([, v]) => v !== undefined && v !== null && v !== "").map(([k, v]) => (
                                <li key={String(k)} className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">{k}:</span>
                                  <span className="font-medium">{String(v)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 rounded-md bg-muted/20">
                            <h4 className="text-sm font-medium mb-2">Runtime</h4>
                            <ul className="space-y-2">
                              <li className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Started:</span>
                                <span className="font-medium">{selectedBotDetails.raw?.started_at ? new Date(selectedBotDetails.raw.started_at).toLocaleString() : "—"}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Successful trades:</span>
                                <span className="font-medium">{selectedBotDetails.raw?.successful_trades ?? "—"}</span>
                              </li>
                              {selectedBotDetails.kind === "martingale" && (
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Current level:</span>
                                  <span className="font-medium">{selectedBotDetails.raw?.current_level ?? "—"}</span>
                                </li>
                              )}
                              {selectedBotDetails.kind === "grid" && (
                                <li className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Current grid level:</span>
                                  <span className="font-medium">{selectedBotDetails.raw?.current_grid_level ?? "—"}</span>
                                </li>
                              )}
                              {selectedBotDetails.kind === "signal" && (
                                <>
                                  <li className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Webhook ID:</span>
                                    <span className="font-medium font-mono text-xs">{selectedBotDetails.raw?.webhook_id}</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Default amount:</span>
                                    <span className="font-medium">{selectedBotDetails.raw?.default_amount}</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
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
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {botOrders.length > 0 ? botOrders.map((o) => (
                                <tr key={o.id} className="border-b transition-colors hover:bg-muted/30 even:bg-muted/15">
                                  <td className="p-3 align-middle text-left">{new Date(o.created_at).toLocaleString()}</td>
                                  <td className={`p-3 align-middle font-semibold text-left ${o.side === "BUY" ? "text-green-500" : "text-red-500"}`}>{o.side}</td>
                                  <td className="p-3 align-middle text-right">${Number(o.price).toLocaleString()}</td>
                                  <td className="p-3 align-middle text-right w-40">{Number(o.quantity)}</td>
                                  <td className="p-3 align-middle text-left"><Badge variant="outline" className="capitalize">{o.status}</Badge></td>
                                </tr>
                              )) : (
                                <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No trades recorded yet.</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <p className="mt-4 text-xs text-center text-muted-foreground">Auto-refreshes every 15 seconds.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Bot className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Select a bot from the list to see its details.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BotManagement;
