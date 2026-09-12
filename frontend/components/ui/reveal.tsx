"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animation = element.animate(
        [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 750, delay: Math.min(delay, 300), easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
      );
      observer.disconnect();
    }, { threshold: 0.08 });

    const stop = () => {
      if (preference.matches) { observer.disconnect(); animation?.cancel(); }
    };

    observer.observe(element);
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", stop);
    };
  }, [delay]);

  return <div className={className} ref={ref}>{children}</div>;
}
