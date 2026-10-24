// app/cheat-sheets/git-commands/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    category: "Setup & Config",
    items: [
      { command: 'git config --global user.name "[name]"', description: "Set user name" },
      { command: 'git config --global user.email "[email]"', description: "Set user email" },
      { command: "git init", description: "Initialize new git repo" }
    ]
  },
  {
    category: "Snapshots & Staging",
    items: [
      { command: "git status", description: "Current repo status" },
      { command: "git add [file]", description: "Stage a file" },
      { command: "git commit -m 'msg'", description: "Commit with message" },
    ]
  },
  {
    category: "Branches & Merging",
    items: [
      { command: "git branch", description: "List branches" },
      { command: "git checkout -b [branch]", description: "Create & switch branch" },
      { command: "git merge [branch]", description: "Merge to current branch" },
      { command: "git branch -d [branch]", description: "Delete branch" }
    ]
  },
  {
    category: "Remote",
    items: [
      { command: "git clone [url]", description: "Clone repo" },
      { command: "git remote -v", description: "Show remotes" },
      { command: "git push origin [branch]", description: "Push to remote" },
      { command: "git pull", description: "Pull latest" }
    ]
  },
  {
    category: "Undo & Clean",
    items: [
      { command: "git reset --hard", description: "Reset to HEAD" },
      { command: "git revert [commit]", description: "Revert commit" },
      { command: "git clean -fd", description: "Remove untracked" }
    ]
  }
];

export default function GitCheatSheet() {
  const [copied, setCopied] = useState("");
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/cheat-sheets" className="text-blue-400">&larr; All Cheat Sheets</Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent mb-2">Git Commands Cheat Sheet</h1>
        <p className="mb-10 text-gray-400">Essential Git commands for everyday use</p>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.category}>
              <h2 className="text-2xl font-bold mb-3 text-purple-200">{s.category}</h2>
              <div className="space-y-2">
                {s.items.map(item => (
                  <div key={item.command} className="bg-gray-900 border border-gray-700 rounded-md flex items-center justify-between px-4 py-3">
                    <span>
                      <span className="font-mono text-blue-300">{item.command}</span>
                      <span className="ml-3 text-gray-300 text-sm">{item.description}</span>
                    </span>
                    <button
                      className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-sm text-white ml-3"
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
