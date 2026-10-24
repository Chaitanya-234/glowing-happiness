'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateContent } from '@/app/actions/gemini';

export default function AICodeExplainerClient() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Auto-detect');
  const [detailLevel, setDetailLevel] = useState('Detailed');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!code) return;
    setLoading(true);
    try {
      const prompt = `Explain the following code snippet.
      Language: ${language}
      Detail Level: ${detailLevel}

      Code:
      \`\`\`
      ${code}
      \`\`\`

      Provide:
      1. Summary of what the code does.
      2. Line-by-line or block-by-block explanation.
      3. Potential issues or improvements (if any).
      `;

      const content = await generateContent(prompt);
      setResult(content);
    } catch (error) {
      console.error(error);
      setResult('Error generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('Explanation copied to clipboard!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm space-y-6"
          >
            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Paste Code Here</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-green-400/40 focus:outline-none h-64 font-mono text-sm resize-none"
                placeholder="// Paste your code snippet here..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-green-400/40 focus:outline-none"
                  >
                    <option>Auto-detect</option>
                    <option>JavaScript</option>
                    <option>Python</option>
                    <option>Java</option>
                    <option>C++</option>
                    <option>Go</option>
                    <option>Rust</option>
                    <option>TypeScript</option>
                    <option>SQL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold">Detail Level</label>
                  <select
                    value={detailLevel}
                    onChange={(e) => setDetailLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-green-400/40 focus:outline-none"
                  >
                    <option>Detailed</option>
                    <option>Concise</option>
                    <option>ELI5 (Beginner)</option>
                  </select>
                </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !code}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                loading || !code
                  ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-purple-600 text-white hover:from-green-500 hover:to-purple-500 hover:scale-[1.02]'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : 'Explain Code 🧠'}
            </button>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-semibold text-purple-100/70">Explanation</h3>
               {result && (
                 <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy
                  </button>
               )}
            </div>
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 h-full min-h-[500px] overflow-auto shadow-inner shadow-black/50">
               {result ? (
                 <article className="prose prose-invert prose-sm max-w-none text-purple-100/80 leading-relaxed">
                   <div className="whitespace-pre-wrap">{result}</div>
                 </article>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-purple-200/20">
                    <span className="text-6xl mb-6 opacity-50">🤖</span>
                    <p className="text-lg font-medium">Paste your code on the left to get started</p>
                    <p className="text-sm mt-2 max-w-xs text-center">Our AI will break down the logic, syntax, and provide improvement tips.</p>
                 </div>
               )}
            </div>
          </motion.div>
        </div>
    </div>
  );
}
