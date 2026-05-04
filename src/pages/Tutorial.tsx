
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download, FileText, PlayCircle, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Tutorial = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="Learn Automated Trading"
        subtitle="Follow our comprehensive tutorials to set up and optimize your trading bots"
      >
        <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
          Download Quick Start Guide
        </Button>
      </HeroSection>

      <div className="container py-12">
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="api-setup">API Setup</TabsTrigger>
            <TabsTrigger value="bot-creation">Bot Creation</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="risk-management">Risk Management</TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <TabsContent value="getting-started" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-torgovo-blue">Welcome to Torgovo</CardTitle>
                  <CardDescription>
                    This tutorial will guide you through setting up your first trading bot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <PlayCircle size={48} />
                      <p>Video Tutorial: Introduction to Torgovo</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">What You'll Need</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-torgovo-purple mt-0.5 flex-shrink-0" />
                        <span>An account with Binance or Bybit exchange</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-torgovo-purple mt-0.5 flex-shrink-0" />
                        <span>API keys from your exchange with trading permissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-torgovo-purple mt-0.5 flex-shrink-0" />
                        <span>A Torgovo account with an active subscription</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button className="flex items-center gap-2" variant="outline">
                      <Download className="h-4 w-4" />
                      Download PDF Guide
                    </Button>
                    <Button className="flex items-center gap-2 bg-torgovo-purple hover:bg-torgovo-purple/80">
                      <PlayCircle className="h-4 w-4" />
                      Watch Full Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-torgovo-blue">Platform Overview</CardTitle>
                  <CardDescription>
                    Understanding the Torgovo dashboard and navigation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <PlayCircle size={48} />
                      <p>Video Tutorial: Navigating the Dashboard</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Key Dashboard Areas</h3>
                    <ul className="grid gap-4 md:grid-cols-2">
                      <li className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">Bot Management</h4>
                        <p className="text-sm text-muted-foreground">Create, edit, monitor and manage all your trading bots from one central location.</p>
                      </li>
                      <li className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">Analytics</h4>
                        <p className="text-sm text-muted-foreground">Track performance metrics, profit/loss statistics and trading history across all bots.</p>
                      </li>
                      <li className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">API Management</h4>
                        <p className="text-sm text-muted-foreground">Securely connect and manage your exchange API keys with proper permission settings.</p>
                      </li>
                      <li className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">Settings</h4>
                        <p className="text-sm text-muted-foreground">Configure notifications, security settings, and account preferences.</p>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api-setup" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-torgovo-blue">Exchange API Setup</CardTitle>
                  <CardDescription>
                    Safely connecting your exchange account to Torgovo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center p-4 bg-muted/30 rounded-md border border-torgovo-purple/20">
                    <div className="flex items-center gap-3 text-torgovo-purple">
                      <Shield className="h-6 w-6" />
                      <p className="font-medium">Security Best Practices</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Creating API Keys: Binance</h3>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Log into your Binance account and navigate to the API Management section</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Click "Create API Key" and complete any required verification</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Enable trading permissions only (do not enable withdrawal)</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Securely copy your API Key and Secret Key</span>
                      </li>
                    </ol>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Creating API Keys: Bybit</h3>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Log into your Bybit account and go to the API Management page</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Click "Create New API" and select "One-Click" mode</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Set permissions to "Contract Trade" only</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Safely store your API Key and Secret Key</span>
                      </li>
                    </ol>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Adding API Keys to Torgovo</h3>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="text-muted-foreground">
                        <span className="text-foreground">In the Torgovo dashboard, go to "API Management"</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Click "Add New API Key" and select your exchange</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Enter your API Key and Secret Key</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Give your connection a name (e.g., "Binance Main Account")</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Click "Test Connection" to verify everything works</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Save your API connection</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <Button className="flex items-center gap-2" variant="outline">
                      <FileText className="h-4 w-4" />
                      API Security Guide
                    </Button>
                    <Button className="flex items-center gap-2 bg-torgovo-purple hover:bg-torgovo-purple/80">
                      <PlayCircle className="h-4 w-4" />
                      Watch API Setup Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bot-creation">
              {/* Bot Creation Tab Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-torgovo-blue">Creating Your First Bot</CardTitle>
                  <CardDescription>
                    Step-by-step guide to setting up an automated trading bot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <PlayCircle size={48} />
                      <p>Video Tutorial: Bot Creation</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Bot Types Overview</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">GRID Bots</h4>
                        <p className="text-sm text-muted-foreground">Place buy and sell orders at regular intervals across a price range, profiting from market volatility.</p>
                      </div>
                      <div className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-purple mb-2">Martingale Bots</h4>
                        <p className="text-sm text-muted-foreground">Cost-averaging strategy that increases position size after losses to average down entry price.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Creating a GRID Bot</h3>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Navigate to the GRID Bots section and click "Create New Bot"</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Select your connected exchange account</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Choose a trading pair (e.g., BTC/USDT)</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Set your price range (upper and lower limits)</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Define number of grid lines (e.g., 10, 20, or 50)</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Set your investment amount</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Review settings and launch your bot</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="p-4 border border-torgovo-blue/20 rounded-md bg-torgovo-blue/5">
                    <h4 className="text-lg font-medium mb-2">Pro Tips</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-torgovo-blue mt-0.5 flex-shrink-0" />
                        <span>Start with small investment amounts while learning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-torgovo-blue mt-0.5 flex-shrink-0" />
                        <span>Choose trading pairs with good volatility but not extreme price swings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-torgovo-blue mt-0.5 flex-shrink-0" />
                        <span>Set price ranges that align with current market conditions</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="webhooks">
              {/* Webhooks Tab Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-torgovo-blue">Setting Up Webhooks</CardTitle>
                  <CardDescription>
                    Configure notifications and integrate with external systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <PlayCircle size={48} />
                      <p>Video Tutorial: Webhook Configuration</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">What are Webhooks?</h3>
                    <p className="text-muted-foreground">
                      Webhooks allow your trading bots to send real-time notifications and data to external systems, 
                      such as notification services, custom applications, or other trading platforms. This enables 
                      you to build complex automated workflows and stay informed about important trading events.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Webhook Setup Process</h3>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Navigate to your bot settings and find the "Webhooks" section</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Click "Add New Webhook"</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Enter the destination URL where notifications should be sent</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Configure which events should trigger the webhook (trades, errors, etc.)</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Set up optional authentication for your webhook</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Test the webhook connection</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Save your webhook configuration</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="p-4 glass-card">
                    <h4 className="text-lg font-medium mb-2">Sample Webhook Payload</h4>
                    <div className="p-4 bg-muted/70 rounded-md overflow-auto">
                      <pre className="text-xs text-muted-foreground">
{`{
  "event_type": "trade_executed",
  "bot_id": "grid-bot-12345",
  "exchange": "binance",
  "pair": "BTC/USDT",
  "side": "buy",
  "price": 42156.78,
  "amount": 0.05,
  "timestamp": "2025-04-20T13:45:30Z",
  "profit": 25.67,
  "total_profit": 152.89
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Popular Webhook Integrations</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 glass-card">
                        <h4 className="font-medium text-torgovo-blue mb-2">Telegram</h4>
                        <p className="text-sm text-muted-foreground">Receive real-time trade notifications in your Telegram channel or group.</p>
                      </div>
                      <div className="p-4 glass-card">
                        <h4 className="font-medium text-torgovo-blue mb-2">Discord</h4>
                        <p className="text-sm text-muted-foreground">Send trade alerts and bot status updates to Discord servers.</p>
                      </div>
                      <div className="p-4 glass-card">
                        <h4 className="font-medium text-torgovo-blue mb-2">Custom API</h4>
                        <p className="text-sm text-muted-foreground">Connect to your own applications for custom processing and analytics.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="risk-management">
              {/* Risk Management Tab Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-torgovo-blue">Risk Management</CardTitle>
                  <CardDescription>
                    Best practices to protect your capital while trading
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video rounded-md bg-muted/50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <PlayCircle size={48} />
                      <p>Video Tutorial: Risk Management Essentials</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Key Risk Management Principles</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">Position Sizing</h4>
                        <p className="text-sm text-muted-foreground">Limit each trade to a small percentage of your total capital, typically 1-3% per trade.</p>
                      </div>
                      <div className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">Stop-Loss Orders</h4>
                        <p className="text-sm text-muted-foreground">Always set stop-loss orders to define your maximum acceptable loss on a trade.</p>
                      </div>
                      <div className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">Risk-Reward Ratio</h4>
                        <p className="text-sm text-muted-foreground">Aim for favorable risk-reward ratios, typically 1:2 or better.</p>
                      </div>
                      <div className="glass-card p-4">
                        <h4 className="font-medium text-torgovo-blue mb-2">Diversification</h4>
                        <p className="text-sm text-muted-foreground">Spread your risk across different trading pairs and strategies.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
                    <h4 className="text-lg font-medium mb-2 text-destructive">Warning: Market Risks</h4>
                    <p className="text-sm text-muted-foreground">
                      Automated trading carries significant risks. Cryptocurrency markets are highly volatile and 
                      can move rapidly in unpredictable ways. Never invest more than you can afford to lose, and 
                      be prepared for potential losses, especially during extreme market conditions.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Configuring Risk Parameters in Torgovo</h3>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Navigate to your bot's settings page</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Locate the "Risk Management" section</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Set maximum allowed drawdown percentage (e.g., 10%)</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Configure trailing stop-loss settings if desired</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Set daily loss limits to pause trading automatically</span>
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">Enable panic sell feature for emergency situations</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <Button className="flex items-center gap-2" variant="outline">
                      <FileText className="h-4 w-4" />
                      Risk Management Guide
                    </Button>
                    <Button className="flex items-center gap-2 bg-torgovo-purple hover:bg-torgovo-purple/80">
                      <PlayCircle className="h-4 w-4" />
                      Watch Risk Management Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="container pb-12">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-bold mb-4">Downloadable Resources</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-4 border rounded-md hover:border-torgovo-purple/50 transition-colors cursor-pointer">
              <FileText className="h-6 w-6 text-torgovo-purple" />
              <div>
                <h3 className="font-medium">Quick Start Guide</h3>
                <p className="text-xs text-muted-foreground">PDF, 2.4MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-md hover:border-torgovo-purple/50 transition-colors cursor-pointer">
              <FileText className="h-6 w-6 text-torgovo-purple" />
              <div>
                <h3 className="font-medium">API Security Best Practices</h3>
                <p className="text-xs text-muted-foreground">PDF, 1.8MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-md hover:border-torgovo-purple/50 transition-colors cursor-pointer">
              <FileText className="h-6 w-6 text-torgovo-purple" />
              <div>
                <h3 className="font-medium">Trading Strategy Guide</h3>
                <p className="text-xs text-muted-foreground">PDF, 3.5MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tutorial;
