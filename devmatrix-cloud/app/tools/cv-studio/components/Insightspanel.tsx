'use client';

import Icon from '@/components/Icon';
import { keywordMatch, resumeText, type Issue } from '@/lib/resume/analyze';
import type { Resume } from '@/lib/resume/types';
import { useMemo, useState } from 'react';

function ScoreRing({ score }: { score: number }) {
  const r = 42, c = 2 * Math.PI * r;
  const tone = score >= 80 ? 'text-emerald-500' : score >= 55 ? 'text-amber-500' : 'text-rose-500';
  return (
    <div className="relative h-28 w-28 mx-auto">
      <svg viewBox="0 0 100 100" className="-rotate-90 h-full w-full">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" className="stroke-border/20" />
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} className={`stroke-current ${tone} transition-all duration-500`} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center"><div className="text-3xl font-extrabold text-foreground leading-none">{score}</div><div className="text-[11px] text-muted mt-1">of 100</div></div>
      </div>
    </div>
  );
}

export default function InsightsPanel({ issues, score, pages, resume }: { issues: Issue[]; score: number; pages: number; resume: Resume }) {
  const [tab, setTab] = useState<'ats' | 'match'>('ats');
  const [jd, setJd] = useState('');
  const match = useMemo(() => (jd.trim().length > 20 ? keywordMatch(jd, resumeText(resume)) : null), [jd, resume]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-1 p-1 bg-surface/10 rounded-xl border border-border/10">
        {([['ats', 'Checks'], ['match', 'Job match']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`py-1.5 text-sm font-semibold rounded-lg transition-colors ${tab === id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted hover:text-foreground'}`}>{label}</button>
        ))}
      </div>

      {tab === 'ats' && (
        <div className="space-y-4">
          <div className="glass border border-border/20 rounded-2xl p-5">
            <ScoreRing score={score} />
            <p className="text-center text-xs text-muted mt-3">{pages} {pages === 1 ? 'page' : 'pages'} · {issues.filter((i) => i.level === 'warn').length} warnings · {issues.filter((i) => i.level === 'tip').length} tips</p>
          </div>

          <div className="space-y-2.5">
            {issues.map((i) => (
              <div key={i.id} className={`p-3 rounded-xl text-sm flex gap-3 border ${i.level === 'warn' ? 'bg-rose-500/10 border-rose-500/25 text-rose-700 dark:text-rose-300' : 'bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-300'}`}>
                <Icon name={i.level === 'warn' ? 'error' : 'lightbulb'} className="shrink-0 mt-0.5 text-[18px]" />
                <span className="leading-snug">{i.text}</span>
              </div>
            ))}
            {issues.length === 0 && (
              <div className="text-center p-6 border border-emerald-500/25 bg-emerald-500/10 rounded-xl text-emerald-700 dark:text-emerald-300">
                <Icon name="check_circle" className="text-[32px] mb-2 mx-auto" />
                <p className="text-sm font-medium">No issues found.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'match' && (
        <div className="space-y-4">
          <textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the job description. Matching updates as you edit your resume."
            className="w-full h-40 bg-surface/15 border border-border/20 rounded-xl p-3 text-sm text-foreground placeholder:text-muted/70 outline-none resize-y focus:border-accent" />
          {match ? (
            <>
              <div className="glass border border-border/20 rounded-xl p-4 text-center">
                <div className="text-4xl font-bold text-accent">{match.pct}%</div>
                <div className="text-xs text-muted mt-1">{match.matched.length} of {match.total} top keywords found</div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-2">Missing from your resume</h4>
                <div className="flex flex-wrap gap-1.5">
                  {match.missing.map((k) => <span key={k} className="px-2 py-1 bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs rounded-md">{k}</span>)}
                  {match.missing.length === 0 && <span className="text-sm text-emerald-600 dark:text-emerald-300">Nothing missing.</span>}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-2">Already covered</h4>
                <div className="flex flex-wrap gap-1.5">
                  {match.matched.map((k) => <span key={k} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs rounded-md">{k}</span>)}
                </div>
              </div>
              <p className="text-xs text-muted">Only add a keyword if it is true. Work it into a bullet or your skills list instead of pasting a list.</p>
            </>
          ) : (
            <p className="text-xs text-muted">Paste a few lines of a job posting to see which of its most-used terms your resume already contains.</p>
          )}
        </div>
      )}
    </div>
  );
}