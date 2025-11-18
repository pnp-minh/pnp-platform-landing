import { PostHogClient } from './posthog'
import { cookies } from 'next/headers'

export async function getBootstrapData() {
  const cookieStore = await cookies()
  let distinct_id = cookieStore.get('ph_distinct_id')?.value

  // Generate a distinct ID if none exists
  if (!distinct_id) {
    distinct_id = crypto.randomUUID()
  }

  const client = PostHogClient()

  try {
    const flags = await client.getAllFlags(distinct_id)
    const bootstrapData = {
      distinctID: distinct_id,
      featureFlags: flags as Record<string, string | boolean>,
    }

    return bootstrapData
  } catch (error) {
    console.error('Error fetching PostHog bootstrap data:', error)
    // Return default data if PostHog is unavailable
    return {
      distinctID: distinct_id,
      featureFlags: {} as Record<string, string | boolean>,
    }
  } finally {
    await client.shutdown()
  }
}
