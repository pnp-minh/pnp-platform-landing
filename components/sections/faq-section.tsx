'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQIcon } from '@/components/ui/faq-icon'
import { useState } from 'react'

const faqs = [
  {
    id: '1',
    question: '1. What makes this AI Agent different from ChatGPT?',
    answer:
      'Jay is built specifically for agencies: templates, structure, brand intelligence, and automation.',
  },
  {
    id: '2',
    question: '2. Does this work for all types of briefs?',
    answer:
      'Yes — creative, content, marketing, GTM, ads, social… You customize once → reuse forever. Our platform can also support multiple clients and brands. Each workspace is isolated with its own brand knowledge.',
  },
  {
    id: '3',
    question: '3. Is onboarding hard?',
    answer: 'No. 5 minutes. Upload your brand, pick your templates → done.',
  },
  {
    id: '4',
    question: '4. Can my whole team use the AI consultant?',
    answer: 'Yes. Multi-user, shared brand context, workspace-level settings.',
  },
  {
    id: '5',
    question: '5. Will this AI Agent replace my team?',
    answer:
      'No — it amplifies your team. Jay multiplies their output. Your team focuses on ideas, Jay handles the admin.',
  },
]

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string>('')

  return (
    <section
      id="faqs"
      className="flex items-center justify-center px-5 py-10 md:px-10 md:py-12 lg:px-20 lg:py-[60px]"
    >
      <div className="flex w-full max-w-[846px] flex-col items-center gap-10 md:gap-12 lg:gap-[60px]">
        {/* Title */}
        <h1 className="w-full text-center text-[32px] leading-none tracking-[-1.6px] text-text-primary md:text-[40px] md:tracking-[-2px] lg:text-[48px] lg:tracking-[-2.4px]">
          FAQs
        </h1>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-0"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className={`border-0 ${index !== faqs.length - 1 ? 'border-b border-border-default' : ''}`}
            >
              <AccordionTrigger
                className={`gap-4 pt-6 text-left hover:no-underline md:gap-12 lg:gap-[77px] ${
                  openItem === faq.id ? 'pb-0' : 'pb-6'
                }`}
                icon={<FAQIcon isOpen={openItem === faq.id} />}
              >
                <span className="flex-1 text-base font-medium leading-none text-text-primary md:text-[17px] lg:text-[18px]">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-4 text-sm leading-[1.4] text-text-secondary md:text-[15px] lg:text-[16px]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
