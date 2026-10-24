'use client';

import { useState } from 'react';
import HashGenerator from './HashGenerator';
import HashVerifier from './HashVerifier';

export default function BcryptGeneratorClient() {
  const [activeTab, setActiveTab] = useState<'generate' | 'verify'>('generate');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="border-b border-slate-800">
          <div className="flex">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'generate'
                  ? 'text-blue-400 bg-slate-800/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              Generate Hash
              {activeTab === 'generate' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('verify')}
              className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'verify'
                  ? 'text-purple-400 bg-slate-800/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              Verify Hash
              {activeTab === 'verify' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
              )}
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'generate' ? <HashGenerator /> : <HashVerifier />}
        </div>
      </div>
    </div>
  );
}
