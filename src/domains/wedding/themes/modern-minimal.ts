import type { ThemeConfig } from '@/shared/theme/types';

export const modernMinimal = {
  id: 'modern-minimal',
  name: 'Modern Minimal',
  domain: 'wedding',
  preview: {
    borderColor: '#1A1A1A',
    label: 'Stark & Geometric',
    description: 'Near-monochrome with sharp angles, stripped to pure essentials',
    swatch: { bg: '#FFFFFF', accent: '#1A1A1A', text: '#0A0A0A' },
  },
  colors: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    accent: '#8A8A8A',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceElevated: '#F5F5F5',
    text: '#0A0A0A',
    textSecondary: '#6A6A6A',
    textInverse: '#FFFFFF',
    border: '#E0E0E0',
    borderFocus: '#1A1A1A',
    success: '#2A6A2A',
    warning: '#8A8A8A',
    error: '#B52020',
  },
  typography: {
    headingFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    bodyFamily: 'var(--font-source-sans), system-ui, sans-serif',
    monoFamily: 'var(--font-geist-mono), monospace',
    headingWeight: '700',
    bodyWeight: '400',
  },
  radius: { sm: '0px', md: '2px', lg: '4px', xl: '6px', full: '999px' },
  decoration: {
    fieldSeparator: 'none' as const,
    frameStyle: 'none' as const,
  },
} satisfies ThemeConfig;
