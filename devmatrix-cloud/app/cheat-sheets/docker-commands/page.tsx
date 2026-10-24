"use client";
import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    category: "Getting Started",
    items: [
      { command: "docker --version", description: "Show Docker version" },
      { command: "docker info", description: "System info" },
      { command: "docker login", description: "Login to Docker Hub" }
    ]
  },
  {
    category: "Images",
    items: [
      { command: "docker pull [image]", description: "Download image" },
      { command: "docker build -t name .", description: "Build image" },
      { command: "docker images", description: "List images" }
    ]
  },
  {
    category: "Containers",
    items: [
      { command: "docker run -d -p 8080:80 nginx", description: "Run nginx in background" },
      { command: "docker ps", description: "Running containers" },
      { command: "docker stop [id]", description: "Stop running container" },
      { command: "docker exec -it [id] bash", description: "Start shell in container" }
    ]
  },
  {
    category: "Volumes & Networks",
    items: [
      { command: "docker volume create mydata", description: "New volume" },
      { command: "docker network ls", description: "List networks" }
    ]
  },
  {
    category: "Docker Compose",
    items: [
      { command: "docker-compose up", description: "Start multi-container" },
      { command: "docker-compose down", description: "Stop all" }
    ]
  },
  {
    category: "Clean Up",
    items: [
      { command: "docker system prune", description: "Remove unused data" }
    ]
  }
];

export default function DockerCheatSheet() {
  const [copied, setCopied] = useState("");
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/cheat-sheets" className="text-blue-400">&larr; All Cheat Sheets</Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 text-cyan-300 mb-2">Docker Commands Cheat Sheet</h1>
        <p className="mb-10 text-gray-400">Essential Docker commands</p>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.category}>
              <h2 className="text-2xl font-bold mb-3 text-cyan-200">{s.category}</h2>
              <div className="space-y-2">
                {s.items.map(item => (
                  <div key={item.command} className="bg-gray-900 border border-gray-700 rounded-md flex items-center justify-between px-4 py-3">
                    <span>
                      <span className="font-mono text-cyan-300">{item.command}</span>
                      <span className="ml-3 text-gray-300 text-sm">{item.description}</span>
                    </span>
                    <button
                      className="px-2 py-1 rounded bg-cyan-600 hover:bg-cyan-700 text-sm text-white ml-3"
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
