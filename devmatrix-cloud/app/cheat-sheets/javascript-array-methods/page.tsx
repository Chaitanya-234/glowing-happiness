"use client";
import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    category: "Iteration",
    items: [
      { command: "arr.forEach(fn)", description: "Iterate over each item" },
      { command: "arr.map(fn)", description: "New array with fn applied" },
      { command: "arr.filter(fn)", description: "Items where fn returns true" },
    ]
  },
  {
    category: "Searching",
    items: [
      { command: "arr.find(fn)", description: "First match" },
      { command: "arr.indexOf(val)", description: "First index or -1" },
      { command: "arr.includes(val)", description: "Contains value?" },
    ]
  },
  {
    category: "Transformation",
    items: [
      { command: "arr.sort(fn)", description: "Sort in place" },
      { command: "arr.reverse()", description: "Reverse array in place" },
      { command: "arr.reduce(fn, init)", description: "Reduce to single value" },
    ]
  },
  {
    category: "Extras",
    items: [
      { command: "arr.concat(arr2)", description: "Merge arrays" },
      { command: "arr.join(sep)", description: "Join array to string" },
      { command: "[...arr]", description: "Copy array" }
    ]
  }
];

export default function JSArrayCheatSheet() {
  const [copied, setCopied] = useState("");
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/cheat-sheets" className="text-yellow-400">&larr; All Cheat Sheets</Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 text-yellow-300 mb-2">JavaScript Array Methods</h1>
        <p className="mb-10 text-gray-400">Quick reference for JavaScript arrays</p>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.category}>
              <h2 className="text-2xl font-bold mb-3 text-yellow-200">{s.category}</h2>
              <div className="space-y-2">
                {s.items.map(item => (
                  <div key={item.command} className="bg-gray-900 border border-gray-700 rounded-md flex items-center justify-between px-4 py-3">
                    <span>
                      <span className="font-mono text-yellow-300">{item.command}</span>
                      <span className="ml-3 text-gray-300 text-sm">{item.description}</span>
                    </span>
                    <button
                      className="px-2 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-sm text-white ml-3"
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
