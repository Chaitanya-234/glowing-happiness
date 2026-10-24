// components/ToolsShowcase.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';

const tools = [
  { name: 'JSON Formatter', tagline: 'Format & validate instantly', icon: 'data_object', link: '/tools/json-formatter', description: 'Beautify and validate JSON with syntax highlighting' },
  { name: 'API Tester', tagline: 'Test REST APIs live', icon: 'rocket_launch', link: '/tools/api-tester', description: 'Test GET, POST, PUT, DELETE requests with headers' },
  { name: 'JWT Decoder', tagline: 'Decode tokens instantly', icon: 'lock_open', link: '/tools/jwt-decoder', description: 'Decode and inspect JSON Web Tokens' },
  { name: 'Regex Playground', tagline: 'Build patterns visually', icon: 'troubleshoot', link: '/tools/regex-playground', description: 'Test regular expressions with live matching' },
  { name: 'Base64 Encoder', tagline: 'Encode & decode Base64', icon: 'vpn_key', link: '/tools/base64-encoder', description: 'Convert text to Base64 and back instantly' },
  { name: 'Markdown Converter', tagline: 'Convert Markdown to HTML', icon: 'edit_note', link: '/tools/markdown-converter', description: 'Transform Markdown into HTML with preview' },
  { name: 'Cron Generator', tagline: 'Generate cron expressions', icon: 'schedule', link: '/tools/cron-generator', description: 'Create cron schedules with visual interface' },
  { name: 'Code Snippets', tagline: 'Manage your snippets', icon: 'save', link: '/tools/code-snippets', description: 'Store and organize code snippets locally' },
];

type Tool = (typeof tools)[number];

export default function ToolsShowcase() {
  return (
    <section className="relative py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Developer Tools
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Free, powerful utilities to streamline your development workflow
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {tools.map((tool, index) => (
          <ToolCard key={tool.name} tool={tool} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <Link href="/tools" className="btn-solid inline-flex items-center gap-2 px-8 py-4">
          View All Tools
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </motion.div>
    </section>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <Link href={tool.link} className="group block h-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -8 }}
        className="glass glass-hover rounded-3xl p-6 h-full flex flex-col"
      >
        <div className="w-12 h-12 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent mb-4 transition-transform group-hover:scale-110">
          <Icon name={tool.icon} className="text-[24px]" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-1">{tool.name}</h3>
        <p className="font-mono text-xs text-accent mb-3">{tool.tagline}</p>
        <p className="text-sm text-muted leading-relaxed mb-5">{tool.description}</p>

        <span className="mt-auto self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/15 border border-border/20 text-sm font-semibold text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          Try Now
          <Icon name="arrow_forward" className="text-[14px] transition-transform group-hover:translate-x-1" />
        </span>
      </motion.div>
    </Link>
  );
}