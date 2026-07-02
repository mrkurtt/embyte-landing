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
      <div style={vars} data-theme={config.id} className="min-h-inherit">
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
