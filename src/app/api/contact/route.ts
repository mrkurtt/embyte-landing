import { NextResponse } from "next/server";
import { sendContactEmail, type ContactFormPayload } from "@/lib/mail";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validEventTypes = new Set(["campus", "wedding", "conference", "other"]);

function validatePayload(body: unknown): ContactFormPayload | string {
  if (!body || typeof body !== "object") {
    return "Invalid request body";
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const organization =
    typeof data.organization === "string" ? data.organization.trim() : "";
  const eventType =
    typeof data.eventType === "string" ? data.eventType.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name) return "Name is required";
  if (!email) return "Email is required";
  if (!emailPattern.test(email)) return "Enter a valid email address";
  if (!organization) return "Organization is required";
  if (!eventType || !validEventTypes.has(eventType)) {
    return "Please select a valid event type";
  }
  if (!message) return "Message is required";

  return { name, email, organization, eventType, message };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validatePayload(body);

    if (typeof result === "string") {
      return NextResponse.json({ error: result }, { status: 400 });
    }

    await sendContactEmail(result);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
