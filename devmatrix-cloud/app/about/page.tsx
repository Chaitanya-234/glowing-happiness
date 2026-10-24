// app/about/page.tsx
'use client';

import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

const features = [
  { icon: 'build', title: 'Developer Tools', description: 'Lightning-fast utilities for JSON, APIs, regex, webhooks, and more', delay: 0.1 },
  { icon: 'lightbulb', title: 'Open Source Hub', description: 'Curated projects and contributions from the global community', delay: 0.2 },
  { icon: 'forum', title: 'Community', description: 'Connect with 15,000+ developers worldwide and growing', delay: 0.3 },
];

const values = [
  { icon: 'bolt', title: 'Lightning Fast', description: 'Built with performance in mind. Zero loading screens.' },
  { icon: 'lock', title: 'Privacy First', description: 'Your data never leaves your browser for client-side tools.' },
  { icon: 'redeem', title: 'Free Forever', description: 'Core tools will always be free. No hidden fees, ever.' },
  { icon: 'ads_click', title: 'Developer-Centric', description: 'Built by developers, for developers. Always.' },
];

const techStack = ['Next.js', 'Spring Boot', 'AWS', 'Judge0', 'Tailwind', 'PostgreSQL', 'Kafka', 'Docker'];

const sectionTitle =
  'text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero */}
      <motion.section
        className="min-h-screen flex items-center justify-center px-6 pt-24"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="chip glass mb-6">About DevMetrix</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight leading-tight bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            DevMetrix.cloud
          </motion.h1>

          <motion.p
            className="text-xl md:text-3xl text-muted font-light mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Swiss Army Knife for Developers
          </motion.p>

          <motion.div
            className="glass inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full px-6 py-3 text-sm text-muted"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-accent motion-safe:animate-pulse" />
              15,000+ Developers
            </span>
            <span aria-hidden="true">•</span>
            <span>100% Free</span>
            <span aria-hidden="true">•</span>
            <span>Open Source</span>
          </motion.div>

          <motion.div
            className="mt-16 text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 0.9 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <Icon name="keyboard_arrow_down" className="text-[32px]" />
          </motion.div>
        </div>
      </motion.section>

      {/* Mission */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`${sectionTitle} mb-10`}>Our Mission</h2>
            <div className="glass rounded-3xl p-6 md:p-10 space-y-6 text-lg md:text-2xl text-muted leading-relaxed font-light">
              <p className="border-l-4 border-accent pl-6 py-1">
                DevMetrix.cloud was built with a simple idea: developers need{' '}
                <span className="text-foreground font-medium">fast, reliable tools</span> without the bloat.
              </p>
              <p className="border-l-4 border-accent/60 pl-6 py-1">
                No more signing up for basic utilities, no more waiting for slow interfaces, and no more ads interrupting your workflow.
              </p>
              <p className="border-l-4 border-accent/30 pl-6 py-1">
                We&apos;re building an ecosystem where developers can find everything they need, from micro-tools like JSON formatters to powerful code execution environments,{' '}
                <span className="text-foreground font-medium">all in one place</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`${sectionTitle} mb-14 text-center`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            What We Offer
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: f.delay, duration: 0.6 }}
                className="glass glass-hover rounded-3xl p-8"
              >
                <motion.span
                  className="w-16 h-16 mb-6 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Icon name={f.icon} className="text-[32px]" />
                </motion.span>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{f.title}</h3>
                <p className="text-muted leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`${sectionTitle} mb-14 text-center`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose DevMetrix?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, index) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass glass-hover rounded-3xl p-6 md:p-8 flex items-start gap-4"
              >
                <motion.span
                  className="w-12 h-12 shrink-0 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon name={v.icon} className="text-[24px]" />
                </motion.span>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-foreground">{v.title}</h3>
                  <p className="text-muted">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`${sectionTitle} mb-14 text-center`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Powered By
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((name, index) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="glass rounded-full px-6 py-3 text-sm font-semibold tracking-wide text-foreground"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <motion.div
          className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Join the Matrix
          </h2>
          <p className="text-xl text-muted mb-10 font-light">Start using our tools or contribute to the community</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tools" className="btn-solid group inline-flex items-center gap-2 px-10 py-4 text-lg">
              Explore Tools
              <Icon name="arrow_forward" className="text-[20px] transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/community" className="btn-glass group inline-flex items-center gap-2 px-10 py-4 text-lg">
              Join Community
              <Icon name="arrow_forward" className="text-[20px] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}