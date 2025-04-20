
import React from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  heroTitle: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  fullHeight?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heroTitle,
  subtitle,
  children,
  align = "center",
  fullHeight = false,
  className,
  ...props
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-background py-12 md:py-24",
        fullHeight && "min-h-[80vh] flex items-center",
        className
      )}
      {...props}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-torgovo-purple/5 via-transparent to-transparent" />
      
      <div className="container relative z-10">
        <div className={cn("flex flex-col gap-6", alignmentClasses[align])}>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl glow-text">
            {heroTitle}
          </h1>
          
          {subtitle && (
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              {subtitle}
            </p>
          )}
          
          {children && (
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
