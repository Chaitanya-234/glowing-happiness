'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, AlertOctagon, Star, Zap, Accessibility, ShieldCheck, Search } from 'lucide-react';
import { CodeSuggestions } from './CodeSuggestions';

interface Recommendation {
  id: string;
  priority: number;
  category: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  businessImpact: number;
  implementationEffort: number;
  estimatedScoreImprovement: number;
  problem: string;
  whyItMatters: string;
  rootCause: string;
  solution: string;
  implementationSteps: string[];
  beforeAfter: {
    before: string;
    after: string;
  };
  estimatedTime: string;
  verification: string;
  tags: string[];
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
}

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(recommendations[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('performance')) return <Zap className="w-4 h-4" />;
    if (lower.includes('access')) return <Accessibility className="w-4 h-4" />;
    if (lower.includes('seo')) return <Search className="w-4 h-4" />;
    return <ShieldCheck className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`bg-white dark:bg-slate-900 rounded-xl border transition-all duration-200 ${
            expandedId === rec.id
              ? 'border-violet-500 shadow-lg shadow-violet-500/10'
              : 'border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700'
          }`}
        >
          <button
            onClick={() => toggleExpand(rec.id)}
            className="w-full text-left p-6 focus:outline-none"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center gap-2 mt-1">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-400 text-sm">
                    #{index + 1}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getSeverityColor(rec.severity)}`}>
                      {rec.severity}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                      {getCategoryIcon(rec.category)}
                      {rec.category}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      +{rec.estimatedScoreImprovement} Points Potential
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {rec.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500 pl-12 md:pl-0">
                <div className="flex flex-col md:items-end">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-slate-900 dark:text-white">{rec.businessImpact}/10</span>
                  </div>
                  <span className="text-xs">Business Impact</span>
                </div>

                <div className="flex flex-col md:items-end">
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="w-4 h-4 text-violet-500" />
                    <span className="font-medium text-slate-900 dark:text-white">{rec.estimatedTime}</span>
                  </div>
                  <span className="text-xs">Est. Time</span>
                </div>

                <div className="md:hidden">
                   {expandedId === rec.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>
          </button>

          <AnimatePresence>
            {expandedId === rec.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
              >
                <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 dark:bg-slate-900/50">
                  {/* Problem & Impact Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Problem</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {rec.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Why It Matters</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {rec.whyItMatters}
                      </p>
                    </div>
                  </div>

                  {/* Solution Steps */}
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Implementation Plan</h4>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                      <ul className="space-y-3">
                        {rec.implementationSteps.map((step, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-slate-700 dark:text-slate-200">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Code Snippets */}
                  {(rec.beforeAfter.before || rec.beforeAfter.after) && (
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Code Pattern</h4>
                      <CodeSuggestions
                        before={rec.beforeAfter.before}
                        after={rec.beforeAfter.after}
                      />
                    </div>
                  )}

                  {/* Verification */}
                  <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
                    <AlertOctagon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 text-sm mb-1">
                        How to Verify Fix
                      </h4>
                      <p className="text-sm text-emerald-800 dark:text-emerald-200/80">
                        {rec.verification}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
