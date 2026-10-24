'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { TestCoverageAnalyzerSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type CoverageData = z.infer<typeof TestCoverageAnalyzerSchema>;

export default function TestCoverageAnalyzerClient() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<CoverageData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Analyze the following code for test coverage gaps.
      Estimate current logical coverage, identify untested lines/branches, and suggest specific test cases to cover them.

      Code:
      ${code}
      `;

      const data = await generateStructuredContent(
        prompt,
        'coverage_analyzer'
      );
      setResult(data as CoverageData);
    } catch (error) {
      console.error(error);
      alert('Failed to analyze coverage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px] mb-8">
          {/* Input Side */}
          <div className="flex flex-col h-full bg-purple-900/10 border border-purple-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
             <div className="bg-purple-900/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
                <span className="text-purple-200/70 text-sm font-semibold">Source Code</span>
             </div>
             <textarea
               value={code}
               onChange={(e) => setCode(e.target.value)}
               spellCheck={false}
               className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-purple-100 focus:outline-none resize-none placeholder-purple-500/20"
               placeholder="// Paste function or module code..."
             />
          </div>

          {/* Output Side */}
          <div className="flex flex-col h-full bg-black/40 border border-purple-500/20 rounded-xl overflow-hidden relative">
             <div className="bg-purple-900/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
                <span className="text-purple-200/70 text-sm font-semibold">Coverage Analysis</span>
             </div>
             <div className="flex-1 w-full overflow-auto bg-[#0d0d0d]">
                {loading ? (
                   <div className="h-full flex items-center justify-center">
                     <div className="flex flex-col items-center gap-4">
                       <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                       <span className="text-pink-500/50 text-sm animate-pulse">Scanning logic paths...</span>
                     </div>
                   </div>
                ) : result ? (
                   <div className="p-4 space-y-6">
                      <div className="flex items-center justify-between bg-purple-900/20 p-4 rounded-lg border border-purple-500/10">
                          <div>
                              <div className="text-purple-300 text-sm">Estimated Logic Coverage</div>
                              <div className="text-3xl font-bold text-white">{result.currentCoverageEstimate}%</div>
                          </div>
                          <div className={`text-sm px-3 py-1 rounded-full font-bold ${
                              result.riskAssessment === 'Critical' || result.riskAssessment === 'High' ? 'bg-red-500/20 text-red-400' :
                              result.riskAssessment === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                          }`}>
                              {result.riskAssessment} Risk
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-red-900/10 p-3 rounded-lg border border-red-500/10">
                              <div className="text-red-400 text-xs font-bold mb-2">Uncovered Lines</div>
                              <ul className="list-disc list-inside text-xs text-purple-200/80">
                                  {result.uncoveredLines.length ? result.uncoveredLines.map((l, i) => <li key={i}>{l}</li>) : <li>None!</li>}
                              </ul>
                          </div>
                          <div className="bg-orange-900/10 p-3 rounded-lg border border-orange-500/10">
                              <div className="text-orange-400 text-xs font-bold mb-2">Missed Branches</div>
                              <ul className="list-disc list-inside text-xs text-purple-200/80">
                                  {result.missedBranches.length ? result.missedBranches.map((l, i) => <li key={i}>{l}</li>) : <li>None!</li>}
                              </ul>
                          </div>
                      </div>

                      <div>
                          <h4 className="text-pink-400 font-bold mb-3 text-sm">Recommended Tests</h4>
                          <div className="space-y-4">
                              {result.suggestedTestCases.map((tc, idx) => (
                                  <div key={idx} className="border border-purple-500/20 rounded-lg overflow-hidden">
                                      <div className="bg-purple-900/10 px-3 py-2 text-xs text-purple-300 border-b border-purple-500/10">
                                          Test for: <span className="text-white font-semibold">{tc.targetFunction}</span> - {tc.scenario}
                                      </div>
                                      <pre className="p-3 bg-black/20 font-mono text-xs text-pink-200/80 whitespace-pre-wrap overflow-x-auto">
                                          {tc.testCode}
                                      </pre>
                                  </div>
                              ))}
                          </div>
                      </div>
                   </div>
                ) : (
                   <div className="h-full flex items-center justify-center text-purple-500/20 text-sm">
                      Ready to analyze
                   </div>
                )}
             </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
           <button
             onClick={handleAnalyze}
             disabled={loading || !code}
             className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${
               loading || !code
                 ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                 : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:scale-105'
             }`}
           >
             {loading ? 'Processing...' : 'Analyze Coverage 🔍'}
           </button>
        </div>
    </div>
  );
}
