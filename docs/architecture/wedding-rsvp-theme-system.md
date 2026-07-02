# Wedding RSVP — Architecture & Theme System

## Overview

Embyte has three product verticals: **Nexus** (conferences, concerts), **Campus** (universities, alumni), and **Weddings** (premium event coordinators). Each vertical shares a common theme engine but owns its own theme presets and domain-specific components.

This document covers the **Wedding RSVP feature** — a two-panel builder (editor + live preview) with a theme selector carousel, adapting the theme system pattern from [BrandSheet](../../TheBrandSheet/brandsheet/src/portal/theme/).

---

## Directory Structure

```
src/
├── theme/                              # Shared theme engine (domain-agnostic)
│   ├── types.ts                        # ThemeConfig, ThemeTokens interfaces
│   ├── themeGenerator.ts               # Config → CSS custom properties
│   ├── ThemeProvider.tsx                # React context + CSS var injection
│   ├── useTheme.ts                     # Hook to read current theme
│   └── ThemeSelector.tsx               # Generic carousel picker
│
├── wedding/                            # Wedding domain
│   ├── themes/
│   │   ├── index.ts                    # Export all presets + lookup helpers
│   │   ├── rose.ts                     # Rose Garden preset
│   │   ├── ocean.ts                    # Coastal preset
│   │   └── sage.ts                     # Sage & Vine preset
│   │
│   ├── components/
│   │   ├── rsvp/
│   │   │   ├── FormBuilderContext.tsx   # Builder state (React Context)
│   │   │   ├── RsvpFormBuilder.tsx     # Left panel: editor
│   │   │   ├── RsvpFormPreview.tsx     # Right panel: live preview
│   │   │   ├── WeddingThemeSelector.tsx # Wraps shared ThemeSelector
│   │   │   ├── CoverImageUpload.tsx    # Image drop zone
│   │   │   ├── DynamicFieldRow.tsx     # Single custom field row
│   │   │   └── preview/
│   │   │       ├── PreviewHeader.tsx   # Couple name + date
│   │   │       ├── PreviewCoverImage.tsx
│   │   │       ├── PreviewFields.tsx   # Rendered form fields
│   │   │       └── PreviewSubmit.tsx
│   │   └── public-form/
│   │       ├── RsvpGuestForm.tsx       # Guest-facing form
│   │       ├── FormField.tsx           # Generic field renderer
│   │       └── SubmissionConfirm.tsx   # Thank-you state
│   │
│   └── pages/
│       ├── rsvp/
│       │   ├── page.tsx               # Builder page (/wedding/rsvp)
│       │   ├── layout.tsx
│       │   └── actions.ts             # Server actions
│       └── rsvp/[formId]/
│           ├── page.tsx               # Public guest form
│           ├── layout.tsx
│           └── submitted/
│               └── page.tsx           # Confirmation page
│
├── app/                                # Next.js app router
│   ├── layout.tsx                      # Root layout (fonts, globals)
│   ├── globals.css
│   ├── page.tsx                        # Landing page
│   └── wedding/
│       └── rsvp/
│           ├── page.tsx                # → re-exports wedding/pages/rsvp/page.tsx
│           ├── layout.tsx
│           └── [formId]/
│               ├── page.tsx
│               └── submitted/page.tsx
│
├── components/                         # Landing page components (existing)
│   └── ...
│
└── lib/
    └── mail.ts
```

---

## Theme Engine (`src/theme/`)

The theme engine is the **only shared layer** across domains. It is completely domain-agnostic — wedding, nexus, and campus all import from the same 5 files.

### Theme Contract (`types.ts`)

Every theme must implement this interface. TypeScript enforces completeness at compile time via `satisfies ThemeConfig`.

```ts
export interface ThemeColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  textInverse: string;
  border: string;
  borderFocus: string;
  success: string;
  warning: string;
  error: string;
}

export interface ThemeTypographyTokens {
  headingFamily: string;
  bodyFamily: string;
  monoFamily: string;
  headingWeight: string;
  bodyWeight: string;
}

export interface ThemeRadiusTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  domain: 'nexus' | 'campus' | 'wedding';
  preview: {
    borderColor: string;
    label: string;
  };
  colors: ThemeColorTokens;
  typography: ThemeTypographyTokens;
  radius: ThemeRadiusTokens;
}
```

### Theme Generator (`themeGenerator.ts`)

Converts a `ThemeConfig` into a flat record of CSS custom property names and values. The `ThemeProvider` applies these as inline styles on a wrapper `<div>`.

```ts
import type { ThemeConfig } from './types';

export function generateThemeVars(config: ThemeConfig): Record<string, string> {
  return {
    '--theme-primary': config.colors.primary,
    '--theme-secondary': config.colors.secondary,
    '--theme-accent': config.colors.accent,
    '--theme-bg': config.colors.background,
    '--theme-surface': config.colors.surface,
    '--theme-surface-elevated': config.colors.surfaceElevated,
    '--theme-text': config.colors.text,
    '--theme-text-secondary': config.colors.textSecondary,
    '--theme-text-inverse': config.colors.textInverse,
    '--theme-border': config.colors.border,
    '--theme-border-focus': config.colors.borderFocus,
    '--theme-success': config.colors.success,
    '--theme-warning': config.colors.warning,
    '--theme-error': config.colors.error,
    '--theme-font-heading': config.typography.headingFamily,
    '--theme-font-body': config.typography.bodyFamily,
    '--theme-font-mono': config.typography.monoFamily,
    '--theme-font-weight-heading': config.typography.headingWeight,
    '--theme-font-weight-body': config.typography.bodyWeight,
    '--theme-radius-sm': config.radius.sm,
    '--theme-radius-md': config.radius.md,
    '--theme-radius-lg': config.radius.lg,
    '--theme-radius-xl': config.radius.xl,
    '--theme-radius-full': config.radius.full,
  };
}
```

### Theme Provider (`ThemeProvider.tsx`)

React context that injects CSS custom properties into the DOM. Components read tokens via `var(--theme-*)` — they never know which theme is active.

```tsx
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { ThemeConfig } from './types';
import { generateThemeVars } from './themeGenerator';

const ThemeContext = createContext<ThemeConfig | null>(null);

interface ThemeProviderProps {
  config: ThemeConfig;
  children: React.ReactNode;
}

export function ThemeProvider({ config, children }: ThemeProviderProps) {
  const vars = useMemo(() => generateThemeVars(config), [config]);

  return (
    <ThemeContext.Provider value={config}>
      <div style={vars} data-theme={config.id}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeConfig {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
```

### Theme Selector (`ThemeSelector.tsx`)

Generic carousel component. Receives an array of presets and renders a row of selectable cards. Used by all domains.

```tsx
'use client';

import type { ThemeConfig } from './types';

interface ThemeSelectorProps {
  presets: ThemeConfig[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ThemeSelector({ presets, selectedId, onSelect }: ThemeSelectorProps) {
  return (
    <div className="flex gap-3">
      {presets.map((preset) => {
        const isSelected = preset.id === selectedId;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset.id)}
            className={[
              'group relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200',
              isSelected
                ? 'border-current shadow-lg scale-[1.02]'
                : 'border-[var(--theme-border)] hover:border-[var(--theme-border-focus)] hover:scale-[1.01]',
            ].join(' ')}
            style={{ borderColor: isSelected ? preset.preview.borderColor : undefined }}
          >
            <div className="flex gap-1.5">
              <div
                className="h-10 w-10 rounded-lg border border-black/5"
                style={{ backgroundColor: preset.colors.primary }}
              />
              <div
                className="h-10 w-10 rounded-lg border border-black/5"
                style={{ backgroundColor: preset.colors.secondary }}
              />
              <div
                className="h-10 w-10 rounded-lg border border-black/5"
                style={{ backgroundColor: preset.colors.accent }}
              />
            </div>

            <span className="text-sm font-medium text-[var(--theme-text)]">
              {preset.name}
            </span>
            <span className="text-xs text-[var(--theme-text-secondary)]">
              {preset.preview.label}
            </span>

            {isSelected && (
              <div
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white"
                style={{ backgroundColor: preset.preview.borderColor }}
              >
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
```

---

## Wedding Theme Presets (`src/wedding/themes/`)

Each preset is a static config object that satisfies `ThemeConfig`. Adding a new theme = one file + one export.

### Rose Garden (`rose.ts`)

```ts
import type { ThemeConfig } from '../../theme/types';

export const roseGarden = {
  id: 'rose',
  name: 'Rose Garden',
  domain: 'wedding',
  preview: { borderColor: '#E8A0BF', label: 'Romantic & Warm' },
  colors: {
    primary: '#E8A0BF',
    secondary: '#BA68C8',
    accent: '#F8BBD0',
    background: '#FFF8FA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFF0F5',
    text: '#2D1B33',
    textSecondary: '#7A6180',
    textInverse: '#FFFFFF',
    border: '#F0D4E0',
    borderFocus: '#E8A0BF',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#E53935',
  },
  typography: {
    headingFamily: 'var(--font-playfair), Georgia, serif',
    bodyFamily: 'var(--font-lora), Georgia, serif',
    monoFamily: 'var(--font-geist-mono), monospace',
    headingWeight: '700',
    bodyWeight: '400',
  },
  radius: { sm: '4px', md: '8px', lg: '16px', xl: '24px', full: '999px' },
} satisfies ThemeConfig;
```

### Coastal (`ocean.ts`)

```ts
import type { ThemeConfig } from '../../theme/types';

export const coastal = {
  id: 'ocean',
  name: 'Coastal',
  domain: 'wedding',
  preview: { borderColor: '#5C9CE6', label: 'Elegant & Calm' },
  colors: {
    primary: '#5C9CE6',
    secondary: '#2E86C1',
    accent: '#AED6F1',
    background: '#F8FBFF',
    surface: '#FFFFFF',
    surfaceElevated: '#EDF4FC',
    text: '#1A2A40',
    textSecondary: '#6B7D96',
    textInverse: '#FFFFFF',
    border: '#D4E4F4',
    borderFocus: '#5C9CE6',
    success: '#27AE60',
    warning: '#F39C12',
    error: '#C0392B',
  },
  typography: {
    headingFamily: 'var(--font-cormorant), Georgia, serif',
    bodyFamily: 'var(--font-source-sans), system-ui, sans-serif',
    monoFamily: 'var(--font-geist-mono), monospace',
    headingWeight: '600',
    bodyWeight: '400',
  },
  radius: { sm: '6px', md: '10px', lg: '18px', xl: '28px', full: '999px' },
} satisfies ThemeConfig;
```

### Sage & Vine (`sage.ts`)

```ts
import type { ThemeConfig } from '../../theme/types';

export const sageVine = {
  id: 'sage',
  name: 'Sage & Vine',
  domain: 'wedding',
  preview: { borderColor: '#7CB69D', label: 'Natural & Earthy' },
  colors: {
    primary: '#7CB69D',
    secondary: '#4A8B6F',
    accent: '#C8E6C9',
    background: '#F9FBF9',
    surface: '#FFFFFF',
    surfaceElevated: '#EFF6EF',
    text: '#1B2E1B',
    textSecondary: '#6B8B6B',
    textInverse: '#FFFFFF',
    border: '#D4E8D4',
    borderFocus: '#7CB69D',
    success: '#2E7D32',
    warning: '#EF6C00',
    error: '#C62828',
  },
  typography: {
    headingFamily: 'var(--font-libre), Georgia, serif',
    bodyFamily: 'var(--font-nunito), system-ui, sans-serif',
    monoFamily: 'var(--font-geist-mono), monospace',
    headingWeight: '700',
    bodyWeight: '400',
  },
  radius: { sm: '4px', md: '8px', lg: '14px', xl: '22px', full: '999px' },
} satisfies ThemeConfig;
```

### Index (`index.ts`)

```ts
export { roseGarden } from './rose';
export { coastal } from './ocean';
export { sageVine } from './sage';

import { roseGarden } from './rose';
import { coastal } from './ocean';
import { sageVine } from './sage';
import type { ThemeConfig } from '../../theme/types';

export const weddingThemes: ThemeConfig[] = [roseGarden, coastal, sageVine];

export function getWeddingTheme(id: string): ThemeConfig {
  return weddingThemes.find((t) => t.id === id) ?? roseGarden;
}
```

---

## RSVP Builder Components

### FormBuilderContext (`FormBuilderContext.tsx`)

React Context + `useReducer` managing all builder state. Single source of truth for the form being edited.

```ts
export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
}

export interface RsvpFormData {
  partner1Name: string;
  partner2Name: string;
  eventDate: string;
  selectedThemeId: string;
  coverImageUrl: string | null;
  coverImageFile: File | null;
  customFields: CustomField[];
}
```

Actions: `SET_FIELD`, `ADD_FIELD`, `UPDATE_FIELD`, `REMOVE_FIELD`, `REORDER_FIELDS`, `LOAD`.

### RsvpFormBuilder (`RsvpFormBuilder.tsx`)

Left panel editor. Contains:
- Couple name inputs (two-column grid)
- Event date input
- `WeddingThemeSelector` (wraps shared `ThemeSelector`)
- `CoverImageUpload` (drag-and-drop zone)
- `DynamicFieldRow` list + "Add Input" button

### RsvpFormPreview (`RsvpFormPreview.tsx`)

Right panel. Reads from `FormBuilderContext` and `useTheme()`. Renders a scaled-down version of the actual RSVP form using `var(--theme-*)` tokens. Purely visual — no interactivity.

Sub-components:
- `PreviewHeader` — couple names + formatted date
- `PreviewCoverImage` — uploaded image or placeholder
- `PreviewFields` — default fields (name, email, guest count) + custom fields
- `PreviewSubmit` — styled submit button

### WeddingThemeSelector (`WeddingThemeSelector.tsx`)

Thin wrapper around the shared `ThemeSelector` that:
1. Passes `weddingThemes` as presets
2. Reads `selectedThemeId` from `FormBuilderContext`
3. Dispatches `SET_FIELD` on selection

### CoverImageUpload (`CoverImageUpload.tsx`)

- Dashed-border drop zone with drag-and-drop
- File input fallback (`accept="image/*"`)
- Preview thumbnail after upload with remove button
- Stores `File` in context, uploads via server action on save

### DynamicFieldRow (`DynamicFieldRow.tsx`)

Single row for a custom form field:
- Editable label input
- Type selector dropdown (text/email/select/textarea)
- Delete button (appears on hover)
- Grip handle for reordering (phase 2)

---

## Pages

### Builder Page (`/wedding/rsvp`)

Two-panel split layout:
- Left (60%): `RsvpFormBuilder`
- Right (40%): `RsvpFormPreview` (sticky)

Wraps everything in `FormBuilderProvider` → `ThemeProvider` (theme swaps live as user selects).

```tsx
'use client';

import { ThemeProvider } from '../../theme/ThemeProvider';
import { getWeddingTheme } from '../themes';
import { FormBuilderProvider } from '../components/rsvp/FormBuilderContext';
import { RsvpFormBuilder } from '../components/rsvp/RsvpFormBuilder';
import { RsvpFormPreview } from '../components/rsvp/RsvpFormPreview';
import { useFormBuilder } from '../components/rsvp/FormBuilderContext';

function RsvpPageInner() {
  const { state } = useFormBuilder();
  const activeTheme = getWeddingTheme(state.selectedThemeId);

  return (
    <ThemeProvider config={activeTheme}>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_480px]">
        <div className="border-r border-[var(--theme-border)] bg-[var(--theme-bg)] p-6 sm:p-8 lg:p-10">
          <RsvpFormBuilder />
        </div>
        <div className="bg-[var(--theme-surface-elevated)] p-6 sm:p-8 lg:p-10">
          <div className="sticky top-8">
            <RsvpFormPreview />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default function RsvpBuilderPage() {
  return (
    <FormBuilderProvider>
      <RsvpPageInner />
    </FormBuilderProvider>
  );
}
```

### Public Guest Form (`/wedding/rsvp/[formId]`)

Loads form config from database, renders `RsvpGuestForm` inside `ThemeProvider` with the saved theme. This is the guest-facing page.

### Confirmation Page (`/wedding/rsvp/[formId]/submitted`)

Post-submission thank-you page. Shows a checkmark icon and confirmation message styled with the form's theme.

### Server Actions (`actions.ts`)

| Action | Purpose |
|--------|---------|
| `saveRsvpForm(data)` | Save form config to database, return `formId` |
| `uploadCoverImage(formData)` | Upload image to storage, return public URL |
| `submitRsvpResponse(formId, responses)` | Store guest RSVP submission |

---

## Font Loading

All wedding fonts are registered in the root layout via `next/font/google`. The theme engine only sets `font-family` via CSS variables — no `<link>` tag injection.

```tsx
// app/layout.tsx
import {
  Playfair_Display, Lora, Cormorant_Garamond,
  Source_Sans_3, Libre_Baskerville, Nunito_Sans,
} from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', display: 'swap' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', display: 'swap' });
const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], variable: '--font-libre', display: 'swap' });
const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });
```

Theme presets reference these CSS variables:

```ts
// rose.ts
typography: {
  headingFamily: 'var(--font-playfair), Georgia, serif',
  bodyFamily: 'var(--font-lora), Georgia, serif',
  // ...
}
```

---

## Styling Convention

Every component uses CSS variables from the theme. No hardcoded colors.

```tsx
// ✅ Correct
<div className="bg-[var(--theme-surface)] text-[var(--theme-text)] border border-[var(--theme-border)]">

// ❌ Wrong
<div className="bg-white text-gray-900 border border-gray-200">
```

---

## Data Model

```ts
interface RsvpFormConfig {
  id: string;
  themeId: string;
  partner1Name: string;
  partner2Name: string;
  eventDate: string;
  coverImageUrl: string | null;
  customFields: CustomField[];
  responses: RsvpResponse[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface RsvpResponse {
  id: string;
  formId: string;
  submittedAt: Timestamp;
  answers: Record<string, string>;
}
```

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Theme approach | CSS custom properties via provider | Proven pattern from brandsheet, no runtime CSS-in-JS overhead, instant theme swaps |
| Type safety | `satisfies ThemeConfig` on presets | Compiler catches missing tokens at build time, no manual audits needed |
| Font loading | `next/font/google` at layout level | Self-hosted, no FOUT, no layout shift. Theme presets reference CSS vars only |
| State management | React Context + `useReducer` | Simple enough for this scope, no external deps, easy to serialize for persistence |
| Preview rendering | Live component with CSS vars | Real-time fidelity as theme changes, not a static mockup |
| Shared components | None extracted yet | Build what wedding needs first. Extract to shared only when campus/nexus show actual overlap |
| Domain isolation | `src/wedding/` contains all wedding code | No cross-domain imports. Refactors in wedding can't break other verticals |

---

## Adding a New Wedding Theme

1. Create `src/wedding/themes/my-theme.ts`
2. Export a `const myTheme = { ... } satisfies ThemeConfig`
3. Add to the array in `src/wedding/themes/index.ts`
4. Done. The `ThemeSelector` picks it up automatically.

---

## Adding a Theme Token

1. Add to `ThemeColorTokens` or `ThemeRadiusTokens` in `src/theme/types.ts`
2. Add the CSS variable mapping in `src/theme/themeGenerator.ts`
3. Add the value to all preset files (TypeScript errors until all are updated)
4. Use `var(--theme-new-token)` in components

---

## Phased Implementation

| Phase | Scope | Depends On | Files |
|-------|-------|------------|-------|
| **1** | Theme engine (types, generator, provider, selector, hook) | Nothing | `src/theme/*` (5) |
| **2** | Wedding presets (rose, ocean, sage) | Phase 1 | `src/wedding/themes/*` (4) |
| **3** | FormBuilderContext | Phase 1 | `FormBuilderContext.tsx` (1) |
| **4** | Builder layout + all editor components | Phase 2, 3 | `RsvpFormBuilder`, `CoverImageUpload`, `DynamicFieldRow`, `WeddingThemeSelector`, builder page + layout (6) |
| **5** | Live preview | Phase 2, 3, 4 | `RsvpFormPreview`, `preview/*` (5) |
| **6** | Public form + submission | Phase 1, 2 | `[formId]/page`, `RsvpGuestForm`, `FormField`, `SubmissionConfirm`, `actions.ts`, `submitted/page` (6) |
| **7** | Route wiring + fonts | Phase 4, 5, 6 | `app/wedding/rsvp/*`, layout.tsx update (5) |

Phase 1 is the foundation. Everything else layers on top independently.

---

## File Count

| Path | Files | Purpose |
|------|-------|---------|
| `src/theme/` | 5 | Shared theme engine |
| `src/wedding/themes/` | 4 | Presets + index |
| `src/wedding/components/rsvp/` | 8 | Builder components |
| `src/wedding/components/public-form/` | 3 | Guest-facing form |
| `src/wedding/pages/rsvp/` | 3 | Builder page + actions |
| `src/wedding/pages/rsvp/[formId]/` | 2 | Public form + confirmation |
| `src/app/wedding/rsvp/` | 4 | Route re-exports |
| **Total** | **29** | |
