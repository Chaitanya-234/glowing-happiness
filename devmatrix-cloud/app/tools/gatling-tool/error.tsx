'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          We encountered an error while loading the Gatling Tool.
        </p>

        <button
          onClick={() => reset()}
          className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
