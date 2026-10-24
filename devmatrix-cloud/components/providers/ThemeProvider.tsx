'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeId, BLOG_THEMES, BlogTheme } from '@/lib/themes/blog-themes';

interface ThemeContextType {
  currentTheme: BlogTheme;
  themeId: ThemeId;
  setTheme: (themeId: ThemeId) => void;
  availableThemes: typeof BLOG_THEMES;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('blog_theme') as ThemeId;
    if (saved && BLOG_THEMES[saved]) {
      setThemeId(saved);
    }
  }, []);

  const setTheme = (newThemeId: ThemeId) => {
    setThemeId(newThemeId);
    if (mounted) {
      localStorage.setItem('blog_theme', newThemeId);
    }
  };

  const currentTheme = BLOG_THEMES[themeId];

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        setTheme,
        availableThemes: BLOG_THEMES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
