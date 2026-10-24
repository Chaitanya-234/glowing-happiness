'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Loss Function Designer Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-4">
        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
      <p className="text-slate-600 dark:text-slate-300 max-w-md mb-6">
        We encountered an error while loading the AI Loss Function Designer. This might be due to a network issue or a temporary service disruption.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-violet-200 dark:shadow-violet-900/20"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </button>
      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left text-xs text-red-600 dark:text-red-400 overflow-auto max-w-2xl">
          {error.message}
          {error.stack}
        </pre>
      )}
    </div>
  );
}
