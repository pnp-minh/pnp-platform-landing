import * as cheerio from 'cheerio'

export interface PageContent {
  title: string
  description: string
  headings: string[]
  paragraphs: string[]
  url: string
  language: string
}

/**
 * Simple web scraper - fetches exactly the URL provided
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
 * Scrape a single page
 */
async function scrapePage(url: string): Promise<PageContent | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; JAY-Bot/1.0)',
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

    return {
      title: title.trim(),
      description: description.trim(),
      headings: headings.slice(0, 15),
      paragraphs: paragraphs.slice(0, 15),
      url,
      language,
    }
  } catch (error) {
    console.error(`Error scraping page ${url}:`, error)
    return null
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
