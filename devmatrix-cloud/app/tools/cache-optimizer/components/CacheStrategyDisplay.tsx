import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CacheLayerCard from './CacheLayerCard';
import PerformanceEstimator from './PerformanceEstimator';
import CodeGenerator from './CodeGenerator';
import MonitoringSetup from './MonitoringSetup';
import { Layers, Code, Activity, RefreshCw } from 'lucide-react';

type CacheStrategyDisplayProps = {
  strategy: any;
  onReset: () => void;
};

export default function CacheStrategyDisplay({ strategy, onReset }: CacheStrategyDisplayProps) {
  const [activeTab, setActiveTab] = useState<'strategy' | 'code' | 'monitoring'>('strategy');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">
            Optimized Strategy
        </h2>
        <button
            onClick={onReset}
            className="flex items-center gap-2 text-sm text-purple-300 hover:text-white transition-colors"
        >
            <RefreshCw size={14} />
            Start Over
        </button>
      </div>

      <PerformanceEstimator estimates={strategy.performanceEstimates} />

      {/* Tabs */}
      <div className="flex border-b border-purple-500/20">
        <button
            onClick={() => setActiveTab('strategy')}
            className={`px-6 py-3 font-semibold text-sm flex items-center gap-2 transition-all ${
                activeTab === 'strategy'
                ? 'text-purple-100 border-b-2 border-purple-500'
                : 'text-purple-200/60 hover:text-purple-200'
            }`}
        >
            <Layers size={16} />
            Strategy Layers
        </button>
         <button
            onClick={() => setActiveTab('code')}
            className={`px-6 py-3 font-semibold text-sm flex items-center gap-2 transition-all ${
                activeTab === 'code'
                ? 'text-purple-100 border-b-2 border-purple-500'
                : 'text-purple-200/60 hover:text-purple-200'
            }`}
        >
            <Code size={16} />
            Implementation
        </button>
         <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-6 py-3 font-semibold text-sm flex items-center gap-2 transition-all ${
                activeTab === 'monitoring'
                ? 'text-purple-100 border-b-2 border-purple-500'
                : 'text-purple-200/60 hover:text-purple-200'
            }`}
        >
            <Activity size={16} />
            Monitoring
        </button>
      </div>

      <div className="pt-4">
        {activeTab === 'strategy' && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    {strategy.cacheStrategy.layers.map((layer: any, index: number) => (
                        <CacheLayerCard key={index} layer={layer} index={index} />
                    ))}
                </div>

                {/* Invalidation Strategy */}
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 mt-8">
                    <h3 className="text-lg font-bold text-purple-100 mb-4">Invalidation Strategy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {strategy.invalidationStrategy.approaches.map((approach: any, i: number) => (
                             <div key={i} className="bg-black/20 p-4 rounded border border-purple-500/10">
                                <div className="text-xs font-semibold text-purple-400 uppercase mb-1">{approach.dataType}</div>
                                <div className="text-sm font-bold text-purple-100 mb-1">{approach.strategy}</div>
                                <div className="text-xs text-purple-200/60 mb-2">TTL: {approach.ttl}</div>
                                <p className="text-xs text-purple-200/40 italic">{approach.reasoning}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Best Practices */}
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-purple-100 mb-4">Best Practices</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {strategy.bestPractices.map((practice: string, i: number) => (
                             <li key={i} className="flex items-start gap-2 text-sm text-purple-200/80">
                                <span className="text-green-400 mt-1">•</span>
                                {practice}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}

        {activeTab === 'code' && (
            <CodeGenerator implementation={strategy.implementation} />
        )}

        {activeTab === 'monitoring' && (
            <MonitoringSetup monitoring={strategy.monitoring} />
        )}
      </div>
    </div>
  );
}
