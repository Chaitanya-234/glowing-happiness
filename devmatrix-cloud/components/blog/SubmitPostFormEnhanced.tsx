'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Eye, EyeOff, FileEdit } from 'lucide-react';
import SubmitThemeSelector from './SubmitThemeSelector';
import SubmitPostPreview from './SubmitPostPreview';
import { ThemeId } from '@/lib/themes/blog-themes';

export default function SubmitPostFormEnhanced() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    tags: '',
    authorName: '',
    authorEmail: '',
    themeId: 'default' as ThemeId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // Calculate reading time
  const readingTime = useMemo(() => {
    const wordCount = formData.content.split(/\s+/).filter(Boolean).length;
    return Math.ceil(wordCount / 200) || 1;
  }, [formData.content]);

  // Parse tags
  const parsedTags = useMemo(() => {
    return formData.tags.split(',').map(t => t.trim()).filter(Boolean);
  }, [formData.tags]);

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
          tags: parsedTags,
        }),
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
          authorEmail: '',
          themeId: 'default',
        });
        setShowPreview(false);
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
    <div className="max-w-7xl mx-auto">
      {/* Header with Preview Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-purple-200 mb-2">
            Submit Your Blog Post
          </h2>
          <p className="text-purple-300/60">
            Fill in the details and choose a theme for your post
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          {showPreview ? (
            <>
              <FileEdit size={18} />
              Edit Form
            </>
          ) : (
            <>
              <Eye size={18} />
              Preview Post
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          initial={false}
          animate={{
            opacity: showPreview ? 0.5 : 1,
            scale: showPreview ? 0.98 : 1,
          }}
          className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Theme Selector */}
            <SubmitThemeSelector
              selectedTheme={formData.themeId}
              onThemeChange={(themeId) =>
                setFormData({ ...formData, themeId })
              }
            />

            {/* Title */}
            <div>
              <label className="block text-purple-200 mb-2 font-semibold">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-400/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Enter an engaging title..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-purple-200 mb-2 font-semibold">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-400/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                placeholder="Brief description of your post..."
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-purple-200 mb-2 font-semibold">
                Content * (Markdown supported)
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={15}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-400/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono text-sm resize-none"
                placeholder="Write your post content here... You can use Markdown formatting."
              />
              <div className="mt-2 text-sm text-purple-400/60">
                {formData.content.split(/\s+/).filter(Boolean).length} words • {readingTime} min read
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-purple-200 mb-2 font-semibold">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="">Select category</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Guide">Guide</option>
                <option value="News">News</option>
                <option value="Opinion">Opinion</option>
                <option value="Tips">Tips</option>
                <option value="Case Study">Case Study</option>
                <option value="Review">Review</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-purple-200 mb-2 font-semibold">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-400/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="react, nextjs, typescript, ..."
              />
              {parsedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {parsedTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-purple-200 mb-2 font-semibold">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.authorName}
                onChange={(e) =>
                  setFormData({ ...formData, authorName: e.target.value })
                }
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-400/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Author Email */}
            <div>
              <label className="block text-purple-200 mb-2 font-semibold">
                Your Email *
              </label>
              <input
                type="email"
                required
                value={formData.authorEmail}
                onChange={(e) =>
                  setFormData({ ...formData, authorEmail: e.target.value })
                }
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-purple-100 placeholder:text-purple-400/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="john@example.com"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Post for Review
                </>
              )}
            </button>

            {/* Status Message */}
            <AnimatePresence>
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg ${
                    submitStatus === 'success'
                      ? 'bg-green-900/20 border border-green-500/30 text-green-300'
                      : 'bg-red-900/20 border border-red-500/30 text-red-300'
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            {showPreview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="border border-purple-500/20 rounded-2xl overflow-hidden"
              >
                <SubmitPostPreview
                  title={formData.title}
                  description={formData.description}
                  content={formData.content}
                  category={formData.category}
                  tags={parsedTags}
                  authorName={formData.authorName}
                  themeId={formData.themeId}
                  readingTime={readingTime}
                />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-900/30 border border-purple-500/20 rounded-2xl p-12 text-center"
              >
                <Eye size={64} className="text-purple-500/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-purple-200 mb-2">
                  Preview Your Post
                </h3>
                <p className="text-purple-400/60 mb-6">
                  Click the "Preview Post" button above to see how your post will look with the selected theme
                </p>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <Eye size={18} />
                  Show Preview
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
