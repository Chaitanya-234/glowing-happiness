'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { UnitTestGeneratorSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type UnitTestData = z.infer<typeof UnitTestGeneratorSchema>;

export default function UnitTestGeneratorClient() {
  const [code, setCode] = useState('');
  const [framework, setFramework] = useState('Jest');
  const [result, setResult] = useState<UnitTestData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!code) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Generate a comprehensive unit test suite using ${framework} for the following code.
      Include setup and teardown if necessary. Cover happy paths, edge cases, and potential errors.

      Code:
      ${code}
      `;

      const data = await generateStructuredContent(
        prompt,
        'unit_test'
      );
      setResult(data as UnitTestData);
    } catch (error) {
      console.error(error);
      alert('Failed to generate tests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyFullSuite = () => {
    if (!result) return;
    const fullCode = [
      result.setupCode,
      ...result.testCases.map(tc => `// ${tc.description} (${tc.type})\n${tc.code}`),
      result.teardownCode
    ].filter(Boolean).join('\n\n');
    navigator.clipboard.writeText(fullCode);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px] mb-8">
          {/* Input Side */}
          <div className="flex flex-col h-full bg-purple-900/10 border border-purple-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
             <div className="bg-purple-900/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
                <span className="text-purple-200/70 text-sm font-semibold">Source Code</span>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="bg-black/40 text-purple-100 text-xs px-2 py-1 rounded border border-purple-500/20 focus:outline-none"
                >
                  {['Jest', 'Mocha', 'Jasmine', 'PyTest', 'Unittest', 'JUnit', 'TestNG', 'Go Test', 'RSpec'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
             </div>
             <textarea
               value={code}
               onChange={(e) => setCode(e.target.value)}
               spellCheck={false}
               className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-purple-100 focus:outline-none resize-none placeholder-purple-500/20"
               placeholder="// Paste function or class to test..."
             />
          </div>

          {/* Output Side */}
          <div className="flex flex-col h-full bg-black/40 border border-purple-500/20 rounded-xl overflow-hidden relative">
             <div className="bg-purple-900/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
                <span className="text-purple-200/70 text-sm font-semibold">Generated Test Suite</span>
                {result && (
                  <button
                    onClick={copyFullSuite}
                    className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded hover:bg-blue-500/40 transition-colors"
                  >
                    Copy All
                  </button>
                )}
             </div>
             <div className="flex-1 w-full overflow-auto bg-[#0d0d0d]">
                {loading ? (
                   <div className="h-full flex items-center justify-center">
                     <div className="flex flex-col items-center gap-4">
                       <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                       <span className="text-blue-500/50 text-sm animate-pulse">Generating test cases...</span>
                     </div>
                   </div>
                ) : result ? (
                   <div className="p-4 space-y-6">
                      {result.setupCode && (
                        <div>
                            <div className="text-xs text-purple-500 mb-1">Setup</div>
                            <pre className="font-mono text-sm text-blue-300/90 whitespace-pre-wrap">{result.setupCode}</pre>
                        </div>
                      )}

                      {result.testCases.map((tc, idx) => (
                        <div key={idx} className="border-l-2 border-blue-500/30 pl-4 py-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-purple-300 font-semibold">{tc.description}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                    tc.type === 'Happy Path' ? 'bg-green-500/20 text-green-300' :
                                    tc.type === 'Edge Case' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-red-500/20 text-red-300'
                                }`}>{tc.type}</span>
                            </div>
                            <pre className="font-mono text-sm text-blue-100/80 whitespace-pre-wrap">{tc.code}</pre>
                        </div>
                      ))}

                      {result.teardownCode && (
                        <div>
                            <div className="text-xs text-purple-500 mb-1">Teardown</div>
                            <pre className="font-mono text-sm text-blue-300/90 whitespace-pre-wrap">{result.teardownCode}</pre>
                        </div>
                      )}
                   </div>
                ) : (
                   <div className="h-full flex items-center justify-center text-purple-500/20 text-sm">
                      Ready to generate tests
                   </div>
                )}
             </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
           <button
             onClick={handleGenerate}
             disabled={loading || !code}
             className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${
               loading || !code
                 ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                 : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105'
             }`}
           >
             {loading ? 'Processing...' : 'Generate Tests 🚀'}
           </button>
        </div>
    </div>
  );
}
