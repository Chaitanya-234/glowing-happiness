'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

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
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full text-red-600 dark:text-red-400">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Something went wrong!</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        We encountered an error while loading the tool. This might be due to a temporary service disruption.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
