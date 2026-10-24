import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

type CodeGeneratorProps = {
  implementation: Record<string, { code: string; language: string }>;
};

export default function CodeGenerator({ implementation }: CodeGeneratorProps) {
  const [activeTab, setActiveTab] = useState(Object.keys(implementation)[0] || '');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (implementation[activeTab]) {
      navigator.clipboard.writeText(implementation[activeTab].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!implementation || Object.keys(implementation).length === 0) {
    return null;
  }

  // Format keys for display (camelCase to Title Case)
  const formatKey = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg overflow-hidden">
      <div className="flex border-b border-purple-500/20 overflow-x-auto">
        {Object.keys(implementation).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === key
                ? 'bg-purple-600/20 text-purple-100 border-b-2 border-purple-500'
                : 'text-purple-300 hover:text-purple-100 hover:bg-purple-900/20'
            }`}
          >
            {formatKey(key)}
          </button>
        ))}
      </div>

      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-purple-900/60 rounded-lg text-purple-300 hover:text-white hover:bg-purple-800 transition-all opacity-0 group-hover:opacity-100"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>

        {activeTab && implementation[activeTab] && (
          <SyntaxHighlighter
            language={implementation[activeTab].language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
              fontSize: '0.9rem',
            }}
            showLineNumbers
          >
            {implementation[activeTab].code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
