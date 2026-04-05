
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier: PricingTier;
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ tier, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-lg border bg-card/30 pricing-3d",
          tier.popular
            ? "border-torgovo-purple glow-border scale-[1.02] z-10"
            : "border-border",
          className
        )}
        {...props}
      >
        {tier.popular && (
          <div className="absolute right-0 top-0">
            <div className="font-medium text-xs text-white px-3 py-1 bg-torgovo-purple rounded-bl-lg">
              Popular
            </div>
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-bold">{tier.name}</h3>
          <div className="mt-4 flex items-baseline text-foreground">
            <span className="text-3xl font-extrabold tracking-tight">
              {tier.price}
            </span>
            {tier.price !== "Custom" && (
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                /month
              </span>
            )}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {tier.description}
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-between border-t p-6">
          <ul className="space-y-4">
            {tier.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="mr-3 h-5 w-5 shrink-0 text-torgovo-purple" />
                <span className="text-sm text-muted-foreground leading-tight">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button
              className={cn(
                "w-full",
                tier.popular
                  ? "bg-torgovo-purple hover:bg-torgovo-purple/80"
                  : ""
              )}
              variant={tier.popular ? "default" : "outline"}
            >
              {tier.buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

PricingCard.displayName = "PricingCard";

export default PricingCard;
