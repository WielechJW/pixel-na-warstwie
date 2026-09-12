import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { PrintStudy } from "@/features/home/components/print-study";

export function HeroSection() {
  return (
    <section className="px-5 pt-12 sm:px-8 sm:pt-16 lg:pt-17" id="start">
      <div className="section-shell">
        <div className="grid items-center gap-12 pb-14 md:grid-cols-[1.05fr_1fr] md:gap-8 lg:gap-14 lg:pb-18">
          <div>
            <Reveal><p className="section-label">Z ciekawości do druku 3D</p></Reveal>
            <Reveal delay={70}>
              <h1 className="mt-6 font-display text-[clamp(2.8rem,5.1vw,4.6rem)] font-semibold leading-[1.09] tracking-[-0.065em]">
                Wielkie pomysły.<br /><span className="text-brand-dark">Małe warstwy.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-[460px] text-[15px] leading-7 text-muted sm:text-base sm:leading-8">
                Dwóch braci, jedna drukarka i mnóstwo rzeczy do odkrycia. Dzielimy się testami, błędami i małymi sukcesami z naszego świata druku 3D.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link className="button-primary" href="/blog">Zajrzyj do dziennika <Icon className="h-4 w-4" name="arrow-up-right" /></Link>
                <Link className="text-link py-3 text-ink/80" href="/#o-nas">Poznaj nas <Icon className="h-4 w-4" name="arrow-right" /></Link>
              </div>
              <div className="mt-10 flex items-center gap-3 border-t border-ink/10 pt-6 md:mt-12">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10"><Icon className="h-4 w-4 text-brand-dark" name="layers" /></span>
                <p className="text-[11px] leading-5 text-muted">Prawdziwe próby. Szczere wnioski.<br /><span className="font-semibold text-ink">Warstwa po warstwie.</span></p>
              </div>
            </Reveal>
          </div>
          <Reveal className="min-w-0" delay={160}><PrintStudy /></Reveal>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-y border-ink/12 py-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted">Na naszym warsztacie</p>
          {[
            { name: "box", label: "Pierwsze wydruki" },
            { name: "sliders", label: "Kalibracja i slicer" },
            { name: "filament", label: "Filamenty" },
            { name: "sparkles", label: "Lekcje z błędów" },
          ].map((item) => <span className="flex items-center gap-2.5 text-xs font-semibold text-ink/75" key={item.label}><Icon className="h-4 w-4 text-brand-dark" name={item.name as "box" | "sliders" | "filament" | "sparkles"} />{item.label}</span>)}
        </div>
      </div>
    </section>
  );
}
