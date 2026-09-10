import type { Metadata } from "next";

import { LegalPage } from "@/features/legal/components/legal-page";
import { cookiePolicySections } from "@/features/legal/content";

export const metadata: Metadata = {
  title: "Polityka cookies | Pixel na Warstwie",
  description:
    "Informacja o cookies, zgodach i planowanych narzędziach analitycznych na stronie Pixel na Warstwie.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      intro="Ta strona wyjaśnia, jak Pixel na Warstwie podchodzi do cookies, zgody na analitykę oraz przyszłego wdrożenia Google Analytics i Google Tag Manager."
      sections={cookiePolicySections}
      title="Polityka cookies"
    />
  );
}
