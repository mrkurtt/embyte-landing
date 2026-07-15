"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/shared/components/SectionHeading";

const phases = [
  {
    title: "Design Sprint",
    period: "Now",
    description:
      "Co-develop features with our engineering team. Launch Partners get direct input on the roadmap.",
    current: true,
  },
  {
    title: "Pilot Deployments",
    period: "Q3 2026",
    description:
      "Early adopters run live events on Embyte with white-glove onboarding and dedicated support.",
    current: false,
  },
  {
    title: "General Availability",
    period: "Q1 2027",
    description:
      "Full platform launch with self-serve onboarding, public pricing, and expanded integrations.",
    current: false,
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Roadmap"
          title="Built in the open with our partners"
          description="We're shipping fast and iterating with the coordinators who know events best."
          className="mb-12"
        />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border sm:left-1/2 sm:block sm:-translate-x-px" />

          <div className="flex flex-col gap-8 sm:gap-12">
            {phases.map((phase, index) => (
              <div
                key={phase.title}
                className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="hidden sm:block sm:w-1/2" />
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  className={`sm:w-1/2 ${
                    index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                  }`}
                >
                  <div
                    className={`rounded-2xl border p-6 transition-all duration-200 hover:scale-[1.01] hover:border-[#ff7e5f]/30 hover:shadow-lg hover:shadow-[#ed1e79]/5 ${
                      phase.current
                        ? "gradient-border border-transparent bg-surface"
                        : "border-border bg-surface/50"
                    }`}
                  >
                    <div
                      className={`mb-2 flex items-center gap-2 ${
                        index % 2 === 0
                          ? "sm:justify-end"
                          : "sm:justify-start"
                      }`}
                    >
                      {phase.current && (
                        <span className="rounded-full bg-brand-gradient px-2.5 py-0.5 text-xs font-medium text-white">
                          Current
                        </span>
                      )}
                      <span className="text-sm font-medium text-muted">
                        {phase.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>

                <div
                  className={`absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full sm:left-1/2 sm:block ${
                    phase.current
                      ? "bg-brand-gradient ring-4 ring-[#ff7e5f]/20"
                      : "border-2 border-border bg-background"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
