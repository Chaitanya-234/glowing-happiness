import React from 'react';
import { z } from 'zod';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';
import { Scale, TrendingUp, AlertCircle } from 'lucide-react';

type ComparisonData = z.infer<typeof LossFunctionDesignerSchema>['comparison'];

interface ComparisonTableProps {
  comparison: ComparisonData;
}

export default function ComparisonTable({ comparison }: ComparisonTableProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Scale className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          Comparison with Standard Losses
        </h3>

        {/* Feature Comparison Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-xs">
              <tr>
                {comparison.comparisonTable.headers.map((header, idx) => (
                  <th key={idx} className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 first:pl-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {comparison.comparisonTable.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`px-4 py-3 text-slate-700 dark:text-slate-300 ${cellIdx === 0 ? 'font-medium pl-2' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Comparison Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {comparison.withStandardLosses.map((item, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-900 dark:text-white">{item.lossName}</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="block font-medium text-slate-500 dark:text-slate-400 mb-1">Performance:</span>
                  <p className="text-slate-700 dark:text-slate-300">{item.performance}</p>
                </div>

                <div>
                  <span className="block font-medium text-slate-500 dark:text-slate-400 mb-1">When Better:</span>
                  <p className="text-slate-700 dark:text-slate-300">{item.whenBetter}</p>
                </div>

                <div className="flex items-start gap-1.5 text-violet-600 dark:text-violet-400 font-medium bg-white dark:bg-slate-800 p-2 rounded border border-violet-100 dark:border-violet-900/30">
                  <TrendingUp className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>{item.expectedGap}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
