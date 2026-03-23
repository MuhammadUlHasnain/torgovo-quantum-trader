import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Check reduced motion preference
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 30,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

export function useScrollReveal(options?: {
  stagger?: number;
  y?: number;
  scale?: number;
  blur?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const {
      stagger = 0.1,
      y = 60,
      scale = 0.95,
      blur = 0,
      duration = 0.8,
      delay = 0,
    } = options || {};

    const children = ref.current.children;
    const targets = children.length > 1 ? children : ref.current;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        scale,
        filter: blur ? `blur(${blur}px)` : undefined,
        duration,
        delay,
        stagger: children.length > 1 ? stagger : 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [options]);

  return ref;
}

export function useCountUp(end: number | string, duration = 2) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const numericEnd =
      typeof end === "string" ? parseFloat(end.replace(/[^0-9.]/g, "")) : end;
    const suffix =
      typeof end === "string" ? end.replace(/[0-9.]/g, "") : "";

    if (isNaN(numericEnd)) return;

    const el = ref.current;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: numericEnd,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (numericEnd % 1 === 0) {
            el.textContent = Math.round(obj.val) + suffix;
          } else {
            el.textContent = obj.val.toFixed(1) + suffix;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [end, duration]);

  return ref;
}

export function useTiltOnHover(maxDeg = 5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateY: x * maxDeg * 2,
        rotateX: -y * maxDeg * 2,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxDeg]);

  return ref;
}

export function useMagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
}

export function useCharacterReveal() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const el = ref.current;

    // Split text into spans
    const text = el.textContent || "";
    // Preserve existing HTML structure - work with direct children
    const html = el.innerHTML;

    // Wrap each character in a span
    const wrapped = html.replace(
      /([^<>&\s])/g,
      '<span class="char-reveal" style="display:inline-block;opacity:0">$1</span>'
    );
    el.innerHTML = wrapped;

    const chars = el.querySelectorAll(".char-reveal");

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      ctx.revert();
      el.innerHTML = html;
    };
  }, []);

  return ref;
}

export function useFloating(amplitude = 10, duration = 3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: amplitude,
        duration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [amplitude, duration]);

  return ref;
}

// Scroll progress bar hook
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
