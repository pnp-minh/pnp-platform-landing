# Landing Page MVP - Context & Decisions

This document captures all strategic decisions, user research, and approach from our brainstorming session.

---

## Project Overview

**Goal**: Launch a test one-pager landing page to validate our first feature before full market launch.

**What We're Validating:**

- First feature: AI Agents that act as consultant to gather customer requirements on content brief

- Combine AI + structure (brief template) + Brand Intelligence

- Target audience: Agency Owners (buyers)

- End users: Content Marketers, AMs, BDs, PRs (operators)

**What We Want to Learn:**

1. Does this need exist?

2. Will people sign up for early access?

3. What features do they care about most?

4. What do they want AFTER gathering the brief? (content engine? planning tool? just the agent?)

---

## User Personas

### Primary Persona: Agency Owner (Buyer)

**Quick Summary:**

Agency owner (5-50 employees) facing constant staff turnover and knowledge loss, desperately seeking scalable systems to maintain quality consistency and profitability without expensive hiring, while competing on professionalism and operational efficiency.

**Key Pain Points:**

1. **Knowledge Loss from Turnover**: "When senior people quit, 3 years of client knowledge walks out the door"

2. **Growth Ceiling**: "Can't take on more clients without sacrificing quality or hiring"

3. **Quality Inconsistency**: "Every brief looks different depending on who gathered it"

4. **Training Burden**: "New hires take 3-6 months to be productive"

5. **Time Waste**: "Senior people spend hours on brief admin instead of strategic work"

6. **Revenue Loss**: "Turning away clients because team is at capacity"

**Emotional Triggers:**

- **Fear**: Loss aversion (knowledge/revenue walking away)

- **Frustration**: Growth constraints despite demand

- **Vulnerability**: Dependency on specific people

- **Competitive anxiety**: Other agencies are more efficient

- **FOMO**: "Am I falling behind on AI tools?"

**Success Metrics:**

- Revenue per employee

- Time saved per brief

- Client retention despite team changes

- New hire productivity time

- Brief quality consistency

---

### Secondary Persona: Brief Gatherer (End User)

**Quick Summary:**

Overwhelmed account manager juggling 5+ clients, spending hours organizing call notes into briefs, terrified of looking unprofessional when they forget client details.

**Key Pain Points:**

1. **Blank Page Syndrome**: "Don't know what questions to ask for unfamiliar brief types"

2. **Manual Compilation**: "Spend 1-2 hours after calls organizing notes"

3. **Context Switching**: "Can't remember details across multiple clients"

4. **Imposter Syndrome**: "Worried I'll look inexperienced"

5. **Revision Cycles**: "Boss sends briefs back for being 'too thin'"

**Emotional Triggers:**

- **Overwhelm**: Too many clients, not enough time

- **Anxiety**: Fear of looking unprofessional

- **Relief**: "Something that makes my job easier"

- **Confidence**: "Sound like a senior strategist"

---

## Market Context: Vietnam Agencies

**Key Characteristics:**

- **High staff turnover**: 18-24 month average tenure in creative/marketing

- **Knowledge loss crisis**: When people leave, institutional knowledge disappears

- **Price pressure**: Clients are cost-sensitive

- **Professionalization gap**: Many run on informal processes (Google Docs, Slack)

- **Bilingual complexity**: Serve both local and international clients

- **Owner-operator model**: Owners are hands-on, not just strategic

**Buying Triggers:**

- Pragmatic ROI (must show immediate cost savings)

- Risk aversion (need proof before commitment)

- Competitive anxiety (FOMO if competitors have better tools)

- Status/modernization (want to be seen as professional)

- People problems (acute awareness of staff costs and turnover pain)

---

## Positioning Angles Analysis

We analyzed 10 different positioning angles and scored them on:

1. **Emotional Trigger** (Agency Owner)

2. **Urgency** ("Why buy NOW?")

3. **Measurability** (Can we quantify ROI?)

### Top 3 Winners:

#### 🥇 Angle #8: Revenue-Per-Employee Multiplier (9/9)

- **Headline**: "Handle 3x More Clients Without Hiring"

- **Trigger**: Fear of lost revenue + growth ceiling

- **Urgency**: "You're turning away revenue RIGHT NOW"

- **Measurable**: Direct ROI calculation, capacity numbers

- **Why**: Universal pain, immediate crisis, clear numbers

#### 🥈 Angle #3: Institutional Memory Builder (8/9)

- **Headline**: "When Your Senior AM Quits, Will You Lose 3 Years of Knowledge?"

- **Trigger**: Fear of catastrophic loss when people quit

- **Urgency**: "Your best person could quit tomorrow"

- **Measurable**: Knowledge retained, onboarding time reduction

- **Why**: Unique positioning, acute pain in Vietnam market

#### 🥉 Angle #2: Quality Consistency (6/9 standalone, 8/9 paired)

- **Headline**: "Every Team Member Creates Senior-Level Briefs"

- **Trigger**: Fear of reputation damage from inconsistent quality

- **Urgency**: Chronic pain, medium urgency

- **Measurable**: Revision rates, QC time saved

- **Why**: Real daily pain, but best as supporting angle

---

## A/B Test Strategy

### Version A: "Revenue Growth Engine"

**Primary Angles**: #8 (Revenue Multiplier) + #1 (Time Savings)

**Narrative**: "Do more with less. Make more money without hiring."

**Hero Message**:

```

Headline: "Handle 3x More Clients Without Hiring.

Your Current Team's Hidden Capacity."



Subheadline: "While your competitors burn cash on hiring,

you're unlocking 120+ hours per month of productive capacity.

Here's the math."

```

**Psychology**:

- Primary emotion: GREED (make more money) + Fear (losing revenue)

- Urgency: "Every month you wait = $500K lost"

- Proof: Hard numbers, ROI calculator

**Demo Focus**:

- Live timer showing speed

- ROI calculator as hero element

- Time savings counter at end

- Before/After capacity comparison

---

### Version B: "Knowledge Retention Insurance"

**Primary Angles**: #3 (Institutional Memory) + #5 (Onboarding)

**Narrative**: "Stop losing your most valuable asset when people quit."

**Hero Message**:

```

Headline: "When Your Senior AM Quits Next Month,

Will You Lose 3 Years of Client Knowledge?"



Subheadline: "Your agency has trained 12 people in 3 years.

They all left. Their knowledge left with them.

Stop the bleeding."

```

**Psychology**:

- Primary emotion: FEAR (loss aversion) + Vulnerability

- Urgency: "Your best person could quit tomorrow"

- Proof: Knowledge retention, new hire productivity

**Demo Focus**:

- Scenario framing (new hire replacing departed senior)

- Knowledge base reveal (47 insights instantly accessible)

- Context-aware recommendations with citations

- Before/After comparison (with JAY vs without)

---

## Demo Implementation Strategy

### Approach: Hybrid Personalization (Mocked + AI-Generated)

**Why This Approach:**

- ✅ Fast to build (3-day timeline achievable)

- ✅ Personalized feel (wow factor)

- ✅ Low risk (no complex edge cases)

- ✅ Cost-effective (one-time AI generation, then mocked conversation)

**Flow:**

```

Landing Page

  ↓

User inputs: Name + Company + Website (optional)

  ↓

[Start Demo] → Loading (10-15 seconds)

  ↓

Backend:

  1. Crawl homepage (existing code from pnp-platform)

  2. AI generates 6-8 brand insights from crawl

  3. AI generates company context summary

  ↓

Demo Page loads with:

  - Personalized company name throughout

  - AI-generated insights displayed

  - Chat pre-loaded with context

  - Scripted conversation flow

```

**What's Real vs Mocked:**

- ✅ REAL: Website crawl, AI insight generation, company context

- ✅ REAL: Chat UI, streaming responses, citations

- ⚠️ MOCKED: Conversation flow (scripted for predictability)

- ⚠️ MOCKED: Content extraction (animated but predetermined)

**Skipped for MVP** (to save time):

- ❌ @-mention autocomplete (complex, 4-6 hours, not critical)

- ❌ Real-time brief PDF generation (can show preview)

- ❌ Full tool calling system (use simple prompt engineering)

- ❌ File attachments (not needed for demo validation)

---

## Feature Showcase Priorities

### Version A (Revenue Growth):

| Feature | Priority | How to Show |

|---------|----------|-------------|

| Live content extraction | ✅ HIGH | Real-time section filling with animation |

| Time tracking | ✅ HIGH | Live timer, savings counter |

| Brief sections | ✅ HIGH | Visible checklist, progress bar |

| PDF output | ✅ MEDIUM | Download button at end |

| Brand intelligence | ⚠️ SUBTLE | Mentioned once, not emphasized |

| Citations [1][2] | ❌ SKIP | Not central to revenue story |

### Version B (Knowledge Retention):

| Feature | Priority | How to Show |

|---------|----------|-------------|

| Brand Intelligence | ✅ HIGH | Central panel, 47 insights |

| Insight discovery | ✅ HIGH | Auto-detection during chat |

| Citations [1][2] | ✅ HIGH | Clickable references in responses |

| Knowledge categories | ✅ HIGH | Organized by category |

| New hire scenario | ✅ HIGH | Framing device for demo |

| Context-aware AI | ✅ HIGH | JAY uses past insights for recommendations |

| Time savings | ⚠️ SUBTLE | Mentioned but not emphasized |

---

## Technical Decisions

### Tech Stack:

- **Framework**: Next.js 15 (separate app in monorepo)

- **AI SDK**: Vercel AI SDK (simpler than adapting existing JAY)

- **LLM**: OpenAI GPT-4o (chat), GPT-4o-mini (insight generation)

- **Database**: Supabase (reuse existing connection)

- **A/B Testing**: PostHog (session replay + surveys)

- **Waitlist Form**: Supabase custom form (or Tally.so)

- **Analytics**: PostHog funnels + events

### Architecture:

- **Monorepo**: landing-mvp folder inside pnp-platform

- **Separate Next.js app**: Own package.json, independent deployment

- **Shared utilities**: Copy web-crawl, Supabase client from pnp-platform

- **No workspace dependency**: Standalone, no auth required

### Why NOT fully integrated with pnp-platform:

- ❌ Workspace architecture adds complexity (sidebar, auth, roles)

- ❌ Tight coupling risks breaking production

- ❌ Harder to A/B test different narratives

- ❌ Demo needs different UX than production app

---

## Success Metrics

### Primary Validation Metrics:

1. **Waitlist signup rate**: % of demo completions → signups

2. **Demo completion rate**: % who start → finish demo

3. **Time in demo**: Average engagement time

4. **Feedback quality**: What features do they mention?

### A/B Test Hypothesis:

**Version A (Revenue)**: Agency owners will convert higher when shown direct revenue opportunity and efficiency gains

**Version B (Knowledge)**: Agency owners will convert higher when shown protection against knowledge loss and people dependency

**What We'll Learn**:

- Does market respond more to gain-framed (make money) or loss-framed (stop losing)?

- Is immediate tactical pain (revenue ceiling) or strategic vulnerability (knowledge loss) more urgent?

- Which features do users ask about in feedback?

### PostHog Event Tracking:

```

- landing_page_view (variant: a/b)

- demo_started (variant, company_provided, website_provided)

- demo_message_sent (message_number)

- demo_completed (variant, time_spent)

- insight_clicked (insight_index)

- waitlist_submitted (variant, company_size, pain_points)

- survey_completed (what_impressed_most, what_missing)

```

---

## Implementation Timeline (3 Days)

### Day 1: Foundation

- Create landing-mvp structure

- Build Version A landing page

- Input form (name, company, website)

- Copy web-crawl from pnp-platform

- Build `/api/demo/generate-context` endpoint

- Loading page during generation

### Day 2: Demo Experience

- Install Vercel AI SDK

- Build chat UI + context panel

- Implement `/api/demo/chat` with system prompts

- Citation system [1][2]

- Animations (typing, extraction)

- Test full flow

### Day 3: Polish & Ship

- Version B landing page variant

- A/B routing logic

- Waitlist form + Supabase

- PostHog integration

- Error states

- Deploy to Vercel

- End-to-end testing

---

## Key Insights from Vietnam Market

1. **Turnover is THE pain**: Staff leaving with knowledge is top-of-mind

2. **ROI must be immediate**: Can't sell "long-term value" alone

3. **Risk aversion**: Need proof before commitment (demo is critical)

4. **Competitive anxiety**: FOMO is powerful motivator

5. **Bilingual is differentiator**: Vietnamese + English support matters

6. **Owner-operators**: Buyers are hands-on, understand operational pain

---

## Post-Launch Learning Questions

After we get signups and feedback, we need to learn:

1. **What's the next feature they want?**

   - Content production engine?

   - Planning/calendar tool?

   - Client-facing brief link?

   - Just the AI agent is enough?

2. **What's their current workflow?**

   - How do they gather briefs now?

   - Where does the brief go after creation?

   - What tools are they already using?

3. **Willingness to pay?**

   - What price point feels reasonable?

   - Per-user or per-workspace?

   - Would they pay more for certain features?

4. **Integration needs?**

   - What tools must we integrate with?

   - Where does brief data need to go?

---

## Next Steps After Validation

If signups are strong (>100 waitlist in first month):

1. Onboard 10-20 beta users to actual PNP platform

2. Interview them about workflow integration

3. Build the #1 requested feature

4. Iterate based on usage patterns

If signups are weak:

1. Analyze where drop-off happened (landing vs demo vs waitlist)

2. Review session replays to see confusion points

3. Test alternative messaging

4. Consider if we're targeting wrong audience

---

**Document Version**: 1.0

**Last Updated**: 2025-11-18

**Created by**: Claude Code brainstorming session
