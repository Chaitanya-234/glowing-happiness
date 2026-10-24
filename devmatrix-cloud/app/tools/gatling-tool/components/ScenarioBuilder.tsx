'use client';

import React, { useEffect } from 'react';
import { Microscope, Activity, Flame, Zap, Timer, Target, Globe, Loader2 } from 'lucide-react';
import UserPatternConfig from './UserPatternConfig';
import AuthConfig from './AuthConfig';
import EndpointConfig from './EndpointConfig';
import ThrottleConfig from './ThrottleConfig';

interface ScenarioBuilderProps {
  input: any;
  setInput: (input: any) => void;
  onGenerate: (input: any) => void;
  isGenerating: boolean;
}

const TEST_TYPES = [
  { id: 'Smoke', icon: Microscope, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', desc: 'Verify system availability' },
  { id: 'Load', icon: Activity, color: 'text-violet-500', bg: 'bg-violet-100 dark:bg-violet-900/30', desc: 'Normal expected load' },
  { id: 'Stress', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', desc: 'Find breaking point' },
  { id: 'Spike', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30', desc: 'Sudden load surge' },
  { id: 'Endurance', icon: Timer, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', desc: 'Sustained load over time' },
  { id: 'Capacity', icon: Target, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/30', desc: 'Max throughput test' },
];

export default function ScenarioBuilder({ input, setInput, onGenerate, isGenerating }: ScenarioBuilderProps) {

  // Initialize default values
  useEffect(() => {
    if (!input.testType) {
      setInput({
        testType: 'Load',
        baseUrl: 'https://api.example.com',
        scenarios: [
           {
            id: '1',
            name: 'Main Flow',
            steps: [{ method: 'GET', url: '/', name: 'Home' }]
           }
        ],
        injection: {
          users: 100,
          rampUp: '1 minute',
          duration: '10 minutes'
        },
        auth: { type: 'none' },
        throttle: { enabled: false }
      });
    }
  }, []);

  const handleChange = (field: string, value: any) => {
    setInput((prev: any) => ({ ...prev, [field]: value }));
  };

  if (!input.testType) return null;

  return (
    <div className="space-y-8">
      {/* Test Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {TEST_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = input.testType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => handleChange('testType', type.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 ring-1 ring-violet-500'
                  : 'border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${type.bg} ${type.color} flex items-center justify-center mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{type.id}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{type.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Base URL */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Base URL
        </label>
        <div className="relative">
          <input
            type="text"
            value={input.baseUrl}
            onChange={(e) => handleChange('baseUrl', e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="https://api.yourdomain.com"
          />
          <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Scenarios */}
      <EndpointConfig
        scenarios={input.scenarios}
        onChange={(scenarios) => handleChange('scenarios', scenarios)}
      />

      {/* Configuration Section */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 space-y-6">
        <UserPatternConfig
            config={input.injection}
            onChange={(config) => handleChange('injection', config)}
            testType={input.testType}
        />

        <AuthConfig
            config={input.auth}
            onChange={(config) => handleChange('auth', config)}
        />

        <ThrottleConfig
            config={input.throttle}
            onChange={(config) => handleChange('throttle', config)}
        />
      </div>

      {/* Action Button */}
      <button
        onClick={() => onGenerate(input)}
        disabled={isGenerating}
        className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Script...
          </>
        ) : (
          <>
            Generate Gatling Script
          </>
        )}
      </button>
    </div>
  );
}
