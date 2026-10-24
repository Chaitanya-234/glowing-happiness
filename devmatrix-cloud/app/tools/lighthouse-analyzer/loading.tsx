import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-black">
      <Loader2 className="w-12 h-12 text-violet-600 animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Loading Analyzer...</h2>
    </div>
  );
}
