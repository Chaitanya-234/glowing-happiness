'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, Bug, Lightbulb, Handshake } from 'lucide-react';

export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Tool Support',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: 'Tool Support',
        message: '',
        consent: false
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6 text-gray-900 dark:text-white">
              Get in <span className="text-neonBlue dark:text-purple-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We&apos;re here to help with support, feedback, collaboration, and partnership opportunities.
              Whether you have a tool issue, feature request, content suggestion, or just a general question,
              we&apos;d love to hear from you.
            </p>
          </motion.div>

          {/* Email Support Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-purple-900/10 border border-gray-200 dark:border-purple-500/20 hover:border-neonBlue dark:hover:border-purple-500/50 transition-all group backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bug className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Technical Support</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[50px]">
                For tool-related issues, bug reports, and technical assistance with our platform.
              </p>
              <a href="mailto:support@devmetrix.cloud" className="text-lg font-mono text-neonBlue dark:text-blue-400 hover:underline">
                support@devmetrix.cloud
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-purple-900/10 border border-gray-200 dark:border-purple-500/20 hover:border-neonBlue dark:hover:border-purple-500/50 transition-all group backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Handshake className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">General Inquiries</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[50px]">
                For partnerships, business questions, content feedback, and general information.
              </p>
              <a href="mailto:contactus@devmetrix.cloud" className="text-lg font-mono text-neonBlue dark:text-purple-400 hover:underline">
                contactus@devmetrix.cloud
              </a>
            </motion.div>
          </div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto bg-white dark:bg-gray-900/50 p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-purple-500/20 shadow-xl dark:shadow-purple-900/10 backdrop-blur-xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Send us a Message</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Received!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Thanks for reaching out. A real human developer will review your message and respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-neonBlue dark:text-purple-400 hover:underline font-semibold"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-purple-500/30 focus:border-neonBlue dark:focus:border-purple-500 focus:ring-2 focus:ring-neonBlue/20 dark:focus:ring-purple-500/20 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="Jane Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-purple-500/30 focus:border-neonBlue dark:focus:border-purple-500 focus:ring-2 focus:ring-neonBlue/20 dark:focus:ring-purple-500/20 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Subject</label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-purple-500/30 focus:border-neonBlue dark:focus:border-purple-500 focus:ring-2 focus:ring-neonBlue/20 dark:focus:ring-purple-500/20 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                    >
                      <option>Tool Support</option>
                      <option>Bug Report</option>
                      <option>Feature Request</option>
                      <option>Content Feedback</option>
                      <option>Partnership/Business</option>
                      <option>Other</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-purple-500/30 focus:border-neonBlue dark:focus:border-purple-500 focus:ring-2 focus:ring-neonBlue/20 dark:focus:ring-purple-500/20 outline-none transition-all text-gray-900 dark:text-white resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <div className="flex items-center h-6">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={formState.consent}
                      onChange={handleCheckbox}
                      className="w-5 h-5 rounded border-gray-300 dark:border-purple-500/30 text-neonBlue dark:text-purple-600 focus:ring-neonBlue dark:focus:ring-purple-500 bg-gray-50 dark:bg-black/50"
                    />
                  </div>
                  <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    I agree to be contacted by the DevMetrix team regarding my inquiry.
                    We respect your privacy and will never share your email.
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-neonBlue/10 dark:bg-purple-600 text-neonBlue dark:text-white font-bold text-lg border border-neonBlue dark:border-purple-500 hover:bg-neonBlue hover:text-white dark:hover:bg-purple-500 transition-all shadow-lg shadow-neonBlue/20 dark:shadow-purple-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Response Time & Human Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm font-medium border border-yellow-200 dark:border-yellow-700/30">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
              Typical response time: 24-48 hours on business days
            </div>
            <p className="mt-4 text-gray-500 dark:text-gray-500 text-sm">
              All messages are handled by real developers who actively maintain and improve the platform.
            </p>
          </motion.div>

          {/* Community Feedback Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 dark:opacity-10 transform translate-x-10 -translate-y-10">
              <Lightbulb className="w-64 h-64" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-neonBlue dark:text-purple-400" />
                Have an idea?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We are constantly building new tools and tutorials. If you have an idea for a tool that would make your workflow easier,
                or a topic you&apos;d like us to cover, let us know! We build for the community.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/community">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 rounded-lg bg-white dark:bg-purple-600 text-gray-900 dark:text-white font-semibold shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-purple-500"
                  >
                    Join Community Discussion
                  </motion.button>
                </Link>
                <a href="https://github.com/DevMetrix" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 rounded-lg bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    Contribute on GitHub
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
