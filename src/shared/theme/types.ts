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

export interface ThemeDecorationTokens {
  /** Corner asset path (top-left, mirrored for others) */
  cornerAsset?: string;
  /** Opacity for corner assets */
  cornerOpacity?: string;
  /** Header divider asset path */
  dividerAsset?: string;
  /** Opacity for divider asset */
  dividerOpacity?: string;
  /** Submit area asset path (above button) */
  submitAsset?: string;
  /** Opacity for submit asset */
  submitOpacity?: string;
  /** Field separator style: 'line' | 'dots' | 'ornament' | 'none' */
  fieldSeparator?: 'line' | 'dots' | 'ornament' | 'none';
  /** Frame border style: 'double' | 'single' | 'none' */
  frameStyle?: 'double' | 'single' | 'none';
}

export interface ThemeConfig {
  id: string;
  name: string;
  domain: 'nexus' | 'campus' | 'wedding';
  preview: {
    borderColor: string;
    label: string;
    description?: string;
    swatch?: { bg: string; accent: string; text: string };
  };
  colors: ThemeColorTokens;
  typography: ThemeTypographyTokens;
  radius: ThemeRadiusTokens;
  decoration: ThemeDecorationTokens;
}
