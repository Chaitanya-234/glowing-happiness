'use client';

import React, { useState } from 'react';
import { Upload, FileText, Globe, Code, ChevronRight } from 'lucide-react';
import { RestApiInput as InputType } from '../actions';

interface RestApiInputProps {
  onSubmit: (input: InputType) => void;
  isLoading: boolean;
}

export default function RestApiInput({ onSubmit, isLoading }: RestApiInputProps) {
  const [format, setFormat] = useState<InputType['format']>('openapi');
  const [content, setContent] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ format, content, context });
  };

  const inputMethods = [
    { id: 'openapi', label: 'OpenAPI / Swagger', icon: FileText, placeholder: 'Paste your OpenAPI/Swagger JSON or YAML here...' },
    { id: 'postman', label: 'Postman Collection', icon: Globe, placeholder: 'Paste your Postman Collection JSON here...' },
    { id: 'curl', label: 'cURL Commands', icon: Code, placeholder: 'Paste list of cURL commands...' },
    { id: 'manual', label: 'Manual Endpoints', icon: FileText, placeholder: 'GET /users\nPOST /users\n...' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-purple-600" />
          Input REST API Definition
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Provide your existing REST API structure to generate a GraphQL schema.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {inputMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setFormat(method.id as any)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  format === method.id
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">{method.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={inputMethods.find(m => m.id === format)?.placeholder}
              className="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm font-mono focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Context (Optional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., 'Treat /admin routes as internal only', 'Use Relay pagination style', 'All IDs are UUIDs'"
              className="w-full h-24 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !content.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing API...
                </>
              ) : (
                <>
                  Analyze & Generate Schema
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
