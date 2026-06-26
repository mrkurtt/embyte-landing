"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FormData = {
  name: string;
  email: string;
  organization: string;
  eventType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  email: "",
  organization: "",
  eventType: "",
  message: "",
};

const inputStyles =
  "w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-[#ff7e5f]/50 focus:outline-none focus:ring-2 focus:ring-[#ff7e5f]/20";

export function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.organization.trim())
      next.organization = "Organization is required";
    if (!form.eventType) next.eventType = "Please select an event type";
    if (!form.message.trim()) next.message = "Message is required";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
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
          title="Book a demo or get started"
          description="Tell us about your event and we'll reach out with next steps — whether you're exploring a pilot or ready to join as a Launch Partner."
          className="mb-12"
        />

        <div className="mx-auto max-w-xl">
          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
              <p className="text-lg font-semibold text-emerald-400">
                Thanks — we&apos;ll be in touch shortly.
              </p>
              <p className="mt-2 text-sm text-muted">
                Our team will review your request and respond within 1–2 business
                days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
              noValidate
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
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
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
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
                <label htmlFor="organization" className="mb-1.5 block text-sm font-medium text-foreground">
                  Organization
                </label>
                <input
                  id="organization"
                  type="text"
                  value={form.organization}
                  onChange={(e) => updateField("organization", e.target.value)}
                  className={inputStyles}
                  placeholder="Your company or institution"
                />
                {errors.organization && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.organization}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="eventType" className="mb-1.5 block text-sm font-medium text-foreground">
                  Event Type
                </label>
                <select
                  id="eventType"
                  value={form.eventType}
                  onChange={(e) => updateField("eventType", e.target.value)}
                  className={`${inputStyles} appearance-none`}
                >
                  <option value="">Select an event type</option>
                  <option value="campus">Campus</option>
                  <option value="wedding">Wedding</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
                {errors.eventType && (
                  <p className="mt-1 text-xs text-red-400">{errors.eventType}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
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

              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
