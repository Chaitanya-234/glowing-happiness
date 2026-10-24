import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Loading AI i18n Generator...
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        Preparing internationalization tools
      </p>
    </div>
  );
}
