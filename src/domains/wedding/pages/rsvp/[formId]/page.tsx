import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { getWeddingTheme } from '@/domains/wedding/themes';
import { RsvpGuestForm } from '@/domains/wedding/components/public-form/RsvpGuestForm';

interface Props {
  params: Promise<{ formId: string }>;
}

// Mock data lookup — in production this would fetch from database
async function getFormConfig(formId: string) {
  const mockData: Record<string, ReturnType<typeof getWeddingTheme> & {
    partner1Name: string;
    partner2Name: string;
    eventDate: string;
    coverImageUrl: string | null;
  }> = {
    demo: {
      ...getWeddingTheme('classic-navy'),
      partner1Name: 'Kurt',
      partner2Name: 'Alye',
      eventDate: 'August 8, 2026',
      coverImageUrl: null,
    },
  };

  return mockData[formId] ?? null;
}

export default async function RsvpFormPage({ params }: Props) {
  const { formId } = await params;
  const formConfig = await getFormConfig(formId);

  if (!formConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--theme-bg)]">
        <p className="text-lg text-[var(--theme-text-secondary)]">
          Form not found.
        </p>
      </div>
    );
  }

  const theme = getWeddingTheme(formConfig.id);

  return (
    <ThemeProvider config={theme}>
      <div className="flex min-h-screen items-center justify-center bg-[var(--theme-bg)] p-4">
        <RsvpGuestForm
          partner1Name={formConfig.partner1Name}
          partner2Name={formConfig.partner2Name}
          eventDate={formConfig.eventDate}
          coverImageUrl={formConfig.coverImageUrl}
        />
      </div>
    </ThemeProvider>
  );
}
