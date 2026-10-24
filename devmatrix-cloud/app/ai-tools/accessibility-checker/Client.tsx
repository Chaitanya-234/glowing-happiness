'use client';

import { useState } from 'react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { motion } from 'framer-motion';
import { Loader2, Accessibility, Eye, Check, AlertCircle } from 'lucide-react';
import { AccessibilityCheckerSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type AccessibilityResult = z.infer<typeof AccessibilityCheckerSchema>;

export default function AccessibilityCheckerClient() {
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AccessibilityResult | null>(null);

  const handleCheck = async () => {
    if (!code.trim()) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `Analyze the following code for WCAG accessibility violations (A, AA, AAA).

Code to analyze:
\`\`\`
${code}
\`\`\`
      `;

      const data = await generateStructuredContent(prompt, 'accessibility_checker');
      setResult(data);
    } catch (error) {
      console.error('Check failed:', error);
      alert('An error occurred while analyzing the code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-red-400 bg-red-900/20 border-red-500/50';
      case 'Serious': return 'text-orange-400 bg-orange-900/20 border-orange-500/50';
      case 'Moderate': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/50';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-500/50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-purple-900/20 p-4 rounded-xl border border-purple-500/20">
            <h2 className="text-purple-100 font-semibold flex-1">Component Code</h2>
            <button
              onClick={handleCheck}
              disabled={isGenerating || !code.trim()}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Accessibility className="w-5 h-5" />
                  Check Accessibility
                </>
              )}
            </button>
          </div>

          <div className="relative flex-1 bg-gray-900/50 rounded-xl border border-purple-500/20 overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your HTML, JSX, or TSX code here..."
              className="w-full h-full bg-transparent p-6 text-purple-100 font-mono resize-none focus:outline-none custom-scrollbar"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/20 flex justify-between items-center h-[74px]">
             <h2 className="text-xl font-bold text-purple-100 flex items-center gap-2">
              {result ? (
                <>
                  Compliance Score:
                  <span className={`font-mono text-2xl ${
                    result.complianceScore >= 90 ? 'text-green-400' :
                    result.complianceScore >= 70 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {result.complianceScore}/100
                  </span>
                </>
              ) : (
                'Compliance Report'
              )}
            </h2>
          </div>

          <div className="flex-1 bg-gray-900/50 rounded-xl border border-purple-500/20 overflow-hidden relative">
            {!result && !isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400/30 p-8 text-center">
                <Eye className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg">Paste code to detect accessibility violations.</p>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
                <p className="text-purple-200 animate-pulse">Scanning for WCAG violations...</p>
              </div>
            )}

            {result && (
              <div className="h-full overflow-y-auto p-6 custom-scrollbar space-y-6">
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-purple-100 mb-2">Summary</h3>
                    <p className="text-purple-200/80">{result.summary}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-100">Violations Found</h3>
                  {result.violations.length === 0 ? (
                      <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-200">
                          <Check className="w-6 h-6 text-green-400" />
                          <span>No obvious accessibility violations found. Great job!</span>
                      </div>
                  ) : (
                      result.violations.map((violation, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 rounded-lg border ${getImpactColor(violation.impact)}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4" />
                                  {violation.ruleId}
                              </h4>
                              <span className="text-xs uppercase font-mono px-2 py-1 rounded bg-black/20">
                                  {violation.impact}
                              </span>
                          </div>

                          <p className="text-sm mb-1"><span className="opacity-70">Element:</span> <code className="bg-black/20 px-1 rounded">{violation.element}</code></p>
                          <p className="text-sm mb-3 opacity-90">{violation.description}</p>

                          <div className="bg-black/20 p-3 rounded text-sm">
                              <div className="font-semibold opacity-80 mb-1">Remediation:</div>
                              <p>{violation.remediation}</p>
                          </div>

                          <div className="mt-2 text-xs opacity-60 text-right">
                              WCAG Criteria: {violation.wcagCriteria}
                          </div>
                        </motion.div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
