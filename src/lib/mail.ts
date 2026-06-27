import nodemailer from "nodemailer";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createMailTransporter() {
  return nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port: Number(getRequiredEnv("SMTP_PORT")),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS"),
    },
  });
}

export type ContactFormPayload = {
  name: string;
  email: string;
  organization: string;
  eventType: string;
  message: string;
};

const eventTypeLabels: Record<string, string> = {
  campus: "Campus",
  wedding: "Wedding",
  conference: "Conference",
  other: "Other",
};

export async function sendContactEmail(payload: ContactFormPayload) {
  const transporter = createMailTransporter();
  const from = getRequiredEnv("SMTP_FROM");
  const to = getRequiredEnv("CONTACT_EMAIL");
  const eventLabel = eventTypeLabels[payload.eventType] ?? payload.eventType;

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `New contact request from ${payload.name} (${payload.organization})`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Organization: ${payload.organization}`,
      `Event Type: ${eventLabel}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Organization:</strong> ${escapeHtml(payload.organization)}</p>
      <p><strong>Event Type:</strong> ${escapeHtml(eventLabel)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
