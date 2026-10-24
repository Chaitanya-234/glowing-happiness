'use client';

import React from 'react';

interface ScoreBreakdown {
  skills: { score: number; details: any };
  experience: { score: number; details: any };
  education: { score: number; details: any };
  softSkills: { score: number; details: any };
  adjustments: { score: number; details: any };
}

interface CandidateScorerProps {
  overallScore: number;
  matchLevel: string;
  breakdown: ScoreBreakdown;
}

export default function CandidateScorer({ overallScore, matchLevel, breakdown }: CandidateScorerProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 75) return 'text-lime-600 dark:text-lime-400';
    if (score >= 60) return 'text-amber-500 dark:text-amber-400';
    if (score >= 40) return 'text-orange-500 dark:text-orange-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-lime-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Match Score</h3>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${
            overallScore >= 75 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
            overallScore >= 60 ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' :
            'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {matchLevel}
          </span>
        </div>
        <div className="relative w-20 h-20 flex items-center justify-center">
           <svg className="w-full h-full transform -rotate-90">
             <circle
               cx="40" cy="40" r="36"
               className="stroke-slate-100 dark:stroke-slate-800"
               strokeWidth="8"
               fill="none"
             />
             <circle
               cx="40" cy="40" r="36"
               className={`transition-all duration-1000 ease-out ${getScoreColor(overallScore).replace('text-', 'stroke-')}`}
               strokeWidth="8"
               fill="none"
               strokeDasharray={226}
               strokeDashoffset={226 - (226 * overallScore) / 100}
               strokeLinecap="round"
             />
           </svg>
           <span className={`absolute text-xl font-bold ${getScoreColor(overallScore)}`}>
             {overallScore}
           </span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: 'Skills Match', score: breakdown.skills.score, weight: '40%' },
          { label: 'Experience', score: breakdown.experience.score, weight: '30%' },
          { label: 'Education', score: breakdown.education.score, weight: '15%' },
          { label: 'Soft Skills', score: breakdown.softSkills.score, weight: '10%' },
          { label: 'Adjustments', score: breakdown.adjustments.score, weight: '5%' },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600 dark:text-slate-400">{item.label} <span className="text-xs text-slate-400">({item.weight})</span></span>
              <span className="font-medium text-slate-900 dark:text-white">{item.score}/100</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getScoreBg(item.score)}`}
                style={{ width: `${item.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
