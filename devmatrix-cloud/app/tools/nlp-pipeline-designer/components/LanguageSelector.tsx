'use client';

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
  'Arabic', 'Hindi', 'Portuguese', 'Russian', 'Italian', 'Korean', 'Multilingual'
];

const DOMAINS = [
  'General', 'Medical/Healthcare', 'Legal', 'Financial',
  'Scientific/Academic', 'Social Media', 'Technical/Code', 'Conversational'
];

interface LanguageSelectorProps {
  data: any;
  onChange: (data: any) => void;
}

export default function LanguageSelector({ data, onChange }: LanguageSelectorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-1">
          Primary Language
        </label>
        <select
          value={data.language}
          onChange={(e) => updateField('language', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-purple-100"
        >
          <option value="">Select language...</option>
          {LANGUAGES.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-1">
          Target Domain
        </label>
        <div className="grid grid-cols-2 gap-3">
          {DOMAINS.map((domain) => (
            <button
              key={domain}
              onClick={() => updateField('domain', domain)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                data.domain === domain
                  ? 'bg-blue-50 dark:bg-purple-900/30 border-blue-500 dark:border-purple-500 text-blue-700 dark:text-purple-300 font-medium'
                  : 'bg-white dark:bg-purple-900/5 border-gray-200 dark:border-purple-500/20 hover:border-blue-300 dark:hover:border-purple-500/50 text-gray-700 dark:text-purple-200'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
