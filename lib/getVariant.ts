import { getBootstrapData } from './getBootstrapData'

export type Variant = 'a' | 'b'

export async function getVariant(): Promise<Variant> {
  try {
    const bootstrapData = await getBootstrapData()
    const variant = bootstrapData.featureFlags['landing-version']

    // Default to 'a' if no variant assigned or if variant is not 'a' or 'b'
    if (variant === 'b') {
      return 'b'
    }

    return 'a'
  } catch (error) {
    console.error('Error getting variant:', error)
    // Default to variant 'a' if there's an error
    return 'a'
  }
}
