'use client';

import { Check, Copy, Server, Cloud, Cpu, Box } from 'lucide-react';
import { useState } from 'react';

interface DeploymentStrategy {
  recommended: string;
  alternatives: string[];
  optimization: {
    quantization: string;
    batchInference: string;
    caching: string;
  };
  scalability: {
    expectedQPS: string;
    autoScaling: string;
    loadBalancing: string;
  };
  apiCode: string;
}

interface DeploymentGuideProps {
  strategy: DeploymentStrategy;
}

export default function DeploymentGuide({ strategy }: DeploymentGuideProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(strategy.apiCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-purple-900/10 p-6 rounded-xl border border-gray-200 dark:border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-purple-100">Recommended Architecture</h3>
          </div>
          <p className="text-lg font-medium text-gray-900 dark:text-purple-50 mb-2">{strategy.recommended}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {strategy.alternatives.map((alt) => (
              <span key={alt} className="px-3 py-1 bg-gray-100 dark:bg-purple-900/20 text-gray-600 dark:text-purple-200/80 rounded-full text-xs font-medium">
                Alt: {alt}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-purple-900/10 p-6 rounded-xl border border-gray-200 dark:border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-purple-100">Optimization Strategy</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-purple-200/70">
              <Box className="w-4 h-4 text-purple-500 mt-0.5" />
              <span><span className="font-medium text-gray-900 dark:text-purple-100">Quantization:</span> {strategy.optimization.quantization}</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-purple-200/70">
              <Box className="w-4 h-4 text-purple-500 mt-0.5" />
              <span><span className="font-medium text-gray-900 dark:text-purple-100">Batching:</span> {strategy.optimization.batchInference}</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-purple-200/70">
              <Box className="w-4 h-4 text-purple-500 mt-0.5" />
              <span><span className="font-medium text-gray-900 dark:text-purple-100">Caching:</span> {strategy.optimization.caching}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 dark:bg-black/80 rounded-xl overflow-hidden shadow-lg border border-transparent dark:border-purple-500/30">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 dark:bg-purple-900/20 border-b border-gray-700 dark:border-purple-500/30">
          <span className="text-sm font-medium text-gray-300 dark:text-purple-200/80">FastAPI Deployment Code</span>
          <button
            onClick={copyCode}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm text-gray-300 dark:text-purple-100/90 font-mono">
            <code>{strategy.apiCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
