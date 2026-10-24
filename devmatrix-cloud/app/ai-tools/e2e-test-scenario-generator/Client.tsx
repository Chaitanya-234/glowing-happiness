'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { E2ETestScenarioSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type E2EData = z.infer<typeof E2ETestScenarioSchema>;

export default function E2ETestScenarioGeneratorClient() {
  const [userStory, setUserStory] = useState('');
  const [framework, setFramework] = useState('Cypress');
  const [result, setResult] = useState<E2EData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!userStory) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Convert the following user story into an E2E test scenario and script using ${framework}.
      Outline the steps and provide the full code.

      User Story:
      ${userStory}
      `;

      const data = await generateStructuredContent(
        prompt,
        'e2e_scenario'
      );
      setResult(data as E2EData);
    } catch (error) {
      console.error(error);
      alert('Failed to generate scenario. Please try again.');
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
                <span className="text-purple-200/70 text-sm font-semibold">User Story / Requirement</span>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="bg-black/40 text-purple-100 text-xs px-2 py-1 rounded border border-purple-500/20 focus:outline-none"
                >
                  {['Cypress', 'Playwright', 'Selenium (Python)', 'Selenium (Java)', 'Puppeteer'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
             </div>
             <textarea
               value={userStory}
               onChange={(e) => setUserStory(e.target.value)}
               spellCheck={false}
               className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-purple-100 focus:outline-none resize-none placeholder-purple-500/20"
               placeholder="As a user, I want to..."
             />
          </div>

          {/* Output Side */}
          <div className="flex flex-col h-full bg-black/40 border border-purple-500/20 rounded-xl overflow-hidden relative">
             <div className="bg-purple-900/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
                <span className="text-purple-200/70 text-sm font-semibold">Test Scenario & Script</span>
             </div>
             <div className="flex-1 w-full overflow-auto bg-[#0d0d0d]">
                {loading ? (
                   <div className="h-full flex items-center justify-center">
                     <div className="flex flex-col items-center gap-4">
                       <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                       <span className="text-orange-500/50 text-sm animate-pulse">Designing scenario...</span>
                     </div>
                   </div>
                ) : result ? (
                   <div className="p-4 space-y-6">
                      <div className="space-y-4">
                          {result.scenarios.map((scenario, idx) => (
                              <div key={idx}>
                                  <h3 className="text-orange-400 font-bold mb-2">{scenario.title}</h3>
                                  <div className="bg-purple-900/10 p-3 rounded-lg border border-purple-500/10 mb-4">
                                      <div className="text-xs text-purple-300 font-semibold mb-2">Test Steps:</div>
                                      <ol className="list-decimal list-inside text-sm text-purple-200/80 space-y-1">
                                          {scenario.steps.map((step, i) => <li key={i}>{step}</li>)}
                                      </ol>
                                  </div>
                                  <div className="relative">
                                      <button
                                        onClick={() => navigator.clipboard.writeText(scenario.generatedScript)}
                                        className="absolute top-2 right-2 text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded hover:bg-purple-500/40 transition-colors"
                                      >
                                        Copy
                                      </button>
                                      <pre className="p-4 rounded-lg bg-black/30 font-mono text-xs text-orange-100/80 whitespace-pre-wrap overflow-x-auto">
                                          {scenario.generatedScript}
                                      </pre>
                                  </div>
                              </div>
                          ))}
                      </div>

                      <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-500/10">
                          <h4 className="text-blue-400 font-bold mb-2 text-sm">Best Practices Applied</h4>
                          <ul className="list-disc list-inside text-xs text-purple-200/80 grid grid-cols-1 md:grid-cols-2 gap-1">
                              {result.bestPractices.map((bp, i) => <li key={i}>{bp}</li>)}
                          </ul>
                      </div>
                   </div>
                ) : (
                   <div className="h-full flex items-center justify-center text-purple-500/20 text-sm">
                      Ready to generate scenarios
                   </div>
                )}
             </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
           <button
             onClick={handleGenerate}
             disabled={loading || !userStory}
             className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${
               loading || !userStory
                 ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                 : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:scale-105'
             }`}
           >
             {loading ? 'Processing...' : 'Generate Scenario 🎬'}
           </button>
        </div>
    </div>
  );
}
