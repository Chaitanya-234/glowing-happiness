'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, ListTodo, Target, ArrowUp, BarChart } from 'lucide-react';
import { toast } from 'sonner';

export default function FeaturePrioritizerClient() {
  const [features, setFeatures] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!features.trim()) {
      toast.error('Please enter feature requests');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `
        Prioritize the following SaaS feature requests:

        Feature Requests / Ideas:
        ${features}

        For each feature:
        - Assign an Impact Score (1-10)
        - Assign an Effort Score (1-10)
        - Determine Priority Level (Must Have, Should Have, Could Have, Won't Have)
        - Provide brief reasoning.
      `;

      const data = await generateStructuredContent(prompt, 'feature_priority');
      setResult(data);
      toast.success('Roadmap prioritized!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to prioritize features. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-purple-900/30 mb-4 ring-1 ring-purple-500/20">
          <ListTodo className="w-8 h-8 text-yellow-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
          Feature Prioritizer
        </h1>
        <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
          Build what matters most. Use AI to objectively score and prioritize your product backlog based on impact and effort.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-purple-500/10 rounded-3xl p-6 shadow-2xl h-fit"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200/80 mb-2">
                Feature Requests / Backlog
              </label>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="e.g., Dark Mode, Salesforce Integration, Mobile App, Single Sign-On (SSO), Custom Reports..."
                className="w-full h-48 bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none transition-all"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Prioritizing...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5" />
                  Generate Roadmap
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result && !isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-purple-200/30 p-12 border border-dashed border-purple-500/20 rounded-3xl min-h-[400px]"
              >
                <ListTodo className="w-16 h-16 mb-4" />
                <p>Enter features to view priority matrix</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {result.prioritizedFeatures.map((item: any, idx: number) => (
                  <div key={idx} className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 relative hover:bg-purple-900/20 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                         <div className={`text-xs font-bold px-2 py-1 rounded-md w-fit mb-2 uppercase tracking-wide ${
                          item.priorityLevel === 'Must Have' ? 'bg-green-500/20 text-green-400' :
                          item.priorityLevel === 'Should Have' ? 'bg-yellow-500/20 text-yellow-400' :
                          item.priorityLevel === 'Could Have' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.priorityLevel}
                        </div>
                        <h3 className="text-xl font-bold text-white">{item.featureName}</h3>
                      </div>

                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-xs text-purple-400 mb-1">IMPACT</div>
                          <div className="font-bold text-lg text-green-400">{item.impactScore}</div>
                        </div>
                         <div className="text-center">
                          <div className="text-xs text-purple-400 mb-1">EFFORT</div>
                          <div className="font-bold text-lg text-orange-400">{item.effortScore}</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-purple-200/70 text-sm border-t border-purple-500/10 pt-4 mt-2">
                      <span className="text-purple-400 font-semibold">Reasoning: </span>
                      {item.reasoning}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
