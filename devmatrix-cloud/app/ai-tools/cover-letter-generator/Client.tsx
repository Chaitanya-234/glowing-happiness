'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateContent } from '@/app/actions/gemini';

export default function CoverLetterGeneratorClient() {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle) return;
    setLoading(true);
    try {
      const prompt = `Write a professional cover letter for the position of "${jobTitle}" at "${company}".
      My Key Skills: ${skills}
      My Experience Highlights: ${experience}

      Keep it professional, persuasive, and concise.
      Use a standard business letter format.
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
    alert('Cover letter copied to clipboard!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm space-y-6">
            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-blue-400/40 focus:outline-none"
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-blue-400/40 focus:outline-none"
                placeholder="e.g. Google"
              />
            </div>

            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Key Skills (comma separated)</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-blue-400/40 focus:outline-none h-24"
                placeholder="React, TypeScript, Node.js, AWS..."
              />
            </div>

            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Experience Highlights</label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-blue-400/40 focus:outline-none h-24"
                placeholder="Led a team of 5, improved performance by 40%..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !jobTitle}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                loading || !jobTitle
                  ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02]'
              }`}
            >
              {loading ? 'Writing...' : 'Generate Cover Letter 📝'}
            </button>
          </div>

          {/* Result */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-semibold text-purple-100/70">Your Cover Letter</h3>
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
                    <span className="text-4xl mb-4">📄</span>
                    <p>Enter details and click generate</p>
                 </div>
               )}
            </div>
          </div>
        </div>
    </div>
  );
}
