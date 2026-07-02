'use client';

import { useId, forwardRef, type InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  shake?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField({ label, error, shake, id: externalId, ...props }, ref) {
    const autoId = useId();
    const id = externalId ?? autoId;
    const errorId = `${id}-error`;

    return (
      <div className={shake ? 'animate-shake' : ''}>
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-[var(--theme-text)]"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
          className={[
            'w-full rounded-xl border bg-[var(--theme-surface)] px-4 py-3 text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-secondary)]/60 transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2',
            error
              ? 'border-[var(--theme-error)] focus-visible:ring-[var(--theme-error)]/20'
              : 'border-[var(--theme-border)] focus-visible:border-[var(--theme-border-focus)] focus-visible:ring-[var(--theme-border-focus)]/20',
          ].join(' ')}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1 text-xs text-[var(--theme-error)]">
            {error}
          </p>
        )}
      </div>
    );
  },
);

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  shake?: boolean;
}

export function RadioGroup({ label, name, options, value, onChange, error, shake }: RadioGroupProps) {
  const autoId = useId();
  const errorId = `${autoId}-error`;

  return (
    <div className={shake ? 'animate-shake' : ''}>
      <p className="mb-2 text-sm font-medium text-[var(--theme-text)]">{label}</p>
      <div
        role="group"
        aria-describedby={error ? errorId : undefined}
        className="flex gap-3"
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={[
              'flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200',
              value === opt.value
                ? 'border-[var(--theme-border-focus)] bg-[var(--theme-border-focus)]/10 text-[var(--theme-text)]'
                : 'border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-border-focus)]/30',
            ].join(' ')}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-[var(--theme-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  shake?: boolean;
}

export function SelectField({ label, value, onChange, options, placeholder, error, shake }: SelectFieldProps) {
  const autoId = useId();
  const selectId = `${autoId}-select`;
  const errorId = `${autoId}-error`;

  return (
    <div className={shake ? 'animate-shake' : ''}>
      <label
        htmlFor={selectId}
        className="mb-1.5 block text-sm font-medium text-[var(--theme-text)]"
      >
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          'w-full appearance-none rounded-xl border bg-[var(--theme-surface)] px-4 py-3 text-sm text-[var(--theme-text)] transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2',
          !value ? 'text-[var(--theme-text-secondary)]/60' : '',
          error
            ? 'border-[var(--theme-error)] focus-visible:ring-[var(--theme-error)]/20'
            : 'border-[var(--theme-border)] focus-visible:border-[var(--theme-border-focus)] focus-visible:ring-[var(--theme-border-focus)]/20',
        ].join(' ')}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238B95A8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em',
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-[var(--theme-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  error?: string;
  shake?: boolean;
}

export function CheckboxGroup({
  label,
  options,
  values,
  onChange,
  otherValue,
  onOtherChange,
  error,
  shake,
}: CheckboxGroupProps) {
  const autoId = useId();
  const groupId = `${autoId}-group`;
  const errorId = `${autoId}-error`;

  function toggle(val: string) {
    if (val === 'none') {
      onChange(values.includes('none') ? [] : ['none']);
      return;
    }
    const next = values.filter((v) => v !== 'none');
    if (next.includes(val)) {
      onChange(next.filter((v) => v !== val));
    } else {
      onChange([...next, val]);
    }
  }

  const hasNone = values.includes('none');

  return (
    <div className={shake ? 'animate-shake' : ''}>
      <p className="mb-2 text-sm font-medium text-[var(--theme-text)]">{label}</p>
      <div
        id={groupId}
        role="group"
        aria-describedby={error ? errorId : undefined}
        className="flex flex-wrap gap-2"
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={[
              'cursor-pointer rounded-xl border px-3 py-2 text-sm transition-all duration-200',
              (values.includes(opt.value) && !hasNone) || (opt.value === 'none' && hasNone)
                ? 'border-[var(--theme-border-focus)] bg-[var(--theme-border-focus)]/10 text-[var(--theme-text)]'
                : 'border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-border-focus)]/30',
            ].join(' ')}
          >
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {values.includes('other') && onOtherChange && (
        <input
          type="text"
          value={otherValue ?? ''}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Please specify..."
          className="mt-2 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-secondary)]/60 transition-colors duration-200 focus-visible:border-[var(--theme-border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]/20"
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-[var(--theme-error)]">
          {error}
        </p>
      )}
    </div>
  );
}
