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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-24 px-4">
      <div className="bg-purple-900/10 border border-red-500/20 rounded-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/10 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-purple-200/60 mb-8">
          We encountered an error while loading the tool. Please try again.
        </p>

        <button
          onClick={reset}
          className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}
