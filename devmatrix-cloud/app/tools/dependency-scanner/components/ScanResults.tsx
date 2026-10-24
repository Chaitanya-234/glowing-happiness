'use client';

import React, { useState } from 'react';
import {
  Shield, AlertTriangle, AlertCircle, CheckCircle,
  ChevronDown, ChevronUp, Download, RefreshCw,
  ExternalLink, Layers, Box, Info
} from 'lucide-react';
import { ScanResult, RiskyDependency, Issue, AlternativeSuggestion } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanResultsProps {
  result: ScanResult;
  onReset: () => void;
}

const RiskBadge = ({ level }: { level: string }) => {
  const colors: Record<string, string> = {
    CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/30',
    HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    LOW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${colors[level] || colors.LOW}`}>
      {level}
    </span>
  );
};

const IssueCard = ({ issue }: { issue: Issue }) => (
  <div className="mt-2 p-3 bg-gray-900/50 rounded border border-gray-700">
    <div className="flex items-start justify-between mb-1">
      <span className="text-sm font-semibold text-gray-200">{issue.title}</span>
      <span className={`text-xs px-1.5 py-0.5 rounded uppercase ${
        issue.severity === 'critical' ? 'bg-red-900 text-red-300' :
        issue.severity === 'high' ? 'bg-orange-900 text-orange-300' :
        issue.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
        'bg-blue-900 text-blue-300'
      }`}>
        {issue.severity}
      </span>
    </div>
    <p className="text-xs text-gray-400 mb-2">{issue.description}</p>
    <div className="text-xs space-y-1">
      <p><span className="text-gray-500">Impact:</span> <span className="text-gray-300">{issue.impact}</span></p>
      <p><span className="text-gray-500">Fix:</span> <span className="text-green-400">{issue.recommendation}</span></p>
    </div>
  </div>
);

const DependencyRow = ({ dep }: { dep: RiskyDependency }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-3">
      <div
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${
            dep.riskLevel === 'CRITICAL' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' :
            dep.riskLevel === 'HIGH' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' :
            dep.riskLevel === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
          }`} />
          <div>
            <h4 className="font-medium text-white flex items-center gap-2">
              {dep.name} <span className="text-gray-500 text-sm">v{dep.version}</span>
            </h4>
            <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              Depth: {dep.depth}
              <span className="mx-1">•</span>
              Path: {dep.dependencyPath.slice(-3).join(' > ')}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RiskBadge level={dep.riskLevel} />
          {expanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-700 bg-gray-800/50"
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400 bg-gray-900/30 p-3 rounded">
                <div>
                  <span className="block text-gray-600 mb-1">License</span>
                  {dep.metadata.license}
                </div>
                <div>
                  <span className="block text-gray-600 mb-1">Maintainers</span>
                  {dep.metadata.maintainers ?? 'Unknown'}
                </div>
                <div>
                  <span className="block text-gray-600 mb-1">Downloads/Wk</span>
                  {dep.metadata.weeklyDownloads ? dep.metadata.weeklyDownloads.toLocaleString() : 'Unknown'}
                </div>
                <div>
                  <span className="block text-gray-600 mb-1">Last Published</span>
                  {dep.metadata.lastPublished}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Identified Issues</h5>
                {dep.issues.map((issue, idx) => (
                  <IssueCard key={idx} issue={issue} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ScanResults({ result, onReset }: ScanResultsProps) {
  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dependency-scan-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            Security Analysis Report
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Scanned {result.summary.totalDependencies} dependencies ({result.summary.indirectDependencies} nested) on {new Date(result.summary.scanDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg border border-gray-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-lg shadow-cyan-900/20 transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            New Scan
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Shield className="w-16 h-16" />
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Security Score</h3>
          <div className={`text-3xl font-bold ${getScoreColor(result.securityScore.overall)}`}>
            {result.securityScore.overall}/100
          </div>
          <p className="text-xs text-gray-500 mt-2">{result.securityScore.explanation.slice(0, 60)}...</p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium mb-3">Risk Breakdown</h3>
          <div className="flex items-end gap-2 h-12">
            <div className="flex-1 bg-red-900/30 rounded-t relative group">
              <div style={{ height: `${Math.max(10, (result.summary.riskBreakdown.critical / result.summary.totalDependencies) * 100)}%` }} className="bg-red-500 rounded-t w-full absolute bottom-0" />
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-400">{result.summary.riskBreakdown.critical}</span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 uppercase">Crit</span>
            </div>
            <div className="flex-1 bg-orange-900/30 rounded-t relative group">
              <div style={{ height: `${Math.max(10, (result.summary.riskBreakdown.high / result.summary.totalDependencies) * 100)}%` }} className="bg-orange-500 rounded-t w-full absolute bottom-0" />
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-400">{result.summary.riskBreakdown.high}</span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 uppercase">High</span>
            </div>
            <div className="flex-1 bg-yellow-900/30 rounded-t relative group">
              <div style={{ height: `${Math.max(10, (result.summary.riskBreakdown.medium / result.summary.totalDependencies) * 100)}%` }} className="bg-yellow-500 rounded-t w-full absolute bottom-0" />
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-yellow-400">{result.summary.riskBreakdown.medium}</span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 uppercase">Med</span>
            </div>
            <div className="flex-1 bg-blue-900/30 rounded-t relative group">
              <div style={{ height: `${Math.max(10, (result.summary.riskBreakdown.low / result.summary.totalDependencies) * 100)}%` }} className="bg-blue-500 rounded-t w-full absolute bottom-0" />
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-400">{result.summary.riskBreakdown.low}</span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 uppercase">Low</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Depth Analysis</h3>
          <div className="flex items-center gap-3 mt-2">
            <Layers className="w-8 h-8 text-cyan-500" />
            <div>
              <div className="text-2xl font-bold text-white">{result.summary.deepestLevel}</div>
              <div className="text-xs text-gray-500">Max dependency depth</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Hidden Risks</h3>
          <ul className="text-xs text-gray-400 space-y-1 mt-2 list-disc pl-4">
            {result.hiddenRisksFound.slice(0, 2).map((risk, i) => (
              <li key={i}>{risk}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Risky Dependencies */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Identified Risks</h3>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
              {result.riskyDependencies.length} detected
            </span>
          </div>

          <div className="space-y-1">
            {result.riskyDependencies.length > 0 ? (
              result.riskyDependencies.map((dep, idx) => (
                <DependencyRow key={idx} dep={dep} />
              ))
            ) : (
              <div className="p-8 text-center bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3 opacity-50" />
                <h4 className="text-lg font-medium text-white">No major risks detected</h4>
                <p className="text-sm text-gray-400">Your dependencies look healthy.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recommendations & Alternatives */}
        <div className="space-y-8">

          {/* Recommendations */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Top Recommendations
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-900/50 text-cyan-400 flex items-center justify-center text-xs font-bold border border-cyan-800">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternatives */}
          {result.alternativeSuggestions.length > 0 && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-500" />
                Better Alternatives
              </h3>
              <div className="space-y-4">
                {result.alternativeSuggestions.map((alt, i) => (
                  <div key={i} className="p-3 bg-gray-900/50 rounded border border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-400 line-through text-xs">{alt.risky}</span>
                      <span className="text-gray-500 text-xs">→</span>
                      <span className="text-green-400 text-xs font-bold">{alt.alternative}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{alt.reason}</p>
                    <div className="flex gap-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        alt.migrationDifficulty === 'easy' ? 'bg-green-900/30 text-green-400 border-green-800' :
                        alt.migrationDifficulty === 'moderate' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800' :
                        'bg-red-900/30 text-red-400 border-red-800'
                      }`}>
                        {alt.migrationDifficulty} to migrate
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
