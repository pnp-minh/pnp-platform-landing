import { BenefitsSection } from "@/components/sections/benefits-section";
import { ChallengeSection } from "@/components/sections/feature-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { PlatformSection } from "@/components/sections/platform-section";
import { SolutionsSection } from "@/components/sections/solutions-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PlatformSection />
      <ChallengeSection />
      <SolutionsSection />
      <BenefitsSection />
      <FAQSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
