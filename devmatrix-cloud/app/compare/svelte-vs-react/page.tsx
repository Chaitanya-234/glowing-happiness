import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Svelte vs React: The Frontend Framework War | DevMetrix',
  description: 'Svelte vs React debate. The compiler approach vs the Virtual DOM giant.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Svelte vs React"
      description="The Compiler vs The Virtual DOM."
      intro="React changed the world with the Virtual DOM. Svelte says the Virtual DOM is pure overhead. One is a library, the other is a compiler. Which approach builds the better web?"
      personaA={{
        name: "Svelte Striker",
        role: "The Compiler",
        color: "orange"
      }}
      personaB={{
        name: "React Ruler",
        role: "The Library",
        color: "cyan"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Performance",
          text: "I don't have a Virtual DOM. I compile your code into tiny, vanilla JavaScript that surgically updates the DOM. I am smaller and faster by default."
        },
        {
          speaker: "B",
          topic: "Ecosystem",
          text: "I am the industry. Every library, every grid, every chart has a React wrapper. You are still playing catch-up. Jobs are in React."
        },
        {
          speaker: "A",
          topic: "Reactivity",
          text: "My reactivity is built into the language. `count += 1`. That's it. No `useState`, no `useEffect` dependency arrays, no `useMemo`. Just JavaScript."
        },
        {
          speaker: "B",
          topic: "Scalability",
          text: "Facebook runs on me. I pioneered component architecture. My model is proven at the largest scale. And with Server Components, I'm evolving again."
        },
        {
          speaker: "A",
          topic: "Code Size",
          text: "Write the same app in both of us. My code will be 40% shorter. Less boilerplate means fewer bugs."
        }
      ]}
      conclusion="Svelte offers an incredible developer experience and smaller bundle sizes, making it perfect for small to medium apps. React remains the safe bet for large-scale enterprise applications and career longevity."
      winner="Svelte for DX, React for Jobs"
    />
  );
}
