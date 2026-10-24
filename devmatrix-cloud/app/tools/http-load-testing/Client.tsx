'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Play, Square, Activity, AlertTriangle, Clock, Server } from 'lucide-react';
import { toast } from 'sonner';

// Types
interface TestConfig {
  url: string;
  method: string;
  concurrency: number;
  duration: number;
  headers: string;
  body: string;
}

interface TestResult {
  totalRequests: number;
  successCount: number;
  errorCount: number;
  avgLatency: number;
  minLatency: number;
  maxLatency: number;
  rps: number;
  statusDistribution: Record<string, number>;
  latencyHistory: { time: string; latency: number }[];
}

export default function Client() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<TestConfig>({
    url: '',
    method: 'GET',
    concurrency: 5,
    duration: 10,
    headers: '',
    body: ''
  });

  const [results, setResults] = useState<TestResult>({
    totalRequests: 0,
    successCount: 0,
    errorCount: 0,
    avgLatency: 0,
    minLatency: 0,
    maxLatency: 0,
    rps: 0,
    statusDistribution: {},
    latencyHistory: []
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startLoadTest = async () => {
    if (!config.url) {
      toast.error('Please enter a target URL');
      return;
    }

    try {
      new URL(config.url);
    } catch {
      toast.error('Invalid URL format');
      return;
    }

    setLoading(true);
    // Reset results
    setResults({
      totalRequests: 0,
      successCount: 0,
      errorCount: 0,
      avgLatency: 0,
      minLatency: 0,
      maxLatency: 0,
      rps: 0,
      statusDistribution: {},
      latencyHistory: []
    });

    startTimeRef.current = Date.now();
    abortControllerRef.current = new AbortController();

    try {
      let parsedHeaders = {};
      try {
        if (config.headers) parsedHeaders = JSON.parse(config.headers);
      } catch (e) {
        toast.error('Invalid JSON in Headers');
        setLoading(false);
        return;
      }

      let parsedBody = undefined;
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method) && config.body) {
        try {
           parsedBody = JSON.parse(config.body);
        } catch {
           parsedBody = config.body; // treat as plain text if not json
        }
      }

      const response = await fetch('/api/tools/http-load-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: config.url,
          method: config.method,
          concurrency: config.concurrency,
          duration: config.duration,
          headers: parsedHeaders,
          body: parsedBody
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to start load test');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split('\n\n');
        // Keep the last partial line in buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            try {
              const msg = JSON.parse(jsonStr);
              if (msg.type === 'done') {
                 setLoading(false);
                 toast.success('Load test completed');
                 break;
              }
              if (msg.type === 'result') {
                 handleResult(msg.data);
              }
            } catch (e) {
              console.error('Failed to parse SSE message', e);
            }
          }
        }
      }

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleResult = (data: any) => {
    setResults(prev => {
      const isError = data.status >= 400 || data.status === 0;
      const newTotal = prev.totalRequests + 1;
      const newSuccess = isError ? prev.successCount : prev.successCount + 1;
      const newError = isError ? prev.errorCount + 1 : prev.errorCount;

      const currentElapsed = (Date.now() - startTimeRef.current) / 1000;
      const newRps = currentElapsed > 0 ? newTotal / currentElapsed : 0;

      // Update avg latency
      const newAvg = ((prev.avgLatency * prev.totalRequests) + data.duration) / newTotal;

      // Update min/max
      const newMin = prev.minLatency === 0 ? data.duration : Math.min(prev.minLatency, data.duration);
      const newMax = Math.max(prev.maxLatency, data.duration);

      // Status dist
      const statusKey = data.status === 0 ? 'Error' : data.status.toString();
      const newStatusDist = { ...prev.statusDistribution };
      newStatusDist[statusKey] = (newStatusDist[statusKey] || 0) + 1;

      // History (limit to last 50 points to save memory if needed, but Recharts handles hundreds fine)
      const newHistory = [...prev.latencyHistory, { time: currentElapsed.toFixed(1), latency: data.duration }];
      if (newHistory.length > 100) newHistory.shift();

      return {
        totalRequests: newTotal,
        successCount: newSuccess,
        errorCount: newError,
        avgLatency: newAvg,
        minLatency: newMin,
        maxLatency: newMax,
        rps: newRps,
        statusDistribution: newStatusDist,
        latencyHistory: newHistory
      };
    });
  };

  const stopLoadTest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      toast.info('Load test stopped');
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-pulse">Loading Load Testing Tool...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Configuration Panel */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Configuration
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Target URL</label>
              <input
                type="url"
                value={config.url}
                onChange={(e) => setConfig({...config, url: e.target.value})}
                placeholder="https://api.example.com/data"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Method</label>
                <select
                  value={config.method}
                  onChange={(e) => setConfig({...config, method: e.target.value})}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
                  disabled={loading}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="HEAD">HEAD</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>
              <div>
                 <label className="block text-sm font-medium mb-1">Duration (s)</label>
                 <input
                  type="number"
                  value={config.duration}
                  onChange={(e) => setConfig({...config, duration: Number(e.target.value)})}
                  min={1} max={60}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Concurrency (Users)</label>
              <input
                type="range"
                value={config.concurrency}
                onChange={(e) => setConfig({...config, concurrency: Number(e.target.value)})}
                min={1} max={50}
                className="w-full"
                disabled={loading}
              />
              <div className="text-right text-xs text-gray-500">{config.concurrency} virtual users</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Headers (JSON)</label>
              <textarea
                value={config.headers}
                onChange={(e) => setConfig({...config, headers: e.target.value})}
                placeholder='{"Authorization": "Bearer token"}'
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent font-mono text-xs h-20"
                disabled={loading}
              />
            </div>

            {config.method !== 'GET' && config.method !== 'HEAD' && (
              <div>
                <label className="block text-sm font-medium mb-1">Body (JSON/Text)</label>
                <textarea
                  value={config.body}
                  onChange={(e) => setConfig({...config, body: e.target.value})}
                  placeholder='{"key": "value"}'
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent font-mono text-xs h-24"
                  disabled={loading}
                />
              </div>
            )}

            <button
              onClick={loading ? stopLoadTest : startLoadTest}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                loading
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? (
                <>
                  <Square className="w-4 h-4 fill-current" /> Stop Test
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Start Load Test
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="w-full lg:w-2/3 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
              <Server className="w-3 h-3" /> Requests
            </div>
            <div className="text-2xl font-bold">{results.totalRequests}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Avg Latency
            </div>
            <div className="text-2xl font-bold">{results.avgLatency.toFixed(0)} ms</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
             <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
              <Activity className="w-3 h-3" /> RPS
            </div>
            <div className="text-2xl font-bold">{results.rps.toFixed(1)}</div>
          </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Errors
            </div>
            <div className={`text-2xl font-bold ${results.errorCount > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {results.errorCount}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold mb-4">Response Time History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.latencyHistory}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" hide />
                <YAxis unit="ms" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
             <h3 className="font-bold mb-4">Status Codes</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(results.statusDistribution).map(([name, value]) => ({ name, value }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {Object.keys(results.statusDistribution).map((entry, index) => {
                        const code = parseInt(entry);
                        let color = '#3b82f6'; // 2xx blue
                        if (code >= 300) color = '#eab308'; // 3xx yellow
                        if (code >= 400) color = '#f97316'; // 4xx orange
                        if (code >= 500 || code === 0) color = '#ef4444'; // 5xx/error red
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold mb-4">Latency Stats</h3>
              <div className="space-y-3">
                 <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                   <span className="text-gray-500">Min</span>
                   <span className="font-mono">{results.minLatency.toFixed(0)} ms</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                   <span className="text-gray-500">Max</span>
                   <span className="font-mono">{results.maxLatency.toFixed(0)} ms</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                   <span className="text-gray-500">Average</span>
                   <span className="font-mono">{results.avgLatency.toFixed(0)} ms</span>
                 </div>
                 <div className="flex justify-between pb-2">
                   <span className="text-gray-500">Success Rate</span>
                   <span className="font-mono">
                     {results.totalRequests > 0
                       ? ((results.successCount / results.totalRequests) * 100).toFixed(1)
                       : 0}%
                   </span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
