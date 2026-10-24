'use client';

import React from 'react';

interface ManualCropControlsProps {
  crop: { x: number; y: number; width: number; height: number } | null;
  onUpdate: (crop: { x: number; y: number; width: number; height: number }) => void;
  onReset: () => void;
  onApplyToAll?: () => void;
}

export default function ManualCropControls({ crop, onUpdate, onReset, onApplyToAll }: ManualCropControlsProps) {
  if (!crop) {
    return (
      <div className="p-4 bg-surface/10 border border-border/20 rounded-xl text-center text-sm text-muted">
        No crop selected. Drag on the preview to create a crop box.
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof crop) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      onUpdate({ ...crop, [field]: val });
    }
  };

  const inputClass = "w-full px-3 py-2 bg-surface/15 border border-border/20 rounded-lg text-sm text-foreground focus:ring-2 focus:ring-accent/50 focus:outline-none transition-colors";

  return (
    <div className="space-y-4 bg-surface/10 p-4 rounded-xl border border-border/20">
      <h3 className="font-semibold text-foreground">Manual Adjustments</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">X (pts)</label>
          <input
            type="number"
            value={Math.round(crop.x)}
            onChange={(e) => handleChange(e, 'x')}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Y (pts)</label>
          <input
            type="number"
            value={Math.round(crop.y)}
            onChange={(e) => handleChange(e, 'y')}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Width (pts)</label>
          <input
            type="number"
            value={Math.round(crop.width)}
            onChange={(e) => handleChange(e, 'width')}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Height (pts)</label>
          <input
            type="number"
            value={Math.round(crop.height)}
            onChange={(e) => handleChange(e, 'height')}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="flex-1 py-2 px-4 border border-rose-500/30 text-rose-400 bg-rose-500/10 rounded-lg hover:bg-rose-500/20 transition-colors text-sm font-medium"
        >
          Reset Crop
        </button>
        {onApplyToAll && (
          <button
            onClick={onApplyToAll}
            className="flex-1 py-2 px-4 border border-accent/30 text-accent bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
          >
            Apply to All
          </button>
        )}
      </div>
    </div>
  );
}