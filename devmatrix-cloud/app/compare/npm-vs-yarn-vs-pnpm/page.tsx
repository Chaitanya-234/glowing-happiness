import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'npm vs Yarn vs pnpm: The Package Managers | DevMetrix',
  description: 'Which Node.js package manager is fastest and most efficient? npm, Yarn, or pnpm?',
};

export default function Page() {
  return (
    <DebateComparison
      title="npm vs Yarn vs pnpm"
      description="The war for your node_modules folder."
      intro="It used to be just npm. Then Yarn made it fast and deterministic. Then pnpm made it efficient. Now everyone is fast. Which one should you type into your terminal?"
      personaA={{
        name: "Classic npm",
        role: "The Standard",
        color: "red"
      }}
      personaB={{
        name: "pnpm Power",
        role: "The Efficient",
        color: "yellow"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Availability",
          text: "I come installed with Node.js. Everyone has me. You don't need to install a package manager to install your package manager. I'm the default."
        },
        {
          speaker: "B",
          topic: "Disk Space",
          text: "You waste space! If I have 100 projects using React, npm downloads React 100 times. pnpm stores it once in a global store and hard-links it. I save gigabytes of disk space."
        },
        {
          speaker: "A",
          topic: "Stability",
          text: "I've improved! `npm ci` gives deterministic builds just like Yarn. And I'm catching up on speed with recent versions. Why use a third-party tool?"
        },
        {
          speaker: "B",
          topic: "Speed",
          text: "pnpm is consistently faster. Installation is parallelized and efficient. And I enforce strict boundaries. npm flattens dependencies, allowing phantom dependencies (accessing packages you didn't install). pnpm prevents that."
        },
        {
          speaker: "A",
          text: "Yarn (Berry) is also cool with PnP (Plug'n'Play), removing node_modules entirely. But it breaks compatibility with many tools. npm is the safe path."
        },
        {
          speaker: "B",
          text: "pnpm gives you the speed of Yarn and the compatibility of npm, plus disk savings. It's the best of all worlds. Even Next.js and Vue repos have switched to pnpm."
        }
      ]}
      conclusion="For most developers, `npm` is fine because it's already there. However, `pnpm` is technically superior: it's faster, saves massive amounts of disk space, and prevents dependency hoisting issues. `Yarn` is still solid but `pnpm` has stolen the momentum for efficiency."
      winner="pnpm for Efficiency"
    />
  );
}
