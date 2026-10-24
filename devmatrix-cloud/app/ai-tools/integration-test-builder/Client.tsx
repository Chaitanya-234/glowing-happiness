'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { IntegrationTestBuilderSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type IntegrationTestData = z.infer<typeof IntegrationTestBuilderSchema>;

export default function IntegrationTestBuilderClient() {
  const [input, setInput] = useState('');
  const [tool, setTool] = useState('Supertest (Node.js)');
  const [result, setResult] = useState<IntegrationTestData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Create an integration test suite using ${tool} for the following API description/spec.
      Include prerequisites and cover various scenarios (success, error, auth).

      API Info:
      ${input}
      `;

      const data = await generateStructuredContent(
        prompt,
        'integration_test'
      );
      setResult(data as IntegrationTestData);
    } catch (error) {
      console.error(error);
      alert('Failed to generate tests. Please try again.');
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
                <span className="text-purple-200/70 text-sm font-semibold">API Spec / Description</span>
                <select
                  value={tool}
                  onChange={(e) => setTool(e.target.value)}
                  className="bg-black/40 text-purple-100 text-xs px-2 py-1 rounded border border-purple-500/20 focus:outline-none"
                >
                  {['Supertest (Node.js)', 'Postman Scripts', 'RestAssured (Java)', 'PyTest Requests', 'Go HttpTest'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
             </div>
             <textarea
               value={input}
               onChange={(e) => setInput(e.target.value)}
               spellCheck={false}
               className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-purple-100 focus:outline-none resize-none placeholder-purple-500/20"
               placeholder="// Paste OpenAPI spec, curl, or describe endpoints..."
             />
          </div>

          {/* Output Side */}
          <div className="flex flex-col h-full bg-black/40 border border-purple-500/20 rounded-xl overflow-hidden relative">
             <div className="bg-purple-900/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
                <span className="text-purple-200/70 text-sm font-semibold">Integration Plan & Code</span>
             </div>
             <div className="flex-1 w-full overflow-auto bg-[#0d0d0d]">
                {loading ? (
                   <div className="h-full flex items-center justify-center">
                     <div className="flex flex-col items-center gap-4">
                       <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                       <span className="text-green-500/50 text-sm animate-pulse">Building scenarios...</span>
                     </div>
                   </div>
                ) : result ? (
                   <div className="p-4 space-y-6">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/10">
                          <h3 className="text-green-400 font-bold mb-2">{result.testSuiteDescription}</h3>
                          <div className="text-sm text-purple-300/80">
                            <strong>Prerequisites:</strong>
                            <ul className="list-disc list-inside mt-1 ml-2">
                                {result.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                          </div>
                      </div>

                      <div className="space-y-4">
                          {result.tests.map((test, idx) => (
                              <div key={idx} className="border border-purple-500/20 rounded-lg overflow-hidden">
                                  <div className="bg-purple-900/10 px-4 py-2 border-b border-purple-500/10 flex justify-between items-center">
                                      <div className="flex items-center gap-3">
                                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                              test.method === 'GET' ? 'bg-blue-500/20 text-blue-300' :
                                              test.method === 'POST' ? 'bg-green-500/20 text-green-300' :
                                              test.method === 'DELETE' ? 'bg-red-500/20 text-red-300' :
                                              'bg-yellow-500/20 text-yellow-300'
                                          }`}>{test.method}</span>
                                          <span className="text-sm text-purple-200">{test.endpoint}</span>
                                      </div>
                                      <button
                                        onClick={() => navigator.clipboard.writeText(test.testCode)}
                                        className="text-[10px] text-purple-500 hover:text-purple-300"
                                      >
                                        Copy
                                      </button>
                                  </div>
                                  <div className="p-3 bg-black/20">
                                      <div className="text-xs text-purple-500 mb-2 italic">// {test.scenario}</div>
                                      <pre className="font-mono text-xs text-green-100/80 whitespace-pre-wrap overflow-x-auto">
                                          {test.testCode}
                                      </pre>
                                  </div>
                              </div>
                          ))}
                      </div>
                   </div>
                ) : (
                   <div className="h-full flex items-center justify-center text-purple-500/20 text-sm">
                      Ready to build tests
                   </div>
                )}
             </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
           <button
             onClick={handleGenerate}
             disabled={loading || !input}
             className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${
               loading || !input
                 ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                 : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105'
             }`}
           >
             {loading ? 'Processing...' : 'Build Suite 🛠️'}
           </button>
        </div>
    </div>
  );
}
