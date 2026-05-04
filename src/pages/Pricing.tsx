import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Tier = {
  name: string;
  monthly: number | null; // null = contact us
  description: string;
  badge?: string;
  popular?: boolean;
  buttonText: string;
  features: { label: string; included: boolean }[];
};

const ANNUAL_DISCOUNT = 0.2;

const TIERS: Tier[] = [
  {
    name: "Free",
    monthly: 0,
    description: "Perfect for beginners",
    buttonText: "Start Free",
    features: [
      { included: true, label: "1 Signal Bot" },
      { included: true, label: "20 webhook calls / month" },
      { included: true, label: "Basic analytics dashboard" },
      { included: true, label: "Community support" },
      { included: false, label: "Grid & Martingale bots" },
      { included: false, label: "QuantumAI Bot access" },
    ],
  },
  {
    name: "Starter",
    monthly: 24,
    description: "For traders getting serious",
    buttonText: "Subscribe",
    features: [
      { included: true, label: "2 Signal Bots" },
      { included: true, label: "1 Grid or Martingale Bot" },
      { included: true, label: "200 webhook calls / month" },
      { included: true, label: "Standard analytics dashboard" },
      { included: true, label: "Email support" },
      { included: false, label: "QuantumAI Bot access" },
      { included: false, label: "Telegram alerts" },
    ],
  },
  {
    name: "Pro",
    monthly: 59,
    description: "For professional traders",
    badge: "Most Popular",
    popular: true,
    buttonText: "Get Pro",
    features: [
      { included: true, label: "3 Signal Bots" },
      { included: true, label: "2 Grid or Martingale Bots" },
      { included: true, label: "1 QuantumAI Bot" },
      { included: true, label: "1,000 webhook calls / month" },
      { included: true, label: "Advanced analytics dashboard" },
      { included: true, label: "Priority email support" },
      { included: true, label: "Custom indicators" },
      { included: true, label: "Telegram trade alerts" },
    ],
  },
  {
    name: "Elite",
    monthly: 129,
    description: "Maximum power, zero compromises",
    buttonText: "Go Elite",
    features: [
      { included: true, label: "5 Signal Bots" },
      { included: true, label: "3 Grid or Martingale Bots" },
      { included: true, label: "2 QuantumAI Bots" },
      { included: true, label: "2,000 webhook calls / month" },
      { included: true, label: "Full analytics + custom reports" },
      { included: true, label: "Dedicated support channel" },
      { included: true, label: "Custom indicators" },
      { included: true, label: "Telegram alerts + execution logs" },
      { included: true, label: "Portfolio rebalancing tools" },
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    description: "For trading firms & institutions",
    buttonText: "Contact Us",
    features: [
      { included: true, label: "Custom bot allocations" },
      { included: true, label: "Custom webhook volume" },
      { included: true, label: "Dedicated account manager" },
      { included: true, label: "SLA guarantees" },
      { included: true, label: "Custom reporting & integrations" },
      { included: true, label: "Priority onboarding & training" },
    ],
  },
];

const formatPrice = (monthly: number | null, isAnnual: boolean) => {
  if (monthly === null) return "Contact Us";
  if (monthly === 0) return "$0";
  if (isAnnual) {
    const annual = Math.round(monthly * 12 * (1 - ANNUAL_DISCOUNT));
    return `$${annual}`;
  }
  return `$${monthly}`;
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <Layout>
      <HeroSection
        heroTitle="Simple, Transparent Pricing"
        subtitle="Pick the plan that matches your trading ambition. Upgrade or downgrade anytime."
      >
        <Button className="bg-torgovo-purple hover:bg-torgovo-purple/80">
          Start Free
        </Button>
      </HeroSection>

      <div className="container py-12">
        <div className="flex justify-center items-center gap-4 mb-10">
          <span className={!isAnnual ? "text-torgovo-purple font-medium" : "text-muted-foreground"}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-torgovo-purple"
          />
          <span className={isAnnual ? "text-torgovo-purple font-medium" : "text-muted-foreground"}>
            Annual <span className="text-green-500 text-sm">(Save 20%)</span>
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TIERS.map((tier) => {
            const price = formatPrice(tier.monthly, isAnnual);
            const showSuffix = tier.monthly !== null && tier.monthly > 0;
            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-lg border bg-card/30 p-6 pricing-3d",
                  tier.popular
                    ? "border-torgovo-purple glow-border lg:scale-[1.03] z-10"
                    : "border-border"
                )}
              >
                {tier.badge && (
                  <div className="absolute right-0 top-0">
                    <div className="text-xs text-white px-3 py-1 bg-torgovo-purple rounded-bl-lg font-medium">
                      ★ {tier.badge}
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold tracking-tight">{price}</span>
                  {showSuffix && (
                    <span className="ml-1 text-sm text-muted-foreground">
                      /{isAnnual ? "year" : "month"}
                    </span>
                  )}
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm">
                      {f.included ? (
                        <Check className="mr-2 h-4 w-4 shrink-0 text-torgovo-purple mt-0.5" />
                      ) : (
                        <X className="mr-2 h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                      )}
                      <span className={f.included ? "" : "text-muted-foreground line-through"}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full mt-6",
                    tier.popular ? "bg-torgovo-purple hover:bg-torgovo-purple/80" : ""
                  )}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.buttonText}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
          Each bot connects to one exchange at a time. Supported exchanges: Binance, Bybit,
          MEXC, OKX, KuCoin, Bitget. Bot limits apply per account, not per subscription.
        </p>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Can I upgrade or downgrade my plan?</AccordionTrigger>
              <AccordionContent>
                Yes. Upgrades are prorated for the rest of your billing cycle. Downgrades take
                effect at the start of the next cycle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Are there any hidden fees?</AccordionTrigger>
              <AccordionContent>
                No. The price you see is the price you pay. Exchanges may charge their own
                trading fees, which are separate from our platform fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What happens if I exceed my webhook calls?</AccordionTrigger>
              <AccordionContent>
                We'll notify you as you approach the limit. To keep trading beyond it, upgrade
                to a higher plan. We never auto-charge overages.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can one account power multiple traders?</AccordionTrigger>
              <AccordionContent>
                No. Bot limits and access are per account. Sharing account access violates our
                Terms of Service and will result in termination without refund.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Need something custom?</h2>
            <p className="text-muted-foreground mb-6">
              Trading firms and institutions can get dedicated support, custom allocations,
              and SLA guarantees on our Enterprise plan.
            </p>
            <Button className="bg-torgovo-purple hover:bg-torgovo-purple/80">Contact Sales</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
