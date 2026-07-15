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
  message: string;
};

export async function sendContactEmail(payload: ContactFormPayload) {
  const transporter = createMailTransporter();
  const from = getRequiredEnv("SMTP_FROM");
  const to = getRequiredEnv("CONTACT_EMAIL");

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `New contact from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
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
