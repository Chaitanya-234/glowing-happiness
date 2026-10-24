import React, { Suspense } from 'react';
import { LighthouseClient } from './components/LighthouseClient';
import { LighthouseGuide } from './components/LighthouseGuide';

export default function LighthouseAnalyzerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-violet-100/50 to-transparent dark:from-violet-900/20 dark:to-transparent pointer-events-none" />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Analyzer...</div>}>
          <LighthouseClient />
        </Suspense>

        <section className="mt-24 border-t border-slate-200 dark:border-slate-800 pt-16">
          <LighthouseGuide />
        </section>
      </main>
    </div>
  );
}
