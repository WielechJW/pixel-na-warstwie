import { writingPrinciples } from "@/features/home/content";

export function PrinciplesSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-label">Podejście</p>
          <h2 className="section-title mt-4">
            Blog zamiast katalogu idealnych wydruków
          </h2>
        </div>
        <div className="grid gap-4">
          {writingPrinciples.map((principle) => (
            <article
              className="flex gap-5 rounded-3xl border-2 border-ink/8 bg-white p-6 sm:p-7"
              key={principle.title}
            >
              <span className="mt-1 text-2xl text-coral">+</span>
              <div>
                <h3 className="font-display text-2xl font-bold">
                  {principle.title}
                </h3>
                <p className="mt-2 leading-7 text-ink/68">
                  {principle.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
