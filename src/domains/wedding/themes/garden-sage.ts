import type { ThemeConfig } from '@/shared/theme/types';

export const gardenSage = {
  id: 'garden-sage',
  name: 'Garden Sage',
  domain: 'wedding',
  preview: {
    borderColor: '#7A9E7E',
    label: 'Organic & Earthy',
    description: 'Sage greens and warm cream with natural textures, garden-inspired warmth',
    swatch: { bg: '#F0F4EC', accent: '#5B7F5E', text: '#2D3B2D' },
  },
  colors: {
    primary: '#5B7F5E',
    secondary: '#A8C5AB',
    accent: '#7A9E7E',
    background: '#F0F4EC',
    surface: '#F7FAF5',
    surfaceElevated: '#FFFFFF',
    text: '#2D3B2D',
    textSecondary: '#6B7F6B',
    textInverse: '#FFFFFF',
    border: '#C4D8C0',
    borderFocus: '#5B7F5E',
    success: '#4A7A4E',
    warning: '#C4A84C',
    error: '#8B4040',
  },
  typography: {
    headingFamily: 'var(--font-lora), Georgia, serif',
    bodyFamily: 'var(--font-source-sans), system-ui, sans-serif',
    monoFamily: 'var(--font-geist-mono), monospace',
    headingWeight: '600',
    bodyWeight: '400',
  },
  radius: { sm: '6px', md: '12px', lg: '18px', xl: '28px', full: '999px' },
  decoration: {
    cornerAsset: '/wedding/leaves.png',
    cornerOpacity: '0.2',
    fieldSeparator: 'ornament' as const,
    frameStyle: 'single' as const,
  },
} satisfies ThemeConfig;
