"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Citation {
  number: string;
  title: string;
  url: string;
  description?: string;
  quote?: string;
}

interface InlineCitationProps {
  citations: Citation[];
  children: React.ReactNode;
  className?: string;
}

export function InlineCitation({
  citations,
  children,
  className,
}: InlineCitationProps) {
  // Parse text and replace [1], [2], etc. with citation components
  const parseContent = (content: string) => {
    const parts: React.ReactNode[] = [];
    const regex = /\[(\d+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      // Add text before citation
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      // Add citation badge
      const citationNumber = match[1];
      const citation = citations.find((c) => c.number === citationNumber);

      if (citation) {
        parts.push(
          <CitationBadge key={`citation-${citationNumber}-${match.index}`} citation={citation} />
        );
      } else {
        parts.push(match[0]);
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  // If children is a string, parse it
  if (typeof children === "string") {
    return <span className={className}>{parseContent(children)}</span>;
  }

  // Otherwise, render children as-is
  return <span className={className}>{children}</span>;
}

interface CitationBadgeProps {
  citation: Citation;
}

function CitationBadge({ citation }: CitationBadgeProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="mx-0.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-primary/10 px-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
      >
        {citation.number}
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-80 -translate-x-1/2 rounded-lg border border-gray-3 bg-white p-4 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-gray-12">
                {citation.title}
              </h4>
            </div>

            {citation.description && (
              <p className="text-xs leading-relaxed text-gray-11">
                {citation.description}
              </p>
            )}

            {citation.quote && (
              <blockquote className="border-l-2 border-primary pl-3 text-xs italic text-gray-11">
                "{citation.quote}"
              </blockquote>
            )}

            {citation.url && (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View source
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>

          {/* Arrow pointing down */}
          <div className="absolute left-1/2 top-full -translate-x-1/2">
            <div className="h-2 w-2 rotate-45 border-b border-r border-gray-3 bg-white" />
          </div>
        </div>
      )}
    </span>
  );
}
