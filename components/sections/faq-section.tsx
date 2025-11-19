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
    question: '1. What exactly does Jay do?',
    answer:
      'Jay is an AI platform that instantly transforms your ideas, notes, or client messages into clear, structured creative briefs.',
  },
  {
    id: '2',
    question: '2. How is Jay different from regular AI chat tools?',
    answer: 'Jay specializes in creating structured creative briefs, unlike general-purpose AI chat tools.',
  },
  {
    id: '3',
    question: '3. What types of briefs can Jay generate?',
    answer: 'Jay can generate various types of creative briefs tailored to your specific needs.',
  },
  {
    id: '4',
    question: '4. Can Jay handle vague or incomplete input?',
    answer: 'Yes, Jay can work with vague input and help clarify and structure your ideas.',
  },
  {
    id: '5',
    question: '5. Can I customize the brief format?',
    answer: 'Yes, Jay allows you to customize the brief format to match your workflow.',
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
