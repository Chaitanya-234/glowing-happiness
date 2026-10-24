'use client';

import { useState } from 'react';
import { verifyHashAction } from '../actions';
import { RefreshCw, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function HashVerifier() {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [result, setResult] = useState<{ isMatch: boolean; timeTaken: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!password || !hash) {
      setError('Please enter both password and hash');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const data = await verifyHashAction(password, hash);
      setResult(data);
      if (data.isMatch) {
        toast.success('Password matches the hash!');
      } else {
        toast.error('Password does not match the hash');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label htmlFor="verify-password" className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="text"
              id="verify-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to check..."
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-100 placeholder-slate-500"
            />
          </div>

          <div>
            <label htmlFor="verify-hash" className="block text-sm font-medium text-slate-300 mb-1">
              Bcrypt Hash
            </label>
            <textarea
              id="verify-hash"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="Paste the bcrypt hash here..."
              rows={3}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-100 placeholder-slate-500 font-mono text-sm"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Password'
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[250px]">
          <h3 className="text-lg font-medium text-slate-200 mb-6 absolute top-6 left-6">Result</h3>

          {result ? (
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                result.isMatch
                  ? 'bg-green-500/20 text-green-500 ring-4 ring-green-500/10'
                  : 'bg-red-500/20 text-red-500 ring-4 ring-red-500/10'
              }`}>
                {result.isMatch ? (
                  <CheckCircle2 className="w-10 h-10" />
                ) : (
                  <XCircle className="w-10 h-10" />
                )}
              </div>

              <div>
                <h4 className={`text-xl font-bold ${result.isMatch ? 'text-green-400' : 'text-red-400'}`}>
                  {result.isMatch ? 'Match Confirmed' : 'No Match'}
                </h4>
                <p className="text-slate-400 text-sm mt-1">
                  {result.isMatch
                    ? 'The password is correct for this hash.'
                    : 'The password does not generate this hash.'}
                </p>
              </div>

              <div className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400">
                Processed in {result.timeTaken} ms
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 opacity-30" />
              </div>
              <p>Enter details to verify</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
