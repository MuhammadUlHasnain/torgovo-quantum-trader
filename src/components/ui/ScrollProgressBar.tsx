import React from "react";
import { useScrollProgress } from "@/hooks/useScrollAnimations";

const ScrollProgressBar: React.FC = () => {
  const progressRef = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none">
      <div
        ref={progressRef}
        className="h-full origin-left"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, hsl(var(--accent-primary)), hsl(var(--accent-primary) / 0.6), hsl(var(--accent-primary)))",
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
