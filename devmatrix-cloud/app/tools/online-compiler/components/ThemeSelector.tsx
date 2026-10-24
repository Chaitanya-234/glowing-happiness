'use client';

interface ThemeSelectorProps {
  theme: string;
  onChange: (theme: string) => void;
}

const themes = [
  { id: 'vs-dark', name: 'Dark' },
  { id: 'light', name: 'Light' },
  { id: 'hc-black', name: 'High Contrast' },
];

export default function ThemeSelector({ theme, onChange }: ThemeSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="theme-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Theme:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => onChange(e.target.value)}
        className="block w-32 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-1.5 text-base text-gray-900 dark:text-gray-100 shadow-sm focus:border-neonBlue focus:outline-none focus:ring-1 focus:ring-neonBlue sm:text-sm"
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
