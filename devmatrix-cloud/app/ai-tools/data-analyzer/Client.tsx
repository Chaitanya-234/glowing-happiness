'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Loader2, TrendingUp, PieChart, Activity, AlertCircle, ArrowRight } from 'lucide-react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { DataAnalyzerSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type AnalysisResult = z.infer<typeof DataAnalyzerSchema>;

export default function DataAnalyzerClient() {
  const [dataInput, setDataInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!dataInput.trim()) {
      setError('Please provide some data to analyze.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const prompt = `Analyze the following dataset (CSV or JSON) and provide structured insights, trends, and visualization recommendations:\n\n${dataInput}`;
      const data = await generateStructuredContent(prompt, 'data_analyzer');
      setResult(data);
    } catch (err) {
      setError('Failed to analyze data. Ensure the format is valid JSON or CSV.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 pt-24 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-4">
            <Database className="w-8 h-8 text-teal-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">
            AI Data Analyzer
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Paste your raw CSV or JSON data to unlock hidden trends, key metrics, and visualization ideas.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
        >
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300 ml-1">
              Data Input (CSV or JSON)
            </label>
            <textarea
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              placeholder="id, value, date&#10;1, 100, 2023-01-01&#10;2, 150, 2023-01-02..."
              className="w-full h-64 bg-gray-800/50 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none font-mono text-xs md:text-sm"
            />

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-teal-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Crunching Numbers...
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    Analyze Data
                  </>
                )}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-500/20"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              {/* Top Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {result.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-gray-800/40 border border-white/5 p-4 rounded-2xl">
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Analysis */}
                <div className="md:col-span-2 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-teal-500/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Data Insights</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {result.analysisSummary}
                  </p>

                  <h4 className="text-lg font-semibold text-white mb-3">Identified Trends</h4>
                  <div className="space-y-3">
                    {result.identifiedTrends.map((trend, index) => (
                      <div key={index} className="bg-gray-800/30 p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-gray-800/50 transition-colors">
                        <span className="text-gray-200">{trend.trend}</span>
                        <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                          trend.impact === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {trend.impact} Impact
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visualization Recommendation */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-teal-500/20">
                    <PieChart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Recommended Visualization</h3>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-200 mb-4">
                    {result.recommendedChart} Chart
                  </div>
                  <p className="text-gray-400 text-sm">
                    Based on your data structure, a {result.recommendedChart.toLowerCase()} chart would best represent the underlying patterns.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
