'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, FileText, Database, Server, List, CheckCircle2 } from 'lucide-react';

type TechSpec = {
  title: string;
  problemStatement: string;
  proposedSolution: string;
  userStories: string[];
  databaseSchema: {
    table: string;
    fields: string[];
  }[];
  apiEndpoints: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description: string;
  }[];
};

export default function SpecGeneratorClient() {
  const [feature, setFeature] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TechSpec | null>(null);

  const handleGenerate = async () => {
    if (!feature) return;
    setLoading(true);
    setResult(null);

    try {
      const prompt = `Write a technical specification (PRD) for a feature: "${feature}".
      Context/Additional Info: ${context}.
      Include detailed DB schema and API endpoints.`;

      const data = await generateStructuredContent(prompt, 'tech_spec');
      setResult(data as TechSpec);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-4"
          >
            <FileText className="w-10 h-10 text-cyan-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Technical Spec Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Turn feature ideas into professional PRDs with database schemas and API designs instantly.
          </p>
        </div>

        {/* Input */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4 backdrop-blur-md">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Feature Name / Description</label>
                <textarea
                  value={feature}
                  onChange={(e) => setFeature(e.target.value)}
                  placeholder="e.g. Real-time chat system with typing indicators and read receipts"
                  className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Technical Constraints (Optional)</label>
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. Must use PostgreSQL and Redis"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading || !feature}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <FileText className="w-5 h-5" />}
                Generate Spec
              </button>
            </div>
          </motion.div>

          {/* Results Preview (Empty State or Loaded) */}
          <div className="space-y-6">
            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                    <h2 className="text-2xl font-bold text-white">{result.title}</h2>
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Problem</h3>
                      <p className="text-gray-400 text-sm">{result.problemStatement}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider">Solution</h3>
                      <p className="text-gray-400 text-sm">{result.proposedSolution}</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {/* Database Schema */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                       <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                        <Database className="w-5 h-5" /> Database Schema
                      </h3>
                      <div className="grid gap-4">
                        {result.databaseSchema.map((table, i) => (
                          <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5">
                            <h4 className="font-mono text-yellow-400 font-bold mb-2">{table.table}</h4>
                            <div className="flex flex-wrap gap-2">
                              {table.fields.map((f, fi) => (
                                <span key={fi} className="px-2 py-1 text-xs font-mono rounded bg-white/10 text-gray-300">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* API Endpoints */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                      <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                        <Server className="w-5 h-5" /> API Endpoints
                      </h3>
                      <div className="space-y-3">
                        {result.apiEndpoints.map((ep, i) => (
                          <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-black/40 border border-white/5">
                            <span className={`
                              px-2 py-1 rounded text-xs font-bold uppercase
                              ${ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : ''}
                              ${ep.method === 'POST' ? 'bg-green-500/20 text-green-400' : ''}
                              ${ep.method === 'DELETE' ? 'bg-red-500/20 text-red-400' : ''}
                              ${ep.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                              ${ep.method === 'PATCH' ? 'bg-orange-500/20 text-orange-400' : ''}
                            `}>
                              {ep.method}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-sm text-gray-300 truncate">{ep.path}</p>
                              <p className="text-xs text-gray-500 mt-1">{ep.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-3xl text-gray-600">
                  <div className="text-center space-y-2">
                    <List className="w-12 h-12 mx-auto opacity-20" />
                    <p>Enter a feature to generate specs</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
