'use client';

import React from 'react';
import { I18nConfig } from '../actions';
import { Settings, Globe, Code, FileCode } from 'lucide-react';

interface ConfigPanelProps {
  config: I18nConfig;
  setConfig: (config: I18nConfig) => void;
}

export default function ConfigPanel({ config, setConfig }: ConfigPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-white mb-4">
          <Globe className="w-5 h-5 text-blue-500" />
          i18n Library
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { id: 'i18next', name: 'i18next / react-i18next', desc: 'Most popular, rich ecosystem' },
            { id: 'react-intl', name: 'react-intl', desc: 'Standard format, strong community' },
            { id: 'next-intl', name: 'next-intl', desc: 'Optimized for Next.js App Router' },
            { id: 'vue-i18n', name: 'vue-i18n', desc: 'Standard for Vue.js apps' },
          ].map((lib) => (
            <button
              key={lib.id}
              onClick={() => setConfig({ ...config, library: lib.id as any })}
              className={`p-4 text-left rounded-xl border-2 transition-all ${
                config.library === lib.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="font-medium text-slate-900 dark:text-white">{lib.name}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{lib.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-white mb-4">
          <Settings className="w-5 h-5 text-purple-500" />
          Features
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Pluralization Support</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Handle "1 item" vs "2 items" cases</div>
            </div>
            <input
              type="checkbox"
              checked={config.features.pluralization}
              onChange={(e) => setConfig({ ...config, features: { ...config.features, pluralization: e.target.checked } })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">RTL Support</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Automatic CSS for Arabic/Hebrew</div>
            </div>
            <input
              type="checkbox"
              checked={config.features.rtl}
              onChange={(e) => setConfig({ ...config, features: { ...config.features, rtl: e.target.checked } })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Use Namespaces</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Group translations (common.json, auth.json)</div>
            </div>
            <input
              type="checkbox"
              checked={config.features.namespaces}
              onChange={(e) => setConfig({ ...config, features: { ...config.features, namespaces: e.target.checked } })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-white mb-4">
          <FileCode className="w-5 h-5 text-green-500" />
          Output Format
        </h3>
        <div className="flex gap-4">
            {['json', 'yaml', 'po'].map((fmt) => (
                <label key={fmt} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="outputFormat"
                        value={fmt}
                        checked={config.outputFormat === fmt}
                        onChange={(e) => setConfig({ ...config, outputFormat: e.target.value as any })}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="uppercase text-sm font-medium text-slate-700 dark:text-slate-300">{fmt}</span>
                </label>
            ))}
        </div>
      </div>
    </div>
  );
}
