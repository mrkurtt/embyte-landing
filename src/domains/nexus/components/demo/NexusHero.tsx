import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import { TicketButton } from "./TicketButton";

export function NexusHero() {
  return (
    <section className="bg-surface pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-10 lg:px-8 xl:px-0">
        <div className="grid min-h-[calc(70dvh-3.5rem)] grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: Event details */}
          <div className="flex items-center py-12 lg:col-span-6 lg:py-20">
            <div className="w-full space-y-6">
              {/* Eyebrow — Geist Medium, uppercase, 0.10em, brand gradient */}
              <p
                className="text-brand-gradient text-sm font-medium uppercase"
                style={{ letterSpacing: "0.10em" }}
              >
                Concert Series · 2026
              </p>

              {/* Title — Display XL: Geist Bold, 48–60px, -0.02em, Light */}
              <h1
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Neon Nights
                <br />
                Festival
              </h1>

              {/* Metadata row — Geist Medium, uppercase, Muted */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-2 text-xs font-medium uppercase text-muted">
                  <Calendar className="h-3.5 w-3.5" style={{ color: "var(--gradient-start)" }} />
                  Apr 5, 2026
                </span>
                <span className="flex items-center gap-2 text-xs font-medium uppercase text-muted">
                  <MapPin className="h-3.5 w-3.5" style={{ color: "var(--gradient-start)" }} />
                  CCP Open Grounds
                </span>
                <span className="flex items-center gap-2 text-xs font-medium uppercase text-muted">
                  <Users className="h-3.5 w-3.5" style={{ color: "var(--gradient-start)" }} />
                  2,400+ Attending
                </span>
              </div>

              {/* Description — Body L: Geist Regular, 18px, Muted, lh 1.6 */}
              <p
                className="max-w-md text-muted"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                }}
              >
                A landmark open-air electronic music experience featuring
                world-class DJs, immersive light installations, and five stages
                of nonstop sound.
              </p>

              {/* CTA: Ticket stub button */}
              <div className="pt-2">
                <TicketButton label="Get Your Tickets" />
              </div>
            </div>
          </div>

          {/* Right: Media container */}
          <div className="relative hidden lg:col-span-6 lg:block">
            {/* Gradient glow behind the poster */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 50%, var(--gradient-start) 0%, var(--gradient-end) 40%, transparent 70%)",
                opacity: 0.12,
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                WebkitMaskComposite: "source-in",
              }}
            />

            {/* Event poster */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-background/40 backdrop-blur-sm">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/types/nexus.jpg"
                    alt="Neon Nights Festival"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Floating info bar */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Neon Nights Festival
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        Apr 5, 2026 · CCP Open Grounds
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                      }}
                    >
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
