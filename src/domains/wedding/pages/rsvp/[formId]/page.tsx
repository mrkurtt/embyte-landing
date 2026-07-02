import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { getWeddingTheme } from '@/domains/wedding/themes';
import { RsvpGuestForm } from '@/domains/wedding/components/public-form/RsvpGuestForm';
import { getMockForm } from '@/domains/wedding/data/mocks';

interface Props {
  params: Promise<{ formId: string }>;
}

// Mock data lookup — in production this would fetch from database
async function getFormConfig(formId: string) {
  const mock = getMockForm(formId);
  if (!mock) return null;

  return {
    ...getWeddingTheme(mock.themeId),
    partner1Name: mock.partner1Name,
    partner2Name: mock.partner2Name,
    eventDate: mock.eventDateDisplay,
    coverImageUrl: mock.coverImageUrl,
  };
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

  const mock = getMockForm(formId)!;
  const theme = getWeddingTheme(mock.themeId);

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
