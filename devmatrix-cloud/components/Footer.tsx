// components/Footer.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import AdContainer from './AdContainer';
import Icon from './Icon';

const quickLinks = [
  { name: 'Tools', href: '/tools', icon: 'build' },
  { name: 'About Us', href: '/about', icon: 'info' },
  { name: 'Community', href: '/community', icon: 'forum' },
  { name: 'Blog', href: '/blog', icon: 'article' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Cookies Policy', href: '/cookies-policy' },
];

const socials = [
  { name: 'GitHub', icon: 'code', link: 'https://github.com' },
  { name: 'Twitter', icon: 'campaign', link: 'https://twitter.com' },
  { name: 'Discord', icon: 'forum', link: 'https://discord.com' },
  { name: 'LinkedIn', icon: 'share', link: 'https://linkedin.com' },
];

const linkCls = 'text-sm text-muted hover:text-foreground transition-colors';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="px-4 md:px-12 pt-12 pb-8">
      <div className="max-w-[1340px] mx-auto">
        {/* Footer ad slot */}
        <AdContainer
          slot="6465093078"
          format="horizontal"
          label="Advertisement"
          className="max-w-7xl mx-auto px-4 my-8"
        />

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 text-center mb-6"
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Start Building in the <span className="text-accent">DevMetrix</span>
          </h3>
          <p className="text-lg text-muted mb-6">Free Tools Await</p>
          <Link href="/tools" className="btn-solid group inline-flex items-center gap-2 px-10 py-4 text-lg">
            Get Started
            <Icon name="arrow_forward" className="text-[20px] transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Links, legal, newsletter */}
        <div className="glass rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                DevMetrix<span className="text-accent font-normal">.cloud</span>
              </h4>
              <p className="text-sm text-muted mb-4">
                The Swiss Army knife for developers. Free tools for modern development.
              </p>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="w-9 h-9 rounded-full bg-surface/15 border border-border/20 grid place-items-center text-muted hover:text-foreground hover:bg-surface/25 transition-colors"
                  >
                    <Icon name={s.icon} className="text-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-accent mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={`${linkCls} inline-flex items-center gap-2`}>
                      <Icon name={l.icon} className="text-[16px]" />
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-accent mb-4">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-accent mb-4">Newsletter</h4>
              <p className="text-xs text-muted mb-3">Get updates on new tools and features</p>
              <form onSubmit={subscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="w-full px-4 py-2 mb-2 rounded-full bg-surface/15 border border-border/20 text-sm text-foreground placeholder:text-muted outline-none focus:border-border/50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="btn-glass w-full px-4 py-2 text-sm disabled:opacity-60"
                >
                  {status === 'loading' ? 'Subscribing…' : status === 'success' ? 'Subscribed' : status === 'error' ? 'Try again' : 'Subscribe'}
                </button>
                {status === 'error' && <p role="alert" className="mt-2 text-xs text-red-400">Something went wrong. Please try again.</p>}
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-5 py-3 rounded-full bg-surface/10 border border-border/10 text-xs font-mono text-muted">
            <p>© {currentYear} Devmetrix.in. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}