'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, Mail, Users, Clock, Send, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function SaasEmailGeneratorClient() {
  const [userData, setUserData] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('Churn Reduction');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!userData.trim()) {
      toast.error('Please enter user data context');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = `
        Generate a ${campaignGoal} email sequence for a SaaS product based on the following user context:

        User Context/Behavior:
        ${userData}

        The sequence should include 3-5 emails.
        For each email, specify the Stage (e.g., Warning, Offer, Feedback), Subject Line, Body Content, and Recommended Delay (e.g., "2 days after previous").
      `;

      const data = await generateStructuredContent(prompt, 'saas_email_generator');
      setResult(data);
      toast.success('Email sequence generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate email sequence. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast.success('Email body copied to clipboard');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-purple-900/30 mb-4 ring-1 ring-purple-500/20">
          <Mail className="w-8 h-8 text-pink-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 mb-4">
          Lifecycle Email Generator
        </h1>
        <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
          Automate your customer communication. Generate personalized sequences for trial onboarding, churn prevention, and upsells.
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
                Campaign Goal
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Trial Onboarding', 'Churn Reduction', 'Upsell / Expansion'].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setCampaignGoal(goal)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                      campaignGoal === goal
                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                        : 'bg-purple-900/20 text-purple-300 hover:bg-purple-900/40'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200/80 mb-2">
                User Context & Behavior
              </label>
              <textarea
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
                placeholder="e.g., User is on the Pro plan ($49/mo) but hasn't logged in for 14 days. They never used the 'Reports' feature..."
                className="w-full h-48 bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50 resize-none transition-all"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Sequence...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Generate Emails
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
                <Users className="w-16 h-16 mb-4" />
                <p>Define your campaign to view email drafts</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {result.sequences.map((email: any, idx: number) => (
                  <div key={idx} className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 relative group hover:bg-purple-900/20 transition-all">
                    <div className="flex items-center justify-between mb-4 border-b border-purple-500/10 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider">
                          {email.stage}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-purple-400/60">
                          <Clock className="w-3 h-3" />
                          {email.delay}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(email.body, idx)}
                        className="text-purple-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-purple-500/20"
                        title="Copy Body"
                      >
                        {copiedIndex === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-purple-400 font-mono uppercase">Subject:</span>
                        <h3 className="text-lg font-semibold text-white mt-1">{email.subject}</h3>
                      </div>

                      <div className="bg-black/40 rounded-xl p-4 text-purple-100/80 text-sm whitespace-pre-wrap leading-relaxed font-sans">
                        {email.body}
                      </div>
                    </div>
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
