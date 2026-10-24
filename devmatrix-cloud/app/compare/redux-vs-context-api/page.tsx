import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redux vs Context API: State Management | DevMetrix',
  description: 'Do you really need Redux? Or is React Context enough? A debate on global state management.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Redux vs Context API"
      description="The eternal question: How to manage global state in React?"
      intro="For a long time, Redux was mandatory for React apps. Then React introduced the Context API (and hooks). Now developers ask: Is Redux dead?"
      personaA={{
        name: "Redux Ranger",
        role: "Predictable State",
        color: "purple"
      }}
      personaB={{
        name: "Context Commando",
        role: "Built-in Simplicity",
        color: "blue"
      }}
      turns={[
        {
          speaker: "B",
          topic: "Simplicity",
          text: "Why add a heavy library? Context is built into React! `useContext` and `useReducer` gives you 90% of what Redux does without the boilerplate. Actions, reducers, types, store setup... it's too much."
        },
        {
          speaker: "A",
          topic: "Performance",
          text: "Context has a major flaw: re-renders. If you update a value in a Context, *every* component consuming that context re-renders. Redux (via React-Redux) uses selectors to ensure components only update when their specific data changes."
        },
        {
          speaker: "B",
          text: "For small to medium apps, that performance difference is negligible. And with libraries like Zustand or Jotai, I can get atomic updates without the complexity of Redux."
        },
        {
          speaker: "A",
          topic: "DevTools",
          text: "Redux DevTools are unbeatable. Time-travel debugging. I can see every action, every state change, and replay them. You can't do that with Context. For complex logic, this visibility is a lifesaver."
        },
        {
          speaker: "B",
          text: "Redux Toolkit (RTK) helped, but it's still a lot of concepts. Context feels like 'Just React'. Prop drilling is solved. That's enough for most UI state like themes or user sessions."
        },
        {
          speaker: "A",
          topic: "Middleware",
          text: "Thunks, Sagas, RTK Query. Redux has a powerful middleware ecosystem for side effects (API calls, caching). Context doesn't have a standard way to handle async logic."
        }
      ]}
      conclusion="Use Context API for low-frequency updates (User Auth, Theme, Language) or simple state in small applications. Use Redux (specifically Redux Toolkit) for complex applications with frequent state updates, heavy data interaction, or when you need robust debugging capabilities and middleware."
      winner="Context for Simple, Redux for Complex"
    />
  );
}
