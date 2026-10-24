'use client';

import React from 'react';
import MetricsDashboard from './MetricsDashboard';
import BottleneckDetector from './BottleneckDetector';
import ResponseTimeDistribution from './ResponseTimeDistribution';
import ThroughputAnalysis from './ThroughputAnalysis';
import ErrorAnalysis from './ErrorAnalysis';
import OptimizationSuggestions from './OptimizationSuggestions';
import { Loader2 } from 'lucide-react';

interface ReportAnalyzerProps {
  reportData: any;
  analysisResult: any;
  isAnalyzing: boolean;
}

export default function ReportAnalyzer({ reportData, analysisResult, isAnalyzing }: ReportAnalyzerProps) {
  if (isAnalyzing && !analysisResult) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
            <Loader2 className="w-12 h-12 animate-spin text-violet-600 mb-4" />
            <p className="text-xl font-medium">Analyzing Report...</p>
            <p className="max-w-md text-center mt-2">
                Our AI is scanning your test data for bottlenecks, analyzing response time distributions, and generating optimization strategies.
            </p>
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Test Results Analysis</h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">
           {analysisResult?.reportSummary?.testDate || new Date().toLocaleDateString()}
        </span>
      </div>

      <MetricsDashboard data={reportData} aiAnalysis={analysisResult} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100">Response Time Distribution</h3>
                <ResponseTimeDistribution data={reportData} />
             </div>

             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100">Throughput & Load</h3>
                <ThroughputAnalysis data={reportData} />
             </div>
        </div>

        <div className="space-y-8">
             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-500 flex items-center gap-2">
                    Bottlenecks Detected
                </h3>
                <BottleneckDetector bottlenecks={analysisResult?.bottlenecks} />
             </div>

             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4 text-violet-500">
                    Optimization Plan
                </h3>
                <OptimizationSuggestions suggestions={analysisResult?.optimizationSuggestions} />
             </div>

             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4 text-orange-500">
                    Error Analysis
                </h3>
                <ErrorAnalysis data={reportData} />
             </div>
        </div>
      </div>
    </div>
  );
}
