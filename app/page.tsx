import { BenefitsSection } from "@/components/sections/benefits-section";
import { ChallengeSection } from "@/components/sections/challenge-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductSection } from "@/components/sections/product-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProductSection />
      <ChallengeSection />
      <HowItWorksSection />
      <BenefitsSection />
      <FAQSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
