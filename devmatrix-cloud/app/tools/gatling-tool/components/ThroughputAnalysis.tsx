'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ThroughputAnalysisProps {
  data?: any;
}

export default function ThroughputAnalysis({ data }: ThroughputAnalysisProps) {
  // Mock time-series data
  const mockData = Array.from({ length: 20 }, (_, i) => ({
    time: `${i * 30}s`,
    rps: Math.floor(Math.random() * 50) + 100 + (i * 2), // Simulate slight ramp up
    users: Math.floor(i * 10)
  }));

  const chartData = data?.series || mockData;

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorRps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#64748B' }}
            dy={10}
            interval={2}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#64748B' }}
            label={{ value: 'Req/s', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#64748B' } }}
          />
          <Tooltip
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
             labelStyle={{ color: '#64748B', marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="rps"
            stroke="#8B5CF6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRps)"
            name="Throughput (Req/s)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
