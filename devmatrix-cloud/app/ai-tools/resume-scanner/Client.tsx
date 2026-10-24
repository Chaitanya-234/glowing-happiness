'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { ResumeAnalysisSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type AnalysisData = z.infer<typeof ResumeAnalysisSchema>;

export default function ResumeScannerClient() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!resumeText || !jobDescription) return;
    setLoading(true);
    try {
      const prompt = `Analyze this resume against the job description.
      Resume: "${resumeText.slice(0, 5000)}"
      Job Description: "${jobDescription.slice(0, 2000)}"

      Provide a match score (0-100), identify missing keywords that are important for ATS, give critical feedback on improvements, and suggest a better professional summary.`;

      const data = await generateStructuredContent(
        prompt,
        'resume'
      );
      setResult(data as AnalysisData);
    } catch (error) {
      console.error(error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="space-y-2">
            <label className="text-purple-200/70 font-medium ml-1">Your Resume Content</label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full h-64 p-4 bg-purple-900/10 border border-purple-500/20 rounded-xl focus:border-emerald-500/50 focus:outline-none text-purple-100 placeholder-purple-500/20 resize-none font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-purple-200/70 font-medium ml-1">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-64 p-4 bg-purple-900/10 border border-purple-500/20 rounded-xl focus:border-emerald-500/50 focus:outline-none text-purple-100 placeholder-purple-500/20 resize-none font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleScan}
            disabled={loading || !resumeText || !jobDescription}
            className={`px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105 ${
              loading || !resumeText || !jobDescription
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-emerald-500/25'
            }`}
          >
            {loading ? 'Analyzing...' : 'Scan Resume 🔍'}
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Score Card */}
            <div className="md:col-span-1 bg-purple-900/10 border border-purple-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-purple-900/40" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * result.score) / 100}
                    className={`${result.score > 70 ? 'text-emerald-500' : result.score > 40 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{result.score}%</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-purple-100">Match Score</h3>
              <p className="text-purple-300/50 text-sm mt-2">
                {result.score > 70 ? 'Great match! Minor tweaks needed.' : 'Optimization recommended.'}
              </p>
            </div>

            {/* Analysis Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Missing Keywords */}
              <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                  <span>⚠️</span> Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.length > 0 ? (
                    result.missingKeywords.map((keyword, i) => (
                      <span key={i} className="px-3 py-1 bg-red-500/10 text-red-200 border border-red-500/20 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-emerald-400">All key terms detected! 🎉</span>
                  )}
                </div>
              </div>

              {/* Improved Summary */}
              <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <span>✨</span> Suggested Profile Summary
                </h3>
                <p className="text-purple-100/80 leading-relaxed text-sm">
                  {result.improvedSummary}
                </p>
              </div>

              {/* Critical Feedback */}
              <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6">
                 <h3 className="text-lg font-bold text-blue-400 mb-4">Actionable Feedback</h3>
                 <ul className="space-y-3">
                   {result.criticalFeedback.map((item, i) => (
                     <li key={i} className="flex items-start gap-3 text-purple-200/80 text-sm">
                       <span className="mt-1 block min-w-[6px] h-[6px] rounded-full bg-blue-500" />
                       {item}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          </motion.div>
        )}
    </div>
  );
}
