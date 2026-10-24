'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileBarChart, Loader2, Send, Download, Layers, BookOpen } from 'lucide-react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { ReportGeneratorSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type ReportResult = z.infer<typeof ReportGeneratorSchema>;

export default function ReportGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReportResult | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a report topic.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const prompt = `Generate a professional business report about "${topic}".
      Audience: ${audience || 'General Business'}
      Key Context/Points to Include: ${keyPoints || 'General overview'}

      The report must include a title, executive summary, multiple detailed sections, a conclusion, and recommendations.`;

      const data = await generateStructuredContent(prompt, 'report_generator');
      setResult(data);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 pt-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4">
            <FileBarChart className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
            AI Report Generator
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create structured, professional reports tailored to your audience in seconds.
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
            <div>
              <label className="block text-sm font-medium text-gray-300 ml-1 mb-1">Report Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Q3 Market Analysis for Electric Vehicles"
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 ml-1 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g., Board of Directors, Marketing Team"
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 ml-1 mb-1">Key Points (Optional)</label>
                <input
                  type="text"
                  value={keyPoints}
                  onChange={(e) => setKeyPoints(e.target.value)}
                  placeholder="e.g., Focus on sustainability, ROI..."
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-orange-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Create Report
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
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
              className="bg-white text-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 bg-gray-50 pointer-events-none opacity-50 mix-blend-multiply"></div>

              <div className="relative z-10 space-y-8">
                <div className="border-b-2 border-gray-200 pb-6">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                    {result.reportTitle}
                  </h2>
                  <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
                    Generated for: {audience || 'General Audience'}
                  </p>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                    Executive Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {result.executiveSummary}
                  </p>
                </div>

                <div className="space-y-8">
                  {result.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs text-gray-600 font-bold">
                          {idx + 1}
                        </span>
                        {section.heading}
                      </h3>
                      <p className="text-gray-700 leading-relaxed pl-8">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">Conclusion</h3>
                    <p className="text-gray-700">{result.conclusion}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">Recommendations</h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-orange-500 font-bold">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
