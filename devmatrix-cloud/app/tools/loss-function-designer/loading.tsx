import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <Loader2 className="h-10 w-10 text-violet-600 animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Loading Loss Function Designer...</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mt-2">
        Preparing AI models and mathematical engines.
      </p>
    </div>
  );
}
