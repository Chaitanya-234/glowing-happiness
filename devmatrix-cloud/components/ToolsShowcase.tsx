// components/ToolsShowcase.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';

const pdfTools = [
  { 
    name: 'Merge PDF', 
    tagline: 'Combine multiple files', 
    icon: 'merge', 
    link: '/tools/pdf-merge', 
    description: 'Drag and drop your PDFs to combine them into a single organized document in seconds.',
    badge: 'Popular'
  },
  { 
    name: 'Split PDF', 
    tagline: 'Extract pages easily', 
    icon: 'call_split', 
    link: '/tools/pdf-split', 
    description: 'Separate one page or a whole set into independent PDF files quickly and securely.',
    badge: null
  },
  { 
    name: 'PDF Page Sorter', 
    tagline: 'Reorder & rotate pages', 
    icon: 'view_module', 
    link: '/tools/pdf-page-sorter', 
    description: 'Visually drag, drop, rotate, and delete pages to build your perfect document.',
    badge: 'New'
  },
  { 
    name: 'AI PDF Crop', 
    tagline: 'Remove margins instantly', 
    icon: 'crop', 
    link: '/tools/pdf-crop', 
    description: 'Automatically detect content boundaries and remove white space from scanned documents.',
    badge: 'AI'
  },
  { 
    name: 'PDF to JPG', 
    tagline: 'Convert pages to images', 
    icon: 'image', 
    link: '/tools/pdf-to-jpg', 
    description: 'Extract high-quality JPG images from every page of your PDF document instantly.',
    badge: null
  },
  { 
    name: 'JPG to PDF', 
    tagline: 'Images to document', 
    icon: 'picture_as_pdf', 
    link: '/tools/jpg-to-pdf', 
    description: 'Convert your JPG, PNG, and WEBP images into a single, easily shareable PDF file.',
    badge: null
  },
  { 
    name: 'PDF Text Editor', 
    tagline: 'Edit text in-place', 
    icon: 'edit_document', 
    link: '/tools/pdf-text-editor', 
    description: 'Click any text in your PDF to edit it directly. Add new text or cover up old typos.',
    badge: 'New'
  },
  { 
    name: 'Watermark PDF', 
    tagline: 'Protect your documents', 
    icon: 'branding_watermark', 
    link: '/tools/pdf-watermark', 
    description: 'Add custom text or image watermarks to your PDF files to protect your copyright.',
    badge: null
  },
];

type Tool = (typeof pdfTools)[number];

export default function ToolsShowcase() {
  return (
    <section className="relative py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
          <Icon name="picture_as_pdf" className="text-[16px]" />
          100% Free & Secure
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Essential PDF Tools
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Fast, private, and powerful utilities to handle all your document needs.
          Files never leave your browser.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {pdfTools.map((tool, index) => (
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
        <Link href="/tools?category=PDF+Tools" className="btn-solid inline-flex items-center gap-2 px-8 py-4">
          View All PDF Tools
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
        className="glass glass-hover rounded-3xl p-6 h-full flex flex-col relative overflow-hidden"
      >
        {/* Optional Badge (New / Popular / AI) */}
        {tool.badge && (
          <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            tool.badge === 'New' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
            tool.badge === 'AI' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
            'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {tool.badge}
          </div>
        )}

        <div className="w-12 h-12 rounded-2xl bg-surface/15 border border-border/25 grid place-items-center text-accent mb-5 transition-transform group-hover:scale-110 group-hover:bg-accent/10">
          <Icon name={tool.icon} className="text-[26px]" />
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-1 pr-12">{tool.name}</h3>
        <p className="font-mono text-xs text-accent mb-3">{tool.tagline}</p>
        <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
          {tool.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border/10 pt-4">
          <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
            Open Tool
          </span>
          <div className="w-8 h-8 rounded-full bg-surface/10 grid place-items-center text-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon name="arrow_forward" className="text-[16px] transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}