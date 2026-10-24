'use client';

import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface BottleneckDetectorProps {
  bottlenecks?: any[];
}

export default function BottleneckDetector({ bottlenecks }: BottleneckDetectorProps) {
  if (!bottlenecks || bottlenecks.length === 0) {
    return (
      <div className="text-center py-6 text-slate-500 text-sm">
        No critical bottlenecks detected yet.
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-900';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900';
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-900';
    }
  };

  return (
    <div className="space-y-3">
      {bottlenecks.map((issue, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-lg border text-xs ${getSeverityColor(issue.severity)}`}
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <div className="font-bold uppercase tracking-wider mb-1">
                {issue.severity} • {issue.affectedEndpoint || 'System'}
              </div>
              <p className="font-medium mb-1">{issue.description}</p>
              <p className="opacity-80 italic">{issue.suggestedInvestigation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
