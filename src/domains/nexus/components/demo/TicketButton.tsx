"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface TicketButtonProps {
  label: string;
  href?: string;
}

export function TicketButton({ label, href = "#" }: TicketButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="ticket-btn group relative inline-flex cursor-pointer items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
    >
      {/* Left half */}
      <span
        className="ticket-left relative z-10 flex items-center rounded-l-[3px] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)]"
        style={{
          background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
          borderRadius: hovered ? "3px" : "3px 0 0 3px",
          transform: hovered ? "translate(-8px, -10px) rotate(-16deg)" : "none",
        }}
      >
        <span
          className="absolute left-[-6px] top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rounded-full"
          style={{ background: "var(--surface)" }}
        />
        {label}
        {/* Dashed separator */}
        <span
          className="absolute right-0 top-0.5 bottom-0.5 w-[2px] z-10 transition-opacity duration-300"
          style={{
            background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 4px, transparent 4px, transparent 8px)",
            opacity: hovered ? 0 : 1,
          }}
        />
      </span>

      {/* Right half */}
      <span
        className="ticket-right relative z-10 flex items-center rounded-r-[3px] px-4 py-3 transition-transform duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)]"
        style={{
          background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
          borderRadius: hovered ? "3px" : "0 3px 3px 0",
          transform: hovered ? "translate(8px, -4px) rotate(16deg)" : "none",
        }}
      >
        <span
          className="absolute right-[-6px] top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rounded-full"
          style={{ background: "var(--surface)" }}
        />
        <ArrowRight
          className="h-4 w-4 text-white transition-colors duration-300"
          style={{ color: hovered ? "#000" : "#fff" }}
        />
      </span>

      {/* Top notch */}
      <span
        className="absolute -top-[7px] right-[4.5rem] z-20 h-3.5 w-3.5 translate-x-1/2 rounded-full transition-opacity duration-300 sm:right-[4.5rem]"
        style={{
          background: "var(--surface)",
          opacity: hovered ? 0 : 1,
        }}
      />
      {/* Bottom notch */}
      <span
        className="absolute -bottom-[7px] right-[4.5rem] z-20 h-3.5 w-3.5 translate-x-1/2 rounded-full transition-opacity duration-300 sm:right-[4.5rem]"
        style={{
          background: "var(--surface)",
          opacity: hovered ? 0 : 1,
        }}
      />
    </a>
  );
}
