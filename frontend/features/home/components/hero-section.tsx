import Image from "next/image";
import Link from "next/link";

import { heroHighlights } from "@/features/home/content";

export function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden px-5 pb-20 pt-12 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28 lg:pt-16"
      id="start"
    >
      <div className="pattern-grid absolute inset-0 -z-20 opacity-45" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
        <div>
          <p className="badge mb-7">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-coral" />
            Blog o nauce druku 3D
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-[0.98] text-ink sm:text-6xl lg:text-[5rem]">
            Uczymy się druku 3D.{" "}
            <span className="relative inline-block text-brand-dark">
              Notujemy
              <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full -rotate-1 rounded-full bg-sun/80" />
            </span>
            <br />
            każdą warstwę.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/72 sm:text-xl">
            Pixel na Warstwie to dziennik naszej nauki: opisujemy pierwsze
            wydruki, ustawienia, pomyłki, poprawki i doświadczenia z domowego
            warsztatu 3D.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link className="button-primary" href="/blog">
              Czytaj dziennik
            </Link>
            <Link className="button-secondary" href="/#tematy">
              Zobacz tematy
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {heroHighlights.map((item) => (
              <span className="feature-chip" key={item}>
                <span className="text-coral">+</span> {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="logo-stage relative rounded-[2.75rem] border-[3px] border-ink bg-mint p-7 sm:p-10">
            <span className="absolute left-7 top-7 rounded-full border-2 border-ink bg-sun px-4 py-2 text-xs font-black uppercase">
              Dziennik warsztatu
            </span>
            <div className="pt-14">
              <Image
                alt="Logo Pixel na Warstwie z drukarką 3D"
                className="mx-auto h-auto w-full max-w-[360px] drop-shadow-[0_14px_0_rgba(22,59,89,0.09)]"
                height={300}
                priority
                src="/logo.png"
                width={300}
              />
            </div>
            <div className="mt-7 flex items-center gap-3 rounded-2xl border-2 border-ink/12 bg-white/62 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral font-display text-xl font-bold text-white">
                #1
              </div>
              <p className="text-sm font-semibold leading-6 text-ink/72">
                Zamiast katalogu produktów prowadzimy zapiski z nauki,
                testów i małych odkryć.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-5 left-10 right-10 -z-10 h-14 rounded-full bg-ink/18 blur-xl" />
        </div>
      </div>
    </section>
  );
}
