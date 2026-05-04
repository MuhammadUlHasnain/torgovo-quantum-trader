import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Webhook, LineChart, Settings, Zap, Code, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const SignalBots = () => {
  const tradingViewSteps = [
    { step: "1", title: "Create Your Bot", description: "Set up your Signal bot with exchange API keys and trading parameters" },
    { step: "2", title: "Get Webhook URL", description: "System generates unique webhook URL and TradingView JSON for you" },
    { step: "3", title: "Set Up Alerts", description: "Configure TradingView alerts with your webhook URL and JSON payload" },
    { step: "4", title: "Auto Trading", description: "Bot executes trades automatically based on TradingView signals" },
  ];

  const features = [
    { icon: Webhook, title: "TradingView Integration", description: "Seamlessly connect your TradingView alerts to execute trades automatically" },
    { icon: Zap, title: "Instant Execution", description: "Lightning-fast trade execution when alerts trigger" },
    { icon: Settings, title: "Customizable Parameters", description: "Full control over trade size, exchange, and risk management" },
    { icon: Code, title: "JSON Configuration", description: "Simple JSON format for easy TradingView alert setup" },
    { icon: BarChart3, title: "Real-time Tracking", description: "Monitor all trades and performance in your dashboard" },
    { icon: LineChart, title: "Multiple Exchanges", description: "Support for Binance, Bybit, MEXC, OKX, KuCoin, and Bitget" },
  ];

  return (
    <Layout>
      <HeroSection
        heroTitle="Signal Trading Bots"
        subtitle="Create your own Signal bot driven by TradingView alerts. Full control, automated execution, real-time tracking."
      >
        <div className="flex gap-4 flex-wrap justify-center">
          <Button className="bg-accent-primary hover:bg-accent-primary/90" asChild>
            <Link to="/dashboard/create-signal-bot">Create Signal Bot</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/pricing?type=signal">View Pricing</Link>
          </Button>
        </div>
      </HeroSection>

      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Signal Bots Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect your TradingView strategies to automated trading in 4 simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {tradingViewSteps.map((item) => (
            <Card key={item.step} className="glass-card">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-torgovo-blue to-torgovo-purple flex items-center justify-center mb-4">
                  <span className="font-bold text-white text-xl">{item.step}</span>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-torgovo-blue">SPOT Signal Bot</CardTitle>
              <CardDescription>Perfect for straightforward buy/sell strategies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {[
                  "Single entry and exit trades",
                  "No leverage, lower risk",
                  "Ideal for swing trading strategies",
                  "Compatible with all TradingView indicators",
                  "Demo and live trading modes",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-torgovo-blue mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-torgovo-blue hover:bg-torgovo-blue/90" asChild>
                <Link to="/dashboard/create-signal-bot?type=spot">Create SPOT Signal Bot</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-torgovo-purple">FUTURES Signal Bot</CardTitle>
              <CardDescription>Advanced trading with leverage for experienced traders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {[
                  "Long and short positions with leverage",
                  "Advanced risk management features",
                  "Perfect for scalping and day trading",
                  "Multiple take-profit and stop-loss levels",
                  "Demo mode for strategy testing",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-torgovo-purple mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-torgovo-purple hover:bg-torgovo-purple-dim" asChild>
                <Link to="/dashboard/create-signal-bot?type=futures">Create FUTURES Signal Bot</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Powerful Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-torgovo-purple mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">TradingView Alert Configuration</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              After creating your Signal bot, you'll receive a webhook URL and JSON configuration. Here's what it looks like:
            </p>
            <div className="bg-sidebar-accent rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">Webhook URL:</p>
                <code className="text-sm bg-background px-3 py-2 rounded block overflow-x-auto">
                  https://api.torgovo.com/webhook/receive/abc123-def456-ghi789/
                </code>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Alert Message (JSON):</p>
                <pre className="text-sm bg-background px-3 py-2 rounded overflow-x-auto">
{`{
  "action": "{{strategy.order.action}}",
  "ticker": "{{ticker}}",
  "price": "{{close}}",
  "quantity": "{{strategy.order.contracts}}",
  "secret": "abc123-def456-ghi789"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Bot Configuration Options</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-torgovo-purple">Trading Parameters</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Choose trading pair (BTC/USDT, ETH/USDT, etc.)</li>
                <li>• Select exchange (Binance, Bybit, MEXC, OKX, KuCoin, Bitget)</li>
                <li>• Set trade amount (percentage or fixed amount)</li>
                <li>• Configure leverage for futures (1x-100x)</li>
                <li>• Enable demo mode for testing</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-torgovo-purple">Security & API</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Secure API key storage</li>
                <li>• API keys never exposed in webhooks</li>
                <li>• Unique webhook secret for verification</li>
                <li>• Transaction logging and history</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Do I need a TradingView subscription?", a: "Yes, you need at least a TradingView Pro subscription to use webhook alerts. Free TradingView accounts cannot send webhook notifications." },
              { q: "How secure are my API keys?", a: "Your API keys are encrypted and stored securely. They are never exposed in webhooks or logs. We recommend using API keys with trading-only permissions (no withdrawal rights)." },
              { q: "Can I test my bot before using real money?", a: "Yes! All Signal bots support demo mode where you can test your strategies with simulated trades before going live." },
              { q: "What exchanges are supported?", a: "Signal bots support Binance, Bybit, MEXC, OKX, KuCoin, and Bitget." },
              { q: "How many bots can I create?", a: "The number of bots you can create depends on your subscription plan. Check our pricing page for details." },
            ].map((item, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-0">
                <h3 className="font-semibold mb-2 text-torgovo-purple">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Trading?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create your Signal bot in minutes and start executing trades automatically based on your TradingView strategies
          </p>
          <Button size="lg" className="bg-gradient-to-r from-torgovo-blue to-torgovo-purple hover:opacity-90" asChild>
            <Link to="/dashboard/create-signal-bot">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SignalBots;
