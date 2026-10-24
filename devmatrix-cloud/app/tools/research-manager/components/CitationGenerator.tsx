'use client';

import { useState } from 'react';
import { Copy, Check, BookOpen, FileText, Quote, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface CitationGeneratorProps {
  citations?: {
    apa: string;
    mla: string;
    chicago: string;
    harvard: string;
    ieee: string;
    inText: {
        apa: string;
        mla: string;
        chicago: string;
    }
  };
}

export default function CitationGenerator({ citations }: CitationGeneratorProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(format);
    toast.success(`${format.toUpperCase()} citation copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!citations) {
      return (
          <div className="p-8 text-center text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <Quote className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Analyze a paper to generate citations automatically.</p>
          </div>
      );
  }

  const formats = [
    { id: 'apa', label: 'APA (7th Ed.)', text: citations.apa, inText: citations.inText.apa },
    { id: 'mla', label: 'MLA (9th Ed.)', text: citations.mla, inText: citations.inText.mla },
    { id: 'chicago', label: 'Chicago (17th Ed.)', text: citations.chicago, inText: citations.inText.chicago },
    { id: 'harvard', label: 'Harvard', text: citations.harvard, inText: `(${citations.inText.apa})` }, // Fallback
    { id: 'ieee', label: 'IEEE', text: citations.ieee, inText: '[1]' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-violet-50 dark:bg-violet-900/10 p-4 rounded-xl border border-violet-100 dark:border-violet-800/30">
        <h3 className="font-semibold text-violet-900 dark:text-violet-100 flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" /> AI-Generated Citations
        </h3>
        <p className="text-sm text-violet-700 dark:text-violet-300">
            These citations are generated from the paper's metadata. Always verify against official style guides.
        </p>
      </div>

      <div className="grid gap-4">
        {formats.map((format) => (
          <div key={format.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                    {format.label}
                </span>
                <button
                    onClick={() => copyToClipboard(format.text, format.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                >
                    {copied === format.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === format.id ? 'Copied' : 'Copy'}
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Reference List</p>
                    <p className="font-mono text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 select-all">
                        {format.text}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">In-Text Citation</p>
                    <p className="font-mono text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800 w-fit select-all">
                        {format.inText}
                    </p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
