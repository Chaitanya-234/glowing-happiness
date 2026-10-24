'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { PerformanceTestSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type PerformanceData = z.infer<typeof PerformanceTestSchema>;

export default function PerformanceTestCreatorClient() {
  const [endpoints, setEndpoints] = useState('');
  const [tool, setTool] = useState('k6 (JavaScript)');
  const [result, setResult] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!endpoints) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Create a performance test script using ${tool} for these endpoints.
      Configure for load testing with ramp-up.

      Endpoints/Description:
      ${endpoints}
      `;

      const data = await generateStructuredContent(
        prompt,
        'performance_test'
      );
      setResult(data as PerformanceData);
    } catch (error) {
      console.error(error);
      alert('Failed to generate script. Please try again.');
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
                <span className="text-purple-200/70 text-sm font-semibold">Target Endpoints</span>
                <select
                  value={tool}
                  onChange={(e) => setTool(e.target.value)}
                  className="bg-black/40 text-purple-100 text-xs px-2 py-1 rounded border border-purple-500/20 focus:outline-none"
                >
                  {['k6 (JavaScript)', 'JMeter (XML)', 'Gatling (Scala)', 'Locust (Python)'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
             </div>
             <textarea
               value={endpoints}
               onChange={(e) => setEndpoints(e.target.value)}
               spellCheck={false}
               className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-purple-100 focus:outline-none resize-none placeholder-purple-500/20"
               placeholder="GET /api/users&#10;POST /api/login&#10;...or paste curl commands"
             />
          </div>

          {/* Output Side */}
          <div className="flex flex-col h-full bg-black/40 border border-purple-500/20 rounded-xl overflow-hidden relative">
             <div className="bg-purple-900/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
                <span className="text-purple-200/70 text-sm font-semibold">Load Test Script</span>
                {result && (
                  <button
                    onClick={() => navigator.clipboard.writeText(result.scriptCode)}
                    className="text-xs bg-red-500/20 text-red-200 px-2 py-1 rounded hover:bg-red-500/40 transition-colors"
                  >
                    Copy Script
                  </button>
                )}
             </div>
             <div className="flex-1 w-full overflow-auto bg-[#0d0d0d]">
                {loading ? (
                   <div className="h-full flex items-center justify-center">
                     <div className="flex flex-col items-center gap-4">
                       <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                       <span className="text-red-500/50 text-sm animate-pulse">Configuring virtual users...</span>
                     </div>
                   </div>
                ) : result ? (
                   <div className="p-4 space-y-6">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-red-900/10 p-2 rounded border border-red-500/10 text-center">
                              <div className="text-[10px] text-red-400">Virtual Users</div>
                              <div className="text-xl font-bold text-white">{result.configuration.virtualUsers}</div>
                          </div>
                          <div className="bg-red-900/10 p-2 rounded border border-red-500/10 text-center">
                              <div className="text-[10px] text-red-400">Duration</div>
                              <div className="text-xl font-bold text-white">{result.configuration.duration}</div>
                          </div>
                          <div className="bg-red-900/10 p-2 rounded border border-red-500/10 text-center">
                              <div className="text-[10px] text-red-400">Ramp-up</div>
                              <div className="text-xl font-bold text-white">{result.configuration.rampUpPeriod}</div>
                          </div>
                      </div>

                      <pre className="p-4 rounded-lg bg-black/30 font-mono text-xs text-red-100/80 whitespace-pre-wrap overflow-x-auto">
                          {result.scriptCode}
                      </pre>
                   </div>
                ) : (
                   <div className="h-full flex items-center justify-center text-purple-500/20 text-sm">
                      Ready to build load test
                   </div>
                )}
             </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
           <button
             onClick={handleGenerate}
             disabled={loading || !endpoints}
             className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${
               loading || !endpoints
                 ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                 : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:scale-105'
             }`}
           >
             {loading ? 'Processing...' : 'Create Suite 📈'}
           </button>
        </div>
    </div>
  );
}
