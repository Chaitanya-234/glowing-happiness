'use client';

import { Check, Star, Zap, Clock, HardDrive } from 'lucide-react';

interface Model {
  rank: number;
  name: string;
  size: string;
  category: string;
  expectedAccuracy: string;
  trainingTime: string;
  inferenceLatency: string;
  memoryRequired: string;
  pros: string[];
  cons: string[];
  whenToUse: string;
  code: string;
}

interface ModelRecommendationProps {
  models: Model[];
}

export default function ModelRecommendation({ models }: ModelRecommendationProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {models.map((model) => (
        <div
          key={model.name}
          className={`relative flex flex-col p-6 rounded-2xl border-2 ${
            model.rank === 1
              ? 'border-blue-500 dark:border-purple-500 bg-blue-50/30 dark:bg-purple-900/40 ring-4 ring-blue-50 dark:ring-purple-900/20'
              : 'border-gray-200 dark:border-purple-500/20 bg-white dark:bg-purple-900/10'
          }`}
        >
          {model.rank === 1 && (
            <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 dark:bg-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Top Recommendation
            </div>
          )}

          <div className="mb-4">
            <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-purple-900/40 text-gray-600 dark:text-purple-300 text-xs rounded-md mb-2 font-medium">
              {model.category}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-purple-100">{model.name}</h3>
            <p className="text-sm text-gray-500 dark:text-purple-200/50">{model.size}</p>
          </div>

          <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-purple-200/70 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" /> Accuracy
              </span>
              <span className="font-semibold text-gray-900 dark:text-purple-100">{model.expectedAccuracy}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-purple-200/70 flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" /> Latency
              </span>
              <span className="font-semibold text-gray-900 dark:text-purple-100">{model.inferenceLatency}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-purple-200/70 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500 dark:text-purple-400" /> Training
              </span>
              <span className="font-semibold text-gray-900 dark:text-purple-100">{model.trainingTime}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-purple-200/70 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-gray-500 dark:text-purple-400" /> Memory
              </span>
              <span className="font-semibold text-gray-900 dark:text-purple-100">{model.memoryRequired}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-900 dark:text-purple-100 uppercase tracking-wider mb-2">Pros</h4>
              <ul className="space-y-1">
                {model.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="text-xs text-gray-600 dark:text-purple-200/70 flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-purple-500/20">
              <p className="text-xs text-gray-500 dark:text-purple-200/50 leading-relaxed">
                <span className="font-semibold text-gray-900 dark:text-purple-100">Verdict: </span>
                {model.whenToUse}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
