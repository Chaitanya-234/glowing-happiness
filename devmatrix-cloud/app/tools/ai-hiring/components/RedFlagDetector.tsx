'use client';

import React from 'react';

interface RedFlag {
  flag: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  recommendation: string;
  canBeExplained: boolean;
  possibleReasons: string[];
}

interface RedFlagDetectorProps {
  redFlags: RedFlag[];
  greenFlags: string[];
}

export default function RedFlagDetector({ redFlags, greenFlags }: RedFlagDetectorProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Risk Assessment</h3>

      <div className="space-y-6">
        {/* Red Flags Section */}
        <div>
          <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Potential Concerns ({redFlags.length})
          </h4>

          {redFlags.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No significant red flags detected.</p>
          ) : (
            <div className="space-y-3">
              {redFlags.map((flag, i) => (
                <div key={i} className={`p-3 rounded-lg border text-sm ${getSeverityColor(flag.severity)}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold flex items-center gap-2">
                      {flag.flag}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">{flag.severity}</span>
                  </div>
                  <p className="mb-2 opacity-90">{flag.description}</p>

                  {flag.canBeExplained && (
                    <div className="mt-2 text-xs bg-white/50 dark:bg-black/20 p-2 rounded">
                      <strong>Ask about:</strong> {flag.recommendation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Green Flags Section */}
        <div>
          <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Green Flags ({greenFlags.length})
          </h4>

          <ul className="space-y-2">
            {greenFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
