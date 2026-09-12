"use client";

import { useEffect, useRef } from "react";

import { NavigationLink } from "@/components/layout/navigation-link";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";

export function MobileNavigation() {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches && ref.current) ref.current.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) ref.current.open = false;
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  return (
    <details className="group lg:hidden" ref={ref}>
      <summary aria-label="Menu nawigacji" className="flex h-11 w-11 list-none items-center justify-center rounded-full border border-ink/15 [&::-webkit-details-marker]:hidden">
        <Icon className="h-5 w-5 group-open:hidden" name="menu" />
        <Icon className="hidden h-5 w-5 group-open:block" name="close" />
      </summary>
      <div className="mobile-menu-panel absolute inset-x-0 top-full max-h-[calc(100dvh_-_5.25rem_-_1px)] overflow-y-auto overscroll-contain border-b border-ink/15 bg-cream px-6 pb-7 pt-3 shadow-[0_18px_24px_-20px_rgba(32,60,54,0.3)]">
        {siteConfig.navigation.map((item, index) => (
          <NavigationLink className="flex items-center justify-between border-b border-ink/8 py-4 text-lg font-medium aria-[current]:text-brand-dark" href={item.href} key={item.href} onClick={() => { if (ref.current) ref.current.open = false; }}>
            <span><span className="mr-4 font-mono text-[10px] text-muted">0{index + 1}</span>{item.label}</span>
            <Icon className="h-4 w-4" name="arrow-up-right" />
          </NavigationLink>
        ))}
        <p className="mt-5 text-xs text-muted">Z ciekawości do druku 3D.</p>
      </div>
    </details>
  );
}
