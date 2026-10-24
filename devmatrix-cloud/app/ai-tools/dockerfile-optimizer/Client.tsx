'use client';

import React, { useState } from 'react';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import {
  FileText,
  Shield,
  Zap,
  Box,
  AlertTriangle,
  CheckCircle,
  Copy,
  Loader2,
  Terminal,
} from 'lucide-react';

type OptimizationResult = {
  issueSummary: string[];
  optimizedDockerfile: string;
  annotations: {
    lineNumber: number;
    issue: string;
    suggestion: string;
    severity: 'Critical' | 'Warning' | 'Info';
  }[];
  imageSizeAnalysis: {
    currentSizeEstimate: string;
    optimizedSizeEstimate: string;
    largestLayers: string[];
  };
  vulnerabilities: {
    package: string;
    cveId?: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    recommendation: string;
  }[];
  beforeAfterComparison: string;
};

const defaultDockerfile = `# Sample Dockerfile
FROM node:latest

WORKDIR /app
COPY . .
RUN npm install

CMD ["npm", "start"]`;

export default function DockerfileOptimizerClient() {
  const [dockerfile, setDockerfile] = useState(defaultDockerfile);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleOptimize = async () => {
    if (!dockerfile.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prompt = `
Act as a senior DevOps engineer, cloud security specialist, and container optimization expert.
Analyze the following Dockerfile and provide actionable recommendations to improve image size, build performance, and security posture.

Dockerfile:
${dockerfile}

Please provide:
1. A clear issue summary (warnings, improvements, critical risks).
2. Line-by-line Dockerfile annotations (identify inefficient instructions, outdated base images, anti-patterns).
3. An optimized version of the Dockerfile (multi-stage builds, smaller base images, .dockerignore suggestions).
4. Image size estimation (current vs optimized, largest layers).
5. Basic CVE scanning (lightweight vulnerability checks on base images).
6. A before/after comparison summary.
      `;

      const data = await generateStructuredContent(
        prompt,
        'dockerfile_optimizer'
      );
      setResult(data as OptimizationResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.optimizedDockerfile) {
      navigator.clipboard.writeText(result.optimizedDockerfile);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-blue-500/30 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Dockerfile <span className="text-blue-500">Optimizer</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Analyze, secure, and shrink your container images with AI-powered
            recommendations. Detect vulnerabilities and optimize build performance instantly.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-gray-800">
                <div className="flex items-center gap-2 text-gray-300">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-sm">Input Dockerfile</span>
                </div>
                <button
                  onClick={() => setDockerfile('')}
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  Clear
                </button>
              </div>
              <textarea
                value={dockerfile}
                onChange={(e) => setDockerfile(e.target.value)}
                className="w-full h-[500px] bg-[#0c0c0c] text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                placeholder="Paste your Dockerfile here..."
                spellCheck={false}
              />
            </div>

            <button
              onClick={handleOptimize}
              disabled={loading || !dockerfile.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Container...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Optimize Dockerfile
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-200 text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-6">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-[#111] border border-gray-800 rounded-xl p-8 border-dashed">
                <Box className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-center max-w-sm">
                  Paste your Dockerfile and click Optimize to see security risks, size estimates, and improvements.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-full max-w-md space-y-4 animate-pulse">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-32 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                  <div className="h-64 bg-gray-800 rounded"></div>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#111] border border-gray-800 p-4 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Current Size</div>
                    <div className="text-xl font-bold text-white">{result.imageSizeAnalysis.currentSizeEstimate}</div>
                  </div>
                   <div className="bg-[#111] border border-gray-800 p-4 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Optimized Size</div>
                    <div className="text-xl font-bold text-green-400">{result.imageSizeAnalysis.optimizedSizeEstimate}</div>
                  </div>
                   <div className="bg-[#111] border border-gray-800 p-4 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Security Score</div>
                    <div className="text-xl font-bold text-blue-400">
                      {result.vulnerabilities.filter(v => v.severity === 'Critical' || v.severity === 'High').length === 0 ? 'Good' : 'Needs Review'}
                    </div>
                  </div>
                </div>

                {/* Issue Summary */}
                <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
                  <h3 className="text-white font-semibold flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Optimization Summary
                  </h3>
                  <ul className="space-y-2">
                    {result.issueSummary.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optimized Code */}
                <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-gray-800">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium text-sm">Optimized Dockerfile</span>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 bg-[#0c0c0c] leading-relaxed">
                    <code>{result.optimizedDockerfile}</code>
                  </pre>
                </div>

                {/* Vulnerabilities */}
                {result.vulnerabilities.length > 0 && (
                  <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
                    <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                      <Shield className="w-4 h-4 text-red-400" />
                      Security Risks
                    </h3>
                    <div className="space-y-3">
                      {result.vulnerabilities.map((vuln, idx) => (
                        <div key={idx} className="bg-red-900/10 border border-red-900/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-red-200">{vuln.package}</span>
                            <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-bold ${
                              vuln.severity === 'Critical' ? 'bg-red-600 text-white' :
                              vuln.severity === 'High' ? 'bg-orange-600 text-white' :
                              'bg-yellow-600 text-black'
                            }`}>
                              {vuln.severity}
                            </span>
                          </div>
                          {vuln.cveId && <div className="text-xs text-red-300/70 mb-1">{vuln.cveId}</div>}
                          <p className="text-xs text-gray-400">{vuln.recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Annotations */}
                 <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
                  <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    Detailed Annotations
                  </h3>
                   <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                      <thead className="text-xs uppercase bg-[#1a1a1a] text-gray-500">
                        <tr>
                          <th className="px-4 py-2 font-medium">Line</th>
                          <th className="px-4 py-2 font-medium">Issue</th>
                          <th className="px-4 py-2 font-medium">Suggestion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {result.annotations.map((item, idx) => (
                          <tr key={idx} className="hover:bg-white/5">
                            <td className="px-4 py-3 font-mono text-gray-500">{item.lineNumber}</td>
                            <td className="px-4 py-3 text-white">{item.issue}</td>
                            <td className="px-4 py-3 text-gray-400">{item.suggestion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                   </div>
                 </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
