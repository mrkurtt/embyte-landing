'use client';

import { useState } from 'react';
import { Trash2, Copy, Asterisk } from 'lucide-react';
import { useFormBuilder, type CustomField } from './FormBuilderContext';

interface FieldTypeOption {
  value: CustomField['type'];
  label: string;
  group: string;
}

const FIELD_TYPES: FieldTypeOption[] = [
  { value: 'text', label: 'Short answer', group: 'Text' },
  { value: 'email', label: 'Email', group: 'Text' },
  { value: 'number', label: 'Number', group: 'Text' },
  { value: 'textarea', label: 'Paragraph', group: 'Text' },
  { value: 'radio', label: 'Multiple choice', group: 'Choice' },
  { value: 'checkbox', label: 'Checkboxes', group: 'Choice' },
  { value: 'select', label: 'Dropdown', group: 'Choice' },
];

function FieldPreview({ type }: { type: CustomField['type'] }) {
  switch (type) {
    case 'textarea':
      return (
        <div className="rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
          Long answer text
        </div>
      );
    case 'select':
      return (
        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
          <span>Choose</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      );
    case 'radio':
      return (
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
            <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-border/60" />
            Option 1
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
            <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-border/60" />
            Option 2
          </div>
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
            <span className="h-3.5 w-3.5 shrink-0 rounded border border-border/60" />
            Option 1
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
            <span className="h-3.5 w-3.5 shrink-0 rounded border border-border/60" />
            Option 2
          </div>
        </div>
      );
    case 'email':
      return (
        <div className="rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
          you@email.com
        </div>
      );
    case 'number':
      return (
        <div className="rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
          0
        </div>
      );
    default:
      return (
        <div className="rounded-lg border border-border/50 bg-white/[0.02] px-3 py-2 text-sm text-muted/30">
          Answer
        </div>
      );
  }
}

interface DynamicFieldRowProps {
  field: CustomField;
}

export function DynamicFieldRow({ field }: DynamicFieldRowProps) {
  const { dispatch } = useFormBuilder();
  const [focused, setFocused] = useState(false);

  const groupedTypes = FIELD_TYPES.reduce<Record<string, FieldTypeOption[]>>((acc, t) => {
    (acc[t.group] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div
      className={[
        'group animate-fade-in-up rounded-xl border bg-white/[0.02] transition-all duration-200',
        focused
          ? 'border-[#ff7e5f]/40 shadow-md shadow-[#ff7e5f]/5'
          : 'border-border hover:border-border-strong',
      ].join(' ')}
    >
      {/* Top bar: type selector + toolbar */}
      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2">
        <select
          value={field.type}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_FIELD',
              id: field.id,
              updates: { type: e.target.value as CustomField['type'] },
            })
          }
          className="rounded-lg border border-border bg-white/[0.05] px-2 py-1 text-xs font-medium text-foreground transition-colors duration-200 focus-visible:border-[#ff7e5f]/50 focus-visible:outline-none"
        >
          {Object.entries(groupedTypes).map(([group, types]) => (
            <optgroup key={group} label={group}>
              {types.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <div className="flex-1" />

        {/* Toolbar */}
        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={() =>
              dispatch({ type: 'UPDATE_FIELD', id: field.id, updates: { required: !field.required } })
            }
            className={[
              'flex h-7 w-7 items-center justify-center rounded-lg transition-colors duration-200',
              field.required
                ? 'text-[#ff7e5f]'
                : 'text-muted/40 hover:bg-white/5 hover:text-muted',
            ].join(' ')}
            aria-label={field.required ? 'Mark as optional' : 'Mark as required'}
            title={field.required ? 'Required' : 'Optional'}
          >
            <Asterisk className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'DUPLICATE_FIELD', id: field.id })}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted/40 transition-colors duration-200 hover:bg-white/5 hover:text-muted"
            aria-label="Duplicate field"
            title="Duplicate"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'REMOVE_FIELD', id: field.id })}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted/40 transition-colors duration-200 hover:bg-[#EF4444]/10 hover:text-[#EF4444]"
            aria-label="Delete field"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Field label input */}
      <div className="px-4 pt-3 pb-2">
        <input
          type="text"
          value={field.label}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_FIELD',
              id: field.id,
              updates: { label: e.target.value },
            })
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Field label"
          className="w-full border-b border-border bg-transparent py-1.5 text-sm font-medium text-foreground placeholder:text-muted/40 transition-colors duration-200 focus:border-[#ff7e5f]/50 focus:outline-none"
        />
      </div>

      {/* Placeholder preview */}
      <div className="px-4 pb-3">
        <FieldPreview type={field.type} />
      </div>
    </div>
  );
}
