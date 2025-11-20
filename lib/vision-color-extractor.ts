import OpenAI from 'openai'
import puppeteer from 'puppeteer'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Extract brand colors using GPT-4 Vision API
 * This is used as a FALLBACK when CSS extraction fails
 *
 * Cost: ~$0.024 per website (2.4 cents)
 */
export async function extractColorsWithVision(url: string): Promise<string[]> {
  try {
    // 1. Take screenshot of the website
    const screenshot = await takeScreenshot(url)

    if (!screenshot) {
      console.warn('Failed to take screenshot for Vision API')
      return []
    }

    // 2. Send to GPT-4 Vision for color analysis
    const colors = await analyzeColorsWithVision(screenshot, url)

    return colors
  } catch (error) {
    console.error('Error extracting colors with Vision API:', error)
    return []
  }
}

/**
 * Take a screenshot of the website using Puppeteer
 */
async function takeScreenshot(url: string): Promise<string | null> {
  let browser = null

  try {
    // Launch headless browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })

    const page = await browser.newPage()

    // Set viewport to desktop size
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    })

    // Navigate to the page with timeout
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 15000,
    })

    // Take screenshot as base64
    const screenshot = await page.screenshot({
      encoding: 'base64',
      type: 'png',
      fullPage: false, // Only visible viewport (faster)
    })

    return screenshot as string
  } catch (error) {
    console.error('Error taking screenshot:', error)
    return null
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

/**
 * Analyze screenshot with GPT-4 Vision to extract brand colors
 */
async function analyzeColorsWithVision(
  screenshot: string,
  url: string
): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Use gpt-4o (supports vision and is more cost-effective)
      messages: [
        {
          role: 'system',
          content: `You are a brand designer analyzing websites to extract primary brand colors.
Focus on the BRAND colors, not UI chrome (whites, blacks, light grays).
Return colors as hex codes in order of brand importance (primary → secondary → accent).
Return ONLY a JSON array of hex colors, no explanations.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this screenshot of ${url} and extract the 5 most important BRAND colors.

Rules:
1. Focus on brand-specific colors (buttons, headers, accents, links)
2. IGNORE common UI colors: pure white (#FFFFFF), pure black (#000000), light grays
3. Return colors in order of brand importance (most prominent first)
4. Return exactly 5 colors if possible, fewer if the site uses fewer brand colors
5. Return ONLY a JSON array of uppercase hex codes

Example output: ["#635BFF", "#FF6B35", "#1A1A1A", "#FFB84D", "#004E89"]`,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${screenshot}`,
                detail: 'low', // Use 'low' for faster/cheaper analysis
              },
            },
          ],
        },
      ],
      max_tokens: 200,
      temperature: 0.3, // Lower temperature for more consistent results
    })

    const responseText = completion.choices[0]?.message?.content?.trim()

    if (!responseText) {
      console.warn('Empty response from Vision API')
      return []
    }

    // Clean up response (remove markdown code blocks if present)
    let cleanedResponse = responseText
    if (responseText.startsWith('```')) {
      // Remove ```json and ``` wrappers
      cleanedResponse = responseText
        .replace(/^```json?\s*/i, '')
        .replace(/```\s*$/, '')
        .trim()
    }

    // Parse JSON response
    const colors = JSON.parse(cleanedResponse)

    // Validate format
    if (!Array.isArray(colors)) {
      console.warn('Vision API returned non-array response')
      return []
    }

    // Validate hex format and return
    const validColors = colors.filter((color: any) => {
      return typeof color === 'string' && /^#[0-9A-F]{6}$/i.test(color)
    })

    return validColors.slice(0, 5) // Max 5 colors
  } catch (error) {
    console.error('Error analyzing colors with Vision API:', error)
    return []
  }
}
