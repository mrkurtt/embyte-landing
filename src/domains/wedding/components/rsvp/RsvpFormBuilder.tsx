'use client';

import { Plus, Lock } from 'lucide-react';
import { useFormBuilder, type CustomField } from './FormBuilderContext';
import { WeddingThemeSelector } from './WeddingThemeSelector';
import { CoverImageUpload } from './CoverImageUpload';
import { DynamicFieldRow } from './DynamicFieldRow';

const DEFAULT_FIELDS = [
  { id: '__name', label: 'Your Name', type: 'text' as const, locked: true },
  { id: '__email', label: 'Email', type: 'email' as const, locked: true },
  { id: '__attending', label: 'Will you be attending?', type: 'radio' as const, locked: true },
  { id: '__guests', label: "Who's attending?", type: 'radio' as const, locked: true },
  { id: '__plusOne', label: "Your guest's name", type: 'text' as const, locked: true },
  { id: '__meal', label: 'Meal Preference', type: 'select' as const, locked: true },
  { id: '__dietary', label: 'Dietary Restrictions', type: 'checkbox' as const, locked: true },
  { id: '__song', label: 'Song Request', type: 'text' as const, locked: true },
  { id: '__message', label: 'Message for the couple', type: 'textarea' as const, locked: true },
];

export function RsvpFormBuilder() {
  const { state, dispatch } = useFormBuilder();

  const addField = () => {
    const field: CustomField = {
      id: crypto.randomUUID(),
      label: '',
      type: 'text',
      required: false,
    };
    dispatch({ type: 'ADD_FIELD', field });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[30px] font-semibold leading-tight text-foreground">
          Create RSVP Form
        </h1>
      </div>

      {/* Couple Names */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.10em] text-foreground">
            Partner 1
          </label>
          <input
            type="text"
            value={state.partner1Name}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'partner1Name',
                value: e.target.value,
              })
            }
            placeholder="First name"
            className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors duration-200 focus-visible:border-[#ff7e5f]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7e5f]/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.10em] text-foreground">
            Partner 2
          </label>
          <input
            type="text"
            value={state.partner2Name}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'partner2Name',
                value: e.target.value,
              })
            }
            placeholder="First name"
            className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors duration-200 focus-visible:border-[#ff7e5f]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7e5f]/20"
          />
        </div>
      </div>

      {/* Event Date */}
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.10em] text-foreground">
          Event Date
        </label>
        <input
          type="date"
          value={state.eventDate}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'eventDate',
              value: e.target.value,
            })
          }
          className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground transition-colors duration-200 focus-visible:border-[#ff7e5f]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7e5f]/20"
        />
      </div>

      {/* Theme Selector */}
      <WeddingThemeSelector />

      {/* Cover Image */}
      <CoverImageUpload />

      {/* Form Fields */}
      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <label className="text-xs font-medium uppercase tracking-[0.10em] text-foreground">
            Form Fields
          </label>
          <span className="text-xs text-muted">
            {DEFAULT_FIELDS.length} built-in + {state.customFields.length} custom
          </span>
        </div>

        {/* Default (locked) fields */}
        <div className="space-y-2">
          {DEFAULT_FIELDS.map((field) => (
            <div
              key={field.id}
              className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-white/[0.02] px-3 py-2.5"
            >
              <Lock className="h-3.5 w-3.5 shrink-0 text-muted/40" />
              <span className="flex-1 truncate text-sm text-muted/70">
                {field.label}
              </span>
              <span className="shrink-0 rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted/50">
                {field.type}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        {state.customFields.length > 0 && (
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted/40">
              Custom fields
            </span>
            <div className="h-px flex-1 bg-border/50" />
          </div>
        )}

        {/* Custom (editable) fields */}
        <div className="space-y-3">
          {state.customFields.map((field) => (
            <DynamicFieldRow key={field.id} field={field} />
          ))}
        </div>

        {/* Add field button */}
        <button
          type="button"
          onClick={addField}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#ff7e5f]/30 bg-[#ff7e5f]/5 py-3.5 text-sm font-medium text-[#ff7e5f] transition-all duration-200 hover:border-[#ff7e5f]/50 hover:bg-[#ff7e5f]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7e5f]/20"
        >
          <Plus className="h-4 w-4" />
          Add field
        </button>
      </div>
    </div>
  );
}
