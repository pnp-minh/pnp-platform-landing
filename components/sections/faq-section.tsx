"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQIcon } from "@/components/ui/faq-icon";
import { useState } from "react";

const faqs = [
  {
    id: "1",
    question: "1. What makes Primer different from ChatGPT?",
    answer:
      "Primer is built specifically for agencies: structured brief templates, brand intelligence that learns from past projects, and automated brief generation. ChatGPT is general-purpose; Primer is your specialist.",
  },
  {
    id: "2",
    question: "2. Does this work for all types of briefs?",
    answer:
      "Yes. Creative, content, social, blog, ebook, sales deck—you name it. Customize your templates once and reuse them forever. Primer supports multiple clients and brands, with each workspace keeping its own brand knowledge separate.",
  },
  {
    id: "3",
    question: "3. Can I create my own brief templates?",
    answer:
      "Absolutely. Build custom templates for your specific services, import your existing question bank, or let AI generate questions for you. We also provide ready-made templates so you can start immediately.",
  },
  {
    id: "4",
    question: "4. Is onboarding hard?",
    answer:
      "No. Takes about 5 minutes. Connect your website, set up your templates, and you're ready to go.",
  },
  {
    id: "5",
    question: "5. Can my whole team use Primer?",
    answer:
      "Yes. Primer is built for teams. Everyone shares the same brand context and workspace settings, so knowledge stays consistent across your agency.",
  },
  {
    id: "6",
    question: "6. Will Primer replace my team?",
    answer:
      "No — Primer amplifies your team. It handles the administrative work of gathering and structuring briefs, so your team can focus on strategy and creative thinking.",
  },
];

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string>("");

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
              className={`border-0 ${
                index !== faqs.length - 1
                  ? "border-b border-border-default"
                  : ""
              }`}
            >
              <AccordionTrigger
                className={`gap-4 pt-6 text-left hover:no-underline md:gap-12 lg:gap-[77px] ${
                  openItem === faq.id ? "pb-0" : "pb-6"
                }`}
                icon={<FAQIcon isOpen={openItem === faq.id} />}
              >
                <span className="flex-1 text-base font-medium leading-none text-text-primary md:text-[17px] lg:text-[18px]">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-4 text-sm leading-[1.4] text-gray-11 md:text-[15px] lg:text-[16px]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
