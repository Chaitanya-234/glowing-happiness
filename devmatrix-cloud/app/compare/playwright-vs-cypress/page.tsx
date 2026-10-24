import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playwright vs Cypress: E2E Testing Showdown | DevMetrix',
  description: 'Playwright vs Cypress debate. Microsoft\'s multi-browser speedster vs the developer-friendly interactive runner.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Playwright vs Cypress"
      description="Modern E2E Testing Framework Showdown."
      intro="End-to-End testing used to be painful. Cypress made it fun. Playwright made it fast. Now they battle for the title of best testing framework. Is speed or experience more important?"
      personaA={{
        name: "Playwright Paladin",
        role: "The Speedster",
        color: "green"
      }}
      personaB={{
        name: "Cypress Commander",
        role: "The DX Master",
        color: "teal"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Speed",
          text: "I am fast. I run tests in parallel across multiple browser contexts. I support WebKit (Safari), Firefox, and Chromium natively. I am built for speed."
        },
        {
          speaker: "B",
          topic: "Developer Experience",
          text: "My interactive test runner is unbeatable. You can time-travel, see snapshots of every step, and debug right in the browser console. It's a joy to write tests."
        },
        {
          speaker: "A",
          topic: "Capabilities",
          text: "I can handle multiple tabs, multiple domains, and frames effortlessly. I can test file downloads and uploads natively. You have struggled with these for years."
        },
        {
          speaker: "B",
          topic: "Community",
          text: "I have a massive plugin ecosystem. Everyone knows my syntax. I am the reason frontend testing is popular again."
        },
        {
          speaker: "A",
          topic: "Language Support",
          text: "I support TypeScript, Python, .NET, and Java. You are locked into JavaScript. I fit into any backend team's workflow."
        }
      ]}
      conclusion="Playwright is rapidly becoming the new standard due to its speed, multi-language support, and ability to handle complex scenarios (multi-tab). Cypress is still fantastic for its interactive debugging experience and ease of use for frontend developers."
      winner="Playwright (Rising Star)"
    />
  );
}
