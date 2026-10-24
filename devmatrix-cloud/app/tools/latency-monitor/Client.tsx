'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Square, Activity, AlertTriangle, Clock, Server, CheckCircle, XCircle, RefreshCw, ChevronDown, Shield } from 'lucide-react';
import { clsx } from 'clsx';

type CheckResult = {
  id: number;
  timestamp: number;
  latency: number;
  status: number;
  statusText: string;
  ok: boolean;
};

type MonitorStats = {
  uptime: number;
  avgLatency: number;
  totalChecks: number;
  failedChecks: number;
  lastCheckTime: number | null;
};

const INTERVAL_OPTIONS = [
  { label: 'Fast (2s)', value: 2000 },
  { label: 'Normal (5s)', value: 5000 },
  { label: 'Relaxed (10s)', value: 10000 },
  { label: 'Slow (30s)', value: 30000 },
  { label: 'Minute (60s)', value: 60000 },
];

export default function LatencyMonitorClient() {
  const [url, setUrl] = useState('');
  const [intervalMs, setIntervalMs] = useState(5000);
  const [method, setMethod] = useState<'GET' | 'HEAD'>('HEAD');
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<CheckResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Statistics Calculation
  const stats: MonitorStats = useMemo(() => {
    if (history.length === 0) {
      return { uptime: 100, avgLatency: 0, totalChecks: 0, failedChecks: 0, lastCheckTime: null };
    }

    const total = history.length;
    const failed = history.filter(h => !h.ok).length;
    const successful = history.filter(h => h.ok);
    const totalLatency = successful.reduce((acc, curr) => acc + curr.latency, 0);

    return {
      uptime: ((total - failed) / total) * 100,
      avgLatency: successful.length > 0 ? Math.round(totalLatency / successful.length) : 0,
      totalChecks: total,
      failedChecks: failed,
      lastCheckTime: history[history.length - 1].timestamp,
    };
  }, [history]);

  // Chart Data Preparation
  const chartData = useMemo(() => {
    // Show last 50 points
    const slice = history.slice(-50);
    if (slice.length < 2) return null;

    const maxLatency = Math.max(...slice.map(p => p.latency), 100) * 1.2; // Add 20% headroom
    const minLatency = 0;

    const points = slice.map((point, index) => {
      const x = (index / (slice.length - 1)) * 100;
      const y = 100 - ((point.latency - minLatency) / (maxLatency - minLatency)) * 100;
      return `${x},${y}`;
    }).join(' ');

    return { points, maxLatency, slice };
  }, [history]);

  const toggleMonitor = () => {
    if (isRunning) {
      stopMonitor();
    } else {
      startMonitor();
    }
  };

  const startMonitor = () => {
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }

    // Simple URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch (e) {
      setError('Invalid URL format. Include http:// or https://');
      return;
    }

    setError(null);
    setIsRunning(true);
    performCheck(); // Immediate check
    // Clear previous interval if any
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(performCheck, intervalMs);
  };

  const stopMonitor = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const performCheck = async () => {
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;

    try {
      const res = await fetch('/api/proxy-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: targetUrl,
          method: method,
        }),
      });

      const data = await res.json();

      const isOk = res.ok && data.status >= 200 && data.status < 300;

      const newResult: CheckResult = {
        id: Date.now(),
        timestamp: Date.now(),
        latency: data.duration || 0,
        status: data.status || 0,
        statusText: data.statusText || (isOk ? 'OK' : 'Error'),
        ok: isOk,
      };

      setHistory(prev => [...prev, newResult]);

    } catch (err) {
      const newResult: CheckResult = {
        id: Date.now(),
        timestamp: Date.now(),
        latency: 0,
        status: 0,
        statusText: 'Network Error',
        ok: false,
      };
      setHistory(prev => [...prev, newResult]);
    }
  };

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [history]);

  const currentStatus = history.length > 0 ? (history[history.length - 1].ok ? 'Operational' : 'Downtime Detected') : 'Ready';
  const statusColor = currentStatus === 'Operational' ? 'text-green-500' : currentStatus === 'Ready' ? 'text-slate-500' : 'text-red-500';
  const statusBg = currentStatus === 'Operational' ? 'bg-green-500/10 border-green-500/20' : currentStatus === 'Ready' ? 'bg-slate-500/10 border-slate-500/20' : 'bg-red-500/10 border-red-500/20';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 mb-4">
            <Activity className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Latency & Uptime Monitor
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Professional-grade endpoint monitoring. Track latency, uptime, and detailed status codes in real-time right from your browser.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
            <div className="flex-1 w-full space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Target Endpoint</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Server className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. google.com or https://api.myservice.com/health"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isRunning}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="w-full md:w-48 space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Check Interval</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 h-4 w-4 text-slate-500 z-10" />
                <select
                  value={intervalMs}
                  onChange={(e) => setIntervalMs(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full pl-9 pr-8 py-3 bg-slate-950 border border-slate-800 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {INTERVAL_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div className="w-full md:w-auto">
              <button
                onClick={toggleMonitor}
                className={clsx(
                  "w-full md:w-auto px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg",
                  isRunning
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                )}
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4 fill-current" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Start Monitoring
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Status & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Status Card */}
            <div className={clsx("p-6 rounded-2xl border transition-colors duration-500", statusBg)}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-70 uppercase tracking-wider">Current Status</span>
                {isRunning && <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-current"></span>
                </span>}
              </div>
              <div className={clsx("text-3xl font-bold flex items-center gap-3", statusColor)}>
                {currentStatus === 'Operational' ? <CheckCircle className="w-8 h-8" /> : currentStatus === 'Ready' ? <Shield className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                {currentStatus}
              </div>
              {history.length > 0 && (
                <div className="mt-4 text-sm opacity-80">
                  Last check: {new Date(history[history.length-1].timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Avg Latency</div>
                <div className="text-2xl font-mono font-bold text-white">{stats.avgLatency}<span className="text-sm text-slate-500 ml-1">ms</span></div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Uptime</div>
                <div className={clsx("text-2xl font-mono font-bold", stats.uptime >= 99 ? 'text-green-400' : stats.uptime >= 90 ? 'text-yellow-400' : 'text-red-400')}>
                  {stats.uptime.toFixed(1)}<span className="text-sm text-slate-500 ml-1">%</span>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Checks</div>
                <div className="text-2xl font-mono font-bold text-white">{stats.totalChecks}</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Downtime</div>
                <div className={clsx("text-2xl font-mono font-bold", stats.failedChecks === 0 ? 'text-slate-300' : 'text-red-400')}>
                  {stats.failedChecks}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                Latency History
              </h3>
              <div className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded">Last 50 Checks</div>
            </div>

            <div className="flex-1 min-h-[250px] relative w-full bg-slate-950/50 rounded-xl overflow-hidden border border-slate-800/50">
               {chartData ? (
                 <div className="absolute inset-0 p-4">
                   <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                     {/* Grid lines */}
                     <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="0.2" strokeDasharray="2" />
                     <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.2" strokeDasharray="2" />
                     <line x1="0" y1="75" x2="100" y2="75" stroke="#334155" strokeWidth="0.2" strokeDasharray="2" />

                     {/* The Chart Line */}
                     <polyline
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="1.5"
                        points={chartData.points}
                        vectorEffect="non-scaling-stroke"
                        className="drop-shadow-lg"
                     />

                     {/* Area under curve (optional, simple gradient look via CSS usually better but polyline works) */}
                     <polyline
                        fill="url(#gradient)"
                        stroke="none"
                        points={`0,100 ${chartData.points} 100,100`}
                        opacity="0.2"
                     />
                     <defs>
                       <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                         <stop offset="0%" stopColor="#6366f1" />
                         <stop offset="100%" stopColor="transparent" />
                       </linearGradient>
                     </defs>
                   </svg>

                   {/* Tooltip-like Info overlay (simplification) */}
                   <div className="absolute top-2 right-2 text-xs font-mono text-slate-500">
                     Max: {Math.round(chartData.maxLatency)}ms
                   </div>
                 </div>
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-2">
                   <Activity className="w-8 h-8 opacity-20" />
                   <p className="text-sm">Waiting for data...</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              Response Log
            </h3>
            <span className="text-xs text-slate-500">Latest First</span>
          </div>
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar" ref={scrollRef}>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 sticky top-0 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Latency</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {history.slice().reverse().map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-3 text-slate-400 font-mono">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-3">
                      <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        entry.ok ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      )}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono text-slate-300">
                      {entry.latency}ms
                    </td>
                    <td className="px-6 py-3 text-slate-400">
                      {entry.statusText}
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">
                      No checks performed yet. Start monitoring to see results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info / SEO Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-800/50 text-slate-400">
           <div className="space-y-4">
             <h3 className="text-white font-semibold flex items-center gap-2">
               <Shield className="w-5 h-5 text-indigo-400" />
               Reliable & Transparent
             </h3>
             <p className="text-sm leading-relaxed">
               Unlike synthetic benchmarks, this tool performs real HTTP requests from our secure proxy infrastructure to your endpoint. This ensures CORS issues are bypassed and you get a realistic view of how your server responds to external traffic.
             </p>
           </div>

           <div className="space-y-4">
             <h3 className="text-white font-semibold flex items-center gap-2">
               <Clock className="w-5 h-5 text-indigo-400" />
               Data Retention Policy
             </h3>
             <p className="text-sm leading-relaxed">
               For privacy and security, monitoring data is stored strictly in your browser's memory session. We do not persist your endpoint history or logs in our database. Once you close this tab, the data is wiped.
             </p>
           </div>

           <div className="space-y-4">
             <h3 className="text-white font-semibold flex items-center gap-2">
               <Activity className="w-5 h-5 text-indigo-400" />
               How Uptime Monitoring Works
             </h3>
             <p className="text-sm leading-relaxed">
               We send periodic HEAD or GET requests to your specified URL. We measure the Time To First Byte (TTFB) and the total round-trip time. If the status code is 2xx, we mark it as "Operational". Any other status (4xx, 5xx) or a timeout flags a "Downtime" incident.
             </p>
           </div>

           <div className="space-y-4">
             <h3 className="text-white font-semibold flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-indigo-400" />
               Monitoring Limits
             </h3>
             <p className="text-sm leading-relaxed">
               To prevent abuse, the minimum check interval is 2 seconds. The tool is designed for personal verification and ad-hoc troubleshooting. For enterprise-grade SLA monitoring, we recommend dedicated observability platforms.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
