'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { UserStorySchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type StoryData = z.infer<typeof UserStorySchema>;

export default function UserStoryGeneratorClient() {
  const [feature, setFeature] = useState('');
  const [persona, setPersona] = useState('');
  const [result, setResult] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!feature) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Write a user story for the following feature.
      Feature Idea: ${feature}
      Target User Persona: ${persona || 'General User'}

      Include the user story in standard "As a... I want... So that..." format.
      Provide Acceptance Criteria in Gherkin (Given/When/Then) syntax.
      Add technical notes for developers.`;

      const data = await generateStructuredContent(
        prompt,
        'story'
      );
      setResult(data as StoryData);
    } catch (error) {
      console.error(error);
      alert('Failed to generate user story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Title: ${result.title}\n\nStory: ${result.userStory}\n\nAcceptance Criteria:\n${result.acceptanceCriteria.join('\n')}\n\nNotes:\n${result.technicalNotes.join('\n')}`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20">
        <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl mb-8">
           <div className="space-y-6">
              <div>
                <label className="block text-purple-200/70 mb-2 font-medium">Feature Idea / Requirement</label>
                <textarea
                  value={feature}
                  onChange={(e) => setFeature(e.target.value)}
                  placeholder="e.g. Allow users to reset their password via email link..."
                  className="w-full h-32 p-4 bg-black/40 border border-purple-500/30 rounded-xl focus:border-cyan-400 focus:outline-none text-purple-100 placeholder-purple-500/30 resize-none"
                />
              </div>

              <div>
                <label className="block text-purple-200/70 mb-2 font-medium">User Persona (Optional)</label>
                <input
                  type="text"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  placeholder="e.g. Admin Administrator, New Customer"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-cyan-400 focus:outline-none text-purple-100 placeholder-purple-500/30"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !feature}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                  loading || !feature
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-[1.01]'
                }`}
              >
                {loading ? 'Drafting Story...' : 'Generate User Story 📝'}
              </button>
           </div>
        </div>

        <AnimatePresence>
           {result && (
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white/5 border border-purple-500/30 rounded-xl overflow-hidden shadow-2xl"
             >
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-6 border-b border-purple-500/20 flex justify-between items-start">
                   <div>
                     <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">Jira Ticket Preview</span>
                     <h2 className="text-xl font-bold text-white">{result.title}</h2>
                   </div>
                   <button
                     onClick={copyToClipboard}
                     className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded transition-colors"
                   >
                     Copy All
                   </button>
                </div>

                <div className="p-8 space-y-8">
                   {/* Story */}
                   <div>
                      <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">User Story</h3>
                      <p className="text-lg text-white/90 italic border-l-4 border-cyan-500 pl-4 py-2 bg-cyan-500/5">
                         {result.userStory}
                      </p>
                   </div>

                   {/* Acceptance Criteria */}
                   <div>
                      <h3 className="text-sm font-bold text-green-300 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Acceptance Criteria (AC)</h3>
                      <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-green-100/80 space-y-2">
                         {result.acceptanceCriteria.map((ac, idx) => (
                           <div key={idx} className="flex gap-2">
                             <span className="text-green-500/50 select-none">{idx + 1}.</span>
                             <span>{ac}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Technical Notes */}
                   <div>
                      <h3 className="text-sm font-bold text-orange-300 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Dev Notes</h3>
                      <ul className="list-disc list-inside text-orange-100/70 space-y-1 ml-2">
                         {result.technicalNotes.map((note, idx) => (
                           <li key={idx}>{note}</li>
                         ))}
                      </ul>
                   </div>
                </div>
             </motion.div>
           )}
        </AnimatePresence>
    </div>
  );
}
