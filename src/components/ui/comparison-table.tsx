
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ComparisonFeature {
  name: string;
  aiGridBot: boolean | string;
  competitor1?: boolean | string;
  competitor2?: boolean | string;
  competitor3?: boolean | string;
}

interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  competitors: string[];
  features: ComparisonFeature[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title,
  subtitle,
  competitors,
  features,
  className,
  ...props
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      if (tableRef.current) {
        gsap.from(tableRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={cn("py-12", className)} {...props}>
      <div className="container">
        {(title || subtitle) && (
          <div ref={headerRef} className="text-center mb-8">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        <div ref={tableRef} className="overflow-x-auto">
          <table className="w-full border-collapse glass-card">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Features</th>
                <th className="p-4 text-center bg-torgovo-purple/10 text-torgovo-purple">
                  AI Powered Grid Bot
                </th>
                {competitors.map((competitor, index) => (
                  <th key={index} className="p-4 text-center">
                    {competitor}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="p-4">{feature.name}</td>
                  <td className="p-4 text-center bg-torgovo-purple/5">
                    {renderValue(feature.aiGridBot, true)}
                  </td>
                  <td className="p-4 text-center">
                    {renderValue(feature.competitor1)}
                  </td>
                  {feature.competitor2 !== undefined && (
                    <td className="p-4 text-center">
                      {renderValue(feature.competitor2)}
                    </td>
                  )}
                  {feature.competitor3 !== undefined && (
                    <td className="p-4 text-center">
                      {renderValue(feature.competitor3)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

function renderValue(
  value: boolean | string | undefined,
  isAiGridBot = false
) {
  if (value === undefined) return null;
  if (typeof value === "boolean") {
    if (value) {
      return (
        <Check
          className={`h-5 w-5 mx-auto ${
            isAiGridBot ? "text-torgovo-purple" : "text-torgovo-blue"
          }`}
        />
      );
    } else {
      return <X className="h-5 w-5 mx-auto text-muted-foreground" />;
    }
  }
  return (
    <span className={isAiGridBot ? "text-torgovo-purple font-medium" : ""}>
      {value}
    </span>
  );
}

export default ComparisonTable;
