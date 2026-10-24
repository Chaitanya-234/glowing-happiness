'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, Calculator, Activity, ArrowUpRight, HeartPulse } from 'lucide-react';
import { toast } from 'sonner';

export default function SaasMetricCalculatorClient() {
  const [metrics, setMetrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!metrics.trim()) {
      toast.error('Please enter your SaaS metrics');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `
        Analyze the following SaaS metrics and provide a health assessment:

        Metrics Provided:
        ${metrics}

        Calculate implied metrics if possible (e.g., LTV:CAC ratio).
        Provide a health score (0-100).
        List specific recommendations to improve.
        Project future growth based on these trends.
      `;

      const data = await generateStructuredContent(prompt, 'saas_metric_analysis');
      setResult(data);
      toast.success('Metrics analyzed!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to analyze metrics. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-purple-900/30 mb-4 ring-1 ring-purple-500/20">
          <Activity className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 mb-4">
          SaaS Metric Analyst
        </h1>
        <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
          Understand the health of your subscription business. Get AI-powered analysis of your LTV, CAC, Churn, and MRR.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-purple-500/10 rounded-3xl p-6 shadow-2xl h-fit"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200/80 mb-2">
                Enter Your Metrics
              </label>
              <textarea
                value={metrics}
                onChange={(e) => setMetrics(e.target.value)}
                placeholder="e.g., MRR: $50k, Churn Rate: 5%, CAC: $200, ARPU: $50, Growth Rate: 10% MoM..."
                className="w-full h-48 bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  Analyze Metrics
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result && !isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-purple-200/30 p-12 border border-dashed border-purple-500/20 rounded-3xl min-h-[400px]"
              >
                <Activity className="w-16 h-16 mb-4" />
                <p>Enter metrics to view health score and analysis</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Health Score */}
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-purple-200 text-sm font-medium uppercase tracking-wider">SaaS Health Score</h3>
                    <div className="flex items-end gap-2 mt-1">
                      <span className={`text-5xl font-bold ${
                        result.healthScore >= 80 ? 'text-green-400' :
                        result.healthScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {result.healthScore}
                      </span>
                      <span className="text-purple-400 text-xl mb-1">/ 100</span>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-full">
                    <HeartPulse className={`w-8 h-8 ${
                        result.healthScore >= 80 ? 'text-green-400' :
                        result.healthScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                      }`} />
                  </div>
                </div>

                {/* Analysis */}
                <div className="bg-black/60 border border-purple-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Analysis</h3>
                  <p className="text-purple-100/80 leading-relaxed">
                    {result.analysis}
                  </p>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-blue-400 mb-4">Strategic Recommendations</h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-purple-100/90 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projection */}
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <ArrowUpRight className="w-5 h-5 text-green-400" /> Projected Growth
                  </h3>
                  <p className="text-purple-200/70 text-sm">
                    {result.projectedGrowth}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
