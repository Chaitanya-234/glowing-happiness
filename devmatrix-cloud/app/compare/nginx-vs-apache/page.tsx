import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nginx vs Apache: The Web Server War | DevMetrix',
  description: 'Nginx vs Apache debate. Event-driven architecture vs process-driven flexibility.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Nginx vs Apache"
      description="Event-driven speed vs Process-driven flexibility."
      intro="Apache ruled the early web. Nginx came to solve the C10k problem. Today they power the majority of the internet. Is the old guard still relevant against the event-loop speedster?"
      personaA={{
        name: "Nginx Ninja",
        role: "The Event Loop",
        color: "green"
      }}
      personaB={{
        name: "Apache Admiral",
        role: "The Process Master",
        color: "red"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Architecture",
          text: "I use an asynchronous, event-driven architecture. I can handle thousands of concurrent connections with very little RAM. I don't spawn a thread for every request like you."
        },
        {
          speaker: "B",
          topic: "Flexibility",
          text: ".htaccess! I allow per-directory configuration. Shared hosting loves me because users can configure their own rewrites without touching the main server config."
        },
        {
          speaker: "A",
          topic: "Performance",
          text: "Static content? I serve it 2.5x faster. Reverse proxying? I am the industry standard. I sit in front of Node, Python, Go apps everywhere."
        },
        {
          speaker: "B",
          topic: "Modules",
          text: "I have a module for everything. Dynamic loading. I can embed PHP directly inside me (mod_php). I am a complete application server if needed."
        },
        {
          speaker: "A",
          topic: "Configuration",
          text: "My centralized config is safer. .htaccess hits the disk on every request, slowing you down. My config language is clean and predictable."
        }
      ]}
      conclusion="Nginx is the superior choice for high-performance static serving, reverse proxying, and load balancing. Apache remains useful for shared hosting environments or where per-directory `.htaccess` configuration is a strict requirement."
      winner="Nginx (In Modern Architectures)"
    />
  );
}
