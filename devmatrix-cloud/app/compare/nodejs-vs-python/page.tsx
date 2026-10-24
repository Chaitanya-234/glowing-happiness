import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Node.js vs Python: Backend Battle | DevMetrix',
  description: 'JavaScript everywhere vs The Language of Data. Which is better for your backend?',
};

export default function Page() {
  return (
    <DebateComparison
      title="Node.js vs Python"
      description="Performance vs Simplicity in backend development."
      intro="JavaScript took over the frontend, and with Node.js, it conquered the backend too. But Python remains the undisputed king of data science and AI. For a general web backend, which one wins?"
      personaA={{
        name: "Node.js Ninja",
        role: "JS Everywhere",
        color: "green"
      }}
      personaB={{
        name: "Python Pro",
        role: "Clean & Powerful",
        color: "yellow"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Performance",
          text: "Node.js is fast. Built on Chrome's V8 engine, its non-blocking I/O model is perfect for real-time apps. Chats, streaming, sockets - Node handles thousands of concurrent connections effortlessly."
        },
        {
          speaker: "B",
          topic: "Simplicity",
          text: "Python is readable. 'Pseudocode that runs'. You can write a Django or FastAPI backend in half the lines of code it takes in Express. And you won't have callback hell or promise chaining nightmares."
        },
        {
          speaker: "A",
          topic: "Full Stack",
          text: "One language. Frontend and Backend. You can share types (TypeScript!), validation logic, and libraries. Context switching between JS and Python kills productivity."
        },
        {
          speaker: "B",
          topic: "The Ecosystem",
          text: "If your app needs any heavy lifting—AI, Machine Learning, Data Analysis—Python is the only choice. Libraries like Pandas, NumPy, and PyTorch don't have real rivals in the JS world."
        },
        {
          speaker: "A",
          text: "Async is native to us. Python added async/await later, and the ecosystem is split between sync and async drivers. In Node, everything is async by default."
        },
        {
          speaker: "B",
          text: "Node's ecosystem is a mess of abandoned packages and 'node_modules' heavy enough to sink a ship. Python's standard library is 'batteries included'. You don't need a package for everything."
        }
      ]}
      conclusion="For real-time, high-concurrency applications (chat, streaming) or Single Page App backends where sharing code is a plus, Node.js is superior. For CPU-intensive tasks, data processing, AI integration, or rapid development where readability counts, Python is the clear winner."
      winner="Node for I/O, Python for Data"
    />
  );
}
