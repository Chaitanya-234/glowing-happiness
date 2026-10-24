'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface SentenceAnalysis {
  sentenceNumber: number;
  text: string;
  aiProbability: number;
  confidence: string;
  markers: string[];
  humanMarkers: string[];
  reasoning: string;
}

interface SentenceBreakdownProps {
  sentences: SentenceAnalysis[];
}

export default function SentenceBreakdown({ sentences }: SentenceBreakdownProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-700 bg-red-50 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
    if (score >= 60) return 'text-orange-700 bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
    if (score >= 40) return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
    return 'text-green-700 bg-green-50 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
  };

  if (!sentences || sentences.length === 0) {
      return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
        Sentence-by-Sentence Analysis
        <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-auto">
            {sentences.length} sentences analyzed
        </span>
      </h3>

      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                <tr>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300 w-16 text-center">#</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Text Preview</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300 w-32 text-center">AI Score</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300 w-16 text-center"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {sentences.map((sentence) => (
                <React.Fragment key={sentence.sentenceNumber}>
                    <tr
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${expandedId === sentence.sentenceNumber ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
                        onClick={() => toggleExpand(sentence.sentenceNumber)}
                    >
                        <td className="p-4 text-center text-slate-500 font-mono">{sentence.sentenceNumber}</td>
                        <td className="p-4">
                            <p className="line-clamp-1 text-slate-700 dark:text-slate-300 font-medium">{sentence.text}</p>
                        </td>
                        <td className="p-4 text-center">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getScoreColor(sentence.aiProbability)}`}>
                                {sentence.aiProbability}%
                            </span>
                        </td>
                        <td className="p-4 text-center">
                            <button
                                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400"
                            >
                                {expandedId === sentence.sentenceNumber ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                        </td>
                    </tr>
                    {expandedId === sentence.sentenceNumber && (
                        <tr>
                            <td colSpan={4} className="p-0 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800/50">
                                <div className="p-6 grid gap-6 md:grid-cols-12 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <div className="md:col-span-12">
                                        <p className="text-lg text-slate-800 dark:text-slate-200 font-serif leading-relaxed italic p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                            "{sentence.text}"
                                        </p>
                                    </div>

                                    <div className="md:col-span-6 space-y-3">
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                                            Detected Markers
                                        </h4>
                                        <ul className="space-y-2">
                                            {sentence.markers && sentence.markers.length > 0 ? (
                                                sentence.markers.map((marker, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                                                        {marker}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-sm text-slate-500 italic pl-2">None detected</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="md:col-span-6 space-y-3">
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <CheckCircle className="w-4 h-4 text-blue-500" />
                                            Analysis
                                        </h4>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 leading-relaxed">
                                            <p className="mb-2"><span className="font-semibold text-slate-700 dark:text-slate-300">Confidence:</span> {sentence.confidence}</p>
                                            <p>{sentence.reasoning}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                </React.Fragment>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
