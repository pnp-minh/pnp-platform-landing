import { SolutionSection } from '@/components/sections/solution-section'
import { BenefitsSection } from '@/components/sections/benefits-section'
import { FAQSection } from '@/components/sections/faq-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <BenefitsSection />
      <SolutionSection />
      <FAQSection />
    </div>
  )
}
