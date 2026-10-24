'use client';

import { Question } from './QuestionCard';
import { Download, Printer, Copy, FileJson, FileText } from 'lucide-react';
import { useState } from 'react';

interface ExportOptionsProps {
    questions: Question[];
}

export function ExportOptions({ questions }: ExportOptionsProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCopyAll = () => {
        const text = questions.map((q, i) =>
            `Q${i+1}: ${q.title}\n${q.question}\n\nType: ${q.type}\nDifficulty: ${q.difficulty}\n\n`
        ).join('---\n\n');

        navigator.clipboard.writeText(text);
        setIsOpen(false);
    };

    const handleDownloadJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "interview_questions.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        setIsOpen(false);
    };

    const handleDownloadMarkdown = () => {
        const text = questions.map((q, i) =>
            `# Q${i+1}: ${q.title}\n\n**Type:** ${q.type} | **Difficulty:** ${q.difficulty} | **Time:** ${q.estimatedTime}\n\n${q.question}\n\n## Solution Approach\n${q.solution.approach}\n\n`
        ).join('---\n\n');

        const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(text);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "interview_questions.md");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium shadow-lg shadow-purple-900/20"
            >
                <Download size={16} /> Export
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-purple-500/20 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="py-1">
                        <button onClick={handleCopyAll} className="w-full text-left px-4 py-2 text-sm text-purple-100 hover:bg-purple-800/30 flex items-center gap-2">
                            <Copy size={14} /> Copy to Clipboard
                        </button>
                        <button onClick={handleDownloadJSON} className="w-full text-left px-4 py-2 text-sm text-purple-100 hover:bg-purple-800/30 flex items-center gap-2">
                            <FileJson size={14} /> Download JSON
                        </button>
                        <button onClick={handleDownloadMarkdown} className="w-full text-left px-4 py-2 text-sm text-purple-100 hover:bg-purple-800/30 flex items-center gap-2">
                            <FileText size={14} /> Download Markdown
                        </button>
                        <button onClick={() => window.print()} className="w-full text-left px-4 py-2 text-sm text-purple-100 hover:bg-purple-800/30 flex items-center gap-2">
                            <Printer size={14} /> Print / PDF
                        </button>
                    </div>
                </div>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            )}
        </div>
    );
}
