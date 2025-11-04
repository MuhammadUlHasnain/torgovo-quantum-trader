import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, CheckCircle2, AlertCircle, ArrowLeft, Eye, EyeOff, Zap } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const CreateCustomBot = () => {
  const navigate = useNavigate();
  const [botType, setBotType] = useState<'spot' | 'futures'>('spot');
  const [botName, setBotName] = useState("");
  const [exchange, setExchange] = useState<string>("");
  const [tradingMode, setTradingMode] = useState<'demo' | 'real'>('demo');
  const [tradeAmountType, setTradeAmountType] = useState<'percentage' | 'fixed'>('percentage');
  const [tradeAmountValue, setTradeAmountValue] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createdBot, setCreatedBot] = useState<any>(null);

  const exchanges = ['binance', 'bybit', 'kraken', 'mexc', 'okx'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!botName || !exchange || !apiKey || !apiSecret || !tradeAmountValue) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsCreating(true);

    // Simulate API call
    setTimeout(() => {
      const systemId = `${Math.random().toString(36).substr(2, 6)}-${Math.random().toString(36).substr(2, 6)}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
      const webhookSecret = Math.random().toString(36).substr(2, 20);
      const webhookUrl = `http://localhost:8000/api/custom-bot/webhook/receive/${webhookSecret}/`;

      const botData = {
        id: systemId,
        name: botName,
        bot_type: botType,
        trading_mode: tradingMode,
        exchange,
        webhook_url: webhookUrl,
        webhook_secret: webhookSecret,
        system_generated_id: systemId,
        trade_amount_type: tradeAmountType,
        trade_amount_value: parseFloat(tradeAmountValue),
        tradingview_json: {
          action: "{{strategy.order.action}}",
          ticker: "{{ticker}}",
          price: "{{close}}",
          quantity: "{{strategy.order.contracts}}",
          secret: webhookSecret
        }
      };

      setCreatedBot(botData);
      setIsCreating(false);
      toast.success("Custom bot created successfully!");
    }, 1500);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (createdBot) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/bots')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bot Created Successfully</h1>
            <p className="text-muted-foreground">Your custom {botType} trading bot is ready</p>
          </div>
        </div>

        <Alert className="bg-green-500/10 border-green-500">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription>
            Bot <strong>{createdBot.name}</strong> has been created and is ready to receive TradingView alerts
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Bot Configuration</CardTitle>
            <CardDescription>
              Use these details to configure your TradingView alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">System Generated ID</Label>
                <div className="flex gap-2">
                  <Input
                    value={createdBot.system_generated_id}
                    readOnly
                    className="font-mono bg-muted"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleCopy(createdBot.system_generated_id, "Bot ID")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={createdBot.webhook_url}
                    readOnly
                    className="font-mono text-xs bg-muted"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleCopy(createdBot.webhook_url, "Webhook URL")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use this URL in your TradingView alert settings
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">TradingView Alert Message (JSON)</Label>
                <div className="relative">
                  <pre className="p-4 rounded-md bg-muted text-xs font-mono overflow-x-auto">
{JSON.stringify(createdBot.tradingview_json, null, 2)}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(JSON.stringify(createdBot.tradingview_json), "JSON config")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Copy and paste this JSON into your TradingView alert message field
                </p>
              </div>
            </div>

            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Bot Details:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Exchange: <strong>{createdBot.exchange.toUpperCase()}</strong></li>
                  <li>• Trading Mode: <strong>{createdBot.trading_mode.toUpperCase()}</strong></li>
                  <li>• Bot Type: <strong>{createdBot.bot_type.toUpperCase()}</strong></li>
                  <li>• Trade Amount: <strong>
                    {createdBot.trade_amount_type === 'percentage' 
                      ? `${createdBot.trade_amount_value}% of wallet` 
                      : `${createdBot.trade_amount_value} ${createdBot.bot_type === 'futures' ? 'USDT' : 'coins'}`
                    }
                  </strong></li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/dashboard/bots')}
              >
                View All Bots
              </Button>
              <Button
                className="flex-1 bg-accent-primary hover:bg-accent-primary/90"
                onClick={() => {
                  setCreatedBot(null);
                  setBotName("");
                  setApiKey("");
                  setApiSecret("");
                  setTradeAmountValue("");
                }}
              >
                Create Another Bot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Custom Trading Bot</h1>
          <p className="text-muted-foreground">Connect your TradingView strategy to automated trading</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bot Configuration</CardTitle>
          <CardDescription>
            Configure your custom bot to execute TradingView alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bot Type Selection */}
            <div className="space-y-2">
              <Label>Bot Type</Label>
              <Tabs value={botType} onValueChange={(v) => setBotType(v as 'spot' | 'futures')}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="spot">Spot Trading</TabsTrigger>
                  <TabsTrigger value="futures">Futures Trading</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Bot Name */}
            <div className="space-y-2">
              <Label htmlFor="botName">Bot Name *</Label>
              <Input
                id="botName"
                placeholder="e.g., BTC Scalping Bot"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                required
              />
            </div>

            {/* Exchange Selection */}
            <div className="space-y-2">
              <Label htmlFor="exchange">Exchange *</Label>
              <Select value={exchange} onValueChange={setExchange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select exchange" />
                </SelectTrigger>
                <SelectContent>
                  {exchanges.map((ex) => (
                    <SelectItem key={ex} value={ex}>
                      {ex.charAt(0).toUpperCase() + ex.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Trading Mode */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Trading Mode</Label>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${tradingMode === 'demo' ? 'text-accent-primary font-medium' : 'text-muted-foreground'}`}>
                    Demo
                  </span>
                  <Switch
                    checked={tradingMode === 'real'}
                    onCheckedChange={(checked) => setTradingMode(checked ? 'real' : 'demo')}
                  />
                  <span className={`text-sm ${tradingMode === 'real' ? 'text-accent-primary font-medium' : 'text-muted-foreground'}`}>
                    Real
                  </span>
                </div>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {tradingMode === 'demo' 
                    ? "Demo mode uses virtual funds for testing your strategy" 
                    : "Real mode executes actual trades on the exchange"}
                </AlertDescription>
              </Alert>
            </div>

            {/* Trade Amount Configuration */}
            <div className="space-y-4">
              <Label>Trade Amount Configuration</Label>
              <Tabs value={tradeAmountType} onValueChange={(v) => setTradeAmountType(v as 'percentage' | 'fixed')}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="percentage">Percentage of Wallet</TabsTrigger>
                  <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder={tradeAmountType === 'percentage' ? "e.g., 10 (for 10%)" : "e.g., 100 (USDT or coins)"}
                  value={tradeAmountValue}
                  onChange={(e) => setTradeAmountValue(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {tradeAmountType === 'percentage'
                    ? "Percentage of your wallet balance to use per trade"
                    : "Fixed amount in USDT (futures) or coins (spot) per trade"}
                </p>
              </div>
            </div>

            {/* API Credentials */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Exchange API Key *</Label>
                <Input
                  id="apiKey"
                  type="text"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiSecret">Exchange API Secret *</Label>
                <div className="relative">
                  <Input
                    id="apiSecret"
                    type={showApiSecret ? "text" : "password"}
                    placeholder="Enter your API secret"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    className="font-mono pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowApiSecret(!showApiSecret)}
                  >
                    {showApiSecret ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Your API credentials are encrypted and stored securely. We only need trading permissions, 
                  do not grant withdrawal permissions.
                </AlertDescription>
              </Alert>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent-primary hover:bg-accent-primary/90"
                disabled={isCreating}
              >
                {isCreating ? "Creating Bot..." : "Create Bot"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCustomBot;
