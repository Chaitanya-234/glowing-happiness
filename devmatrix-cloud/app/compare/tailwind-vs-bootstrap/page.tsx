import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tailwind CSS vs Bootstrap: The Styling Showdown | DevMetrix',
  description: 'Utility-first vs Component-based. Which CSS framework should you choose for your next project?',
};

export default function Page() {
  return (
    <DebateComparison
      title="Tailwind CSS vs Bootstrap"
      description="The battle of CSS methodologies: Utility classes vs Pre-built components."
      intro="For years, Bootstrap ruled the web with its grid system and ready-made components. Then came Tailwind, challenging the status quo with a utility-first approach. Is it time to ditch the components?"
      personaA={{
        name: "Tailwind Titan",
        role: "Utility Expert",
        color: "cyan"
      }}
      personaB={{
        name: "Bootstrap Baron",
        role: "Component King",
        color: "purple"
      }}
      turns={[
        {
          speaker: "B",
          topic: "Speed of Development",
          text: "You can't beat Bootstrap for speed. I drop in a 'navbar' class and I have a fully responsive navigation. With Tailwind, you're typing 'flex w-full bg-blue-500 p-4...' it takes forever just to make a button!"
        },
        {
          speaker: "A",
          topic: "Customization",
          text: "But your sites all look the same! Bootstrap sites scream 'I used Bootstrap'. With Tailwind, I'm building a custom design system. I have total control over spacing, colors, and typography without writing a single line of custom CSS file."
        },
        {
          speaker: "B",
          text: "Consistency is good! And Bootstrap 5 is highly customizable with Sass variables. Plus, we have built-in JavaScript components like Modals and Tooltips. Tailwind gives you nothing for interaction."
        },
        {
          speaker: "A",
          topic: "Bundle Size",
          text: "Tailwind scans my files and generates a CSS file containing ONLY the classes I used. My CSS bundle is tiny, often under 10kb. You're loading all of Bootstrap even if you only use the grid."
        },
        {
          speaker: "B",
          text: "Classes clutter the HTML though. 'class=\"p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400\"'. It's unreadable!"
        },
        {
          speaker: "A",
          topic: "Maintenance",
          text: "Actually, it's easier to maintain. I know exactly what styles are applied just by looking at the HTML. I don't have to hunt down some '.btn-primary' in a 2000-line CSS file to see why it has 5px padding."
        }
      ]}
      conclusion="Bootstrap remains excellent for prototypes, MVPs, and developers who don't want to think about design details. Tailwind is superior for custom designs, long-term scalability, and performance, offering a modern developer experience that pays off once you learn the utility classes."
      winner="Tailwind for Custom, Bootstrap for Speed"
    />
  );
}
