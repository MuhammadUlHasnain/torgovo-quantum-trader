import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FloatingOrbsProps {
  count?: number;
}

const FloatingOrbs: React.FC<FloatingOrbsProps> = ({ count = 3 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const orbs = containerRef.current.children;

    const ctx = gsap.context(() => {
      Array.from(orbs).forEach((orb, i) => {
        // Continuous floating
        gsap.to(orb, {
          y: `random(-40, 40)`,
          x: `random(-20, 20)`,
          duration: `random(4, 7)`,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.5,
        });

        // Scroll-based parallax shift
        gsap.to(orb, {
          yPercent: (i + 1) * 15,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const orbStyles = [
    "top-[10%] left-[10%] w-64 h-64 bg-accent-primary/5 blur-[80px]",
    "top-[40%] right-[5%] w-96 h-96 bg-accent-primary/8 blur-[100px]",
    "bottom-[15%] left-[30%] w-48 h-48 bg-accent-primary/6 blur-[60px]",
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {orbStyles.slice(0, count).map((style, i) => (
        <div key={i} className={`absolute rounded-full ${style}`} />
      ))}
    </div>
  );
};

export default FloatingOrbs;
