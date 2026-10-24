'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, Sparkles, MessageSquare, ThumbsUp, Copy, Check } from 'lucide-react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { EmailAssistantSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type EmailResult = z.infer<typeof EmailAssistantSchema>;

export default function EmailAssistantClient() {
  const [draft, setDraft] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tone, setTone] = useState('Professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleImprove = async () => {
    if (!draft.trim()) {
      setError('Please enter a draft or some context.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const prompt = `Act as an expert email copywriter.
      Task: Improve/Write an email based on the following input.
      Draft/Context: "${draft}"
      Recipient: ${recipient || 'General'}
      Desired Tone: ${tone}

      Provide a polished email body, catchy subject lines, tone analysis, and improvement tips.`;

      const data = await generateStructuredContent(prompt, 'email_assistant');
      setResult(data);
    } catch (err) {
      setError('Failed to process email. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.emailBody) {
      navigator.clipboard.writeText(result.emailBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 pt-24 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column: Input */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-2">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              AI Email Assistant
            </h1>
            <p className="text-gray-400 text-lg">
              Draft perfectly toned emails in seconds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 ml-1 mb-1">Recipient / Audience</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g., Hiring Manager, Client, Team"
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 ml-1 mb-1">Desired Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>Professional</option>
                <option>Friendly & Casual</option>
                <option>Persuasive</option>
                <option>Urgent</option>
                <option>Apologetic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 ml-1 mb-1">Your Draft or Key Points</label>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="I need to ask for a refund because..."
                className="w-full h-48 bg-gray-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              onClick={handleImprove}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Magic in Progress...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Polish & Improve
                </>
              )}
            </button>
             {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
          </motion.div>
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
          <AnimatePresence>
            {!result && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4 min-h-[400px]"
              >
                <Mail className="w-16 h-16 opacity-20" />
                <p>Your polished email will appear here</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Subject Options */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    Subject Line Ideas
                  </h3>
                  <div className="space-y-2">
                    {result.subjectOptions.map((subj, idx) => (
                      <div key={idx} className="p-3 bg-gray-800/50 rounded-lg text-gray-200 text-sm hover:bg-gray-800 transition-colors cursor-pointer border border-white/5">
                        {subj}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Email Body */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative group">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-bold text-white">Email Draft</h3>
                     <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                      </button>
                  </div>

                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed font-sans text-base p-4 bg-gray-800/30 rounded-xl border border-white/5">
                    {result.emailBody}
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                      Tone: {result.toneAnalysis}
                    </span>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-indigo-400" />
                    Pro Tips
                  </h3>
                  <ul className="space-y-2">
                    {result.improvementTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
