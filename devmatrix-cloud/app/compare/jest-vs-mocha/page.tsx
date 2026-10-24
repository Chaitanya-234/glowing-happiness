import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jest vs Mocha: Testing Tools | DevMetrix',
  description: 'The zero-config giant vs the flexible classic. Which JavaScript testing framework is right for you?',
};

export default function Page() {
  return (
    <DebateComparison
      title="Jest vs Mocha"
      description="Battle of the JavaScript Test Runners."
      intro="Testing is crucial. Jest (from Meta) promises a 'zero-config' experience. Mocha is the flexible grandfather of JS testing. Which one makes TDD a joy?"
      personaA={{
        name: "Jest Jester",
        role: "All-in-One",
        color: "red"
      }}
      personaB={{
        name: "Mocha Minimalist",
        role: "Flexible Core",
        color: "yellow"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Experience",
          text: "Jest works out of the box. Assertions, spies, mocks, coverage, snapshot testing... it's all included. With Mocha, you need Chai for assertions, Sinon for mocks, NYC for coverage. It's DIY hell."
        },
        {
          speaker: "B",
          topic: "Flexibility",
          text: "That's a feature! I choose the best tools. Maybe I prefer 'expect' style or 'should' style. Mocha lets me decide. Jest locks you into their way. And Mocha runs anywhere, even in the browser."
        },
        {
          speaker: "A",
          topic: "Snapshots",
          text: "Snapshot testing changed everything for React components. It catches UI regressions instantly. Jest pioneered this. It's integrated deeply into the runner."
        },
        {
          speaker: "B",
          text: "Mocha is faster. Jest has a heavy startup time because it loads JSDOM and a massive environment for every test file. Mocha is lightweight. For pure Node.js services, Mocha flies."
        },
        {
          speaker: "A",
          text: "Parallel execution in Jest is default. We isolate tests in their own processes. One test can't leak global state into another. It's safer."
        },
        {
          speaker: "B",
          text: "The isolation is expensive though. And debugging a Jest test can be tricky with all that magic. Mocha is just running JS. It's transparent."
        }
      ]}
      conclusion="Jest is the de facto standard for React and modern frontend apps due to its all-in-one nature and Snapshot support. Mocha remains a strong contender for Node.js backend services where startup speed and configuration flexibility are valued over 'zero-config' magic."
      winner="Jest for Frontend, Mocha for Backend"
    />
  );
}
