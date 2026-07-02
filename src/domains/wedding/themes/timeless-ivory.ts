import type { ThemeConfig } from '@/shared/theme/types';

export const timelessIvory = {
  id: 'timeless-ivory',
  name: 'Timeless Ivory',
  domain: 'wedding',
  preview: {
    borderColor: '#8B7D6B',
    label: 'Refined & Crisp',
    description: 'Warm ivory and charcoal with sharp lines, understated sophistication',
    swatch: { bg: '#FAF6EF', accent: '#5A5044', text: '#1A1A1A' },
  },
  colors: {
    primary: '#5A5044',
    secondary: '#1A1A1A',
    accent: '#8B7D6B',
    background: '#FAF6EF',
    surface: '#FFFFFF',
    surfaceElevated: '#F5F1EA',
    text: '#1A1A1A',
    textSecondary: '#6E6660',
    textInverse: '#FFFFFF',
    border: '#D8D0C4',
    borderFocus: '#5A5044',
    success: '#4A6A4A',
    warning: '#8B7D6B',
    error: '#8B3A3A',
  },
  typography: {
    headingFamily: 'var(--font-libre), Georgia, serif',
    bodyFamily: 'var(--font-source-sans), system-ui, sans-serif',
    monoFamily: 'var(--font-geist-mono), monospace',
    headingWeight: '700',
    bodyWeight: '400',
  },
  radius: { sm: '2px', md: '4px', lg: '8px', xl: '12px', full: '999px' },
  decoration: {
    fieldSeparator: 'line' as const,
    frameStyle: 'single' as const,
  },
} satisfies ThemeConfig;
