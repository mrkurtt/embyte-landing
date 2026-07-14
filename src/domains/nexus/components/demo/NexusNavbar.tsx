"use client";

import { Search, Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Events", href: "#events" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export function NexusNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] backdrop-blur-xl ${mobileOpen ? "z-[110]" : ""}`}
      style={{ background: "rgba(18, 24, 36, 0.70)" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-10 lg:px-8 xl:px-0">
        {/* Left: Logo + product label */}
        <nav className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/embyte-icon.png"
              alt=""
              width={1326}
              height={869}
              className="h-7 w-auto"
              priority
            />
            <span
              className="text-foreground"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontWeight: 600,
                fontSize: "18px",
                letterSpacing: "-0.02em",
              }}
            >
              embyte
            </span>
          </Link>

          {/* Separator */}
          <span className="hidden h-5 w-px bg-white/[0.08] sm:block" />

          {/* Product label */}
          <span className="hidden items-center gap-1.5 sm:flex">
            <span
              className="rounded-md px-2 py-0.5 text-xs font-medium"
              style={{
                background: "rgba(255, 126, 95, 0.10)",
                color: "var(--gradient-start)",
                border: "1px solid rgba(255, 126, 95, 0.25)",
              }}
            >
              nexus
            </span>
          </span>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted transition-colors hover:text-foreground"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Search + actions (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
            aria-label="Search events"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <a
            href="#"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
          >
            Book a Demo
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
            }}
          >
            Get Started
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Right: Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
            aria-label="Search events"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[100] lg:hidden"
            style={{
              background: "rgba(18, 24, 36, 0.50)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 z-[110] overflow-y-auto border-t border-white/[0.08] px-4 py-4 lg:hidden"
            style={{
              background: "rgba(18, 24, 36, 0.95)",
              backdropFilter: "blur(12px)",
            }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href="#"
                className="flex min-h-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.08]"
                onClick={() => setMobileOpen(false)}
              >
                Book a Demo
              </a>
              <a
                href="#"
                className="flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Get Started
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
