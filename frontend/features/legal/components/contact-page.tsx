import Link from "next/link";

import { siteConfig } from "@/config/site";

export function ContactPageContent() {
  return (
    <main className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="section-label">Kontakt</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-none text-ink sm:text-6xl">
            Napisz o pytaniu, pomyśle albo współpracy
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink/72">
            Najprościej złapać nas mailowo. Strona ma charakter hobbystyczny,
            więc odpowiedź może nie przyjść od razu, ale każda sensowna
            wskazówka do testów jest mile widziana.
          </p>
          <div className="mt-8 rounded-[2rem] border-2 border-ink/10 bg-white p-6 shadow-[5px_5px_0_#e4f5ef]">
            <p className="text-sm font-bold uppercase text-ink/55">E-mail</p>
            <Link
              className="mt-2 block break-words font-display text-2xl font-bold text-brand-dark"
              href={`mailto:${siteConfig.contactEmail}`}
            >
              {siteConfig.contactEmail}
            </Link>
            <p className="mt-4 leading-7 text-ink/68">
              Administratorem danych podanych w wiadomości jest{" "}
              {siteConfig.owner}. Szczegóły opisuje polityka prywatności.
            </p>
          </div>
        </div>

        <form
          action={`mailto:${siteConfig.contactEmail}`}
          className="rounded-[2rem] border-2 border-ink bg-mint p-6 shadow-[8px_8px_0_#163b59] sm:p-8"
          encType="text/plain"
          method="post"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="font-bold text-ink">Imię</span>
              <input
                className="mt-2 w-full rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-brand-dark"
                name="Imię"
                required
                type="text"
              />
            </label>
            <label className="block">
              <span className="font-bold text-ink">E-mail</span>
              <input
                className="mt-2 w-full rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-brand-dark"
                name="E-mail"
                required
                type="email"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="font-bold text-ink">Temat</span>
            <input
              className="mt-2 w-full rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-brand-dark"
              name="Temat"
              required
              type="text"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-ink">Wiadomość</span>
            <textarea
              className="mt-2 min-h-44 w-full resize-y rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-brand-dark"
              name="Wiadomość"
              required
            />
          </label>

          <label className="mt-5 flex gap-3 text-sm leading-6 text-ink/70">
            <input className="mt-1 h-5 w-5 accent-[#207f82]" required type="checkbox" />
            <span>
              Rozumiem, że moje dane zostaną użyte do odpowiedzi na wiadomość.
              Formularz otworzy program pocztowy i nie zapisuje wiadomości w
              bazie tej strony.
            </span>
          </label>

          <button className="button-primary mt-7" type="submit">
            Otwórz wiadomość e-mail
          </button>
        </form>
      </div>
    </main>
  );
}
