import type { Metadata } from "next";

import { ContactPageContent } from "@/features/legal/components/contact-page";

export const metadata: Metadata = {
  title: "Kontakt | Pixel na Warstwie",
  description:
    "Kontakt z Pixel na Warstwie: pytania o druk 3D, pomysły na wpisy, doświadczenia i przyszłe współprace.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
