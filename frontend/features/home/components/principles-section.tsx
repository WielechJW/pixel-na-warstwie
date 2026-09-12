import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { writingPrinciples } from "@/features/home/content";

const principleIcons = ["sliders", "layers", "message"] as const;

export function PrinciplesSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="section-shell">
        <Reveal className="mb-10 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">Nasze podejście</p>
            <h2 className="section-title mt-5">Dobra nauka zaczyna się od szczerości.</h2>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {writingPrinciples.map((principle, index) => (
            <Reveal delay={index * 80} key={principle.title}>
              <article className="h-full border-t border-ink/15 pt-6 sm:pt-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-brand-dark">
                    <Icon className="h-5 w-5" name={principleIcons[index]} />
                  </span>
                  <span className="font-mono text-xs text-ink/45">
                    / 0{index + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.035em] sm:text-[1.35rem]">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-ink/65">
                  {principle.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
