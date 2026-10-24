'use client';

import { useState } from 'react';
import { Loader2, ArrowRight, Target, AlertTriangle, Lightbulb } from 'lucide-react';
import { findResearchGaps } from '../actions';
import { toast } from 'sonner';

interface ResearchGapFinderProps {
  papers: any[];
}

export default function ResearchGapFinder({ papers }: ResearchGapFinderProps) {
  const [loading, setLoading] = useState(false);
  const [gaps, setGaps] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!papers || papers.length < 2) {
      toast.error("Please analyze at least 2 papers to identify gaps across literature.");
      return;
    }

    setLoading(true);
    try {
        const result = await findResearchGaps(papers);
        if (result.success) {
            setGaps(result.data);
            toast.success("Research gaps identified!");
        } else {
            toast.error(result.error || "Failed to identify gaps");
        }
    } catch (err) {
        toast.error("An error occurred during analysis.");
    } finally {
        setLoading(false);
    }
  };

  if (!gaps && !loading) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <Target className="w-16 h-16 text-violet-200 dark:text-violet-800 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Identify Research Gaps</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
                  Select papers from your library to automatically find methodological flaws, missing perspectives, and new opportunities.
              </p>
              <button
                onClick={handleAnalyze}
                disabled={papers.length < 2}
                className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  Analyze {papers.length} Papers
              </button>
              {papers.length < 2 && (
                  <p className="text-xs text-amber-500 mt-2">Need at least 2 papers</p>
              )}
          </div>
      );
  }

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <Loader2 className="w-12 h-12 text-violet-500 animate-spin mb-4" />
              <p className="text-slate-600 dark:text-slate-300 font-medium">Analyzing literature for gaps...</p>
              <p className="text-sm text-slate-500 mt-1">Comparing methodologies and findings</p>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="bg-violet-50 dark:bg-violet-900/10 p-4 rounded-xl border border-violet-100 dark:border-violet-800/30">
          <h3 className="font-semibold text-violet-900 dark:text-violet-100 flex items-center gap-2">
              <Target className="w-5 h-5" /> Gap Analysis Report
          </h3>
          <p className="text-sm text-violet-700 dark:text-violet-300 mt-1">
              Based on {papers.length} papers. Use these insights to formulate your research question.
          </p>
      </div>

      <div className="grid gap-4">
          {gaps.researchGaps.map((gap: any, i: number) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              gap.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                              gap.severity === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                              {gap.severity} Severity
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {gap.gapType} Gap
                          </span>
                      </div>
                  </div>

                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      {gap.description}
                  </h4>

                  <div className="mt-4 space-y-3">
                      <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                              <Lightbulb className="w-3 h-3" /> Opportunities
                          </p>
                          <ul className="space-y-1">
                              {gap.opportunities.map((opp: string, j: number) => (
                                  <li key={j} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-500 shrink-0" />
                                      {opp}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
          <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Strategic Recommendations</h4>
          <ul className="space-y-2">
              {gaps.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-emerald-800 dark:text-emerald-200">
                      <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" />
                      {rec}
                  </li>
              ))}
          </ul>
      </div>
    </div>
  );
}
