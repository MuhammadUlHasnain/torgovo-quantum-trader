import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type BotColumnKey = "signal" | "grid" | "martingale" | "quantumAi";

export interface ComparisonFeature {
  name: string;
  signal: boolean | string;
  grid: boolean | string;
  martingale: boolean | string;
  quantumAi: boolean | string;
}

interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  features: ComparisonFeature[];
  /** Which column to highlight as the focus of the current page */
  highlight?: BotColumnKey;
}

const COLUMNS: { key: BotColumnKey; label: string }[] = [
  { key: "signal", label: "Signal Bot" },
  { key: "grid", label: "Grid Bot" },
  { key: "martingale", label: "Martingale Bot" },
  { key: "quantumAi", label: "QuantumAI Bot" },
];

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title,
  subtitle,
  features,
  highlight = "quantumAi",
  className,
  ...props
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctxRef: { current: gsap.Context | null } = { current: null };
    const timer = setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: headerRef.current, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        }
        if (tableRef.current) {
          gsap.fromTo(
            tableRef.current,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: tableRef.current, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      ctxRef.current?.revert();
    };
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
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "p-4 text-center",
                      col.key === highlight && "bg-torgovo-purple/10 text-torgovo-purple"
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="p-4">{feature.name}</td>
                  {COLUMNS.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "p-4 text-center",
                        col.key === highlight && "bg-torgovo-purple/5"
                      )}
                    >
                      {renderValue(feature[col.key], col.key === highlight)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

function renderValue(value: boolean | string | undefined, isHighlight = false) {
  if (value === undefined) return null;
  if (typeof value === "boolean") {
    if (value) {
      return (
        <Check
          className={`h-5 w-5 mx-auto ${isHighlight ? "text-torgovo-purple" : "text-torgovo-blue"}`}
        />
      );
    }
    return <X className="h-5 w-5 mx-auto text-muted-foreground" />;
  }
  return (
    <span className={isHighlight ? "text-torgovo-purple font-medium" : ""}>{value}</span>
  );
}

export default ComparisonTable;
