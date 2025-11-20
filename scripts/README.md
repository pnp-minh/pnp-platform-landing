# Test Scripts

This directory contains test scripts for validating the brand intelligence scraper.

## Available Scripts

### Quick Test (2 websites)
Fast iteration testing with just Papers & Pens and Stripe:

```bash
npm run test:scraper:quick
```

**Use this during development** to quickly validate your changes.

### Full Test Suite (5 websites)
Comprehensive testing with multiple website types:

```bash
npm run test:scraper
```

Tests against:
- Papers & Pens (our fallback)
- Stripe (B2B SaaS)
- Airbnb (Consumer brand)
- Vercel (Developer tools)
- Linear (Product company)

**Use this before committing** to ensure everything works across different website structures.

## What Gets Tested

Each test validates:

✅ **Logo Extraction**
- Finds brand logo from meta tags, img tags with logo-related attributes
- Reports confidence score and URL

✅ **Color Extraction**
- Extracts 5 most-used brand colors
- Validates hex color format
- Filters out common UI colors (whites, blacks, grays)

✅ **Typography Detection**
- Identifies heading and body fonts
- Extracts Google Fonts URL if available
- Reports font family names

✅ **Basic Content**
- Page title
- Meta description
- Headings and paragraphs count

## Test Output

The scripts provide detailed output including:

- ⏱️ Duration for each website
- 📊 Summary statistics
- 🖼️ Logo extraction report
- 🎨 Color extraction report
- 🔤 Typography extraction report
- ⚠️ Warnings for partial results
- ❌ Errors for failures

## Adding New Tests

To add a new website to test:

1. **Quick test:** Edit `scripts/test-scraper-quick.ts`
2. **Full suite:** Edit `scripts/test-scraper.ts`

Add to the `TEST_WEBSITES` array:

```typescript
{
  name: 'Your Website Name',
  url: 'https://example.com',
  expectedResults: {
    shouldHaveLogo: true,
    shouldHaveColors: true,
    shouldHaveFonts: true,
    minColors: 3,
  }
}
```

## Prerequisites

Make sure you have installed dependencies:

```bash
npm install
```

The test scripts require:
- `tsx` - TypeScript execution (automatically installed as dev dependency)
- `cheerio` - HTML parsing (already in dependencies)

## Troubleshooting

**"Module not found" errors:**
```bash
npm install
```

**Timeout errors:**
- Some websites may be slow or block scrapers
- Tests have a 10-second timeout per request
- This is expected behavior - the scraper should handle gracefully

**CORS errors:**
- Server-side scraping shouldn't hit CORS issues
- If you see these, check your network/firewall settings

## Next Steps

After running tests:

1. Review the output for any ❌ errors or ⚠️ warnings
2. Check if brand intelligence extraction meets expectations
3. Adjust scraper logic in `/lib/web-scraper.ts` if needed
4. Re-run tests to validate improvements
