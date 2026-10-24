'use client';

import React, { useState } from 'react';
import { Upload, FileCode, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import { analyzeDependencies } from '../actions';
import { ScanResult } from '../types';
import ScanResults from './ScanResults';

export default function DependencyScannerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validExtensions = ['.json', '.lock', '.yaml', '.yml'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext)) || fileName === 'package-lock.json' || fileName === 'yarn.lock' || fileName === 'pnpm-lock.yaml';

    if (isValid) {
      setFile(file);
      setError(null);
      setResult(null);
    } else {
      setError('Please upload a valid dependency file (package.json, package-lock.json, yarn.lock, pnpm-lock.yaml)');
      setFile(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const data = await analyzeDependencies(text);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during the scan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetScan = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  if (result) {
    return <ScanResults result={result} onReset={resetScan} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-white">Silent Dependency Risk Scanner</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Upload your <code className="bg-gray-800 px-2 py-1 rounded text-sm text-cyan-400">package-lock.json</code>, <code className="bg-gray-800 px-2 py-1 rounded text-sm text-cyan-400">yarn.lock</code>, or <code className="bg-gray-800 px-2 py-1 rounded text-sm text-cyan-400">pnpm-lock.yaml</code> to detect hidden security vulnerabilities in your nested dependencies.
        </p>
      </div>

      <div
        className={`
          border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
          ${dragActive ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-700 hover:border-gray-500 bg-gray-800/50'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-gray-800 rounded-full">
            {file ? <FileCode className="w-10 h-10 text-cyan-400" /> : <Upload className="w-10 h-10 text-gray-400" />}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              {file ? file.name : 'Upload Your Dependency File'}
            </h3>
            <p className="text-gray-400 text-sm">
              {file ? `${(file.size / 1024).toFixed(2)} KB` : 'Drag and drop or click to browse'}
            </p>
          </div>

          {!file && (
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleChange}
              accept=".json,.lock,.yaml,.yml"
            />
          )}

          {!file && (
            <label
              htmlFor="file-upload"
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg cursor-pointer transition-colors"
            >
              Select File
            </label>
          )}

          {file && (
             <div className="flex gap-4 mt-4">
                <button
                  onClick={resetScan}
                  className="px-6 py-2 border border-gray-600 hover:border-gray-400 text-gray-300 rounded-lg transition-colors"
                >
                  Change File
                </button>
                <button
                  onClick={handleScan}
                  disabled={isLoading}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4" />
                      Start Scan
                    </>
                  )}
                </button>
             </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="mt-8 text-center space-y-3 animate-pulse">
          <p className="text-cyan-400 font-medium">Analyzing dependency tree structure...</p>
          <p className="text-gray-500 text-sm">This may take 30-60 seconds for large projects.</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <FileCode className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Deep Scan</h3>
          <p className="text-gray-400 text-sm">Analyzes dependencies up to 5 levels deep to find hidden risks that standard tools miss.</p>
        </div>

        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Risk Scoring</h3>
          <p className="text-gray-400 text-sm">Intelligent categorization of risks: Security, Maintenance, Supply Chain, and License compatibility.</p>
        </div>

        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Actionable Fixes</h3>
          <p className="text-gray-400 text-sm">Get specific recommendations and alternative packages to resolve identified vulnerabilities.</p>
        </div>
      </div>
    </div>
  );
}
