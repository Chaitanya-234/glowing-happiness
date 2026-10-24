'use client';

import { useState } from 'react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { motion } from 'framer-motion';
import { Loader2, Globe, MonitorSmartphone, Code2, AlertTriangle } from 'lucide-react';
import { CrossBrowserTesterSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type CrossBrowserResult = z.infer<typeof CrossBrowserTesterSchema>;

export default function CrossBrowserClient() {
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CrossBrowserResult | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `Analyze this code for cross-browser compatibility issues (IE, Safari, Chrome, Firefox, Mobile). Provide a Playwright test script to verify.

Code:
\`\`\`
${code}
\`\`\`
      `;

      const data = await generateStructuredContent(prompt, 'cross_browser_tester');
      setResult(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('An error occurred while analyzing the code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-purple-900/20 p-4 rounded-xl border border-purple-500/20">
            <h2 className="text-purple-100 font-semibold flex-1">Source Code (CSS/JS)</h2>
            <button
              onClick={handleAnalyze}
              disabled={isGenerating || !code.trim()}
              className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5" />
                  Check Compatibility
                </>
              )}
            </button>
          </div>

          <div className="relative flex-1 bg-gray-900/50 rounded-xl border border-purple-500/20 overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste CSS or JavaScript code here to check for browser support issues..."
              className="w-full h-full bg-transparent p-6 text-purple-100 font-mono resize-none focus:outline-none custom-scrollbar"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/20 flex justify-between items-center h-[74px]">
             <h2 className="text-xl font-bold text-purple-100 flex items-center gap-2">
               Analysis Report
            </h2>
          </div>

          <div className="flex-1 bg-gray-900/50 rounded-xl border border-purple-500/20 overflow-hidden relative">
            {!result && !isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400/30 p-8 text-center">
                <MonitorSmartphone className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg">Paste code to detect cross-browser compatibility issues.</p>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
                <p className="text-purple-200 animate-pulse">Checking browser support...</p>
              </div>
            )}

            {result && (
              <div className="h-full overflow-y-auto p-6 custom-scrollbar space-y-6">
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-purple-100 mb-2">Summary</h3>
                    <p className="text-purple-200/80">{result.summary}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-100">Compatibility Issues</h3>
                  {result.compatibilityIssues.length === 0 ? (
                      <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-200">
                          No major compatibility issues detected.
                      </div>
                  ) : (
                      result.compatibilityIssues.map((issue, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg border border-red-500/30 bg-red-900/10"
                        >
                          <div className="flex items-start gap-3 mb-2">
                              <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                              <div>
                                  <h4 className="font-bold text-red-200">{issue.issue}</h4>
                                  <p className="text-xs text-red-300/70 mt-1">Feature: {issue.cssPropertyOrFeature}</p>
                              </div>
                          </div>

                          <div className="pl-8 space-y-2">
                              <div className="flex gap-2 flex-wrap">
                                  {issue.browsers.map((b, i) => (
                                      <span key={i} className="text-xs bg-red-500/20 text-red-200 px-2 py-1 rounded border border-red-500/20">
                                          {b}
                                      </span>
                                  ))}
                              </div>
                              <div className="text-sm text-purple-200/80 bg-black/20 p-2 rounded">
                                  <span className="font-semibold text-purple-200/60">Fix: </span>
                                  {issue.polyfillOrFix}
                              </div>
                          </div>
                        </motion.div>
                      ))
                  )}
                </div>

                {result.testScript && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-lg font-semibold text-purple-100">
                            <Code2 className="w-5 h-5" />
                            Generated Test Script
                        </div>
                        <pre className="bg-black/40 p-4 rounded-lg border border-purple-500/30 text-xs font-mono text-purple-200/80 overflow-x-auto">
                            <code>{result.testScript}</code>
                        </pre>
                    </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
