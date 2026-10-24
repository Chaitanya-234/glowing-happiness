// src/theme/ThemeProvider.tsx
'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DEFAULT_THEME, STORAGE_KEY, ThemeName, darkThemes, themeNames } from './theme';

const ThemeContext = createContext<{ theme: ThemeName; setTheme: (t: ThemeName) => void } | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const current = document.documentElement.dataset.theme as ThemeName;
    if (themeNames.includes(current)) setThemeState(current);
  }, []);

  const setTheme = useCallback((t: ThemeName) => {
    const el = document.documentElement;
    el.dataset.theme = t;
    el.classList.toggle('dark', darkThemes.includes(t)); // keeps old dark: classes working
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
    setThemeState(t);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}