'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const COMMON_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full-stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Machine Learning Engineer',
  'Mobile Developer (iOS)',
  'Mobile Developer (Android)',
  'QA Automation Engineer',
  'Security Engineer',
  'Site Reliability Engineer',
  'Engineering Manager'
];

export function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-purple-200">Target Role <span className="text-purple-400">*</span></label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Select or type a role..."
          list="roles-list"
          className={`w-full bg-purple-900/10 border rounded-lg pl-10 pr-4 py-3 text-purple-100 placeholder-purple-400/30 focus:outline-none focus:border-purple-500/50 transition-colors ${
            error ? 'border-red-500/50' : 'border-purple-500/20'
          }`}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400/50 w-5 h-5" />
      </div>

      <datalist id="roles-list">
        {COMMON_ROLES.map(role => (
            <option key={role} value={role} />
        ))}
      </datalist>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

      <div className="flex flex-wrap gap-2 mt-2">
        {COMMON_ROLES.slice(0, 4).map(role => (
            <button
                key={role}
                type="button"
                onClick={() => onChange(role)}
                className="text-xs bg-purple-900/20 text-purple-300 border border-purple-500/10 px-2 py-1 rounded hover:bg-purple-800/40 hover:text-purple-100 transition-colors"
            >
                {role}
            </button>
        ))}
      </div>
    </div>
  );
}
