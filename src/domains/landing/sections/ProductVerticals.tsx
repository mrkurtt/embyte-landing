"use client";

import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/shared/components/SectionHeading";
import {
  Check,
  GraduationCap,
  Heart,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  image: string;
  description: string;
  highlights: string[];
  trustBadge?: string;
};

const products: Product[] = [
  {
    id: "nexus",
    name: "Embyte Nexus",
    shortName: "Nexus",
    icon: Ticket,
    image: "/types/nexus.jpg",
    description:
      "Our universal SaaS engine for conferences, concerts, corporate galas, and general event ticketing. Flexible, powerful, ready to deploy.",
    highlights: [
      "Automated QR ticket generation at scale",
      "Real-time analytics dashboards for live ops",
      "Mobile web scanner access for on-site staff",
      "Modular integrations with your existing stack",
    ],
  },
  {
    id: "campus",
    name: "Embyte Campus",
    shortName: "Campus",
    icon: GraduationCap,
    image: "/types/campus.JPG",
    description:
      "Tailored for institutional ticketing, university events, and large-scale alumni homecomings. Built to handle complex campus operations at scale.",
    trustBadge:
      "Trusted by Lourdes College CDO for Hali Namo Alumni Homecoming",
    highlights: [
      "Heavy-duty data mapping across departments",
      "Batch physical and digital ticket processing",
      "End-to-end security tracking and audit trails",
      "Offline reconciliation for remote venues",
    ],
  },
  {
    id: "weddings",
    name: "Embyte Weddings",
    shortName: "Weddings",
    icon: Heart,
    image: "/types/wedding.jpg",
    description:
      "Designed for premium event coordinators and couples who demand elegance without compromise. Every touchpoint reflects your brand.",
    highlights: [
      "Elegant custom-branded RSVP landing pages",
      "Digital guest concierge for seamless coordination",
      "Interactive collaborative guest photo and video vault",
      "White-glove onboarding for coordinators",
    ],
  },
];

export function ProductVerticals() {
  const [activeId, setActiveId] = useState(products[0].id);
  const active = products.find((p) => p.id === activeId) ?? products[0];
  const Icon = active.icon;

  return (
    <section id="products" className="py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <SectionHeading
          eyebrow="Product Variants"
          title="Three verticals. One platform."
          description="Whether you're running a university homecoming, an intimate wedding, or a city-wide conference — Embyte adapts to your event."
          className="mb-12"
        />

        <div
          role="tablist"
          aria-label="Product verticals"
          className="mb-10 flex justify-center"
        >
          <div className="inline-flex w-full max-w-sm flex-col gap-1 rounded-2xl border border-border bg-surface/60 p-1.5 sm:max-w-none sm:w-auto sm:flex-row">
            {products.map((product) => {
              const TabIcon = product.icon;
              const isActive = activeId === product.id;

              return (
                <button
                  key={product.id}
                  id={`tab-${product.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${product.id}`}
                  onClick={() => setActiveId(product.id)}
                  className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7e5f] hover:cursor-pointer sm:flex-initial ${
                    isActive
                      ? "bg-brand-gradient text-white shadow-lg shadow-[#ed1e79]/20"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <TabIcon className="h-4 w-4 shrink-0" aria-hidden />
                  {product.shortName}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            className="gradient-border relative overflow-hidden rounded-2xl bg-surface"
          >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff7e5f]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#ed1e79]/10 blur-[100px]" />

          <div className="relative grid lg:grid-cols-2">
            <div className="relative aspect-[16/10] min-h-[220px] lg:aspect-auto lg:min-h-[440px]">
              <Image
                src={active.image}
                alt={`${active.name} showcase`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-surface/10 lg:to-surface" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-md">
                <Icon className="h-4 w-4 text-[#ff7e5f]" aria-hidden />
                <span className="text-sm font-medium text-white">
                  {active.shortName}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              {active.trustBadge && (
                <p className="mb-4 inline-flex w-fit items-start gap-2 rounded-full border border-[#ff7e5f]/25 bg-[#ff7e5f]/10 px-3.5 py-1.5 text-xs font-medium leading-snug text-[#ff7e5f]">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  {active.trustBadge}
                </p>
              )}

              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                {active.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {active.description}
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {active.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white/[0.03] p-3.5 transition-colors duration-200 hover:border-[#ff7e5f]/20 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-gradient">
                      <Check className="h-3.5 w-3.5 text-white" aria-hidden />
                    </span>
                    <span className="text-base leading-snug text-foreground/90">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
