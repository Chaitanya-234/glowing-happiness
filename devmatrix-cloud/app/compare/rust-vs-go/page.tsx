import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rust vs Go: The System Languages | DevMetrix',
  description: 'Memory safety without GC vs Simplicity and Concurrency. The battle for modern backend systems.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Rust vs Go"
      description="The new guard of systems programming."
      intro="C++ ruled for decades. Now, two contenders have risen. Go (Google) prioritizes simplicity and concurrency. Rust (Mozilla) prioritizes memory safety and zero-cost abstractions. Which one powers the future?"
      personaA={{
        name: "Rustacean",
        role: "Safety First",
        color: "orange"
      }}
      personaB={{
        name: "Gopher",
        role: "Simplicity First",
        color: "cyan"
      }}
      turns={[
        {
          speaker: "B",
          topic: "Simplicity",
          text: "I can teach a junior dev Go in a weekend. The syntax is small. No generics (historically), no complex lifetime annotations. It's built for productivity and large teams."
        },
        {
          speaker: "A",
          topic: "Memory Safety",
          text: "But at what cost? Garbage Collection. That's a pause in your program. Rust guarantees memory safety at compile time. No GC pauses. Perfect for real-time systems, embedded devices, and game engines."
        },
        {
          speaker: "B",
          topic: "Concurrency",
          text: "Goroutines are magic. You can spawn millions of lightweight threads. Writing a highly concurrent network server in Go is trivial. Rust's 'async/await' is powerful but complex to wrap your head around."
        },
        {
          speaker: "A",
          topic: "Correctness",
          text: "If it compiles, it works. The Borrow Checker prevents data races entirely. In Go, you can still have race conditions if you aren't careful. Rust forces you to write correct code."
        },
        {
          speaker: "B",
          text: "The compile times though! I can compile my entire Go microservice in seconds. Rust takes minutes. Developer velocity matters."
        },
        {
          speaker: "A",
          text: "I'd rather wait for the compiler than wake up at 3 AM for a segfault in production. Rust is the most loved language for 7 years running for a reason."
        }
      ]}
      conclusion="Use Go for network services, cloud-native microservices, and tools where development speed and easy concurrency are paramount. Use Rust for system-level programming, high-performance computing, WebAssembly, or anywhere you need C++ performance with memory safety guarantees."
      winner="Go for Services, Rust for Systems"
    />
  );
}
