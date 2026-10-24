'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { CodeRefactorSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type RefactorData = z.infer<typeof CodeRefactorSchema>;

export default function CodeRefactorClient() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [result, setResult] = useState<RefactorData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRefactor = async () => {
    if (!code) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Refactor the following ${language} code to improve readability, performance, and security.
      Code:
      ${code}

      Identify any security vulnerabilities. Provide the cleaner code and an explanation of changes.`;

      const data = await generateStructuredContent(
        prompt,
        'refactor'
      );
      setResult(data as RefactorData);
    } catch (error) {
      console.error(error);
      alert('Failed to refactor code. Please try again.');
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
                <span className="text-purple-200/70 text-sm font-semibold">Input Code</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-black/40 text-purple-100 text-xs px-2 py-1 rounded border border-purple-500/20 focus:outline-none"
                >
                  {['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'PHP', 'C#'].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
             </div>
             <textarea
               value={code}
               onChange={(e) => setCode(e.target.value)}
               spellCheck={false}
               className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-purple-100 focus:outline-none resize-none placeholder-purple-500/20"
               placeholder="// Paste your code here..."
             />
          </div>

          {/* Output Side */}
          <div className="flex flex-col h-full bg-black/40 border border-purple-500/20 rounded-xl overflow-hidden relative">
             <div className="bg-purple-900/20 px-4 py-3 border-b border-purple-500/20 flex justify-between items-center">
                <span className="text-purple-200/70 text-sm font-semibold">Refactored Output</span>
                {result && (
                  <button
                    onClick={() => navigator.clipboard.writeText(result.refactoredCode)}
                    className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded hover:bg-purple-500/40 transition-colors"
                  >
                    Copy
                  </button>
                )}
             </div>
             <div className="flex-1 w-full overflow-auto bg-[#0d0d0d]">
                {loading ? (
                   <div className="h-full flex items-center justify-center">
                     <div className="flex flex-col items-center gap-4">
                       <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                       <span className="text-orange-500/50 text-sm animate-pulse">Analyzing logic...</span>
                     </div>
                   </div>
                ) : result ? (
                   <pre className="p-4 font-mono text-sm text-green-400/90 whitespace-pre-wrap">
                      {result.refactoredCode}
                   </pre>
                ) : (
                   <div className="h-full flex items-center justify-center text-purple-500/20 text-sm">
                      Ready to optimize
                   </div>
                )}
             </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
           <button
             onClick={handleRefactor}
             disabled={loading || !code}
             className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${
               loading || !code
                 ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                 : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105'
             }`}
           >
             {loading ? 'Processing...' : 'Refactor Code ⚡'}
           </button>
        </div>

        {/* Analysis Report */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
             <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-purple-100 mb-4">Improvements</h3>
                <p className="text-purple-200/70 text-sm leading-relaxed whitespace-pre-line">
                  {result.explanation}
                </p>
             </div>

             <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-purple-100 mb-4 flex items-center gap-2">
                  Security Audit
                  {result.securityIssues.length === 0 && <span className="text-green-500 text-sm font-normal">(Clean)</span>}
                </h3>
                {result.securityIssues.length > 0 ? (
                  <div className="space-y-3">
                    {result.securityIssues.map((issue, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${
                        issue.severity === 'Critical' || issue.severity === 'High'
                          ? 'bg-red-500/10 border-red-500/30'
                          : 'bg-yellow-500/10 border-yellow-500/30'
                      }`}>
                         <div className="flex justify-between mb-1">
                           <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                             issue.severity === 'Critical' || issue.severity === 'High' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                           }`}>
                             {issue.severity.toUpperCase()}
                           </span>
                         </div>
                         <p className="text-purple-100/80 text-sm mt-2">{issue.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center text-green-500/50">
                    <span className="text-4xl mb-2">🛡️</span>
                    <p className="text-sm">No obvious vulnerabilities detected.</p>
                  </div>
                )}
             </div>
          </motion.div>
        )}
    </div>
  );
}
