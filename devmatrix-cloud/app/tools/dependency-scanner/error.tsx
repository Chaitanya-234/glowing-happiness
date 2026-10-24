'use client';

import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

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
    <div className="min-h-screen bg-[#0B1120] pt-24 pb-12 flex flex-col items-center justify-center p-6">
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center max-w-lg">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-gray-400 mb-6">
          We couldn't initialize the dependency scanner. This might be due to a temporary service interruption.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
