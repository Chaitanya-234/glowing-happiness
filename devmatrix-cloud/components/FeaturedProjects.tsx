// components/FeaturedProjects.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import Icon from './Icon';

const projects = [
  { name: 'DevTools Pro', stars: 1250, description: 'Comprehensive developer tools suite', language: 'TypeScript', dot: 'bg-blue-400' },
  { name: 'API Monitor', stars: 890, description: 'Real-time API monitoring dashboard', language: 'JavaScript', dot: 'bg-yellow-400' },
  { name: 'Markdown Editor Pro', stars: 2100, description: 'Lightweight markdown editor', language: 'Vue', dot: 'bg-green-400' },
];

export default function FeaturedProjects() {
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
            Featured <span className="text-accent">Open Source</span> Projects
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-6">
            Discover amazing projects from the developer community
          </p>
          <Link
            href="/projects"
            className="btn-glass glass inline-flex items-center gap-1.5 px-5 py-2.5 text-sm"
          >
            Browse All Projects
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-3xl p-6"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
                <span className="flex items-center gap-1 text-sm font-semibold text-yellow-300">
                  <Icon name="star" className="text-[16px]" />
                  {project.stars.toLocaleString('en-US')}
                </span>
              </div>

              <p className="text-sm text-muted mb-5">{project.description}</p>

              <div className="flex items-center gap-2 text-xs text-muted">
                <span aria-hidden="true" className={`w-2.5 h-2.5 rounded-full ${project.dot}`} />
                {project.language}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-4">
            <span className="hidden sm:grid w-12 h-12 shrink-0 rounded-full bg-primary text-primary-foreground place-items-center">
              <Icon name="lightbulb" className="text-[24px]" />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Built Something Cool?</h3>
              <p className="text-muted">Share your project with thousands of developers</p>
            </div>
          </div>
          <Link href="/projects/submit" className="btn-solid shrink-0 inline-flex items-center gap-2 px-6 py-3">
            Submit Your Project
            <Icon name="send" className="text-[16px]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}