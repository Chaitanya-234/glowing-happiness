// components/CommunitySection.tsx
'use client';
import { motion } from 'framer-motion';
import Icon from './Icon';

const stats = [
  { number: '15,000+', label: 'Developers' },
  { number: '250+', label: 'Open Source Projects' },
  { number: '1M+', label: 'Code Executions' },
];

export default function CommunitySection() {
  return (
    <section className="relative py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="chip mb-3">Developer Network</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Join the <span className="text-accent">Matrix</span>
        </h2>
      </motion.div>

      <div className="glass max-w-5xl mx-auto rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                className="text-4xl md:text-5xl font-bold text-foreground mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-lg text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://discord.gg/devmetrix"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid group inline-flex items-center gap-2 px-10 py-4 text-lg"
          >
            Join Discord Community
            <Icon name="arrow_forward" className="text-[20px] transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}