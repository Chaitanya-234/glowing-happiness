'use client';

import { useState } from 'react';
import { Download, Copy, ChevronDown, ChevronUp, FileText, Check } from 'lucide-react';

interface DetailedReportProps {
  data: any;
}

export default function DetailedReport({ data }: DetailedReportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-analysis-report-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm transition-all duration-300">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-violet-500 shadow-sm group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Full Technical Report</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">View raw analysis data & JSON</p>
                </div>
            </div>
            {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {isOpen && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Raw JSON Output</h4>
                    <div className="flex gap-3">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy JSON'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm hover:shadow-md"
                        >
                            <Download className="w-4 h-4" /> Download Report
                        </button>
                    </div>
                </div>

                <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-auto max-h-96 custom-scrollbar border border-slate-800 shadow-inner">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            </div>
        )}
    </div>
  );
}
