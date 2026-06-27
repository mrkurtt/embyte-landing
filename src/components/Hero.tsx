import { DashboardMockup } from "@/components/DashboardMockup";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/hero-2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/55 lg:to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
        <div className="animate-fade-in-up">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-gradient">
            Event Infrastructure
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            embyte:{" "}
            <span className="text-brand-gradient">Empower your events</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            The modular digital infrastructure for seamless gate security,
            automated RSVPs, and collaborative media sharing. Built for flawless
            execution.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button variant="primary" href="#contact">
              Get Started
            </Button>
            <Button variant="secondary" href="#contact">
              Book a Demo
            </Button>
          </div>
        </div>

        <div
          className="animate-fade-in-up lg:pl-4"
          style={{ animationDelay: "0.15s" }}
        >
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
