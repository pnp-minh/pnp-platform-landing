"use client";

import { X, Plus, Lightbulb, BookMarked } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import { AnimatedSection } from "@/components/animated/AnimatedSection";

export function FeatureSection() {
  return (
    <section
      id="feature"
      className="flex items-center justify-center bg-white px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:py-[60px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Content */}
        <AnimatedSection variant="fadeUp" threshold={0.2} className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-6">
        {/* Left Card - Configure Brief Demo */}
        <div className="relative h-[580px] w-full overflow-visible rounded-3xl bg-primary-3 md:h-[700px] lg:w-[628px]">
          {/* Main Configuration Card */}
          <div className="absolute left-1/2 top-[40px] flex w-[calc(100%-60px)] max-w-[487px] -translate-x-1/2 flex-col gap-5 rounded-3xl bg-white p-6 shadow-md md:top-[80px] md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-8 md:gap-20">
              <div className="flex flex-1 flex-col gap-[11px]">
                <h3 className="font-sans text-lg font-bold leading-normal tracking-[-0.44px] text-gray-12 md:text-[20px]">
                  Configure Your Brief
                </h3>
                <p className="text-xs leading-relaxed tracking-[-0.28px] text-gray-9 md:text-[14px]">
                  Set up your brief with title and Brand Intelligence
                </p>
              </div>
              <button className="shrink-0 self-start">
                <X className="h-5 w-5 text-gray-10 md:h-6 md:w-6" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              {/* Brief Title */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold leading-normal tracking-[-0.352px] text-gray-11 md:text-base">
                  Brief Title
                </label>
                <div className="flex items-center gap-2.5 rounded-lg border border-gray-3 bg-white px-3 py-4">
                  <div className="h-[6px] w-[116px] rounded-full bg-gray-7" />
                </div>
              </div>

              {/* Brand Intelligence Context */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold leading-normal tracking-[-0.352px] text-gray-11 md:text-base">
                  Brand Intelligence Context
                </label>
                <div className="flex h-[112px] items-center justify-center rounded-lg border border-gray-3 bg-white px-3 py-2.5">
                  <div className="flex flex-col gap-2.5">
                    <div className="h-[6px] w-[116px] rounded-full bg-gray-7" />
                    <div className="h-[6px] w-[167px] rounded-full bg-gray-7" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="relative flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="relative">
                <button className="flex h-10 items-center gap-2 rounded-lg bg-gray-3 px-3 py-3">
                  <Plus className="h-4 w-4 text-gray-11" />
                  <span className="text-base font-semibold leading-normal tracking-[-0.352px] text-gray-11">
                    Add context
                  </span>
                </button>

                {/* Popup Menu Below Add Context Button */}
                <div className="absolute left-0 top-[calc(100%+8px)] z-10 flex w-[196px] flex-col gap-2.5 rounded-lg border border-gray-3 bg-white p-4 shadow-md">
                  {/* Add Insight */}
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-gray-11" />
                    <div className="flex w-[100px] flex-col gap-px">
                      <p className="text-xs font-semibold leading-normal tracking-[-0.264px] text-gray-12">
                        Add insight
                      </p>
                      <p className="text-xs leading-relaxed tracking-[-0.24px] text-gray-9">
                        Select categories
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-3" />

                  {/* Add Knowledge */}
                  <div className="flex items-center gap-2">
                    <BookMarked className="h-4 w-4 text-gray-11" />
                    <div className="flex w-[140px] flex-col gap-px">
                      <p className="text-xs font-semibold leading-normal tracking-[-0.264px] text-gray-12">
                        Add knowledge
                      </p>
                      <p className="text-xs leading-relaxed tracking-[-0.24px] text-gray-9">
                        Select knowledge entries
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="flex h-10 items-center justify-center rounded-lg bg-primary-1 px-4 py-3">
                <span className="text-base font-semibold leading-normal tracking-[-0.352px] text-white">
                  Save Configuration
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Card - Text Content */}
        <div className="flex w-full flex-col gap-6 pl-0 lg:w-[628px] lg:pl-8">
          <div className="flex flex-col items-start gap-2.5">
            <SectionTag>How It Works</SectionTag>
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-1.28px] text-gray-12 md:text-[40px] md:tracking-[-1.6px] lg:text-[48px] lg:tracking-[-1.92px]">
              Cut Busywork, Keep Revenue
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            <h3 className="font-sans text-lg font-semibold leading-relaxed text-gray-12">
              Agencies bleed hours on tasks
            </h3>
            <p className="text-base leading-relaxed text-gray-11">
              From rewriting unclear client inputs to aligning teams on brand
              voice, onboarding new members, manually producing briefs, and
              fixing miscommunications, busywork piles up fast. AI Agent stops
              the bleed, freeing your team to focus on work that actually drives
              results.
            </p>
          </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
