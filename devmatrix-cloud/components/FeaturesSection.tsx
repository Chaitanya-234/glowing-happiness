// components/FeaturesSection.tsx
'use client';
import { motion } from 'framer-motion';
import Icon from './Icon';

const features = [
  { icon: 'bolt', title: 'Fast Tools', description: 'Lightning-fast utilities for daily tasks' },
  { icon: 'public', title: 'Open Source Hub', description: 'Curated projects and contributions' },
  { icon: 'forum', title: 'Collaborative Community', description: 'Connect with 15K+ developers' },
  { icon: 'settings_suggest', title: 'API Access', description: 'Premium APIs for automation' },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
       
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Why <span className="text-accent">DevMetrix</span>?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="glass glass-hover rounded-3xl p-6 text-center flex flex-col items-center"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mb-4 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent"
            >
              <Icon name={feature.icon} className="text-[32px]" />
            </motion.div>
            <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}