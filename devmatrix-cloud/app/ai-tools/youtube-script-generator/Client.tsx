'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateContent } from '@/app/actions/gemini';

export default function YouTubeScriptGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Engaging');
  const [duration, setDuration] = useState('5-10 minutes');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const prompt = `Write a YouTube video script for a video about "${topic}".
      Target Audience: ${audience}
      Tone: ${tone}
      Estimated Duration: ${duration}

      Structure the response with:
      1. Catchy Title Options
      2. Hook (0:00-0:30)
      3. Intro
      4. Main Content Points
      5. Call to Action & Outro
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
    alert('Script copied to clipboard!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm space-y-6">
            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Video Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-red-500/40 focus:outline-none"
                placeholder="e.g. How to learn React in 2025"
              />
            </div>

            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-red-500/40 focus:outline-none"
                placeholder="e.g. Beginners, Tech Enthusiasts"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-red-500/40 focus:outline-none"
                  >
                    <option>Engaging</option>
                    <option>Educational</option>
                    <option>Funny</option>
                    <option>Professional</option>
                    <option>Dramatic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-red-500/40 focus:outline-none"
                  >
                    <option>Short (&lt; 1 min)</option>
                    <option>5-10 minutes</option>
                    <option>10-20 minutes</option>
                    <option>Deep Dive (20+ min)</option>
                  </select>
                </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                loading || !topic
                  ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-purple-600 text-white hover:from-red-500 hover:to-purple-500 hover:scale-[1.02]'
              }`}
            >
              {loading ? 'Generating Script...' : 'Generate Script 🚀'}
            </button>
          </div>

          {/* Result */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-semibold text-purple-100/70">Generated Script</h3>
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
                    <span className="text-4xl mb-4">🎬</span>
                    <p>Enter details and click generate</p>
                 </div>
               )}
            </div>
          </div>
        </div>
    </div>
  );
}
