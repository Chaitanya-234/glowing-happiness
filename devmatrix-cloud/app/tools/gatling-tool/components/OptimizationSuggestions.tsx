'use client';

import React from 'react';
import { Lightbulb, Check, ArrowRight } from 'lucide-react';

interface OptimizationSuggestionsProps {
  suggestions?: any[];
}

export default function OptimizationSuggestions({ suggestions }: OptimizationSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="text-center py-6 text-slate-500 text-sm">
        No suggestions available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, idx) => (
        <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
           <div className="flex items-start gap-2 mb-2">
             <div className="mt-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 p-1 rounded-full">
               <Lightbulb className="w-3 h-3" />
             </div>
             <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  {suggestion.title}
                </h4>
                <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">
                    {suggestion.category} • Priority: {suggestion.priority}
                </div>
             </div>
           </div>

           <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 pl-7">
              {suggestion.description}
           </p>

           {suggestion.implementationSteps && (
              <div className="pl-7">
                  <p className="text-[10px] font-semibold text-slate-500 mb-1">Action Plan:</p>
                  <ul className="space-y-1">
                      {suggestion.implementationSteps.map((step: string, sIdx: number) => (
                          <li key={sIdx} className="text-[10px] text-slate-600 dark:text-slate-400 flex items-start gap-1">
                             <Check className="w-2.5 h-2.5 mt-0.5 text-green-500" />
                             {step}
                          </li>
                      ))}
                  </ul>
              </div>
           )}
        </div>
      ))}
    </div>
  );
}
