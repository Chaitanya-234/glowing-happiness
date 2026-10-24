"use client";

import Link from "next/link";
import Canvas3D from "./Canvas3D";

const STATS = [
  { value: "100+", label: "AI Tools" },
  { value: "110+", label: "Developer Blogs" },
  { value: "98%", label: "Vulnerability Detection" },
];

export default function Hero() {
  return (
    <section className="relative flex items-center px-6 lg:px-12 pt-32 pb-20 min-h-screen">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-0 items-center">
        {/* 3D scene */}
        <div className="lg:col-span-4 xl:col-span-5 h-[400px] lg:h-[550px] xl:h-[650px] relative order-2 lg:order-1 glass rounded-3xl overflow-hidden">
          <Canvas3D />
        </div>

        {/* Text content */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-8 px-4 lg:px-8 order-1 lg:order-2">
          

          <h1 className="flex flex-col text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
            <span className="text-foreground">Dev</span>
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Metrix</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted leading-relaxed max-w-lg">
            DevMetrix is an AI-powered{" "}
            <span className="text-accent font-semibold">developer platform</span>,
            designed to measure, optimize, and accelerate engineering performance.
            Explore intelligent tools, deep insights, and real-time metrics that help
            teams ship better code — faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/tools" className="btn-solid group inline-flex items-center justify-center gap-2 px-8 py-4">
              Tool Playground
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/blog" className="btn-glass inline-flex items-center justify-center gap-2 px-8 py-4">
              <span aria-hidden="true" className="text-xs text-accent">▶</span>
              Blog Vibes
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 min-w-[90px]">
                <div className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs lg:text-sm text-muted uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}