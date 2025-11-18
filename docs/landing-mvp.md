# PNP Landing Page MVP

One-page landing page + demo to validate our first feature: AI-powered brief gathering for agencies.

## Quick Start

```bash

# 1. Initialize Next.js

npx create-next-app@latest . --typescript --tailwind --app --no-src-dir



# 2. Install dependencies

npm install ai @ai-sdk/openai @supabase/supabase-js posthog-js zod cheerio



# 3. Copy environment variables

cp .env.example .env.local

# Then fill in your API keys



# 4. Run development server

npm run dev

# Open http://localhost:3001

```

## Documentation

- **[CONTEXT.md](./CONTEXT.md)** - All strategic decisions, user personas, and positioning angles

- **[BOOTSTRAP.md](./BOOTSTRAP.md)** - Step-by-step setup guide and checklist

- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Detailed code examples and API specs

## Project Structure

```

landing-mvp/

├── app/

│   ├── page.tsx              # Landing page (A/B variants)

│   ├── demo/page.tsx         # Demo experience

│   └── api/                  # API routes

│       ├── demo/

│       │   ├── generate-context/route.ts  # AI insight generation

│       │   └── chat/route.ts              # Chat API

│       └── waitlist/route.ts # Waitlist signup

├── components/

│   ├── demo/                 # Demo UI components

│   └── landing/              # Landing page components

└── lib/

    ├── clients/              # Supabase client

    ├── api/                  # Web crawl utilities

    └── demo/                 # Demo logic & A/B testing

```

## A/B Test Variants

### Version A: Revenue Growth Engine

- **Angle**: Handle 3x more clients without hiring

- **Focus**: Time savings, ROI, capacity

- **Demo**: Speed emphasis, timer, efficiency metrics

### Version B: Knowledge Retention Insurance

- **Angle**: Stop losing knowledge when people quit

- **Focus**: Institutional memory, brand intelligence

- **Demo**: Context showcase, insights usage, citations

## Tech Stack

- **Framework**: Next.js 15 + TypeScript

- **AI**: Vercel AI SDK + OpenAI

- **Database**: Supabase

- **Analytics**: PostHog (A/B testing + session replay)

- **Styling**: Tailwind CSS

## Timeline

- **Day 1**: Landing page + context generation API

- **Day 2**: Demo chat + context panel

- **Day 3**: Polish, A/B test, deploy

## Environment Variables

```env

# OpenAI

OPENAI_API_KEY=sk-...



# Supabase (same as pnp-platform)

SUPABASE_URL=https://...

SUPABASE_SERVICE_ROLE_KEY=...



# PostHog

NEXT_PUBLIC_POSTHOG_KEY=phc_...

NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com



# Base URL

NEXT_PUBLIC_BASE_URL=http://localhost:3001

```

## Deployment

Deploy to Vercel:

```bash

# From landing-mvp directory

vercel



# Or push to GitHub and connect in Vercel dashboard

```

**Important**: Set root directory to `landing-mvp` in Vercel build settings.

## Success Metrics

Track in PostHog:

- Landing page views (by variant)

- Demo starts

- Demo completions

- Waitlist signups

- Session replays

Target conversion:

- Landing → Demo: >40%

- Demo → Complete: >50%

- Complete → Waitlist: >30%

## Support

Questions? Review the documentation files:

1. Start with CONTEXT.md for strategic background

2. Follow BOOTSTRAP.md for setup steps

3. Reference IMPLEMENTATION.md for code examples
