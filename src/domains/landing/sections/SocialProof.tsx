"use client";

import { motion } from "motion/react";
import { Check, Quote } from "lucide-react";

const stats = [
  { value: "3", label: "Product Verticals", mono: false },
  { value: "0", label: "App Downloads Required", mono: false },
  { value: "24/7", label: "Live Dashboard Access", mono: false },
  { value: "< 2s", label: "Scanner Response Time", mono: false },
];

const testimonials = [
  {
    quote:
      "Embyte handled our homecoming gate security for 800+ alumni. Real-time check-ins, zero downtime.",
    name: "Lourdes College CDO",
    role: "Hali Namo Alumni Homecoming",
  },
];

export function SocialProof() {
  return (
    <section id="proof" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-12">
          {testimonials.map((t) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-[#ff7e5f]/30 hover:shadow-lg hover:shadow-[#ed1e79]/5 sm:p-8"
            >
              <Quote className="mb-4 h-8 w-8 text-[#ff7e5f]/40" aria-hidden />
              <p className="text-base leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient">
                  <Check className="h-5 w-5 text-white" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
