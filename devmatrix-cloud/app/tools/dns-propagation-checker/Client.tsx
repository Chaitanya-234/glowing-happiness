'use client';

import React, { useState } from 'react';
import { checkDnsPropagation, DnsResult } from '@/app/actions/dns-check';
import { motion } from 'framer-motion';
import { Search, Globe, Server, AlertCircle, Info, CheckCircle, XCircle, Clock } from 'lucide-react';

const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'];

export default function DnsPropagationClient() {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DnsResult[] | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) {
      setError('Please enter a domain name');
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);

    try {
      // Basic validation
      const cleanDomain = domain.trim().replace(/^https?:\/\//, '');
      const data = await checkDnsPropagation(cleanDomain, recordType);
      setResults(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to fetch DNS data: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            DNS Propagation Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Check real-time DNS records across global resolvers. Verify propagation status for A, MX, NS, and more.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleCheck} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-gray-50 dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="block w-full py-4 px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              >
                {RECORD_TYPES.map(type => (
                  <option key={type} value={type}>{type} Record</option>
                ))}
              </select>
            </div>
            <button
              type="button" // Changed to button to avoid accidental submission if I add logic later, but form onSubmit handles it.
              onClick={handleCheck}
              disabled={loading}
              className={`w-full md:w-auto px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Checking...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Check DNS
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-300">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Server className="h-6 w-6 text-blue-500" />
              Propagation Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{result.provider}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Globe className="h-3 w-3" /> {result.location}
                      </p>
                    </div>
                    {result.status === 'success' ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                  <div className="p-4">
                    {result.status === 'success' ? (
                      <div className="space-y-2">
                        {result.data?.map((record, i) => (
                          <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded-md p-2 text-sm font-mono break-all text-gray-800 dark:text-gray-200">
                            {record}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-red-500 text-sm">{result.error}</p>
                    )}
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      Checked at {new Date(result.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Educational Content (SEO & EEAT) */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              What is DNS Propagation?
            </h3>
            <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-300">
              <p>
                DNS propagation is the time it takes for DNS changes to be updated across the entire internet.
                When you update your nameservers or DNS records, the change doesn&apos;t happen instantly.
                It can take anywhere from a few minutes to 48 hours for the new information to spread to all
                DNS servers worldwide.
              </p>
              <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium text-xs">
                  ⚠️ Important: Just because you see the correct record here doesn&apos;t mean every user in the world sees it yet.
                  Local ISP caches can persist longer than global resolvers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              Understanding TTL (Time to Live)
            </h3>
            <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-300">
              <p>
                TTL stands for &quot;Time To Live.&quot; It is a setting on DNS records that tells servers how long
                to cache (store) the information before checking for updates again.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Short TTL (300s / 5 min):</strong> Good for planned changes. Updates propagate quickly but increase server load.</li>
                <li><strong>Long TTL (86400s / 24 hrs):</strong> Standard for stable records. Reduces load but makes updates slower.</li>
              </ul>
              <p className="mt-2">
                If you plan to move your website, lower your TTL a day in advance to ensure the switch happens smoothly!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
