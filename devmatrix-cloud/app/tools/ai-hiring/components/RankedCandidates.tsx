'use client';

import React, { useState, useMemo } from 'react';

interface RankedCandidatesProps {
  candidates: any[];
  onSelectCandidate: (candidate: any) => void;
}

export default function RankedCandidates({ candidates, onSelectCandidate }: RankedCandidatesProps) {
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'name'>('score');
  const [filter, setFilter] = useState<'all' | 'strong' | 'good' | 'weak' | 'redFlags'>('all');

  const processedCandidates = useMemo(() => {
    let result = [...candidates];

    // Filter
    if (filter === 'strong') result = result.filter(c => c.scoring?.overallScore >= 75);
    if (filter === 'good') result = result.filter(c => c.scoring?.overallScore >= 60 && c.scoring?.overallScore < 75);
    if (filter === 'weak') result = result.filter(c => c.scoring?.overallScore < 60);
    if (filter === 'redFlags') result = result.filter(c => c.redFlags?.redFlags?.length > 0);

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'score') return (b.scoring?.overallScore || 0) - (a.scoring?.overallScore || 0);
      if (sortBy === 'experience') return (parseFloat(b.totalExperience) || 0) - (parseFloat(a.totalExperience) || 0);
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      return 0;
    });

    return result;
  }, [candidates, sortBy, filter]);

  const getMatchBadge = (score: number) => {
    if (score >= 90) return <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Excellent</span>;
    if (score >= 75) return <span className="px-2 py-0.5 rounded text-xs font-medium bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400">Strong</span>;
    if (score >= 60) return <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Good</span>;
    return <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Weak</span>;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-200px)]">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <h2 className="font-bold text-slate-900 dark:text-white">Candidates ({processedCandidates.length})</h2>

        <div className="flex gap-2">
           <select
             className="text-sm border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-violet-500"
             value={filter}
             onChange={(e) => setFilter(e.target.value as any)}
           >
             <option value="all">All Candidates</option>
             <option value="strong">Strong Match (75%+)</option>
             <option value="good">Good Match (60-74%)</option>
             <option value="weak">Weak Match (&lt;60%)</option>
             <option value="redFlags">Has Red Flags</option>
           </select>

           <select
             className="text-sm border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-violet-500"
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value as any)}
           >
             <option value="score">Sort by Score</option>
             <option value="experience">Sort by Experience</option>
             <option value="name">Sort by Name</option>
           </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {processedCandidates.length === 0 ? (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400">
            No candidates match the filter.
          </div>
        ) : (
          processedCandidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => onSelectCandidate(candidate)}
              className="group p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-slate-900 relative"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {candidate.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                    {candidate.experience?.[0]?.role} at {candidate.experience?.[0]?.company}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {candidate.scoring?.overallScore}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                 <div className="flex gap-2">
                    {getMatchBadge(candidate.scoring?.overallScore)}
                    {candidate.redFlags?.redFlags?.length > 0 && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {candidate.redFlags.redFlags.length} Flags
                      </span>
                    )}
                 </div>
                 <span className="text-xs text-slate-400">
                   {candidate.totalExperience} Exp
                 </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
