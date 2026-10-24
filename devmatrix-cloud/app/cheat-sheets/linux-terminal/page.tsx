"use client";
import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    category: "Navigation",
    items: [
      { command: "pwd", description: "Print working directory" },
      { command: "ls -al", description: "Detailed list" },
      { command: "cd dir", description: "Change directory" },
      { command: "clear", description: "Clear terminal" }
    ]
  },
  {
    category: "Create/Edit/Remove",
    items: [
      { command: "touch file", description: "Create file" },
      { command: "mkdir dir", description: "Make new dir" },
      { command: "rm file", description: "Remove file" },
      { command: "rm -r dir", description: "Remove dir recursively" }
    ]
  },
  {
    category: "Permissions",
    items: [
      { command: "chmod +x file", description: "Make executable" },
      { command: "chown user file", description: "Change owner" }
    ]
  },
  {
    category: "Network & Process",
    items: [
      { command: "ping host", description: "Check network" },
      { command: "ifconfig", description: "Network details" },
      { command: "top", description: "Process monitor" }
    ]
  }
];

export default function LinuxCheatSheet() {
  const [copied, setCopied] = useState("");
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/cheat-sheets" className="text-gray-400">&larr; All Cheat Sheets</Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 text-gray-300 mb-2">Linux Terminal Commands</h1>
        <p className="mb-10 text-gray-400">Essential terminal commands for Linux/Unix</p>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.category}>
              <h2 className="text-2xl font-bold mb-3 text-gray-200">{s.category}</h2>
              <div className="space-y-2">
                {s.items.map(item => (
                  <div key={item.command} className="bg-gray-900 border border-gray-700 rounded-md flex items-center justify-between px-4 py-3">
                    <span>
                      <span className="font-mono text-gray-300">{item.command}</span>
                      <span className="ml-3 text-gray-300 text-sm">{item.description}</span>
                    </span>
                    <button
                      className="px-2 py-1 rounded bg-gray-600 hover:bg-gray-700 text-sm text-white ml-3"
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
