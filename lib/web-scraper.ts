import * as cheerio from 'cheerio'

export interface BrandIntelligence {
  logo: string | null
  colors: string[]
}

export interface PageContent {
  title: string
  description: string
  headings: string[]
  paragraphs: string[]
  url: string
  language: string
  brandIntelligence: BrandIntelligence
}

/**
 * Enhanced web scraper with brand intelligence extraction
 */
export async function scrapeWebsite(url: string): Promise<PageContent | null> {
  try {
    const validUrl = new URL(url)
    const pageContent = await scrapePage(validUrl.toString())
    return pageContent
  } catch (error) {
    console.error('Error scraping website:', error)
    return null
  }
}

/**
 * Scrape a single page with brand intelligence
 */
async function scrapePage(url: string): Promise<PageContent | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Primer-Bot/1.0)',
        'Accept-Language': 'en,vi,*',
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`)
      return null
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Detect language from html lang attribute or content
    const language = detectLanguage($, html)

    // Extract basic info
    const title = $('title').text() || $('h1').first().text() || ''
    const description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      ''

    // Extract headings (h1, h2, h3)
    const headings: string[] = []
    $('h1, h2, h3').each((_, element) => {
      const text = $(element).text().trim()
      if (text && text.length < 200) {
        headings.push(text)
      }
    })

    // Extract paragraphs (first 15 for better context)
    const paragraphs: string[] = []
    $('p').each((index, element) => {
      if (index >= 15) return false
      const text = $(element).text().trim()
      if (text && text.length > 20 && text.length < 500) {
        paragraphs.push(text)
      }
    })

    // Extract brand intelligence
    const brandIntelligence = await extractBrandIntelligence($, html, url)

    return {
      title: title.trim(),
      description: description.trim(),
      headings: headings.slice(0, 15),
      paragraphs: paragraphs.slice(0, 15),
      url,
      language,
      brandIntelligence,
    }
  } catch (error) {
    console.error(`Error scraping page ${url}:`, error)
    return null
  }
}

/**
 * Extract brand intelligence (logo, colors, typography)
 */
async function extractBrandIntelligence(
  $: cheerio.CheerioAPI,
  html: string,
  url: string
): Promise<BrandIntelligence> {
  // Run all extractions in parallel for performance
  const [logo, colorsFromCSS] = await Promise.all([
    extractLogo($, url),
    extractColors($, html),
  ])

  // Use Vision API as fallback if we found fewer than 3 colors
  let colors = colorsFromCSS
  if (colors.length < 3) {
    console.log(`Only ${colors.length} colors found via CSS, trying Vision API fallback...`)
    try {
      // Dynamic import to avoid loading puppeteer if not needed
      const { extractColorsWithVision } = await import('./vision-color-extractor')
      const visionColors = await extractColorsWithVision(url)

      if (visionColors.length > 0) {
        console.log(`Vision API found ${visionColors.length} colors`)
        colors = visionColors
      }
    } catch (error) {
      console.warn('Vision API fallback failed:', error)
      // Continue with CSS colors even if Vision fails
    }
  }

  return {
    logo,
    colors,
  }
}

/**
 * Extract logo with smart multi-strategy approach
 */
async function extractLogo(
  $: cheerio.CheerioAPI,
  baseUrl: string
): Promise<string | null> {
  interface LogoCandidate {
    url: string
    confidence: number
    source: string
  }

  const candidates: LogoCandidate[] = []

  // Strategy 1: Check Open Graph image (high confidence for social sharing)
  const ogImage = $('meta[property="og:image"]').attr('content')
  if (ogImage) {
    candidates.push({
      url: resolveUrl(ogImage, baseUrl),
      confidence: 70,
      source: 'og:image',
    })
  }

  // Strategy 2: Check Twitter card image
  const twitterImage = $('meta[name="twitter:image"]').attr('content')
  if (twitterImage && twitterImage !== ogImage) {
    candidates.push({
      url: resolveUrl(twitterImage, baseUrl),
      confidence: 65,
      source: 'twitter:image',
    })
  }

  // Strategy 3: Find img tags with logo-related attributes
  $('img').each((_, element) => {
    const src = $(element).attr('src')
    if (!src) return

    const alt = $(element).attr('alt')?.toLowerCase() || ''
    const className = $(element).attr('class')?.toLowerCase() || ''
    const id = $(element).attr('id')?.toLowerCase() || ''

    let confidence = 0

    // High confidence indicators
    if (className.includes('logo') || id.includes('logo')) confidence += 50
    if (alt.includes('logo')) confidence += 40
    if (className.includes('brand') || id.includes('brand')) confidence += 35
    if (alt === 'logo' || alt === 'brand logo') confidence += 20

    // Medium confidence indicators (logo in common locations)
    if ($(element).parents('header').length > 0) confidence += 20
    if ($(element).parents('nav').length > 0) confidence += 15
    if ($(element).parents('[class*="header"]').length > 0) confidence += 15

    // Check if it's in a link to homepage (common pattern)
    const parentLink = $(element).parent('a')
    if (parentLink.length > 0) {
      const href = parentLink.attr('href')
      if (href === '/' || href === baseUrl || href === '#') {
        confidence += 15
      }
    }

    // Size heuristics (logos are typically 100-400px wide, 30-200px tall)
    const width = $(element).attr('width')
    const height = $(element).attr('height')
    if (width && height) {
      const w = parseInt(width)
      const h = parseInt(height)
      if (w >= 100 && w <= 400 && h >= 30 && h <= 200) {
        confidence += 10
      }
    }

    // Only consider candidates with reasonable confidence
    if (confidence >= 30) {
      candidates.push({
        url: resolveUrl(src, baseUrl),
        confidence,
        source: 'img-tag',
      })
    }
  })

  // Strategy 4: Check favicon as last resort
  const favicon =
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href') ||
    $('link[rel="apple-touch-icon"]').attr('href')

  if (favicon) {
    candidates.push({
      url: resolveUrl(favicon, baseUrl),
      confidence: 30,
      source: 'favicon',
    })
  }

  // Sort by confidence and return the best candidate
  if (candidates.length === 0) {
    return null
  }

  candidates.sort((a, b) => b.confidence - a.confidence)

  // Filter out invalid URLs and return the best one
  for (const candidate of candidates) {
    try {
      const logoUrl = new URL(candidate.url)
      // Basic validation - must be http/https
      if (logoUrl.protocol === 'http:' || logoUrl.protocol === 'https:') {
        return candidate.url
      }
    } catch {
      continue
    }
  }

  return null
}

/**
 * Extract brand colors using frequency analysis
 */
async function extractColors(
  $: cheerio.CheerioAPI,
  html: string
): Promise<string[]> {
  const colorMap = new Map<string, number>()

  // Strategy 1: Extract colors from inline styles
  $('[style]').each((_, element) => {
    const style = $(element).attr('style') || ''
    extractColorsFromCSS(style, colorMap)
  })

  // Strategy 2: Extract colors from style tags
  $('style').each((_, element) => {
    const css = $(element).html() || ''
    extractColorsFromCSS(css, colorMap)
  })

  // Strategy 3: Look for CSS custom properties (CSS variables) - HIGH PRIORITY
  // This catches Tailwind CSS custom properties and design tokens
  const cssVarMatch = html.match(/--[a-zA-Z0-9-]+:\s*(?:#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\))/g)
  if (cssVarMatch) {
    cssVarMatch.forEach((match) => {
      // Extract hex colors
      const hexMatch = match.match(/#[0-9a-fA-F]{3,8}/)
      if (hexMatch) {
        const color = normalizeColor(hexMatch[0])
        if (color && !isCommonUIColor(color)) {
          colorMap.set(color, (colorMap.get(color) || 0) + 10) // Boost CSS variables heavily
        }
      }

      // Extract rgb colors
      const rgbMatch = match.match(/rgb[a]?\([^)]+\)/)
      if (rgbMatch) {
        const hex = rgbToHex(rgbMatch[0])
        if (hex && !isCommonUIColor(hex)) {
          colorMap.set(hex, (colorMap.get(hex) || 0) + 10)
        }
      }
    })
  }

  // Strategy 4: Tailwind config detection in <script> tags
  // Look for Tailwind config objects with colors
  $('script').each((_, element) => {
    const scriptContent = $(element).html() || ''

    // Match Tailwind theme.extend.colors or theme.colors patterns
    const tailwindColorMatch = scriptContent.match(/(?:colors|theme).*?{[^}]*(?:#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\))[^}]*}/g)
    if (tailwindColorMatch) {
      tailwindColorMatch.forEach((match) => {
        extractColorsFromCSS(match, colorMap)
      })
    }
  })

  // Strategy 5: Look for theme/config JSON in script tags or data attributes
  $('[data-theme], [data-colors], [data-brand-colors]').each((_, element) => {
    const themeData = $(element).attr('data-theme') || $(element).attr('data-colors') || $(element).attr('data-brand-colors')
    if (themeData) {
      try {
        const parsed = JSON.parse(themeData)
        extractColorsFromObject(parsed, colorMap)
      } catch {
        // If not JSON, try extracting colors directly
        extractColorsFromCSS(themeData, colorMap)
      }
    }
  })

  // Strategy 6: Extract from all <style> tags including Next.js injected styles
  // Next.js often injects styles with data-n-* attributes
  $('style[data-n-href], style[data-styled], style[data-emotion]').each((_, element) => {
    const css = $(element).html() || ''
    extractColorsFromCSS(css, colorMap)
  })

  // Convert map to sorted array by frequency
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => color)

  // Return top 5 brand colors
  return sortedColors.slice(0, 5)
}

/**
 * Extract colors from CSS text
 */
function extractColorsFromCSS(css: string, colorMap: Map<string, number>): void {
  // Match hex colors (#RGB, #RRGGBB, #RRGGBBAA)
  const hexMatches = css.match(/#[0-9a-fA-F]{3,8}/g) || []

  hexMatches.forEach((hex) => {
    const normalized = normalizeColor(hex)
    if (normalized && !isCommonUIColor(normalized)) {
      colorMap.set(normalized, (colorMap.get(normalized) || 0) + 1)
    }
  })

  // Match rgb/rgba colors
  const rgbMatches =
    css.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/gi) || []

  rgbMatches.forEach((rgb) => {
    const hex = rgbToHex(rgb)
    if (hex && !isCommonUIColor(hex)) {
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1)
    }
  })
}

/**
 * Extract colors from JavaScript object (theme configs, etc.)
 */
function extractColorsFromObject(obj: any, colorMap: Map<string, number>): void {
  if (!obj || typeof obj !== 'object') return

  for (const value of Object.values(obj)) {
    if (typeof value === 'string') {
      // Check if it's a hex color
      if (value.startsWith('#')) {
        const normalized = normalizeColor(value)
        if (normalized && !isCommonUIColor(normalized)) {
          colorMap.set(normalized, (colorMap.get(normalized) || 0) + 8) // Boost config colors
        }
      }
      // Check if it's an rgb color
      else if (value.startsWith('rgb')) {
        const hex = rgbToHex(value)
        if (hex && !isCommonUIColor(hex)) {
          colorMap.set(hex, (colorMap.get(hex) || 0) + 8)
        }
      }
    } else if (typeof value === 'object') {
      // Recursively check nested objects
      extractColorsFromObject(value, colorMap)
    }
  }
}

/**
 * Normalize color to uppercase 6-digit hex
 */
function normalizeColor(color: string): string | null {
  if (!color.startsWith('#')) return null

  // Remove # prefix
  let hex = color.substring(1).toUpperCase()

  // Convert 3-digit to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // Only keep 6-digit hex (ignore alpha channel)
  if (hex.length >= 6) {
    hex = hex.substring(0, 6)
  }

  // Validate hex
  if (!/^[0-9A-F]{6}$/.test(hex)) {
    return null
  }

  return `#${hex}`
}

/**
 * Convert RGB to hex
 */
function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/\d+/g)
  if (!match || match.length < 3) return null

  const r = parseInt(match[0])
  const g = parseInt(match[1])
  const b = parseInt(match[2])

  if (r > 255 || g > 255 || b > 255) return null

  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase()

  return hex
}

/**
 * Filter out common UI colors (whites, blacks, grays) that aren't brand colors
 */
function isCommonUIColor(hex: string): boolean {
  // Remove # prefix for comparison
  const color = hex.replace('#', '')

  // Pure white
  if (color === 'FFFFFF' || color === 'FFF') return true

  // Pure black
  if (color === '000000' || color === '000') return true

  // Near-white (very light grays)
  if (/^[F-F][A-F\d]{5}$/.test(color)) return true

  // Near-black (very dark grays)
  if (/^[0-2][0-9A-F]{5}$/.test(color)) return true

  // Grays (all RGB values within 10 of each other)
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b))
  if (maxDiff <= 10) return true

  return false
}


/**
 * Resolve relative URL to absolute
 */
function resolveUrl(relativeUrl: string, baseUrl: string): string {
  try {
    return new URL(relativeUrl, baseUrl).toString()
  } catch {
    return relativeUrl
  }
}

/**
 * Detect page language from HTML
 */
function detectLanguage($: cheerio.CheerioAPI, html: string): string {
  // Check html lang attribute
  const htmlLang = $('html').attr('lang')
  if (htmlLang) {
    return htmlLang.split('-')[0].toLowerCase() // 'en-US' -> 'en'
  }

  // Check meta tags
  const metaLang = $('meta[http-equiv="content-language"]').attr('content')
  if (metaLang) {
    return metaLang.split('-')[0].toLowerCase()
  }

  // Simple heuristic: check for Vietnamese characters
  if (html.includes('ă') || html.includes('ơ') || html.includes('ư')) {
    return 'vi'
  }

  // Default to English
  return 'en'
}
