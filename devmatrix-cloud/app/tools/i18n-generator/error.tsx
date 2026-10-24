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
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Something went wrong!
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md text-center mb-6">
        {error.message || 'An error occurred while loading the application. Please try again.'}
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
