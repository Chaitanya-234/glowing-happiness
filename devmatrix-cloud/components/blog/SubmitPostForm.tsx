'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

export default function SubmitPostForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    tags: '',
    authorName: '',
    authorEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/blog/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setMessage('Your post has been submitted and is pending approval!');
        setFormData({
          title: '',
          description: '',
          content: '',
          category: '',
          tags: '',
          authorName: '',
          authorEmail: ''
        });
      } else {
        setSubmitStatus('error');
        setMessage(data.error || 'Failed to submit post');
      }
    } catch (error) {
      setSubmitStatus('error');
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-purple-200 mb-6">Submit Your Blog Post</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-purple-200 mb-2">Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 focus:border-purple-500 focus:outline-none"
            placeholder="Enter post title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-purple-200 mb-2">Description *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 focus:border-purple-500 focus:outline-none"
            placeholder="Brief description of your post"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-purple-200 mb-2">Content * (Markdown supported)</label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 focus:border-purple-500 focus:outline-none font-mono text-sm"
            placeholder="Write your post content here..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-purple-200 mb-2">Category *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 focus:border-purple-500 focus:outline-none"
          >
            <option value="">Select category</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Guide">Guide</option>
            <option value="News">News</option>
            <option value="Opinion">Opinion</option>
            <option value="Tips">Tips</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-purple-200 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 focus:border-purple-500 focus:outline-none"
            placeholder="react, nextjs, typescript"
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-purple-200 mb-2">Your Name *</label>
          <input
            type="text"
            required
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 focus:border-purple-500 focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        {/* Author Email */}
        <div>
          <label className="block text-purple-200 mb-2">Your Email *</label>
          <input
            type="email"
            required
            value={formData.authorEmail}
            onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 focus:border-purple-500 focus:outline-none"
            placeholder="john@example.com"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={20} /> Submitting...</>
          ) : (
            <><Send size={20} /> Submit Post</>
          )}
        </button>

        {/* Status Message */}
        {submitStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg ${
              submitStatus === 'success'
                ? 'bg-green-900/20 border border-green-500/30 text-green-300'
                : 'bg-red-900/20 border border-red-500/30 text-red-300'
            }`}
          >
            {message}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
