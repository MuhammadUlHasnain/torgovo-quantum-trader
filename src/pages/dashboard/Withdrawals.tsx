import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Mock data for investments
const mockInvestments = [
  {
    id: 1,
    bot_name: "Grid Trading Bot",
    bot_type: "grid",
    amount: "1000",
    current_value: "1125.50",
    profit_loss: "125.50",
    profit_loss_percentage: "12.55",
    status: "active",
  },
  {
    id: 2,
    bot_name: "Martingale Bot",
    bot_type: "martingale",
    amount: "2000",
    current_value: "2305.00",
    profit_loss: "305.00",
    profit_loss_percentage: "15.25",
    status: "active",
  },
  {
    id: 3,
    bot_name: "AI Grid Bot",
    bot_type: "ai_grid",
    amount: "5000",
    current_value: "5935.00",
    profit_loss: "935.00",
    profit_loss_percentage: "18.70",
    status: "active",
  },
];

// Mock withdrawal requests
const mockWithdrawals = [
  {
    id: 1,
    investment_id: 1,
    bot_name: "Grid Trading Bot",
    amount: "500.00",
    status: "pending",
    requested_at: "2025-01-10T10:30:00Z",
  },
  {
    id: 2,
    investment_id: 2,
    bot_name: "Martingale Bot",
    amount: "1000.00",
    status: "completed",
    requested_at: "2025-01-08T14:20:00Z",
    processed_at: "2025-01-09T09:15:00Z",
  },
  {
    id: 3,
    investment_id: 1,
    bot_name: "Grid Trading Bot",
    amount: "200.00",
    status: "rejected",
    requested_at: "2025-01-05T16:45:00Z",
    processed_at: "2025-01-06T11:30:00Z",
    rejection_reason: "Minimum holding period not met",
  },
];

const Withdrawals = () => {
  const [selectedInvestment, setSelectedInvestment] = useState<string>("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedInvestment || !withdrawalAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    const investment = mockInvestments.find(inv => inv.id.toString() === selectedInvestment);
    if (!investment) return;

    const amount = parseFloat(withdrawalAmount);
    const available = parseFloat(investment.current_value);

    if (amount > available) {
      toast.error("Withdrawal amount exceeds available balance");
      return;
    }

    if (amount < 50) {
      toast.error("Minimum withdrawal amount is $50");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Withdrawal request submitted successfully! It will be processed within 24-48 hours.");
      setIsSubmitting(false);
      setIsDialogOpen(false);
      setSelectedInvestment("");
      setWithdrawalAmount("");
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case 'completed':
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case 'rejected':
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Withdrawals</h1>
          <p className="text-muted-foreground">
            Request withdrawals from your managed bot investments
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent-primary hover:bg-accent-primary/90">
              <DollarSign className="mr-2 h-4 w-4" />
              Request Withdrawal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Withdrawal</DialogTitle>
              <DialogDescription>
                Withdraw funds from your managed bot investments
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitWithdrawal} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="investment">Select Investment</Label>
                <Select value={selectedInvestment} onValueChange={setSelectedInvestment} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose investment" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInvestments.map((inv) => (
                      <SelectItem key={inv.id} value={inv.id.toString()}>
                        {inv.bot_name} - Available: ${inv.current_value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedInvestment && (
                <>
                  <div className="p-4 rounded-md bg-muted space-y-2">
                    {(() => {
                      const inv = mockInvestments.find(i => i.id.toString() === selectedInvestment);
                      return inv ? (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Initial Investment:</span>
                            <span className="font-medium">${inv.amount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current Value:</span>
                            <span className="font-medium">${inv.current_value}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Profit/Loss:</span>
                            <span className="font-medium text-green-500">
                              +${inv.profit_loss} ({inv.profit_loss_percentage}%)
                            </span>
                          </div>
                        </>
                      ) : null;
                    })()}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Minimum: $50"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      min="50"
                      step="0.01"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum withdrawal amount is $50
                    </p>
                  </div>
                </>
              )}

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3">
                <p className="text-xs text-yellow-600 dark:text-yellow-500">
                  <strong>Note:</strong> Withdrawal requests are processed within 24-48 hours. 
                  A 2% processing fee may apply.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-accent-primary hover:bg-accent-primary/90"
                  disabled={isSubmitting || !selectedInvestment}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Investments */}
      <Card>
        <CardHeader>
          <CardTitle>Active Investments</CardTitle>
          <CardDescription>
            Your current managed bot investments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvestments.map((investment) => (
              <div
                key={investment.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-md border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{investment.bot_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Initial: ${investment.amount}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2 md:mt-0">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-lg font-semibold">${investment.current_value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Profit/Loss</p>
                    <p className="text-lg font-semibold text-green-500">
                      +${investment.profit_loss} ({investment.profit_loss_percentage}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal History */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
          <CardDescription>
            Your recent withdrawal requests and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWithdrawals.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-md border bg-card"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{withdrawal.bot_name}</h4>
                    <Badge className={getStatusColor(withdrawal.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(withdrawal.status)}
                        {withdrawal.status}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Requested: {new Date(withdrawal.requested_at).toLocaleDateString()}
                  </p>
                  {withdrawal.processed_at && (
                    <p className="text-sm text-muted-foreground">
                      Processed: {new Date(withdrawal.processed_at).toLocaleDateString()}
                    </p>
                  )}
                  {withdrawal.rejection_reason && (
                    <p className="text-sm text-red-500">
                      Reason: {withdrawal.rejection_reason}
                    </p>
                  )}
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-lg font-semibold">${withdrawal.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdrawals;
