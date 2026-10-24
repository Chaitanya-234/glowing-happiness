'use client';

import { useState } from 'react';
import { ChevronLeft, Trash2, FileText, Quote, Target, Layers } from 'lucide-react';
import PaperSummarizer from './PaperSummarizer';
import CitationGenerator from './CitationGenerator';
import RelatedPapers from './RelatedPapers';

interface PaperDetailsProps {
  paper: any;
  onBack: () => void;
  onDelete: () => void;
}

export default function PaperDetails({ paper, onBack, onDelete }: PaperDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'citations', label: 'Citations', icon: Quote },
    { id: 'related', label: 'Related', icon: Layers },
    { id: 'analysis', label: 'Analysis', icon: Target },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <ChevronLeft className="w-5 h-5 text-slate-500" />
                </button>
                <div className="min-w-0 max-w-md">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100 truncate" title={paper.metadata.title}>
                        {paper.metadata.title}
                    </h2>
                    <p className="text-xs text-slate-500 truncate">
                        {paper.metadata.authors[0]?.name} • {paper.metadata.year}
                    </p>
                </div>
            </div>
            <button onClick={onDelete} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
            </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 overflow-x-auto">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                            ? 'border-violet-600 text-violet-600 dark:text-violet-400 bg-white dark:bg-slate-800'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
            {activeTab === 'overview' && <PaperSummarizer analysis={paper} />}
            {activeTab === 'citations' && <CitationGenerator citations={paper.citations} />}
            {activeTab === 'related' && <RelatedPapers papers={paper.relatedPapers} />}
            {activeTab === 'analysis' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Research Gaps Identified</h3>
                        {paper.researchGaps && paper.researchGaps.length > 0 ? (
                            <ul className="space-y-4">
                                {paper.researchGaps.map((gap: any, i: number) => (
                                    <li key={i} className="flex gap-3">
                                        <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${gap.severity === 'High' ? 'bg-red-500' : 'bg-amber-500'}`} />
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{gap.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                                                    {gap.gapType}
                                                </span>
                                                <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                                                    Severity: {gap.severity}
                                                </span>
                                            </div>
                                            {gap.opportunities && (
                                                <div className="mt-2 pl-3 border-l-2 border-slate-100 dark:border-slate-700">
                                                    <p className="text-xs text-slate-500 mb-1">Opportunities:</p>
                                                    <ul className="list-disc pl-4 space-y-1">
                                                        {gap.opportunities.map((opp: string, j: number) => (
                                                            <li key={j} className="text-xs text-slate-600 dark:text-slate-400">{opp}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-500">No specific gaps identified in this paper.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}
