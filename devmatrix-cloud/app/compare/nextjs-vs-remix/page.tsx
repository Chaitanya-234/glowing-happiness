import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js vs Remix: The Full Stack Framework Debate | DevMetrix',
  description: 'A detailed debate between Next.js and Remix frameworks. Explore server components, nested routing, and data loading strategies.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Next.js vs Remix"
      description="Two modern React frameworks battle for full-stack dominance."
      intro="The React ecosystem has evolved. Next.js has long been the champion of server-side rendering, but Remix has entered the arena with a focus on web standards and nested routing. Let's see how they stack up."
      personaA={{
        name: "Next.js Ninja",
        role: "The Veteran",
        color: "blue"
      }}
      personaB={{
        name: "Remix Rebel",
        role: "The Challenger",
        color: "purple"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Ecosystem & Maturity",
          text: "Let's be real. Next.js is the standard. We have Vercel backing us, a massive ecosystem, and we practically invented modern SSR for React. App Router is revolutionizing how we build apps with Server Components."
        },
        {
          speaker: "B",
          topic: "Data Loading",
          text: "App Router is complex though! Remix keeps it simple. We rely on web standards. Our loaders and actions are just standard Request/Response handlers. No proprietary 'getServerSideProps' or confusing client/server boundaries."
        },
        {
          speaker: "A",
          text: "Server Components reduce bundle size dramatically. We send zero JS for static parts of the page. That's a huge performance win that Remix doesn't natively have in the same way yet."
        },
        {
          speaker: "B",
          topic: "Nested Routing",
          text: "But look at our Nested Routing! It's built into our DNA. We load data in parallel for every part of the layout. No waterfalls. And when you mutate data? We revalidate everything automatically. It feels like magic."
        },
        {
          speaker: "A",
          topic: "Static Generation",
          text: "What about Static Site Generation (SSG)? Next.js lets you pre-render pages at build time for ultimate speed and cheap hosting. Remix is all-in on dynamic server rendering. Not every site needs a running server."
        },
        {
          speaker: "B",
          text: "Static is a lie! As soon as you add a user login, your 'static' site is dynamic. Remix embraces the edge. We run on Cloudflare Workers, Deno, anywhere. We are dynamic by default because the web is dynamic."
        }
      ]}
      conclusion="If you want a framework with massive community support, flexible rendering modes (SSG, ISR, SSR), and don't mind the learning curve of Server Components, Next.js is the winner. However, if you prefer a 'use the platform' approach with simpler data mutations and incredible nested routing, Remix is a joy to work with."
      winner="It Depends on your philosophy"
    />
  );
}
