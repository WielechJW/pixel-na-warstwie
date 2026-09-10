import type { Metadata } from "next";

import { LegalPage } from "@/features/legal/components/legal-page";
import { privacyPolicySections } from "@/features/legal/content";

export const metadata: Metadata = {
  title: "Polityka prywatności | Pixel na Warstwie",
  description:
    "Polityka prywatności bloga Pixel na Warstwie: administrator danych, kontakt, hosting, formularz, analityka i prawa użytkownika.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Prywatność"
      intro="Poniżej opisujemy, jakie dane mogą być przetwarzane przy korzystaniu z bloga, kontakcie mailowym oraz planowanych narzędziach analitycznych."
      sections={privacyPolicySections}
      title="Polityka prywatności"
    />
  );
}
