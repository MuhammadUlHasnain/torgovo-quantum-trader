import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Globally observes any element with the `.reveal-on-scroll` class and adds
 * `.is-visible` when it enters the viewport. Re-runs on route changes so
 * newly-mounted pages are picked up.
 */
const ScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const attach = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal-on-scroll:not(.is-visible)")
        .forEach((el) => observer.observe(el));
    };

    // Initial pass + a delayed pass for late-mounting children.
    attach();
    const t = window.setTimeout(attach, 150);

    // Watch for new nodes added to the DOM (e.g. lazy sections).
    const mo = new MutationObserver(() => attach());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t);
      mo.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollReveal;