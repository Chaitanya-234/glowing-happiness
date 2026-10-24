'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateContent } from '@/app/actions/gemini';

export default function StudyPlannerClient() {
  const [topic, setTopic] = useState('');
  const [currentLevel, setCurrentLevel] = useState('Beginner');
  const [goal, setGoal] = useState('');
  const [timeframe, setTimeframe] = useState('4 Weeks');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const prompt = `Create a study plan for learning "${topic}".
      Current Level: ${currentLevel}
      Goal: ${goal}
      Timeframe: ${timeframe}

      Structure the response as a week-by-week (or day-by-day) roadmap.
      Include:
      1. Key Topics to Cover
      2. Recommended Resources (Types of resources, e.g., documentation, tutorials)
      3. Practice Exercises / Projects
      4. Milestones
      `;

      const content = await generateContent(prompt);
      setResult(content);
    } catch (error) {
      console.error(error);
      setResult('Error generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('Study plan copied to clipboard!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm space-y-6">
            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Subject / Skill</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-yellow-400/40 focus:outline-none"
                placeholder="e.g. Machine Learning, Spanish, Guitar"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold">Current Level</label>
                  <select
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-yellow-400/40 focus:outline-none"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                 <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold">Timeframe</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-yellow-400/40 focus:outline-none"
                  >
                    <option>1 Week</option>
                    <option>2 Weeks</option>
                    <option>4 Weeks</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                  </select>
                </div>
            </div>

             <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Specific Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-yellow-400/40 focus:outline-none"
                placeholder="e.g. Build a portfolio project, Pass an exam"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                loading || !topic
                  ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-600 to-purple-600 text-white hover:from-yellow-500 hover:to-purple-500 hover:scale-[1.02]'
              }`}
            >
              {loading ? 'Planning...' : 'Create Roadmap 🗺️'}
            </button>
          </div>

          {/* Result */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-semibold text-purple-100/70">Your Study Plan</h3>
               {result && (
                 <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
                  >
                    Copy
                  </button>
               )}
            </div>
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 h-full min-h-[500px] overflow-auto">
               {result ? (
                 <pre className="whitespace-pre-wrap text-purple-100/80 font-mono text-sm leading-relaxed">
                   {result}
                 </pre>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-purple-200/20">
                    <span className="text-4xl mb-4">📚</span>
                    <p>Enter details and click generate</p>
                 </div>
               )}
            </div>
          </div>
        </div>
    </div>
  );
}
