import { learningSteps } from "@/features/home/content";

export function LearningProcessSection() {
  return (
    <section
      className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-12 lg:py-20"
      id="jak-sie-uczymy"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="section-label text-brand">Jak się uczymy</p>
          <h2 className="section-title section-title-light mt-4 max-w-xl">
            Testujemy, zapisujemy i poprawiamy po kawałku
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cream/72">
            Chcemy, żeby każdy wpis miał źródło w konkretnym teście, a nie w
            zgadywaniu. Dlatego przy wydrukach zapisujemy ustawienia, objawy i
            wnioski do sprawdzenia następnym razem.
          </p>

          <div className="mt-8 rounded-[2rem] border-2 border-white/12 bg-cream p-4 text-ink shadow-[8px_8px_0_rgba(92,203,196,0.28)] sm:p-5">
            <div className="flex items-center justify-between gap-4 border-b-2 border-ink/10 pb-4">
              <div>
                <p className="text-xs font-black uppercase text-coral">
                  Test warstwy #04
                </p>
                <p className="mt-1 font-display text-2xl font-bold">
                  PLA / przyczepność
                </p>
              </div>
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-coral" />
                <span className="h-3 w-3 rounded-full bg-sun" />
                <span className="h-3 w-3 rounded-full bg-brand" />
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-52 overflow-hidden rounded-3xl border-2 border-ink/10 bg-white">
                <div className="absolute inset-x-8 bottom-8 h-24 rounded-2xl border-2 border-ink bg-mint">
                  <div className="absolute inset-x-4 top-5 space-y-2">
                    <span className="block h-2 rounded-full bg-brand-dark/30" />
                    <span className="block h-2 rounded-full bg-brand-dark/45" />
                    <span className="block h-2 rounded-full bg-brand-dark/60" />
                    <span className="block h-2 rounded-full bg-brand-dark/75" />
                  </div>
                </div>
                <div className="absolute left-1/2 top-8 h-16 w-20 -translate-x-1/2 rounded-2xl border-2 border-ink bg-coral">
                  <span className="absolute left-1/2 top-full h-9 w-4 -translate-x-1/2 rounded-b-lg border-x-2 border-b-2 border-ink bg-sun" />
                </div>
                <div className="absolute left-8 right-8 top-24 h-1.5 rounded-full bg-ink/12" />
              </div>

              <div className="grid content-between gap-3">
                {[
                  ["Dysza", "205 C"],
                  ["Stół", "60 C"],
                  ["Prędkość", "45 mm/s"],
                ].map(([label, value]) => (
                  <div
                    className="rounded-2xl border-2 border-ink/10 bg-mint p-4"
                    key={label}
                  >
                    <p className="text-xs font-black uppercase text-ink/48">
                      {label}
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <span className="absolute bottom-6 left-6 top-6 hidden w-0.5 bg-white/12 md:block" />
          {learningSteps.map((step, index) => (
            <article
              className="relative mb-4 rounded-[1.5rem] border-2 border-white/10 bg-white/7 p-5 backdrop-blur last:mb-0 sm:p-6"
              key={step.title}
            >
              <span className="absolute -left-0 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-sun font-display text-lg font-bold text-ink md:-left-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pl-16">
                <p className="text-sm font-bold uppercase text-brand">
                  Krok {index + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-cream/70">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
