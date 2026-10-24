// components/OpenSourceSection.tsx
'use client';
import { motion } from 'framer-motion';
import Icon from './Icon';

const projects = [
  { name: 'DevMetrix Core', stars: '2.3k', category: 'Web', description: 'Core utilities for developers', href: 'https://github.com/DevMetrix' },
  { name: 'API Testing Suite', stars: '1.8k', category: 'DevOps', description: 'Automated API testing framework', href: 'https://github.com/DevMetrix' },
  { name: 'Code Snippet Manager', stars: '3.1k', category: 'Productivity', description: 'Organize your code snippets', href: 'https://github.com/DevMetrix' },
];

export default function OpenSourceSection() {
  return (
    <section className="relative py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          <span className="text-accent">Open Source</span> Hub
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Discover curated projects from the community
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="glass glass-hover rounded-3xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="chip">{project.category}</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-yellow-300">
                <Icon name="star" className="text-[16px]" />
                {project.stars}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{project.name}</h3>
            <p className="text-muted mb-6">{project.description}</p>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto self-start inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-foreground transition-colors"
            >
              View on GitHub
              <Icon name="arrow_outward" className="text-[16px]" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}