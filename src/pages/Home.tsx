
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import FeatureSection from "@/components/ui/feature-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, ChartBar, Code, Cpu, Globe, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Counter stat component
const CountStat = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;

    const numPart = value.replace(/[^0-9.]/g, "");
    const suffix = value.replace(/[0-9.]/g, "");
    const numericEnd = parseFloat(numPart);
    if (isNaN(numericEnd)) return;

    const el = ref.current;
    el.textContent = "0" + suffix;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: numericEnd,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent =
            (numericEnd % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <div className="text-center">
      <p ref={ref} className="text-3xl font-bold text-torgovo-purple">
        {value}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

// Tilt bot card
const BotCard = ({
  title,
  description,
  items,
  color,
  link,
  buttonText,
}: {
  title: string;
  description: string;
  items: string[];
  color: "blue" | "purple";
  link: string;
  buttonText: string;
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

  const colorClasses = {
    blue: {
      border: "border-torgovo-blue/30 hover:border-torgovo-blue",
      title: "text-torgovo-blue",
      icon: "text-torgovo-blue",
      btn: "bg-torgovo-blue hover:bg-torgovo-blue/80",
    },
    purple: {
      border: "border-torgovo-purple/30 hover:border-torgovo-purple",
      title: "text-torgovo-purple",
      icon: "text-torgovo-purple",
      btn: "bg-torgovo-purple hover:bg-torgovo-purple-dim",
    },
  };

  const c = colorClasses[color];

  return (
    <Card
      ref={ref}
      className={`glass-card overflow-hidden ${c.border} transition-all duration-300`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <CardContent className="p-0">
        <div className="p-6">
          <h3 className={`text-2xl font-bold ${c.title} mb-4`}>{title}</h3>
          <p className="text-muted-foreground">{description}</p>
          <ul className="mt-4 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-center">
                <ArrowRight className={`h-4 w-4 mr-2 ${c.icon}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link to={link}>
              <Button className={c.btn}>{buttonText}</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Magnetic button wrapper
const MagneticButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`inline-block ${className || ""}`}>
      {children}
    </div>
  );
};

const Home = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const botsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);

  // Refresh ScrollTrigger after all components mount
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Stats section reveal
        if (statsRef.current) {
          gsap.fromTo(statsRef.current.children,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: statsRef.current, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        }

        // Bot cards emerge from depth
        if (botsRef.current) {
          gsap.fromTo(botsRef.current.children,
            { y: 80, opacity: 0, scale: 0.5 },
            {
              y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out",
              scrollTrigger: { trigger: botsRef.current, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        }

        // CTA depth shift background
        if (ctaBgRef.current && ctaRef.current) {
          gsap.to(ctaBgRef.current, {
            yPercent: -15, ease: "none",
            scrollTrigger: { trigger: ctaRef.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        // CTA content reveal
        if (ctaRef.current) {
          gsap.fromTo(ctaRef.current.querySelector(".cta-content"),
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: ctaRef.current, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        }
      });

      ctxRef.current = ctx;
    }, 50);

    let ctxRef = { current: null as gsap.Context | null };
    return () => { clearTimeout(timer); ctxRef.current?.revert(); };
  }, []);

  return (
    <Layout>
      <ScrollProgressBar />
      <FloatingOrbs />

      {/* Hero Section */}
      <HeroSection
        fullHeight
        heroTitle={
          <span>
            Quantum Trading <span className="text-torgovo-purple">Automation</span>
          </span>
        }
        subtitle="Unleash the power of algorithmic trading with Torgovo's advanced bot platform. Create custom trading strategies or use our pre-built solutions to maximize your returns."
      >
        <MagneticButton>
          <Button className="bg-torgovo-purple hover:bg-torgovo-purple-dim text-lg h-12 px-6">
            Get Started
          </Button>
        </MagneticButton>
        <MagneticButton>
          <Button variant="outline" className="text-lg h-12 px-6">
            Learn More
          </Button>
        </MagneticButton>
      </HeroSection>

      {/* Stats Section */}
      <section className="py-12 bg-secondary/50 backdrop-blur">
        <div className="container">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CountStat value="24/7" label="Automated Trading" />
            <CountStat value="50+" label="Exchanges Supported" />
            <CountStat value="99.9%" label="Uptime" />
            <CountStat value="10k+" label="Active Users" />
          </div>
        </div>
      </section>

      {/* Main Features */}
      <FeatureSection
        title="Trading Automation Made Simple"
        subtitle="Our platform offers powerful tools to automate your trading strategies with minimal effort."
        features={[
          {
            icon: <Bot className="h-6 w-6" />,
            title: "Custom Bot Creation",
            description:
              "Create your own trading bots with our intuitive interface and receive a webhook script for easy integration.",
          },
          {
            icon: <ChartBar className="h-6 w-6" />,
            title: "Pre-built Strategies",
            description:
              "Subscribe to our expert-crafted strategies that have been tested and optimized for various market conditions.",
          },
          {
            icon: <Globe className="h-6 w-6" />,
            title: "Multi-Exchange Support",
            description:
              "Connect to all major cryptocurrency exchanges through a single unified API interface.",
          },
          {
            icon: <Lock className="h-6 w-6" />,
            title: "Secure API Management",
            description:
              "Your exchange API keys are encrypted and stored securely with strict access controls.",
          },
          {
            icon: <Code className="h-6 w-6" />,
            title: "Webhook Integration",
            description:
              "Easily integrate your trading bots with external systems using our webhook API.",
          },
          {
            icon: <Cpu className="h-6 w-6" />,
            title: "24/7 Execution",
            description:
              "Our high-availability infrastructure ensures your strategies run without interruption.",
          },
        ]}
      />

      {/* Bot Types */}
      <section
        className="py-16 bg-gradient-to-b from-background to-secondary/30"
        style={{ perspective: "1000px" }}
      >
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center glow-text">
            Specialized Bot Types
          </h2>

          <div ref={botsRef} className="grid md:grid-cols-2 gap-8">
            <BotCard
              title="GRID Bots"
              description="Grid trading bots place buy and sell orders at predefined intervals, profiting from market volatility even in sideways markets."
              items={[
                "Perfect for ranging markets",
                "Customizable price ranges and grid levels",
                "Automated buy low, sell high strategy",
              ]}
              color="blue"
              link="/grid-bots"
              buttonText="Explore GRID Bots"
            />
            <BotCard
              title="Martingale Bots"
              description="Martingale bots use cost-averaging strategies to accumulate assets at better average prices during market downtrends."
              items={[
                "Dynamic position sizing",
                "Configurable safety orders",
                "Take profit automation",
              ]}
              color="purple"
              link="/martingale-bots"
              buttonText="Explore Martingale Bots"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 bg-torgovo-dark relative overflow-hidden">
        <div
          ref={ctaBgRef}
          className="absolute inset-0 bg-gradient-to-br from-torgovo-purple/10 via-transparent to-torgovo-blue/5"
          style={{ willChange: "transform" }}
        />
        <div className="container relative z-10">
          <div className="cta-content max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 glow-text">
              Ready to Automate Your Trading?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Start creating your own trading bots or subscribe to our pre-built strategies
              today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton>
                <Button className="bg-torgovo-purple hover:bg-torgovo-purple-dim text-lg h-12 px-6">
                  Get Started
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Link to="/pricing">
                  <Button variant="outline" className="text-lg h-12 px-6">
                    View Pricing
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
