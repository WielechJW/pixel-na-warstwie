import type { Metadata } from "next";

import { LegalPage } from "@/features/legal/components/legal-page";
import { websiteRulesSections } from "@/features/legal/content";

export const metadata: Metadata = {
  title: "Zasady strony i współprace | Pixel na Warstwie",
  description:
    "Zasady korzystania z treści Pixel na Warstwie, prawa autorskie, linki zewnętrzne i oznaczanie przyszłych współprac.",
};

export default function WebsiteRulesPage() {
  return (
    <LegalPage
      eyebrow="Zasady"
      intro="Krótko opisujemy, jaki charakter mają treści na stronie, jak podchodzimy do praw autorskich oraz jak będą oznaczane ewentualne współprace."
      sections={websiteRulesSections}
      title="Zasady strony i współprace"
    />
  );
}
