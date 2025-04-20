
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, Mail, MapPin, MessageSquare, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="About Torgovo"
        subtitle="Pioneering the future of automated cryptocurrency trading since 2023"
      />

      <div className="container py-12">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            At Torgovo, our mission is to democratize access to sophisticated trading strategies through accessible, 
            reliable, and powerful automation tools. We believe that everyone should have the opportunity to benefit 
            from algorithmic trading, regardless of their technical expertise or trading experience.
          </p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              We envision a future where automated trading is accessible to all, where sophisticated algorithms and 
              strategies can be deployed with a few clicks, and where traders can focus on strategy development rather 
              than execution. Torgovo aims to be at the forefront of this revolution, constantly innovating and 
              pushing the boundaries of what's possible in cryptocurrency trading automation.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Alex Chen", role: "Founder & CEO", bio: "Former quant trader with 10+ years in algorithmic trading systems." },
              { name: "Sophia Rodriguez", role: "CTO", bio: "Blockchain developer and system architect with expertise in high-frequency trading infrastructure." },
              { name: "Marcus Johnson", role: "Head of Product", bio: "UX specialist focused on making complex trading concepts accessible to everyone." },
              { name: "Nadia Petrov", role: "Lead Developer", bio: "Expert in distributed systems and real-time data processing for financial applications." },
              { name: "Raj Patel", role: "Trading Strategist", bio: "Former hedge fund manager specializing in cryptocurrency market analysis and strategy development." },
              { name: "Emma Williams", role: "Customer Success", bio: "Dedicated to ensuring traders get the most from our platform through education and support." },
            ].map((member, index) => (
              <Card key={index} className="glass-card overflow-hidden">
                <div className="aspect-square bg-muted/30" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-torgovo-blue mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Company Timeline</h2>
          <div className="relative space-y-8">
            {[
              { year: "2023 Q1", title: "Idea Inception", description: "Torgovo was conceived as a solution to the complexity of cryptocurrency trading automation." },
              { year: "2023 Q2", title: "First Prototype", description: "Development of our initial Grid bot algorithm and user interface prototype." },
              { year: "2023 Q3", title: "Beta Launch", description: "Limited release to select early adopters for testing and feedback." },
              { year: "2023 Q4", title: "Official Launch", description: "Public release of the Torgovo platform with Grid trading bots for Binance and Bybit." },
              { year: "2024 Q1", title: "Martingale Bots", description: "Introduction of advanced Martingale strategies and enhanced risk management tools." },
              { year: "2024 Q2", title: "Multi-Exchange Support", description: "Expanded support for additional cryptocurrency exchanges including Kucoin, Bitget, and OKX." },
              { year: "2024 Q3", title: "Advanced Analytics", description: "Launch of comprehensive performance metrics and visualization tools." },
              { year: "2024 Q4", title: "API and Integrations", description: "Public API release and integration capabilities with external platforms." },
            ].map((event, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-24 flex-shrink-0 text-right">
                  <span className="text-torgovo-purple font-bold">{event.year}</span>
                </div>
                <div className="relative flex items-center justify-center w-6 flex-shrink-0">
                  <div className="h-full absolute left-1/2 -translate-x-1/2 w-0.5 bg-border" />
                  <div className="relative z-10 w-3 h-3 rounded-full bg-torgovo-purple" />
                </div>
                <div className="flex-1 glass-card p-4">
                  <h3 className="font-bold mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Security & Compliance</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-torgovo-blue" />
                  <h3 className="text-xl font-medium">Security Practices</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-blue mt-2" />
                    <span className="text-muted-foreground">We never store your exchange API secret keys in plaintext</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-blue mt-2" />
                    <span className="text-muted-foreground">All data is encrypted both in transit and at rest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-blue mt-2" />
                    <span className="text-muted-foreground">Our infrastructure undergoes regular security audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-blue mt-2" />
                    <span className="text-muted-foreground">We implement strict access controls and authentication mechanisms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-blue mt-2" />
                    <span className="text-muted-foreground">We recommend using API keys with trading-only permissions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-8 w-8 text-torgovo-purple" />
                  <h3 className="text-xl font-medium">Compliance Information</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-purple mt-2" />
                    <span className="text-muted-foreground">We operate in full compliance with applicable regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-purple mt-2" />
                    <span className="text-muted-foreground">Our platform enforces strong KYC/AML procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-purple mt-2" />
                    <span className="text-muted-foreground">We maintain comprehensive data protection policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-purple mt-2" />
                    <span className="text-muted-foreground">Our terms of service and privacy policy are transparent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-torgovo-purple mt-2" />
                    <span className="text-muted-foreground">We continuously monitor regulatory developments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Information</h2>
          <div className="glass-card p-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Mail className="h-10 w-10 text-torgovo-blue mb-4" />
                <h3 className="font-medium mb-2">Email</h3>
                <a href="mailto:support@torgovo.com" className="text-torgovo-purple hover:underline">support@torgovo.com</a>
                <a href="mailto:info@torgovo.com" className="text-torgovo-purple hover:underline mt-1">info@torgovo.com</a>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <MessageSquare className="h-10 w-10 text-torgovo-blue mb-4" />
                <h3 className="font-medium mb-2">Live Support</h3>
                <p className="text-muted-foreground">Available 24/7 via our in-app chat</p>
                <p className="text-muted-foreground mt-1">Response time: < 2 hours</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <MapPin className="h-10 w-10 text-torgovo-blue mb-4" />
                <h3 className="font-medium mb-2">Office</h3>
                <p className="text-muted-foreground">101 Trading Avenue</p>
                <p className="text-muted-foreground">Singapore, 049712</p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="flex justify-center space-x-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">24/7 Operation</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Global Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
