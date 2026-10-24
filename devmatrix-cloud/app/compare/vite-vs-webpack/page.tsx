import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vite vs Webpack: The Build Tool Battle | DevMetrix',
  description: 'Vite vs Webpack debate. Lightning fast ES modules vs the powerful bundler ecosystem.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Vite vs Webpack"
      description="The Speedster vs The Configurator: Battle for Build Tools."
      intro="For years, Webpack reigned supreme as the king of bundlers. But a new challenger has appeared—Vite, promising lightning-fast starts and HMR. Is speed everything, or does configurability still rule?"
      personaA={{
        name: "Vite Vanguard",
        role: "The Speedster",
        color: "purple"
      }}
      personaB={{
        name: "Webpack Warlord",
        role: "The Configurator",
        color: "blue"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Dev Server Speed",
          text: "Have you seen my startup times? I'm instant. I serve native ES modules directly to the browser. No bundling required during dev. You take 30 seconds just to wake up!"
        },
        {
          speaker: "B",
          topic: "Ecosystem",
          text: "Speed isn't everything. I have thousands of plugins. Loaders for every file type imaginable. If you have a complex enterprise app with legacy code, I am the only one who can handle it."
        },
        {
          speaker: "A",
          topic: "Configuration",
          text: "But your config files are a nightmare! `webpack.config.js` is legendary for being unreadable. I work out of the box for React, Vue, Svelte. Zero config for most users."
        },
        {
          speaker: "B",
          topic: "Production Optimization",
          text: "I might be complex, but that gives me power. Tree-shaking, code-splitting, module federation... I invented these standards. I can optimize a bundle down to the last byte."
        },
        {
          speaker: "A",
          topic: "HMR",
          text: "My Hot Module Replacement remains fast regardless of app size. O(1) complexity. As your app grows, you get slower. I stay fast. Forever."
        }
      ]}
      conclusion="If you are starting a new project or want a modern dev experience, Vite is the clear winner. However, for complex legacy migrations or highly custom build pipelines, Webpack is still the heavyweight champion."
      winner="Vite (For 90% of users)"
    />
  );
}
