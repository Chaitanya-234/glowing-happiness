'use client';

import React from 'react';
import { Lock, Key, Shield } from 'lucide-react';

interface AuthConfigProps {
  config: any;
  onChange: (config: any) => void;
}

export default function AuthConfig({ config, onChange }: AuthConfigProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const authType = config.type || 'none';

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <Lock className="w-5 h-5 text-violet-500" />
        Authentication
      </h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Auth Type
        </label>
        <select
          value={authType}
          onChange={(e) => handleChange('type', e.target.value)}
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
        >
          <option value="none">None</option>
          <option value="basic">Basic Auth</option>
          <option value="bearer">Bearer Token</option>
          <option value="oauth2">OAuth 2.0 (Client Credentials)</option>
          <option value="apikey">API Key</option>
        </select>
      </div>

      {authType === 'basic' && (
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Username"
            value={config.username || ''}
            onChange={(e) => handleChange('username', e.target.value)}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={config.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg outline-none"
          />
        </div>
      )}

      {authType === 'bearer' && (
        <div>
          <input
            type="text"
            placeholder="Token Value (or env var name)"
            value={config.token || ''}
            onChange={(e) => handleChange('token', e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg outline-none"
          />
        </div>
      )}

       {authType === 'apikey' && (
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Header Name (e.g., x-api-key)"
            value={config.keyName || ''}
            onChange={(e) => handleChange('keyName', e.target.value)}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg outline-none"
          />
          <input
            type="text"
            placeholder="Value"
            value={config.keyValue || ''}
            onChange={(e) => handleChange('keyValue', e.target.value)}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg outline-none"
          />
        </div>
      )}
    </div>
  );
}
