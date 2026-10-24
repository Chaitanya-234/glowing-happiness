import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Database, DollarSign, TrendingUp } from 'lucide-react';

type PerformanceEstimatorProps = {
  estimates: any;
};

export default function PerformanceEstimator({ estimates }: PerformanceEstimatorProps) {
  if (!estimates) return null;

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white mb-6">
        Projected Impact
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Latency */}
        <div className="bg-black/30 p-4 rounded-lg border border-purple-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-green-400">
              <Zap size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Latency (P95)</span>
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-2xl font-bold text-white">{estimates.overall.optimizedLatencyP95}</span>
               <span className="text-sm text-purple-200/40 line-through">{estimates.overall.currentLatencyP95}</span>
            </div>
            <div className="mt-2 text-xs text-green-300 font-medium">
               {estimates.overall.improvement} Improvement
            </div>
          </div>
        </div>

        {/* Database Load */}
        <div className="bg-black/30 p-4 rounded-lg border border-purple-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <Database size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">DB Load</span>
            </div>
            <div className="text-2xl font-bold text-white">
                {estimates.databaseLoadReduction}
            </div>
            <div className="mt-2 text-xs text-blue-300 font-medium">
               Fewer queries
            </div>
          </div>
        </div>

        {/* Cost Savings */}
        <div className="bg-black/30 p-4 rounded-lg border border-purple-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-yellow-400">
              <DollarSign size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Savings</span>
            </div>
            <div className="text-2xl font-bold text-white">
                {estimates.costSavings}
            </div>
             <div className="mt-2 text-xs text-yellow-300 font-medium">
               Estimated monthly
            </div>
          </div>
        </div>

        {/* Hit Rates */}
         <div className="bg-black/30 p-4 rounded-lg border border-purple-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-purple-400">
              <TrendingUp size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Hit Rates</span>
            </div>
            <div className="space-y-1">
                {Object.entries(estimates.hitRates).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                        <span className="text-purple-200/60 capitalize">{key}:</span>
                        <span className="text-white font-mono">{String(value)}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
