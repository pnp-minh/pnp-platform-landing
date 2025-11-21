"use client";

import type { Variant } from "@/lib/getVariant";
import type { BrandIntelligence } from "@/lib/web-scraper";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostHog } from "posthog-js/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDemoStore } from "@/lib/stores/demo-store";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DemoLoadingProgress } from "./demo-loading-progress";
import { BrandIntelligencePreview } from "./brand-intelligence-preview";
import { DemoChatInterface } from "./demo-chat-interface";

interface DemoGateFormProps {
  variant: Variant;
}

const formSchema = z.object({
  website: z
    .string()
    .url({
      message: "Please enter a valid URL starting with https://",
    })
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

type DemoContext = {
  website: string;
  brandSummary: string;
  insights: string[];
  brandVoice: string;
  brandIntelligence: BrandIntelligence;
};

export function DemoGateForm({ variant }: DemoGateFormProps) {
  const posthog = usePostHog();

  // Use Zustand store for state management with sessionStorage persistence
  const phase = useDemoStore((state) => state.phase);
  const setPhase = useDemoStore((state) => state.setPhase);
  const demoContext = useDemoStore((state) => state.demoContext);
  const setDemoContext = useDemoStore((state) => state.setDemoContext);
  const getCachedBrandData = useDemoStore((state) => state.getCachedBrandData);
  const setCachedBrandData = useDemoStore((state) => state.setCachedBrandData);

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Use Papers & Pens website as fallback if no URL provided
      const websiteUrl = values.website || "https://papers-pens.com";

      // Track demo started event in PostHog
      posthog.capture("demo_started", {
        variant,
        website_provided: !!values.website,
        used_fallback: !values.website,
      });

      // Check cache first to avoid expensive re-scraping
      const cachedData = getCachedBrandData(websiteUrl);

      if (cachedData) {
        console.log("Using cached brand data for:", websiteUrl);
        setDemoContext(cachedData);
        setPhase("loading"); // Still show loading for UX consistency
        return;
      }

      // Show loading phase
      setPhase("loading");

      // Call API to generate context from website
      const response = await fetch("/api/demo/generate-context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ website: websiteUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate context");
      }

      const data = await response.json();

      // Store context in Zustand (automatically persists to sessionStorage)
      setDemoContext(data.context);

      // Cache the brand data by URL to avoid re-scraping
      setCachedBrandData(websiteUrl, data.context);

      // Move to preview phase (loading component will trigger this via onComplete)
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still allow demo to proceed with fallback
      const websiteUrl = values.website || "https://papers-pens.com";
      const fallbackContext: DemoContext = {
        website: websiteUrl,
        brandSummary:
          "Papers & Pens is a product marketing agency helping B2B/SaaS brands grow through expert positioning, messaging, and go-to-market strategies.",
        insights: [
          "B2B agencies see 3x better client retention with structured brief processes",
          "Most successful projects start with thorough discovery and brand alignment",
        ],
        brandVoice:
          "Direct, confident, and expertise-driven. Uses clear language without jargon, focuses on practical outcomes.",
        brandIntelligence: {
          logo: "https://cdn.sanity.io/images/n0d9khdx/production/03c5d6e90a1b3ca130471e0e0f2003cfeff012ef-1200x628.png",
          colors: ["#00A57C", "#007B5E", "#1D1D1D", "#F4F4F4", "#C4C4C4"],
        },
      };
      setDemoContext(fallbackContext);
      setCachedBrandData(websiteUrl, fallbackContext);
      // Move to preview phase
    }
  };

  // Loading phase - show animated progress
  if (phase === "loading") {
    return (
      <DemoLoadingProgress
        onComplete={() => {
          // Track loading completed
          posthog.capture("demo_loading_completed", { variant });
          // Move to preview phase
          setPhase("preview");
        }}
      />
    );
  }

  // Preview phase - show brand intelligence bento grid
  if (phase === "preview" && demoContext) {
    return (
      <BrandIntelligencePreview
        website={demoContext.website}
        brandSummary={demoContext.brandSummary}
        brandVoice={demoContext.brandVoice}
        brandIntelligence={demoContext.brandIntelligence}
        onStartDemo={() => {
          // Track preview viewed and demo started
          posthog.capture("demo_preview_completed", { variant });
          posthog.capture("demo_chat_started", { variant });
          // Move to chat phase
          setPhase("chat");
        }}
      />
    );
  }

  // Chat phase - show interactive demo chat interface
  if (phase === "chat" && demoContext) {
    return (
      <DemoChatInterface
        website={demoContext.website}
        brandSummary={demoContext.brandSummary}
        brandVoice={demoContext.brandVoice}
        brandIntelligence={demoContext.brandIntelligence}
        insights={demoContext.insights}
      />
    );
  }

  // Form phase - show initial form
  return (
    <div
      className="flex items-center justify-center overflow-hidden px-5 py-8 md:py-12 lg:py-0"
      style={{ height: "calc(100vh - 68px)" }}
    >
      <div className="w-full max-w-[600px]">
        {/* Header */}
        <div className="mb-6 space-y-4 md:mb-8 md:space-y-5 lg:mb-10 lg:space-y-8">
          <h2 className="text-center text-2xl font-semibold leading-tight tracking-[-1.2px] text-black md:text-3xl lg:text-4xl">
            See Primer in Action
          </h2>

          <div className="space-y-5 text-left md:space-y-6">
            <div>
              <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-11 md:mb-2 md:text-sm">
                The Scenario
              </h3>
              <p className="text-sm leading-[1.6] text-gray-11 md:text-base">
                Picture this: Your client needs a video brief. Instead of a
                3-hour intake call, you send them a Primer link. They chat with
                Primer for a few minutes. You receive a complete brief.
              </p>
            </div>

            <div>
              <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-11 md:mb-2 md:text-sm">
                In This Demo
              </h3>
              <p className="text-sm leading-[1.6] text-gray-11 md:text-base">
                You&apos;ll experience the{" "}
                <span className="font-semibold text-gray-12">CLIENT side</span>
                —the conversation your clients will have with Primer. Judge the
                experience for yourself: quality of questions, speed of the
                process, and intelligence of responses.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-5 lg:space-y-6"
          >
            {/* Website Field */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-12 md:text-base">
                    Enter a brand website to demo with
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      className="h-11 text-sm md:h-12 md:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs leading-[1.4] text-gray-11 md:text-sm">
                    Primer will analyze the website and use real brand context
                    in the demo. Leave empty to use our agency website (Papers &
                    Pens) as an example.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold leading-normal tracking-[-0.32px] text-white transition-colors hover:bg-primary/90 disabled:opacity-50 md:mt-5 md:h-14 md:text-base lg:mt-6"
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Preparing your demo...
                </span>
              ) : (
                "Start Demo"
              )}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
