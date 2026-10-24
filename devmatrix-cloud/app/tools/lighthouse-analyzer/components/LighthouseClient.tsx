'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UrlInput } from './UrlInput';
import { ReportUploader } from './ReportUploader';
import { ScoreOverview } from './ScoreOverview';
import { CategoryBreakdown } from './CategoryBreakdown';
import { AIRecommendations } from './AIRecommendations';
import { PriorityRoadmap } from './PriorityRoadmap';
import { ImpactEstimator } from './ImpactEstimator';
import { ComparisonView } from './ComparisonView';
import { ExportOptions } from './ExportOptions';
import { MetricsExplainer } from './MetricsExplainer';
import { analyzeLighthouseReport } from '../actions';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface AnalysisResult {
  reportSummary: any;
  categoryAnalysis: any;
  prioritizedRecommendations: any[];
  quickWins: any[];
  strategicFixes: any[];
  nextjsSpecific: any;
  impactEstimation: any;
  comparisonBaseline: any;
  securityHighlights: any;
  accessibilityComplianceReport: any;
}

export function LighthouseClient() {
  const [viewState, setViewState] = useState<'input' | 'analyzing' | 'results'>('input');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [rawReport, setRawReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReportLoaded = async (data: any) => {
    setRawReport(data);
    setViewState('analyzing');
    setError(null);

    try {
      const result = await analyzeLighthouseReport(data);

      if (result.success && result.data) {
        setAnalysisResult(result.data as AnalysisResult);
        setViewState('results');
      } else {
        setError(result.error || 'Analysis failed. Please try again.');
        setViewState('input');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred during analysis.');
      setViewState('input');
    }
  };

  const handleUrlSubmit = (url: string) => {
    setError("Please upload a JSON report for deep AI analysis of this URL.");
  };

  const reset = () => {
    setViewState('input');
    setAnalysisResult(null);
    setRawReport(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {viewState === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-8 py-12"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                AI Lighthouse Report Analyzer
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Upload your Lighthouse JSON report and get prioritized, actionable optimization recommendations powered by Gemini 2.5 AI.
              </p>
            </div>

            <div className="space-y-8">
              <ReportUploader
                onReportLoaded={handleReportLoaded}
                isLoading={false}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white dark:bg-slate-900 text-sm text-slate-500">
                    or enter URL context
                  </span>
                </div>
              </div>

              <UrlInput onUrlSubmit={handleUrlSubmit} />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mx-auto flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg max-w-xl"
              >
                <AlertTriangle className="w-5 h-5" />
                <p>{error}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {viewState === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[60vh] flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative">
              <div className="w-24 h-24 border-4 border-violet-200 dark:border-violet-800 rounded-full animate-pulse" />
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-violet-600 dark:border-violet-400 rounded-full animate-spin" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Analyzing Performance Data...
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Gemini AI is identifying root causes and prioritization strategies.
              </p>
            </div>
          </motion.div>
        )}

        {viewState === 'results' && analysisResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 py-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <button
                onClick={reset}
                className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Analyze another report
              </button>

              <ExportOptions analysisResult={analysisResult} />
            </div>

            {/* Score Overview */}
            <section>
              <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">
                Overall Health Score: <span className="text-violet-600 dark:text-violet-400">{Math.round(analysisResult.reportSummary.overallHealthScore)}/100</span>
              </h2>
              <ScoreOverview scores={analysisResult.reportSummary.scores} />
            </section>

             {/* Key Metrics Explanation */}
             <section className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 md:p-8">
               <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Understanding Core Metrics</h3>
               <MetricsExplainer />
            </section>

             {/* Detailed Category Analysis */}
            <section>
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Deep Dive Analysis</h3>
              <CategoryBreakdown
                categories={rawReport?.categories}
                audits={rawReport?.audits}
                aiAnalysis={analysisResult.categoryAnalysis}
              />
            </section>

            {/* Prioritized Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Prioritized Recommendations</h3>
                <span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full text-sm font-medium">
                  {analysisResult.prioritizedRecommendations.length} Issues Found
                </span>
              </div>
              <AIRecommendations recommendations={analysisResult.prioritizedRecommendations} />
            </section>

            {/* Implementation Roadmap */}
            <section>
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Optimization Roadmap</h3>
              <PriorityRoadmap
                quickWins={analysisResult.quickWins}
                strategicFixes={analysisResult.strategicFixes}
                recommendations={analysisResult.prioritizedRecommendations}
              />
            </section>

            {/* Business Impact & Comparison */}
            <section className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Impact & Benchmarking</h3>

              <ImpactEstimator
                currentScores={analysisResult.reportSummary.scores}
                estimatedScores={analysisResult.impactEstimation.afterAllFixes}
                businessImpact={analysisResult.impactEstimation.businessImpact}
                resourceRequirements={analysisResult.impactEstimation.resourceRequirements}
              />

              <ComparisonView
                currentScores={analysisResult.reportSummary.scores}
                comparisonBaseline={analysisResult.comparisonBaseline}
              />
            </section>

            {/* Next.js Specific Advice */}
            {analysisResult.nextjsSpecific && (
              <section className="bg-black/5 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-white bg-black px-2 py-0.5 rounded text-sm font-mono">NEXT.JS</span>
                  Optimization Strategy
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <div>
                       <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-1">Rendering Strategy</h4>
                       <p className="text-slate-900 dark:text-white">{analysisResult.nextjsSpecific.renderingStrategy}</p>
                     </div>
                     <div>
                       <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-1">Image Optimization</h4>
                       <p className="text-slate-900 dark:text-white">{analysisResult.nextjsSpecific.imageOptimization}</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                       <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-1">Code Splitting</h4>
                       <p className="text-slate-900 dark:text-white">{analysisResult.nextjsSpecific.codeSplitting}</p>
                     </div>
                     <div>
                        <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-2">Specific Recommendations</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                          {analysisResult.nextjsSpecific.recommendations.map((rec: string, i: number) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                     </div>
                  </div>
                </div>
              </section>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
