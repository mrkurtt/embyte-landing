'use server';

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

// Seed a demo form
mockForms.set('demo', {
  id: 'demo',
  themeId: 'classic-navy',
  partner1Name: 'Kurt',
  partner2Name: 'Alye',
  eventDate: '2026-08-08',
  coverImageUrl: null,
  customFields: [],
});

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
