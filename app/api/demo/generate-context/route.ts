import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { scrapeWebsite } from '@/lib/web-scraper'
import type { PageContent } from '@/lib/web-scraper'
import { getFallbackData } from '@/lib/fallback-data'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { website } = body

    // Use Papers & Pens as fallback if no website provided
    const websiteUrl = website || 'https://papers-pens.com'

    // Try to scrape the website
    const scrapedContent = await scrapeWebsite(websiteUrl)

    // If scraping failed, return fallback data
    if (!scrapedContent) {
      console.log('Scraping failed, using fallback data')
      const fallback = getFallbackData(websiteUrl)
      return NextResponse.json({
        success: true,
        context: fallback,
      })
    }

    // Generate AI-powered insights, brand summary, and brand voice
    const [insights, brandSummary, brandVoice] = await Promise.all([
      generateAIInsights(scrapedContent),
      generateBrandSummary(scrapedContent),
      generateBrandVoice(scrapedContent),
    ])

    // Use fallback data if AI generation fails
    if (!brandSummary || insights.length === 0 || !brandVoice) {
      console.log('AI generation incomplete, using fallback data')
      const fallback = getFallbackData(websiteUrl)
      return NextResponse.json({
        success: true,
        context: {
          ...fallback,
          // Keep scraped brand intelligence if available
          brandIntelligence: scrapedContent.brandIntelligence,
        },
      })
    }

    // Return complete context with brand intelligence
    return NextResponse.json({
      success: true,
      context: {
        website: websiteUrl,
        brandSummary,
        insights,
        brandVoice,
        brandIntelligence: scrapedContent.brandIntelligence,
      },
    })
  } catch (error) {
    console.error('Error generating context:', error)

    // Return fallback on any error
    const fallback = getFallbackData('')
    return NextResponse.json({
      success: true,
      context: fallback,
    })
  }
}

/**
 * Generate brand summary from scraped content
 */
async function generateBrandSummary(
  scrapedContent: PageContent
): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found')
      return ''
    }

    // Combine content for analysis
    const pageText = [
      scrapedContent.title,
      scrapedContent.description,
      ...scrapedContent.headings.slice(0, 10),
      ...scrapedContent.paragraphs.slice(0, 10),
    ]
      .filter(Boolean)
      .join(' ')

    const prompt = `Analyze this website and create a concise brand summary.

Website: ${scrapedContent.url}
Title: ${scrapedContent.title}
Description: ${scrapedContent.description}

Content:
${pageText.slice(0, 4000)}

Create a 1-2 sentence brand summary that captures:
1. What they do (products/services)
2. Who they serve (target audience)
3. Their unique positioning (what makes them different)

Examples:
- "Papers & Pens is a product marketing agency helping B2B/SaaS brands grow through expert positioning, messaging, and go-to-market strategies."
- "Stripe is a payment infrastructure platform for online businesses, offering developers powerful APIs to handle payments globally."
- "Notion is an all-in-one workspace combining notes, tasks, and databases, helping teams organize knowledge and collaborate seamlessly."

Return ONLY the summary. No explanations. Keep it natural and conversational.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a brand strategist creating concise, accurate brand summaries from website content. Focus on clarity and positioning.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 150,
    })

    return completion.choices[0]?.message?.content?.trim() || ''
  } catch (error) {
    console.error('Error generating brand summary:', error)
    return ''
  }
}

/**
 * Generate AI-powered insights from scraped content
 */
async function generateAIInsights(
  scrapedContent: PageContent
): Promise<string[]> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found')
      return []
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
    const prompt = `CONTEXT: You are Primer, an AI assistant that helps agencies gather content briefs from their clients through conversation. You're analyzing a ${scrapedContent.language === 'vi' ? 'Vietnamese' : 'English'} website to generate insights from "previous brief sessions" with similar brands.

These insights will be shown during a demo to prove Primer understands the brand's industry context.

Website: ${scrapedContent.url}
Language: ${scrapedContent.language}

Page Content:
${pageText.slice(0, 3000)}

Generate 5-6 brief, conversational insights that sound like notes from past brief gathering sessions with similar brands—NOT research reports or analysis.

IMPORTANT: Make them sound conversational and natural:

1. DATA-DRIVEN (include realistic stats):
   - Example: "Similar clients see 2.3x better results with case studies that include video testimonials"
   - Example: "Most brands in this space get 40% higher engagement posting Tuesday-Thursday mornings"

2. CLIENT VOICE (what clients actually said):
   - Example: "Clients often mention: 'We need quick turnaround, perfection can wait'"
   - Example: "Common request: 'Keep it simple—our audience hates jargon'"

3. PATTERN OBSERVATIONS:
   - Example: "B2B SaaS buyers typically compare 3-5 vendors before deciding"
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

Example format: ["Clients in this space prefer ROI-focused case studies over design portfolios", "Similar brands see 45% higher conversions with clear pricing upfront", "Common feedback: 'We value expertise over flashy presentations'"]`

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are Primer, an AI brief gathering assistant for agencies. You generate conversational insights that sound like notes from real client brief sessions—not formal reports. Mix client quotes, data patterns, and industry observations. Keep it natural and concise (10-20 words). Always return ONLY valid JSON arrays with no additional text.',
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
    return []
  }
}

/**
 * Generate brand voice analysis from scraped content
 */
async function generateBrandVoice(
  scrapedContent: PageContent
): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found')
      return ''
    }

    // Combine content for analysis
    const pageText = [
      scrapedContent.title,
      scrapedContent.description,
      ...scrapedContent.headings.slice(0, 8),
      ...scrapedContent.paragraphs.slice(0, 8),
    ]
      .filter(Boolean)
      .join(' ')

    const prompt = `Analyze this website's brand voice and communication style.

Website: ${scrapedContent.url}
Title: ${scrapedContent.title}
Description: ${scrapedContent.description}

Content Sample:
${pageText.slice(0, 3000)}

Analyze the brand voice by identifying:
1. Tone (e.g., professional, casual, friendly, authoritative, playful)
2. Language style (e.g., technical, simple, conversational, formal)
3. Key characteristics (e.g., direct, empathetic, bold, minimalist)

Return a single 1-2 sentence description that captures how this brand communicates.

Examples:
- "Direct, confident, and expertise-driven. Uses clear language without jargon, focuses on practical outcomes."
- "Friendly and approachable with a professional edge. Balances warmth with expertise, using conversational language."
- "Bold and minimalist. Emphasizes simplicity and clarity with short, punchy statements."

Return ONLY the brand voice description. No labels, no explanations.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a brand strategist analyzing communication style from website content. Focus on tone, language patterns, and messaging approach. Be concise and specific.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    return completion.choices[0]?.message?.content?.trim() || ''
  } catch (error) {
    console.error('Error generating brand voice:', error)
    return ''
  }
}
