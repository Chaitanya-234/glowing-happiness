import React from 'react';
import { z } from 'zod';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';
import { BookOpen, CheckCircle, XCircle, AlertTriangle, Activity, Settings } from 'lucide-react';

type UsageData = z.infer<typeof LossFunctionDesignerSchema>['usageGuidance'];

interface UsageGuideProps {
  guidance: UsageData;
}

export default function UsageGuide({ guidance }: UsageGuideProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        {/* When to Use / Not to Use */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Applicability
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Recommended When:
              </h4>
              <ul className="space-y-1 pl-1">
                {guidance.whenToUse.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Avoid When:
              </h4>
              <ul className="space-y-1 pl-1">
                {guidance.whenNotToUse.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Hyperparameter Tuning */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Hyperparameter Tuning
          </h3>

          <div className="space-y-4">
            <div className="bg-violet-50 dark:bg-violet-900/10 p-3 rounded-lg border border-violet-100 dark:border-violet-900/30 text-sm text-violet-800 dark:text-violet-200">
              <strong>Strategy:</strong> {guidance.hyperparameterTuning.tuningWorkflow}
            </div>

            <div className="space-y-3">
              {guidance.hyperparameterTuning.priority.map((param, idx) => (
                <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{param.parameter}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      param.importance.toLowerCase() === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {param.importance} Importance
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                    Try: <span className="font-mono">{param.tuningStrategy}</span>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    Impact: {param.expectedImpact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Implementation Steps */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Integration Steps
          </h3>
          <ol className="space-y-3 relative border-l border-slate-200 dark:border-slate-700 ml-2">
            {guidance.implementationSteps.map((step, idx) => (
              <li key={idx} className="pl-6 relative">
                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-800" />
                <span className="text-sm text-slate-700 dark:text-slate-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Common Issues */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Troubleshooting
          </h3>

          <div className="space-y-4">
            {guidance.commonIssues.map((issue, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{issue.issue}</h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Potential Causes:</span>
                    <p className="text-slate-700 dark:text-slate-300">{issue.causes.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-green-600 dark:text-green-400 font-medium">Solutions:</span>
                    <ul className="list-disc list-inside text-slate-700 dark:text-slate-300">
                      {issue.solutions.map((sol, i) => <li key={i}>{sol}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
