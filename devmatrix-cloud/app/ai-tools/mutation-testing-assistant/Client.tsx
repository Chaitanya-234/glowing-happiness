'use client';

import { useState } from 'react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { motion } from 'framer-motion';
import { Loader2, Zap, Bug, BarChart3, ArrowRight } from 'lucide-react';
import { MutationTestingSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type MutationResult = z.infer<typeof MutationTestingSchema>;

export default function MutationTestingClient() {
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<MutationResult | null>(null);

  const handleGenerate = async () => {
    if (!code.trim()) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `Perform mutation testing analysis on this code. Generate suggested mutants (bugs) to test the test suite.

Code:
\`\`\`
${code}
\`\`\`
      `;

      const data = await generateStructuredContent(prompt, 'mutation_testing_assistant');
      setResult(data);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('An error occurred. Please try again.');
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
            <h2 className="text-purple-100 font-semibold flex-1">Source Code to Mutate</h2>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !code.trim()}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Mutating...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generate Mutants
                </>
              )}
            </button>
          </div>

          <div className="relative flex-1 bg-gray-900/50 rounded-xl border border-purple-500/20 overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste the code you want to test here..."
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
                  Effectiveness Score:
                  <span className={`font-mono text-2xl ${
                    result.effectivenessScore >= 80 ? 'text-green-400' :
                    result.effectivenessScore >= 50 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {result.effectivenessScore}/100
                  </span>
                </>
              ) : (
                'Mutation Report'
              )}
            </h2>
          </div>

          <div className="flex-1 bg-gray-900/50 rounded-xl border border-purple-500/20 overflow-hidden relative">
            {!result && !isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400/30 p-8 text-center">
                <Bug className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg">Paste code to generate mutants and test your tests.</p>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                <p className="text-purple-200 animate-pulse">Generating mutations...</p>
              </div>
            )}

            {result && (
              <div className="h-full overflow-y-auto p-6 custom-scrollbar space-y-6">
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-purple-100 mb-2">Analysis</h3>
                    <p className="text-purple-200/80">{result.analysis}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-100">Suggested Mutants</h3>
                  {result.suggestedMutants.map((mutant, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg border border-red-500/30 bg-red-900/10"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                             <Bug className="w-4 h-4 text-red-400" />
                             <span className="font-bold text-red-200">{mutant.mutationType}</span>
                        </div>
                        <span className="text-xs text-red-300/60 font-mono">{mutant.location}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          <div className="space-y-1">
                              <span className="text-purple-300/50 uppercase text-[10px]">Original</span>
                              <div className="bg-black/40 p-2 rounded border border-purple-500/10 text-purple-200/70 overflow-x-auto">
                                  {mutant.originalCode}
                              </div>
                          </div>
                          <div className="space-y-1">
                              <span className="text-red-300/50 uppercase text-[10px]">Mutant</span>
                              <div className="bg-red-950/40 p-2 rounded border border-red-500/20 text-red-200/90 overflow-x-auto">
                                  {mutant.mutatedCode}
                              </div>
                          </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
