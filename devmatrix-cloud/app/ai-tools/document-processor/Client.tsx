'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader2, CheckCircle, AlertCircle, BarChart, List, Zap } from 'lucide-react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { DocumentProcessorSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type DocumentResult = z.infer<typeof DocumentProcessorSchema>;

export default function DocumentProcessorClient() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DocumentResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    if (inputText.length < 50) {
      setError('Please enter at least 50 characters for a meaningful analysis.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const prompt = `Analyze the following document/text and provide a structured summary including key points, sentiment, category, and suggested actions:\n\n${inputText}`;
      const data = await generateStructuredContent(prompt, 'doc_processor');
      setResult(data);
    } catch (err) {
      setError('Failed to process document. Please try again.');
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
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <FileText className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            AI Document Processor
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform long documents into actionable insights. Get summaries, key points, and sentiment analysis in seconds.
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
              Paste your document text here
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste article, report, or email content..."
              className="w-full h-64 bg-gray-800/50 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none font-mono text-sm"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500">
                {inputText.length} characters
              </span>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analyze Document
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Summary Card */}
              <div className="col-span-1 md:col-span-2 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <List className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Executive Summary</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {result.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-gray-800 text-sm text-gray-300 border border-white/10">
                    Category: <span className="text-white font-medium">{result.category}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm border ${
                    result.sentiment === 'Positive' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    result.sentiment === 'Negative' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}>
                    Sentiment: <span className="font-medium">{result.sentiment}</span>
                  </span>
                </div>
              </div>

              {/* Key Points */}
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Key Points</h3>
                </div>
                <ul className="space-y-3">
                  {result.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Actions */}
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <BarChart className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Suggested Actions</h3>
                </div>
                <ul className="space-y-3">
                  {result.suggestedActions.map((action, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
