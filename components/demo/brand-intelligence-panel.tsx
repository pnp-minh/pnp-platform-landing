"use client";

import type { BrandIntelligence } from "@/lib/web-scraper";

interface BrandIntelligencePanelProps {
  website: string;
  brandSummary: string;
  brandVoice: string;
  brandIntelligence: BrandIntelligence;
  insights: string[];
}

export function BrandIntelligencePanel({
  website,
  brandSummary,
  brandVoice,
  brandIntelligence,
  insights,
}: BrandIntelligencePanelProps) {
  // Extract brand name from URL
  const brandName = website
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(".")[0]
    .split("/")[0];

  const formattedBrandName =
    brandName.charAt(0).toUpperCase() + brandName.slice(1);

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
      {/* Brand Knowledge Section */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-12">
          Brand Knowledge
        </h3>

        <div className="space-y-4">
          {/* Logo & Name */}
          {brandIntelligence.logo && (
            <div className="flex items-center gap-3">
              <img
                src={brandIntelligence.logo}
                alt={`${formattedBrandName} logo`}
                className="h-10 w-auto object-contain"
              />
            </div>
          )}

          {/* Brand Summary */}
          <div>
            <p className="text-xs font-medium text-gray-11">About</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-12">
              {brandSummary}
            </p>
          </div>

          {/* Brand Colors */}
          {brandIntelligence.colors.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-11">Brand Colors</p>
              <div className="mt-2 flex gap-2">
                {brandIntelligence.colors.slice(0, 5).map((color, index) => (
                  <div
                    key={index}
                    className="h-8 w-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Brand Voice */}
          <div>
            <p className="text-xs font-medium text-gray-11">Brand Voice</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-12">
              {brandVoice}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-3" />

      {/* Brand Insights Section */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-12">
          Brand Insights
        </h3>

        {/* Demo Explanation */}
        <div className="mb-4 rounded-lg bg-primary-3 p-3">
          <p className="text-xs leading-relaxed text-gray-11">
            <span className="font-semibold">For this demo:</span> These insights
            are AI-generated based on your brand&apos;s website.
            <br />
            <span className="font-semibold">In production:</span> Primer
            automatically detects insights from real brief conversations and
            asks you to save them to Brand Intelligence.
          </p>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-2 p-3 text-sm leading-relaxed text-gray-12"
            >
              {insight}
            </div>
          ))}
        </div>

        {insights.length === 0 && (
          <p className="text-sm text-gray-11">
            No insights available for this brand yet.
          </p>
        )}
      </div>
    </div>
  );
}
