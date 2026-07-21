"use client";

import { useInView } from "motion/react";
import { motion } from "motion/react";
import { Check, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3, prefix: "", suffix: "", label: "Product Verticals" },
  { value: 0, prefix: "", suffix: "", label: "App Downloads Required" },
  { value: 24, prefix: "", suffix: "/7", label: "Live Dashboard Access" },
  { value: 2, prefix: "< ", suffix: "s", label: "Scanner Response Time" },
];

const testimonials = [
  {
    quote:
      "Embyte handled our homecoming gate security for 1600+ alumni. Real-time check-ins, zero downtime.",
    name: "Lourdes College CDO",
    role: "Hali Namo Alumni Homecoming",
  },
];

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView || target === 0) {
      if (target === 0 && inView) setCount(0);
      return;
    }

    let start: number | null = null;
    let raf: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return { count, ref };
}

function AnimatedStat({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

export function SocialProof() {
  return (
    <section id="proof" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        <div className="mt-12">
          {testimonials.map((t) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-[#ff7e5f]/30 hover:shadow-lg hover:shadow-[#ed1e79]/5 sm:p-8"
            >
              <Quote className="mb-4 h-8 w-8 text-[#ff7e5f]/40" aria-hidden />
              <p className="text-base leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient">
                  <Check className="h-5 w-5 text-white" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
