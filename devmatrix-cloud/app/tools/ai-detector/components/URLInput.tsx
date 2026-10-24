'use client';

import { useState } from 'react';
import { Globe, Link as LinkIcon, AlertCircle, ArrowRight } from 'lucide-react';

interface URLInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function URLInput({ onAnalyze, isLoading }: URLInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = async () => {
    if (!url) return;
    setError('');

    try {
        new URL(url);
    } catch {
        setError('Please enter a valid URL (e.g., https://example.com/article)');
        return;
    }

    setIsFetching(true);

    // Simulation of fetching for now as we don't have a backend proxy set up in this step
    setTimeout(() => {
        setIsFetching(false);
        setError("Direct URL analysis requires a server-side proxy which is currently under maintenance. Please copy and paste the article text for the best results.");
    }, 1500);
  };

  return (
     <div className="w-full max-w-2xl mx-auto space-y-6 py-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 mb-2">
            <Globe className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Analyze from URL</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
            Enter a link to a blog post, article, or news story.
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <LinkIcon className="h-5 w-5" />
        </div>
        <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="block w-full pl-10 pr-32 py-4 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm transition-shadow shadow-sm"
            placeholder="https://example.com/article-to-check"
            disabled={isLoading || isFetching}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
                onClick={handleFetch}
                disabled={isLoading || isFetching || !url}
                className="bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {isFetching ? 'Fetching...' : <>Fetch <ArrowRight className="w-3 h-3" /></>}
            </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-sm border border-amber-200 dark:border-amber-800/50">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
        </div>
      )}

      <div className="text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
              Note: Works best with public articles. Paywalled content cannot be accessed.
          </p>
      </div>
    </div>
  );
}
