'use client';

import { AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';

interface Pattern {
  pattern: string;
  occurrences: number | string;
  examples: string[];
  severity: 'Low' | 'Moderate' | 'High';
  aiIndicator: boolean;
}

interface PatternAnalysisProps {
  patterns: Pattern[];
}

export default function PatternAnalysis({ patterns }: PatternAnalysisProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'Moderate': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'Low': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      default: return 'text-slate-600 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <Zap className="w-5 h-5 text-violet-500" />
        Detected Patterns
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getSeverityColor(pattern.severity)} transition-all hover:shadow-md`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{pattern.pattern}</h4>
              <span className={`text-xs px-2 py-1 rounded-full border ${pattern.aiIndicator ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                {pattern.aiIndicator ? 'AI Indicator' : 'Human Indicator'}
              </span>
            </div>

            <div className="text-sm opacity-80 mb-3">
              Occurrences: {pattern.occurrences} • Severity: {pattern.severity}
            </div>

            {pattern.examples && pattern.examples.length > 0 && (
              <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg text-xs font-mono">
                <p className="opacity-70 mb-1">Examples:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {pattern.examples.slice(0, 3).map((ex, i) => (
                    <li key={i} className="truncate">{ex}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {patterns.length === 0 && (
          <div className="col-span-full p-8 text-center text-slate-500 border border-dashed border-slate-300 rounded-xl">
            No significant patterns detected.
          </div>
        )}
      </div>
    </div>
  );
}
