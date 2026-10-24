'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Play, FileCode } from 'lucide-react';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;
type ClientQueriesType = SchemaType['clientQueries'];

interface ClientQueriesProps {
  queries: ClientQueriesType;
}

export default function ClientQueries({ queries }: ClientQueriesProps) {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeQuery = queries.examples[selectedQueryIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeQuery.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 font-medium text-sm text-gray-700 dark:text-gray-300">
            Example Operations
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {queries.examples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedQueryIndex(idx)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 flex flex-col gap-1 ${
                  selectedQueryIndex === idx
                    ? 'bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600'
                    : 'border-l-4 border-transparent'
                }`}
              >
                <span className="font-semibold text-gray-900 dark:text-white">{ex.name}</span>
                <span className="text-xs text-gray-500 truncate">{ex.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-purple-500" />
            Reusable Fragments
          </h4>
          <div className="bg-gray-900 rounded p-3 text-xs text-gray-300 font-mono overflow-x-auto">
             {queries.fragments.map((frag, i) => (
               <div key={i} className="mb-2 last:mb-0 whitespace-pre">
                 {frag}
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-purple-600 dark:text-purple-400 font-bold">
                {activeQuery.name}
              </span>
              <span className="px-2 py-0.5 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                {activeQuery.query.trim().startsWith('mutation') ? 'Mutation' : 'Query'}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <SyntaxHighlighter
            language="graphql"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              borderRadius: 0,
              fontSize: '0.9rem',
              lineHeight: '1.5',
            }}
          >
            {activeQuery.query}
          </SyntaxHighlighter>

          <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Variables</h5>
                <pre className="text-xs bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
                  {JSON.stringify(activeQuery.variables, null, 2)}
                </pre>
              </div>
              <div>
                <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Equivalent REST Request</h5>
                <div className="text-xs bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-mono break-all flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">GET</span>
                  {activeQuery.equivalentREST}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
