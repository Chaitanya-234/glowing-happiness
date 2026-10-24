'use client';

import { useState } from 'react';
import { Sparkles, FileText, Loader2, BookOpen } from 'lucide-react';
import { generateLiteratureReview } from '../actions';
import { toast } from 'sonner';

interface LiteratureReviewProps {
  papers: any[];
}

export default function LiteratureReview({ papers }: LiteratureReviewProps) {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [review, setReview] = useState<any>(null);

  const handleGenerate = async () => {
    if (!papers || papers.length < 2) {
      toast.error("Need at least 2 papers for a literature review.");
      return;
    }
    if (!topic.trim()) {
      toast.error("Please enter a research topic.");
      return;
    }

    setLoading(true);
    try {
        const result = await generateLiteratureReview(papers, topic);
        if (result.success) {
            setReview(result.data);
            toast.success("Literature review generated!");
        } else {
            toast.error(result.error || "Failed to generate review");
        }
    } catch (err) {
        toast.error("An error occurred during generation.");
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <Loader2 className="w-12 h-12 text-violet-500 animate-spin mb-4" />
              <p className="text-slate-600 dark:text-slate-300 font-medium">Writing Literature Review...</p>
              <p className="text-sm text-slate-500 mt-1">Synthesizing findings from {papers.length} papers</p>
          </div>
      );
  }

  if (review) {
      return (
          <div className="space-y-8">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm max-w-4xl mx-auto prose dark:prose-invert">
                  <h1 className="text-2xl font-bold mb-6">{review.title}</h1>

                  <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Introduction</h3>
                      <p>{review.introduction}</p>
                  </div>

                  {review.themes.map((theme: any, i: number) => (
                      <div key={i} className="mb-6">
                          <h3 className="text-lg font-semibold mb-2">{theme.name}</h3>
                          <p>{theme.synthesis}</p>
                          <p className="text-sm text-slate-500 mt-1 italic">
                              Key Sources: {theme.keyCitations.join(', ')}
                          </p>
                      </div>
                  ))}

                  <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Research Gaps</h3>
                      <p>{review.gapAnalysis}</p>
                  </div>

                  <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Conclusion</h3>
                      <p>{review.conclusion}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="text-lg font-semibold mb-4">Bibliography</h3>
                      <ul className="list-disc pl-5 space-y-2">
                          {review.bibliography.map((ref: string, i: number) => (
                              <li key={i} className="text-sm">{ref}</li>
                          ))}
                      </ul>
                  </div>
              </div>

              <div className="flex justify-center">
                  <button
                    onClick={() => setReview(null)}
                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                      Start New Review
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
      <BookOpen className="w-16 h-16 text-violet-200 dark:text-violet-800 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Generate Literature Review</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6 text-center">
          AI will synthesize your selected papers into a structured review with themes, citations, and gap analysis.
      </p>

      <div className="w-full max-w-md space-y-4">
          <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Research Topic / Title
              </label>
              <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Machine Learning in Healthcare 2020-2024"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500 outline-none"
              />
          </div>

          <button
            onClick={handleGenerate}
            disabled={papers.length < 2 || !topic.trim()}
            className="w-full px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
              <Sparkles className="w-4 h-4" />
              Generate Review ({papers.length} Papers)
          </button>

          {papers.length < 2 && (
              <p className="text-xs text-amber-500 text-center">Need at least 2 analyzed papers in library.</p>
          )}
      </div>
    </div>
  );
}
