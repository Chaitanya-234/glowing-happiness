import React from 'react';
import { z } from 'zod';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';
import { Scale, BarChart2, GitMerge } from 'lucide-react';

type MultiTaskData = z.infer<typeof LossFunctionDesignerSchema>['multiTaskWeighting'];

interface WeightSuggestionsProps {
  multiTaskWeighting: MultiTaskData;
}

export default function WeightSuggestions({ multiTaskWeighting }: WeightSuggestionsProps) {
  if (!multiTaskWeighting) return null;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <GitMerge className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        Multi-Task Weighting Strategy
      </h3>

      <div className="space-y-6">
        {multiTaskWeighting.weightRecommendations && (
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Initial Weight Recommendations
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {multiTaskWeighting.weightRecommendations.map((rec: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Task {idx + 1}</span>
                    <span className="text-xs font-mono bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 px-2 py-0.5 rounded">
                      w = {rec.weight || rec.value || 'N/A'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{rec.justification || rec.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {multiTaskWeighting.strategies && (
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Dynamic Weighting Strategies
            </h4>
            <div className="space-y-3">
              {multiTaskWeighting.strategies.map((strategy: any, idx: number) => (
                <div key={idx} className="flex gap-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                  <div className="mt-1 p-1.5 bg-violet-100 dark:bg-violet-900/30 rounded text-violet-600 dark:text-violet-400">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-slate-200 text-sm">{strategy.name || strategy.strategy}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{strategy.description}</p>
                    {strategy.whenToUse && (
                      <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">Best for: {strategy.whenToUse}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
