"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/shared/components/SectionHeading";

const faqs = [
  {
    question: "what is embyte?",
    answer:
      "embyte is modular event infrastructure. we handle gate security, automated rsvps, and collaborative media sharing — so coordinators can focus on the experience, not the tech.",
  },
  {
    question: "how does gate security work?",
    answer:
      "staff use a mobile web scanner to validate qr codes at entry points. no app downloads, no hardware lock-in — it works in any browser with real-time attendance tracking.",
  },
  {
    question: "do guests need to download an app?",
    answer:
      "no. everything works in the browser. guests scan qr codes, upload photos to the memory vault, and access event info without installing anything.",
  },
  {
    question: "what event types does embyte support?",
    answer:
      "three verticals: embyte nexus for conferences and concerts, embyte campus for university events, and embyte weddings for premium coordinator-led events. each adapts to your specific needs.",
  },
  {
    question: "how do i become a launch partner?",
    answer:
      "fill out the contact form below. we're offering dedicated engineering support and early-adopter pricing for coordinators who join our design sprint and help shape the platform.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-medium text-foreground transition-colors hover:bg-white/[0.03]"
      >
        {question}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked"
          description="quick answers about embyte."
          className="mb-12"
        />

        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            </motion.div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
