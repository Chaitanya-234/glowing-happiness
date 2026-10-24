'use client';

import React, { useState } from 'react';
import { checkSslCertificate, SslCheckResult } from '@/app/actions/ssl-check';
import { motion } from 'framer-motion';
import { Shield, Search, Lock, AlertTriangle, Check, X, Calendar, Server, Key, FileText } from 'lucide-react';

export default function SslCheckerClient() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SslCheckResult | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) {
      setError('Please enter a domain name');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const cleanDomain = domain.trim().replace(/^https?:\/\//, '').split('/')[0];
      const data = await checkSslCertificate(cleanDomain);
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to analyze SSL certificate: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const getDaysRemainingColor = (days: number | undefined) => {
    if (days === undefined) return 'text-gray-500';
    if (days < 0) return 'text-red-600';
    if (days < 14) return 'text-orange-500';
    if (days < 30) return 'text-yellow-500';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            SSL/TLS Certificate Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Deep scan your domain&apos;s security certificate. Verify chain, expiry, and encryption strength instantly.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleCheck} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-gray-50 dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Analyze
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Card */}
            <div className={`rounded-xl shadow-lg border-l-8 p-6 ${result.valid ? 'bg-white dark:bg-gray-800 border-green-500' : 'bg-white dark:bg-gray-800 border-red-500'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    {result.valid ? (
                      <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <Check className="h-8 w-8" /> Secure Connection
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <X className="h-8 w-8" /> Certificate Issues Found
                      </span>
                    )}
                  </h2>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Host: {result.host} (Port: {result.port})
                  </p>
                </div>
                {result.daysRemaining !== undefined && (
                   <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                     <p className="text-xs text-gray-500 uppercase font-semibold">Expires In</p>
                     <p className={`text-2xl font-bold ${getDaysRemainingColor(result.daysRemaining)}`}>
                       {result.daysRemaining} Days
                     </p>
                   </div>
                )}
              </div>

              {result.error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900">
                   <p className="text-red-800 dark:text-red-200 font-semibold">Error: {result.error}</p>
                </div>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Validity Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Validity Period
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Issued On</dt>
                    <dd className="font-mono">{result.validFrom ? new Date(result.validFrom).toLocaleDateString() : 'N/A'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Expires On</dt>
                    <dd className="font-mono">{result.validTo ? new Date(result.validTo).toLocaleDateString() : 'N/A'}</dd>
                  </div>
                </dl>
              </div>

              {/* Issuer Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
                  <Server className="h-5 w-5 text-purple-500" />
                  Issuer Details
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400 text-xs">Issued By</dt>
                    <dd className="font-medium break-words mt-1">{result.issuer || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400 text-xs">Issued To (CN)</dt>
                    <dd className="font-medium break-words mt-1">{result.subject || 'N/A'}</dd>
                  </div>
                </dl>
              </div>

               {/* Technical Info */}
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
                  <Key className="h-5 w-5 text-orange-500" />
                  Technical Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400 text-xs">Cipher Suite</dt>
                      <dd className="font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded mt-1">{result.cipher || 'N/A'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400 text-xs">Protocol Version</dt>
                      <dd className="font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded mt-1">{result.protocol || 'N/A'}</dd>
                    </div>
                  </dl>
                   <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400 text-xs">Serial Number</dt>
                      <dd className="font-mono text-xs break-all mt-1">{result.serialNumber || 'N/A'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400 text-xs">Fingerprint (SHA-1)</dt>
                      <dd className="font-mono text-xs break-all mt-1">{result.fingerprint || 'N/A'}</dd>
                    </div>
                  </dl>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Educational Content (EEAT) */}
        <div className="mt-12 space-y-8">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Why SSL/TLS Matters
            </h3>
            <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-300 max-w-none">
              <p>
                SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) are standard protocols
                used to establish an encrypted link between a web server and a browser. This ensures that all data passed
                between the web server and browsers remain private and integral.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Authentication</h4>
                  <p className="text-xs mt-1">Verifies that the server is who it claims to be.</p>
                </div>
                 <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Encryption</h4>
                  <p className="text-xs mt-1">Protects data from being read by third parties.</p>
                </div>
                 <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Integrity</h4>
                  <p className="text-xs mt-1">Ensures data has not been altered in transit.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <FileText className="h-5 w-5" />
              Standard & Disclaimer
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This tool performs a passive scan of the SSL/TLS configuration presented by the server.
              It checks for validity dates, issuer trust, and supported ciphers during the handshake.
              <strong>It does not perform a full penetration test</strong> or check for all possible vulnerabilities (like Heartbleed or POODLE) exhaustively.
              For a complete security audit, consult a professional security engineer.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
