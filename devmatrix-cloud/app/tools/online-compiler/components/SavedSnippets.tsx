'use client';

import { useState, useEffect } from 'react';
import { Save, Trash2, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

interface Snippet {
  id: string;
  name: string;
  code: string;
  languageId: number;
  date: number;
}

interface SavedSnippetsProps {
  currentCode: string;
  currentLanguageId: number;
  onLoad: (code: string, languageId: number) => void;
}

export default function SavedSnippets({ currentCode, currentLanguageId, onLoad }: SavedSnippetsProps) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newSnippetName, setNewSnippetName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('devmatrix_compiler_snippets');
    if (saved) {
      try {
        setSnippets(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load snippets', e);
      }
    }
  }, []);

  const saveSnippetsToStorage = (updatedSnippets: Snippet[]) => {
    localStorage.setItem('devmatrix_compiler_snippets', JSON.stringify(updatedSnippets));
    setSnippets(updatedSnippets);
  };

  const handleSave = () => {
    if (!newSnippetName.trim()) {
      toast.error('Please enter a name for the snippet');
      return;
    }

    const newSnippet: Snippet = {
      id: Date.now().toString(),
      name: newSnippetName.trim(),
      code: currentCode,
      languageId: currentLanguageId,
      date: Date.now(),
    };

    const updated = [newSnippet, ...snippets];
    saveSnippetsToStorage(updated);
    setNewSnippetName('');
    toast.success('Snippet saved successfully');
  };

  const handleDelete = (id: string) => {
    const updated = snippets.filter(s => s.id !== id);
    saveSnippetsToStorage(updated);
    toast.success('Snippet deleted');
  };

  const handleLoad = (snippet: Snippet) => {
    onLoad(snippet.code, snippet.languageId);
    setIsOpen(false);
    toast.success('Snippet loaded');
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          Saved Snippets
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50 p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">Save Current Code</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSnippetName}
                onChange={(e) => setNewSnippetName(e.target.value)}
                placeholder="Snippet Name"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-transparent text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-700 bg-green-50 dark:bg-green-900/20 rounded"
              >
                <Save className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">Your Snippets</h3>
            {snippets.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No saved snippets yet.</p>
            ) : (
              <ul className="space-y-2">
                {snippets.map((snippet) => (
                  <li key={snippet.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <button
                      onClick={() => handleLoad(snippet)}
                      className="flex-1 text-left text-sm text-gray-700 dark:text-gray-200 truncate"
                    >
                      {snippet.name}
                      <span className="block text-xs text-gray-500">{new Date(snippet.date).toLocaleDateString()}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(snippet.id)}
                      className="p-1 text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
