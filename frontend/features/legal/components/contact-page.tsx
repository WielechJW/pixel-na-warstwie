import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ContactForm } from "@/features/legal/components/contact-form";

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
            Wyślij wiadomość przez formularz albo napisz bezpośrednio mailowo.
            Strona ma charakter hobbystyczny, więc odpowiedź może nie przyjść
            od razu, ale każda sensowna wskazówka do testów jest mile widziana.
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

        <ContactForm />
      </div>
    </main>
  );
}
