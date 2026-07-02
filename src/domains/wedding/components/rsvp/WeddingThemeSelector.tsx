'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useFormBuilder } from './FormBuilderContext';
import { weddingThemes } from '@/domains/wedding/themes';

export function WeddingThemeSelector() {
  const { state, dispatch } = useFormBuilder();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(() =>
    weddingThemes.findIndex((t) => t.id === state.selectedThemeId),
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const scroll = (direction: 'left' | 'right') => {
    const next = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
    if (next >= 0 && next < weddingThemes.length) {
      scrollTo(next);
    }
  };

  const selectTheme = (themeId: string, index: number) => {
    dispatch({ type: 'SET_FIELD', field: 'selectedThemeId', value: themeId });
    setActiveIndex(index);
  };

  return (
    <div>
      <label className="mb-3 block text-xs font-medium uppercase tracking-[0.10em] text-foreground">
        Choose Theme
      </label>

      <div className="relative overflow-hidden px-6">
        {/* Navigation arrows */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm text-muted transition-all duration-200 hover:bg-white/10 hover:text-foreground"
            aria-label="Previous theme"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm text-muted transition-all duration-200 hover:bg-white/10 hover:text-foreground"
            aria-label="Next theme"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        {/* Scrollable strip — 2 cards visible */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth py-1 [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:appearance-none [&::-webkit-scrollbar]:w-0"
        >
          {weddingThemes.map((theme, i) => {
            const isSelected = theme.id === state.selectedThemeId;
            const { swatch } = theme.preview;
            if (!swatch) return null;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => selectTheme(theme.id, i)}
                className={[
                  'group relative flex-shrink-0 snap-start overflow-hidden rounded-xl border-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7e5f]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  'w-[calc((100%-12px)/2)]',
                  isSelected
                    ? 'shadow-lg ring-1'
                    : 'border-border hover:border-muted/30 hover:shadow-md',
                ].join(' ')}
                style={{
                  borderColor: isSelected ? theme.preview.borderColor : undefined,
                  boxShadow: isSelected ? `0 0 0 1px ${theme.preview.borderColor}` : undefined,
                }}
              >
                {/* Theme preview strip */}
                <div
                  className="relative flex h-24 items-end px-4 pb-3"
                  style={{ backgroundColor: swatch.bg }}
                >
                  <div
                    className="absolute right-0 top-0 h-24 w-24 opacity-[0.07]"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${swatch.accent}, transparent 70%)`,
                    }}
                  />
                  <div className="relative z-10 flex items-baseline gap-2">
                    <span
                      className="text-xl font-bold leading-none tracking-tight"
                      style={{
                        color: swatch.text,
                        fontFamily: theme.typography.headingFamily,
                      }}
                    >
                      A & B
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-widest"
                      style={{ color: swatch.accent }}
                    >
                      {theme.typography.headingWeight === '700' ? 'Serif' : 'Sans'}
                    </span>
                  </div>
                </div>

                {/* Theme info */}
                <div className="flex items-start justify-between bg-white/[0.03] px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {theme.name}
                      </span>
                      <div className="flex gap-1">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-black/5"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-black/5"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-black/5"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-tight text-muted">
                      {theme.preview.description}
                    </p>
                  </div>

                  {isSelected && (
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full animate-scale-in"
                      style={{ backgroundColor: theme.preview.borderColor }}
                    >
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {weddingThemes.map((theme, i) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => scrollTo(i)}
            className={[
              'h-1.5 rounded-full transition-all duration-300',
              i === activeIndex
                ? 'w-6 bg-[#ff7e5f]'
                : 'w-1.5 bg-muted/30 hover:bg-muted/50',
            ].join(' ')}
            aria-label={`Go to ${theme.name}`}
          />
        ))}
      </div>
    </div>
  );
}
