"use client";

import { motion } from "motion/react";
import { Button } from "@/shared/components/Button";
import { ParticlesBackground } from "@/shared/components/ParticlesBackground";
import { useMediaQuery } from "@/shared/lib/useMediaQuery";
import Image from "next/image";

const snapEase = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <section className="relative overflow-hidden noise-overlay">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/types/nexus.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>

      <ParticlesBackground
        className="absolute inset-0"
        particleCount={isMobile ? 30 : 80}
        color="#ff7e5f"
        connectDistance={120}
        repelRadius={120}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-36 text-center sm:px-6 sm:py-44 lg:px-8 lg:py-[180px]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.4, ease: snapEase }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-brand-gradient"
          >
            Event Infrastructure
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5, ease: snapEase }}
            className="text-5xl font-bold leading-tight tracking-tight text-foreground drop-shadow-[0_2px_32px_rgba(0,0,0,0.75)] sm:text-6xl lg:text-7xl"
          >
            embyte:{" "}
            <span className="text-brand-gradient">Empower your events</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: snapEase }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90 drop-shadow-[0_1px_16px_rgba(0,0,0,0.6)]"
          >
            The modular digital infrastructure for seamless gate security,
            automated RSVPs, and collaborative media sharing. Built for flawless
            execution.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.4, ease: snapEase }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button variant="primary" href="#contact">
              Get Started
            </Button>
            <Button variant="secondary" href="#contact">
              Book a Demo
            </Button>
          </motion.div>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.4, ease: snapEase }}
            className="mt-3 text-xs text-muted"
          >
            Free pilot for launch partners · no credit card
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
