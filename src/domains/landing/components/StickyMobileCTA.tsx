"use client";

import { Button } from "@/shared/components/Button";
import { useEffect, useRef, useState } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroRef.current = document.querySelector("section");

    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 px-4 py-3 backdrop-blur-xl transition-all duration-300 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <Button variant="primary" href="#contact" className="flex-1">
          Get Started
        </Button>
        <Button variant="secondary" href="#contact" className="shrink-0">
          Book a Demo
        </Button>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-muted">
        Free pilot for launch partners
      </p>
    </div>
  );
}
