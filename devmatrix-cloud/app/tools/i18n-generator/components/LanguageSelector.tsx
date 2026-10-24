'use client';

import React from 'react';
import { Check, Search, Plus } from 'lucide-react';
import { I18nConfig } from '../actions';

interface LanguageSelectorProps {
  config: I18nConfig;
  setConfig: (config: I18nConfig) => void;
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', rtl: true },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱', rtl: true },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
];

export default function LanguageSelector({ config, setConfig }: LanguageSelectorProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const toggleLanguage = (code: string) => {
    const newTargets = config.targetLanguages.includes(code)
      ? config.targetLanguages.filter((l) => l !== code)
      : [...config.targetLanguages, code];

    // Check if any RTL language is selected
    const hasRtl = newTargets.some(t => LANGUAGES.find(l => l.code === t)?.rtl);

    setConfig({
      ...config,
      targetLanguages: newTargets,
      features: { ...config.features, rtl: hasRtl }
    });
  };

  const filteredLanguages = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Source Language
        </label>
        <select
          value={config.sourceLanguage}
          onChange={(e) => setConfig({ ...config, sourceLanguage: e.target.value })}
          className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Target Languages
        </label>

        <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
                type="text"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-1">
          {filteredLanguages.map((lang) => {
            const isSelected = config.targetLanguages.includes(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.code)}
                className={`flex items-center gap-2 p-2 rounded-lg text-sm border transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.name}</span>
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
