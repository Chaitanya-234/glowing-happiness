import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-24">
      <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">Loading Cache Optimizer...</h2>
      <p className="text-purple-200/60">Preparing the AI environment</p>
    </div>
  );
}
