"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

export function AnimationStage({ children, className }: { children: ReactNode; className?: string }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={className} data-paused={paused}>
      {children}
      <button
        aria-label={paused ? "Wznów animację ilustracji" : "Wstrzymaj animację ilustracji"}
        aria-pressed={paused}
        className="absolute bottom-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-cream/80 text-ink transition-colors hover:bg-white motion-reduce:hidden"
        onClick={() => setPaused(!paused)}
        type="button"
      >
        <Icon className="h-3.5 w-3.5" name={paused ? "play" : "pause"} />
      </button>
    </div>
  );
}
