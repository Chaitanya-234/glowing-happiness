'use client';

import { ExternalLink, BookOpen } from 'lucide-react';

interface RelatedPapersProps {
  papers: any[]; // From paper.relatedPapers
}

export default function RelatedPapers({ papers }: RelatedPapersProps) {
  if (!papers || papers.length === 0) return null;

  return (
    <div className="space-y-4">
      {papers.map((paper, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 line-clamp-2">
            {paper.title}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            {paper.authors.join(', ')} • {paper.year}
          </p>

          <div className="flex items-center gap-2 mb-3">
             <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium rounded-full">
               {Math.round(paper.relevanceScore)}% Relevant
             </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-3">
            "{paper.reason}"
          </p>

          <a
            href={`https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Find on Google Scholar <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
    </div>
  );
}
