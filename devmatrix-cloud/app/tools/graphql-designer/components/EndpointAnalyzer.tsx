'use client';

import React from 'react';
import { Server, Shield, Database, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;
type ApiAnalysis = SchemaType['apiAnalysis'];

interface EndpointAnalyzerProps {
  analysis: ApiAnalysis;
}

export default function EndpointAnalyzer({ analysis }: EndpointAnalyzerProps) {
  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'POST': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'PUT': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'PATCH': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Server className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Endpoints</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{analysis.totalEndpoints}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Entities Detected</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{analysis.entitiesDetected}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <LinkIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Relationships</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{analysis.relationshipsFound}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Confidence</p>
            <p className={`text-xl font-bold ${
              analysis.confidence === 'High' ? 'text-green-600' :
              analysis.confidence === 'Medium' ? 'text-amber-600' : 'text-red-600'
            }`}>
              {analysis.confidence}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <h3 className="font-semibold text-gray-900 dark:text-white">Detected Endpoints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Path</th>
                <th className="px-6 py-3">Inferred Entity</th>
                <th className="px-6 py-3">Auth</th>
                <th className="px-6 py-3">Params</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {analysis.endpoints.map((endpoint, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-900 dark:text-white">
                    {endpoint.path}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {endpoint.response?.type || <span className="text-gray-400 italic">Unknown</span>}
                  </td>
                  <td className="px-6 py-4">
                     {endpoint.authentication ? (
                       <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                         <Shield className="w-3 h-3" />
                         {endpoint.authentication}
                       </span>
                     ) : (
                       <span className="text-gray-400">-</span>
                     )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {endpoint.params.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {endpoint.params.map(p => (
                          <span key={p} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                            {p}
                          </span>
                        ))}
                      </div>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
