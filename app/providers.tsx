'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      console.warn('PostHog API key not found. Please set NEXT_PUBLIC_POSTHOG_KEY in .env.local')
      return
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: false, // We'll manually control this with PostHogPageView component
      capture_pageleave: true,
      autocapture: false, // Disable autocapture for cleaner event tracking
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
