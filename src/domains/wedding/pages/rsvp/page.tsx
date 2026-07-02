'use client';

import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { getWeddingTheme } from '@/domains/wedding/themes';
import { FormBuilderProvider } from '@/domains/wedding/components/rsvp/FormBuilderContext';
import { RsvpFormBuilder } from '@/domains/wedding/components/rsvp/RsvpFormBuilder';
import { RsvpFormPreview } from '@/domains/wedding/components/rsvp/RsvpFormPreview';
import { useFormBuilder } from '@/domains/wedding/components/rsvp/FormBuilderContext';

function RsvpPageInner() {
  const { state } = useFormBuilder();
  const activeTheme = getWeddingTheme(state.selectedThemeId);

  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-[1fr_480px]">
      {/* Left: Builder (embyte design system) */}
      <div className="border-r border-border p-6 sm:p-8 lg:p-10">
        <RsvpFormBuilder />
      </div>

      {/* Right: Preview (wedding theme) */}
      <ThemeProvider config={activeTheme}>
        <div className="flex items-start justify-center p-6 sm:p-8 lg:p-10">
          <div className="sticky top-8 w-full max-w-md">
            <RsvpFormPreview />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default function RsvpBuilderPage() {
  return (
    <FormBuilderProvider>
      <RsvpPageInner />
    </FormBuilderProvider>
  );
}
