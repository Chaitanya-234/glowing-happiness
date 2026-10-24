'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { Loader2, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import ExportOptions from './ExportOptions';
import ScriptReference from './ScriptReference';

interface GeneratedScriptProps {
  script: any;
  isLoading: boolean;
}

export default function GeneratedScript({ script, isLoading }: GeneratedScriptProps) {
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-slate-500 dark:text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-violet-600 mb-4" />
        <p className="font-medium text-lg">Generating Scenario...</p>
        <p className="text-sm mt-2 max-w-xs text-center">
          AI is analyzing your requirements and constructing the Gatling Scala simulation.
        </p>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl m-4">
        <Info className="w-12 h-12 mb-3 opacity-50" />
        <p>Configure your scenario and click Generate to see the code here.</p>
      </div>
    );
  }

  const { generatedScript, recommendations, scriptMetadata } = script;
  const fullCode = generatedScript?.fullCode || '// Error generating code';

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium text-slate-900 dark:text-slate-100">
            {scriptMetadata?.simulationName || 'Simulation.scala'}
          </h3>
          <p className="text-xs text-slate-500">
            {scriptMetadata?.testType} • {scriptMetadata?.targetUsers} Users • {scriptMetadata?.duration}
          </p>
        </div>
        <ExportOptions code={fullCode} filename={`${scriptMetadata?.simulationName || 'Simulation'}.scala`} />
      </div>

      <div className="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-inner min-h-[400px]">
        <Editor
          height="100%"
          defaultLanguage="scala"
          value={fullCode}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            readOnly: true,
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}
        />
      </div>

      {recommendations && recommendations.length > 0 && (
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            AI Recommendations
          </h4>
          <ul className="space-y-1">
            {recommendations.map((rec: string, idx: number) => (
              <li key={idx} className="text-xs text-blue-700 dark:text-blue-200 flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ScriptReference />
    </div>
  );
}
