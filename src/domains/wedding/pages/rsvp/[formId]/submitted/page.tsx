import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { getWeddingTheme } from '@/domains/wedding/themes';
import { SubmissionConfirm } from '@/domains/wedding/components/public-form/SubmissionConfirm';

interface Props {
  params: Promise<{ formId: string }>;
}

export default async function SubmissionPage({ params }: Props) {
  await params; // params available for future use

  // Mock — in production, load theme from form config
  const theme = getWeddingTheme('classic-navy');

  return (
    <ThemeProvider config={theme}>
      <div className="flex min-h-screen items-center justify-center bg-[var(--theme-bg)] p-4">
        <SubmissionConfirm />
      </div>
    </ThemeProvider>
  );
}
