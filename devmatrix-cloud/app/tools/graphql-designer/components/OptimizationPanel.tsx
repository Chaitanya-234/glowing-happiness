'use client';

import React from 'react';
import { Zap, Server, Activity, Database } from 'lucide-react';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;
type Optimizations = SchemaType['optimizations'];

interface OptimizationPanelProps {
  optimizations: Optimizations;
}

export default function OptimizationPanel({ optimizations }: OptimizationPanelProps) {
  const items = [
    {
      title: 'DataLoader Strategy',
      icon: Database,
      content: optimizations.dataLoader,
      color: 'blue',
    },
    {
      title: 'Query Complexity',
      icon: Activity,
      content: optimizations.queryCost,
      color: 'amber',
    },
    {
      title: 'Caching Implementation',
      icon: Zap,
      content: optimizations.caching,
      color: 'purple',
    },
    {
      title: 'Monitoring & Metrics',
      icon: Server,
      content: optimizations.monitoring,
      color: 'green',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, idx) => {
        const Icon = item.icon;
        const colorClasses = {
          blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
          amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
          purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
          green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
        };
        const currentColors = colorClasses[item.color as keyof typeof colorClasses];

        return (
          <div key={idx} className={`p-6 rounded-xl border ${currentColors.split(' ')[4]} bg-white dark:bg-gray-800 shadow-sm transition-transform hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${currentColors.split(' ').slice(0, 2).join(' ')}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {item.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
