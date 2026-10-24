'use client';

import React, { useState } from 'react';
import { scanPort, resolveHost, PortScanResult } from '@/app/actions/port-scan';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Shield, Activity, Lock, Globe, Server, Info } from 'lucide-react';
import Link from 'next/link';
import { UI_PORTS_LIST } from '@/lib/port-scanner-constants';

export default function PortScannerClient() {
  const [host, setHost] = useState('');
  const [results, setResults] = useState<PortScanResult[]>([]);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resolvedIP, setResolvedIP] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host) return;

    setScanning(true);
    setResults([]);
    setError(null);
    setProgress(0);
    setResolvedIP(null);

    try {
      // 1. Resolve Host
      const resolveRes = await resolveHost(host);
      if (resolveRes.error || !resolveRes.ip) {
        setError(resolveRes.error || 'Failed to resolve host.');
        setScanning(false);
        return;
      }
      setResolvedIP(resolveRes.ip);

      // 2. Scan Ports Sequentially (or in small batches)
      // We do it sequentially to be nice to the network and provide real-time updates.
      const newResults: PortScanResult[] = [];
      const totalPorts = UI_PORTS_LIST.length;

      for (let i = 0; i < totalPorts; i++) {
        const port = UI_PORTS_LIST[i];
        try {
          // Delay for rate limiting/ethics (100ms)
          await new Promise(r => setTimeout(r, 100));

          const result = await scanPort(host, port);
          newResults.push(result);
          setResults([...newResults]); // Update UI
          setProgress(Math.round(((i + 1) / totalPorts) * 100));
        } catch (err) {
            // Should not happen as scanPort handles errors, but just in case
            console.error(err);
        }
      }

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setScanning(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-50 border-green-200';
      case 'closed': return 'text-red-600 bg-red-50 border-red-200';
      case 'timeout': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <Lock className="w-4 h-4" />;
      case 'timeout': return <Activity className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Port Scanner</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ethical, controlled port scanning tool. Check for open ports and services on your servers or devices.
          </p>
        </div>

        {/* Main Tool Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-12">
          <div className="p-8">
            <form onSubmit={handleScan} className="space-y-6">
              <div>
                <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Host (Domain or IP)
                </label>
                <div className="flex gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="host"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      placeholder="example.com or 1.1.1.1"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={scanning}
                    className={`px-8 py-3 rounded-lg font-medium text-white transition-all transform hover:scale-105 ${
                      scanning
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-200'
                    }`}
                  >
                    {scanning ? 'Scanning...' : 'Start Scan'}
                  </button>
                </div>
                {error && (
                  <div className="mt-3 text-red-600 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                  </div>
                )}
                {resolvedIP && (
                  <div className="mt-3 text-gray-600 text-sm flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Resolved IP: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{resolvedIP}</span>
                  </div>
                )}
              </div>
            </form>

            {/* Progress Bar */}
            {scanning && (
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Results Table */}
            {results.length > 0 && (
              <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Port
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result) => (
                      <tr key={result.port} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {result.port}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {result.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(result.status)} gap-1.5`}>
                            {getStatusIcon(result.status)}
                            {result.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Informational Sections */}
        <div className="grid md:grid-cols-2 gap-8">

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              How it Works
            </h2>
            <div className="prose text-gray-600 text-sm">
              <p>
                This tool attempts to establish a connection to common ports on the target host.
                It uses a safe, non-aggressive method to determine if a port is:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Open:</strong> The service accepted the connection.</li>
                <li><strong>Closed:</strong> The server actively rejected the connection (sent a RST packet).</li>
                <li><strong>Timeout/Filtered:</strong> No response was received, likely due to a firewall dropping the packet.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Ethical Use Policy
            </h2>
            <div className="prose text-gray-600 text-sm">
              <p>
                This tool is designed for educational and defensive security purposes only.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Do not</strong> scan hosts you do not own or have permission to test.</li>
                <li>Internal and private IP ranges are blocked.</li>
                <li>Rate limiting is enforced to prevent abuse and network congestion.</li>
                <li>All scan activities are subject to monitoring.</li>
              </ul>
            </div>
          </section>

        </div>

        {/* Common Ports Info */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Common Ports Reference</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {UI_PORTS_LIST.slice(0, 12).map(port => (
              <div key={port} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-lg font-bold text-blue-600">{port}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {port === 80 ? 'HTTP' : port === 443 ? 'HTTPS' : port === 22 ? 'SSH' : port === 21 ? 'FTP' : 'Service'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <details className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h3 className="text-lg font-medium">Is this port scanner legal?</h3>
                        <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-gray-700">
                        Yes, port scanning your own systems or systems you have permission to test is legal. However, scanning unauthorized targets may violate their Terms of Service or local laws. Use this tool responsibly.
                    </p>
                </details>

                <details className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h3 className="text-lg font-medium">Why are some ports shown as "Timeout"?</h3>
                        <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-gray-700">
                        A "Timeout" status usually means the packets are being dropped by a firewall, so the scanner receives no response at all. This is often called "Filtered" status.
                    </p>
                </details>
            </div>
        </div>

      </div>
    </div>
  );
}
