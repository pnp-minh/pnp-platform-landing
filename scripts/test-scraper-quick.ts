/**
 * Quick Test Script for Brand Intelligence Scraper
 *
 * Tests with just 2 websites for faster iteration during development.
 *
 * Usage:
 *   npm run test:scraper:quick
 *   or
 *   npx tsx scripts/test-scraper-quick.ts
 */

import { scrapeWebsite } from '@/lib/web-scraper'

// Quick test with just 2 websites
const QUICK_TESTS = [
  {
    name: 'Papers & Pens',
    url: 'https://papers-pens.com',
  },
  {
    name: 'Stripe',
    url: 'https://stripe.com',
  }
]

async function testWebsite(name: string, url: string) {
  console.log(`\n🧪 Testing: ${name}`)
  console.log(`   URL: ${url}`)
  console.log('   Scraping...')

  const startTime = Date.now()

  try {
    const result = await scrapeWebsite(url)
    const duration = Date.now() - startTime

    if (!result) {
      console.log(`   ❌ Failed: Scraper returned null`)
      return
    }

    console.log(`   ✅ Success! (${duration}ms)`)
    console.log('\n   📊 RESULTS:')
    console.log(`   ─────────────────────────────────────────`)

    // Basic info
    console.log(`   📄 Title: ${result.title}`)
    console.log(`   📝 Description: ${result.description.slice(0, 100)}${result.description.length > 100 ? '...' : ''}`)
    console.log(`   🌐 Language: ${result.language}`)

    // Brand Intelligence
    console.log(`\n   🎨 BRAND INTELLIGENCE:`)
    console.log(`   ─────────────────────────────────────────`)

    // Logo
    if (result.brandIntelligence?.logo) {
      console.log(`   🖼️  Logo: ✅ Found`)
      console.log(`      ${result.brandIntelligence.logo}`)
    } else {
      console.log(`   🖼️  Logo: ❌ Not found`)
    }

    // Colors
    const colors = result.brandIntelligence?.colors || []
    if (colors.length > 0) {
      console.log(`   🎨 Colors: ✅ ${colors.length} found`)
      colors.forEach((color, i) => {
        console.log(`      ${i + 1}. ${color}`)
      })
    } else {
      console.log(`   🎨 Colors: ❌ None found`)
    }


    // Content stats
    console.log(`\n   📈 CONTENT STATS:`)
    console.log(`   ─────────────────────────────────────────`)
    console.log(`   Headings: ${result.headings.length}`)
    console.log(`   Paragraphs: ${result.paragraphs.length}`)

  } catch (error) {
    const duration = Date.now() - startTime
    console.log(`   ❌ Failed after ${duration}ms`)
    console.log(`   Error: ${error instanceof Error ? error.message : String(error)}`)
  }
}

async function runQuickTests() {
  console.log('🚀 Quick Brand Intelligence Scraper Test')
  console.log('═'.repeat(60))

  for (const test of QUICK_TESTS) {
    await testWebsite(test.name, test.url)

    // Small delay between tests
    if (QUICK_TESTS.indexOf(test) < QUICK_TESTS.length - 1) {
      console.log('\n   ⏳ Waiting 2s before next test...')
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }

  console.log('\n' + '═'.repeat(60))
  console.log('✅ Quick tests complete!')
  console.log('═'.repeat(60))
}

// Run quick tests
runQuickTests().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
