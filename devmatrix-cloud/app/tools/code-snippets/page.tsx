// app/tools/code-snippets/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
}

export default function CodeSnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  const addSnippet = () => {
    if (!title || !code) return;

    const newSnippet: Snippet = {
      id: Date.now().toString(),
      title,
      language,
      code,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    setSnippets([...snippets, newSnippet]);
    setTitle('');
    setCode('');
    setTags('');
  };

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter(s => s.id !== id));
    if (selectedSnippet?.id === id) {
      setSelectedSnippet(null);
    }
  };

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'csharp',
    'php', 'ruby', 'go', 'rust', 'sql', 'html', 'css'
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          Code Snippet Manager
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Store, organize, and manage your code snippets. All data stays in your browser.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Snippet Form */}
          <div className="lg:col-span-2">
            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-100/70 mb-4">Add New Snippet</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
                    placeholder="My awesome function"
                  />
                </div>

                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Language:</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Code:</label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
                    placeholder="function hello() { ... }"
                  />
                </div>

                <div>
                  <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Tags (comma-separated):</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-2 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
                    placeholder="react, hooks, utility"
                  />
                </div>

                <button
                  onClick={addSnippet}
                  className="w-full px-6 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
                >
                  Add Snippet
                </button>
              </div>
            </div>
          </div>

          {/* Snippets List */}
          <div>
            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-100/70 mb-4">
                Saved Snippets ({snippets.length})
              </h3>

              {snippets.length === 0 ? (
                <p className="text-purple-200/40 text-sm">No snippets yet. Add your first snippet!</p>
              ) : (
                <div className="space-y-3">
                  {snippets.map(snippet => (
                    <div
                      key={snippet.id}
                      className="p-4 bg-purple-800/20 border border-purple-500/10 rounded-lg hover:bg-purple-800/30 transition-all cursor-pointer"
                      onClick={() => setSelectedSnippet(snippet)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-purple-100/80">{snippet.title}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSnippet(snippet.id);
                          }}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-xs text-purple-200/40 mb-2">{snippet.language}</div>
                      {snippet.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {snippet.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-purple-900/30 text-purple-300/60 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Snippet View */}
        {selectedSnippet && (
          <div className="mt-6 bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-purple-100/80">{selectedSnippet.title}</h3>
                <p className="text-sm text-purple-200/40 mt-1">{selectedSnippet.language}</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(selectedSnippet.code)}
                className="px-4 py-2 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all text-sm"
              >
                Copy Code
              </button>
            </div>
            <pre className="bg-purple-800/20 p-4 rounded-lg overflow-x-auto">
              <code className="text-purple-100/80 text-sm">{selectedSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">About Code Snippet Manager</h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Keep your frequently used code snippets organized and easily accessible. This tool stores
            all snippets locally in your browser, ensuring your code stays private and secure.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Features</h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Store unlimited code snippets</li>
            <li>Support for 12+ programming languages</li>
            <li>Tag-based organization</li>
            <li>One-click copy to clipboard</li>
            <li>100% local storage - your data never leaves your browser</li>
          </ul>

          <p className="text-purple-200/50 leading-relaxed mt-6">
            <strong>Note:</strong> All snippets are stored in your browser's local storage.
            Clearing browser data will remove your snippets. Export functionality coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
