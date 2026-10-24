"use client";
import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    category: "Container",
    items: [
      { command: "display: flex", description: "Enable flexbox context" },
      { command: "flex-direction: row | column", description: "Main axis direction" },
      { command: "flex-wrap: wrap", description: "Allow wrap" },
      { command: "justify-content: center", description: "Main axis alignment" },
      { command: "align-items: center", description: "Cross axis alignment" }
    ]
  },
  {
    category: "Item",
    items: [
      { command: "order: 2", description: "Display order" },
      { command: "flex-grow: 1", description: "Item grows relative" },
      { command: "flex-shrink: 1", description: "Item can shrink" },
      { command: "align-self: flex-end", description: "Override alignment" }
    ]
  }
];

export default function FlexboxCheatSheet() {
  const [copied, setCopied] = useState("");
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/cheat-sheets" className="text-rose-400">&larr; All Cheat Sheets</Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 text-rose-300 mb-2">CSS Flexbox Cheat Sheet</h1>
        <p className="mb-10 text-gray-400">Most used Flexbox properties for layout</p>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.category}>
              <h2 className="text-2xl font-bold mb-3 text-rose-200">{s.category}</h2>
              <div className="space-y-2">
                {s.items.map(item => (
                  <div key={item.command} className="bg-gray-900 border border-gray-700 rounded-md flex items-center justify-between px-4 py-3">
                    <span>
                      <span className="font-mono text-rose-300">{item.command}</span>
                      <span className="ml-3 text-gray-300 text-sm">{item.description}</span>
                    </span>
                    <button
                      className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-700 text-sm text-white ml-3"
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
      </div>
    </div>
  )
}
