import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Gift, Users, Wallet, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { referralsApi, asPayoutRequests } from "@/lib/services";
import { errorMessage } from "@/lib/api";
import type { ReferralStats, PayoutRequestRow } from "@/types/api";

const statusColor = (s: string) => {
  switch (s) {
    case "approved": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "rejected": return "bg-red-500/10 text-red-500 border-red-500/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

const Referrals = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["referral-stats"], queryFn: referralsApi.myStats });
  const { data: payoutsRaw, isLoading: payoutsLoading } = useQuery({
    queryKey: ["payout-requests"],
    queryFn: referralsApi.payoutRequests,
  });
  const payouts = useMemo(() => asPayoutRequests(payoutsRaw), [payoutsRaw]);

  const stats = data as ReferralStats | undefined;
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const min = stats ? parseFloat(stats.payout_minimum_usd || "0") : 0;
  const pendingCommission = stats ? parseFloat(stats.commission_pending_usd || "0") : 0;

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const requestPayout = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt < min) {
      toast.error(`Minimum payout amount is $${min.toFixed(2)}`);
      return;
    }
    if (stats?.has_pending_payout_request) {
      toast.error("You already have a pending payout request.");
      return;
    }
    setSubmitting(true);
    try {
      await referralsApi.requestPayout(amount);
      toast.success("Payout request submitted for review.");
      setOpen(false);
      setAmount("");
      queryClient.invalidateQueries({ queryKey: ["payout-requests"] });
      queryClient.invalidateQueries({ queryKey: ["referral-stats"] });
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}</div>
      </div>
    );
  }

  const isCommission = stats?.reward_model === "commission";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Referrals</h1>
        <p className="text-muted-foreground">
          Share your link and earn {isCommission ? "commission on your referrals' subscription payments" : "discounts for people you refer"}.
        </p>
      </div>

      {/* Referral link + code */}
      <Card>
        <CardHeader>
          <CardTitle>Your referral link</CardTitle>
          <CardDescription>Anyone signing up through this link counts as your referral.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <code className="flex-1 truncate rounded-md border bg-muted px-3 py-2 text-sm">{stats?.referral_link || "—"}</code>
            <Button variant="outline" onClick={() => stats?.referral_link && copy(stats.referral_link, "Referral link")}>
              <Copy className="mr-2 h-4 w-4" /> Copy link
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Code:</span>
            <code className="rounded bg-muted px-2 py-1">{stats?.referral_code || "—"}</code>
            <Button variant="ghost" size="sm" onClick={() => stats?.referral_code && copy(stats.referral_code, "Referral code")}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats?.total_referrals ?? 0}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bonus Earned</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">${stats?.total_bonus_usdt ?? "0.00"}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Model</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{isCommission ? "Commission" : "Referee discount"}</div>
            <p className="text-xs text-muted-foreground">
              {isCommission && stats?.commission_pct ? `${stats.commission_pct}% commission on referral payments` : stats?.referee_discount_pct ? `${stats.referee_discount_pct}% discount applied for your referrals` : "—"}
            </p>
          </CardContent>
        </Card>
        {isCommission && (
          <>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Commission Pending</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">${stats?.commission_pending_usd ?? "0.00"}</div></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Commission Paid Out</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">${stats?.commission_paid_usd ?? "0.00"}</div></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Payout Minimum</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${min.toFixed(2)}</div>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="mt-2 bg-torgovo-purple hover:bg-torgovo-purple/90" disabled={stats?.has_pending_payout_request || pendingCommission < min}>
                      {stats?.has_pending_payout_request ? "Payout already pending" : "Request payout"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request payout</DialogTitle>
                      <DialogDescription>Available pending commission: ${stats?.commission_pending_usd ?? "0.00"} · minimum ${min.toFixed(2)}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Label htmlFor="payout-amount">Amount (USD)</Label>
                      <Input id="payout-amount" type="number" min={min} step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={min > 0 ? min.toFixed(2) : "0.00"} />
                    </div>
                    <Button className="w-full bg-torgovo-purple hover:bg-torgovo-purple/90" disabled={submitting} onClick={requestPayout}>
                      {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit request
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Payout requests */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Requests</CardTitle>
          <CardDescription>Status of your commission payout requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {payoutsLoading ? (
            <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : payouts.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">No payout requests yet.</p>
          ) : (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="h-10 px-4 text-left font-medium">Requested</th>
                      <th className="h-10 px-4 text-left font-medium">Amount</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-left font-medium">Decided</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payouts.map((p: PayoutRequestRow) => (
                      <tr key={p.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3">{new Date(p.requested_at).toLocaleDateString()}</td>
                        <td className="p-3 font-medium">${p.amount_requested}</td>
                        <td className="p-3"><Badge className={statusColor(p.status)}>{p.status}</Badge></td>
                        <td className="p-3">
                          {p.decided_at ? new Date(p.decided_at).toLocaleDateString() : <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> awaiting review</span>}
                        </td>
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
  );
};

export default Referrals;
