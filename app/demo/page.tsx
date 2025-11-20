import { getVariant } from '@/lib/getVariant'
import { DemoGateForm } from '@/components/demo/demo-gate-form'
import { DemoVersionA } from '@/components/demo/demo-version-a'
import { DemoVersionB } from '@/components/demo/demo-version-b'

export default async function DemoPage() {
  // Get the A/B test variant from PostHog
  const variant = await getVariant()

  return (
    <div className="bg-white">
      {/* Demo Gate Form - Shows first, collects user info */}
      <DemoGateForm variant={variant} />

      {/* Demo Experience - Shows after form submission */}
      {/* Version A or B based on PostHog variant */}
      {variant === 'a' ? <DemoVersionA /> : <DemoVersionB />}
    </div>
  )
}
