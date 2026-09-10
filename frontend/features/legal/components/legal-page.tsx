import type { LegalSection } from "@/features/legal/content";
import { legalInfo } from "@/features/legal/content";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="section-label">{eyebrow}</p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-none text-ink sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-ink/72">{intro}</p>
        <p className="mt-4 text-sm font-bold text-ink/55">
          Ostatnia aktualizacja: {legalInfo.lastUpdated}
        </p>

        <div className="mt-12 space-y-6">
          {sections.map((section) => (
            <section
              className="rounded-[2rem] border-2 border-ink/10 bg-white p-6 shadow-[5px_5px_0_#e4f5ef] sm:p-8"
              key={section.title}
            >
              <h2 className="font-display text-3xl font-bold">
                {section.title}
              </h2>
              {section.paragraphs ? (
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      className="text-lg leading-8 text-ink/72"
                      key={paragraph}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
              {section.items ? (
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li className="flex gap-3 leading-7 text-ink/72" key={item}>
                      <span className="font-bold text-coral">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
