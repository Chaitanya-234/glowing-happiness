'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Server, Zap } from 'lucide-react';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;
type Resolvers = SchemaType['resolvers'];
type DataLoaders = SchemaType['dataLoaders'];

interface ResolverCodeProps {
  resolvers: Resolvers;
  dataLoaders: DataLoaders;
}

export default function ResolverCode({ resolvers, dataLoaders }: ResolverCodeProps) {
  const [activeSection, setActiveSection] = useState<'queries' | 'mutations' | 'relationships' | 'dataloaders'>('queries');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeSection) {
      case 'queries':
        return Object.entries(resolvers.queries)
          .map(([name, r]) => `// ${r.description}\n// Maps to: ${r.restEndpoint}\n${name}: ${r.code}`)
          .join('\n\n');
      case 'mutations':
        return resolvers.mutations
          ? Object.entries(resolvers.mutations)
              .map(([name, r]) => `// ${r.description}\n// Maps to: ${r.restEndpoint}\n${name}: ${r.code}`)
              .join('\n\n')
          : '// No mutations defined';
      case 'relationships':
        return resolvers.fieldResolvers
          ? Object.entries(resolvers.fieldResolvers)
              .map(([name, r]) => `// Optimization: ${r.optimization}\n// Maps to: ${r.restEndpoint}\n${name}: ${r.code}`)
              .join('\n\n')
          : '// No relationship resolvers needed';
      case 'dataloaders':
        return Object.entries(dataLoaders)
          .map(([name, r]) => `// ${r.purpose}\n// Batch Endpoint: ${r.restEndpoint}\nconst ${name} = new DataLoader(${r.batchFunction});`)
          .join('\n\n');
      default: return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: 'queries', label: 'Query Resolvers', icon: Server },
    { id: 'mutations', label: 'Mutation Resolvers', icon: Server },
    { id: 'relationships', label: 'Field Resolvers', icon: Zap },
    { id: 'dataloaders', label: 'DataLoaders', icon: Zap },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all ${
                activeSection === section.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${activeSection === section.id ? 'text-purple-200' : 'text-gray-500'}`} />
              <span className="font-medium text-sm">{section.label}</span>
            </button>
          );
        })}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase mb-2">Note on implementation</h4>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            These resolvers are generated based on your REST endpoints. Ensure you have the necessary fetch/axios setup and environment variables configured in your actual project.
          </p>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm h-full">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between p-3">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 ml-2">
              resolvers/{activeSection}.ts
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              height: '100%',
              minHeight: '400px',
              fontSize: '0.9rem',
              lineHeight: '1.5',
            }}
          >
            {getActiveCode()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
