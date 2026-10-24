'use client';

import React from 'react';
import { ExtractedString } from '../actions';
import { Globe, RefreshCw } from 'lucide-react';

interface TranslationEditorProps {
  strings: ExtractedString[];
  translations: Record<string, any>;
  setTranslations: (translations: Record<string, any>) => void;
  targetLanguages: string[];
}

export default function TranslationEditor({ strings, translations, setTranslations, targetLanguages }: TranslationEditorProps) {
  const [activeLang, setActiveLang] = React.useState(targetLanguages[0] || 'en');

  const handleTranslationChange = (key: string, value: string) => {
    setTranslations({
      ...translations,
      [activeLang]: {
        ...translations[activeLang],
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {targetLanguages.map(lang => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeLang === lang
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        {strings.map((s) => {
          const translation = translations[activeLang]?.[s.key] || '';

          return (
            <div key={s.id} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{s.key}</span>
                </div>
                <div className="text-slate-800 dark:text-slate-200">{s.original}</div>
                {s.context && <div className="text-xs text-slate-500 italic">Context: {s.context}</div>}
              </div>
              <div>
                <textarea
                  value={translation}
                  onChange={(e) => handleTranslationChange(s.key, e.target.value)}
                  placeholder={`Translate to ${activeLang}...`}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[80px]"
                  dir={['ar', 'he', 'fa', 'ur'].includes(activeLang) ? 'rtl' : 'ltr'}
                />
              </div>
            </div>
          );
        })}
        {strings.length === 0 && (
             <div className="p-8 text-center text-slate-500">
                 No strings to translate.
             </div>
        )}
      </div>
    </div>
  );
}
