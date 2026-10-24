'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Accessibility, ShieldCheck, Search } from 'lucide-react';

interface ScoreOverviewProps {
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-emerald-500 dark:text-emerald-400 border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10';
  if (score >= 75) return 'text-amber-500 dark:text-amber-400 border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-900/10'; // Note: Tailwind amber usually stands in for yellow/orange mix
  if (score >= 50) return 'text-orange-500 dark:text-orange-400 border-orange-500 dark:border-orange-400 bg-orange-50 dark:bg-orange-900/10';
  return 'text-red-500 dark:text-red-400 border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10';
};

const getScoreLabel = (score: number) => {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 50) return 'Needs Improvement';
  return 'Poor';
};

function ScoreCard({ title, score, icon: Icon, delay }: { title: string; score: number; icon: any; delay: number }) {
  const normalizedScore = Math.round(score * 100); // Lighthouse scores are 0-1
  const colorClass = getScoreColor(normalizedScore);

  // Circular progress calculation
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-700">
        <div
          className={`h-full transition-all duration-1000 ease-out ${colorClass.split(' ')[0].replace('text-', 'bg-')}`}
          style={{ width: `${normalizedScore}%` }}
        />
      </div>

      <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-xs">
        <Icon className="w-4 h-4" />
        {title}
      </div>

      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-100 dark:text-slate-700"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.2 }}
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className={colorClass.split(' ')[0]} // extract text color
          />
        </svg>
        <span className={`absolute text-3xl font-bold ${colorClass.split(' ')[0]}`}>
          {normalizedScore}
        </span>
      </div>

      <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
        {getScoreLabel(normalizedScore)}
      </div>
    </motion.div>
  );
}

export function ScoreOverview({ scores }: ScoreOverviewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl mx-auto my-8">
      <ScoreCard
        title="Performance"
        score={scores.performance}
        icon={Zap}
        delay={0}
      />
      <ScoreCard
        title="Accessibility"
        score={scores.accessibility}
        icon={Accessibility}
        delay={0.1}
      />
      <ScoreCard
        title="Best Practices"
        score={scores.bestPractices}
        icon={ShieldCheck}
        delay={0.2}
      />
      <ScoreCard
        title="SEO"
        score={scores.seo}
        icon={Search}
        delay={0.3}
      />
    </div>
  );
}
