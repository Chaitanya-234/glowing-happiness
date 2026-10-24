import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Server, Globe, Database, Layers, Zap } from 'lucide-react';

type CacheLayerCardProps = {
  layer: any;
  index: number;
};

const getIcon = (technology: string) => {
  if (technology.toLowerCase().includes('cdn') || technology.toLowerCase().includes('cloud')) return <Globe className="text-blue-400" />;
  if (technology.toLowerCase().includes('redis') || technology.toLowerCase().includes('memcached')) return <Database className="text-red-400" />;
  if (technology.toLowerCase().includes('browser') || technology.toLowerCase().includes('client')) return <Layers className="text-green-400" />;
  if (technology.toLowerCase().includes('node') || technology.toLowerCase().includes('memory')) return <Server className="text-yellow-400" />;
  return <Zap className="text-purple-400" />;
};

export default function CacheLayerCard({ layer, index }: CacheLayerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-purple-900/10 border border-purple-500/20 rounded-lg overflow-hidden"
    >
      <div
        className="p-6 cursor-pointer hover:bg-purple-900/20 transition-colors flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/10">
            {getIcon(layer.technology)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-100">{layer.layer}</h3>
            <p className="text-sm text-purple-200/60">{layer.technology}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
            <div className="text-sm font-semibold text-green-400">{layer.estimatedHitRate} Hit Rate</div>
            <div className="text-xs text-purple-200/40">Est. Improvement</div>
          </div>
           {isExpanded ? <ChevronUp className="text-purple-400" /> : <ChevronDown className="text-purple-400" />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-black/20"
          >
            <div className="p-6 border-t border-purple-500/10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <h4 className="text-sm font-semibold text-purple-200/80 mb-2 uppercase tracking-wider">Purpose</h4>
                   <p className="text-purple-100/80 text-sm leading-relaxed">{layer.purpose}</p>
                </div>
                 <div>
                   <h4 className="text-sm font-semibold text-purple-200/80 mb-2 uppercase tracking-wider">Performance Impact</h4>
                   <div className="flex gap-4">
                     <div>
                        <span className="block text-xs text-purple-200/40">Latency</span>
                        <span className="text-sm font-mono text-green-300">{layer.latencyImprovement}</span>
                     </div>
                      {layer.costSavings && (
                        <div>
                            <span className="block text-xs text-purple-200/40">Cost Savings</span>
                            <span className="text-sm font-mono text-green-300">{layer.costSavings}</span>
                        </div>
                      )}
                   </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-purple-200/80 mb-2 uppercase tracking-wider">What to Cache</h4>
                <div className="flex flex-wrap gap-2">
                    {layer.whatToCache.map((item: string, i: number) => (
                        <span key={i} className="px-2 py-1 rounded bg-purple-500/20 text-purple-200 text-xs border border-purple-500/20">
                            {item}
                        </span>
                    ))}
                </div>
              </div>

              {layer.configuration && (
                  <div>
                    <h4 className="text-sm font-semibold text-purple-200/80 mb-2 uppercase tracking-wider">Configuration</h4>
                    <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-xs text-purple-200 font-mono border border-purple-500/10">
                        {JSON.stringify(layer.configuration, null, 2)}
                    </pre>
                  </div>
              )}

               {layer.sizingRecommendation && (
                  <div>
                    <h4 className="text-sm font-semibold text-purple-200/80 mb-2 uppercase tracking-wider">Sizing</h4>
                     <p className="text-purple-100/80 text-sm leading-relaxed">{layer.sizingRecommendation}</p>
                  </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
