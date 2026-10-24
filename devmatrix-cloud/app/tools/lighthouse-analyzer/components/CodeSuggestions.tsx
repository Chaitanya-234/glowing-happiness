'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSuggestionsProps {
  before: string;
  after: string;
  language?: string;
}

export function CodeSuggestions({ before, after, language = 'javascript' }: CodeSuggestionsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <div className="rounded-lg overflow-hidden border border-red-200 dark:border-red-900/30">
        <div className="bg-red-50 dark:bg-red-900/20 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 border-b border-red-100 dark:border-red-900/20">
          Before (Problematic Pattern)
        </div>
        <div className="text-xs">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{ margin: 0, borderRadius: 0 }}
            wrapLines
          >
            {before}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-emerald-200 dark:border-emerald-900/30">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-b border-emerald-100 dark:border-emerald-900/20">
          After (Optimized Pattern)
        </div>
        <div className="text-xs">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{ margin: 0, borderRadius: 0 }}
            wrapLines
          >
            {after}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
