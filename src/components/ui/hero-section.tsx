
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2,
        });
      }

      // Subtitle parallax - moves slower on scroll
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
        });

        gsap.to(subtitleRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Title moves up faster on scroll (parallax separation)
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Actions fade in
      if (actionsRef.current) {
        gsap.from(actionsRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.8,
        });
      }

      // Background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden bg-background py-12 md:py-24",
        fullHeight && "min-h-[80vh] flex items-center",
        className
      )}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      {...props}
    >
      {/* Background gradient effect */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-gradient-to-b from-torgovo-purple/5 via-transparent to-transparent"
      />

      <div className="container relative z-10">
        <div className={cn("flex flex-col gap-6", alignmentClasses[align])}>
          <h1
            ref={titleRef}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl glow-text"
          >
            {heroTitle}
          </h1>

          {subtitle && (
            <p
              ref={subtitleRef}
              className="max-w-[700px] text-lg text-muted-foreground sm:text-xl"
            >
              {subtitle}
            </p>
          )}

          {children && (
            <div ref={actionsRef} className="mt-4 flex flex-wrap items-center gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
