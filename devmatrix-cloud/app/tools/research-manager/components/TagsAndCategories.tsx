'use client';

import { Tag, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface TagsAndCategoriesProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export default function TagsAndCategories({ tags, onAddTag, onRemoveTag }: TagsAndCategoriesProps) {
  const [newTag, setNewTag] = useState('');

  const handleAdd = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 px-2 py-1 rounded text-xs font-medium border border-violet-100 dark:border-violet-800/30">
            <Tag className="w-3 h-3" />
            {tag}
            <button onClick={() => onRemoveTag(tag)} className="ml-1 hover:text-red-500 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && (
            <p className="text-xs text-slate-400 italic">No tags added yet.</p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add tag..."
          className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500 outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
            onClick={handleAdd}
            disabled={!newTag.trim()}
            className="p-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
