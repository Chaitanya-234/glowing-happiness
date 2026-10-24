'use client';

import React from 'react';
import { Gauge } from 'lucide-react';

interface ThrottleConfigProps {
  config: any;
  onChange: (config: any) => void;
}

export default function ThrottleConfig({ config, onChange }: ThrottleConfigProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const enabled = config.enabled || false;

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-violet-500" />
          Throttling (RPS)
        </h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
        </label>
      </div>

      {enabled && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Target Requests Per Second
            </label>
            <input
              type="number"
              value={config.targetRps || ''}
              onChange={(e) => handleChange('targetRps', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. 100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Hold Duration
            </label>
            <input
              type="text"
              value={config.holdFor || ''}
              onChange={(e) => handleChange('holdFor', e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. 10 minutes"
            />
          </div>
        </div>
      )}
    </div>
  );
}
