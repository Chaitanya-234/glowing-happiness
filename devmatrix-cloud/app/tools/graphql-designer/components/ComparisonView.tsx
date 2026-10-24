'use client';

import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Check, X } from 'lucide-react';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;
type Comparison = SchemaType['comparison'];

interface ComparisonViewProps {
  comparison: Comparison;
}

export default function ComparisonView({ comparison }: ComparisonViewProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <p className="text-gray-500 text-sm mb-1">API Calls Reduced</p>
          <p className="text-3xl font-bold text-green-600 flex justify-center items-center gap-2">
            <TrendingDown className="w-6 h-6" />
            {comparison.metrics.apiCallReduction}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Payload Size Reduced</p>
          <p className="text-3xl font-bold text-blue-600 flex justify-center items-center gap-2">
            <TrendingDown className="w-6 h-6" />
            {comparison.metrics.payloadSizeReduction}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Dev Speed Increase</p>
          <p className="text-3xl font-bold text-purple-600 flex justify-center items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            {comparison.metrics.developmentSpeedIncrease}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-100 dark:border-green-800">
          <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Benefits & Gains
          </h3>
          <ul className="space-y-3">
            {comparison.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-100 dark:border-amber-800">
          <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
            <X className="w-5 h-5" />
            Trade-offs & Challenges
          </h3>
          <ul className="space-y-3">
            {comparison.tradeoffs.map((tradeoff, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">{tradeoff}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
         <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            <div className="p-6">
               <h4 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-4 text-center">Typical REST Flow</h4>
               <div className="space-y-3">
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-xs border border-red-100 dark:border-red-800 font-mono text-red-700 dark:text-red-300">
                    GET /users/1
                  </div>
                  <div className="flex justify-center"><ArrowRight className="rotate-90 md:rotate-90 w-4 h-4 text-gray-400" /></div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-xs border border-red-100 dark:border-red-800 font-mono text-red-700 dark:text-red-300">
                    GET /users/1/posts
                  </div>
                  <div className="flex justify-center"><ArrowRight className="rotate-90 md:rotate-90 w-4 h-4 text-gray-400" /></div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-xs border border-red-100 dark:border-red-800 font-mono text-red-700 dark:text-red-300">
                    GET /posts/101/comments
                  </div>
                  <div className="text-center text-xs text-red-600 font-semibold mt-2">
                     ⚠ Waterfall & Over-fetching
                  </div>
               </div>
            </div>
            <div className="p-6">
               <h4 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-4 text-center">Optimized GraphQL Flow</h4>
               <div className="h-full flex flex-col justify-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded text-xs border border-green-100 dark:border-green-800 font-mono text-green-700 dark:text-green-300 whitespace-pre">
{`query {
  user(id: 1) {
    posts {
      comments { text }
    }
  }
}`}
                  </div>
                  <div className="text-center text-xs text-green-600 font-semibold mt-4">
                     ✓ Single Request & Exact Data
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
