import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftRight } from "lucide-react";
import { paymentsApi, asList } from "@/lib/services";
import type { PaymentTransaction } from "@/types/api";

const statusColor = (s: string) => {
  switch (s) {
    case "completed": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "failed": return "bg-red-500/10 text-red-500 border-red-500/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

const typeLabel: Record<string, string> = {
  deposit: "Deposit",
  withdrawal: "Withdrawal",
  quantum_ai_payout: "QuantumAI payout",
  referral_bonus: "Referral bonus",
  subscription: "Subscription",
};

const Transactions = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["transactions", page],
    queryFn: () => paymentsApi.transactions(page),
    placeholderData: (prev) => prev,
  });

  const rows = useMemo(() => asList<PaymentTransaction>(data), [data]);
  const pag = data as any;
  const total = typeof pag?.count === "number" ? pag.count : rows.length;
  const hasNext = !!pag?.next;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">Deposits, withdrawals, payouts and subscription charges.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><ArrowLeftRight className="h-4 w-4" /> History</CardTitle>
          <CardDescription>{isLoading ? "Loading…" : `${total} transaction${total === 1 ? "" : "s"}`}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : rows.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <ArrowLeftRight className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No transactions found.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="h-10 px-4 text-left font-medium">Date</th>
                      <th className="h-10 px-4 text-left font-medium">Description</th>
                      <th className="h-10 px-4 text-left font-medium">Type</th>
                      <th className="h-10 px-4 text-left font-medium">Amount</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((t) => (
                      <tr key={t.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 whitespace-nowrap">{new Date(t.created_at).toLocaleString()}</td>
                        <td className="p-3">{t.description || "—"}</td>
                        <td className="p-3">{typeLabel[t.transaction_type] ?? t.transaction_type}</td>
                        <td className={`p-3 font-medium ${t.transaction_type === "deposit" || t.transaction_type === "referral_bonus" || t.transaction_type === "quantum_ai_payout" ? "text-green-500" : "text-foreground"}`}>
                          {t.amount} {t.currency}
                        </td>
                        <td className="p-3"><Badge className={statusColor(t.status)}>{t.status}</Badge></td>
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

export default Transactions;
