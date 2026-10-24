'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, ArrowRight } from 'lucide-react';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

export function UrlInput({ onUrlSubmit }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    // In this tool, we don't run Lighthouse live (requires headless browser).
    // So we just pass the URL up, but the parent might prompt for upload.
    onUrlSubmit(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Globe className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          placeholder="Enter website URL (e.g., https://devmetrix.com)"
          className={`w-full pl-12 pr-32 py-4 bg-white dark:bg-slate-800 border-2 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all shadow-lg ${
            error
              ? 'border-red-500 focus:border-red-500 shadow-red-500/10'
              : 'border-slate-200 dark:border-slate-700 focus:border-violet-500 dark:focus:border-violet-400 focus:shadow-violet-500/20'
          }`}
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-6 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>Start</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-red-500 text-sm mt-2 ml-2"
        >
          {error}
        </motion.p>
      )}

      <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-4">
        Note: For deep AI analysis, please run Lighthouse locally and upload the JSON report below.
      </p>
    </motion.div>
  );
}
