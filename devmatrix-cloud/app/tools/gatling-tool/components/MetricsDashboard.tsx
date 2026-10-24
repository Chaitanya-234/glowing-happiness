'use client';

import React from 'react';
import { Activity, Clock, CheckCircle2, AlertTriangle, Users, Zap } from 'lucide-react';

interface MetricsDashboardProps {
  data: any; // Raw report data
  aiAnalysis?: any; // AI enriched data
}

export default function MetricsDashboard({ data, aiAnalysis }: MetricsDashboardProps) {
  // Extract metrics safely, assuming standard Gatling stats.json structure
  // or falling back to AI analysis if available

  const stats = data?.contents || data?.stats || data;

  // Example extraction logic (adjust based on actual Gatling JSON structure)
  const totalRequests = stats?.numberOfRequests?.total || aiAnalysis?.reportSummary?.totalRequests || 0;
  const failedRequests = stats?.numberOfRequests?.ko || aiAnalysis?.reportSummary?.failedRequests || 0;
  const meanResponseTime = stats?.meanResponseTime?.total || aiAnalysis?.performanceMetrics?.responseTime?.mean || 0;
  const p95 = stats?.percentiles4?.total || aiAnalysis?.performanceMetrics?.responseTime?.p95 || 0; // percentiles4 is usually 99th or 95th depending on config
  const p99 = stats?.percentiles4?.total || aiAnalysis?.performanceMetrics?.responseTime?.p99 || 0;

  const successRate = totalRequests > 0 ? ((totalRequests - failedRequests) / totalRequests) * 100 : 0;

  // Formatters
  const formatNum = (n: number) => n.toLocaleString();
  const formatTime = (ms: number) => `${Math.round(ms)}ms`;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card
        label="Total Requests"
        value={formatNum(totalRequests)}
        icon={Activity}
        color="text-blue-500"
        bg="bg-blue-100 dark:bg-blue-900/30"
      />
      <Card
        label="Success Rate"
        value={`${successRate.toFixed(2)}%`}
        icon={CheckCircle2}
        color={successRate > 99 ? "text-green-500" : "text-yellow-500"}
        bg={successRate > 99 ? "bg-green-100 dark:bg-green-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"}
      />
      <Card
        label="Mean Time"
        value={formatTime(meanResponseTime)}
        icon={Clock}
        color="text-violet-500"
        bg="bg-violet-100 dark:bg-violet-900/30"
      />
      <Card
        label="95th Percentile"
        value={formatTime(p95)}
        icon={Zap}
        color="text-purple-500"
        bg="bg-purple-100 dark:bg-purple-900/30"
      />
      <Card
        label="99th Percentile"
        value={formatTime(p99)}
        icon={AlertTriangle}
        color={p99 > 2000 ? "text-red-500" : "text-orange-500"}
        bg={p99 > 2000 ? "bg-red-100 dark:bg-red-900/30" : "bg-orange-100 dark:bg-orange-900/30"}
      />
      <Card
        label="Peak Users"
        value={aiAnalysis?.reportSummary?.peakConcurrentUsers || "N/A"}
        icon={Users}
        color="text-teal-500"
        bg="bg-teal-100 dark:bg-teal-900/30"
      />
    </div>
  );
}

function Card({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${bg} ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
    </div>
  );
}
