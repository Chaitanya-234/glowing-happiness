"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from 'framer-motion';

const sections = [
  {
    category: "Character Classes",
    items: [
      { command: "\\d", description: "Any digit (0-9)" },
      { command: "\\w", description: "Any word character (a-z, A-Z, 0-9, _)" },
      { command: "\\s", description: "Any whitespace (space, tab, newline)" },
      { command: ".", description: "Any character except newline" },
      { command: "[abc]", description: "Any character in the set (a, b, or c)" },
      { command: "[^abc]", description: "Any character NOT in the set" }
    ]
  },
  {
    category: "Quantifiers",
    items: [
      { command: "*", description: "0 or more occurrences" },
      { command: "+", description: "1 or more occurrences" },
      { command: "?", description: "0 or 1 occurrence" },
      { command: "{n}", description: "Exactly n occurrences" },
      { command: "{n,}", description: "n or more occurrences" },
      { command: "{n,m}", description: "Between n and m occurrences" }
    ]
  },
  {
    category: "Anchors & Boundaries",
    items: [
      { command: "^", description: "Start of string/line" },
      { command: "$", description: "End of string/line" },
      { command: "\\b", description: "Word boundary" },
      { command: "\\B", description: "Non-word boundary" }
    ]
  },
  {
    category: "Groups & Lookaround",
    items: [
      { command: "(abc)", description: "Capture group" },
      { command: "(?:abc)", description: "Non-capturing group" },
      { command: "(?=abc)", description: "Positive lookahead" },
      { command: "(?!abc)", description: "Negative lookahead" }
    ]
  },
  {
    category: "Common Patterns",
    items: [
      { command: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", description: "Email Address" },
      { command: "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$", description: "URL" },
      { command: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$", description: "Hex Color Code" },
      { command: "^\\d{4}-\\d{2}-\\d{2}$", description: "Date (YYYY-MM-DD)" }
    ]
  }
];

export default function RegexCheatSheet() {
  const [copied, setCopied] = useState("");
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/cheat-sheets" className="text-blue-400 hover:text-blue-300 transition-colors">&larr; All Cheat Sheets</Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent mb-2">Regex Patterns Cheat Sheet</h1>
        <p className="mb-10 text-gray-400">Essential Regular Expression patterns and syntax for developers</p>

        <div className="space-y-8 mb-16">
          {sections.map(s => (
            <div key={s.category}>
              <h2 className="text-2xl font-bold mb-3 text-purple-200">{s.category}</h2>
              <div className="space-y-2">
                {s.items.map(item => (
                  <div key={item.command} className="bg-gray-900 border border-gray-700 rounded-md flex items-center justify-between px-4 py-3">
                    <span className="flex-1 overflow-x-auto">
                      <code className="font-mono text-blue-300 bg-black/30 px-2 py-1 rounded">{item.command}</code>
                      <span className="ml-3 text-gray-300 text-sm block md:inline mt-1 md:mt-0">{item.description}</span>
                    </span>
                    <button
                      className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white ml-3 transition-colors shrink-0"
                      onClick={() => {
                        navigator.clipboard.writeText(item.command);
                        setCopied(item.command);
                        setTimeout(() => setCopied(""), 1000);
                      }}>
                      {copied === item.command ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related Content Section */}
        <div className="border-t border-purple-500/20 pt-10">
          <h2 className="text-2xl font-bold text-white mb-6">Related Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Related Tool */}
            <Link href="/tools/regex-playground" className="group">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-xl hover:bg-purple-900/20 transition-all h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🔍</div>
                  <h3 className="text-lg font-semibold text-purple-100 group-hover:text-white">Regex Playground</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Test your regular expressions in real-time with our interactive tool. Visual highlighting and pattern explanations included.
                </p>
                <span className="text-blue-400 text-sm group-hover:text-blue-300">Try Tool &rarr;</span>
              </motion.div>
            </Link>

            {/* Related Blog */}
            <Link href="/blog/regex-mastery-complete-tutorial" className="group">
               <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-xl hover:bg-purple-900/20 transition-all h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">📚</div>
                  <h3 className="text-lg font-semibold text-purple-100 group-hover:text-white">Regex Mastery Guide</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  A comprehensive tutorial on mastering regular expressions. Learn from basics to advanced lookarounds and optimization.
                </p>
                <span className="text-blue-400 text-sm group-hover:text-blue-300">Read Article &rarr;</span>
              </motion.div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
