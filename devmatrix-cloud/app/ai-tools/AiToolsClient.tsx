'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  link: string;
  features: string[];
  popular?: boolean;
}

export default function AiToolsClient({ tools }: { tools: Tool[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link href={tool.link}>
              <div className="h-full p-6 bg-purple-900/10 border border-purple-500/20 rounded-xl hover:bg-purple-800/20 hover:border-green-400/40 transition-all cursor-pointer group flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl p-3 bg-purple-500/10 rounded-lg group-hover:bg-green-500/10 transition-colors">
                    {tool.icon}
                  </div>
                  {tool.popular && (
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full border border-green-500/30">
                      POPULAR
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-purple-100/90 mb-2 group-hover:text-green-300 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-sm text-purple-200/50 mb-6 flex-grow leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="text-xs text-purple-300/40 bg-purple-900/40 border border-purple-500/10 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm font-bold text-green-400/70 group-hover:text-green-400 transition-colors">
                  Launch Tool <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
