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
                ? 'shadow-lg scale-[1.02]'
                : 'border-[var(--theme-border)] hover:border-[var(--theme-border-focus)] hover:scale-[1.01]',
            ].join(' ')}
            style={{
              borderColor: isSelected ? preset.preview.borderColor : undefined,
            }}
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
