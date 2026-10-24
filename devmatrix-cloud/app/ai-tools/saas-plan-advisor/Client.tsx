'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, DollarSign, BarChart3, TrendingUp, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function SaasPlanAdvisorClient() {
  const [usageData, setUsageData] = useState('');
  const [churnContext, setChurnContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!usageData.trim()) {
      toast.error('Please enter usage data');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `
        Analyze the following SaaS usage distribution and churn context:

        Usage Data:
        ${usageData}

        Churn/Market Context:
        ${churnContext}

        Suggest 3 distinct pricing plans (e.g., Starter, Pro, Enterprise) based on this data.
        Explain the pricing strategy rationale.
        Generate persuasive copy for the pricing page (Headline, Subheadline, CTA).
      `;

      const data = await generateStructuredContent(prompt, 'saas_plan_advisor');
      setResult(data);
      toast.success('Pricing strategy generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate pricing strategy. Please try again.');
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
          <DollarSign className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-4">
          SaaS Pricing Advisor
        </h1>
        <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
          Optimize your monetization strategy. Our AI analyzes your usage patterns to suggest data-driven pricing plans and persuasive copy.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-purple-500/10 rounded-3xl p-6 shadow-2xl"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200/80 mb-2">
                Usage Distributions / User Personas
              </label>
              <textarea
                value={usageData}
                onChange={(e) => setUsageData(e.target.value)}
                placeholder="e.g., 60% of users only use the basic reporting feature. The top 10% heavily use the API and export features..."
                className="w-full h-32 bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200/80 mb-2">
                Churn & Market Context (Optional)
              </label>
              <textarea
                value={churnContext}
                onChange={(e) => setChurnContext(e.target.value)}
                placeholder="e.g., High churn in the first month. Competitors offer a free tier. We want to increase ARPU..."
                className="w-full h-24 bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none transition-all"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Strategy...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  Generate Pricing Plans
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
                className="h-full flex flex-col items-center justify-center text-purple-200/30 p-12 border border-dashed border-purple-500/20 rounded-3xl"
              >
                <BarChart3 className="w-16 h-16 mb-4" />
                <p>Enter your data to receive AI-generated pricing strategies</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Pricing Strategy Rationale */}
                <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Strategy Rationale
                  </h3>
                  <p className="text-purple-100/80 leading-relaxed">
                    {result.pricingStrategy}
                  </p>
                </div>

                {/* Suggested Plans */}
                <div className="grid gap-4">
                  {result.suggestedPlans.map((plan: any, idx: number) => (
                    <div key={idx} className="bg-black/60 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                          <p className="text-purple-300 text-sm mt-1">{plan.targetAudience}</p>
                        </div>
                        <div className="bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                          <span className="text-green-400 font-bold">{plan.price}</span>
                        </div>
                      </div>
                      <p className="text-purple-200/60 text-sm mb-4">{plan.description}</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-start gap-2 text-sm text-purple-100/80">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Pricing Page Copy */}
                <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Copy className="w-24 h-24" />
                  </div>
                  <h4 className="text-xs uppercase tracking-widest text-purple-400 mb-4">Recommended Page Copy</h4>
                  <h2 className="text-3xl font-bold text-white mb-2">{result.pageCopy.headline}</h2>
                  <p className="text-lg text-purple-200/70 mb-6">{result.pageCopy.subheadline}</p>
                  <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors cursor-default">
                    {result.pageCopy.cta}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
