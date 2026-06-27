"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, Heart, Ticket, type LucideIcon } from "lucide-react";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  description: string;
  highlights: string[];
};

const products: Product[] = [
  {
    id: "nexus",
    name: "Embyte Nexus",
    shortName: "Nexus",
    icon: Ticket,
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
    description:
      "Tailored for institutional ticketing, university events, and large-scale alumni homecomings. Built to handle complex campus operations at scale.",
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product Variants"
          title="Three verticals. One platform."
          description="Whether you're running a university homecoming, an intimate wedding, or a city-wide conference — Embyte adapts to your event."
          className="mb-12"
        />

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={activeId === product.id}
              onClick={() => setActiveId(product.id)}
              className={`min-h-11 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7e5f] hover:cursor-pointer ${
                activeId === product.id
                  ? "bg-brand-gradient text-white shadow-lg shadow-[#ed1e79]/20"
                  : "border border-border bg-surface text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              {product.shortName}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          key={active.id}
          className="gradient-border animate-fade-in-up rounded-2xl bg-surface p-8 sm:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-gradient">
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground">
                {active.name}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-muted">
                {active.description}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {active.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-foreground/90"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
