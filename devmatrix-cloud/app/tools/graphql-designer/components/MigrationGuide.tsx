'use client';

import React from 'react';
import { Calendar, CheckCircle, Clock, Code } from 'lucide-react';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;
type MigrationGuide = SchemaType['migrationGuide'];

interface MigrationGuideProps {
  guide: MigrationGuide;
}

export default function MigrationGuide({ guide }: MigrationGuideProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Estimated Effort</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-600" />
            {guide.estimatedEffort}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Migration Complexity</h3>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              guide.complexity === 'High' ? 'bg-red-100 text-red-700' :
              guide.complexity === 'Medium' ? 'bg-amber-100 text-amber-700' :
              'bg-green-100 text-green-700'
            }`}>
              {guide.complexity}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-8">
          {guide.phases.map((phase, idx) => (
            <div key={idx} className="relative flex items-start group">
              <div className="absolute left-0 top-1 w-16 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-10">
                  {phase.phase}
                </div>
              </div>
              <div className="ml-20 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 hover:border-purple-300 dark:hover:border-purple-700 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{phase.name}</h4>
                  <span className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    <Calendar className="w-4 h-4" />
                    {phase.duration}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-purple-600" />
          Code Migration Example
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Before: REST Fetch</div>
            <pre className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono overflow-x-auto">
              {guide.codeExamples.restToGraphQL.before}
            </pre>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">After: GraphQL Query</div>
            <pre className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-mono overflow-x-auto text-purple-600 dark:text-purple-300">
              {guide.codeExamples.restToGraphQL.after}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
