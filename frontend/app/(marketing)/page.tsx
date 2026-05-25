import { AboutSection } from "@/features/home/components/about-section";
import { BenefitsSection } from "@/features/home/components/benefits-section";
import { ContactSection } from "@/features/home/components/contact-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { OfferSection } from "@/features/home/components/offer-section";
import { ProcessSection } from "@/features/home/components/process-section";
import { ProjectsSection } from "@/features/home/components/projects-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <OfferSection />
      <BenefitsSection />
      <ProcessSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
