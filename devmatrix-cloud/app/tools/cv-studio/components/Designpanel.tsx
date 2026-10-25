'use client';

import Icon from '@/components/Icon';
import { TEMPLATES, TEMPLATE_LIST } from '@/lib/resume/templates';
import type { Design, TemplateId } from '@/lib/resume/types';

const SWATCHES = ['#1f2937', '#2563eb', '#4f46e5', '#7c2d12', '#059669', '#0f766e', '#be123c', '#c2410c'];

function Slider({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="text-muted tabular-nums">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="w-full accent-accent" />
    </label>
  );
}

export default function DesignPanel({ design, onChange }: { design: Design; onChange: (d: Design) => void }) {
  const T = TEMPLATES[design.template];
  const pickTemplate = (id: TemplateId) => onChange({ ...design, template: id, ...TEMPLATES[id].defaults });

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Icon name="dashboard" className="text-accent text-[18px]" /> Template
        </h3>
        <div className="space-y-2">
          {TEMPLATE_LIST.map((t) => {
            const active = t.id === design.template;
            return (
              <button key={t.id} onClick={() => pickTemplate(t.id)} aria-pressed={active}
                className={`w-full text-left rounded-xl border p-3 transition-colors ${active ? 'border-accent bg-accent/10' : 'border-border/20 bg-surface/10 hover:bg-surface/20'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-foreground">{t.label}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border ${t.columns === 2 ? 'border-amber-500/40 text-amber-600 dark:text-amber-300' : 'border-border/30 text-muted'}`}>{t.tag}</span>
                </div>
                <p className="text-xs text-muted mt-1 leading-snug">{t.blurb}</p>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted mt-2">Switching templates keeps all your content. It only resets size, margin and colour to that template’s defaults.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Icon name="tune" className="text-accent text-[18px]" /> Layout
        </h3>
        <Slider label="Font size" value={design.baseSize} min={8} max={12.5} step={0.25} unit=" pt" onChange={(v) => onChange({ ...design, baseSize: v })} />
        <Slider label="Margin" value={design.margin} min={24} max={72} step={2} unit=" pt" onChange={(v) => onChange({ ...design, margin: v })} />
        <Slider label="Line spacing" value={design.lineHeight} min={1} max={1.6} step={0.05} unit="×" onChange={(v) => onChange({ ...design, lineHeight: Math.round(v * 100) / 100 })} />

        <div>
          <div className="text-xs font-semibold text-foreground mb-1.5">Paper</div>
          <div className="grid grid-cols-2 gap-1 p-1 bg-surface/10 rounded-xl border border-border/10">
            {(['a4', 'letter'] as const).map((p) => (
              <button key={p} onClick={() => onChange({ ...design, paper: p })}
                className={`py-1.5 text-sm font-semibold rounded-lg transition-colors ${design.paper === p ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted hover:text-foreground'}`}>
                {p === 'a4' ? 'A4' : 'US Letter'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Icon name="palette" className="text-accent text-[18px]" /> Accent colour
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {SWATCHES.map((c) => (
            <button key={c} aria-label={`Accent ${c}`} onClick={() => onChange({ ...design, accent: c })}
              className={`h-8 w-8 rounded-full border-2 transition-transform ${design.accent.toLowerCase() === c ? 'border-foreground scale-110' : 'border-transparent'}`} style={{ background: c }} />
          ))}
          <label className="h-8 w-8 rounded-full border border-border/30 grid place-items-center cursor-pointer overflow-hidden relative" title="Custom colour">
            <Icon name="colorize" className="text-[16px] text-muted" />
            <input type="color" value={design.accent} onChange={(e) => onChange({ ...design, accent: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer" />
          </label>
        </div>
        {!T.accentHeadings && !T.accentName && (
          <p className="text-xs text-muted">This template uses the accent only for links.</p>
        )}
      </section>

      <button className="text-xs font-semibold text-accent hover:underline" onClick={() => onChange({ ...design, ...T.defaults })}>
        Reset to {T.label} defaults
      </button>
    </div>
  );
}