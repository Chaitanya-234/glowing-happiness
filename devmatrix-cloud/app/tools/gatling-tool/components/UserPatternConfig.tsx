'use client';

import React from 'react';
import { Users, Clock, TrendingUp } from 'lucide-react';

interface UserPatternConfigProps {
  config: any;
  onChange: (config: any) => void;
  testType: string;
}

export default function UserPatternConfig({ config, onChange, testType }: UserPatternConfigProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <Users className="w-5 h-5 text-violet-500" />
        User Injection Pattern
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Total Users / Concurrent Users
          </label>
          <div className="relative">
            <input
              type="number"
              value={config.users || ''}
              onChange={(e) => handleChange('users', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder={testType === 'Load' ? 'e.g. 500' : 'e.g. 50'}
            />
            <Users className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {testType === 'Stress' ? 'Target peak users' : 'Total users to inject'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Ramp Up Duration
          </label>
          <div className="relative">
            <input
              type="text"
              value={config.rampUp || ''}
              onChange={(e) => handleChange('rampUp', e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. 2 minutes"
            />
            <TrendingUp className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Steady State Duration
          </label>
          <div className="relative">
            <input
              type="text"
              value={config.duration || ''}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. 10 minutes"
            />
            <Clock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
