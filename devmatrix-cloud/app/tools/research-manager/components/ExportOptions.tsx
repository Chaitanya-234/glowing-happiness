'use client';

import { FileJson, FileText, Download } from 'lucide-react';

interface ExportOptionsProps {
  onExport: (format: string) => void;
}

export default function ExportOptions({ onExport }: ExportOptionsProps) {
  return (
    <div className="flex gap-2">
        <button
            onClick={() => onExport('bibtex')}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-sm transition-colors text-slate-700 dark:text-slate-300"
            title="Export as BibTeX"
        >
            <FileText className="w-4 h-4" /> BibTeX
        </button>
        <button
            onClick={() => onExport('json')}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-sm transition-colors text-slate-700 dark:text-slate-300"
            title="Export as JSON"
        >
            <FileJson className="w-4 h-4" /> JSON
        </button>
    </div>
  );
}
