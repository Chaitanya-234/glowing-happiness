'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, AlertTriangle, Shield, RefreshCw, Server, Info, CheckCircle } from 'lucide-react';
import { HttpStatusInfo } from '@/lib/http-status-data';

interface Props {
  data: HttpStatusInfo;
}

export default function HttpStatusDetailClient({ data }: Props) {
  const [copiedRequest, setCopiedRequest] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const copyToClipboard = (text: string, isRequest: boolean) => {
    navigator.clipboard.writeText(text);
    if (isRequest) {
      setCopiedRequest(true);
      setTimeout(() => setCopiedRequest(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '1xx': return 'from-blue-500 to-blue-700';
      case '2xx': return 'from-green-500 to-green-700';
      case '3xx': return 'from-yellow-500 to-yellow-700';
      case '4xx': return 'from-orange-500 to-orange-700';
      case '5xx': return 'from-red-500 to-red-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getIcon = (category: string) => {
     switch (category) {
      case '1xx': return <Info className="w-8 h-8 text-blue-200" />;
      case '2xx': return <CheckCircle className="w-8 h-8 text-green-200" />;
      case '3xx': return <RefreshCw className="w-8 h-8 text-yellow-200" />;
      case '4xx': return <AlertTriangle className="w-8 h-8 text-orange-200" />;
      case '5xx': return <Server className="w-8 h-8 text-red-200" />;
      default: return <Info className="w-8 h-8 text-gray-200" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-12">
      <div className="max-w-5xl mx-auto">
        <Link href="/tools/http-status-explorer" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explorer
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getCategoryColor(data.category)} p-8 md:p-12 mb-12`}
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-black/20 text-sm font-medium backdrop-blur-md border border-white/10">
                  {data.categoryLabel}
                </span>
                {data.developerGuide.retry !== 'None' && (
                  <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium backdrop-blur-md border border-white/10 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Retry: {data.developerGuide.retry}
                  </span>
                )}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tighter mb-2">{data.code}</h1>
              <h2 className="text-2xl md:text-4xl font-bold text-white/90">{data.title}</h2>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              {getIcon(data.category)}
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> What it means
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {data.description}
              </p>
              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl">
                <h4 className="font-semibold text-blue-400 text-sm uppercase tracking-wide mb-1">Concise</h4>
                <p className="text-blue-100">{data.concise}</p>
              </div>
            </section>

            <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <Server className="w-5 h-5" /> Real-World Example
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-sm font-medium text-gray-400">Request</span>
                    <button
                      onClick={() => copyToClipboard(data.exampleRequest, true)}
                      className="text-xs flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
                    >
                      {copiedRequest ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      {copiedRequest ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-black border border-gray-800 rounded-xl p-4 overflow-x-auto font-mono text-sm text-gray-300 shadow-inner">
                    <pre>{data.exampleRequest}</pre>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-sm font-medium text-gray-400">Response</span>
                    <button
                      onClick={() => copyToClipboard(data.exampleResponse, false)}
                      className="text-xs flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
                    >
                      {copiedResponse ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      {copiedResponse ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-black border border-gray-800 rounded-xl p-4 overflow-x-auto font-mono text-sm text-green-400 shadow-inner">
                    <pre>{data.exampleResponse}</pre>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" /> Developer Guide
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">The Issue</h4>
                  <p className="text-sm text-gray-300">{data.developerGuide.meaning}</p>
                </div>

                <div className="h-px bg-gray-800" />

                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">How to Fix</h4>
                  <p className="text-sm text-gray-300">{data.developerGuide.fix}</p>
                </div>

                <div className="h-px bg-gray-800" />

                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Retry Strategy</h4>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${data.developerGuide.retry === 'None' ? 'bg-gray-500' : 'bg-green-500'}`} />
                    <p className="text-sm text-white font-medium">{data.developerGuide.retry}</p>
                  </div>
                </div>
              </div>
            </section>

            {data.related.length > 0 && (
              <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Related Codes</h3>
                <div className="flex flex-wrap gap-2">
                  {data.related.map((code) => (
                    <Link
                      key={code}
                      href={`/tools/http-status-explorer/${code}`}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors border border-gray-700"
                    >
                      {code}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
