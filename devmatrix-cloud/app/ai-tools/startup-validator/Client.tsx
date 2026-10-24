'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, Rocket, TrendingUp, ShieldAlert, Swords, Target } from 'lucide-react';

type StartupValidator = {
  marketAnalysis: {
    totalAddressableMarket: string;
    targetAudience: string;
  };
  competitors: {
    name: string;
    strength: string;
    weakness: string;
  }[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  mvpFeatures: {
    feature: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
  verdict: {
    viabilityScore: number;
    summary: string;
  };
};

export default function StartupValidatorClient() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StartupValidator | null>(null);

  const handleValidate = async () => {
    if (!idea) return;
    setLoading(true);
    setResult(null);

    try {
      const prompt = `Validate this startup idea: "${idea}".
      Provide market analysis, competitors, SWOT, and MVP features.`;

      const data = await generateStructuredContent(prompt, 'startup_validator');
      setResult(data as StartupValidator);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-6">
           <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-tr from-green-400/20 to-emerald-600/20 border border-green-500/30 mb-4"
          >
            <Rocket className="w-10 h-10 text-green-400" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
            Startup Idea Validator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Don't build in the dark. Get instant feedback on your startup idea,
            market sizing, and competitor analysis.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-black border border-white/10 rounded-2xl p-2 flex gap-2">
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
                placeholder="Pitch your idea in one sentence..."
                className="flex-1 bg-transparent px-4 py-3 text-lg text-white placeholder-gray-600 focus:outline-none"
              />
              <button
                onClick={handleValidate}
                disabled={loading || !idea}
                className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Validate'}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-8"
            >
              {/* Verdict Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-800"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className={result.verdict.viabilityScore > 70 ? "text-green-500" : result.verdict.viabilityScore > 40 ? "text-yellow-500" : "text-red-500"}
                      strokeDasharray={`${result.verdict.viabilityScore}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{result.verdict.viabilityScore}</span>
                    <span className="text-xs text-gray-500 uppercase">Score</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white">AI Verdict</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{result.verdict.summary}</p>
                </div>
              </div>

              {/* Grid Layout for Details */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* Market Analysis */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                  <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Market Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                      <p className="text-xs text-gray-500 uppercase mb-1">Total Addressable Market</p>
                      <p className="text-xl font-bold text-white">{result.marketAnalysis.totalAddressableMarket}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                      <p className="text-xs text-gray-500 uppercase mb-1">Target Audience</p>
                      <p className="text-sm font-medium text-white">{result.marketAnalysis.targetAudience}</p>
                    </div>
                  </div>
                </div>

                {/* Competitors */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                  <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                    <Swords className="w-5 h-5" /> Competitors
                  </h3>
                  <div className="space-y-3">
                    {result.competitors.map((comp, i) => (
                      <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 text-sm">
                        <div className="font-bold text-white mb-1">{comp.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span className="text-red-300/80">✗ {comp.weakness}</span>
                          <span className="text-green-300/80">✓ {comp.strength}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MVP Features */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                  <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                    <Rocket className="w-5 h-5" /> MVP Feature Roadmap
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {result.mvpFeatures.map((feat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 px-2 py-1 text-[10px] font-bold uppercase rounded-bl-xl
                          ${feat.priority === 'High' ? 'bg-green-500 text-black' :
                            feat.priority === 'Medium' ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'}
                        `}>
                          {feat.priority}
                        </div>
                        <p className="font-medium text-gray-200 mt-2">{feat.feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SWOT Analysis */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" /> SWOT Analysis
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-bold text-green-400 text-sm uppercase">Strengths</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                        {result.swot.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-red-400 text-sm uppercase">Weaknesses</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                        {result.swot.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-blue-400 text-sm uppercase">Opportunities</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                        {result.swot.opportunities.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-orange-400 text-sm uppercase">Threats</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                        {result.swot.threats.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
