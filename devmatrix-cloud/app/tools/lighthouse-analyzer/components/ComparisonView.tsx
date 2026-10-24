'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonViewProps {
  currentScores: any;
  comparisonBaseline: any;
}

export function ComparisonView({ currentScores, comparisonBaseline }: ComparisonViewProps) {
  if (!comparisonBaseline) return null;

  const data = [
    {
      name: 'Performance',
      You: currentScores.performance,
      'Industry Avg': comparisonBaseline.industryAverage.performance,
      'Top Tier': comparisonBaseline.topPerformers.performance,
    },
    {
      name: 'Accessibility',
      You: currentScores.accessibility,
      'Industry Avg': comparisonBaseline.industryAverage.accessibility,
      'Top Tier': comparisonBaseline.topPerformers.accessibility,
    },
    {
      name: 'Best Practices',
      You: currentScores.bestPractices,
      'Industry Avg': comparisonBaseline.industryAverage.bestPractices,
      'Top Tier': comparisonBaseline.topPerformers.bestPractices,
    },
    {
      name: 'SEO',
      You: currentScores.seo,
      'Industry Avg': comparisonBaseline.industryAverage.seo,
      'Top Tier': comparisonBaseline.topPerformers.seo,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Industry Benchmarking</h3>
          <p className="text-sm text-slate-500">Comparing your scores against industry standards</p>
        </div>
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300">
          Position: <span className="text-violet-600 dark:text-violet-400">{comparisonBaseline.yourPosition}</span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="You" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Your Score" />
            <Bar dataKey="Industry Avg" fill="#CBD5E1" radius={[4, 4, 0, 0]} name="Industry Avg" />
            <Bar dataKey="Top Tier" fill="#34D399" radius={[4, 4, 0, 0]} name="Top Performers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
