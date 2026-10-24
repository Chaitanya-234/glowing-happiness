import React, { useState } from 'react';
import { z } from 'zod';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';
import { Code, Check, Copy, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ImplementationData = z.infer<typeof LossFunctionDesignerSchema>['implementation'];

interface CodeImplementationProps {
  implementation: ImplementationData;
}

type Framework = 'pytorch' | 'tensorflow' | 'jax';

export default function CodeImplementation({ implementation }: CodeImplementationProps) {
  const [activeTab, setActiveTab] = useState<Framework>('pytorch');
  const [copied, setCopied] = useState(false);

  const currentData = implementation[activeTab];

  const handleCopy = () => {
    if (currentData) {
      const usage = 'usage' in currentData ? currentData.usage : '';
      navigator.clipboard.writeText(currentData.code + (usage ? '\n\n# Usage:\n' + usage : ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!currentData) return null;

  const hasUsage = 'usage' in currentData && !!currentData.usage;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Code className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          Implementation
        </h3>

        <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
          {(['pytorch', 'tensorflow', 'jax'] as const).map((fw) => (
            <button
              key={fw}
              onClick={() => setActiveTab(fw)}
              className={`
                px-4 py-1.5 text-sm font-medium rounded-md transition-all
                ${activeTab === fw
                  ? 'bg-white dark:bg-slate-600 text-violet-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }
              `}
            >
              {fw.charAt(0).toUpperCase() + fw.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white backdrop-blur-sm transition-colors border border-slate-600"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              background: '#1e293b' // matches slate-800
            }}
            showLineNumbers={true}
          >
            {currentData.code}
          </SyntaxHighlighter>
        </div>
      </div>

      {hasUsage && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-6">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Usage Example
          </h4>
          <div className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono text-blue-300">
              <span className="text-green-400"># How to integrate</span><br/>
              {('usage' in currentData) ? currentData.usage : ''}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
