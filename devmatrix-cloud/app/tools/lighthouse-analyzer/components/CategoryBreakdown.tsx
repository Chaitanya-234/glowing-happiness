'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Accessibility, ShieldCheck, Search, ChevronRight } from 'lucide-react';
import { AuditList } from './AuditList';

interface CategoryBreakdownProps {
  categories: any; // Raw categories from Lighthouse JSON
  audits: any; // Raw audits from Lighthouse JSON
  aiAnalysis: any; // 'categoryAnalysis' from AI response
}

const CATEGORIES = [
  { id: 'performance', label: 'Performance', icon: Zap },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { id: 'best-practices', label: 'Best Practices', icon: ShieldCheck },
  { id: 'seo', label: 'SEO', icon: Search },
];

export function CategoryBreakdown({ categories, audits, aiAnalysis }: CategoryBreakdownProps) {
  const [activeCategory, setActiveCategory] = useState('performance');

  if (!categories || !aiAnalysis) return null;

  const currentRawCategory = categories[activeCategory];
  const currentAiAnalysis = aiAnalysis[activeCategory === 'best-practices' ? 'bestPractices' : activeCategory];

  // Helper to filter audits based on raw report refs
  const getCategoryAudits = (type: 'passed' | 'warning' | 'failed') => {
    if (!currentRawCategory || !currentRawCategory.auditRefs) return [];

    return currentRawCategory.auditRefs
      .map((ref: any) => {
        const audit = audits[ref.id];
        return { ...audit, ...ref }; // Merge ref details (group, weight) with audit details
      })
      .filter((audit: any) => {
        // Score: 1 = Passed, < 0.5 = Failed, 0.5-0.9 = Warning (Needs Improvement)
        // Lighthouse uses 0.9 as cutoff for pass usually.
        // null score usually means "not applicable" or "informational"
        if (audit.score === null) return false;

        if (type === 'passed') return audit.score >= 0.9;
        if (type === 'failed') return audit.score < 0.5;
        if (type === 'warning') return audit.score >= 0.5 && audit.score < 0.9;
        return false;
      });
  };

  const failedAudits = getCategoryAudits('failed');
  const warningAudits = getCategoryAudits('warning');
  const passedAudits = getCategoryAudits('passed');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Category Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-violet-50 dark:bg-violet-900/10 text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 dark:border-violet-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* AI Summary Section */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-violet-500" />
                AI Analysis: {currentAiAnalysis?.grade || 'Analysis'}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Top Issues Identified</h4>
                  <ul className="space-y-2">
                    {currentAiAnalysis?.topIssues?.map((issue: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-sm">
                        <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Quick Wins & Strategic Fixes</h4>
                  <ul className="space-y-2">
                    {currentAiAnalysis?.quickWins?.map((win: string, idx: number) => (
                      <li key={`win-${idx}`} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-sm">
                        <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {win}
                      </li>
                    ))}
                    {currentAiAnalysis?.strategicFixes?.map((fix: string, idx: number) => (
                      <li key={`fix-${idx}`} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-sm">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        {fix}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Raw Audits Lists */}
            <div className="space-y-4">
              <AuditList audits={failedAudits} type="failed" />
              <AuditList audits={warningAudits} type="warning" />
              <AuditList audits={passedAudits} type="passed" />
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
