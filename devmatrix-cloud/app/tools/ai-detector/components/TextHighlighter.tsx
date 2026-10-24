'use client';

import { useState, useMemo } from 'react';

interface SuspiciousSection {
  startIndex: number;
  endIndex: number;
  aiProbability: number;
  reason: string;
}

interface TextHighlighterProps {
  text: string;
  suspiciousSections: SuspiciousSection[];
}

export default function TextHighlighter({ text, suspiciousSections }: TextHighlighterProps) {
  const [hoveredSection, setHoveredSection] = useState<SuspiciousSection | null>(null);

  const segments = useMemo(() => {
    if (!suspiciousSections || suspiciousSections.length === 0) {
      return [{ text, section: null }];
    }

    // Sort sections by start index
    const sortedSections = [...suspiciousSections].sort((a, b) => a.startIndex - b.startIndex);
    const result: { text: string; section: SuspiciousSection | null }[] = [];
    let lastIndex = 0;

    sortedSections.forEach(section => {
      // Add non-highlighted text before the section
      if (section.startIndex > lastIndex) {
        result.push({
          text: text.slice(lastIndex, section.startIndex),
          section: null
        });
        lastIndex = section.startIndex;
      }

      // Handle overlapping or adjacent sections
      // We only highlight the part that hasn't been covered yet
      const effectiveStart = Math.max(section.startIndex, lastIndex);
      const effectiveEnd = Math.min(section.endIndex, text.length);

      if (effectiveEnd > effectiveStart) {
        result.push({
          text: text.slice(effectiveStart, effectiveEnd),
          section
        });
        lastIndex = effectiveEnd;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      result.push({
        text: text.slice(lastIndex),
        section: null
      });
    }

    return result;
  }, [text, suspiciousSections]);

  const getHighlightColor = (probability: number) => {
    if (probability >= 80) return 'bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-100 border-red-200 dark:border-red-800';
    if (probability >= 60) return 'bg-orange-100 dark:bg-orange-900/40 text-orange-900 dark:text-orange-100 border-orange-200 dark:border-orange-800';
    if (probability >= 40) return 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100 border-amber-200 dark:border-amber-800';
    return 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 border-green-200 dark:border-green-800';
  };

  return (
    <div className="relative font-serif text-lg leading-loose text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm max-h-[600px] overflow-y-auto custom-scrollbar">
      {segments.map((segment, index) => {
        if (!segment.section) {
          return <span key={index}>{segment.text}</span>;
        }

        const colorClass = getHighlightColor(segment.section.aiProbability);

        return (
          <span
            key={index}
            className={`${colorClass} rounded px-1 py-0.5 mx-0.5 cursor-help transition-all duration-200 border-b-2 border-dashed relative group`}
            onMouseEnter={() => setHoveredSection(segment.section)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {segment.text}

            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-slate-900/95 backdrop-blur text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 hidden md:block border border-slate-700">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-700">
                    <span className="font-bold text-sm">{segment.section.aiProbability}% AI Probability</span>
                    <span className={`w-2 h-2 rounded-full ${segment.section.aiProbability > 60 ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                </div>
                <p className="text-slate-300 leading-normal">{segment.section.reason}</p>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-slate-900/95"></span>
            </span>
          </span>
        );
      })}
    </div>
  );
}
