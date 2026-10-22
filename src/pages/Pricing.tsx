import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { subscriptionsApi, asList } from "@/lib/services";
import type { SubscriptionPlan } from "@/types/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Tier = {
  name: string;
  monthly: number | null; // null = contact us
  discountPct: number;
  description: string;
  badge?: string;
  popular?: boolean;
  buttonText: string;
  features: { label: string; included: boolean }[];
};

/** Fallback used only when the backend is unreachable — mirrors the brief's bot-plans. */
const FALLBACK_TIERS: Tier[] = [
  {
    name: "Free", monthly: 0, discountPct: 0, description: "Perfect for beginners", buttonText: "Start Free",
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
    name: "Starter", monthly: 24, discountPct: 20, description: "For traders getting serious", buttonText: "Subscribe",
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
    name: "Pro", monthly: 59, discountPct: 20, description: "For professional traders", badge: "Most Popular", popular: true, buttonText: "Get Pro",
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
    name: "Elite", monthly: 129, discountPct: 20, description: "Maximum power, zero compromises", buttonText: "Go Elite",
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
    name: "Enterprise", monthly: null, discountPct: 0, description: "For trading firms & institutions", buttonText: "Contact Us",
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

function planToTier(plan: SubscriptionPlan, index: number, plans: SubscriptionPlan[]): Tier {
  const f: { label: string; included: boolean }[] = [
    { included: true, label: `${plan.max_bots_allowed} bot${plan.max_bots_allowed === 1 ? "" : "s"}` },
  ];
  if (plan.max_webhooks_allowed) {
    f.push({ included: true, label: `${plan.max_webhooks_allowed.toLocaleString()} webhook calls / month` });
  }
  if (plan.max_signals_per_month > 0) {
    f.push({ included: true, label: `${plan.max_signals_per_month.toLocaleString()} signals / month` });
  }
  const types = plan.bot_types?.map((t: string) =>
    t === "webhook" ? "Signal" : t === "quantum_ai" ? "QuantumAI" : t.charAt(0).toUpperCase() + t.slice(1)
  );
  if (types?.length) f.push({ included: true, label: `${types.join(" + ")} bots` });
  if (plan.market === "spot_futures") f.push({ included: true, label: "Spot & Futures markets" });
  const feats = plan.features ?? {};
  if (feats.max_daily_signals) f.push({ included: true, label: `${feats.max_daily_signals} daily signals` });
  if (feats.include_premium_signals) f.push({ included: true, label: "Premium signals" });
  if (feats.risk_level) f.push({ included: true, label: `Risk level: ${String(feats.risk_level).replace(/_/g, " ")}` });
  if (plan.trial_days > 0) f.push({ included: true, label: `${plan.trial_days}-day free trial` });

  const name = plan.name || plan.slug;
  const isPopular = index === Math.min(2, plans.length - 2) && plans.length > 2;
  return {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    monthly: parseFloat(plan.price_monthly),
    discountPct: plan.annual_discount_pct ?? 20,
    description: plan.description || "",
    popular: isPopular,
    badge: isPopular ? "Most Popular" : undefined,
    buttonText: parseFloat(plan.price_monthly) === 0 ? "Start Free" : "Subscribe",
    features: f,
  };
}

const formatPrice = (monthly: number | null, isAnnual: boolean, discountPct = 20) => {
  if (monthly === null) return "Contact Us";
  if (monthly === 0) return "$0";
  if (isAnnual) {
    const annual = Math.round(monthly * 12 * (1 - discountPct / 100));
    return `$${annual.toLocaleString()}`;
  }
  return `$${monthly.toLocaleString()}`;
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  // Public endpoint — no auth required (§4).
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bot-plans"],
    queryFn: subscriptionsApi.botPlans,
    staleTime: 5 * 60 * 1000,
  });

  let tiers = FALLBACK_TIERS;
  let maxDiscount = 20;
  if (!isError && data) {
    const plans = asList<SubscriptionPlan>(data);
    if (plans.length) {
      const sorted = [...plans].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      tiers = sorted.map((p, i) => planToTier(p, i, sorted));
      if (!tiers.some((t) => /enterprise|contact/i.test(t.name))) {
        tiers.push(FALLBACK_TIERS[FALLBACK_TIERS.length - 1]); // Enterprise contact card
      }
      maxDiscount = Math.max(...tiers.map((t) => t.discountPct ?? 20));
    }
  }

  return (
    <Layout>
      <HeroSection
        heroTitle="Simple, Transparent Pricing"
        subtitle="Pick the plan that matches your trading ambition. Upgrade or downgrade anytime."
      >
        <Button asChild className="bg-torgovo-purple hover:bg-torgovo-purple/80">
          <Link to="/auth/signup">Start Free</Link>
        </Button>
      </HeroSection>

      <div className="container py-12">
        {isLoading && (
          <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        )}

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
            Annual <span className="text-green-500 text-sm">(Save {maxDiscount}%)</span>
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {tiers.map((tier) => {
            const price = formatPrice(tier.monthly, isAnnual, tier.discountPct ?? maxDiscount);
            const showSuffix = tier.monthly !== null && tier.monthly > 0;
            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-lg border bg-card/30 p-6 pricing-3d",
                  tier.popular ? "border-torgovo-purple glow-border lg:scale-[1.03] z-10" : "border-border"
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
                  asChild
                  className={cn(
                    "w-full mt-6",
                    tier.popular ? "bg-torgovo-purple hover:bg-torgovo-purple/80" : ""
                  )}
                  variant={tier.popular ? "default" : "outline"}
                >
                  <Link to={tier.monthly === null ? "/help-support" : "/dashboard/subscriptions"}>
                    {tier.buttonText}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
          Supported exchanges: Binance, Bybit, OKX, MEXC, Alpaca, Coinbase. KuCoin and Bitget are coming soon.
          Bot limits apply per account, not per subscription.
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
            <Button asChild className="bg-torgovo-purple hover:bg-torgovo-purple/80">
              <Link to="/help-support">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
