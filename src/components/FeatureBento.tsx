import { BarChart3, Image, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Entry",
    description:
      "Mobile web scanner framework that works in any browser — no app downloads, no hardware lock-in. Staff scan QR codes at gates with real-time validation.",
    span: "",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Live attendance ledgers update the moment a guest checks in. Monitor capacity, flow rates, and gate performance from a single dashboard.",
    span: "",
  },
  {
    icon: Image,
    title: "Memory Vault",
    description:
      "Frictionless, app-free guest uploads for photos and videos. Guests contribute to a shared media vault via a simple link — no accounts required.",
    span: "",
  },
];

export function FeatureBento() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform Capabilities"
          title="Everything you need to run flawless events"
          description="From the gate to the gallery, Embyte handles the infrastructure so you can focus on the experience."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:scale-[1.02] hover:border-[#ff7e5f]/30 hover:shadow-lg hover:shadow-[#ed1e79]/5 sm:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-brand-gradient">
                <feature.icon className="h-6 w-6 text-[#ff7e5f] transition-colors group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
