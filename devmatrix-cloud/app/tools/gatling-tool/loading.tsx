import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Loader2 className="w-12 h-12 animate-spin text-violet-600 mb-4" />
      <h2 className="text-xl font-semibold">Loading Gatling Tool...</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">Preparing the AI environment</p>
    </div>
  );
}
