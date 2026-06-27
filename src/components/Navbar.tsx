"use client";

import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "Roadmap", href: "#roadmap" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  useLayoutEffect(() => {
    if (!mobileOpen || !navRef.current) return;

    const updateHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 border-b border-border bg-background/70 backdrop-blur-xl ${mobileOpen ? "z-[110]" : "z-50"}`}
    >
      <nav
        ref={navRef}
        className={`relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 ${mobileOpen ? "z-[120]" : ""}`}
        aria-label="Main navigation"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/embyte-icon.png"
            alt=""
            width={1326}
            height={869}
            className="h-8 w-auto"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-foreground lowercase">
            embyte
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary" href="#contact">
            Book a Demo
          </Button>
          <Button variant="primary" href="#contact">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[100] bg-background/50 backdrop-blur-xl md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed inset-x-0 z-[110] overflow-y-auto border-t border-border bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden"
            style={{
              top: navHeight,
              maxHeight: `calc(100dvh - ${navHeight}px)`,
            }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <Button
                variant="secondary"
                href="#contact"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Book a Demo
              </Button>
              <Button
                variant="primary"
                href="#contact"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
