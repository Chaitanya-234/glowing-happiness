'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, ShieldAlert, Zap, BookOpen, Mail, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function ChurnReductionStrategistClient() {
  const [churnReason, setChurnReason] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!churnReason.trim()) {
      toast.error('Please enter the churn reason');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `
        Analyze this customer churn scenario and provide a retention strategy:

        Churn Reason / Feedback:
        ${churnReason}

        Identify the primary root cause.
        Suggest immediate actions (quick wins).
        Propose a long-term strategy to prevent this.
        Draft a personal, empathetic retention email to the customer.
      `;

      const data = await generateStructuredContent(prompt, 'churn_strategy');
      setResult(data);
      toast.success('Strategy generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate strategy. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyEmail = () => {
    if (result?.retentionEmailDraft) {
      navigator.clipboard.writeText(result.retentionEmailDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Email draft copied');
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
          <ShieldAlert className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500 mb-4">
          Churn Reduction Strategist
        </h1>
        <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
          Turn exits into opportunities. Analyze why customers leave and get instant, actionable strategies to win them back.
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
                Why is the customer leaving?
              </label>
              <textarea
                value={churnReason}
                onChange={(e) => setChurnReason(e.target.value)}
                placeholder="e.g., 'Too expensive for the value provided', 'Missing integration with Salesforce', 'Found a cheaper competitor'..."
                className="w-full h-48 bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none transition-all"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Developing Strategy...
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5" />
                  Generate Retention Plan
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
                <ShieldAlert className="w-16 h-16 mb-4" />
                <p>Describe the churn reason to get a strategy</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Primary Cause */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">Root Cause Analysis</h3>
                  <p className="text-xl text-white font-semibold">
                    {result.primaryCause}
                  </p>
                </div>

                {/* Immediate Actions */}
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Immediate Actions
                  </h3>
                  <ul className="space-y-3">
                    {result.immediateActions.map((action: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-purple-100/90 text-sm">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Long Term Strategy */}
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Long-Term Prevention
                  </h3>
                  <p className="text-purple-200/80 text-sm leading-relaxed">
                    {result.longTermStrategy}
                  </p>
                </div>

                {/* Email Draft */}
                <div className="bg-black/60 border border-purple-500/20 rounded-2xl p-6 relative group">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-purple-400" /> Retention Email Draft
                    </h3>
                    <button
                      onClick={copyEmail}
                      className="p-2 text-purple-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-4 bg-purple-900/10 rounded-xl text-purple-100/80 text-sm whitespace-pre-wrap font-sans leading-relaxed border border-purple-500/10">
                    {result.retentionEmailDraft}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
