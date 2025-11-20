/**
 * Test Script for Brand Intelligence Scraper
 *
 * This script tests the web scraper with various websites to ensure
 * accurate extraction of brand intelligence (logo, colors, fonts, summary).
 *
 * Usage:
 *   npx tsx scripts/test-scraper.ts
 */

import { scrapeWebsite } from '@/lib/web-scraper'

// Test cases with different website types
const TEST_WEBSITES = [
  {
    name: 'Papers & Pens (Our Fallback)',
    url: 'https://papers-pens.com',
    expectedResults: {
      shouldHaveLogo: true,
      shouldHaveColors: true,
      shouldHaveFonts: true,
      minColors: 3,
    }
  },
  {
    name: 'Stripe (B2B SaaS)',
    url: 'https://stripe.com',
    expectedResults: {
      shouldHaveLogo: true,
      shouldHaveColors: true,
      shouldHaveFonts: true,
      minColors: 2,
    }
  },
  {
    name: 'Airbnb (Consumer Brand)',
    url: 'https://airbnb.com',
    expectedResults: {
      shouldHaveLogo: true,
      shouldHaveColors: true,
      shouldHaveFonts: true,
      minColors: 2,
    }
  },
  {
    name: 'Vercel (Developer Tools)',
    url: 'https://vercel.com',
    expectedResults: {
      shouldHaveLogo: true,
      shouldHaveColors: true,
      shouldHaveFonts: true,
      minColors: 2,
    }
  },
  {
    name: 'Linear (Product Company)',
    url: 'https://linear.app',
    expectedResults: {
      shouldHaveLogo: true,
      shouldHaveColors: true,
      shouldHaveFonts: true,
      minColors: 2,
    }
  }
]

interface TestResult {
  website: string
  success: boolean
  duration: number
  data: {
    logo: string | null
    colors: string[]
    title: string
    description: string
  }
  errors: string[]
  warnings: string[]
}

async function runTest(testCase: typeof TEST_WEBSITES[0]): Promise<TestResult> {
  console.log(`\n🧪 Testing: ${testCase.name}`)
  console.log(`   URL: ${testCase.url}`)

  const startTime = Date.now()
  const errors: string[] = []
  const warnings: string[] = []

  try {
    // Run the scraper
    const result = await scrapeWebsite(testCase.url)
    const duration = Date.now() - startTime

    if (!result) {
      errors.push('Scraper returned null')
      return {
        website: testCase.name,
        success: false,
        duration,
        data: {
          logo: null,
          colors: [],
          title: '',
          description: ''
        },
        errors,
        warnings
      }
    }

    // Validate results against expectations
    const { expectedResults } = testCase

    // Check logo
    if (expectedResults.shouldHaveLogo && !result.brandIntelligence?.logo) {
      warnings.push('Expected to find logo, but none found')
    }

    // Check colors
    const colorCount = result.brandIntelligence?.colors?.length || 0
    if (expectedResults.shouldHaveColors && colorCount === 0) {
      errors.push('Expected to find colors, but none found')
    } else if (colorCount < expectedResults.minColors) {
      warnings.push(`Found only ${colorCount} colors, expected at least ${expectedResults.minColors}`)
    }


    // Check basic content
    if (!result.title || result.title.length === 0) {
      warnings.push('No page title found')
    }
    if (!result.description || result.description.length === 0) {
      warnings.push('No meta description found')
    }

    // Print results
    console.log(`   ⏱️  Duration: ${duration}ms`)
    console.log(`   📄 Title: ${result.title.slice(0, 60)}${result.title.length > 60 ? '...' : ''}`)
    console.log(`   🖼️  Logo: ${result.brandIntelligence?.logo || 'Not found'}`)
    console.log(`   🎨 Colors: ${result.brandIntelligence?.colors?.join(', ') || 'None'}`)

    if (warnings.length > 0) {
      console.log(`   ⚠️  Warnings:`)
      warnings.forEach(w => console.log(`      - ${w}`))
    }

    return {
      website: testCase.name,
      success: errors.length === 0,
      duration,
      data: {
        logo: result.brandIntelligence?.logo || null,
        colors: result.brandIntelligence?.colors || [],
        title: result.title,
        description: result.description
      },
      errors,
      warnings
    }

  } catch (error) {
    const duration = Date.now() - startTime
    errors.push(`Exception: ${error instanceof Error ? error.message : String(error)}`)
    console.log(`   ❌ Failed: ${errors[0]}`)

    return {
      website: testCase.name,
      success: false,
      duration,
      data: {
        logo: null,
        colors: [],
        title: '',
        description: ''
      },
      errors,
      warnings
    }
  }
}

async function runAllTests() {
  console.log('🚀 Starting Brand Intelligence Scraper Tests')
  console.log('=' .repeat(60))

  const results: TestResult[] = []

  // Run tests sequentially to avoid rate limiting
  for (const testCase of TEST_WEBSITES) {
    const result = await runTest(testCase)
    results.push(result)

    // Add delay between tests to be respectful
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 TEST SUMMARY')
  console.log('='.repeat(60))

  const totalTests = results.length
  const passedTests = results.filter(r => r.success).length
  const failedTests = totalTests - passedTests
  const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / totalTests

  console.log(`\nTotal Tests: ${totalTests}`)
  console.log(`✅ Passed: ${passedTests}`)
  console.log(`❌ Failed: ${failedTests}`)
  console.log(`⏱️  Average Duration: ${Math.round(avgDuration)}ms`)

  // Detailed results
  console.log('\n📋 DETAILED RESULTS:\n')

  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌'
    console.log(`${index + 1}. ${status} ${result.website}`)
    console.log(`   Duration: ${result.duration}ms`)
    console.log(`   Logo: ${result.data.logo ? '✓' : '✗'}`)
    console.log(`   Colors: ${result.data.colors.length} found`)

    if (result.errors.length > 0) {
      console.log(`   ❌ Errors:`)
      result.errors.forEach(e => console.log(`      - ${e}`))
    }

    if (result.warnings.length > 0) {
      console.log(`   ⚠️  Warnings:`)
      result.warnings.forEach(w => console.log(`      - ${w}`))
    }
    console.log('')
  })

  // Logo extraction report
  console.log('🖼️  LOGO EXTRACTION REPORT:')
  const logosFound = results.filter(r => r.data.logo).length
  console.log(`   Found: ${logosFound}/${totalTests} (${Math.round(logosFound/totalTests*100)}%)`)
  results.forEach(r => {
    if (r.data.logo) {
      console.log(`   ✓ ${r.website}: ${r.data.logo}`)
    } else {
      console.log(`   ✗ ${r.website}: No logo found`)
    }
  })

  // Color extraction report
  console.log('\n🎨 COLOR EXTRACTION REPORT:')
  results.forEach(r => {
    const colorCount = r.data.colors.length
    const status = colorCount >= 3 ? '✓' : colorCount > 0 ? '⚠' : '✗'
    console.log(`   ${status} ${r.website}: ${colorCount} colors`)
    if (colorCount > 0) {
      console.log(`      ${r.data.colors.join(', ')}`)
    }
  })


  // Final verdict
  console.log('\n' + '='.repeat(60))
  if (failedTests === 0) {
    console.log('🎉 ALL TESTS PASSED!')
  } else {
    console.log(`⚠️  ${failedTests} test(s) failed. Please review and fix.`)
  }
  console.log('='.repeat(60))

  // Exit with appropriate code
  process.exit(failedTests > 0 ? 1 : 0)
}

// Run tests
runAllTests().catch(error => {
  console.error('Fatal error running tests:', error)
  process.exit(1)
})
