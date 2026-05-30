import Link from "next/link";

import { siteConfig } from "@/config/site";

export function ContactSection() {
  return (
    <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20" id="kontakt">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border-[3px] border-ink bg-coral lg:grid-cols-[1fr_0.78fr]">
        <div className="p-8 text-white sm:p-12 lg:p-16">
          <p className="text-sm font-black uppercase text-white/75">
            Dołącz do rozmowy
          </p>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Masz temat, który warto przetestować?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/84">
            Zbieramy pomysły na wpisy, pytania początkujących i doświadczenia z
            własnych drukarek. Ten blog ma rosnąć razem z naszą nauką.
          </p>
          <Link className="button-secondary mt-8 w-fit" href="/kontakt">
            Napisz do nas
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-4 bg-cream p-8 sm:p-10">
          <p className="text-sm font-bold uppercase text-ink/55">
            Kanały kontaktu
          </p>
          <p className="font-display text-2xl font-bold">
            {siteConfig.contactEmail}
          </p>
          <p className="leading-7 text-ink/68">
            Na razie najważniejsze jest uporządkowanie notatek i pierwszych
            wpisów. Sprzedaż i zlecenia odkładamy na później, ale pytania i
            pomysły na testy są mile widziane.
          </p>
        </div>
      </div>
    </section>
  );
}
