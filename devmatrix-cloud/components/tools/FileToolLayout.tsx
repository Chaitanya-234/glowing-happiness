'use client';

import Icon from '@/components/Icon';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface FileToolLayoutProps {
  toolId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  howToSteps: { title: string; description: string }[];
  features: { title: string; description: string; icon: React.ReactNode }[];
  faq: { question: string; answer: string }[];
}

export function FileToolLayout({
  toolId,
  title,
  description,
  icon,
  children,
  howToSteps,
  features,
  faq,
}: FileToolLayoutProps) {
  return (
    <div data-tool={toolId} className="min-h-screen text-foreground">
      {/* Hero + interactive tool area */}
      <div className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass inline-grid place-items-center p-5 rounded-3xl mb-6 text-5xl text-accent"
            >
              {icon}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass max-w-4xl mx-auto rounded-3xl p-6 md:p-12 min-h-[400px]"
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* How it works */}
      <section className="py-20 px-4 bg-foreground/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16 text-foreground">
            How to {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howToSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-3 -top-3 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="glass glass-hover p-8 rounded-3xl h-full">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16 text-foreground">
            Why Use Our {title} Tool?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="glass glass-hover p-6 rounded-3xl">
                <div className="w-12 h-12 mb-4 rounded-full bg-foreground/10 border border-border/25 grid place-items-center text-2xl text-accent">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-foreground/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16 text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <details key={index} className="group glass rounded-3xl open:bg-foreground/10 transition-colors">
                <summary className="flex justify-between items-center gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-lg font-medium text-foreground">
                  {item.question}
                  <Icon
                    name="expand_more"
                    className="shrink-0 text-[24px] text-accent transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-6 pb-6 text-muted leading-relaxed">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4">
        <div className="glass max-w-3xl mx-auto rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Ready to get started?</h2>
          <p className="text-muted mb-8">
            Try our other free PDF and Image tools to enhance your productivity.
          </p>
          <Link href="/tools" className="btn-solid group inline-flex items-center gap-2 px-8 py-4">
            Explore All Tools
            <Icon name="arrow_forward" className="text-[20px] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}