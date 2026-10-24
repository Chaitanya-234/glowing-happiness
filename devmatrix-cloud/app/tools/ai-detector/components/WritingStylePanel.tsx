'use client';

import { Feather, BookOpen, BarChart2, Smile, AlignLeft, Type } from 'lucide-react';

interface WritingStyle {
  tone: string;
  complexity: string;
  sentenceLengthAvg: number;
  sentenceLengthVariance: number;
  vocabularyLevel: string;
  readabilityScore: number;
  emotionalTone: string;
}

interface WritingStylePanelProps {
  style: WritingStyle;
}

export default function WritingStylePanel({ style }: WritingStylePanelProps) {
  const MetricCard = ({ icon: Icon, label, value, subtext }: { icon: any, label: string, value: string | number, subtext?: string }) => (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700 transition-colors group">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-violet-500 group-hover:scale-110 transition-transform shadow-sm">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
        {value}
      </div>
      {subtext && <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subtext}</div>}
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <Feather className="w-5 h-5 text-violet-500" />
        Writing Style Analysis
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard
          icon={Type}
          label="Tone"
          value={style.tone}
          subtext="Dominant voice detected"
        />
        <MetricCard
          icon={BookOpen}
          label="Complexity"
          value={style.complexity}
          subtext={`Readability Score: ${style.readabilityScore}`}
        />
        <MetricCard
          icon={AlignLeft}
          label="Avg Sentence Length"
          value={`${style.sentenceLengthAvg.toFixed(1)} words`}
          subtext={`Variance: ${style.sentenceLengthVariance.toFixed(1)}`}
        />
        <MetricCard
          icon={BarChart2}
          label="Vocabulary Level"
          value={style.vocabularyLevel}
          subtext="Lexical diversity"
        />
        <MetricCard
          icon={Smile}
          label="Emotional Tone"
          value={style.emotionalTone}
          subtext="Sentiment analysis"
        />
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
        <p>
          <strong className="text-slate-800 dark:text-slate-200">Analysis Insight:</strong> AI-generated content often exhibits high sentence length consistency (low variance) and "Neutral/Objective" emotional tones, whereas human writing typically shows higher variance and stronger emotional markers.
        </p>
      </div>
    </div>
  );
}
