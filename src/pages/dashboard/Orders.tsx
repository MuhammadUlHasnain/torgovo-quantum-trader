import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { botsApi, asList } from "@/lib/services";
import { SUPPORTED_EXCHANGES } from "@/types/api";
import type { Order } from "@/types/api";

const statusColor = (s: string) => {
  switch (s) {
    case "executed": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "failed": case "cancelled": return "bg-red-500/10 text-red-500 border-red-500/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

const Orders = () => {
  // Filters per brief §14.8: ?pair=&exchange=&start_date=&end_date=&status=&side=&order_type=
  const [pair, setPair] = useState("");
  const [exchange, setExchange] = useState("");
  const [status, setStatus] = useState("");
  const [side, setSide] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({ pair, exchange, status, side, start_date: startDate, end_date: endDate, page }),
    [pair, exchange, status, side, startDate, endDate, page]
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["orders", filters],
    queryFn: () => botsApi.orders(filters),
    placeholderData: (prev) => prev,
  });

  const rows = useMemo(() => asList<Order>(data), [data]);
  const pag = data as any;
  const total = typeof pag?.count === "number" ? pag.count : rows.length;
  const hasNext = !!pag?.next;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Order history across all of your bots.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><Search className="h-4 w-4" /> Filters</CardTitle>
          <CardDescription>Filter by pair, exchange, side, status or date range.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          <div className="space-y-1">
            <Label htmlFor="f-pair">Pair</Label>
            <Input id="f-pair" placeholder="BTC/USDT" value={pair} onChange={(e) => { setPair(e.target.value.toUpperCase()); setPage(1); }} />
          </div>
          <div className="space-y-1">
            <Label>Exchange</Label>
            <Select value={exchange} onValueChange={(v) => { setExchange(v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All</SelectItem>
                {SUPPORTED_EXCHANGES.map((e) => (
                  <SelectItem key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Side</Label>
            <Select value={side} onValueChange={(v) => { setSide(v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All</SelectItem>
                <SelectItem value="BUY">Buy</SelectItem>
                <SelectItem value="SELL">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="executed">Executed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="f-start">From</Label>
            <Input id="f-start" type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setPage(1); }} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="f-end">To</Label>
            <Input id="f-end" type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setPage(1); }} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            {isLoading ? "Loading…" : `${total} order${total === 1 ? "" : "s"} found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : rows.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-10">No orders found. Adjust your filters or wait for your bots to trade.</p>
          ) : (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="h-10 px-4 text-left font-medium">Date</th>
                      <th className="h-10 px-4 text-left font-medium">Pair</th>
                      <th className="h-10 px-4 text-left font-medium">Side</th>
                      <th className="h-10 px-4 text-left font-medium">Type</th>
                      <th className="h-10 px-4 text-left font-medium">Qty</th>
                      <th className="h-10 px-4 text-left font-medium">Price</th>
                      <th className="h-10 px-4 text-left font-medium">Exchange</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((o) => (
                      <tr key={o.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 whitespace-nowrap">{new Date(o.created_at).toLocaleString()}</td>
                        <td className="p-3 font-medium">{o.pair}</td>
                        <td className={`p-3 font-medium ${o.side === "BUY" ? "text-green-500" : "text-red-500"}`}>{o.side}</td>
                        <td className="p-3">{o.order_type}</td>
                        <td className="p-3">{o.quantity}</td>
                        <td className="p-3">{o.price}</td>
                        <td className="p-3 capitalize">{o.exchange}</td>
                        <td className="p-3"><Badge className={statusColor(o.status)}>{o.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground">Page {page}{isFetching ? " · refreshing…" : ""}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1 || isFetching} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
              <Button variant="outline" size="sm" disabled={!hasNext || isFetching} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
