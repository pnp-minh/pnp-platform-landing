import { PostHog } from "posthog-node";

export function PostHogClient() {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!apiKey) {
    throw new Error(
      "PostHog API key not found. Please set NEXT_PUBLIC_POSTHOG_KEY in .env.local"
    );
  }

  const posthogClient = new PostHog(apiKey, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });

  return posthogClient;
}
