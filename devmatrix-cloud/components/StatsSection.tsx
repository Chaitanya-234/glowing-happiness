// components/StatsSection.tsx
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Icon from './Icon';

const stats = [
  { number: '30+', label: 'Expert Guides', icon: 'menu_book' },
  { number: '110+', label: 'Free Tools', icon: 'build' },
  { number: '50+', label: 'Code Examples', icon: 'terminal' },
  { number: '120+', label: 'Blogs', icon: 'article' },
  { number: '50+', label: 'Cheat Sheets', icon: 'fact_check' },
];

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Everything Developers Need
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            From tools to tutorials, we&apos;ve got you covered
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass glass-hover rounded-3xl p-6 text-center ${
                index === stats.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent">
                <Icon name={stat.icon} className="text-[28px]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.number}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}