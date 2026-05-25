import { steps } from "@/features/home/content";

export function ProcessSection() {
  return (
    <section
      className="bg-ink px-5 py-20 text-cream sm:px-8 lg:px-12 lg:py-24"
      id="jak-dzialamy"
    >
      <div className="mx-auto max-w-7xl">
        <p className="section-label text-brand">Jak działamy</p>
        <h2 className="section-title mt-4 max-w-xl text-cream">
          Od pomysłu do gotowego wydruku
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article className="relative pt-5" key={step.title}>
              <span className="absolute left-0 top-0 h-1.5 w-full rounded-full bg-white/12">
                <span className="block h-full w-14 rounded-full bg-coral" />
              </span>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand">
                Krok {index + 1}
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-cream/70">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
