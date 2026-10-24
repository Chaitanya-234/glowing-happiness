'use client';
import { themeLabels, themeNames } from '@/styles/theme/theme';
import { useTheme } from '@/styles/theme/ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div role="radiogroup" aria-label="Theme" className="flex items-center gap-1 p-1 rounded-full bg-surface/10 border border-border/20">
      {themeNames.map((name) => (
        <button
          key={name}
          role="radio"
          aria-checked={theme === name}
          onClick={() => setTheme(name)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
            theme === name ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground hover:bg-surface/15'
          }`}
        >
          {themeLabels[name]}
        </button>
      ))}
    </div>
  );
}