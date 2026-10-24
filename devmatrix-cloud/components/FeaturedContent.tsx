// components/FeaturedContent.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import Icon from './Icon';

const contentSections = [
  {
    title: 'Latest Guides',
    icon: 'menu_book',
    items: [
      { title: 'Can AI Replace Traditional KYC?', href: '/blog/can-ai-replace-traditional-kyc-payments' },
      { title: 'Why 2025 Is the Year of Autonomous AI Agents', href: '/blog/autonomous-ai-agents-2025-business-life' },
      { title: 'Complete Guide to JSON Validation', href: '/blog/complete-guide-json-validation' },
    ],
    viewAll: '/blog',
  },
  {
    title: 'Code Examples',
    icon: 'terminal',
    items: [
      { title: 'Spring AI Complete Guide', href: '/examples/spring-ai' },
      { title: 'Fetch API with Error Handling', href: '/examples/javascript#fetch' },
      { title: 'React Custom Hooks', href: '/examples/react#hooks' },
    ],
    viewAll: '/examples',
  },
  {
    title: 'Cheat Sheets',
    icon: 'fact_check',
    items: [
      { title: 'Git Commands Cheat Sheet', href: '/cheat-sheets/git-commands' },
      { title: 'Docker Commands Reference', href: '/cheat-sheets/docker-commands' },
      { title: 'JavaScript Array Methods', href: '/cheat-sheets/javascript-array-methods' },
    ],
    viewAll: '/cheat-sheets',
  },
  {
    title: 'Video Sessions',
    icon: 'play_circle',
    items: [{ title: 'How DNS Works', href: '/sessions/dns-working' }],
    viewAll: '/sessions',
  },
];

export default function FeaturedContent() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Learn &amp; <span className="text-accent">Master Development</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Tutorials, examples, and references to level up your skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass glass-hover rounded-3xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-11 h-11 shrink-0 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent">
                    <Icon name={section.icon} className="text-[22px]" />
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                </div>

                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group/link flex items-start gap-2 py-1.5 text-sm text-muted hover:text-foreground transition-colors"
                      >
                        <span aria-hidden="true" className="text-accent font-bold transition-transform group-hover/link:translate-x-1">→</span>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={section.viewAll}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-foreground transition-colors"
              >
                View all
                <Icon name="arrow_forward" className="text-[14px]" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass mt-8 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-4">
            <span className="hidden sm:grid w-12 h-12 shrink-0 rounded-full bg-surface/15 border border-border/25 place-items-center text-accent">
              <Icon name="compare_arrows" className="text-[24px]" />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Technology Comparisons</h3>
              <p className="text-muted">GraphQL vs REST, MongoDB vs PostgreSQL, and more</p>
            </div>
          </div>
          <Link href="/compare" className="btn-solid shrink-0 inline-flex items-center gap-2 px-6 py-3">
            View Comparisons
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}