'use client';

import type { CustomField } from '../FormBuilderContext';
import { useTheme } from '@/shared/theme/useTheme';

interface PreviewFieldsProps {
  fields: CustomField[];
}

function FieldBlock({ children, isLast = false, separator }: { children: React.ReactNode; isLast?: boolean; separator: string }) {
  return (
    <div className="py-4">
      {children}
      {!isLast && separator !== 'none' && (
        <div className="mt-4 transition-colors duration-300">
          {separator === 'line' && (
            <div className="border-t border-[var(--theme-border)]/60" />
          )}
          {separator === 'dots' && (
            <div className="flex items-center justify-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[var(--theme-border)]" />
              <span className="h-1 w-1 rounded-full bg-[var(--theme-border)]" />
              <span className="h-1 w-1 rounded-full bg-[var(--theme-border)]" />
            </div>
          )}
          {separator === 'ornament' && (
            <div className="flex items-center justify-center gap-2">
              <div className="h-px flex-1 bg-[var(--theme-border)]/40" />
              <span className="text-[var(--theme-border)]">&#10043;</span>
              <div className="h-px flex-1 bg-[var(--theme-border)]/40" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function PreviewFields({
  fields,
}: PreviewFieldsProps) {
  const theme = useTheme();
  const separator = theme.decoration.fieldSeparator ?? 'line';

  const defaultFields = [
    { label: 'Your Name', type: 'text' as const, placeholder: 'Full name', required: true },
    { label: 'Email', type: 'email' as const, placeholder: 'you@email.com', required: true },
    { label: 'Will you be attending?', type: 'radio' as const, options: ['Joyfully accepts', 'Regretfully declines'], required: true },
    { label: 'Number of Guests', type: 'number' as const, placeholder: '1', required: true },
    { label: "Guest's Name", type: 'text' as const, placeholder: 'Full name of your plus-one', required: false },
    { label: 'Meal Preference', type: 'select' as const, options: ['Chicken', 'Beef', 'Fish', 'Vegetarian', 'Vegan'], required: true },
    { label: 'Dietary Restrictions', type: 'checkbox' as const, options: ['Gluten-free', 'Nut allergy', 'Dairy-free', 'Halal', 'Kosher', 'None', 'Other'], required: true },
    { label: 'Song Request (optional)', type: 'text' as const, placeholder: 'What song gets you on the dance floor?', required: false },
    { label: 'Message for the couple (optional)', type: 'textarea' as const, placeholder: 'A note for the couple...', required: false },
  ];

  const allFields = [...defaultFields, ...fields.map((f) => ({
    ...f,
    placeholder: f.type === 'text' ? 'Type your answer' : f.type === 'email' ? 'you@email.com' : undefined,
    required: f.required,
  }))];

  const totalFields = allFields.length;

  return (
    <div className="py-2">
      {allFields.map((field, i) => {
        const isLast = i === totalFields - 1;

        if (field.type === 'textarea') {
          return (
            <FieldBlock key={i} isLast={isLast} separator={separator}>
              <label className="mb-1 block text-sm font-medium text-[var(--theme-text)] transition-colors duration-300">
                {field.label}
                {field.required && <span className="ml-1 text-[var(--theme-error)]">*</span>}
              </label>
              <textarea
                rows={2}
                disabled
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] px-3.5 py-2.5 text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-secondary)]/40 transition-colors duration-300 resize-none"
              />
            </FieldBlock>
          );
        }

        if (field.type === 'radio') {
          return (
            <FieldBlock key={i} isLast={isLast} separator={separator}>
              <label className="mb-2 block text-sm font-medium text-[var(--theme-text)] transition-colors duration-300">
                {field.label}
                {field.required && <span className="ml-1 text-[var(--theme-error)]">*</span>}
              </label>
              <div className="flex gap-3">
                {(field.options ?? []).map((opt) => (
                  <label
                    key={opt}
                    className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] px-4 py-2.5 text-sm text-[var(--theme-text-secondary)]/60 transition-colors duration-300"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--theme-border)]" />
                    {opt}
                  </label>
                ))}
              </div>
            </FieldBlock>
          );
        }

        if (field.type === 'select') {
          return (
            <FieldBlock key={i} isLast={isLast} separator={separator}>
              <label className="mb-1 block text-sm font-medium text-[var(--theme-text)] transition-colors duration-300">
                {field.label}
                {field.required && <span className="ml-1 text-[var(--theme-error)]">*</span>}
              </label>
              <div className="flex w-full items-center justify-between rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] px-3.5 py-2.5 text-sm text-[var(--theme-text-secondary)]/40 transition-colors duration-300">
                <span>Select...</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </FieldBlock>
          );
        }

        if (field.type === 'checkbox') {
          return (
            <FieldBlock key={i} isLast={isLast} separator={separator}>
              <label className="mb-2 block text-sm font-medium text-[var(--theme-text)] transition-colors duration-300">
                {field.label}
                {field.required && <span className="ml-1 text-[var(--theme-error)]">*</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {(field.options ?? []).map((opt) => (
                  <label
                    key={opt}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] px-3 py-2 text-sm text-[var(--theme-text-secondary)]/60 transition-colors duration-300"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[var(--theme-border)]" />
                    {opt}
                  </label>
                ))}
              </div>
            </FieldBlock>
          );
        }

        // Default: text, email, number inputs
        return (
          <FieldBlock key={i} isLast={isLast} separator={separator}>
            <label className="mb-1 block text-sm font-medium text-[var(--theme-text)] transition-colors duration-300">
              {field.label}
              {field.required && <span className="ml-1 text-[var(--theme-error)]">*</span>}
            </label>
            <input
              type={field.type}
              disabled
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] px-3.5 py-2.5 text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-secondary)]/40 transition-colors duration-300"
            />
          </FieldBlock>
        );
      })}
    </div>
  );
}
