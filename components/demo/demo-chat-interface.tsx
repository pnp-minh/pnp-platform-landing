"use client";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { BrandIntelligence } from "@/lib/web-scraper";
import { BrandIntelligencePanel } from "./brand-intelligence-panel";
import { ChatWindow, type ChatMessage } from "./chat-window";
import { useDemoStore } from "@/lib/stores/demo-store";

interface DemoChatInterfaceProps {
  website: string;
  brandSummary: string;
  brandVoice: string;
  brandIntelligence: BrandIntelligence;
  insights: string[];
}

export function DemoChatInterface({
  website,
  brandSummary,
  brandVoice,
  brandIntelligence,
  insights,
}: DemoChatInterfaceProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  // Get stored chat messages from Zustand
  const storedMessages = useDemoStore((state) => state.chatMessages);
  const setChatMessages = useDemoStore((state) => state.setChatMessages);
  const resetChat = useDemoStore((state) => state.resetChat);

  // Extract brand name for context
  const brandName = website
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(".")[0]
    .split("/")[0];

  const formattedBrandName =
    brandName.charAt(0).toUpperCase() + brandName.slice(1);

  // Initial greeting message
  const greetingMessage = {
    id: "greeting",
    role: "assistant" as const,
    content: `Hi! I'm Primer, your AI Brief Consultant.\n\nI've got your Brand Intelligence loaded for ${formattedBrandName} - looking good! Let's put together a Social Post Brief.\n\nReady to get started?`,
  };

  // Vercel AI SDK hook for chat with DefaultChatTransport
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/demo/chat",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        context: {
          brandName: formattedBrandName,
          brandSummary,
          brandVoice,
          insights,
        },
      },
    }),
    // Restore messages from store or use greeting
    messages:
      storedMessages.length > 0
        ? storedMessages.map((msg) => ({
            id: msg.id,
            role: msg.role,
            parts: [{ type: "text" as const, text: msg.content }],
          }))
        : [
            {
              ...greetingMessage,
              parts: [
                { type: "text" as const, text: greetingMessage.content },
              ],
            },
          ],
  });

  // Manage input state manually (AI SDK 5.0 doesn't manage it)
  const [input, setInput] = useState("");

  // Persist messages to Zustand whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      const messagesToStore = messages.map((msg) => {
        // Extract text content from parts
        const textContent = msg.parts
          .filter((part) => part.type === "text")
          .map((part) => (part.type === "text" ? part.text : ""))
          .join("");

        return {
          id: msg.id,
          role: msg.role as "user" | "assistant",
          content: textContent,
          timestamp: new Date().toISOString(),
        };
      });
      setChatMessages(messagesToStore);
    }
  }, [messages, setChatMessages]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format elapsed time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Convert useChat messages to ChatMessage format for ChatWindow component
  const chatMessages: ChatMessage[] = messages.map((msg) => {
    // Extract text content from parts
    const textContent = msg.parts
      .filter((part) => part.type === "text")
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("");

    return {
      id: msg.id,
      role: msg.role as "user" | "assistant",
      content: textContent,
      timestamp: new Date(),
    };
  });

  // Handle input change
  const handleInputChange = (value: string) => {
    setInput(value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "streaming") return;

    sendMessage({ text: input });
    setInput("");
  };

  // Check if loading
  const isLoading = status === "streaming";

  // Handle start over - reset chat and timer
  const handleStartOver = () => {
    // Reset Zustand store
    resetChat();

    // Reset AI SDK messages to greeting only
    setMessages([
      {
        ...greetingMessage,
        parts: [{ type: "text" as const, text: greetingMessage.content }],
      },
    ]);

    // Reset timer
    setElapsedTime(0);
  };

  return (
    <div className="flex h-[calc(100vh-68px)] flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-3 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-11">Step 2 of 3</div>
          <div className="h-4 w-px bg-gray-3" />
          <div className="text-sm font-medium text-gray-12">
            Primer Demo Experience
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-11">
            Time: {formatTime(elapsedTime)}
          </div>
          <div className="h-4 w-px bg-gray-3" />
          <button
            onClick={handleStartOver}
            className="text-sm text-gray-11 transition-colors hover:text-gray-12"
          >
            Start Over
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Chat (60%) */}
        <div className="flex w-full flex-col border-r border-gray-3 md:w-[60%]">
          <ChatWindow
            messages={chatMessages}
            input={input}
            isLoading={isLoading}
            insights={insights}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Right Panel - Brand Intelligence (40%) */}
        <div className="hidden w-[40%] flex-col md:flex">
          <BrandIntelligencePanel
            website={website}
            brandSummary={brandSummary}
            brandVoice={brandVoice}
            brandIntelligence={brandIntelligence}
            insights={insights}
          />
        </div>
      </div>
    </div>
  );
}
