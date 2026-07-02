'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTheme } from '@/shared/theme/useTheme';

export function SubmissionConfirm() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div className="mx-auto max-w-md text-center">
      <div
        className={`transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: theme.colors.accent }}
        >
          <CheckCircle className="h-8 w-8" style={{ color: theme.colors.primary }} />
        </div>
        <h1
          className="text-3xl font-bold text-[var(--theme-text)]"
          style={{ fontFamily: 'var(--theme-font-heading)' }}
        >
          Thank you
        </h1>
        <p className="mt-3 text-lg text-[var(--theme-text-secondary)]">
          Your RSVP has been received. We look forward to celebrating with you.
        </p>
      </div>
    </div>
  );
}
