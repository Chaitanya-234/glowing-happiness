'use client';

import { Highlighter, Type, MousePointer2, Pen, Eraser, StickyNote } from 'lucide-react';

interface AnnotationToolsProps {
  onToolSelect: (tool: string) => void;
  selectedTool: string;
}

export default function AnnotationTools({ onToolSelect, selectedTool }: AnnotationToolsProps) {
  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'highlight', icon: Highlighter, label: 'Highlight' },
    { id: 'text', icon: Type, label: 'Text Note' },
    { id: 'draw', icon: Pen, label: 'Draw' },
    { id: 'note', icon: StickyNote, label: 'Sticky Note' },
  ];

  return (
    <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolSelect(tool.id)}
          className={`p-2 rounded-md transition-colors ${
            selectedTool === tool.id
              ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
          title={tool.label}
        >
          <tool.icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
