# PNP Platform - Landing Page MVP

Landing page MVP for validating AI agent features for content brief gathering.

## Project Overview

Test one-pager landing page with A/B testing to validate market demand before full launch.

**What We're Validating:**
- First feature: AI Agents as consultants for content brief gathering
- Target audience: Agency Owners (Vietnam market)
- A/B Test: Revenue Growth vs. Knowledge Retention messaging

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Analytics**: PostHog (A/B testing + event tracking)
- **Database**: Supabase
- **Deployment**: Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and add your credentials:

```bash
cp .env.local.example .env.local
```

Required variables:
- `NEXT_PUBLIC_POSTHOG_KEY` - Your PostHog API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host (default: https://app.posthog.com)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Project Structure

```
pnp-platform-landing/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with PostHog provider
│   ├── page.tsx           # Landing page (A/B tested)
│   └── providers.tsx      # PostHog client provider
├── components/            # Reusable components
│   └── PostHogPageView.tsx
├── lib/                   # Utilities
│   ├── posthog.ts        # Server-side PostHog client
│   ├── getBootstrapData.ts  # Bootstrap data for SSR
│   └── getVariant.ts     # Get A/B test variant
└── docs/                  # Documentation
    ├── context.md        # Project context & decisions
    └── posthog-setup.md  # PostHog setup guide
```

## A/B Testing

Two variants being tested:

- **Version A**: Revenue Growth Engine - "Handle 3x More Clients Without Hiring"
- **Version B**: Knowledge Retention Insurance - "Stop Losing Knowledge When People Quit"

Feature flag key: `landing-version`

## Documentation

- [Project Context & Decisions](./docs/context.md)
- [PostHog Setup Guide](./docs/posthog-setup.md)

## Timeline

3-day MVP implementation

---

Built with [Next.js](https://nextjs.org) and [PostHog](https://posthog.com)
