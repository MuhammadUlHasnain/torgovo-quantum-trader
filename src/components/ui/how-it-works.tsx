
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface HowItWorksProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  steps: Step[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({
  title,
  subtitle,
  steps,
  className,
  ...props
}) => {
  return (
    <section className={cn("py-12 md:py-16", className)} {...props}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-torgovo-purple glow-text">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[39px] top-10 h-[calc(100%-4rem)] w-0.5 hidden sm:block bg-border" />

          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-torgovo-purple/10 border border-torgovo-purple/30 text-torgovo-purple font-bold text-2xl z-10">
                  {step.number}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
