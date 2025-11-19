import { HeroSection } from '@/components/sections/hero-section'
import { FeatureSection } from '@/components/sections/feature-section'
import { SolutionSection } from '@/components/sections/solution-section'
import { BenefitsSection } from '@/components/sections/benefits-section'
import { PlatformSection } from '@/components/sections/platform-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CtaSection } from '@/components/sections/cta-section'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PlatformSection />
      <FeatureSection />
      <BenefitsSection />
      <SolutionSection />
      <FAQSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
