'use client';

import ScoreGauge from './ScoreGauge';
import TextHighlighter from './TextHighlighter';
import PatternAnalysis from './PatternAnalysis';
import SentenceBreakdown from './SentenceBreakdown';
import WritingStylePanel from './WritingStylePanel';
import ComparisonChart from './ComparisonChart';
import DetailedReport from './DetailedReport';
import { AlertCircle, CheckCircle, HelpCircle, Activity, Layout, Eye, BarChart2 } from 'lucide-react';

interface DetectionResultsProps {
  data: any;
  originalText: string;
}

export default function DetectionResults({ data, originalText }: DetectionResultsProps) {
  if (!data) return null;

  const comparisonData = [
    { name: 'AI Score', value: data.overallScore.aiProbability, color: '#EF4444' },
    { name: 'Perplexity', value: Math.min(data.breakdown.perplexityScore * 10, 100), color: '#3B82F6' },
    { name: 'Burstiness', value: Math.min(data.breakdown.burstinessScore * 100, 100), color: '#10B981' },
    { name: 'Diversity', value: Math.min(data.breakdown.vocabularyDiversity * 100, 100), color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Top Summary Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-500" />
            Detection Score
          </h2>
          <ScoreGauge score={data.overallScore.aiProbability} size="lg" />

          <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 py-3 px-6 rounded-lg border border-slate-100 dark:border-slate-800">
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Confidence: {data.overallScore.confidence}</p>
            <p>{data.overallScore.reasoning}</p>
          </div>
        </div>

        {/* Key Metrics & Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
           <div className="flex justify-between items-start mb-6">
             <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
               <BarChart2 className="w-5 h-5 text-blue-500" />
               Metrics Comparison
             </h3>
             <div className="flex gap-4 text-xs font-medium">
               <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
                 <span className="w-2 h-2 rounded-full bg-red-500"></span> AI Indicators: {data.breakdown.aiIndicators}
               </span>
               <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span> Human Indicators: {data.breakdown.humanIndicators}
               </span>
             </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8 h-full">
             <div className="flex flex-col justify-center">
                <ComparisonChart data={comparisonData} />
             </div>
             <div className="space-y-4 flex flex-col justify-center">
               <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                 <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Most Likely Source</p>
                 <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">{data.aiSignatures.mostLikely}</span>
                    <span className="text-sm font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full">
                        {data.aiSignatures[data.aiSignatures.mostLikely.toLowerCase()]?.likelihood || 0}% Match
                    </span>
                 </div>
               </div>

               <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                 <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Text Quality</p>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-slate-500">Readability</span>
                    <span className="font-medium">{data.writingStyle.readabilityScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${data.writingStyle.readabilityScore}%` }}></div>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Main Analysis Content */}
      <div className="grid lg:grid-cols-12 gap-6">

        {/* Left Column: Highlighter & Sentence Analysis */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-orange-500" />
                    Deep Text Analysis
                 </h3>
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                    Hover highlighted text for details
                 </span>
              </div>
              <TextHighlighter text={originalText} suspiciousSections={data.suspiciousSections} />
           </div>

           <SentenceBreakdown sentences={data.sentenceAnalysis} />
        </div>

        {/* Right Column: Patterns & Style */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden sticky top-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                <PatternAnalysis patterns={data.detectedPatterns} />
                <div className="my-6 border-t border-slate-200 dark:border-slate-800"></div>
                <WritingStylePanel style={data.writingStyle} />
            </div>
        </div>
      </div>

      {/* Detailed Report */}
      <DetailedReport data={data} />
    </div>
  );
}
