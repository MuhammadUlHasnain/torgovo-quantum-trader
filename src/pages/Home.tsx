
import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/ui/hero-section";
import FeatureSection from "@/components/ui/feature-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, ChartBar, Code, Cpu, Globe, Lock, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        fullHeight
        heroTitle={
          <span>
            Quantum Trading <span className="text-torgovo-purple">Automation</span>
          </span>
        }
        subtitle="Unleash the power of algorithmic trading with Torgovo's advanced bot platform. Create custom trading strategies or use our pre-built solutions to maximize your returns."
      >
        <Button className="bg-torgovo-purple hover:bg-torgovo-purple-dim text-lg h-12 px-6">
          Get Started
        </Button>
        <Button variant="outline" className="text-lg h-12 px-6">
          Learn More
        </Button>
      </HeroSection>

      {/* Stats Section */}
      <section className="py-12 bg-secondary/50 backdrop-blur">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-torgovo-purple">24/7</p>
              <p className="text-sm text-muted-foreground">Automated Trading</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-torgovo-purple">50+</p>
              <p className="text-sm text-muted-foreground">Exchanges Supported</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-torgovo-purple">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-torgovo-purple">10k+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <FeatureSection
        title="Trading Automation Made Simple"
        subtitle="Our platform offers powerful tools to automate your trading strategies with minimal effort."
        features={[
          {
            icon: <Bot className="h-6 w-6" />,
            title: "Custom Bot Creation",
            description: "Create your own trading bots with our intuitive interface and receive a webhook script for easy integration.",
          },
          {
            icon: <ChartBar className="h-6 w-6" />,
            title: "Pre-built Strategies",
            description: "Subscribe to our expert-crafted strategies that have been tested and optimized for various market conditions.",
          },
          {
            icon: <Globe className="h-6 w-6" />,
            title: "Multi-Exchange Support",
            description: "Connect to all major cryptocurrency exchanges through a single unified API interface.",
          },
          {
            icon: <Lock className="h-6 w-6" />,
            title: "Secure API Management",
            description: "Your exchange API keys are encrypted and stored securely with strict access controls.",
          },
          {
            icon: <Code className="h-6 w-6" />,
            title: "Webhook Integration",
            description: "Easily integrate your trading bots with external systems using our webhook API.",
          },
          {
            icon: <Cpu className="h-6 w-6" />,
            title: "24/7 Execution",
            description: "Our high-availability infrastructure ensures your strategies run without interruption.",
          },
        ]}
      />

      {/* Bot Types */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center glow-text">
            Specialized Bot Types
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card overflow-hidden border-torgovo-blue/30 hover:border-torgovo-blue transition-all duration-300">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-torgovo-blue mb-4">GRID Bots</h3>
                  <p className="text-muted-foreground">
                    Grid trading bots place buy and sell orders at predefined intervals,
                    profiting from market volatility even in sideways markets.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-torgovo-blue" />
                      <span>Perfect for ranging markets</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-torgovo-blue" />
                      <span>Customizable price ranges and grid levels</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-torgovo-blue" />
                      <span>Automated buy low, sell high strategy</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/grid-bots">
                      <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
                        Explore GRID Bots
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card overflow-hidden border-torgovo-purple/30 hover:border-torgovo-purple transition-all duration-300">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-torgovo-purple mb-4">Martingale Bots</h3>
                  <p className="text-muted-foreground">
                    Martingale bots use cost-averaging strategies to accumulate assets
                    at better average prices during market downtrends.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-torgovo-purple" />
                      <span>Dynamic position sizing</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-torgovo-purple" />
                      <span>Configurable safety orders</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-torgovo-purple" />
                      <span>Take profit automation</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/martingale-bots">
                      <Button className="bg-torgovo-purple hover:bg-torgovo-purple-dim">
                        Explore Martingale Bots
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-torgovo-dark">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 glow-text">Ready to Automate Your Trading?</h2>
            <p className="mb-8 text-muted-foreground">
              Start creating your own trading bots or subscribe to our pre-built strategies today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-torgovo-purple hover:bg-torgovo-purple-dim text-lg h-12 px-6">
                Get Started
              </Button>
              <Link to="/pricing">
                <Button variant="outline" className="text-lg h-12 px-6">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
