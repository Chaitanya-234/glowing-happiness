'use client';

import React, { useMemo } from 'react';

interface DiversityInsightsProps {
  candidates: any[];
}

export default function DiversityInsights({ candidates }: DiversityInsightsProps) {
  const insights = useMemo(() => {
    const locations: Record<string, number> = {};
    const schools: Record<string, number> = {};
    const degrees: Record<string, number> = {};

    candidates.forEach(c => {
      // Location
      if (c.contact?.location) {
        const loc = c.contact.location.split(',').pop()?.trim() || c.contact.location;
        locations[loc] = (locations[loc] || 0) + 1;
      }

      // Education
      if (c.education && c.education.length > 0) {
        c.education.forEach((edu: any) => {
          if (edu.institution) {
            schools[edu.institution] = (schools[edu.institution] || 0) + 1;
          }
          if (edu.degree) {
            // Simplify degree (e.g. "Bachelor of Science" -> "Bachelor")
            const degree = edu.degree.toLowerCase().includes('bachelor') || edu.degree.toLowerCase().includes('bs') ? 'Bachelor' :
                           edu.degree.toLowerCase().includes('master') || edu.degree.toLowerCase().includes('ms') ? 'Master' :
                           edu.degree.toLowerCase().includes('phd') || edu.degree.toLowerCase().includes('doctor') ? 'PhD' : 'Other';
            degrees[degree] = (degrees[degree] || 0) + 1;
          }
        });
      }
    });

    return { locations, schools, degrees };
  }, [candidates]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mt-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Diversity & Pool Insights</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Location Diversity */}
        <div>
          <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">Location Distribution</h4>
          <div className="space-y-3">
            {Object.entries(insights.locations).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([loc, count], i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300 truncate pr-2">{loc}</span>
                  <span className="font-medium">{count}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-violet-500 h-full rounded-full" style={{ width: `${(count / candidates.length) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Level */}
        <div>
          <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">Education Level</h4>
          <div className="space-y-3">
             {Object.entries(insights.degrees).sort((a, b) => b[1] - a[1]).map(([deg, count], i) => (
               <div key={i}>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-slate-700 dark:text-slate-300">{deg}</span>
                   <span className="font-medium">{count}</span>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                   <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(count / candidates.length) * 100}%` }}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Top Schools */}
        <div>
          <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">Top Universities</h4>
          <div className="space-y-3">
             {Object.entries(insights.schools).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([school, count], i) => (
               <div key={i}>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-slate-700 dark:text-slate-300 truncate pr-2">{school}</span>
                   <span className="font-medium">{count}</span>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                   <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(count / candidates.length) * 100}%` }}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
