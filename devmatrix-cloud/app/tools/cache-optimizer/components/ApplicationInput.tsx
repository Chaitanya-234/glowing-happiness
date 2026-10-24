import React from 'react';
import { motion } from 'framer-motion';

type ApplicationInputProps = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
};

export default function ApplicationInput({ data, onChange, onNext }: ApplicationInputProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    onChange({
      ...data,
      [parent]: {
        ...data[parent],
        [field]: value,
      },
    });
  };

  const handleArrayChange = (parent: string, field: string, value: string) => {
    const array = value.split(',').map((s) => s.trim());
    handleNestedChange(parent, field, array);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Application Name</label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            placeholder="My E-commerce API"
          />
        </div>

        <div>
          <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Application Type</label>
          <select
            value={data.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="Web Application">Web Application</option>
            <option value="API Backend">API Backend</option>
            <option value="Mobile App Backend">Mobile App Backend</option>
            <option value="SaaS Platform">SaaS Platform</option>
            <option value="E-commerce Site">E-commerce Site</option>
            <option value="CMS">Content Management System</option>
            <option value="Real-time">Real-time Application</option>
          </select>
        </div>

        <div>
          <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Daily Requests</label>
          <input
            type="number"
            value={data.dailyRequests || 0}
            onChange={(e) => handleChange('dailyRequests', parseInt(e.target.value) || 0)}
            className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Concurrent Users</label>
          <input
            type="number"
            value={data.concurrentUsers || 0}
            onChange={(e) => handleChange('concurrentUsers', parseInt(e.target.value) || 0)}
            className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Database Size</label>
          <input
            type="text"
            value={data.databaseSize || ''}
            onChange={(e) => handleChange('databaseSize', e.target.value)}
            className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            placeholder="e.g. 50GB"
          />
        </div>

        <div>
          <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Growth Rate</label>
          <select
            value={data.growthRate || ''}
            onChange={(e) => handleChange('growthRate', e.target.value)}
            className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
          >
             <option value="">Select Growth</option>
             <option value="Stable">Stable</option>
             <option value="Growing">Growing (10% YoY)</option>
             <option value="Rapidly Growing">Rapidly Growing (50%+ YoY)</option>
          </select>
        </div>
      </div>

      <div className="border-t border-purple-500/20 pt-6">
        <h3 className="text-lg font-semibold text-purple-100 mb-4">Tech Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Frontend Frameworks</label>
            <input
              type="text"
              value={data.techStack?.frontend?.join(', ') || ''}
              onChange={(e) => handleArrayChange('techStack', 'frontend', e.target.value)}
              className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
              placeholder="React, Next.js (comma separated)"
            />
          </div>
          <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Backend Technologies</label>
            <input
              type="text"
              value={data.techStack?.backend?.join(', ') || ''}
              onChange={(e) => handleArrayChange('techStack', 'backend', e.target.value)}
              className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
              placeholder="Node.js, Python (comma separated)"
            />
          </div>
          <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Databases</label>
            <input
              type="text"
              value={data.techStack?.database?.join(', ') || ''}
              onChange={(e) => handleArrayChange('techStack', 'database', e.target.value)}
              className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
              placeholder="PostgreSQL, MongoDB (comma separated)"
            />
          </div>
          <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Current Caching</label>
            <input
              type="text"
              value={data.techStack?.caching?.join(', ') || ''}
              onChange={(e) => handleArrayChange('techStack', 'caching', e.target.value)}
              className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
              placeholder="None, Redis (comma separated)"
            />
          </div>
        </div>
      </div>

       <div className="border-t border-purple-500/20 pt-6">
        <h3 className="text-lg font-semibold text-purple-100 mb-4">Performance Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Target Latency</label>
            <select
                value={data.performanceRequirements?.targetLatency || ''}
                onChange={(e) => handleNestedChange('performanceRequirements', 'targetLatency', e.target.value)}
                className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            >
                <option value="">Select Target</option>
                <option value="<50ms">{'<'}50ms (Ultra Low)</option>
                <option value="<100ms">{'<'}100ms (Low)</option>
                <option value="<500ms">{'<'}500ms (Standard)</option>
                <option value="<1s">{'<'}1s (Relaxed)</option>
            </select>
          </div>
           <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Data Freshness</label>
            <select
                value={data.performanceRequirements?.dataFreshness || ''}
                onChange={(e) => handleNestedChange('performanceRequirements', 'dataFreshness', e.target.value)}
                className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            >
                <option value="">Select Tolerance</option>
                <option value="Real-time">Real-time (0s)</option>
                <option value="<1min">{'<'}1 minute</option>
                <option value="<1hr">{'<'}1 hour</option>
                <option value="Daily">Daily</option>
            </select>
          </div>
           <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Consistency Preference</label>
            <select
                value={data.performanceRequirements?.consistency || ''}
                onChange={(e) => handleNestedChange('performanceRequirements', 'consistency', e.target.value)}
                className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            >
                <option value="">Select Preference</option>
                <option value="Strong">Strong Consistency</option>
                <option value="Eventual">Eventual Consistency</option>
            </select>
          </div>
           <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Budget</label>
            <select
                value={data.performanceRequirements?.budget || ''}
                onChange={(e) => handleNestedChange('performanceRequirements', 'budget', e.target.value)}
                className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            >
                <option value="">Select Budget</option>
                <option value="Minimal">Minimal (Open Source)</option>
                <option value="Moderate">Moderate</option>
                <option value="High">No Limit (Enterprise)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all font-semibold shadow-lg shadow-purple-900/20"
        >
          Next: Access Patterns
        </button>
      </div>
    </div>
  );
}
