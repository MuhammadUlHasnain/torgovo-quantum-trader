
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  className,
  ...props
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Small delay to ensure layout is calculated
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (headerRef.current) {
          gsap.fromTo(headerRef.current, 
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (gridRef.current) {
          gsap.fromTo(gridRef.current.children,
            { y: 80, opacity: 0, scale: 0.85 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      ctxRef.current = ctx;
    }, 50);

    let ctxRef = { current: null as gsap.Context | null };
    return () => {
      clearTimeout(timer);
      ctxRef.current?.revert();
    };
  }, []);

  return (
    <section
      className={cn("py-12 md:py-16", className)}
      style={{ perspective: "1000px" }}
      {...props}
    >
      <div className="container">
        {(title || subtitle) && (
          <div ref={headerRef} className="mb-12 text-center">
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

        <div ref={gridRef} className={cn("grid gap-8", columnClasses[columns])}>
          {features.map((feature, index) => (
            <TiltCard
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
              <p className="text-muted-foreground">{feature.description}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
