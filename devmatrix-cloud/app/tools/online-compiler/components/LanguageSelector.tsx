'use client';

import { languages } from '../lib/judge0-languages';

interface LanguageSelectorProps {
  selectedId: number;
  onChange: (id: number) => void;
}

export default function LanguageSelector({ selectedId, onChange }: LanguageSelectorProps) {
  // Sort languages by category then name
  const sortedLanguages = [...languages].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Language:
      </label>
      <select
        id="language-select"
        value={selectedId}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-48 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-1.5 text-base text-gray-900 dark:text-gray-100 shadow-sm focus:border-neonBlue focus:outline-none focus:ring-1 focus:ring-neonBlue sm:text-sm"
      >
        {sortedLanguages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
