'use client';

import { useFormBuilder } from './FormBuilderContext';
import { useTheme } from '@/shared/theme/useTheme';
import { PreviewHeader } from './preview/PreviewHeader';
import { PreviewCoverImage } from './preview/PreviewCoverImage';
import { PreviewFields } from './preview/PreviewFields';
import { PreviewSubmit } from './preview/PreviewSubmit';

export function RsvpFormPreview() {
  const { state } = useFormBuilder();
  const theme = useTheme();

  const displayDate = state.eventDate
    ? new Date(state.eventDate + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Date';

  const deco = theme.decoration;
  const hasCorners = !!deco.cornerAsset;
  const hasDivider = !!deco.dividerAsset;
  const hasFrame = deco.frameStyle !== 'none';

  return (
    <div className="mx-auto w-full">
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
        Live Preview
      </p>

      {/* Outer frame wrapper */}
      <div className={`relative overflow-hidden ${hasFrame ? 'p-3 sm:p-4' : ''}`}>
        {/* Decorative corner assets */}
        {hasCorners && (
          <>
            <img
              src={deco.cornerAsset!}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-2 h-28 w-28 mix-blend-multiply transition-opacity duration-300"
              style={{ opacity: deco.cornerOpacity ?? '0.3' }}
            />
            <img
              src={deco.cornerAsset!}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 scale-x-[-1] mix-blend-multiply transition-opacity duration-300"
              style={{ opacity: deco.cornerOpacity ?? '0.3' }}
            />
            <img
              src={deco.cornerAsset!}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -bottom-2 h-28 w-28 rotate-[-90deg] mix-blend-multiply transition-opacity duration-300"
              style={{ opacity: deco.cornerOpacity ?? '0.3' }}
            />
            <img
              src={deco.cornerAsset!}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -bottom-2 h-28 w-28 rotate-[90deg] scale-x-[-1] mix-blend-multiply transition-opacity duration-300"
              style={{ opacity: deco.cornerOpacity ?? '0.3' }}
            />
          </>
        )}

        {/* Inner card with frame */}
        <div
          className={`bg-[var(--theme-surface)] transition-colors duration-300 ${
            hasFrame
              ? deco.frameStyle === 'double'
                ? 'rounded-2xl border-2 border-[var(--theme-border)]/40 p-[1px]'
                : 'rounded-2xl border border-[var(--theme-border)]'
              : 'rounded-none border-none'
          }`}
        >
          <div
            className={`transition-colors duration-300 ${
              hasFrame
                ? deco.frameStyle === 'double'
                  ? 'overflow-hidden rounded-[14px] border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl'
                  : 'overflow-hidden rounded-[14px] border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-lg'
                : ''
            }`}
          >
            <PreviewHeader
              partner1={state.partner1Name}
              partner2={state.partner2Name}
              date={displayDate}
            />

            {/* Divider after header */}
            {hasDivider && (
              <div className="flex items-center justify-center gap-2 px-8 -mt-1 mb-1">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent transition-colors duration-300" />
                <img
                  src={deco.dividerAsset!}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-auto transition-opacity duration-300"
                  style={{ opacity: deco.dividerOpacity ?? '0.4' }}
                />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent transition-colors duration-300" />
              </div>
            )}

            <PreviewCoverImage url={state.coverImageUrl} />

            <div className="px-5 sm:px-6">
              <PreviewFields fields={state.customFields} />
            </div>

            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <PreviewSubmit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
