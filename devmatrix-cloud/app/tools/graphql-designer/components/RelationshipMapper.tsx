'use client';

import React from 'react';
import { ArrowRight, Link as LinkIcon, AlertTriangle, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;
type Relationships = SchemaType['relationships'];

interface RelationshipMapperProps {
  relationships: Relationships;
}

export default function RelationshipMapper({ relationships }: RelationshipMapperProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (score >= 60) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
    return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  const getConfidenceLabel = (score: number) => {
    if (score >= 90) return 'High Confidence';
    if (score >= 60) return 'Medium Confidence';
    return 'Low Confidence - Review Needed';
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
          Inferred Entity Relationships
        </h3>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          The AI has detected the following relationships based on foreign keys, naming conventions, and nested structures.
          High-confidence matches are likely correct; lower scores may need manual verification in the schema.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {relationships.map((rel, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${getConfidenceColor(rel.confidence)} border-opacity-50 relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                {rel.type.replace(/-/g, ' ')}
              </span>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/50 dark:bg-black/20 text-xs font-medium">
                {rel.confidence >= 90 ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {getConfidenceLabel(rel.confidence)}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{rel.from}</span>
              </div>

              <div className="flex flex-col items-center justify-center text-gray-400">
                <span className="text-xs font-mono mb-1">{rel.via}</span>
                <ArrowRight className="w-5 h-5" />
              </div>

              <div className="flex-1 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{rel.to}</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold opacity-80 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                Evidence:
              </p>
              <ul className="text-xs opacity-70 list-disc list-inside space-y-1">
                {rel.evidence.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {relationships.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
            <LinkIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No clear relationships detected.</p>
          </div>
        )}
      </div>
    </div>
  );
}
