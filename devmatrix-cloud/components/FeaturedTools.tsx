// components/FeaturedTools.tsx
'use client';
import { motion } from 'framer-motion'; // ✅ Fixed typo
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function FeaturedTools() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tools = [
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON instantly',
      icon: '{ }',
      color: 'from-blue-500 to-cyan-500',
      href: '/tools/json-formatter',
    },
    {
      name: 'API Tester',
      description: 'Test REST APIs with ease',
      icon: '🔌',
      color: 'from-green-500 to-emerald-500',
      href: '/tools/api-tester',
    },
    {
      name: 'JWT Decoder',
      description: 'Decode and verify JWT tokens',
      icon: '🔐',
      color: 'from-purple-500 to-pink-500',
      href: '/tools/jwt-decoder',
    },
    {
      name: 'Regex Playground',
      description: 'Test regular expressions live',
      icon: '🔍',
      color: 'from-orange-500 to-red-500',
      href: '/tools/regex-playground',
    },
    {
      name: 'Base64 Encoder',
      description: 'Encode/decode Base64 strings',
      icon: '🔄',
      color: 'from-yellow-500 to-orange-500',
      href: '/tools/base64-encoder',
    },
    {
      name: 'Code Snippets',
      description: 'Save and organize code snippets',
      icon: '📝',
      color: 'from-indigo-500 to-blue-500',
      href: '/tools/code-snippets',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🛠️ Popular <span className="text-neonBlue">Free Tools</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            No sign-up required. Use instantly in your browser.
          </p>
          <Link
            href="/tools"
            className="inline-block text-neonGreen hover:text-neonBlue transition-colors font-semibold"
          >
            View All Tools →
          </Link>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={tool.href} className="group block h-full">
                <div className="h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-neonBlue/50 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neonBlue transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {tool.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 text-neonGreen group-hover:translate-x-2 transition-transform inline-block">
                    →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
