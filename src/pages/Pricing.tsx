
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import PricingCard, { PricingTier } from "@/components/ui/pricing-card";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const annualDiscount = 0.17; // 17% discount

const calculateAnnualPrice = (monthlyPrice: number) => {
  const annualPrice = monthlyPrice * 12 * (1 - annualDiscount);
  return Math.floor(annualPrice);
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: "$0",
      description: "For beginners exploring automated trading",
      features: [
        "1 spot bot (basic functionality)",
        "Trading volume up to $1,000",
        "1 exchange connection",
        "Community support",
        "Basic analytics dashboard",
        "Manual trading signals",
      ],
      buttonText: "Start Free",
    },
    {
      name: "Basic",
      price: isAnnual ? `$199/year` : "$19.99/month",
      description: "For serious traders taking the next step",
      features: [
        "3 active bots (spot & grid)",
        "Trading volume up to $25,000",
        "2 exchange connections",
        "Email support",
        "Standard analytics dashboard",
        "Basic webhook notifications",
        "API access",
        "Grid & basic martingale strategies",
      ],
      buttonText: "Subscribe Now",
    },
    {
      name: "Pro",
      price: isAnnual ? `$499/year` : "$49.99/month",
      description: "For professional traders and advanced strategies",
      features: [
        "10 active bots (all types)",
        "Trading volume up to $100,000",
        "5 exchange connections",
        "Priority email support",
        "Advanced analytics dashboard",
        "Advanced webhook integrations",
        "Custom indicators",
        "Multi-exchange support",
        "Portfolio rebalancing",
      ],
      buttonText: "Get Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For institutions and high-volume traders",
      features: [
        "Unlimited active bots (all types)",
        "Unlimited trading volume",
        "Unlimited exchange connections",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom bot development",
        "Custom reporting",
        "SLA guarantees",
        "White label options",
      ],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <Layout>
      <HeroSection
        heroTitle="Simple, Transparent Pricing"
        subtitle="Choose the plan that fits your trading needs. All plans include our core automation features."
      >
        <Button className="bg-torgovo-purple hover:bg-torgovo-purple/80">
          Start Your Free Trial
        </Button>
      </HeroSection>

      <div className="container py-12">
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className={!isAnnual ? "text-torgovo-purple" : "text-muted-foreground"}>Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-torgovo-purple"
          />
          <span className={isAnnual ? "text-torgovo-purple" : "text-muted-foreground"}>
            Annual (Save ~17%)
          </span>
        </div>

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
                  <td className="p-4 text-center">1 Spot</td>
                  <td className="p-4 text-center">3 Total</td>
                  <td className="p-4 text-center">10 Total</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Trading Volume Limit</td>
                  <td className="p-4 text-center">$1,000</td>
                  <td className="p-4 text-center">$25,000</td>
                  <td className="p-4 text-center">$100,000</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Exchange Connections</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center">2</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Support Level</td>
                  <td className="p-4 text-center">Community</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Priority Email</td>
                  <td className="p-4 text-center">24/7 Phone</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Bot Types</td>
                  <td className="p-4 text-center">Basic Spot</td>
                  <td className="p-4 text-center">Spot & Grid</td>
                  <td className="p-4 text-center">All Types</td>
                  <td className="p-4 text-center">All + Custom</td>
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
                <AccordionTrigger>Can I upgrade or downgrade my plan?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be
                  charged the prorated amount for the remainder of your billing cycle. When downgrading,
                  the new rate will apply at the start of your next billing cycle.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Are there any additional fees?</AccordionTrigger>
                <AccordionContent>
                  No, there are no hidden fees. The price you see is the price you pay. However,
                  please note that exchanges may charge their own trading fees, which are separate
                  from our platform fees.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What happens if I exceed my trading volume?</AccordionTrigger>
                <AccordionContent>
                  If you approach your trading volume limit, we'll notify you in advance. To continue
                  trading beyond your limit, you'll need to upgrade to a higher tier plan. We never
                  automatically charge extra fees for exceeding limits.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How is trading volume calculated?</AccordionTrigger>
                <AccordionContent>
                  Trading volume is calculated on a monthly basis as the total value of all trades
                  executed through our platform, including both buy and sell orders. The volume resets
                  at the beginning of each month.
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
