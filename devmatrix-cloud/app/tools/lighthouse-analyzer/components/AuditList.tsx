'use client';

import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Audit {
  id: string;
  title: string;
  description?: string;
  score: number | null;
  displayValue?: string;
  numericValue?: number;
}

interface AuditListProps {
  audits: Audit[];
  type: 'passed' | 'warning' | 'failed';
}

export function AuditList({ audits, type }: AuditListProps) {
  const [isExpanded, setIsExpanded] = useState(type === 'failed'); // Default expand failed

  if (audits.length === 0) return null;

  const getIcon = () => {
    switch (type) {
      case 'passed': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'passed': return 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 text-emerald-900 dark:text-emerald-100';
      case 'warning': return 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20 text-amber-900 dark:text-amber-100';
      case 'failed': return 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20 text-red-900 dark:text-red-100';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'passed': return `Passed Audits (${audits.length})`;
      case 'warning': return `Opportunities & Warnings (${audits.length})`;
      case 'failed': return `Failed Audits (${audits.length})`;
    }
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${getColor()}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition-colors"
      >
        <div className="flex items-center gap-3 font-semibold">
          {getIcon()}
          <span>{getTitle()}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-black/5 dark:border-white/5"
          >
            <div className="p-2 space-y-1">
              {audits.map((audit) => (
                <div key={audit.id} className="p-3 hover:bg-black/5 rounded-lg transition-colors group">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-medium text-sm text-slate-700 dark:text-slate-200">
                      {audit.title}
                    </span>
                    {audit.displayValue && (
                      <span className="text-xs font-mono bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                        {audit.displayValue}
                      </span>
                    )}
                  </div>
                  {audit.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 group-hover:line-clamp-none transition-all">
                      {audit.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
