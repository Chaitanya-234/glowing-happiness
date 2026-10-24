'use client';

import { useState } from 'react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { motion } from 'framer-motion';
import { Loader2, FileJson, CheckCircle, AlertOctagon, Terminal } from 'lucide-react';
import { ApiContractTestingSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type ContractResult = z.infer<typeof ApiContractTestingSchema>;

export default function ApiContractClient() {
  const [spec, setSpec] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<ContractResult | null>(null);

  const handleGenerate = async () => {
    if (!spec.trim()) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `Analyze this OpenAPI/Swagger spec or API Code and generate contract tests.

Input:
\`\`\`
${spec}
\`\`\`
      `;

      const data = await generateStructuredContent(prompt, 'api_contract_tester');
      setResult(data);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('An error occurred. Please check your input and try again.');
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
            <h2 className="text-purple-100 font-semibold flex-1">OpenAPI Spec / JSON</h2>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !spec.trim()}
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileJson className="w-5 h-5" />
                  Generate Tests
                </>
              )}
            </button>
          </div>

          <div className="relative flex-1 bg-gray-900/50 rounded-xl border border-purple-500/20 overflow-hidden">
            <textarea
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              placeholder="Paste your OpenAPI Specification (JSON/YAML) or API Implementation code here..."
              className="w-full h-full bg-transparent p-6 text-purple-100 font-mono resize-none focus:outline-none custom-scrollbar"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/20 flex justify-between items-center h-[74px]">
             <h2 className="text-xl font-bold text-purple-100 flex items-center gap-2">
               Test Suite
            </h2>
          </div>

          <div className="flex-1 bg-gray-900/50 rounded-xl border border-purple-500/20 overflow-hidden relative">
            {!result && !isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400/30 p-8 text-center">
                <FileJson className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg">Paste an API Spec to generate contract tests.</p>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
                <p className="text-purple-200 animate-pulse">Analyzing spec & generating tests...</p>
              </div>
            )}

            {result && (
              <div className="h-full overflow-y-auto p-6 custom-scrollbar space-y-6">
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-purple-100 mb-2">Coverage Analysis</h3>
                    <p className="text-purple-200/80">{result.coverageAnalysis}</p>
                </div>

                {result.validationIssues.length > 0 && (
                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-purple-100">Schema Issues</h3>
                        {result.validationIssues.map((issue, idx) => (
                             <div key={idx} className="p-3 bg-red-900/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                                 <AlertOctagon className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                                 <div>
                                     <div className="font-mono text-sm text-red-200">{issue.method} {issue.endpoint}</div>
                                     <p className="text-sm text-red-300/70">{issue.issue}</p>
                                 </div>
                             </div>
                        ))}
                     </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-100">Generated Test Cases</h3>
                  {result.generatedTestCases.map((test, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-purple-500/20 bg-black/20 overflow-hidden"
                    >
                      <div className="p-3 bg-purple-900/20 border-b border-purple-500/20 flex justify-between items-center">
                          <h4 className="font-bold text-purple-200 text-sm flex items-center gap-2">
                              <Terminal className="w-4 h-4" />
                              {test.name}
                          </h4>
                      </div>
                      <div className="p-4">
                          <p className="text-sm text-purple-200/60 mb-3">{test.description}</p>
                          <pre className="bg-black/50 p-3 rounded text-xs font-mono text-green-300/90 overflow-x-auto border border-white/10">
                              <code>{test.testCode}</code>
                          </pre>
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
