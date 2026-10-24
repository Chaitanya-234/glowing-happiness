import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI i18n Generator | Internationalization Setup Tool | DevMetrix',
  description: 'Free AI-powered internationalization (i18n) generator. Automatically extract translatable strings from your code, generate translation files for 100+ languages, and set up i18next, react-intl, or next-intl. Support for pluralization, RTL languages, and automatic translation suggestions.',
  keywords: [
    'i18n generator', 'internationalization tool', 'translation generator', 'i18next setup',
    'react i18n', 'next.js i18n', 'vue i18n', 'react-intl generator',
    'extract translatable strings', 'translation file generator', 'pluralization i18n', 'RTL support',
    'multilingual app', 'localization tool', 'translation automation',
    'i18n setup', 'translation keys', 'locale files', 'language files',
    'automatic translation extraction', 'i18n code generator', 'translation file creator',
    'DevMetrix', 'developer tools', 'web development', 'frontend tools',
    'typescript i18n', 'json translation files', 'yaml translation files', 'po files',
    'app router i18n', 'server components i18n', 'client components i18n',
    'globalization', 'l10n', 'locale generator', 'language support',
    'auto translate code', 'gemini ai i18n', 'ai translation tool'
  ],
  openGraph: {
    title: 'AI i18n Generator - Automate Internationalization Setup',
    description: 'Extract strings, generate translations for 100+ languages, and set up i18n in minutes. Free tool supporting i18next, react-intl, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI i18n Generator - Automate Internationalization Setup',
    description: 'Extract strings, generate translations for 100+ languages, and set up i18n in minutes.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
