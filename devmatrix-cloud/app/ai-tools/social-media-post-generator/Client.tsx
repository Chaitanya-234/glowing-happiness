'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateContent } from '@/app/actions/gemini';

export default function SocialMediaPostGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [tone, setTone] = useState('Professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const prompt = `Write a social media post for ${platform} about "${topic}".
      Tone: ${tone}

      Include:
      1. Engaging Hook
      2. Main Content (formatted for ${platform})
      3. Relevant Hashtags
      4. Call to Action
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
    alert('Post copied to clipboard!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm space-y-6">
            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Post Topic</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-pink-500/40 focus:outline-none h-32"
                placeholder="What do you want to post about?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-pink-500/40 focus:outline-none"
                  >
                    <option>LinkedIn</option>
                    <option>Twitter / X</option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-pink-500/40 focus:outline-none"
                  >
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Funny</option>
                    <option>Inspirational</option>
                    <option>Controversial</option>
                  </select>
                </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                loading || !topic
                  ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 hover:scale-[1.02]'
              }`}
            >
              {loading ? 'Generating...' : 'Generate Post 🚀'}
            </button>
          </div>

          {/* Result */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-semibold text-purple-100/70">Generated Post</h3>
               {result && (
                 <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
                  >
                    Copy
                  </button>
               )}
            </div>
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 h-full min-h-[400px] overflow-auto">
               {result ? (
                 <pre className="whitespace-pre-wrap text-purple-100/80 font-mono text-sm leading-relaxed">
                   {result}
                 </pre>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-purple-200/20">
                    <span className="text-4xl mb-4">📱</span>
                    <p>Enter details and click generate</p>
                 </div>
               )}
            </div>
          </div>
        </div>
    </div>
  );
}
