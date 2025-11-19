import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { scrapeWebsite } from '@/lib/web-scraper'
import type { PageContent } from '@/lib/web-scraper'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, website, teamSize } = body

    // Validate required fields
    if (!name || !company) {
      return NextResponse.json(
        { error: 'Name and company are required' },
        { status: 400 }
      )
    }

    let scrapedContent = null
    let insights: string[] = []

    // If website provided, try to scrape it
    if (website) {
      scrapedContent = await scrapeWebsite(website)

      if (scrapedContent) {
        // Generate AI-powered insights from scraped content
        insights = await generateAIInsights(scrapedContent, company)
      }
    }

    // Fallback: Generate generic insights if no website or scraping failed
    if (insights.length === 0) {
      insights = generateGenericInsights(company, teamSize)
    }

    // Return demo context
    return NextResponse.json({
      success: true,
      context: {
        name,
        company,
        teamSize,
        hasWebsite: !!scrapedContent,
        brandContext: scrapedContent
          ? `${scrapedContent.title} - ${scrapedContent.description}`
          : `${company} - Professional agency`,
        insights,
      },
    })
  } catch (error) {
    console.error('Error generating context:', error)
    return NextResponse.json(
      { error: 'Failed to generate context' },
      { status: 500 }
    )
  }
}

/**
 * Generate AI-powered insights from scraped content
 */
async function generateAIInsights(
  scrapedContent: PageContent,
  company: string
): Promise<string[]> {
  try {
    // If no OpenAI key, fallback to pattern-matching
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, using fallback insights')
      return generateInsightsFromContent(scrapedContent, company)
    }

    // Combine all content
    const pageText = [
      scrapedContent.title,
      scrapedContent.description,
      ...scrapedContent.headings,
      ...scrapedContent.paragraphs,
    ]
      .filter(Boolean)
      .join(' ')

    // Build prompt for AI
    const prompt = `CONTEXT: You are JAY, an AI assistant that helps agencies gather content briefs from their clients through conversation. You're analyzing a ${scrapedContent.language === 'vi' ? 'Vietnamese' : 'English'} agency's website to generate insights from "previous brief sessions" with similar agencies.

These insights will be shown during a demo to prove JAY understands the agency's industry context.

Company: ${company}
Language: ${scrapedContent.language}

Page Content:
${pageText.slice(0, 3000)}

Generate 5-6 brief, conversational insights that sound like notes from past brief gathering sessions with similar agencies—NOT research reports or analysis.

IMPORTANT: Make them sound conversational and natural:

1. DATA-DRIVEN (include realistic stats):
   - Example: "Similar clients see 2.3x better results with case studies that include video testimonials"
   - Example: "Most agencies in this space get 40% higher engagement posting Tuesday-Thursday mornings"

2. CLIENT VOICE (what clients actually said):
   - Example: "Clients often mention: 'We need quick turnaround, perfection can wait'"
   - Example: "Common request: 'Keep it simple—our audience hates jargon'"

3. PATTERN OBSERVATIONS:
   - Example: "B2B SaaS buyers typically compare 3-5 agencies before deciding"
   - Example: "Decision-makers in this industry are usually 35-50, value proven ROI over flashy design"

4. POSITIONING NOTES:
   - Example: "Specializing in product marketing sets this apart from generalist agencies"
   - Example: "Hands-on collaboration approach differentiates from template-based competitors"

Make insights:
- Conversational tone (like notes from a brief session)
- NO "Your/You" language (avoid "Your website", "Your clients")
- Short and punchy (10-20 words max)
- Industry-specific with realistic numbers
- Mix of data, client quotes, patterns, positioning

Return ONLY a JSON array of strings. No explanations.

Example format: ["Clients in this space prefer ROI-focused case studies over design portfolios", "Similar agencies see 45% higher conversions with clear pricing upfront", "Common feedback: 'We value expertise over flashy presentations'"]`

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are JAY, an AI brief gathering assistant for agencies. You generate conversational insights that sound like notes from real client brief sessions—not formal reports. Mix client quotes, data patterns, and industry observations. Keep it natural and concise (10-20 words). Always return ONLY valid JSON arrays with no additional text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 800,
    })

    const responseText = completion.choices[0]?.message?.content?.trim()

    if (!responseText) {
      throw new Error('Empty response from OpenAI')
    }

    // Parse JSON response
    const insights = JSON.parse(responseText)

    // Validate format
    if (!Array.isArray(insights) || insights.length === 0) {
      throw new Error('Invalid insights format')
    }

    return insights.slice(0, 6)
  } catch (error) {
    console.error('Error generating AI insights:', error)
    // Fallback to pattern-matching if AI fails
    return generateInsightsFromContent(scrapedContent, company)
  }
}

/**
 * Fallback: Generate insights from scraped content using pattern matching
 */
function generateInsightsFromContent(scrapedContent: PageContent, company: string): string[] {
  const insights: string[] = []
  const content = scrapedContent

  // Insight 1: Company positioning (from title/description)
  if (content.description) {
    insights.push(
      `${company} focuses on: ${content.description.slice(0, 100)}${content.description.length > 100 ? '...' : ''}`
    )
  }

  // Insight 2: Key services/offerings (from headings)
  if (content.headings.length > 0) {
    const services = content.headings.slice(0, 3).join(', ')
    insights.push(`Core services mentioned: ${services}`)
  }

  // Insight 3: Brand tone (simple analysis of language)
  const allText = [content.title, content.description, ...content.paragraphs.slice(0, 3)].join(' ')
  if (allText.toLowerCase().includes('professional') || allText.toLowerCase().includes('expert')) {
    insights.push('Brand voice: Professional and expertise-driven')
  } else if (
    allText.toLowerCase().includes('creative') ||
    allText.toLowerCase().includes('innovative')
  ) {
    insights.push('Brand voice: Creative and innovative')
  } else {
    insights.push('Brand voice: Clear and approachable')
  }

  // Insight 4: Target audience (if mentioned)
  if (allText.toLowerCase().includes('b2b') || allText.toLowerCase().includes('business')) {
    insights.push('Target audience: B2B businesses')
  } else if (allText.toLowerCase().includes('enterprise')) {
    insights.push('Target audience: Enterprise clients')
  }

  // Ensure we have at least 4-6 insights
  while (insights.length < 4) {
    insights.push(`${company} specializes in delivering high-quality agency services`)
  }

  return insights.slice(0, 6) // Max 6 insights
}

/**
 * Generate generic insights when no website is provided
 */
function generateGenericInsights(company: string, teamSize: number): string[] {
  const size = teamSize <= 3 ? 'boutique' : teamSize <= 10 ? 'growing' : 'established'

  return [
    `${company} is a ${size} agency focused on delivering quality work`,
    'Target clients: Businesses seeking professional content and creative services',
    'Brand voice: Professional and results-oriented',
    'Team structure: Collaborative and client-focused',
    'Service approach: Strategic and detail-oriented',
  ]
}
