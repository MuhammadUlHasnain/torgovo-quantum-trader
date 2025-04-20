
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import PricingCard, { PricingTier } from "@/components/ui/pricing-card";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "For beginners exploring automated trading",
    features: [
      "1 Active Bot",
      "Basic Grid Strategy",
      "Manual Trading Signals",
      "Community Support",
      "Basic Analytics Dashboard",
    ],
    buttonText: "Start Free",
  },
  {
    name: "Basic",
    price: "$29",
    description: "For serious traders taking the next step",
    features: [
      "5 Active Bots",
      "Grid & Martingale Strategies",
      "Basic Webhook Notifications",
      "Email Support",
      "Standard Analytics Dashboard",
      "API Access",
    ],
    buttonText: "Subscribe Now",
  },
  {
    name: "Pro",
    price: "$99",
    description: "For professional traders and advanced strategies",
    features: [
      "Unlimited Active Bots",
      "All Trading Strategies",
      "Advanced Webhook Integrations",
      "Priority Support",
      "Advanced Analytics Dashboard",
      "Custom Indicators",
      "Multi-Exchange Support",
      "Portfolio Rebalancing",
    ],
    buttonText: "Get Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For institutions and high-volume traders",
    features: [
      "Everything in Pro Plan",
      "Dedicated Account Manager",
      "Custom Bot Development",
      "24/7 Phone Support",
      "Custom Reporting",
      "SLA Guarantees",
      "White Label Options",
    ],
    buttonText: "Contact Sales",
  },
];

const Pricing = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="Simple, Transparent Pricing"
        subtitle="Choose the plan that fits your trading needs. All plans include our core automation features."
      >
        <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
          Start Your Free Trial
        </Button>
      </HeroSection>

      <div className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Free</th>
                  <th className="p-4 text-center">Basic</th>
                  <th className="p-4 text-center">Pro</th>
                  <th className="p-4 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Active Bots</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center">Unlimited</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Grid Bots</td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Martingale Bots</td>
                  <td className="p-4 text-center"><X className="h-5 w-5 mx-auto text-muted-foreground" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Custom Strategies</td>
                  <td className="p-4 text-center"><X className="h-5 w-5 mx-auto text-muted-foreground" /></td>
                  <td className="p-4 text-center"><X className="h-5 w-5 mx-auto text-muted-foreground" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Webhook Notifications</td>
                  <td className="p-4 text-center"><X className="h-5 w-5 mx-auto text-muted-foreground" /></td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center">Advanced</td>
                  <td className="p-4 text-center">Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Analytics Dashboard</td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center">Standard</td>
                  <td className="p-4 text-center">Advanced</td>
                  <td className="p-4 text-center">Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Supported Exchanges</td>
                  <td className="p-4 text-center">Binance</td>
                  <td className="p-4 text-center">Binance, Bybit</td>
                  <td className="p-4 text-center">All Major Exchanges</td>
                  <td className="p-4 text-center">All + Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">API Access</td>
                  <td className="p-4 text-center"><X className="h-5 w-5 mx-auto text-muted-foreground" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 mx-auto text-torgovo-blue" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Support</td>
                  <td className="p-4 text-center">Community</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Priority</td>
                  <td className="p-4 text-center">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I switch plans later?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be 
                  charged the prorated amount for the remainder of your billing cycle. When 
                  downgrading, the new rate will apply at the start of your next billing cycle.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                <AccordionContent>
                  We offer a 14-day money-back guarantee for all new subscriptions. If you're not 
                  satisfied with our service, contact our support team within 14 days of your 
                  initial purchase for a full refund.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards (Visa, Mastercard, American Express), PayPal, 
                  and cryptocurrency payments (Bitcoin, Ethereum, and USDT).
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Are there any hidden fees?</AccordionTrigger>
                <AccordionContent>
                  No, there are no hidden fees. The price you see is the price you pay. We don't 
                  charge any additional fees for using our platform or connecting to exchanges. 
                  However, please note that exchanges may charge their own trading fees.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What is the difference between Grid and Martingale bots?</AccordionTrigger>
                <AccordionContent>
                  Grid bots place buy and sell orders at regular intervals within a predetermined 
                  price range, making them ideal for sideways markets. Martingale bots use a 
                  cost-averaging strategy that increases position size after losses to lower average 
                  entry price. Grid bots are available on all plans, while Martingale bots are 
                  available on Basic plans and above.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your subscription at any time from your account settings. 
                  After cancellation, your plan will remain active until the end of your current 
                  billing period.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-muted-foreground mb-6">
              Contact our sales team to discuss custom pricing options for high-volume traders,
              institutions, or specialized trading requirements.
            </p>
            <Button className="bg-torgovo-purple hover:bg-torgovo-purple/80">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
