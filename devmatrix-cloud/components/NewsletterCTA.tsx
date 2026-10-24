// components/NewsletterCTA.tsx - Using Next.js API Route
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Icon from './Icon';

export default function NewsletterCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Subscription error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to subscribe. Please try again.');

      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  const busy = status === 'loading' || status === 'success';

  return (
    <section ref={ref} className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-14 h-14 mx-auto mb-4 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent">
              <Icon name="mark_email_read" className="text-[28px]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Stay in the <span className="text-accent">Loop</span>
            </h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              Get weekly developer tips, new tools, code examples, and exclusive content delivered to your inbox.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                  disabled={busy}
                  className="flex-1 px-5 py-3 rounded-full bg-surface/15 border border-border/25 text-foreground placeholder:text-muted outline-none focus:border-border/60 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-solid inline-flex items-center justify-center gap-2 px-8 py-3 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' && (
                    <>
                      <Icon name="progress_activity" className="text-[18px] motion-safe:animate-spin" />
                      Subscribing...
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <Icon name="check" className="text-[18px]" />
                      Subscribed!
                    </>
                  )}
                  {status === 'idle' && 'Subscribe'}
                  {status === 'error' && 'Try Again'}
                </button>
              </div>

              {status === 'success' && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-accent text-sm font-semibold"
                >
                  Welcome aboard! Check your email for confirmation.
                </motion.p>
              )}

              {status === 'error' && errorMessage && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-red-400 text-sm font-semibold"
                >
                  {errorMessage}
                </motion.p>
              )}

              <p className="mt-4 text-xs text-muted inline-flex items-center gap-1">
                <Icon name="lock" className="text-[14px]" />
                No spam. Unsubscribe anytime.
              </p>
            </form>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-surface/10 border border-border/10 px-4 py-2 text-sm text-muted"
            >
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="w-7 h-7 rounded-full bg-accent/80 border-2 border-background" />
                <span className="w-7 h-7 rounded-full bg-primary/80 border-2 border-background" />
                <span className="w-7 h-7 rounded-full bg-accent/40 border-2 border-background" />
              </div>
              <span>Join 1,500+ developers already subscribed</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}