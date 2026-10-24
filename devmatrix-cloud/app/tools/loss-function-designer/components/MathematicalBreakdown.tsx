import React from 'react';
import { z } from 'zod';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';
import { Sigma, ArrowRight } from 'lucide-react';

type MathBreakdown = z.infer<typeof LossFunctionDesignerSchema>['mathematicalBreakdown'];

interface MathematicalBreakdownProps {
  breakdown: MathBreakdown;
}

export default function MathematicalBreakdown({ breakdown }: MathematicalBreakdownProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Sigma className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          Mathematical Breakdown
        </h3>

        <div className="space-y-8">
          {breakdown.components.map((comp, idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-violet-200 dark:border-violet-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-violet-600 dark:bg-violet-400" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {comp.component}
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {comp.explanation}
              </p>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg mb-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Gradient Behavior
                </h5>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                  "{comp.gradientBehavior}"
                </p>
              </div>

              {comp.parameters && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(comp.parameters).map(([paramName, details]) => (
                    <div key={paramName} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-violet-600 dark:text-violet-400">
                          {paramName}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          val: {details.value}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        {details.meaning}
                      </p>
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        Tune: {details.tuningRange}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
            Combination Rationale
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 italic bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800/50">
            {breakdown.combinationRationale}
          </p>
        </div>
      </div>
    </div>
  );
}
