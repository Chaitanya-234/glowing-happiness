'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResponseTimeDistributionProps {
  data?: any; // Expecting Gatling stats object or distribution map
}

export default function ResponseTimeDistribution({ data }: ResponseTimeDistributionProps) {
  // Mock data if real data is missing or structurally different
  // In a real scenario, we would parse 'stats.json' distributions

  // Example mock distribution based on prompt visual description
  const mockData = [
    { range: '< 50ms', count: 120, color: '#10B981' },
    { range: '50-100ms', count: 450, color: '#10B981' },
    { range: '100-200ms', count: 800, color: '#34D399' },
    { range: '200-500ms', count: 320, color: '#FBBF24' },
    { range: '500-1000ms', count: 110, color: '#F59E0B' },
    { range: '> 1s', count: 45, color: '#EF4444' },
  ];

  const chartData = data?.distribution ?
    Object.entries(data.distribution).map(([range, count]) => ({ range, count }))
    : mockData;

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
          <XAxis
            dataKey="range"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#64748B' }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#64748B' }}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontSize: '12px', fontWeight: 600 }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#8B5CF6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
