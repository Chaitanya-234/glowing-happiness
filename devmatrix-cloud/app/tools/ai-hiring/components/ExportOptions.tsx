'use client';

import React from 'react';
import { saveAs } from 'file-saver';

interface ExportOptionsProps {
  candidates: any[];
  jobTitle: string;
}

export default function ExportOptions({ candidates, jobTitle }: ExportOptionsProps) {
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Company', 'Score', 'Match Level', 'Experience', 'Status'];
    const rows = candidates.map(c => [
      c.name,
      c.contact?.email,
      c.experience?.[0]?.role,
      c.experience?.[0]?.company,
      c.scoring?.overallScore,
      c.scoring?.matchLevel,
      c.totalExperience,
      c.status || 'New'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${jobTitle.replace(/\s+/g, '_')}_candidates.csv`);
  };

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(candidates, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    saveAs(blob, `${jobTitle.replace(/\s+/g, '_')}_candidates.json`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportCSV}
        className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md text-slate-700 dark:text-slate-300 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        Export CSV
      </button>
      <button
        onClick={handleExportJSON}
        className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md text-slate-700 dark:text-slate-300 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        Export JSON
      </button>
    </div>
  );
}
