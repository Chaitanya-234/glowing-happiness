import DebateComparison from '@/components/DebateComparison';

export const metadata = {
  title: 'Kotlin vs Java: The JVM Showdown',
  description: 'The modern challenger takes on the industrial standard in a battle for the soul of the Java Virtual Machine.',
};

export default function KotlinVsJava() {
  return (
    <DebateComparison
      title="Kotlin vs Java"
      description="The battle for the future of Android and Enterprise backend development."
      personaA={{
        name: "Kotlin",
        role: "The Modern Conciseness",
        color: "purple",
      }}
      personaB={{
        name: "Java",
        role: "The Industrial Standard",
        color: "orange",
      }}
      intro="For decades, Java has ruled the enterprise and mobile world with an iron fist. But a challenger has arisen from JetBrains—Kotlin. It promises brevity, safety, and modern features while fully interoperating with its elder. Is it time to retire the old king, or does Java's massive ecosystem and recent evolution prove it's still the boss?"
      turns={[
        {
          speaker: 'A',
          topic: 'Conciseness',
          text: "Java, you are verbose. Painfully verbose. I can express in a single line what takes you a dozen. Data classes alone eliminate the need for your endless getters, setters, equals, hashCode, and toString methods. I respect your legacy, but developers are tired of writing boilerplate. With me, code is expressive, readable, and concise. I focus on the 'business logic', not the ceremony of the language. Why write public static void main when you can just write main? Why type strict types everywhere when type inference can figure it out? I am designed for developer happiness."
        },
        {
          speaker: 'B',
          topic: 'Stability',
          text: "You call it verbosity; I call it clarity. My explicitness is my strength. When you read Java code, there is no magic. You know exactly what is happening. I power the world's banking systems, the largest e-commerce platforms, and critical infrastructure. I cannot afford to break backward compatibility for the sake of 'sugar'. My 'boilerplate' ensures that code remains maintainable by large teams over decades. Plus, have you seen modern Java? With Records, Switch Expressions, and var, I am shedding the weight while keeping the stability that enterprises trust with their billions."
        },
        {
          speaker: 'A',
          topic: 'Null Safety',
          text: "The 'Billion Dollar Mistake'. You know what I'm talking about. NullPointerException. It is the scourge of every Java developer's existence. I fixed it. In Kotlin, null safety is baked into the type system. A variable cannot be null unless you explicitly say so. I catch these errors at compile time, before the app crashes in a user's hand. You have Optional, sure, but it's a wrapper, a band-aid. I treat nullability as a first-class citizen, forcing developers to handle the absence of value safely and elegantly. I make software more robust by default."
        },
        {
          speaker: 'B',
          topic: 'Performance',
          text: "We both run on the JVM, so our performance is similar, but my compilation speed is legendary. Your complex features—coroutines, extension functions, inline classes—they come at a cost during build time. Large Kotlin projects can suffer from slow clean builds. And let's talk about the ecosystem. Every library, every tool, every profiler is built for me first. You are a guest in my house. While you interoperate well, deep down, the bytecode is mine. The JIT compiler is optimized for my patterns. I am the metal upon which you stand."
        },
        {
          speaker: 'A',
          topic: 'Coroutines',
          text: "Threads are heavy. Context switching is expensive. I introduced Coroutines—lightweight threads that make asynchronous programming a breeze. I can launch a million coroutines on a single machine without running out of memory. Writing async code with me looks like writing synchronous, sequential code. No more callback hell, no more complex CompletableFuture chains. I bring the power of structured concurrency, making network calls and parallel processing simple and safe. This is the future of high-throughput applications."
        },
        {
          speaker: 'B',
          topic: 'Virtual Threads',
          text: "Have you met Project Loom? Virtual Threads are here, and they bring that same lightweight concurrency directly to the Java platform. I don't need a special keyword or a library to do it. It's just a Thread. This means all existing Java code—millions of lines of it—can benefit from high scalability without rewriting a single line to use 'suspend' functions. I evolve. I absorb the best ideas and implement them at the platform level. You paved the way, Kotlin, but I am integrating the destination into the core."
        }
      ]}
      conclusion="Kotlin has undeniably changed the landscape, forcing Java to modernize and becoming the default for Android. Its developer experience is superior. However, Java's sheer momentum, recent rapid evolution (Loom, Records), and massive ecosystem mean it isn't going anywhere. For new mobile apps, Kotlin is the winner. For massive backend systems, it's a tie."
      winner="Kotlin (Mobile) / Java (Backend)"
    />
  );
}
