'use client';

import { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number; // 0-100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreGauge({ score, label = "AI Probability", size = 'lg' }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  // Size configuration
  const config = {
    sm: { radius: 40, stroke: 6, fontSize: 'text-lg', labelSize: 'text-[8px]' },
    md: { radius: 60, stroke: 8, fontSize: 'text-2xl', labelSize: 'text-[10px]' },
    lg: { radius: 90, stroke: 12, fontSize: 'text-5xl', labelSize: 'text-xs' }
  }[size];

  const radius = config.radius;
  const stroke = config.stroke;
  const normalizedRadius = radius - stroke * 1.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 20) return '#10B981'; // Green
    if (s < 40) return '#84CC16'; // Light Green
    if (s < 60) return '#F59E0B'; // Yellow
    if (s < 80) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const getVerdict = (s: number) => {
    if (s < 20) return "Likely Human";
    if (s < 40) return "Probably Human";
    if (s < 60) return "Uncertain / Mixed";
    if (s < 80) return "Probably AI";
    return "Likely AI";
  };

  const color = getColor(animatedScore);
  const verdict = getVerdict(animatedScore);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-100 dark:text-slate-800"
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 1.5s ease-in-out, stroke 0.5s ease"
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center inset-0 select-none">
          <span className={`${config.fontSize} font-bold transition-colors duration-500 tabular-nums`} style={{ color }}>
            {Math.round(animatedScore)}%
          </span>
          <span className={`${config.labelSize} text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mt-1`}>
            {label}
          </span>
        </div>
      </div>

      {size === 'lg' && (
        <div
            className="mt-6 px-6 py-2 rounded-full font-semibold text-lg animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ backgroundColor: `${color}20`, color: color }}
        >
            {verdict}
        </div>
      )}
    </div>
  );
}
