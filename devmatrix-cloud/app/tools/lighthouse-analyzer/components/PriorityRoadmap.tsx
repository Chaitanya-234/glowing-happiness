'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, BarChart } from 'lucide-react';

interface Phase {
  title: string;
  timeline: string;
  tasks: string[];
  estimatedHours: string;
  impact: string;
}

interface PriorityRoadmapProps {
  quickWins: string[];
  strategicFixes: string[];
  recommendations: any[]; // Used to calculate specific tasks
}

export function PriorityRoadmap({ quickWins, strategicFixes, recommendations }: PriorityRoadmapProps) {
  // Mocking phases logic based on props
  const phases: Phase[] = [
    {
      title: 'Phase 1: Quick Wins',
      timeline: 'Week 1',
      tasks: quickWins.slice(0, 5),
      estimatedHours: '4-8 hours',
      impact: 'High ROI'
    },
    {
      title: 'Phase 2: Deep Optimization',
      timeline: 'Week 2-3',
      tasks: strategicFixes.slice(0, 5),
      estimatedHours: '15-20 hours',
      impact: 'Core Metrics'
    },
    {
      title: 'Phase 3: Architecture',
      timeline: 'Week 4+',
      tasks: strategicFixes.slice(5, 10).length > 0 ? strategicFixes.slice(5, 10) : ['Code splitting review', 'Server components migration', 'Third-party audit'],
      estimatedHours: '20+ hours',
      impact: 'Long-term Stability'
    }
  ];

  return (
    <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-8 space-y-12 my-8">
      {phases.map((phase, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative pl-8 md:pl-12"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-violet-500 shadow-sm" />

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {phase.title}
                </h3>
                <p className="text-violet-600 dark:text-violet-400 font-medium text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Estimated Timeline: {phase.timeline}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  {phase.estimatedHours}
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                  <BarChart className="w-3.5 h-3.5" />
                  {phase.impact}
                </div>
              </div>
            </div>

            <ul className="grid md:grid-cols-2 gap-4">
              {phase.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  {task}
                </li>
              ))}
              {phase.tasks.length === 0 && (
                <li className="text-slate-400 italic text-sm">No specific tasks identified for this phase.</li>
              )}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
