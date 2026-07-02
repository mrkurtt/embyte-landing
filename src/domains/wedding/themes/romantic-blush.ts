import type { ThemeConfig } from '@/shared/theme/types';

export const romanticBlush = {
  id: 'romantic-blush',
  name: 'Romantic Blush',
  domain: 'wedding',
  preview: {
    borderColor: '#C49A6C',
    label: 'Soft & Dreamy',
    description: 'Blush pinks and rose gold with flowing serifs, for an ethereal celebration',
    swatch: { bg: '#FDF0EC', accent: '#C49A6C', text: '#5A3A3A' },
  },
  colors: {
    primary: '#C49A6C',
    secondary: '#E8C4B8',
    accent: '#B76E79',
    background: '#FDF0EC',
    surface: '#FFF8F5',
    surfaceElevated: '#FFFFFF',
    text: '#5A3A3A',
    textSecondary: '#9A7A7A',
    textInverse: '#FFFFFF',
    border: '#F0D4C8',
    borderFocus: '#C49A6C',
    success: '#7A9E7A',
    warning: '#D4A878',
    error: '#C45A5A',
  },
  typography: {
    headingFamily: 'var(--font-cormorant), Georgia, serif',
    bodyFamily: 'var(--font-nunito), system-ui, sans-serif',
    monoFamily: 'var(--font-geist-mono), monospace',
    headingWeight: '500',
    bodyWeight: '300',
  },
  radius: { sm: '16px', md: '24px', lg: '32px', xl: '40px', full: '999px' },
  decoration: {
    dividerAsset: '/wedding/divider.png',
    dividerOpacity: '0.25',
    fieldSeparator: 'dots' as const,
    frameStyle: 'single' as const,
  },
} satisfies ThemeConfig;
