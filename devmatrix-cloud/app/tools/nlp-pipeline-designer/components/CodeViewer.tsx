'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodeViewer({ code, language, title }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 dark:bg-black/80 rounded-xl overflow-hidden shadow-lg border border-gray-700 dark:border-purple-500/30">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 dark:bg-purple-900/20 border-b border-gray-700 dark:border-purple-500/30">
        <span className="text-sm font-medium text-gray-300 dark:text-purple-200/80">{title || `${language} Code`}</span>
        <button
          onClick={copyCode}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300 dark:text-purple-100/90 font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
