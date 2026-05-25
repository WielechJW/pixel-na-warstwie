export function ContactSection() {
  return (
    <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20" id="kontakt">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border-[3px] border-ink bg-coral lg:grid-cols-[1fr_0.78fr]">
        <div className="p-8 text-white sm:p-12 lg:p-16">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/75">
            Kontakt
          </p>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Masz pomysł? Spróbujmy go wydrukować.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/84">
            Opisz, czego potrzebujesz, a sprawdzimy możliwości wykonania,
            kolor i najlepszy sposób realizacji Twojego projektu.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4 bg-cream p-8 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
            Dane kontaktowe
          </p>
          <p className="font-display text-2xl font-bold">
            Wkrótce dodamy tu e-mail i social media
          </p>
          <p className="leading-7 text-ink/68">
            Strona jest przygotowana na szybkie uzupełnienie kanału zamówień i
            linków do profili.
          </p>
        </div>
      </div>
    </section>
  );
}
