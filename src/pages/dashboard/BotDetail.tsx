import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Play, Square, Loader2, Webhook, Copy } from "lucide-react";
import { toast } from "sonner";
import { botsApi, asList } from "@/lib/services";
import { errorMessage } from "@/lib/api";
import type { Order } from "@/types/api";

const KINDS = ["signal", "grid", "martingale"] as const;
type Kind = (typeof KINDS)[number];

const statusColor = (s: string) => {
  switch (s) {
    case "running": case "executed": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "paused": case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "error": case "stopped": case "failed": case "cancelled": return "bg-red-500/10 text-red-500 border-red-500/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

const BotDetail = () => {
  const { kind = "grid", id = "" } = useParams<{ kind: string; id: string }>();
  const k: Kind = (KINDS as readonly string[]).includes(kind) ? (kind as Kind) : "grid";
  const queryClient = useQueryClient();

  const detailFn = k === "signal" ? botsApi.signalBot : k === "grid" ? botsApi.gridBot : botsApi.martingaleBot;
  const { data: bot, isLoading } = useQuery({
    queryKey: ["bot", k, id],
    queryFn: () => detailFn(id),
    refetchInterval: 5000, // polling per §12 — bot status has no WS push
  });

  const ordersFilterKey = `${k}_bot`;
  const { data: ordersRaw } = useQuery({
    queryKey: ["bot-orders", k, id],
    queryFn: () => botsApi.orders({ [ordersFilterKey]: id, page: 1 }),
    refetchInterval: 10000,
    enabled: !!id,
  });
  const orders: Order[] = useMemo(() => asList<Order>(ordersRaw).slice(0, 25), [ordersRaw]);

  const [busy, setBusy] = React.useState(false);
  const toggle = async () => {
    const running = (bot as any)?.is_running || (bot as any)?.status === "running";
    setBusy(true);
    try {
      if (k === "grid") await (running ? botsApi.gridStop(id) : botsApi.gridStart(id));
      else await (running ? botsApi.martingaleStop(id) : botsApi.martingaleStart(id));
      toast.success(running ? "Bot stopped" : "Bot started");
      queryClient.invalidateQueries({ queryKey: ["bot", k, id] });
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!bot) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground mb-3">This bot could not be loaded.</p>
          <Button asChild variant="outline"><Link to="/dashboard/bots">Back to My Bots</Link></Button>
        </CardContent>
      </Card>
    );
  }

  const b = bot as any;
  const running = b.is_running || b.status === "running";
  const isSignal = k === "signal";
  const pnl = parseFloat(b.total_profit_loss || "0");

  const config: [string, string][] = [
    ["Exchange", b.exchange_name || b.exchange || "—"],
    ["Trading pair", b.trading_pair || "—"],
    ...(isSignal
      ? [
          ["Default amount", `${b.default_amount ?? "—"} USDT`],
          ["Webhook ID", b.webhook_id ?? "—"],
        ]
      : [
          ["Base order amount", `${b.base_amount ?? "—"} USDT`],
          ["Levels", `${b.against_levels ?? "—"} buy / ${b.favor_levels ?? "—"} sell`],
          ["Level spacing", `${b.level_spacing_percent ?? "—"}%`],
          ...(k === "martingale" ? [["Multiplier", String(b.multiplier_factor ?? "—")]] : []),
          ["Take profit", b.take_profit_percent != null ? `${b.take_profit_percent}%` : "—"],
          ["Stop loss", b.stop_loss_percent != null ? `${b.stop_loss_percent}%` : "—"],
        ]),
    ["Total trades", String(b.total_trades ?? 0)],
    ["Successful trades", String(b.successful_trades ?? 0)],
    ["Created", b.created_at ? new Date(b.created_at).toLocaleString() : "—"],
  ];

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link to="/dashboard/bots"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{b.bot_name || "Bot"}</h1>
              <Badge className={statusColor(b.status || (running ? "running" : "stopped"))}>
                {b.status || (running ? "running" : "stopped")}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {k === "grid" ? "Grid bot" : k === "martingale" ? "Martingale bot" : "Signal bot"} · auto-refreshing every 5s
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isSignal && (
            <Button onClick={toggle} disabled={busy}>
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : running ? <Square className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {running ? "Stop Bot" : "Start Bot"}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Profit / Loss</CardTitle></CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
              {pnl >= 0 ? "+" : "-"}${Math.abs(pnl).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Trades</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{b.total_trades ?? 0}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Win Rate</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {b.total_trades ? Math.round(((b.successful_trades ?? 0) / b.total_trades) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Status</CardTitle></CardHeader>
          <CardContent>
            <Badge className={statusColor(b.status || (running ? "running" : "stopped"))}>
              {b.status || (running ? "running" : "stopped")}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>How this bot is set up.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {config.map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-border/50 py-1.5">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-right">{value}</span>
              </div>
            ))}
            {isSignal && b.webhook_url && (
              <div className="pt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium"><Webhook className="h-4 w-4" /> TradingView webhook</div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 truncate rounded bg-muted px-2 py-1 text-xs">{b.webhook_url}</code>
                  <Button variant="ghost" size="icon" onClick={() => copy(b.webhook_url, "Webhook URL")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Paste this into your TradingView alert webhook URL.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Orders executed by this bot (polls every 10s).</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">No orders yet. They will appear here once the bot trades.</p>
            ) : (
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="h-10 px-4 text-left font-medium">Time</th>
                        <th className="h-10 px-4 text-left font-medium">Pair</th>
                        <th className="h-10 px-4 text-left font-medium">Side</th>
                        <th className="h-10 px-4 text-left font-medium">Qty</th>
                        <th className="h-10 px-4 text-left font-medium">Price</th>
                        <th className="h-10 px-4 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-3">{new Date(o.created_at).toLocaleString()}</td>
                          <td className="p-3 font-medium">{o.pair}</td>
                          <td className={`p-3 font-medium ${o.side === "BUY" ? "text-green-500" : "text-red-500"}`}>{o.side}</td>
                          <td className="p-3">{o.quantity}</td>
                          <td className="p-3">{o.price}</td>
                          <td className="p-3"><Badge className={statusColor(o.status)}>{o.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BotDetail;
