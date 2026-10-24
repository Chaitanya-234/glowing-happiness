'use client';

import React from 'react';
import { ExtractedString } from '../actions';
import { Trash, Edit2, AlertCircle, CheckCircle } from 'lucide-react';

interface ExtractedStringsProps {
  strings: ExtractedString[];
  setStrings: (strings: ExtractedString[]) => void;
}

export default function ExtractedStrings({ strings, setStrings }: ExtractedStringsProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState<{ key: string; original: string }>({ key: '', original: '' });

  const startEdit = (s: ExtractedString) => {
    setEditingId(s.id);
    setEditValue({ key: s.key, original: s.original });
  };

  const saveEdit = () => {
    if (editingId) {
      setStrings(strings.map(s => s.id === editingId ? { ...s, key: editValue.key, original: editValue.original } : s));
      setEditingId(null);
    }
  };

  const deleteString = (id: string) => {
    setStrings(strings.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
          Extracted Strings ({strings.length})
        </h3>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
              <tr>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Original String</th>
                <th className="px-4 py-3 w-32">Context</th>
                <th className="px-4 py-3 w-24 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {strings.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">
                    {editingId === s.id ? (
                      <input
                        type="text"
                        value={editValue.key}
                        onChange={(e) => setEditValue({ ...editValue, key: e.target.value })}
                        className="w-full px-2 py-1 border rounded bg-white dark:bg-slate-900 dark:border-slate-700"
                      />
                    ) : (
                      s.key
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {editingId === s.id ? (
                      <input
                        type="text"
                        value={editValue.original}
                        onChange={(e) => setEditValue({ ...editValue, original: e.target.value })}
                        className="w-full px-2 py-1 border rounded bg-white dark:bg-slate-900 dark:border-slate-700"
                      />
                    ) : (
                      s.original
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-500 text-xs">
                    {s.category}
                    {s.needsPlural && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-[10px]">Plural</span>}
                  </td>
                  <td className="px-4 py-3 flex items-center justify-center gap-2">
                    {editingId === s.id ? (
                      <button onClick={saveEdit} className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => startEdit(s)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => deleteString(s.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded">
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {strings.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                        No strings found. Try analyzing the code first.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
