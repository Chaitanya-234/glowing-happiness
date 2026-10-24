'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ErrorAnalysisProps {
  data?: any;
}

export default function ErrorAnalysis({ data }: ErrorAnalysisProps) {
  // Mock data
  const mockData = [
    { name: '200 OK', value: 4500, color: '#10B981' }, // Green
    { name: '400 Bad Request', value: 120, color: '#FBBF24' }, // Yellow
    { name: '404 Not Found', value: 45, color: '#F59E0B' }, // Orange
    { name: '500 Server Error', value: 80, color: '#EF4444' }, // Red
    { name: '503 Unavailable', value: 20, color: '#7F1D1D' }, // Dark Red
  ];

  const chartData = data?.statusCodes || mockData;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {chartData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', color: '#64748B' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
