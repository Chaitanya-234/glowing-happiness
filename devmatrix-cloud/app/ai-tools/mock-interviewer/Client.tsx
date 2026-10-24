'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { InterviewQuestionSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type InterviewData = z.infer<typeof InterviewQuestionSchema>;

export default function MockInterviewerClient() {
  const [jobRole, setJobRole] = useState('');
  const [techStack, setTechStack] = useState('');
  const [experience, setExperience] = useState('Mid-Level');
  const [result, setResult] = useState<InterviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!jobRole) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Generate 5 interview questions for a ${experience} ${jobRole} role.
      Tech Stack: ${techStack || 'General'}.
      Include a mix of Technical, Behavioral, and System Design questions appropriate for this level.`;

      const data = await generateStructuredContent(
        prompt,
        'interview'
      );
      setResult(data as InterviewData);
    } catch (error) {
      console.error(error);
      alert('Failed to generate interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20">
        <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-purple-200/70 mb-2 font-medium">Job Role</label>
              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-blue-400 focus:outline-none text-purple-100 placeholder-purple-500/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-purple-200/70 mb-2 font-medium">Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-blue-400 focus:outline-none text-purple-100 transition-colors"
              >
                <option>Intern</option>
                <option>Junior</option>
                <option>Mid-Level</option>
                <option>Senior</option>
                <option>Staff/Principal</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-purple-200/70 mb-2 font-medium">Tech Stack / Skills (Optional)</label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. React, Node.js, AWS, Kubernetes"
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-blue-400 focus:outline-none text-purple-100 placeholder-purple-500/30 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !jobRole}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] ${
              loading || !jobRole
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Questions...
              </span>
            ) : (
              'Start Interview Session 🚀'
            )}
          </button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {result.questions.map((q, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-purple-900/10 border border-purple-500/20 rounded-xl overflow-hidden hover:bg-purple-900/20 transition-colors"
                >
                  <button
                    onClick={() => setActiveQuestion(activeQuestion === idx ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-start gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          q.type === 'Technical' ? 'bg-blue-500/20 text-blue-200' :
                          q.type === 'Behavioral' ? 'bg-green-500/20 text-green-200' :
                          'bg-orange-500/20 text-orange-200'
                        }`}>
                          {q.type}
                        </span>
                        <span className="text-purple-300/40 text-sm">Question {idx + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-purple-100">{q.question}</h3>
                    </div>
                    <span className="text-purple-400 text-2xl">
                      {activeQuestion === idx ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {activeQuestion === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-purple-500/20 bg-black/20"
                      >
                        <div className="p-6 space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-purple-300/70 mb-1 uppercase tracking-wider">Ideal Answer</h4>
                            <p className="text-purple-100/80 leading-relaxed">{q.idealAnswer}</p>
                          </div>
                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-yellow-200/70 mb-1 uppercase tracking-wider flex items-center gap-2">
                              <span>💡</span> Pro Tip
                            </h4>
                            <p className="text-yellow-100/80 text-sm">{q.tips}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
