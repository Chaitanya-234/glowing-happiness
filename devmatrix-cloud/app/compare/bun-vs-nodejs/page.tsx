import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bun vs Node.js: The Runtime Revolution | DevMetrix',
  description: 'Bun vs Node.js debate. The all-in-one fast runtime vs the established JavaScript giant.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Bun vs Node.js"
      description="The new ultra-fast runtime challenges the king."
      intro="Node.js has been the default JavaScript runtime for over a decade. But Bun is here, written in Zig, claiming to be a drop-in replacement that is drastically faster. Is it time to switch?"
      personaA={{
        name: "Bun Berserker",
        role: "The Speed Demon",
        color: "orange"
      }}
      personaB={{
        name: "Node.js Noble",
        role: "The Monarch",
        color: "green"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Performance",
          text: "I am fast. 3x faster startup. 4x faster HTTP server. I'm written in Zig and use JavaScriptCore. You are V8 and C++. Old tech."
        },
        {
          speaker: "B",
          topic: "Stability",
          text: "I run the internet. Netflix, Uber, NASA... they run on me. I am battle-tested. You are new. Can you guarantee you won't segfault in production?"
        },
        {
          speaker: "A",
          topic: "Tooling",
          text: "I am an all-in-one toolkit. I have a bundler, a test runner, a package manager (bun install is instant!), and a runtime. You need npm, jest, webpack, nodemon... bloat everywhere."
        },
        {
          speaker: "B",
          topic: "Compatibility",
          text: "My ecosystem is vast. Not every npm package works with you yet. I have 10 years of edge case handling built in."
        },
        {
          speaker: "A",
          topic: "DX",
          text: "I support TypeScript out of the box. No `ts-node`, no build step. Just `bun run index.ts`. It's how it should have always been."
        }
      ]}
      conclusion="Bun is incredibly exciting and offers a superior developer experience for new projects. However, Node.js remains the safe, stable choice for mission-critical production environments."
      winner="Bun for DX, Node for Prod"
    />
  );
}
