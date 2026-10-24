'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, Copy, Check, ArrowRight, Code2, Sparkles, AlertCircle } from 'lucide-react';

const LANGUAGES = [
  'Auto Detect',
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'PHP',
  'Ruby',
  'SQL',
];

export default function CodeTranslatorClient() {
  const [sourceCode, setSourceCode] = useState('');
  const [sourceLang, setSourceLang] = useState('Auto Detect');
  const [targetLang, setTargetLang] = useState('TypeScript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    translatedCode: string;
    explanation: string;
    complexityAnalysis: string;
    tips: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceCode.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prompt = `
        Act as an expert senior software engineer.
        Translate the following code from ${sourceLang} to ${targetLang}.
        Preserve the logic, comments, and variable naming conventions appropriate for the target language.
        If the source language is "Auto Detect", identify it first.

        Source Code:
        \`\`\`
        ${sourceCode}
        \`\`\`
      `;

      const response = await generateStructuredContent(prompt, 'code_translator');
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to translate code');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.translatedCode) {
      navigator.clipboard.writeText(result.translatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-2xl mb-4 ring-1 ring-purple-500/30">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            AI Code Translator
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Instantly convert code between languages while preserving logic and best practices.
            Powered by Gemini 2.5 Flash.
          </p>
        </motion.div>

        {/* Input Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Source Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Source Language</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div className="relative group">
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full h-80 bg-slate-900/50 border border-slate-700 rounded-xl p-4 font-mono text-sm resize-none focus:ring-2 focus:ring-purple-500 outline-none transition-all group-hover:border-slate-600"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Code2 className="w-5 h-5 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Target Panel (Placeholder until result) */}
          <div className="space-y-4 hidden md:block">
             <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Target Language</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              >
                {LANGUAGES.filter(l => l !== 'Auto Detect').map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div className="relative h-80 bg-slate-900/30 border border-slate-800 rounded-xl p-4 flex items-center justify-center text-slate-600 border-dashed">
              {loading ? (
                 <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    <span className="text-sm animate-pulse">Translating logic...</span>
                 </div>
              ) : (
                <div className="text-center">
                  <ArrowRight className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span>Translation will appear here</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleTranslate}
            disabled={loading || !sourceCode.trim()}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Translate Code
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Translated Code (Mobile View replacement / Desktop confirmation) */}
               <div className="space-y-2">
                  <div className="flex items-center justify-between md:hidden">
                    <span className="text-sm font-medium text-slate-300">Result ({targetLang})</span>
                  </div>
                  <div className="relative group">
                    <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-slate-800 to-transparent rounded-t-xl pointer-events-none opacity-50" />
                    <pre className="w-full bg-[#1e1e2e] text-slate-200 p-6 rounded-xl overflow-x-auto border border-slate-700/50 shadow-2xl">
                      <code>{result.translatedCode}</code>
                    </pre>
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition-colors backdrop-blur-sm"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                    </button>
                  </div>
               </div>

               {/* Analysis Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Explanation */}
                 <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                   <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                     <Sparkles className="w-4 h-4" />
                     Explanation
                   </h3>
                   <p className="text-slate-300 leading-relaxed text-sm">
                     {result.explanation}
                   </p>
                 </div>

                 {/* Complexity & Tips */}
                 <div className="space-y-6">
                    <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                      <h3 className="text-lg font-semibold text-blue-400 mb-3">Complexity Analysis</h3>
                      <p className="text-slate-300 text-sm font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
                        {result.complexityAnalysis}
                      </p>
                    </div>

                    <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                      <h3 className="text-lg font-semibold text-green-400 mb-3">Pro Tips</h3>
                      <ul className="space-y-2">
                        {result.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                            {tip}
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
