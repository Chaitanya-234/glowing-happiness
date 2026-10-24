'use client';

import React from 'react';

interface SkillDetails {
  mustHavesCovered: number;
  mustHavesTotal: number;
  coveragePercent: number;
  niceToHavesCovered: number;
  niceToHavesTotal: number;
  missingCritical: string[];
  strengths: string[];
}

interface SkillMatcherProps {
  skills: SkillDetails;
  jobSkills: {
    mustHave: string[];
    niceToHave: string[];
  };
}

export default function SkillMatcher({ skills, jobSkills }: SkillMatcherProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex justify-between items-center">
        Skills Analysis
        <span className={`text-sm px-2 py-1 rounded-md ${
          skills.coveragePercent >= 80 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
          skills.coveragePercent >= 60 ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' :
          'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {skills.coveragePercent}% Match
        </span>
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            Must-Have Skills
            <span className="text-xs font-normal text-slate-500">
              ({skills.mustHavesCovered}/{skills.mustHavesTotal})
            </span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {jobSkills.mustHave.map((skill, i) => {
              const isMissing = skills.missingCritical.includes(skill);
              return (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded-md text-sm border flex items-center gap-1.5 ${
                    isMissing
                      ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 opacity-60'
                      : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  {isMissing ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  )}
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            Nice-to-Have Skills
            <span className="text-xs font-normal text-slate-500">
              ({skills.niceToHavesCovered}/{skills.niceToHavesTotal})
            </span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {jobSkills.niceToHave.map((skill, i) => {
              // We don't explicitly know which nice-to-haves are missing from the breakdown alone without cross-referencing,
              // but the breakdown usually lists missing *critical*.
              // Ideally, we'd check against candidate's raw skills list, but for visualization we can infer or just list them.
              // Here we will assume if it's not in "strengths" or similar, maybe we check if `strengths` contains it?
              // The schema has `strengths` which lists matched skills.
              const isPresent = skills.strengths.some(s => s.toLowerCase().includes(skill.toLowerCase()));

              return (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded-md text-sm border flex items-center gap-1.5 ${
                    isPresent
                      ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {isPresent && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
