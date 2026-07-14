"use client";

import { ArrowUpRight, BadgeCheck, ChevronDown } from "lucide-react";

const organizers = [
  { id: "org-1", name: "Manila Events Co.", initials: "ME", verified: true },
  { id: "org-2", name: "Pacific Live Nation", initials: "PL", verified: true },
  { id: "org-3", name: "Metro Manila Expo", initials: "MM", verified: true },
  { id: "org-4", name: "Zenith Productions", initials: "ZP", verified: false },
  { id: "org-5", name: "Luzon Festival Org", initials: "LF", verified: true },
  { id: "org-6", name: "Makati Events Hub", initials: "MH", verified: true },
];

export function OrganizerGrid() {
  return (
    <section className="mx-auto max-w-6xl space-y-10 px-4 sm:px-10 lg:px-8 xl:px-0">
      {/* Section heading */}
      <div className="max-w-2xl">
        <p
          className="text-brand-gradient mb-3 text-sm font-medium uppercase"
          style={{ letterSpacing: "0.10em" }}
        >
          Explore
        </p>
        <h2
          className="text-foreground"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Discover Event Organizers
        </h2>
        <p
          className="mt-3 text-muted"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "1.125rem",
            lineHeight: 1.6,
          }}
        >
          Browse trusted organizers running their events on Embyte Nexus.
        </p>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizers.map((org) => (
          <div
            key={org.id}
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-surface p-5 transition-all duration-200 hover:border-[rgba(255,126,95,0.20)] hover:bg-[rgba(255,255,255,0.04)]"
          >
            {/* Circular logo */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
              }}
            >
              {org.initials}
            </div>

            {/* Name + verified */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="truncate text-foreground"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 600,
                    fontSize: "15px",
                  }}
                >
                  {org.name}
                </span>
                {org.verified && (
                  <BadgeCheck
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--gradient-start)" }}
                  />
                )}
              </div>
            </div>

            {/* VIEW PAGE link */}
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-medium uppercase text-muted transition-colors hover:text-foreground"
              style={{ letterSpacing: "0.05em" }}
            >
              View Page
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white transition-all hover:brightness-110 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
          }}
        >
          Load More
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
