"use client";

import { motion } from "motion/react";
import { BarChart3, Image, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/shared/components/SectionHeading";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Entry",
    description:
      "Mobile web scanner framework that works in any browser — no app downloads, no hardware lock-in. Staff scan QR codes at gates with real-time validation.",
    span: "md:col-span-1",
    hero: true,
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Live attendance ledgers update the moment a guest checks in. Monitor capacity, flow rates, and gate performance from a single dashboard.",
    span: "md:col-span-1",
    hero: false,
  },
  {
    icon: Image,
    title: "Memory Vault",
    description:
      "Frictionless, app-free guest uploads for photos and videos. Guests contribute to a shared media vault via a simple link — no accounts required.",
    badge: "Embyte Weddings",
    span: "md:col-span-1",
    hero: false,
  },
];

export function FeatureBento() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform Capabilities"
          title="Everything you need to run flawless events"
          description="From the gate to the gallery, Embyte handles the infrastructure so you can focus on the experience."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-fr">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className={`group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] active:transition-transform active:duration-100 hover:border-[#ff7e5f]/30 hover:shadow-lg hover:shadow-[#ed1e79]/5 sm:p-8 ${feature.span} ${feature.hero ? "noise-overlay" : ""}`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-brand-gradient">
                <feature.icon className="h-6 w-6 text-[#ff7e5f] transition-colors group-hover:text-white" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                {"badge" in feature && feature.badge && (
                  <span className="rounded-full border border-[#ff7e5f]/25 bg-[#ff7e5f]/10 px-2.5 py-0.5 text-xs font-medium text-[#ff7e5f]">
                    {feature.badge}
                  </span>
                )}
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
