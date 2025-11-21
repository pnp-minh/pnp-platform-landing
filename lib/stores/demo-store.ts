import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { BrandIntelligence } from '@/lib/web-scraper';

export type DemoPhase = 'form' | 'loading' | 'preview' | 'chat';

export interface DemoContext {
  website: string;
  brandSummary: string;
  insights: string[];
  brandVoice: string;
  brandIntelligence: BrandIntelligence;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO string for serialization
}

interface DemoState {
  // Current demo phase
  phase: DemoPhase;
  setPhase: (phase: DemoPhase) => void;

  // Demo context (brand intelligence data)
  demoContext: DemoContext | null;
  setDemoContext: (context: DemoContext | null) => void;

  // Chat messages
  chatMessages: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;

  // Cache for scraped brand data (keyed by URL)
  brandDataCache: Record<string, DemoContext>;
  setCachedBrandData: (url: string, data: DemoContext) => void;
  getCachedBrandData: (url: string) => DemoContext | null;

  // Reset demo state
  resetDemo: () => void;

  // Reset only chat (keep context and cache)
  resetChat: () => void;
}

const initialState = {
  phase: 'form' as DemoPhase,
  demoContext: null,
  chatMessages: [],
  brandDataCache: {},
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPhase: (phase) => set({ phase }),

      setDemoContext: (demoContext) => set({ demoContext }),

      setChatMessages: (chatMessages) => set({ chatMessages }),

      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, message],
        })),

      setCachedBrandData: (url, data) =>
        set((state) => ({
          brandDataCache: {
            ...state.brandDataCache,
            [url]: data,
          },
        })),

      getCachedBrandData: (url) => {
        const cache = get().brandDataCache;
        return cache[url] || null;
      },

      resetDemo: () => set(initialState),

      resetChat: () => set({ chatMessages: [] }),
    }),
    {
      name: 'primer-demo-storage', // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
      // Only persist important data
      partialize: (state) => ({
        phase: state.phase,
        demoContext: state.demoContext,
        chatMessages: state.chatMessages,
        brandDataCache: state.brandDataCache,
      }),
    }
  )
);
