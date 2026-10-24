'use client';

import { useState } from 'react';
import { generateHashAction } from '../actions';
import { Copy, RefreshCw, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function HashGenerator() {
  const [password, setPassword] = useState('');
  const [cost, setCost] = useState(10);
  const [result, setResult] = useState<{ hash: string; timeTaken: string; cost: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!password) {
      setError('Please enter a password');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await generateHashAction(password, cost);
      setResult(data);
      toast.success('Hash generated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to generate hash');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to hash..."
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-100 placeholder-slate-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="cost" className="block text-sm font-medium text-slate-300">
                Cost Factor (Work Factor)
              </label>
              <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Current: {cost}
              </span>
            </div>
            <input
              type="range"
              id="cost"
              min="4"
              max="16" // Capping at 16 for UI responsiveness, though API allows up to 31
              value={cost}
              onChange={(e) => setCost(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>4 (Fast)</span>
              <span>10 (Default)</span>
              <span>16 (Slow)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Higher cost means more computational work, making the hash harder to brute-force but slower to generate.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Hash'
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-medium text-slate-200 mb-4">Output</h3>

          {result ? (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 break-all group relative">
                <code className="text-green-400 font-mono text-sm">{result.hash}</code>
                <button
                  onClick={() => copyToClipboard(result.hash)}
                  className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy Hash"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Time Taken</div>
                  <div className="text-slate-200 font-mono">{result.timeTaken} ms</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Length</div>
                  <div className="text-slate-200 font-mono">{result.hash.length} chars</div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 mt-4">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Hash Breakdown</h4>
                {/* Bcrypt format: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy */}
                {/* $2a$ - Alg identifier */}
                {/* 10$ - Cost factor */}
                {/* First 22 chars of remainder - Salt */}
                {/* Last 31 chars - Hash */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 w-16 text-right">{result.hash.substring(0, 4)}</span>
                    <span className="text-slate-400">Algorithm Identifier (Bcrypt)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 w-16 text-right">{result.hash.substring(4, 7)}</span>
                    <span className="text-slate-400">Cost Factor (2^{result.cost} iterations)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 w-16 text-right">{result.hash.substring(7, 29)}</span>
                    <span className="text-slate-400">Salt (First 22 chars of hash body)</span>
                  </div>
                  <div className="flex items-center gap-2 break-all">
                    <span className="text-green-400 w-16 text-right flex-shrink-0">Hash</span>
                    <span className="text-slate-400">{result.hash.substring(29)} (Checksum)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6 opacity-50" />
              </div>
              <p>Generate a hash to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
