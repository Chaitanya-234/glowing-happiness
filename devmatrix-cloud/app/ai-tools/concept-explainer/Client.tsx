'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { ConceptExplanationSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type ExplanationData = z.infer<typeof ConceptExplanationSchema>;

export default function ConceptExplainerClient() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('5-year-old');
  const [result, setResult] = useState<ExplanationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleExplain = async () => {
    if (!topic) return;
    setLoading(true);
    setResult(null);
    setSelectedQuizAnswer(null);
    setShowAnswer(false);

    try {
      const prompt = `Explain the concept "${topic}" using the Feynman Technique.
      Target Audience: ${difficulty}.
      Create a simple analogy, a clear plain-text explanation, a fun fact, and a single multiple-choice quiz question to test understanding.`;

      const data = await generateStructuredContent(
        prompt,
        'concept'
      );
      setResult(data as ExplanationData);
    } catch (error) {
      console.error(error);
      alert('Failed to explain concept. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
        <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl mb-12 max-w-3xl mx-auto">
          <div className="space-y-6">
             <div>
               <label className="block text-purple-200/70 mb-2 font-medium">What do you want to learn?</label>
               <input
                 type="text"
                 value={topic}
                 onChange={(e) => setTopic(e.target.value)}
                 placeholder="e.g. Quantum Computing, Kubernetes, Inflation"
                 className="w-full px-5 py-4 bg-black/40 border border-purple-500/30 rounded-xl focus:border-pink-400 focus:outline-none text-purple-100 placeholder-purple-500/30 text-lg transition-colors"
               />
             </div>

             <div>
                <label className="block text-purple-200/70 mb-3 font-medium">Explain it like I&apos;m...</label>
                <div className="grid grid-cols-3 gap-3">
                   {['5-year-old', 'High Schooler', 'Expert Peer'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                          difficulty === level
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25 scale-[1.02]'
                            : 'bg-purple-900/20 text-purple-200/60 hover:bg-purple-800/40'
                        }`}
                      >
                        {level}
                      </button>
                   ))}
                </div>
             </div>

             <button
               onClick={handleExplain}
               disabled={loading || !topic}
               className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all mt-4 ${
                 loading || !topic
                   ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                   : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-[1.02]'
               }`}
             >
               {loading ? 'Teaching...' : 'Explain It To Me 🎓'}
             </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
               {/* Main Explanation */}
               <div className="md:col-span-2 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="text-9xl">💡</span>
                  </div>
                  <h2 className="text-2xl font-bold text-pink-300 mb-6">The Analogy</h2>
                  <p className="text-purple-50 text-lg leading-relaxed mb-8 font-light italic">
                    &quot;{result.analogy}&quot;
                  </p>

                  <div className="bg-black/30 rounded-xl p-6 border border-purple-500/10">
                     <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">In Plain English</h3>
                     <p className="text-purple-200/80 leading-relaxed">
                        {result.simplifiedExplanation}
                     </p>
                  </div>
               </div>

               {/* Fun Fact Card */}
               <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-yellow-200 mb-4 flex items-center gap-2">
                    <span>🌟</span> Fun Fact
                  </h3>
                  <p className="text-yellow-100/80 leading-relaxed flex-1">
                    {result.funFact}
                  </p>
               </div>

               {/* Quiz Card */}
               <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-blue-200 mb-4 flex items-center gap-2">
                    <span>🧠</span> Quick Quiz
                  </h3>
                  <p className="text-blue-100/90 mb-4 font-medium">{result.quizQuestion}</p>
                  <div className="space-y-2 flex-1">
                    {result.quizOptions.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedQuizAnswer(idx); setShowAnswer(true); }}
                        disabled={showAnswer}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                          showAnswer
                            ? idx === result.quizCorrectAnswer
                              ? 'bg-green-500 text-white'
                              : idx === selectedQuizAnswer
                                ? 'bg-red-500 text-white'
                                : 'bg-blue-900/20 text-blue-200/50'
                            : 'bg-blue-900/20 text-blue-100 hover:bg-blue-800/40'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {showAnswer && (
                    <div className="mt-4 text-center text-sm">
                      {selectedQuizAnswer === result.quizCorrectAnswer ? (
                        <span className="text-green-400 font-bold">Correct! 🎉</span>
                      ) : (
                        <span className="text-red-400 font-bold">Oops! The answer was option {result.quizCorrectAnswer + 1}.</span>
                      )}
                    </div>
                  )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
