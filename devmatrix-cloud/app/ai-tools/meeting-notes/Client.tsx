'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, CheckSquare, ListChecks, Users, Clock, ClipboardList } from 'lucide-react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { MeetingNoteSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type MeetingResult = z.infer<typeof MeetingNoteSchema>;

export default function MeetingNotesClient() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MeetingResult | null>(null);
  const [error, setError] = useState('');

  const handleProcess = async () => {
    if (!transcript.trim()) {
      setError('Please enter a meeting transcript.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const prompt = `Analyze the following meeting transcript/notes.
      Extract a summary, agenda items discussed, key decisions made, and a list of action items with assignees and priority.

      Transcript:
      "${transcript}"`;

      const data = await generateStructuredContent(prompt, 'meeting_notes');
      setResult(data);
    } catch (err) {
      setError('Failed to process transcript. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 pt-24 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 mb-4">
            <Mic className="w-8 h-8 text-rose-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400">
            AI Meeting Minute Taker
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Paste your rough meeting notes or transcript. Get a polished summary with clear action items instantly.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
        >
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300 ml-1">
              Meeting Transcript / Rough Notes
            </label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="John: Let's discuss the Q3 roadmap. Sarah: We need to prioritize the mobile app..."
              className="w-full h-48 bg-gray-800/50 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
            />

            <div className="flex justify-end pt-2">
              <button
                onClick={handleProcess}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-rose-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Notes...
                  </>
                ) : (
                  <>
                    <ClipboardList className="w-5 h-5" />
                    Generate Minutes
                  </>
                )}
              </button>
            </div>
             {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Summary Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{result.meetingTitle}</h2>
                  <div className="h-1 w-20 bg-rose-500 rounded-full mb-6" />

                  <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-rose-400" />
                    Executive Summary
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    {result.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Agenda Items</h4>
                      <ul className="space-y-2">
                        {result.agendaItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Key Decisions</h4>
                      <ul className="space-y-2">
                        {result.decisionsMade.map((decision, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <CheckSquare className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            {decision}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Items Column */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-rose-400" />
                  Action Items
                </h3>
                <div className="space-y-4">
                  {result.actionItems.map((item, idx) => (
                    <div key={idx} className="bg-gray-800/40 p-4 rounded-xl border border-white/5 hover:bg-gray-800/60 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-white bg-gray-700/50 px-2 py-1 rounded">
                          {item.assignee || 'Unassigned'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                          item.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                          item.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-snug">
                        {item.task}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
