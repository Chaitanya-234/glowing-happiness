'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown, ChevronUp, Bookmark, Share2, Check } from 'lucide-react';
import { DifficultyBadge } from './DifficultyBadge';

export interface Question {
    id: string;
    type: string;
    difficulty: string;
    title: string;
    question: string;
    estimatedTime: string;
    tags: string[];
    codeSnippet?: string;
    inputOutputExamples?: { input: string; output: string; explanation?: string }[];
    constraints?: string[];
    solution: {
        approach: string;
        code?: string;
        complexity?: string;
        alternatives?: string[];
        diagramDescription?: string;
    };
    hints: string[];
    evaluationCriteria: string[];
    commonPitfalls?: string[];
}

interface QuestionCardProps {
    question: Question;
    index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
    const [expandedSolution, setExpandedSolution] = useState(false);
    const [visibleHints, setVisibleHints] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [justShared, setJustShared] = useState(false);

    const handleShare = () => {
        const textToShare = `${question.title}\n\n${question.question}\n\nType: ${question.type} | Difficulty: ${question.difficulty}`;
        navigator.clipboard.writeText(textToShare).then(() => {
            setJustShared(true);
            setTimeout(() => setJustShared(false), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="bg-purple-900/10 rounded-xl shadow-lg shadow-purple-900/10 border border-purple-500/20 overflow-hidden mb-6 break-inside-avoid print:shadow-none print:border-gray-300 backdrop-blur-sm transition-all hover:border-purple-500/40">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-full">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-sm font-mono text-purple-400">#{index + 1}</span>
                            <span className="bg-purple-900/30 text-purple-200 px-2 py-0.5 rounded text-xs font-medium border border-purple-500/20">{question.type}</span>
                            <DifficultyBadge difficulty={question.difficulty} />
                            <span className="text-xs text-purple-300/60 flex items-center ml-auto mr-2">
                                ⏱ {question.estimatedTime}
                            </span>

                            <div className="flex items-center gap-1 border-l pl-2 border-purple-500/20 ml-2">
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`p-1.5 rounded-full hover:bg-purple-800/30 transition-colors ${isBookmarked ? 'text-yellow-400' : 'text-purple-400/50 hover:text-purple-200'}`}
                                    title={isBookmarked ? "Remove bookmark" : "Bookmark question"}
                                >
                                    <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-1.5 rounded-full hover:bg-purple-800/30 text-purple-400/50 hover:text-purple-200 transition-colors"
                                    title="Copy to clipboard"
                                >
                                    {justShared ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-purple-100 mb-2">{question.title}</h3>
                        <div className="flex flex-wrap gap-1 mb-4">
                            {question.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-purple-900/20 text-purple-300/70 rounded border border-purple-500/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="prose prose-invert prose-purple max-w-none mb-6 text-purple-100/90">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{question.question}</ReactMarkdown>
                </div>

                {question.codeSnippet && (
                     <div className="mb-6">
                        <h4 className="text-sm font-semibold text-purple-200 mb-2">Code Snippet</h4>
                        <div className="bg-black/50 border border-purple-500/20 text-purple-100 p-4 rounded-md overflow-x-auto text-sm font-mono">
                            <pre>{question.codeSnippet}</pre>
                        </div>
                     </div>
                )}

                {/* Hints Section */}
                <div className="mb-6 bg-yellow-900/10 p-4 rounded-md border border-yellow-500/20 print:hidden">
                    <h4 className="text-sm font-semibold text-yellow-500 mb-2 flex items-center">
                        💡 Hints
                    </h4>
                    <div className="space-y-2">
                        {question.hints.map((hint, i) => (
                            <div key={i}>
                                {i < visibleHints ? (
                                    <div className="text-sm text-yellow-100/90 bg-yellow-900/20 p-2 rounded border border-yellow-500/10 animate-in fade-in slide-in-from-top-1">
                                        Hint {i+1}: {hint}
                                    </div>
                                ) : (
                                    i === visibleHints && (
                                        <button
                                            onClick={() => setVisibleHints(h => h + 1)}
                                            className="text-xs text-yellow-500/80 underline hover:text-yellow-400 font-medium"
                                        >
                                            Show Hint {i + 1}
                                        </button>
                                    )
                                )}
                            </div>
                        ))}
                        {visibleHints === 0 && question.hints.length === 0 && (
                            <span className="text-sm text-yellow-500/50 italic">No hints available.</span>
                        )}
                    </div>
                </div>

                {/* Solution Toggle */}
                <button
                    onClick={() => setExpandedSolution(!expandedSolution)}
                    className="flex items-center justify-center w-full py-2 bg-purple-900/20 hover:bg-purple-900/40 border-t border-b border-purple-500/20 text-sm font-medium text-purple-200 transition-colors print:hidden group"
                >
                    {expandedSolution ? (
                        <>
                            <ChevronUp className="w-4 h-4 mr-2" /> Hide Solution
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" /> Show Solution
                        </>
                    )}
                </button>

                {expandedSolution && (
                    <div className="p-6 bg-purple-900/5 border-b border-purple-500/20 animate-in fade-in slide-in-from-top-2">
                        <div className="mb-4">
                            <h4 className="font-semibold text-purple-100 mb-2">Approach</h4>
                            <div className="text-purple-200/80 text-sm prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{question.solution.approach}</ReactMarkdown>
                            </div>
                        </div>

                        {question.solution.code && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-purple-100 mb-2">Solution Code</h4>
                                <div className="bg-black/50 border border-purple-500/20 text-purple-50 p-4 rounded-md overflow-x-auto text-sm font-mono">
                                    <pre>{question.solution.code}</pre>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {question.solution.complexity && (
                                <div>
                                    <h4 className="font-semibold text-purple-100 mb-1">Complexity</h4>
                                    <p className="text-purple-200/80 text-sm">{question.solution.complexity}</p>
                                </div>
                            )}
                            <div>
                                <h4 className="font-semibold text-purple-100 mb-1">Evaluation Criteria</h4>
                                <ul className="list-disc list-inside text-purple-200/80 text-sm space-y-1">
                                    {question.evaluationCriteria.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
