'use client';

import React, { useState } from 'react';
import { Layers, Database, Code, GitBranch, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import RestApiInput from './RestApiInput';
import EndpointAnalyzer from './EndpointAnalyzer';
import RelationshipMapper from './RelationshipMapper';
import SchemaPreview from './SchemaPreview';
import ResolverCode from './ResolverCode';
import ClientQueries from './ClientQueries';
import MigrationGuide from './MigrationGuide';
import OptimizationPanel from './OptimizationPanel';
import ComparisonView from './ComparisonView';
import { generateGraphQLSchema, RestApiInput as InputType } from '../actions';
import { z } from 'zod';
import { GraphQLDesignerSchema } from '../../../../lib/ai-schemas';
import { toast } from 'sonner';

type SchemaType = z.infer<typeof GraphQLDesignerSchema>;

export default function GraphQLDesignerClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SchemaType | null>(null);
  const [activeTab, setActiveTab] = useState('analysis');

  const handleGenerate = async (input: InputType) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await generateGraphQLSchema(input);
      setResult(data);
      setActiveTab('analysis');
      toast.success('GraphQL Schema generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate schema');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'analysis', label: 'Analysis', icon: Layers },
    { id: 'relationships', label: 'Relationships', icon: GitBranch },
    { id: 'schema', label: 'Schema', icon: Database },
    { id: 'resolvers', label: 'Resolvers', icon: Code },
    { id: 'client', label: 'Client', icon: Code },
    { id: 'migration', label: 'Migration', icon: ArrowRight },
    { id: 'optimization', label: 'Optimization', icon: Activity },
    { id: 'comparison', label: 'Comparison', icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          AI GraphQL Schema Designer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Transform your REST API into a production-ready GraphQL schema instantly.
          Our AI analyzes your endpoints, infers relationships, and generates optimized resolvers with DataLoaders.
        </p>
      </div>

      {!result && (
        <div className="max-w-4xl mx-auto">
          <RestApiInput onSubmit={handleGenerate} isLoading={loading} />
        </div>
      )}

      {result && (
        <div className="space-y-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
               {tabs.map((tab) => {
                 const Icon = tab.icon;
                 return (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                       activeTab === tab.id
                         ? 'bg-purple-600 text-white'
                         : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                     }`}
                   >
                     <Icon className="w-4 h-4" />
                     {tab.label}
                   </button>
                 );
               })}
             </div>

             <button
               onClick={() => setResult(null)}
               className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
             >
               Start Over
             </button>
           </div>

           <div className="min-h-[500px]">
             {activeTab === 'analysis' && <EndpointAnalyzer analysis={result.apiAnalysis} />}
             {activeTab === 'relationships' && <RelationshipMapper relationships={result.relationships} />}
             {activeTab === 'schema' && <SchemaPreview schema={result.graphqlSchema} />}
             {activeTab === 'resolvers' && <ResolverCode resolvers={result.resolvers} dataLoaders={result.dataLoaders} />}
             {activeTab === 'client' && <ClientQueries queries={result.clientQueries} />}
             {activeTab === 'migration' && <MigrationGuide guide={result.migrationGuide} />}
             {activeTab === 'optimization' && <OptimizationPanel optimizations={result.optimizations} />}
             {activeTab === 'comparison' && <ComparisonView comparison={result.comparison} />}
           </div>
        </div>
      )}
    </div>
  );
}
