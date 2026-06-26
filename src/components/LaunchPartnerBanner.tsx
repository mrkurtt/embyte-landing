import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LaunchPartnerBanner() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gradient-border relative overflow-hidden rounded-2xl bg-surface p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#ff7e5f]/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ed1e79]/10 blur-[80px]" />

          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Join our Launch Partner program
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Embyte is currently in an exclusive Launch Partner phase. We&apos;re
                offering dedicated engineering support and special early-adopter
                pricing tiers for event coordinators who join our design sprint
                and help shape the platform.
              </p>
            </div>
            <Button variant="primary" href="#contact" className="shrink-0">
              Become a Launch Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
