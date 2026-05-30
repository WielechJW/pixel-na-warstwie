import { AboutSection } from "@/features/home/components/about-section";
import { ContactSection } from "@/features/home/components/contact-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { LatestArticlesSection } from "@/features/home/components/latest-articles-section";
import { LearningProcessSection } from "@/features/home/components/learning-process-section";
import { PrinciplesSection } from "@/features/home/components/principles-section";
import { TopicsSection } from "@/features/home/components/topics-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TopicsSection />
      <PrinciplesSection />
      <LearningProcessSection />
      <LatestArticlesSection />
      <ContactSection />
    </main>
  );
}
