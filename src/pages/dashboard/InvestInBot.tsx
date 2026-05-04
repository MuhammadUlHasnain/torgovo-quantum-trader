import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, CheckCircle2, AlertCircle, TrendingUp, Users, DollarSign, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Demo wallet addresses (will be fetched from backend)
const DEMO_WALLET_ADDRESSES = [
  { coin: "USDT", address: "TXa7Ks8Bm9x3P4nQ2vR5tY6uI8oP", network: "TRC20" },
  { coin: "USDC", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", network: "ERC20" },
  { coin: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin" },
  { coin: "ETH", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", network: "ERC20" },
  { coin: "BNB", address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2", network: "BEP20" },
];

const MANAGED_BOTS = {
  grid: {
    name: "Grid Trading Bot",
    type: "grid",
    description: "Automated grid trading strategy that profits from market volatility",
    min_investment: "100",
    guaranteed_return: "5-8%",
    performance_30d: "+12.5%",
    total_subscribers: 234,
  },
  martingale: {
    name: "Martingale Trading Bot",
    type: "martingale",
    description: "DCA strategy with intelligent position sizing",
    min_investment: "200",
    guaranteed_return: "8-12%",
    performance_30d: "+15.3%",
    total_subscribers: 189,
  },
  ai_grid: {
    name: "QuantumAI Bot",
    type: "ai_grid",
    description: "Advanced QuantumAI grid trading with machine learning optimization",
    min_investment: "500",
    guaranteed_return: "10-15%",
    performance_30d: "+18.7%",
    total_subscribers: 156,
  },
};

const InvestInBot = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const botType = searchParams.get('type') as 'grid' | 'martingale' | 'ai_grid' || 'grid';
  const bot = MANAGED_BOTS[botType];

  const [selectedCoin, setSelectedCoin] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedWallet = DEMO_WALLET_ADDRESSES.find(w => w.coin === selectedCoin);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    toast.success("Address copied to clipboard");
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < parseFloat(bot.min_investment)) {
      toast.error(`Minimum investment is ${bot.min_investment} ${selectedCoin}`);
      return;
    }

    if (!transactionHash || transactionHash.length < 10) {
      toast.error("Please enter a valid transaction hash");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Investment request submitted successfully! Your investment will be confirmed shortly.");
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invest in {bot.name}</h1>
          <p className="text-muted-foreground">{bot.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bot Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Bot Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Min Investment</span>
                <span className="font-semibold">${bot.min_investment}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Expected Return</span>
                <span className="font-semibold text-green-500">{bot.guaranteed_return}/month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">30-Day Performance</span>
                <div className="flex items-center text-green-500 font-semibold">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {bot.performance_30d}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subscribers</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-semibold">{bot.total_subscribers}</span>
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Your investment will be confirmed within 24 hours after transaction verification
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Investment Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Make Investment</CardTitle>
            <CardDescription>
              Send your investment to one of our wallet addresses below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Coin */}
              <div className="space-y-2">
                <Label>Select Cryptocurrency</Label>
                <Tabs value={selectedCoin} onValueChange={setSelectedCoin}>
                  <TabsList className="grid grid-cols-5">
                    {DEMO_WALLET_ADDRESSES.map((wallet) => (
                      <TabsTrigger key={wallet.coin} value={wallet.coin}>
                        {wallet.coin}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Wallet Address */}
              <div className="space-y-2">
                <Label>Wallet Address ({selectedWallet?.network})</Label>
                <div className="flex gap-2">
                  <Input
                    value={selectedWallet?.address || ""}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopyAddress(selectedWallet?.address || "")}
                  >
                    {copiedAddress === selectedWallet?.address ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Send only {selectedCoin} to this address via {selectedWallet?.network} network
                </p>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Investment Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder={`Min: ${bot.min_investment}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                    min={bot.min_investment}
                    step="0.01"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum investment: ${bot.min_investment} {selectedCoin}
                </p>
              </div>

              {/* Transaction Hash */}
              <div className="space-y-2">
                <Label htmlFor="txHash">Transaction Hash</Label>
                <Input
                  id="txHash"
                  placeholder="Enter transaction hash after sending"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  className="font-mono text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter the transaction hash from your wallet after sending the funds
                </p>
              </div>

              {/* Warning */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Important:</strong> Make sure you've sent the exact amount to the correct address. 
                  Incorrect transactions cannot be reversed.
                </AlertDescription>
              </Alert>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-accent-primary hover:bg-accent-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Investment"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestInBot;
