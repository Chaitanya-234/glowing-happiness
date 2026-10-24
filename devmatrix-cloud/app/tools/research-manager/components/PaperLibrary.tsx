'use client';

import { useState } from 'react';
import { Grid, List as ListIcon, Trash2, BookOpen, Star, FileText } from 'lucide-react';

interface PaperLibraryProps {
  papers: any[];
  onSelectPaper: (paper: any) => void;
  onDeletePaper: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function PaperLibrary({ papers, onSelectPaper, onDeletePaper, onToggleFavorite }: PaperLibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (papers.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 h-64">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Your library is empty</p>
              <p className="text-sm text-slate-400 mt-1">Upload a paper to get started</p>
          </div>
      );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">My Library ({papers.length})</h2>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-violet-600 dark:text-violet-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                  <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-violet-600 dark:text-violet-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                  <ListIcon className="w-4 h-4" />
              </button>
          </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {papers.map((paper) => (
            <div
                key={paper.id}
                className="group relative bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500 transition-all cursor-pointer hover:shadow-md"
                onClick={() => onSelectPaper(paper)}
            >
                <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-lg">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleFavorite(paper.id); }}
                            className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${paper.favorite ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`}
                        >
                            <Star className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {paper.metadata.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                     {paper.metadata.authors[0]?.name} et al. • {paper.metadata.year}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {paper.aiAnalysis.executiveSummary}
                </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
            {papers.map((paper) => (
                <div
                    key={paper.id}
                    className="flex items-center gap-4 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500 transition-all cursor-pointer"
                    onClick={() => onSelectPaper(paper)}
                >
                    <div className="p-2 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-lg shrink-0">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {paper.metadata.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                             {paper.metadata.authors.map((a:any) => a.name).join(', ')} • {paper.metadata.year}
                        </p>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => onToggleFavorite(paper.id)}
                            className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${paper.favorite ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`}
                        >
                            <Star className="w-4 h-4" />
                        </button>
                         <button
                            onClick={() => onDeletePaper(paper.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
