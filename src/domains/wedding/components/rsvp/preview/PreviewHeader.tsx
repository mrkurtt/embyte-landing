'use client';

import { useTheme } from '@/shared/theme/useTheme';

interface PreviewHeaderProps {
  partner1: string;
  partner2: string;
  date: string;
}

export function PreviewHeader({ partner1, partner2, date }: PreviewHeaderProps) {
  const theme = useTheme();
  const names =
    partner1 && partner2
      ? `${partner1} & ${partner2}`
      : 'Your Names';

  return (
    <div className="px-6 pt-8 pb-2 text-center">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--theme-text-secondary)] transition-colors duration-300">
        We&apos;re getting married
      </p>
      <h2
        className="text-3xl font-bold leading-tight text-[var(--theme-text)] transition-colors duration-300"
        style={{ fontFamily: theme.typography.headingFamily }}
      >
        {names}
      </h2>
      <span className="mt-2 inline-block text-xs tracking-wider text-[var(--theme-text-secondary)] transition-colors duration-300">
        {date}
      </span>
    </div>
  );
}
