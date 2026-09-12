"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

export function AnimationStage({ children, className }: { children: ReactNode; className?: string }) {
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;

    stage.dataset.ready = "true";
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      stage.dataset.offscreen = String(!entry.isIntersecting);
    });
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`animation-stage ${className ?? ""}`} data-paused={paused} ref={ref}>
      {children}
      <button
        aria-label={paused ? "Wznów animację ilustracji" : "Wstrzymaj animację ilustracji"}
        aria-pressed={paused}
        className="animation-control absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-cream/80 text-ink transition-colors hover:bg-white motion-reduce:hidden"
        onClick={() => setPaused(!paused)}
        type="button"
      >
        <Icon className="h-3.5 w-3.5" name={paused ? "play" : "pause"} />
      </button>
    </div>
  );
}
