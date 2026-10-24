import React, { useState } from 'react';
import { FileText, Wand2 } from 'lucide-react';

interface JobDescriptionInputProps {
  onAnalyze: (description: string) => void;
  isAnalyzing: boolean;
}

export function JobDescriptionInput({ onAnalyze, isAnalyzing }: JobDescriptionInputProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAnalyze(description);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Step 1: Paste Job Description</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Copy the full job posting you want to target</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste job description here (e.g., 'We are looking for a Senior React Developer...')"
          className="w-full h-64 p-4 text-gray-900 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y mb-4 font-mono text-sm"
          required
          minLength={50}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isAnalyzing || description.length < 50}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Analyze Job & Skills
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
