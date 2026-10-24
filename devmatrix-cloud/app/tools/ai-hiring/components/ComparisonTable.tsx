'use client';

import React from 'react';

interface ComparisonTableProps {
  candidates: any[];
}

export default function ComparisonTable({ candidates }: ComparisonTableProps) {
  if (candidates.length === 0) {
    return <div className="text-center py-10">Select candidates to compare</div>;
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <table className="w-full min-w-[800px] divide-y divide-slate-200 dark:divide-slate-800">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-950">
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 dark:bg-slate-950 z-10 w-48">Feature</th>
            {candidates.map((c, i) => (
              <th key={i} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[200px]">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">

          {/* Overall Score */}
          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
              Overall Score
            </td>
            {candidates.map((c, i) => (
              <td key={i} className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  c.scoring?.overallScore >= 75 ? 'bg-emerald-100 text-emerald-800' :
                  c.scoring?.overallScore >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {c.scoring?.overallScore || 'N/A'}%
                </span>
              </td>
            ))}
          </tr>

          {/* Current Role */}
          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
              Current Role
            </td>
            {candidates.map((c, i) => (
              <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {c.experience?.[0]?.role} at {c.experience?.[0]?.company}
              </td>
            ))}
          </tr>

          {/* Experience */}
          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
              Total Experience
            </td>
            {candidates.map((c, i) => (
              <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {c.totalExperience}
              </td>
            ))}
          </tr>

          {/* Skills Match */}
          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
              Skills Match
            </td>
            {candidates.map((c, i) => (
              <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {c.scoring?.scoreBreakdown?.skills?.score || 0}/100
              </td>
            ))}
          </tr>

          {/* Education */}
          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
               Education
             </td>
             {candidates.map((c, i) => (
               <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                 {c.education?.[0]?.degree}
               </td>
             ))}
          </tr>

          {/* Red Flags */}
          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
               Red Flags
             </td>
             {candidates.map((c, i) => (
               <td key={i} className="px-6 py-4 whitespace-nowrap text-sm">
                 {c.redFlags?.redFlags?.length > 0 ? (
                   <span className="text-red-600 font-medium">{c.redFlags.redFlags.length} Detected</span>
                 ) : (
                   <span className="text-emerald-600">None</span>
                 )}
               </td>
             ))}
          </tr>

          {/* Recommendation */}
          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
               AI Verdict
             </td>
             {candidates.map((c, i) => (
               <td key={i} className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 min-w-[200px]">
                 {c.scoring?.recommendation}
               </td>
             ))}
          </tr>

        </tbody>
      </table>
    </div>
  );
}
