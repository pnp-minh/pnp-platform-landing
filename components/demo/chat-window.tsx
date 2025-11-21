"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, AtSign, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
} from "@/components/ai-elements/inline-citation";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  insights: string[];
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatWindow({
  messages,
  input,
  isLoading,
  insights,
  onInputChange,
  onSubmit,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Auto-scroll to bottom only when user is near bottom
  useEffect(() => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, shouldAutoScroll]);

  // Track scroll position to determine if user is near bottom
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    setShouldAutoScroll(isNearBottom);
  };

  // Track if user was typing before message arrived
  const wasTypingRef = useRef(false);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Track when user is typing
  const handleInputFocus = () => {
    wasTypingRef.current = true;
  };

  const handleInputBlur = () => {
    wasTypingRef.current = false;
  };

  // Maintain input focus after new messages ONLY if user was typing
  useEffect(() => {
    if (!isLoading && wasTypingRef.current && inputRef.current) {
      // Small delay to ensure DOM updates are complete
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading]);

  // Parse message content and render with inline citations
  const renderMessageWithCitations = (content: string) => {
    const parts: React.ReactNode[] = [];
    const regex = /\[(\d+)\]/g;
    let lastIndex = 0;
    let match;
    const citedInsights: string[] = [];

    // Find all citations in the content
    while ((match = regex.exec(content)) !== null) {
      const citationNumber = parseInt(match[1], 10);
      if (citationNumber > 0 && citationNumber <= insights.length) {
        citedInsights.push(insights[citationNumber - 1]);
      }
    }

    // Reset regex
    regex.lastIndex = 0;

    // If no citations, render normal markdown
    if (citedInsights.length === 0) {
      return (
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            ul: ({ children }) => (
              <ul className="my-2 list-disc pl-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-2 list-decimal pl-4">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
          }}
        >
          {content}
        </ReactMarkdown>
      );
    }

    // Build citation sources for the hover card (use Brand Intelligence as source)
    const sources = citedInsights.map(() => "Brand Intelligence");

    // Parse content with citations
    while ((match = regex.exec(content)) !== null) {
      // Add text before citation
      if (match.index > lastIndex) {
        const textBefore = content.slice(lastIndex, match.index);
        parts.push(
          <ReactMarkdown
            key={`text-${lastIndex}`}
            components={{
              p: ({ children }) => <span>{children}</span>,
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
            }}
          >
            {textBefore}
          </ReactMarkdown>
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const textAfter = content.slice(lastIndex);
      parts.push(
        <ReactMarkdown
          key={`text-${lastIndex}`}
          components={{
            p: ({ children }) => <span>{children}</span>,
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            ul: ({ children }) => (
              <ul className="my-2 list-disc pl-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-2 list-decimal pl-4">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
          }}
        >
          {textAfter}
        </ReactMarkdown>
      );
    }

    // Wrap in InlineCitation with hover card
    return (
      <InlineCitation>
        <InlineCitationText>{parts}</InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger sources={sources} />
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselHeader>
                <InlineCitationCarouselPrev />
                <InlineCitationCarouselIndex />
                <InlineCitationCarouselNext />
              </InlineCitationCarouselHeader>
              <InlineCitationCarouselContent>
                {citedInsights.map((insight, index) => (
                  <InlineCitationCarouselItem key={index}>
                    <InlineCitationSource
                      title={`Brand Insight ${index + 1}`}
                      description={insight}
                    />
                  </InlineCitationCarouselItem>
                ))}
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6"
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-2 text-gray-12"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="mb-1 text-xs font-semibold text-gray-11">
                    Primer
                  </div>
                )}
                <div className="prose prose-sm max-w-none text-sm leading-relaxed">
                  {renderMessageWithCitations(message.content)}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl bg-gray-2 px-4 py-3">
                <div className="mb-1 text-xs font-semibold text-gray-11">
                  Primer
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-9 [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-9 [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-9" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-3 p-4">
        {/* Feature Hint Toolbar */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex gap-1">
            {/* Attach Files */}
            <div className="relative">
              <button
                type="button"
                disabled
                onMouseEnter={() => setHoveredTool("attach")}
                onMouseLeave={() => setHoveredTool(null)}
                className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-gray-9 transition-colors hover:bg-gray-2"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              {hoveredTool === "attach" && (
                <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-gray-12 px-3 py-2 text-xs text-white shadow-lg">
                  <div className="mb-1 font-semibold">File Attachments</div>
                  <div className="text-gray-11">
                    Upload reference materials, brand assets, competitor examples, mood boards, or previous work to give Primer full context
                  </div>
                  <div className="mt-2 text-[10px] text-primary-11">
                    Available in production
                  </div>
                </div>
              )}
            </div>

            {/* @Mention Insights */}
            <div className="relative">
              <button
                type="button"
                disabled
                onMouseEnter={() => setHoveredTool("mention")}
                onMouseLeave={() => setHoveredTool(null)}
                className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-gray-9 transition-colors hover:bg-gray-2"
              >
                <AtSign className="h-4 w-4" />
              </button>
              {hoveredTool === "mention" && (
                <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-gray-12 px-3 py-2 text-xs text-white shadow-lg">
                  <div className="mb-1 font-semibold">Knowledge Mentions</div>
                  <div className="text-gray-11">
                    Type @ to instantly reference specific brand insights, past project learnings, or team knowledge - Primer will use them in its recommendations
                  </div>
                  <div className="mt-2 text-[10px] text-primary-11">
                    Available in production
                  </div>
                </div>
              )}
            </div>

            {/* AI Tools */}
            <div className="relative">
              <button
                type="button"
                disabled
                onMouseEnter={() => setHoveredTool("ai")}
                onMouseLeave={() => setHoveredTool(null)}
                className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-gray-9 transition-colors hover:bg-gray-2"
              >
                <Sparkles className="h-4 w-4" />
              </button>
              {hoveredTool === "ai" && (
                <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-gray-12 px-3 py-2 text-xs text-white shadow-lg">
                  <div className="mb-1 font-semibold">AI Tool Calling</div>
                  <div className="text-gray-11">
                    Primer can search the web for trends, analyze competitor content, generate creative concepts, and research target audiences - all in real-time during your conversation
                  </div>
                  <div className="mt-2 text-[10px] text-primary-11">
                    Available in production
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 text-right">
            <span className="text-xs text-gray-9">
              Production features preview
            </span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Type your response..."
            disabled={isLoading}
            className="flex-1 rounded-xl border border-gray-3 bg-white px-4 py-3 text-sm text-gray-12 placeholder-gray-9 outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
