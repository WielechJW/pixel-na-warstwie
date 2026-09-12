import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { CookieSettingsButton } from "@/features/legal/components/cookie-consent";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 px-5 pb-7 pt-14 sm:px-8 lg:pt-18">
      <div className="section-shell">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.3fr_0.7fr_1fr] md:gap-12">
          <div>
            <Link className="inline-flex items-center gap-3" href="/">
              <Image alt="" className="h-12 w-12" height={48} width={48} sizes="48px" src="/logo.png" />
              <span className="font-display text-xl font-extrabold">{siteConfig.name.toLocaleLowerCase("pl")}.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">Dwóch braci, jedna drukarka i kolejne rzeczy do odkrycia. Zapisujemy je tutaj.</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Rozejrzyj się</p>
            <div className="mt-5 flex flex-col items-start gap-4 text-sm font-medium">
              <Link className="nav-link" href="/blog">Notatki z warsztatu</Link>
              <Link className="nav-link" href="/#o-nas">Poznaj nas</Link>
              <Link className="nav-link" href="/#tematy">Tematy na blogu</Link>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Zostańmy w kontakcie</p>
            <a className="mt-5 inline-flex max-w-full items-center gap-2 text-sm font-semibold sm:text-base" href={`mailto:${siteConfig.contactEmail}`}>
              <span className="break-all">{siteConfig.contactEmail}</span><Icon className="h-4 w-4 shrink-0" name="arrow-up-right" />
            </a>
            <p className="mt-4 text-sm leading-7 text-muted">Pytanie, pomysł na test, a może własne doświadczenie? Chętnie poczytamy.</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5 border-t border-ink/10 pt-6 text-[11px] text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Warstwa po warstwie.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            {siteConfig.legalLinks.map((item) => <Link className="nav-link" href={item.href} key={item.href}>{item.label}</Link>)}
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
