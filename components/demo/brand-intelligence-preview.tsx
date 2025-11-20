"use client";

import type { BrandIntelligence } from "@/lib/web-scraper";

interface BrandIntelligencePreviewProps {
  website: string;
  brandSummary: string;
  brandVoice: string;
  brandIntelligence: BrandIntelligence;
  onStartDemo: () => void;
}

export function BrandIntelligencePreview({
  website,
  brandSummary,
  brandVoice,
  brandIntelligence,
  onStartDemo,
}: BrandIntelligencePreviewProps) {

  // Extract brand name from URL
  const brandName = website
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(".")[0]
    .split("/")[0];

  const formattedBrandName =
    brandName.charAt(0).toUpperCase() + brandName.slice(1);

  return (
    <div className="flex h-[calc(100vh-68px)] items-center justify-center overflow-hidden bg-white px-5 py-8">
      <div className="w-full max-w-[1000px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-semibold leading-tight tracking-[-1.2px] text-black md:text-3xl">
            Brand Intelligence Extracted
          </h2>
          <p className="text-sm text-gray-11 md:text-base">
            Here&apos;s what Primer learned about {formattedBrandName}
          </p>
        </div>

        {/* Bento Grid - 2x2 Layout */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 md:gap-6">
          {/* Logo Card */}
          <div className="flex flex-col items-start rounded-2xl bg-gray-2 p-6 md:p-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-12">
              Logo
            </h3>
            <div className="flex flex-1 w-full items-center justify-center">
              {brandIntelligence.logo ? (
                <img
                  src={brandIntelligence.logo}
                  alt={`${formattedBrandName} logo`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-12 md:text-3xl">
                    {formattedBrandName}
                  </p>
                  <p className="mt-1 text-xs text-gray-11">Brand Name</p>
                </div>
              )}
            </div>
          </div>

          {/* Colors Card */}
          <div className="flex flex-col items-start rounded-2xl bg-gray-2 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-12">
              Brand Colors
            </h3>
            {brandIntelligence.colors.length > 0 ? (
              <div className="flex flex-col gap-3">
                {brandIntelligence.colors.slice(0, 3).map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 shrink-0 rounded-lg shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                    <span className="text-sm font-mono font-medium text-gray-12">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-11">No colors detected</p>
            )}
          </div>

          {/* Brand Summary Card */}
          <div className="flex flex-col items-start rounded-2xl bg-gray-2 p-6 md:p-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-12">
              About This Brand
            </h3>
            <p className="text-sm leading-relaxed text-gray-11">
              {brandSummary}
            </p>
          </div>

          {/* Brand Voice Card */}
          <div className="flex flex-col items-start rounded-2xl bg-gray-2 p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-12">
              Brand Voice
            </h3>
            <p className="text-sm leading-relaxed text-gray-11">
              {brandVoice}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartDemo}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold leading-normal tracking-[-0.32px] text-white transition-colors hover:bg-primary/90"
        >
          Continue to Conversation
        </button>
      </div>
    </div>
  );
}
