import Image from "next/image";
import Link from "next/link";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
      <nav aria-label="Główna nawigacja" className="section-shell flex h-21 items-center justify-between gap-5 px-5 sm:px-8 xl:px-0">
        <Link aria-label={`${siteConfig.name} — strona główna`} className="flex shrink-0 items-center gap-2.5" href="/">
          <Image alt="" className="h-11 w-11" height={44} width={44} sizes="44px" src="/logo.png" />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-[-0.045em]">{siteConfig.name.toLocaleLowerCase("pl")}<span className="text-brand-dark">.</span></span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">{siteConfig.shortDescription}</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 text-xs font-semibold lg:flex">
          {siteConfig.navigation.map((item) => <Link className="nav-link" href={item.href} key={item.href}>{item.label}</Link>)}
        </div>
        <div className="flex items-center gap-3">
          <Link className="button-primary hidden sm:inline-flex" href="/blog">Wpadnij na blog <Icon name="arrow-up-right" className="h-4 w-4" /></Link>
          <MobileNavigation />
        </div>
      </nav>
    </header>
  );
}
