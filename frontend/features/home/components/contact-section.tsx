import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

export function ContactSection() {
  return (
    <section className="px-5 pb-20 pt-6 sm:px-8 lg:px-12 lg:pb-24" id="kontakt">
      <Reveal className="section-shell">
        <div className="relative isolate overflow-hidden rounded-3xl bg-mint p-7 sm:p-11 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-36 -z-10 h-120 w-120 rounded-full border border-brand-dark/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 -z-10 h-88 w-88 rounded-full border border-brand-dark/10" />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <div>
              <p className="section-label">Porozmawiajmy o druku</p>
              <h2 className="section-title mt-5 max-w-2xl">
                Dobry pomysł zaczyna się od rozmowy.
              </h2>
              <p className="mt-5 max-w-lg leading-7 text-muted">
                Coś nie wyszło? Coś Cię zaciekawiło? Podrzuć pytanie,
                doświadczenie albo temat, który warto przetestować.
              </p>
              <Link className="button-primary mt-8 gap-3" href="/kontakt">
                Napisz do nas
                <Icon className="h-4 w-4" name="arrow-up-right" />
              </Link>
            </div>
            <div className="border-t border-ink/15 pt-6 lg:pb-1">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-brand-dark">
                <Icon className="h-5 w-5" name="mail" />
              </div>
              <p className="mb-2 text-xs text-muted">Najprościej? Mailowo.</p>
              <a
                className="group inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold tracking-[-0.02em] text-ink underline decoration-ink/25 underline-offset-5 transition-colors hover:text-brand-dark sm:text-base"
                href={`mailto:${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
                <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" name="arrow-up-right" />
              </a>
              <p className="mt-4 text-xs leading-6 text-muted">
                Każda wymiana doświadczeń to kolejny krok do przodu.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
