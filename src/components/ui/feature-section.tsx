
import React from "react";
import { cn } from "@/lib/utils";

interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  className,
  ...props
}) => {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("py-12 md:py-16", className)} {...props}>
      <div className="container">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-torgovo-purple glow-text">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn("grid gap-8", columnClasses[columns])}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-card p-6 transition-all duration-200 hover:border-torgovo-purple/40 hover:shadow-md"
            >
              {feature.icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-torgovo-purple/10 text-torgovo-purple group-hover:bg-torgovo-purple/20">
                  {feature.icon}
                </div>
              )}
              <h3 className="mb-2 text-xl font-medium text-torgovo-blue">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
