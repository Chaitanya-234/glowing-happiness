'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BlogSubmission } from '@/lib/types/submission';
import { BLOG_THEMES } from '@/lib/themes/blog-themes';

export default function AdminDashboard() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<BlogSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<BlogSubmission | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (submissionId: string, action: 'approve' | 'reject', rejectionReason?: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, rejectionReason })
      });

      if (response.ok) {
        await fetchSubmissions();
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Error processing submission:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-200">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-purple-200 mb-6">
            Pending Submissions ({submissions.length})
          </h2>

          {submissions.length === 0 ? (
            <p className="text-purple-300/50 text-center py-12">No pending submissions</p>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-black/50 border border-purple-500/20 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-purple-200 mb-2">
                        {submission.title}
                      </h3>
                      <p className="text-purple-300/70 mb-3">{submission.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                          {submission.category}
                        </span>
                        {submission.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-800 text-purple-400 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-purple-400/60 text-sm">
                        By {submission.authorName} ({submission.authorEmail})
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-2xl">{BLOG_THEMES[submission.themeId]?.preview || '🌌'}</span>
                        <span className="text-sm text-purple-400/60">
                          Theme: {BLOG_THEMES[submission.themeId]?.name || 'Default'}
                        </span>
                      </div>
                      <p className="text-purple-400/40 text-xs mt-1">
                        Submitted: {new Date(submission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Eye size={18} />
                      Preview
                    </button>
                    <button
                      onClick={() => handleAction(submission.id, 'approve')}
                      disabled={isProcessing}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
                    >
                      <Check size={18} />
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt('Rejection reason (optional):');
                        handleAction(submission.id, 'reject', reason || undefined);
                      }}
                      disabled={isProcessing}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 disabled:opacity-50"
                    >
                      <X size={18} />
                      Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 border border-purple-500/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-3xl font-bold text-purple-200 mb-4">
                {selectedSubmission.title}
              </h2>
              <p className="text-purple-300/70 mb-6">{selectedSubmission.description}</p>
              <div className="prose prose-invert max-w-none mb-6">
                <pre className="whitespace-pre-wrap text-purple-100 bg-black/50 p-4 rounded-lg">
                  {selectedSubmission.content}
                </pre>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
