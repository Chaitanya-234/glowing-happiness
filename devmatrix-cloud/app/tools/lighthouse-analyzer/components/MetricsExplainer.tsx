'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface MetricInfo {
  id: string;
  name: string;
  description: string;
  good: string;
  poor: string;
}

const METRICS: MetricInfo[] = [
  {
    id: 'lcp',
    name: 'Largest Contentful Paint (LCP)',
    description: 'Measures loading performance. It marks the point in the page load timeline when the page\'s main content has likely loaded.',
    good: '< 2.5s',
    poor: '> 4.0s'
  },
  {
    id: 'inp',
    name: 'Interaction to Next Paint (INP)',
    description: 'Measures responsiveness. It observes the latency of all interactions (clicks, taps, key presses) throughout the lifespan of a user\'s visit.',
    good: '< 200ms',
    poor: '> 500ms'
  },
  {
    id: 'cls',
    name: 'Cumulative Layout Shift (CLS)',
    description: 'Measures visual stability. It quantifies how much unexpected layout shift of visible page content occurs.',
    good: '< 0.1',
    poor: '> 0.25'
  },
  {
    id: 'fcp',
    name: 'First Contentful Paint (FCP)',
    description: 'Marks the time at which the first text or image is painted. Good FCP helps reassure users that the page is happening.',
    good: '< 1.8s',
    poor: '> 3.0s'
  }
];

export function MetricsExplainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700 transition-colors group"
        >
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-violet-500" />
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              {metric.name}
            </h4>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 min-h-[60px]">
            {metric.description}
          </p>

          <div className="flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-700 pt-3">
            <div className="flex flex-col">
              <span className="text-slate-400 mb-0.5">Good</span>
              <span className="font-medium text-emerald-500">{metric.good}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-slate-400 mb-0.5">Poor</span>
              <span className="font-medium text-red-500">{metric.poor}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
