'use client';

import { useTheme } from '@/shared/theme/useTheme';

export function PreviewSubmit() {
  const theme = useTheme();
  const deco = theme.decoration;
  const hasSubmitAsset = !!deco.submitAsset;

  return (
    <div className="mt-5 text-center">
      {hasSubmitAsset && (
        <img
          src={deco.submitAsset!}
          alt=""
          aria-hidden="true"
          className="pointer-events-none mx-auto mb-3 h-10 w-auto transition-opacity duration-300"
          style={{ opacity: deco.submitOpacity ?? '0.5' }}
        />
      )}
      <button
        type="button"
        disabled
        className="w-full rounded-full py-3 text-sm font-semibold tracking-wide text-white opacity-60 cursor-not-allowed transition-colors duration-200"
        style={{ backgroundColor: theme.colors.primary }}
      >
        Send RSVP
      </button>
    </div>
  );
}
