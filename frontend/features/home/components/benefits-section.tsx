import { reasons } from "@/features/home/content";

export function BenefitsSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-label">Dlaczego my</p>
          <h2 className="section-title mt-4">
            Drukujemy z uwagą do każdej warstwy
          </h2>
        </div>
        <div className="grid gap-4">
          {reasons.map((reason) => (
            <article
              className="flex gap-5 rounded-3xl border-2 border-ink/8 bg-white p-6 sm:p-7"
              key={reason.title}
            >
              <span className="mt-1 text-2xl text-coral">★</span>
              <div>
                <h3 className="font-display text-2xl font-bold">
                  {reason.title}
                </h3>
                <p className="mt-2 leading-7 text-ink/68">{reason.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
