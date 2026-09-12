import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/features/legal/components/contact-form";

export function ContactPageContent() {
  return (
    <main className="px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pb-28 lg:pt-20">
      <div className="section-shell">
        <Reveal>
          <Link className="text-link text-sm" href="/">
            <Icon name="arrow-left" className="h-4 w-4" />
            Wróć do strony głównej
          </Link>
        </Reveal>

        <div className="mt-10 grid items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="min-w-0">
            <p className="section-label">Kontakt</p>
            <h1 className="page-title mt-5">
              Dobre pomysły zaczynają się od{" "}
              <span className="text-brand-dark">rozmowy.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">
              Pytanie o druk 3D, pomysł na kolejny test, a może współpraca? Napisz
              przez formularz lub bezpośrednio na e-mail.
            </p>

            <div className="mt-9 rounded-3xl border border-brand-dark/10 bg-mint p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-brand-dark">
                <Icon name="mail" className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Wolisz napisać maila?
              </p>
              <Link
                className="group mt-2 inline-flex max-w-full items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:text-brand-dark sm:text-xl"
                href={`mailto:${siteConfig.contactEmail}`}
              >
                <span className="break-all">{siteConfig.contactEmail}</span>
                <Icon
                  name="arrow-up-right"
                  className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <p className="mt-4 text-sm leading-6 text-muted">
                To hobbystyczny blog, więc odpowiedź może nie przyjść od razu.
                Twoje pytania i wskazówki pomagają znaleźć tematy kolejnych
                eksperymentów.
              </p>
            </div>

            <div className="mt-7 flex items-start gap-3 text-sm leading-6 text-muted">
              <Icon
                name="message"
                className="mt-1 h-4 w-4 shrink-0 text-brand-dark"
              />
              <p>
                Administratorem danych podanych w wiadomości jest{" "}
                {siteConfig.owner}. Szczegóły opisuje{" "}
                <Link
                  className="underline decoration-ink/25 underline-offset-4 transition-colors hover:text-brand-dark"
                  href="/polityka-prywatnosci"
                >
                  polityka prywatności
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="min-w-0">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
