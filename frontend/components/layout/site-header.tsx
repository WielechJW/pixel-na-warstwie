import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink/8 bg-cream/92 backdrop-blur-xl">
      <nav
        aria-label="Główna nawigacja"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12"
      >
        <Link className="flex items-center gap-3" href="/#start">
          <Image
            alt=""
            className="h-12 w-12"
            height={300}
            src="/logo.png"
            width={300}
          />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg font-bold uppercase tracking-[0.06em]">
              {siteConfig.name}
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-ink/60">
              {siteConfig.shortDescription}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-bold lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <Link className="button-primary shrink-0" href="/#kontakt">
          Zapytaj o wydruk
        </Link>
      </nav>
    </header>
  );
}
