'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, FileText } from 'lucide-react';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;
type GraphQLSchema = SchemaType['graphqlSchema'];

interface SchemaPreviewProps {
  schema: GraphQLSchema;
}

export default function SchemaPreview({ schema }: SchemaPreviewProps) {
  const [activeTab, setActiveTab] = useState<'types' | 'queries' | 'mutations' | 'inputs' | 'full'>('types');
  const [copied, setCopied] = useState(false);

  const getActiveContent = () => {
    switch (activeTab) {
      case 'types': return schema.types + '\n\n' + schema.enums;
      case 'queries': return schema.queries;
      case 'mutations': return schema.mutations;
      case 'inputs': return schema.inputs;
      case 'full':
        return [
          '# Custom Scalars',
          schema.customScalars.map(s => `scalar ${s}`).join('\n'),
          '\n# Enums',
          schema.enums,
          '\n# Types',
          schema.types,
          '\n# Inputs',
          schema.inputs,
          '\n# Queries',
          schema.queries,
          '\n# Mutations',
          schema.mutations
        ].join('\n');
      default: return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'types', label: 'Types & Enums' },
    { id: 'queries', label: 'Queries' },
    { id: 'mutations', label: 'Mutations' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'full', label: 'Full Schema' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap items-center justify-between p-2">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Code'}
        </button>
      </div>

      <div className="relative group">
        <SyntaxHighlighter
          language="graphql"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            borderRadius: 0,
            fontSize: '0.9rem',
            lineHeight: '1.5',
            minHeight: '400px',
            maxHeight: '600px',
          }}
        >
          {getActiveContent()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
