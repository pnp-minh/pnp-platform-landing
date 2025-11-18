# PostHog Setup Guide

## ✅ Installation Complete

All PostHog files have been set up! Here's what was created:

### 📁 File Structure

```
pnp-platform-landing/
├── .env.local                    # Your credentials go here (not committed)
├── .env.local.example           # Template for environment variables
├── app/
│   ├── layout.tsx               # ✅ Updated with PostHog provider
│   └── providers.tsx            # PostHog client-side provider
├── lib/
│   ├── posthog.ts              # Server-side PostHog client
│   ├── getBootstrapData.ts     # Bootstrap data utility for SSR
│   └── getVariant.ts           # Helper to get A/B test variant
└── components/
    └── PostHogPageView.tsx      # Automatic pageview tracking
```

---

## 🔑 Next Steps: Add Your Credentials

### 1. Get Your PostHog API Key

1. Go to: https://app.posthog.com/settings/project
2. Copy your **Project API Key**

### 2. Add to `.env.local`

Open `.env.local` and add your key:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Create Feature Flag in PostHog Dashboard

1. Go to: https://app.posthog.com/feature_flags
2. Click **"New feature flag"**
3. Configure:
   - **Key**: `landing-version`
   - **Name**: Landing Page A/B Test
   - **Type**: Select "Multivariate flag"
   - **Variants**:
     - `a` - 50%
     - `b` - 50%
   - **Release conditions**: 100% of users
4. Click **Save**

---

## 🧪 How to Use in Your Code

### Server-Side (Recommended - No Flash)

```typescript
// app/page.tsx
import { getVariant } from '@/lib/getVariant'

export default async function LandingPage() {
  const variant = await getVariant() // Returns 'a' or 'b'

  return (
    <div>
      {variant === 'a' ? (
        <h1>Handle 3x More Clients Without Hiring</h1>
      ) : (
        <h1>When Your Senior AM Quits, Will You Lose 3 Years of Knowledge?</h1>
      )}
    </div>
  )
}
```

### Client-Side (Alternative)

```typescript
'use client'
import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export default function Component() {
  const posthog = usePostHog()
  const [variant, setVariant] = useState<'a' | 'b'>('a')

  useEffect(() => {
    const flag = posthog.getFeatureFlag('landing-version')
    setVariant(flag === 'b' ? 'b' : 'a')
  }, [posthog])

  return <div>Variant: {variant}</div>
}
```

### Track Events

```typescript
'use client'
import { usePostHog } from 'posthog-js/react'

export default function CTAButton() {
  const posthog = usePostHog()

  const handleClick = () => {
    posthog.capture('cta_clicked', {
      variant: 'a', // or get from state
      location: 'hero'
    })
  }

  return <button onClick={handleClick}>Get Started</button>
}
```

---

## 🎯 Events to Track (from context.md)

```typescript
// Landing page view
posthog.capture('landing_page_view', { variant: 'a' })

// Demo started
posthog.capture('demo_started', {
  variant: 'a',
  company_provided: true,
  website_provided: true
})

// Demo message sent
posthog.capture('demo_message_sent', {
  message_number: 1
})

// Demo completed
posthog.capture('demo_completed', {
  variant: 'a',
  time_spent: 180
})

// Waitlist submitted
posthog.capture('waitlist_submitted', {
  variant: 'a',
  company_size: '10-50',
  pain_points: ['turnover', 'knowledge-loss']
})
```

---

## ✅ Testing the Setup

### 1. Start the dev server:

```bash
npm run dev
```

### 2. Check for errors in console

If you see PostHog warnings, make sure you've added your API key to `.env.local`

### 3. Verify in PostHog Dashboard

Go to https://app.posthog.com/events and you should see:
- `$pageview` events being tracked
- Your distinct user ID
- Feature flag evaluations

---

## 🔍 Troubleshooting

**"PostHog API key not found" warning**
→ Add your key to `.env.local` and restart the dev server

**Feature flag always returns 'a'**
→ Make sure you created the feature flag in PostHog dashboard with key `landing-version`

**No events showing in PostHog**
→ Check that your API key is correct and you're viewing the right project

---

## 📚 Ready for Next Steps

Once credentials are added, you can start building:
1. Landing page with A/B variants
2. Demo routes (`/demo/a` and `/demo/b`)
3. Waitlist form with event tracking
4. Custom surveys (optional)

The foundation is ready! 🚀
