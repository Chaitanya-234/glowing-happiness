'use client';

import { FileText, List, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';

interface PaperSummarizerProps {
  analysis: any; // ResearchPaperSchema
}

export default function PaperSummarizer({ analysis }: PaperSummarizerProps) {
  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-violet-50 dark:bg-violet-900/10 p-5 rounded-xl border border-violet-100 dark:border-violet-800/30">
        <h3 className="font-semibold text-violet-900 dark:text-violet-100 flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5" /> Executive Summary
        </h3>
        <p className="text-violet-800 dark:text-violet-200 leading-relaxed text-sm">
          {analysis.aiAnalysis.executiveSummary}
        </p>
      </div>

      {/* Key Findings */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-emerald-500" /> Key Findings
        </h3>
        <ul className="space-y-3">
          {analysis.aiAnalysis.keyFindings.map((finding: string, i: number) => (
            <li key={i} className="flex items-start gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Methodology */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
          <List className="w-5 h-5 text-blue-500" /> Methodology
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {analysis.aiAnalysis.methodology}
        </p>
      </div>

      {/* Grid: Limitations & Future Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
          <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Limitations
          </h4>
          <ul className="space-y-2">
            {analysis.aiAnalysis.limitations.map((lim: string, i: number) => (
              <li key={i} className="text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                <span className="mt-1 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                {lim}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Future Work
          </h4>
          <ul className="space-y-2">
            {analysis.aiAnalysis.futureWork.map((fw: string, i: number) => (
              <li key={i} className="text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2">
                <span className="mt-1 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                {fw}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
