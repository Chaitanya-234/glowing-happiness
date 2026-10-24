'use client';

import { useState } from 'react';
import { Download, Copy, CheckSquare, Square, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface BibliographyBuilderProps {
  papers: any[];
}

export default function BibliographyBuilder({ papers }: BibliographyBuilderProps) {
  const [selectedPapers, setSelectedPapers] = useState<string[]>(papers.map(p => p.id));
  const [format, setFormat] = useState('apa');

  const togglePaper = (id: string) => {
    if (selectedPapers.includes(id)) {
      setSelectedPapers(selectedPapers.filter(p => p !== id));
    } else {
      setSelectedPapers([...selectedPapers, id]);
    }
  };

  const getCitation = (paper: any, fmt: string) => {
      // Assuming paper has citations object from AI analysis
      return paper.citations?.[fmt] || `${paper.metadata.authors.map((a:any) => a.name).join(', ')}. (${paper.metadata.year}). ${paper.metadata.title}.`;
  };

  const generateBibliography = () => {
    const selected = papers.filter(p => selectedPapers.includes(p.id));
    // Sort alphabetically by first author
    selected.sort((a, b) => {
        const authorA = a.metadata.authors[0]?.name || '';
        const authorB = b.metadata.authors[0]?.name || '';
        return authorA.localeCompare(authorB);
    });

    return selected.map(p => getCitation(p, format)).join('\n\n');
  };

  const handleCopy = () => {
      const text = generateBibliography();
      navigator.clipboard.writeText(text);
      toast.success('Bibliography copied to clipboard');
  };

  const handleDownload = () => {
      const text = generateBibliography();
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bibliography_${format}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Bibliography Builder</h3>
          <div className="flex items-center gap-2">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm"
              >
                  <option value="apa">APA (7th)</option>
                  <option value="mla">MLA (9th)</option>
                  <option value="chicago">Chicago (17th)</option>
                  <option value="harvard">Harvard</option>
                  <option value="ieee">IEEE</option>
              </select>
          </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Select Papers ({selectedPapers.length})</span>
              <button
                onClick={() => setSelectedPapers(selectedPapers.length === papers.length ? [] : papers.map(p => p.id))}
                className="text-xs text-violet-600 dark:text-violet-400 font-medium hover:underline"
              >
                  {selectedPapers.length === papers.length ? 'Deselect All' : 'Select All'}
              </button>
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
              {papers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => togglePaper(paper.id)}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPapers.includes(paper.id)
                            ? 'bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                      <div className={`mt-1 ${selectedPapers.includes(paper.id) ? 'text-violet-600' : 'text-slate-400'}`}>
                          {selectedPapers.includes(paper.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </div>
                      <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{paper.metadata.title}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                              {paper.metadata.authors.map((a:any) => a.name).join(', ')} • {paper.metadata.year}
                          </p>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      <div className="flex gap-3">
          <button
            onClick={handleCopy}
            disabled={selectedPapers.length === 0}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
              <Copy className="w-4 h-4" /> Copy
          </button>
          <button
            onClick={handleDownload}
            disabled={selectedPapers.length === 0}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
              <Download className="w-4 h-4" /> Download .txt
          </button>
      </div>
    </div>
  );
}
