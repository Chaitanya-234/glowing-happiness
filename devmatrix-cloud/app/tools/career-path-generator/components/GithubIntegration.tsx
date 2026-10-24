import React, { useState } from 'react';
import { Github, Loader2, Check } from 'lucide-react';

interface GithubIntegrationProps {
  onAnalyze: (data: string) => void;
}

export function GithubIntegration({ onAnalyze }: GithubIntegrationProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError('');

    try {
      // Fetch public repos
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);

      if (!response.ok) {
        throw new Error('User not found or API limit reached');
      }

      const repos = await response.json();

      // Simple analysis of languages
      const languages: Record<string, number> = {};
      repos.forEach((repo: any) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      const topLanguages = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .map(([lang]) => lang)
        .join(', ');

      const summary = `GitHub User: ${username}. Top Languages: ${topLanguages}. Recent Projects: ${repos.slice(0, 3).map((r: any) => r.name).join(', ')}.`;

      onAnalyze(summary);
      setAnalyzed(true);
    } catch (err) {
      setError('Could not fetch GitHub data. Please try manual entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Github className="w-6 h-6 text-gray-900 dark:text-white" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GitHub Integration</h3>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Analyze your public repositories to automatically detect skills.
      </p>

      <form onSubmit={handleAnalyze} className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username"
          className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
          disabled={analyzed || loading}
        />
        <button
          type="submit"
          disabled={analyzed || loading || !username}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : analyzed ? <Check className="w-4 h-4" /> : 'Analyze'}
        </button>
      </form>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      {analyzed && <p className="mt-2 text-xs text-green-500">GitHub profile analyzed successfully!</p>}
    </div>
  );
}
