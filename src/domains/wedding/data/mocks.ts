export interface MockRsvpForm {
  id: string;
  themeId: string;
  partner1Name: string;
  partner2Name: string;
  eventDate: string;
  eventDateDisplay: string;
  coverImageUrl: string | null;
  customFields: { label: string; type: string; required: boolean }[];
}

export const mockRsvpForms: MockRsvpForm[] = [
  {
    id: 'classic-navy',
    themeId: 'classic-navy',
    partner1Name: 'Emma',
    partner2Name: 'Liam',
    eventDate: '2026-08-08',
    eventDateDisplay: 'August 8, 2026',
    coverImageUrl: null,
    customFields: [],
  },
  {
    id: 'romantic-blush',
    themeId: 'romantic-blush',
    partner1Name: 'Sofia',
    partner2Name: 'Noah',
    eventDate: '2026-09-12',
    eventDateDisplay: 'September 12, 2026',
    coverImageUrl: null,
    customFields: [],
  },
  {
    id: 'timeless-ivory',
    themeId: 'timeless-ivory',
    partner1Name: 'Olivia',
    partner2Name: 'Ethan',
    eventDate: '2026-06-20',
    eventDateDisplay: 'June 20, 2026',
    coverImageUrl: null,
    customFields: [],
  },
  {
    id: 'garden-sage',
    themeId: 'garden-sage',
    partner1Name: 'Ava',
    partner2Name: 'Lucas',
    eventDate: '2026-07-04',
    eventDateDisplay: 'July 4, 2026',
    coverImageUrl: null,
    customFields: [],
  },
  {
    id: 'modern-minimal',
    themeId: 'modern-minimal',
    partner1Name: 'Mia',
    partner2Name: 'James',
    eventDate: '2026-10-18',
    eventDateDisplay: 'October 18, 2026',
    coverImageUrl: null,
    customFields: [],
  },
];

export const getMockForm = (formId: string): MockRsvpForm | undefined =>
  mockRsvpForms.find((f) => f.id === formId);
