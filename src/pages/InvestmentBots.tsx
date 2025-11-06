import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Shield, DollarSign, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const InvestmentBots = () => {
  const supportedCoins = [
    { name: "USDT", icon: "₮", color: "text-green-500" },
    { name: "USDC", icon: "Ⓤ", color: "text-blue-500" },
    { name: "BTC", icon: "₿", color: "text-orange-500" },
    { name: "ETH", icon: "Ξ", color: "text-purple-500" },
    { name: "BNB", icon: "Ⓑ", color: "text-yellow-500" },
  ];

  const managedBots = [
    {
      name: "AI Powered Grid Bot",
      type: "ai_grid",
      description: "Advanced AI-powered grid trading that adapts to market conditions",
      minInvestment: "$100",
      expectedReturn: "12-18% monthly",
      riskLevel: "Medium",
    },
    {
      name: "Martingale Bot",
      type: "martingale",
      description: "Smart cost-averaging strategy for consistent profits",
      minInvestment: "$100",
      expectedReturn: "10-15% monthly",
      riskLevel: "Medium-High",
    },
  ];

  return (
    <Layout>
      <HeroSection
        heroTitle="Invest in Managed Bots"
        subtitle="Let our professional bots trade for you across multiple exchanges. Simply invest and watch your portfolio grow."
      >
        <Button className="bg-accent-primary hover:bg-accent-primary/90" asChild>
          <Link to="/dashboard/invest-in-bot">Start Investing</Link>
        </Button>
      </HeroSection>

      {/* How It Works */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Investment Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and secure investment process designed for everyone
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {[
            {
              step: "1",
              icon: DollarSign,
              title: "Choose Your Bot",
              description: "Select from our high-performing managed bots",
            },
            {
              step: "2",
              icon: TrendingUp,
              title: "Send Crypto",
              description: "Transfer funds to the provided wallet address",
            },
            {
              step: "3",
              icon: Shield,
              title: "Confirm Investment",
              description: "Submit your transaction hash for verification",
            },
            {
              step: "4",
              icon: BarChart3,
              title: "Track Performance",
              description: "Monitor your profits in real-time dashboard",
            },
          ].map((item) => (
            <Card key={item.step} className="glass-card text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-torgovo-blue to-torgovo-purple flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supported Coins */}
        <div className="glass-card p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Supported Cryptocurrencies</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {supportedCoins.map((coin) => (
              <div key={coin.name} className="flex items-center gap-3 px-6 py-4 rounded-lg bg-sidebar-accent">
                <span className={`text-3xl ${coin.color}`}>{coin.icon}</span>
                <span className="font-semibold text-lg">{coin.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            More cryptocurrencies coming soon
          </p>
        </div>

        {/* Available Managed Bots */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Available Managed Bots</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {managedBots.map((bot) => (
              <Card key={bot.type} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-torgovo-purple">{bot.name}</CardTitle>
                  <CardDescription>{bot.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Min Investment</p>
                      <p className="text-lg font-bold">{bot.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                      <p className="text-lg font-bold text-green-500">{bot.expectedReturn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="text-lg font-bold">{bot.riskLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Investors</p>
                      <p className="text-lg font-bold">250+</p>
                    </div>
                  </div>
                  <Button className="w-full bg-torgovo-purple hover:bg-torgovo-purple-dim" asChild>
                    <Link to={`/dashboard/invest-in-bot?type=${bot.type}`}>
                      Invest Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Invest With Us?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Secure & Transparent",
                description: "All transactions are tracked and visible in your dashboard",
              },
              {
                icon: Users,
                title: "Professional Management",
                description: "Bots managed by experienced trading algorithms",
              },
              {
                icon: TrendingUp,
                title: "Consistent Returns",
                description: "Proven track record of profitable trading",
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Monitor your investment performance 24/7",
              },
              {
                icon: DollarSign,
                title: "Low Minimum Investment",
                description: "Start investing with as little as $100",
              },
              {
                icon: CheckCircle2,
                title: "Easy Withdrawals",
                description: "Request withdrawals anytime through your dashboard",
              },
            ].map((feature, index) => (
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

        {/* Video Tutorial */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Video Tutorial</h2>
          <div className="aspect-video bg-sidebar-accent rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Investment tutorial video coming soon</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How do I invest in a managed bot?",
                a: "Simply choose a bot, send cryptocurrency to the provided wallet address, and submit your transaction hash for verification.",
              },
              {
                q: "What is the minimum investment amount?",
                a: "The minimum investment varies by bot but typically starts at $100 equivalent in supported cryptocurrencies.",
              },
              {
                q: "How do I withdraw my profits?",
                a: "You can request a withdrawal anytime through your dashboard. Our team processes withdrawal requests within 24-48 hours.",
              },
              {
                q: "What cryptocurrencies can I use to invest?",
                a: "Currently we support USDT, USDC, BTC, ETH, and BNB. More cryptocurrencies will be added soon.",
              },
              {
                q: "How is my investment secured?",
                a: "Your investments are tracked on-chain and managed by our professional trading bots across secure exchanges.",
              },
            ].map((item, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-0">
                <h3 className="font-semibold mb-2 text-torgovo-purple">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvestmentBots;
