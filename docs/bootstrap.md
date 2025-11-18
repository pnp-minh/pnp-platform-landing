# Landing Page MVP - Bootstrap Guide

This guide will help you set up and build the landing page MVP from scratch.

---

## Quick Start (First 30 Minutes)

### Step 1: Initialize Next.js App

```bash

# You're currently in /pnp-platform/landing-mvp

# Initialize Next.js here

npx create-next-app@latest . --typescript --tailwind --app --no-src-dir



# When prompted:

# ✅ TypeScript: Yes

# ✅ ESLint: Yes

# ✅ Tailwind CSS: Yes

# ✅ `app/` directory: Yes

# ✅ Customize import alias: Yes (@/*)

# ❌ src/ directory: No

```

### Step 2: Install Dependencies

```bash

npm install ai @ai-sdk/openai @supabase/supabase-js posthog-js zod cheerio

```

**Package explanation:**

- `ai` + `@ai-sdk/openai`: Vercel AI SDK for chat functionality

- `@supabase/supabase-js`: Database connection (waitlist, analytics)

- `posthog-js`: A/B testing + analytics + session replay

- `zod`: Type-safe validation

- `cheerio`: HTML parsing (for web scraping)

### Step 3: Environment Variables

Create `.env.local`:

```bash

# OpenAI (for AI chat + insight generation)

OPENAI_API_KEY=sk-...



# Supabase (copy from ../pnp-platform .env.local)

SUPABASE_URL=https://your-project.supabase.co

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key



# PostHog (create free account at posthog.com)

NEXT_PUBLIC_POSTHOG_KEY=phc_...

NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com



# Base URL

NEXT_PUBLIC_BASE_URL=http://localhost:3001

```

**⚠️ Important:** Run this app on a different port than pnp-platform!

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev -p 3001",

    "build": "next build",

    "start": "next start -p 3001"
  }
}
```

---

## Project Structure

```

landing-mvp/

├── app/

│   ├── page.tsx                    # Landing page (Version A or B)

│   ├── demo/

│   │   ├── page.tsx                # Demo experience

│   │   └── loading.tsx             # Loading state during context generation

│   ├── api/

│   │   ├── demo/

│   │   │   ├── generate-context/route.ts  # Web crawl + AI insight generation

│   │   │   └── chat/route.ts              # AI chat handler

│   │   └── waitlist/route.ts       # Waitlist form submission

│   └── layout.tsx                  # Root layout with PostHog

│

├── components/

│   ├── landing/

│   │   ├── hero-section.tsx        # Hero with input form

│   │   ├── roi-calculator.tsx      # Version A: ROI calculator

│   │   └── timeline.tsx            # Version B: Knowledge loss timeline

│   ├── demo/

│   │   ├── demo-chat.tsx           # Main chat interface

│   │   ├── context-panel.tsx       # Right sidebar (insights/knowledge)

│   │   ├── message.tsx             # Single message component

│   │   ├── typing-indicator.tsx    # Loading animation

│   │   └── brief-preview.tsx       # Brief sections preview

│   ├── waitlist-form.tsx           # Waitlist signup form

│   └── ui/                         # Shadcn components (Button, Input, etc)

│

├── lib/

│   ├── clients/

│   │   └── supabase.ts             # Supabase client (copy from pnp-platform)

│   ├── ai/

│   │   ├── prompts.ts              # System prompts for chat

│   │   └── insight-generator.ts    # AI insight generation logic

│   ├── api/

│   │   └── web-crawl.ts            # Web scraping (copy from pnp-platform)

│   ├── demo/

│   │   ├── demo-config.ts          # Demo flow configuration

│   │   └── ab-test.ts              # A/B test variant logic

│   └── types.ts                    # TypeScript types

│

├── public/                          # Static assets

├── CONTEXT.md                       # This file - all strategic decisions

├── BOOTSTRAP.md                     # This file - setup guide

├── IMPLEMENTATION.md                # Technical implementation guide

└── README.md                        # Project readme

```

---

## A/B Test Variants

### How Variant Selection Works

User lands on `/` → Variant assigned (cookie + PostHog) → Render appropriate version

**URL patterns:**

- `/?variant=a` - Force Version A (Revenue Growth)

- `/?variant=b` - Force Version B (Knowledge Retention)

- `/` - Random assignment (50/50)

### Version A: Revenue Growth Engine

**Landing Page Elements:**

1. Hero headline: "Handle 3x More Clients Without Hiring"

2. ROI calculator (inline, above the fold)

3. Input form: Name + Company + Website

4. [Start Demo] CTA

**Demo Focus:**

- Live timer showing speed

- Real-time brief section filling

- Time savings counter at end

- Revenue impact calculation

### Version B: Knowledge Retention Insurance

**Landing Page Elements:**

1. Hero headline: "When Your Senior AM Quits Next Month, Will You Lose 3 Years of Knowledge?"

2. Timeline visualization (knowledge loss)

3. Input form: Name + Company + Website

4. [See How JAY Captures Knowledge] CTA

**Demo Focus:**

- Scenario framing (new hire replacing departed senior)

- Knowledge base reveal (47 insights)

- Context-aware recommendations with citations [1][2]

- Before/After comparison

---

## Files to Copy from pnp-platform

### 1. Supabase Client

**Copy from:** `../lib/clients/supabase.ts`

**To:** `lib/clients/supabase.ts`

**Modifications needed:**

```typescript
// No modifications needed - works as-is

// Just ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in .env.local
```

### 2. Web Crawl Logic

**Copy from:** `../lib/api/web-crawl.ts` (or wherever it exists)

**To:** `lib/api/web-crawl.ts`

**Look for function like:**

```typescript
export async function extractContentFromUrl(url: string): Promise<string>;
```

**Modifications needed:**

```typescript
// May need to simplify if it has complex dependencies

// Just need basic: fetch URL → extract text content → return string
```

### 3. TypeScript Types (Optional)

**Copy from:** `../lib/types.ts` or `../types/*.ts`

**To:** `lib/types.ts`

**Only copy types you need:**

```typescript
type Insight = {
  id: string;

  title: string;

  content: string;

  category: string;

  source: string;
};

type DemoContext = {
  companyName: string;

  website?: string;

  brandContext: string;

  insights: Insight[];

  knowledge: Array<{ title: string; content: string }>;
};
```

---

## Step-by-Step Implementation Checklist

### Phase 1: Foundation (Day 1 - 8 hours)

- [ ] **Initialize project** (30 min)

  - [ ] Run create-next-app

  - [ ] Install dependencies

  - [ ] Set up .env.local

  - [ ] Test: `npm run dev` works on port 3001

- [ ] **Copy core utilities** (1 hour)

  - [ ] Copy `lib/clients/supabase.ts`

  - [ ] Copy `lib/api/web-crawl.ts`

  - [ ] Create `lib/types.ts` with base types

  - [ ] Test: Supabase connection works

- [ ] **Set up PostHog** (30 min)

  - [ ] Create PostHog account

  - [ ] Add PostHog provider to `app/layout.tsx`

  - [ ] Test: Events appear in PostHog dashboard

- [ ] **Build landing page Version A** (3 hours)

  - [ ] Create `app/page.tsx` with hero section

  - [ ] Build ROI calculator component

  - [ ] Build input form (name, company, website)

  - [ ] Add [Start Demo] CTA

  - [ ] Test: Form submission → redirect to `/demo`

- [ ] **Build API: Generate Context** (2 hours)

  - [ ] Create `app/api/demo/generate-context/route.ts`

  - [ ] Implement web crawl logic

  - [ ] Implement AI insight generation (see IMPLEMENTATION.md)

  - [ ] Test: Returns insights + brand context

- [ ] **Build demo loading page** (1 hour)

  - [ ] Create `app/demo/loading.tsx`

  - [ ] Show progress: "Analyzing website..." → "Generating insights..."

  - [ ] Test: Transition from form → loading → demo

### Phase 2: Demo Experience (Day 2 - 9 hours)

- [ ] **Set up Vercel AI SDK** (1 hour)

  - [ ] Create system prompt builder

  - [ ] Create `app/api/demo/chat/route.ts`

  - [ ] Test: Basic chat works with context

- [ ] **Build chat UI** (2 hours)

  - [ ] Create `components/demo/demo-chat.tsx`

  - [ ] Implement message list

  - [ ] Implement input form

  - [ ] Add typing indicator

  - [ ] Test: Can send/receive messages

- [ ] **Build context panel** (2 hours)

  - [ ] Create `components/demo/context-panel.tsx`

  - [ ] Display company context

  - [ ] Display insights (numbered [1][2][3])

  - [ ] Display knowledge base

  - [ ] Test: Context renders correctly

- [ ] **Implement citations [1][2]** (1 hour)

  - [ ] Create `components/demo/message.tsx`

  - [ ] Parse citation markers

  - [ ] Make them clickable (popover/tooltip)

  - [ ] Test: Clicking [1] shows insight detail

- [ ] **Add animations** (2 hours)

  - [ ] Typing indicator animation

  - [ ] Message fade-in

  - [ ] Brief section filling animation (if Version A)

  - [ ] Test: Smooth, professional feel

- [ ] **Build demo flow logic** (1 hour)

  - [ ] Version A: Timer + time savings counter

  - [ ] Version B: Scenario setup + knowledge reveal

  - [ ] Test: Full demo flow works

### Phase 3: Polish & Ship (Day 3 - 8 hours)

- [ ] **Build Version B landing page** (2 hours)

  - [ ] Timeline component (knowledge loss visualization)

  - [ ] Different hero copy

  - [ ] Same input form

  - [ ] Test: Version B renders correctly

- [ ] **Implement A/B routing** (1 hour)

  - [ ] Create `lib/demo/ab-test.ts`

  - [ ] Cookie-based persistence

  - [ ] URL parameter override (?variant=a)

  - [ ] PostHog experiment tracking

  - [ ] Test: Variants assign correctly

- [ ] **Build waitlist form** (2 hours)

  - [ ] Create `components/waitlist-form.tsx`

  - [ ] Create `app/api/waitlist/route.ts`

  - [ ] Save to Supabase

  - [ ] PostHog event tracking

  - [ ] Test: Submission works

- [ ] **Add PostHog events** (1 hour)

  - [ ] Track: landing_view, demo_started, demo_completed, waitlist_submitted

  - [ ] Set up funnels in PostHog

  - [ ] Test: Events fire correctly

- [ ] **Error handling** (1 hour)

  - [ ] Handle: No website provided → use fallback

  - [ ] Handle: Crawl fails → show error message

  - [ ] Handle: API errors → graceful degradation

  - [ ] Test: Error states work

- [ ] **Deploy to Vercel** (1 hour)

  - [ ] Create new Vercel project

  - [ ] Add environment variables

  - [ ] Deploy

  - [ ] Test: Production works end-to-end

---

## Testing Checklist

### Before Launch:

**Version A Flow:**

- [ ] Land on page → see ROI calculator

- [ ] Enter company info → start demo

- [ ] See loading state (crawling website)

- [ ] Demo loads with personalized context

- [ ] Chat conversation flows naturally

- [ ] Timer shows time saved

- [ ] Waitlist form appears at end

- [ ] Submission successful → thank you page

**Version B Flow:**

- [ ] Land on page → see knowledge loss timeline

- [ ] Enter company info → start demo

- [ ] See loading state

- [ ] Demo loads with scenario setup

- [ ] Knowledge panel shows insights

- [ ] Citations [1][2] are clickable

- [ ] Before/After comparison appears

- [ ] Waitlist form → submission

**A/B Testing:**

- [ ] `/?variant=a` shows Version A

- [ ] `/?variant=b` shows Version B

- [ ] `/` assigns random variant

- [ ] Variant persists on page refresh (cookie)

- [ ] PostHog records variant in events

**Edge Cases:**

- [ ] No website provided → fallback works

- [ ] Invalid website URL → error message

- [ ] Website crawl fails → fallback content

- [ ] Slow API response → loading state

---

## Key Implementation Notes

### 1. Keep It Simple

**Do:**

- ✅ Use pre-scripted conversation flow (predictable)

- ✅ Mock brief content extraction (fast, reliable)

- ✅ Generate insights once via AI (personalized)

- ✅ Focus on 1-2 wow moments per variant

**Don't:**

- ❌ Try to replicate full JAY complexity

- ❌ Build real-time @-mention autocomplete

- ❌ Generate PDF (just show preview)

- ❌ Handle file uploads

### 2. Personalization Strategy

**What's Real:**

- Company name (user input)

- Website crawl (real)

- Brand insights (AI-generated from crawl)

- Brand context summary (AI-generated)

**What's Mocked:**

- Conversation flow (pre-scripted)

- Brief content (predetermined)

- Chat responses (use AI but guide with strong prompts)

**Illusion of Depth:**

- Use company name throughout conversation

- Reference insights with citations [1][2]

- Show "47 insights" but only display 6-8

- Timer shows real elapsed time

### 3. Performance Targets

- Landing page load: <1 second

- Context generation: <15 seconds

- Chat response time: <2 seconds

- Demo completion time: 2-3 minutes

- Waitlist submission: <500ms

### 4. Mobile Considerations

**For MVP, optimize for desktop:**

- Agency owners typically evaluate tools on desktop

- Complex demo UI works better on larger screens

- Can add mobile warning: "Best viewed on desktop"

**If mobile is critical:**

- Stack chat + context panel vertically

- Simplify animations

- Test on iPhone/Android

---

## Environment-Specific Configuration

### Development (localhost:3001)

```env

NEXT_PUBLIC_BASE_URL=http://localhost:3001

```

### Production (Vercel)

```env

NEXT_PUBLIC_BASE_URL=https://your-landing-page.vercel.app

```

---

## Deployment Guide

### Vercel Deployment

1. **Create new project in Vercel:**

   - Import from GitHub (landing-mvp folder)

   - Or use Vercel CLI: `vercel` from landing-mvp directory

2. **Set environment variables:**

   ```

   OPENAI_API_KEY=...

   SUPABASE_URL=...

   SUPABASE_SERVICE_ROLE_KEY=...

   NEXT_PUBLIC_POSTHOG_KEY=...

   NEXT_PUBLIC_POSTHOG_HOST=...

   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app

   ```

3. **Build settings:**

   - Framework: Next.js

   - Root Directory: `landing-mvp`

   - Build Command: `npm run build`

   - Output Directory: `.next`

4. **Deploy:**

   - Push to main branch → auto-deploy

   - Or manual: `vercel --prod`

### Custom Domain (Optional)

- Add custom domain in Vercel dashboard

- Update NEXT_PUBLIC_BASE_URL

- Redeploy

---

## Success Criteria

### Week 1 Goals:

- [ ] 100+ landing page visitors

- [ ] 50+ demo starts

- [ ] 25+ demo completions

- [ ] 10+ waitlist signups

### What to Monitor:

**PostHog Funnels:**

1. Landing view → Demo start (target: >40%)

2. Demo start → Demo complete (target: >50%)

3. Demo complete → Waitlist signup (target: >30%)

**Session Replays:**

- Where do users get confused?

- What do they click on?

- When do they drop off?

**Surveys (after demo):**

- "What impressed you most?"

- "What would you use this for?"

- "What's missing?"

---

## Troubleshooting

### Common Issues:

**"Module not found" errors:**

- Check tsconfig.json has `"@/*": ["./"]` in paths

- Run `npm install` again

**Supabase connection fails:**

- Verify .env.local has correct keys (no NEXT_PUBLIC prefix for service role!)

- Check keys are from same Supabase project as pnp-platform

**PostHog events not appearing:**

- Check NEXT_PUBLIC_POSTHOG_KEY is correct

- Verify PostHog provider is in layout.tsx

- Check browser console for errors

**Web crawl fails:**

- Some sites block scraping (Cloudflare, etc)

- Fallback to generic insights for those cases

- Test with variety of websites

**AI responses are slow:**

- Use gpt-4o-mini for insight generation (faster + cheaper)

- Cache generated insights (don't regenerate on refresh)

- Show loading states

---

## Next Steps After Bootstrap

Once you have the basic structure running:

1. **Test the full flow locally**

2. **Refine the system prompts** (see IMPLEMENTATION.md)

3. **Polish the UI** (animations, spacing, colors)

4. **Deploy to Vercel**

5. **Share with 5-10 test users** before wider launch

---

**Ready to build?** Follow IMPLEMENTATION.md for detailed code examples and API specifications.
