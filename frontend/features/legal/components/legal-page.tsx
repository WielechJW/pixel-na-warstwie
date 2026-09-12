import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import type { LegalSection } from "@/features/legal/content";
import { legalInfo } from "@/features/legal/content";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  return (
    <main className="px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pb-28 lg:pt-20">
      <div className="section-shell">
        <Reveal className="max-w-4xl">
          <Link className="text-link mb-10 text-sm" href="/">
            <Icon name="arrow-left" className="h-4 w-4" />
            Wróć do strony głównej
          </Link>
          <p className="section-label">{eyebrow}</p>
          <h1 className="page-title mt-5">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {intro}
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs font-medium text-muted sm:text-sm">
            <Icon name="clock" className="h-4 w-4" />
            Ostatnia aktualizacja: {legalInfo.lastUpdated}
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-10 border-t border-ink/10 pt-10 lg:mt-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:pt-14">
          <aside className="sticky top-28 hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              W tym dokumencie
            </p>
            <nav aria-label="Spis treści dokumentu" className="mt-5">
              <ol className="space-y-1">
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      className="group flex gap-3 rounded-xl px-3 py-3 text-sm leading-5 text-muted transition-colors hover:bg-white hover:text-brand-dark"
                      href={`#sekcja-${index + 1}`}
                    >
                      <span className="pt-0.5 font-mono text-xs text-ink/30 group-hover:text-brand-dark">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <Link className="text-link mt-7 text-sm" href="/kontakt">
              Masz pytanie?
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </Link>
          </aside>

          <div className="min-w-0 rounded-3xl border border-ink/10 bg-white px-6 sm:px-10 lg:px-12">
            {sections.map((section, index) => (
              <section
                className="scroll-mt-28 border-b border-ink/10 py-8 last:border-b-0 sm:py-10"
                id={`sekcja-${index + 1}`}
                key={section.title}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="mt-1.5 font-mono text-xs font-medium text-brand-dark"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                    {section.title}
                  </h2>
                </div>
                {section.paragraphs ? (
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        className="text-base leading-8 text-muted"
                        key={paragraph}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                {section.items ? (
                  <ul className="mt-5 space-y-4">
                    {section.items.map((item) => (
                      <li
                        className="flex gap-3 text-base leading-8 text-muted"
                        key={item}
                      >
                        <span
                          className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark/60"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
