import { SolutionSection } from '@/components/sections/solution-section'
import { FAQSection } from '@/components/sections/faq-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SolutionSection />
      <FAQSection />
    </div>
  )
}
