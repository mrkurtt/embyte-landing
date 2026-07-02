'use server';

import { mockRsvpForms } from '@/domains/wedding/data/mocks';

// Mock data store — in production this would be a database
const mockForms = new Map<
  string,
  {
    id: string;
    themeId: string;
    partner1Name: string;
    partner2Name: string;
    eventDate: string;
    coverImageUrl: string | null;
    customFields: { label: string; type: string; required: boolean }[];
  }
>();

// Seed demo forms — one per theme
for (const form of mockRsvpForms) {
  mockForms.set(form.id, {
    id: form.id,
    themeId: form.themeId,
    partner1Name: form.partner1Name,
    partner2Name: form.partner2Name,
    eventDate: form.eventDate,
    coverImageUrl: form.coverImageUrl,
    customFields: form.customFields,
  });
}

export async function saveRsvpForm(data: {
  partner1Name: string;
  partner2Name: string;
  eventDate: string;
  themeId: string;
  coverImageUrl: string | null;
  customFields: { label: string; type: string; required: boolean }[];
}) {
  const id = crypto.randomUUID().slice(0, 8);
  mockForms.set(id, { id, ...data });
  return { formId: id };
}

export async function getRsvpForm(formId: string) {
  return mockForms.get(formId) ?? null;
}

export async function submitRsvpResponse(
  formId: string,
  responses: Record<string, string>,
) {
  // Mock — in production this would save to database
  console.log(`RSVP submitted for form ${formId}:`, responses);
  return { success: true };
}
