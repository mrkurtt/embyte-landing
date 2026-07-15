"use client";

import { motion } from "motion/react";
import { Button } from "@/shared/components/Button";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { useState, type FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  email: "",
  message: "",
};

const inputStyles =
  "w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-base text-foreground placeholder:text-muted/60 transition-colors focus:border-[#ff7e5f]/50 focus:outline-none focus:ring-2 focus:ring-[#ff7e5f]/20";

export function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.message.trim()) next.message = "Message is required";
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmitError(
          data.error ?? "Failed to send message. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let&apos;s talk about your event"
          description="Tell us what you're building and we'll reach out with next steps."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-xl"
        >
          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
              <p className="text-lg font-semibold text-emerald-400">
                Thanks — we&apos;ll be in touch shortly.
              </p>
              <p className="mt-2 text-sm text-muted">
                Our team will review your request and respond within 1–2
                business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
              noValidate
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={inputStyles}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputStyles}
                  placeholder="you@organization.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={`${inputStyles} resize-none`}
                  placeholder="Tell us about your event and what you're looking for..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Get in touch"}
              </Button>
              {submitError && (
                <p className="text-center text-sm text-red-400">
                  {submitError}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
