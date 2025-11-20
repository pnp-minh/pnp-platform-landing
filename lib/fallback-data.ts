import type { BrandIntelligence } from './web-scraper'

/**
 * Papers & Pens brand intelligence fallback data
 * Used when website scraping fails or returns incomplete data
 */
export const PAPERS_PENS_FALLBACK = {
  website: 'https://papers-pens.com',
  brandSummary:
    'Papers & Pens is a product marketing agency helping B2B/SaaS brands grow through expert positioning, messaging, and go-to-market strategies.',
  insights: [
    'B2B agencies see 3x better client retention with structured brief processes',
    'Most successful projects start with thorough discovery and brand alignment',
    'Clients value speed and quality equally in agency partnerships',
    'Product marketing specialists command premium rates in the B2B space',
    'Clear positioning reduces sales cycles by 40% for SaaS brands',
  ],
  brandVoice: 'Direct, confident, and expertise-driven. Uses clear language without jargon, focuses on practical outcomes, and speaks to ambitious agency owners who value efficiency.',
  brandIntelligence: {
    logo: 'https://cdn.sanity.io/images/n0d9khdx/production/03c5d6e90a1b3ca130471e0e0f2003cfeff012ef-1200x628.png',
    colors: [
      '#00A57C', // Primary green
      '#007B5E', // Secondary green
      '#1D1D1D', // Dark text
      '#F4F4F4', // Light gray
      '#C4C4C4', // Medium gray
    ],
  } as BrandIntelligence,
}

/**
 * Get fallback data for a given website
 * Currently only returns Papers & Pens data, but can be extended
 */
export function getFallbackData(website: string) {
  // Normalize URL for comparison
  const normalizedUrl = website.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')

  // Papers & Pens variations
  if (
    normalizedUrl.includes('papers-pens.com') ||
    normalizedUrl.includes('paperspens.com') ||
    normalizedUrl === '' ||
    !website
  ) {
    return PAPERS_PENS_FALLBACK
  }

  // Default fallback for unknown websites
  return {
    website: website || 'https://papers-pens.com',
    brandSummary:
      'A creative agency focused on delivering high-quality work for ambitious brands.',
    insights: [
      'Agencies with clear processes see better client satisfaction',
      'Quality briefs lead to better project outcomes',
      'Strong brand positioning attracts ideal clients',
    ],
    brandVoice: 'Professional, clear, and outcome-focused. Uses straightforward language and emphasizes practical value.',
    brandIntelligence: {
      logo: PAPERS_PENS_FALLBACK.brandIntelligence.logo,
      colors: PAPERS_PENS_FALLBACK.brandIntelligence.colors,
    },
  }
}
