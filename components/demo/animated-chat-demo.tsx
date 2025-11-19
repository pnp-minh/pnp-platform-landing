"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  citations?: number[];
  showCitation?: boolean;
  timestamp: number;
}

interface ConversationStep {
  messages: Omit<Message, "id" | "timestamp">[];
  progress: number;
  delay: number;
}

interface DemoContextType {
  messages: Message[];
  progress: number;
  activeCitation: number | null;
  showInsights: boolean;
  showPDFButton: boolean;
  setActiveCitation: (id: number | null) => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoContext must be used within DemoProvider");
  }
  return context;
}

const CONVERSATION_FLOW: ConversationStep[] = [
  {
    messages: [
      {
        type: "user",
        content: "I need a LinkedIn post brief for our new website launch",
      },
    ],
    progress: 15,
    delay: 0,
  },
  {
    messages: [
      {
        type: "assistant",
        content:
          "Perfect! I see Acme Corp recently completed their website redesign project. For the LinkedIn announcement, let's craft a post that highlights your new capabilities while maintaining your professional brand voice.",
        citations: [1, 2],
        showCitation: true,
      },
    ],
    progress: 30,
    delay: 2500,
  },
  {
    messages: [
      {
        type: "user",
        content: "Target audience should be B2B decision makers in tech",
      },
    ],
    progress: 45,
    delay: 4500,
  },
  {
    messages: [
      {
        type: "assistant",
        content:
          "Excellent. Based on your brand voice guidelines, I recommend a confident yet approachable tone. Your audience responds well to data-driven narratives with real-world impact.",
        citations: [3],
        showCitation: true,
      },
    ],
    progress: 60,
    delay: 6500,
  },
  {
    messages: [
      {
        type: "assistant",
        content: "...",
      },
    ],
    progress: 85,
    delay: 9000,
  },
  {
    messages: [
      {
        type: "assistant",
        content:
          "I've completed your LinkedIn Social Post Brief! 🎉\n\nDuring our conversation, I discovered 2 new brand insights:\n• Your audience engages 3x more with product launches that include customer success metrics\n• Tech decision-makers in your segment prefer concise, value-focused messaging\n\nWould you like to save these insights to your knowledge base?",
      },
    ],
    progress: 100,
    delay: 10500,
  },
];

const CITATIONS = [
  { id: 1, text: "Website Redesign Project - Sept 2024" },
  { id: 2, text: "Brand Voice Guidelines v2.1" },
  { id: 3, text: "Audience Insights: B2B Tech Decision Makers" },
];

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeCitation, setActiveCitation] = useState<number | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [showPDFButton, setShowPDFButton] = useState(false);
  const MAX_VISIBLE_MESSAGES = 3;

  useEffect(() => {
    const runDemo = async () => {
      for (let i = 0; i < CONVERSATION_FLOW.length; i++) {
        const step = CONVERSATION_FLOW[i];

        await new Promise((resolve) => setTimeout(resolve, step.delay));

        // Add new messages
        const newMessages = step.messages.map((msg, idx) => ({
          ...msg,
          id: `${i}-${idx}`,
          timestamp: Date.now() + idx,
        }));

        setMessages((prev) => {
          const updated = [...prev, ...newMessages];
          // Keep only last MAX_VISIBLE_MESSAGES
          return updated.slice(-MAX_VISIBLE_MESSAGES);
        });

        // Update progress
        setProgress(step.progress);

        // Show citation popup for messages with citations
        if (step.messages[0]?.showCitation && step.messages[0]?.citations) {
          setTimeout(() => {
            setActiveCitation(step.messages[0].citations![0]);
            setTimeout(() => setActiveCitation(null), 2000);
          }, 800);
        }

        // Show final elements
        if (i === CONVERSATION_FLOW.length - 1) {
          setTimeout(() => setShowInsights(true), 1000);
          setTimeout(() => setShowPDFButton(true), 1500);
        }
      }

      // Loop the demo
      setTimeout(() => {
        setMessages([]);
        setProgress(0);
        setShowInsights(false);
        setShowPDFButton(false);
      }, 15000);
    };

    runDemo();
  }, []);

  return (
    <DemoContext.Provider
      value={{
        messages,
        progress,
        activeCitation,
        showInsights,
        showPDFButton,
        setActiveCitation,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function DemoHeader() {
  const { progress } = useDemoContext();

  return (
    <div className="flex h-full w-full flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-0.5 pt-10">
        <p className="text-2xl font-semibold leading-normal tracking-[-0.528px] text-black">
          LinkedIn Social Post Brief
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <p className="text-xs leading-normal tracking-[-0.264px] text-[#646464]">
              {progress}% complete
            </p>
            <div className="flex h-[9px] w-[120px] rounded-2xl bg-[#e8e8e8]">
              <motion.div
                className="h-[9px] rounded-2xl bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${(progress / 100) * 120}px` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
          <ul className="list-disc text-xs leading-normal tracking-[-0.264px] text-[#646464]">
            <li>LinkedIn Post Brief</li>
          </ul>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex w-full flex-auto flex-col items-center gap-20 rounded-t-3xl bg-white p-8 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12)]">
        {/* Ready Message */}
        <div className="flex w-full max-w-[449px] flex-col gap-2 text-center">
          <p className="text-lg font-semibold leading-[1.5] tracking-[-0.396px] text-[#646464]">
            Ready to start your brief
          </p>
          <p className="text-base leading-[1.5] tracking-[-0.352px] text-[#838383]">
            Start typing to begin the conversation. Jay will help gather all the
            information needed for your project brief
          </p>
        </div>

        {/* Input Box */}
        <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-[#f9f9f9] px-6 pb-4 pt-6">
          <div className="flex w-full flex-col gap-16">
            <p className="text-base leading-[1.6] tracking-[-0.32px] text-[#a0a0a0]">
              Type your message... (Use @ to mention context)
            </p>
            <div className="flex w-full items-center justify-between">
              {/* Plus Icon */}
              <div className="relative flex h-3 w-3 items-center justify-center">
                <div className="h-3 w-[1.714px] bg-[#4a4a4a]" />
                <div className="absolute h-[1.714px] w-3 bg-[#4a4a4a]" />
              </div>
              {/* Send Button */}
              <div className="flex h-[41px] w-[65px] items-center justify-center rounded-lg bg-black">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 11L12 6L17 11M12 18V7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoMessages() {
  const {
    messages,
    activeCitation,
    showInsights,
    showPDFButton,
    setActiveCitation,
  } = useDemoContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, showInsights, showPDFButton]);

  return (
    <div className="relative flex w-full flex-col items-end justify-center gap-6">
      {/* Messages Container with Fade Effect */}
      <div className="relative h-[400px] w-full">
        {/* Top Fade Overlay */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-16 bg-gradient-to-b from-[#f9f9f9] to-transparent" />

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex h-full w-full flex-col gap-6 overflow-y-auto overflow-x-hidden py-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <AnimatePresence mode="sync">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 0.5 },
                }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "user" ? (
                  <div className="max-w-[85%]">
                    <p className="text-sm font-medium leading-normal tracking-[-0.352px] text-[#838383]">
                      {message.content}
                    </p>
                  </div>
                ) : message.content === "..." ? (
                  <div className="flex items-center gap-1">
                    <motion.span
                      className="h-2 w-2 rounded-full bg-[#a0a0a0]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="h-2 w-2 rounded-full bg-[#a0a0a0]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    />
                    <motion.span
                      className="h-2 w-2 rounded-full bg-[#a0a0a0]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                    />
                    <p className="ml-2 text-xs text-[#a0a0a0]">8 exchanges</p>
                  </div>
                ) : (
                  <div className="relative max-w-[85%]">
                    <div className="text-sm leading-normal tracking-[-0.352px] text-[#646464]">
                      <p className="whitespace-pre-line">{message.content}</p>
                      {message.citations && (
                        <div className="mt-2 flex gap-2">
                          {message.citations.map((citId) => (
                            <motion.span
                              key={citId}
                              className="cursor-pointer text-xs text-[#a0a0a0] hover:text-[#838383]"
                              whileHover={{ scale: 1.1 }}
                              onClick={() => setActiveCitation(citId)}
                            >
                              [{citId}]
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Action Buttons */}
          {showInsights && showPDFButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <motion.button
                className="inline-flex h-9 items-center justify-center rounded-md bg-[#4a4a4a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#646464]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Insights
              </motion.button>
              <motion.button
                className="inline-flex h-9 items-center justify-center rounded-md border border-[#d0d0d0] bg-white px-4 py-2 text-sm font-medium text-[#646464] transition-colors hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download PDF
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Citation Popup */}
      <AnimatePresence>
        {activeCitation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute right-0 top-0 z-10 w-[280px] rounded-lg border border-gray-200 bg-white p-4 shadow-xl"
          >
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                [{activeCitation}]
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {CITATIONS.find((c) => c.id === activeCitation)?.text}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  From brand knowledge base
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
