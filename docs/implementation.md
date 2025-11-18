# Landing Page MVP - Technical Implementation Guide

Detailed code examples and implementation patterns for building the landing page MVP.

---

## Table of Contents

1. [Core Setup](#core-setup)

2. [API Routes](#api-routes)

3. [Components](#components)

4. [AI System Prompts](#ai-system-prompts)

5. [A/B Testing Logic](#ab-testing-logic)

6. [PostHog Integration](#posthog-integration)

---

## Core Setup

### 1. TypeScript Types

Create `lib/types.ts`:

```typescript
// Core types for the demo experience

export type Insight = {
  id: string;

  title: string;

  content: string;

  category:
    | "Company Information"
    | "Content Strategy"
    | "Market Intelligence"
    | "People Information";

  source: string;

  tags?: string[];
};

export type Knowledge = {
  id: string;

  title: string;

  content: string;

  source: string;
};

export type DemoContext = {
  companyName: string;

  website?: string;

  brandContext: string;

  insights: Insight[];

  knowledge: Knowledge[];

  variant: "a" | "b";
};

export type DemoVariant = "a" | "b";

export type WaitlistSubmission = {
  email: string;

  name: string;

  company: string;

  companySize?: string;

  currentPain?: string;

  variant: DemoVariant;

  completedDemo: boolean;
};
```

### 2. Supabase Client

Copy from `../lib/clients/supabase.ts` (no changes needed):

```typescript
// lib/clients/supabase.ts

import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL) {
  throw new Error("Missing SUPABASE_URL environment variable");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
}

export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,

  process.env.SUPABASE_SERVICE_ROLE_KEY!,

  {
    auth: {
      autoRefreshToken: false,

      persistSession: false,
    },
  }
);
```

### 3. Web Crawl Utility

Simplified version - copy and adapt from pnp-platform:

```typescript
// lib/api/web-crawl.ts

import * as cheerio from "cheerio";

export async function extractContentFromUrl(url: string): Promise<string> {
  try {
    // Ensure URL has protocol

    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

    // Fetch the page

    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PNP-Bot/1.0)",
      },

      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // Parse with cheerio

    const $ = cheerio.load(html);

    // Remove script and style elements

    $("script, style, nav, footer, iframe").remove();

    // Extract text content

    const title = $("title").text() || "";

    const description = $('meta[name="description"]').attr("content") || "";

    const bodyText = $("body").text();

    // Clean up whitespace

    const cleanText = bodyText

      .replace(/\s+/g, " ")

      .replace(/\n+/g, "\n")

      .trim();

    // Combine and limit length

    const fullContent = `${title}\n\n${description}\n\n${cleanText}`;

    // Return first 5000 chars (enough for AI context)

    return fullContent.slice(0, 5000);
  } catch (error) {
    console.error("Web crawl failed:", error);

    throw new Error("Failed to extract content from URL");
  }
}
```

---

## API Routes

### 1. Generate Context API

`app/api/demo/generate-context/route.ts`:

```typescript
import { extractContentFromUrl } from "@/lib/api/web-crawl";

import { openai } from "@ai-sdk/openai";

import { generateText } from "ai";

import { z } from "zod";

const requestSchema = z.object({
  companyName: z.string().min(1),

  website: z.string().optional(),

  userName: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { companyName, website } = requestSchema.parse(body);

    let brandContext = "";

    let crawledContent = "";

    // If website provided, crawl it

    if (website) {
      try {
        crawledContent = await extractContentFromUrl(website);
      } catch (error) {
        console.error("Crawl failed, using fallback:", error);

        // Continue with fallback even if crawl fails
      }
    }

    // Generate brand context

    if (crawledContent) {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),

        prompt: `Create a brief company summary (3-4 sentences) based on this website content:

 

Company: ${companyName}

Website Content:

${crawledContent}

 

Include: Industry, target audience, key offerings, brand tone.

Write as if you're an account manager briefing a colleague about this client.

Be specific and concrete, not generic.`,

        temperature: 0.7,
      });

      brandContext = text;
    } else {
      // Fallback: Generic context based on company name

      brandContext =
        `${companyName} is a company in the ${guessIndustry(
          companyName
        )} industry. ` +
        `They focus on delivering value to their customers through quality products and services.`;
    }

    // Generate insights

    const insights = await generateInsights(companyName, crawledContent);

    // Generate knowledge base (simpler, derived from insights)

    const knowledge = insights.slice(0, 3).map((insight, i) => ({
      id: `knowledge-${i}`,

      title: `Knowledge: ${insight.title}`,

      content: insight.content,

      source: insight.source,
    }));

    return Response.json({
      brandContext,

      insights,

      knowledge,

      crawledAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Generate context error:", error);

    return Response.json(
      { error: "Failed to generate context" },

      { status: 500 }
    );
  }
}

async function generateInsights(
  companyName: string,

  crawledContent: string
): Promise<Insight[]> {
  const prompt = crawledContent
    ? `Based on this website content, generate 6-8 brand insights for creating marketing briefs.

 

Company: ${companyName}

Website Content:

${crawledContent}

 

Return a JSON array with this exact structure:

[

  {

    "title": "Short insight title (3-6 words)",

    "content": "Detailed insight (1-2 sentences, specific to this company)",

    "category": "Company Information" | "Content Strategy" | "Market Intelligence",

    "source": "Homepage"

  }

]

 

Make insights SPECIFIC to this company, not generic advice.

Focus on: brand positioning, target audience, value propositions, content preferences.`
    : `Generate 6 generic but relevant brand insights for a company in the ${guessIndustry(
        companyName
      )} industry.

 

Company: ${companyName}

 

Use the same JSON structure as above.`;

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),

      prompt,

      temperature: 0.8,
    });

    // Parse JSON response

    const parsed = JSON.parse(text);

    // Add IDs

    return parsed.map((insight: any, i: number) => ({
      id: `insight-${i}`,

      ...insight,

      tags: [],
    }));
  } catch (error) {
    console.error("Insight generation failed:", error);

    // Fallback to template insights

    return getFallbackInsights(companyName);
  }
}

function guessIndustry(companyName: string): string {
  const name = companyName.toLowerCase();

  if (name.match(/tech|software|app|digital|ai|saas/)) return "technology";

  if (name.match(/agency|creative|studio|design|media/))
    return "creative-agency";

  if (name.match(/marketing|advertis|brand/)) return "marketing";

  if (name.match(/consult/)) return "consulting";

  return "business-services";
}

function getFallbackInsights(companyName: string): Insight[] {
  const industry = guessIndustry(companyName);

  const templates: Record<string, Insight[]> = {
    technology: [
      {
        id: "fb-1",

        title: "Innovation-focused positioning",

        content:
          "Technology companies typically emphasize innovation and cutting-edge solutions in their messaging.",

        category: "Content Strategy",

        source: "Industry best practices",
      },

      {
        id: "fb-2",

        title: "Data-driven decision makers",

        content:
          "Target audience often includes technical stakeholders who value metrics, benchmarks, and ROI.",

        category: "Market Intelligence",

        source: "Industry best practices",
      },

      // Add 4 more...
    ],

    "creative-agency": [
      {
        id: "fb-1",

        title: "Portfolio-first approach",

        content:
          "Creative agencies lead with visual work and case studies to demonstrate capabilities.",

        category: "Content Strategy",

        source: "Industry best practices",
      },

      // Add more...
    ],

    // Add more industries...
  };

  return templates[industry] || templates["technology"];
}
```

### 2. Chat API

`app/api/demo/chat/route.ts`:

```typescript
import { openai } from "@ai-sdk/openai";

import { streamText } from "ai";

import type { DemoContext } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    // Build system prompt with context

    const systemPrompt = buildSystemPrompt(context);

    const result = await streamText({
      model: openai("gpt-4o"),

      system: systemPrompt,

      messages,

      temperature: 0.7,

      maxTokens: 300, // Keep responses concise
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json(
      { error: "Chat failed" },

      { status: 500 }
    );
  }
}

function buildSystemPrompt(context: DemoContext): string {
  const { companyName, brandContext, insights, variant } = context;

  // Format insights with citations

  const insightList = insights

    .map((insight, i) => `[${i + 1}] ${insight.title}: ${insight.content}`)

    .join("\n");

  const basePrompt = `You are JAY, an AI brief consultant helping create a Video Production Brief for ${companyName}.

 

# COMPANY CONTEXT

${brandContext}

 

# BRAND INSIGHTS (reference using [1], [2], etc)

${insightList}

 

# YOUR ROLE

- Have a natural conversation to gather brief requirements

- Ask ONE clarifying question at a time

- Use brand insights to provide strategic recommendations

- When referencing insights, use citation format: "Based on [1]..."

- Keep responses concise (2-3 sentences maximum)

- Be conversational and friendly, not robotic

- Provide strategic input when asked for advice

 

# BRIEF STRUCTURE

You're gathering information for these sections:

1. Objective (what's the goal of this video?)

2. Target Audience (who will watch it?)

3. Key Message (what should viewers remember?)

4. Tone & Style (how should it feel?)

5. Success Metrics (how to measure success?)

 

# CONVERSATION FLOW

- Start by asking about the video's main objective

- After each answer, ask a follow-up or move to next section

- Offer strategic recommendations based on insights

- Keep the conversation moving (aim for 5-7 exchanges total)

`;

  // Variant-specific additions

  if (variant === "a") {
    // Version A: Emphasize speed and efficiency

    return (
      basePrompt +
      `\n# ADDITIONAL CONTEXT

This is a demo focused on speed and efficiency. Keep responses brief and move through sections quickly.`
    );
  } else {
    // Version B: Emphasize knowledge usage

    return (
      basePrompt +
      `\n# ADDITIONAL CONTEXT

This is a demo showcasing how institutional knowledge improves briefs. Actively reference insights [1][2][3] to show knowledge in action.`
    );
  }
}
```

### 3. Waitlist API

`app/api/waitlist/route.ts`:

```typescript
import { supabaseServer } from "@/lib/clients/supabase";

import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email(),

  name: z.string().min(1),

  company: z.string().min(1),

  companySize: z.string().optional(),

  currentPain: z.string().optional(),

  variant: z.enum(["a", "b"]),

  completedDemo: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = waitlistSchema.parse(body);

    // Save to Supabase

    const { error } = await supabaseServer

      .from("landing_waitlist")

      .insert({
        email: data.email,

        name: data.name,

        company: data.company,

        company_size: data.companySize,

        current_pain: data.currentPain,

        variant: data.variant,

        completed_demo: data.completedDemo,

        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Supabase error:", error);

      return Response.json(
        { error: "Failed to save to waitlist" },

        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Waitlist API error:", error);

    return Response.json(
      { error: "Invalid request" },

      { status: 400 }
    );
  }
}
```

**Create Supabase table:**

```sql

-- Run this in Supabase SQL editor

CREATE TABLE landing_waitlist (

  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  email TEXT NOT NULL,

  name TEXT NOT NULL,

  company TEXT NOT NULL,

  company_size TEXT,

  current_pain TEXT,

  variant TEXT NOT NULL CHECK (variant IN ('a', 'b')),

  completed_demo BOOLEAN DEFAULT false,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

);



CREATE INDEX idx_landing_waitlist_variant ON landing_waitlist(variant);

CREATE INDEX idx_landing_waitlist_created_at ON landing_waitlist(created_at);

```

---

## Components

### 1. Demo Chat Component

`components/demo/demo-chat.tsx`:

```typescript
"use client";

import { useChat } from "ai/react";

import { useState, useEffect, useRef } from "react";

import type { DemoContext } from "@/lib/types";

import { MessageList } from "./message-list";

import { ContextPanel } from "./context-panel";

import { TypingIndicator } from "./typing-indicator";

type DemoChatProps = {
  context: DemoContext;

  onComplete?: () => void;
};

export function DemoChat({ context, onComplete }: DemoChatProps) {
  const [startTime] = useState(Date.now());

  const [elapsedTime, setElapsedTime] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/demo/chat",

      body: { context },

      initialMessages: [
        {
          id: "welcome",

          role: "assistant",

          content: `Hi! I'm JAY, your AI brief consultant. I see you're with ${context.companyName}. Let's create a video brief together. What's the main objective of this video?`,
        },
      ],
    });

  // Timer

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Auto-scroll to bottom

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Detect completion (simple: after 5+ exchanges)

  useEffect(() => {
    if (messages.length >= 10 && onComplete) {
      setTimeout(onComplete, 2000);
    }
  }, [messages.length, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left: Chat */}

      <div className="flex-1 flex flex-col border rounded-lg bg-white shadow-sm">
        {/* Header */}

        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">
              Video Brief - {context.companyName}
            </h2>

            <p className="text-sm text-gray-500">Chat with JAY</p>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">Time</div>

            <div className="font-mono font-semibold">
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-6">
          <MessageList messages={messages} insights={context.insights} />

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}

        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your response..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Right: Context Panel */}

      <div className="w-[400px]">
        <ContextPanel context={context} />
      </div>
    </div>
  );
}
```

### 2. Context Panel

`components/demo/context-panel.tsx`:

```typescript
"use client";

import { useState } from "react";

import type { DemoContext } from "@/lib/types";

export function ContextPanel({ context }: { context: DemoContext }) {
  const [activeTab, setActiveTab] = useState<"insights" | "knowledge">(
    "insights"
  );

  return (
    <div className="border rounded-lg bg-white shadow-sm h-full flex flex-col">
      {/* Header */}

      <div className="border-b px-6 py-4">
        <h3 className="font-semibold text-lg">Brand Context</h3>
      </div>

      {/* Company Summary */}

      <div className="px-6 py-4 border-b">
        <div className="text-sm text-gray-500 mb-2">Company</div>

        <div className="text-sm leading-relaxed">{context.brandContext}</div>
      </div>

      {/* Tabs */}

      <div className="border-b px-6 py-3 flex gap-2">
        <button
          onClick={() => setActiveTab("insights")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "insights"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          💡 Insights ({context.insights.length})
        </button>

        <button
          onClick={() => setActiveTab("knowledge")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "knowledge"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          📚 Knowledge ({context.knowledge.length})
        </button>
      </div>

      {/* Content */}

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "insights" ? (
          <div className="space-y-3">
            {context.insights.map((insight, i) => (
              <div
                key={insight.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-medium flex items-center justify-center">
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-1">
                      {insight.title}
                    </div>

                    <div className="text-xs text-gray-600 leading-relaxed">
                      {insight.content}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-block px-2 py-0.5 bg-white border border-gray-200 rounded text-xs">
                        {insight.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {context.knowledge.map((k) => (
              <div
                key={k.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="font-medium text-sm mb-1">{k.title}</div>

                <div className="text-xs text-gray-600">{k.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 3. Message with Citations

`components/demo/message.tsx`:

```typescript
"use client";

import type { Insight } from "@/lib/types";

type MessageContentProps = {
  content: string;

  insights: Insight[];
};

export function MessageContent({ content, insights }: MessageContentProps) {
  // Parse [1], [2] etc and make them interactive

  const parts = content.split(/(\[\d+\])/g);

  return (
    <div className="prose prose-sm max-w-none">
      {parts.map((part, i) => {
        const match = part.match(/\[(\d+)\]/);

        if (match) {
          const index = parseInt(match[1]) - 1;

          const insight = insights[index];

          if (!insight) return <span key={i}>{part}</span>;

          return (
            <button
              key={i}
              className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors relative group"
              onClick={() => {
                // Could open a modal/popover here

                alert(`${insight.title}\n\n${insight.content}`);
              }}
            >
              [{index + 1}]{/* Tooltip on hover */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap max-w-xs z-10">
                {insight.title}
              </span>
            </button>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}
```

---

## AI System Prompts

### Version A: Revenue Growth Prompt

Focus: Speed, efficiency, getting to the point quickly.

```typescript
const systemPromptVersionA = `You are JAY, an AI brief consultant for ${companyName}.

 

# OBJECTIVE

Complete a Video Production Brief efficiently (target: 5-7 exchanges).

 

# COMPANY CONTEXT

${brandContext}

 

# BRAND INSIGHTS

${insightList}

 

# CONVERSATION STYLE

- Direct and efficient (this demo showcases SPEED)

- Ask ONE question at a time

- Keep responses to 2-3 sentences

- Move quickly through sections

- Don't over-explain

 

# BRIEF SECTIONS TO COVER

1. Objective

2. Target Audience

3. Key Message

4. Tone & Style

 

# STRATEGIC GUIDANCE

- When user asks for advice, give quick, actionable recommendations

- Reference insights occasionally (don't overdo it)

- Focus on helping them move forward

 

Start by asking about the video's main objective.`;
```

### Version B: Knowledge Retention Prompt

Focus: Showcasing how institutional knowledge improves recommendations.

```typescript
const systemPromptVersionB = `You are JAY, an AI brief consultant for ${companyName}.

 

This is a scenario: A new account manager is creating their first brief for this client.

Thanks to institutional knowledge, you can guide them with context from past projects.

 

# COMPANY CONTEXT (from 12 past projects)

${brandContext}

 

# BRAND INSIGHTS (reference with [1][2][3])

${insightList}

 

# CONVERSATION STYLE

- Consultative and knowledgeable

- ACTIVELY reference insights [1][2][3] to show knowledge in action

- Provide strategic recommendations based on past learnings

- 2-4 sentences per response

- Show you "know" this client

 

# BRIEF SECTIONS TO COVER

1. Objective

2. Target Audience

3. Key Message

4. Tone & Style

 

# STRATEGIC GUIDANCE

- When user describes their idea, suggest improvements based on insights

- Use phrases like "Based on past projects [1]..." or "This client typically prefers [2]..."

- Show how knowledge makes recommendations better

 

Start by welcoming them and mentioning you have context from past work with this client.`;
```

---

## A/B Testing Logic

### Variant Assignment

`lib/demo/ab-test.ts`:

```typescript
import Cookies from "js-cookie";

export type Variant = "a" | "b";

const COOKIE_NAME = "landing_variant";

const COOKIE_MAX_AGE = 30; // days

export function getVariant(): Variant {
  // 1. Check URL parameter (for testing)

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);

    const urlVariant = params.get("variant");

    if (urlVariant === "a" || urlVariant === "b") {
      setVariant(urlVariant);

      return urlVariant;
    }
  }

  // 2. Check cookie

  const savedVariant = Cookies.get(COOKIE_NAME) as Variant | undefined;

  if (savedVariant === "a" || savedVariant === "b") {
    return savedVariant;
  }

  // 3. Random assignment (50/50)

  const variant: Variant = Math.random() < 0.5 ? "a" : "b";

  setVariant(variant);

  return variant;
}

export function setVariant(variant: Variant) {
  Cookies.set(COOKIE_NAME, variant, {
    expires: COOKIE_MAX_AGE,

    sameSite: "lax",
  });
}

export function getVariantConfig(variant: Variant) {
  return variant === "a"
    ? {
        heroHeadline: "Handle 3x More Clients Without Hiring",

        heroSubheadline:
          "Your current team can complete 120 briefs/month instead of 40. Here's the math.",

        ctaText: "See How It Works",

        showROICalculator: true,

        showTimeline: false,
      }
    : {
        heroHeadline:
          "When Your Senior AM Quits Next Month, Will You Lose 3 Years of Knowledge?",

        heroSubheadline:
          "Your agency has trained 12 people in 3 years. They all left. Their knowledge left with them.",

        ctaText: "See How JAY Captures Knowledge",

        showROICalculator: false,

        showTimeline: true,
      };
}
```

---

## PostHog Integration

### Setup Provider

`app/layout.tsx`:

```typescript
"use client";

import posthog from "posthog-js";

import { PostHogProvider } from "posthog-js/react";

import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    capture_pageviews: true,

    capture_pageleaves: true,
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider client={posthog}>{children}</PostHogProvider>
      </body>
    </html>
  );
}
```

### Track Events

```typescript
import { usePostHog } from "posthog-js/react";

function SomeComponent() {
  const posthog = usePostHog();

  // Track variant view

  useEffect(() => {
    posthog.capture("landing_page_view", {
      variant,
    });
  }, []);

  // Track demo started

  const handleStartDemo = () => {
    posthog.capture("demo_started", {
      variant,

      company_provided: !!companyName,

      website_provided: !!website,
    });
  };

  // Track waitlist signup

  const handleWaitlistSubmit = () => {
    posthog.capture("waitlist_submitted", {
      variant,

      completed_demo: true,
    });
  };
}
```

---

## Quick Reference: Copy This Code

### Minimal Working Chat (5 minutes)

If you want the fastest possible implementation:

```typescript
// app/api/demo/chat/route.ts

import { openai } from "@ai-sdk/openai";

import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages, context } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),

    system: `You are JAY, helping create a brief for ${context.companyName}.

 

    Context: ${context.brandContext}

 

    Ask one question at a time about their video project.`,

    messages,
  });

  return result.toDataStreamResponse();
}
```

```typescript
// components/demo-chat.tsx (minimal)

"use client";

import { useChat } from "ai/react";

export function DemoChat({ context }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/demo/chat",

    body: { context },
  });

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>{m.content}</div>
      ))}

      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

**This gives you working chat in 5 minutes. Then polish from there.**

---

**Next:** See BOOTSTRAP.md for step-by-step checklist and deployment guide.
