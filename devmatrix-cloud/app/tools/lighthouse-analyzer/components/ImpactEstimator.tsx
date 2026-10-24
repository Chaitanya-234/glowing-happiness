'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, Users, DollarSign, BarChart } from 'lucide-react';

interface ImpactEstimatorProps {
  currentScores: any;
  estimatedScores: any;
  businessImpact: any;
  resourceRequirements: any;
}

function ScoreBar({ label, current, estimated, colorClass }: { label: string; current: number; estimated: number; colorClass: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
        <div className="flex gap-4">
          <span className="text-slate-500">{Math.round(current)}</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className={colorClass.replace('bg-', 'text-')}>{Math.round(estimated)}</span>
        </div>
      </div>
      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
        {/* Estimated Bar (Background) */}
        <motion.div
          initial={{ width: `${current}%` }}
          animate={{ width: `${estimated}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`absolute h-full opacity-30 ${colorClass}`}
        />
        {/* Current Bar (Foreground) */}
        <div
          style={{ width: `${current}%` }}
          className={`absolute h-full ${colorClass}`}
        />
      </div>
    </div>
  );
}

export function ImpactEstimator({ currentScores, estimatedScores, businessImpact, resourceRequirements }: ImpactEstimatorProps) {
  if (!estimatedScores) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Score Impact */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Projected Score Improvements
        </h3>

        <div className="space-y-6">
          <ScoreBar
            label="Performance"
            current={currentScores.performance}
            estimated={estimatedScores.performance.estimated}
            colorClass="bg-violet-500"
          />
          <ScoreBar
            label="Accessibility"
            current={currentScores.accessibility}
            estimated={estimatedScores.accessibility.estimated}
            colorClass="bg-emerald-500"
          />
          <ScoreBar
            label="Best Practices"
            current={currentScores.bestPractices}
            estimated={estimatedScores.bestPractices.estimated}
            colorClass="bg-amber-500"
          />
          <ScoreBar
            label="SEO"
            current={currentScores.seo}
            estimated={estimatedScores.seo.estimated}
            colorClass="bg-blue-500"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-sm">
             <span className="text-slate-500">Confidence Level</span>
             <span className="font-semibold text-emerald-600 dark:text-emerald-400">High (Based on Next.js benchmarks)</span>
          </div>
        </div>
      </div>

      {/* Business Impact */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-violet-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <Zap className="w-48 h-48" />
          </div>
          <h3 className="text-lg font-semibold text-violet-100 mb-1">Estimated Business Value</h3>
          <div className="text-4xl font-bold mb-6">{businessImpact.estimatedConversionLift || '2-5%'} Lift</div>

          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-violet-200 mb-1 text-sm">
                <Clock className="w-4 h-4" /> Load Time
              </div>
              <div className="text-xl font-bold">-{businessImpact.pageLoadImprovement || '0.5s'}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-violet-200 mb-1 text-sm">
                <Users className="w-4 h-4" /> Bounce Rate
              </div>
              <div className="text-xl font-bold">-{businessImpact.bounceRateReduction || '5%'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart className="w-4 h-4 text-slate-400" />
            Resource Estimation
          </h4>
          <div className="flex flex-wrap gap-4 text-sm">
             <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <span className="block text-slate-500 text-xs mb-1">Development Time</span>
                <span className="font-medium text-slate-900 dark:text-white">{resourceRequirements.totalDevelopmentHours}</span>
             </div>
             <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <span className="block text-slate-500 text-xs mb-1">Est. Cost</span>
                <span className="font-medium text-slate-900 dark:text-white">{resourceRequirements.estimatedCost}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icon
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
