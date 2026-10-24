import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imperative vs Declarative Programming: A Paradigmatic Comparison | DevMetrix',
  description: 'Comparing Imperative (How) and Declarative (What) programming paradigms. Analysis of readability, side effects, and state management.',
  keywords: ['imperative programming', 'declarative programming', 'functional programming', 'React', 'SQL', 'coding paradigms'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            At the heart of computer science lies the question of abstraction: How much control should the programmer relinquish to the machine? This question defines the schism between Imperative and Declarative programming.
          </p>
          <img src="https://placehold.co/800x400?text=Programming+Paradigms" alt="Chart showing control vs abstraction" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="Imperative vs Declarative"
              description="Control vs Abstraction"
              personaA={{
                name: "The C Veteran",
                role: "Systems Programmer",
                color: "gray",
              }}
              personaB={{
                name: "The React Dev",
                role: "Frontend Engineer",
                color: "cyan",
              }}
              intro="Manual loops meet higher-order functions."
              turns={[
                {
                  speaker: "A",
                  text: "I need to know exactly what the CPU is doing. If I write a loop, I control the memory, the iterator, and the exit condition. Performance comes from control.",
                  topic: "Control"
                },
                {
                  speaker: "B",
                  text: "But you're writing boilerplate. Why write a 'for' loop to filter an array when I can just say `array.filter()`? It's readable, concise, and less error-prone.",
                  topic: "Readability"
                },
                {
                  speaker: "A",
                  text: "Abstraction hides cost. Your one-liner might be traversing the list three times. In embedded systems, that 'magic' is dangerous.",
                  topic: "Performance"
                },
                {
                  speaker: "B",
                  text: "In UI development, imperative DOM manipulation is a bug factory. Declarative UI (like React) lets me describe the state, and the framework handles the updates. It's scalable.",
                  topic: "State"
                }
              ]}
              conclusion="The industry is trending Declarative (React, SQL, Kubernetes configs), but Imperative remains essential for low-level optimization and system internals."
              winner="Declarative (for Applications)"
            />
        </div>
      )
    },
    {
      id: 'historical-evolution',
      title: '3. Historical Evolution',
      content: (
        <>
           <p>Assembly (Imperative) gave way to C. Then LISP (Declarative) introduced functional concepts. Today, modern languages mix both (Rust, JavaScript).</p>
           <img src="https://placehold.co/800x400?text=Language+Timeline" alt="Timeline of programming languages" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations',
      content: (
        <>
          <p>
            <strong>Imperative (Algorithmic):</strong> Rooted in the Turing Machine model. Computation is a change of state.
            <br />
            <em>Example (C/Java):</em> `total = 0; for(i=0; i&lt;10; i++) total += i;`
          </p>
          <p>
            <strong>Declarative (Logic/Functional):</strong> Rooted in Lambda Calculus. Computation is the evaluation of functions.
            <br />
            <em>Example (SQL/Haskell):</em> `SELECT SUM(value) FROM numbers` or `numbers.reduce((a, b) =&gt; a + b)`
          </p>
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture',
      content: (
        <>
           <p><strong>State Management:</strong> Imperative manages state manually. Declarative relies on the runtime to manage state transitions.</p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software Implications',
      content: (
        <>
           <p><strong>Debuggability:</strong> Imperative is easier to step-debug line by line. Declarative code (like SQL or Regex) is often "write only" and harder to debug when it fails.</p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p>Hand-tuned imperative code is generally faster. However, declarative optimizers (SQL Query Planners) can sometimes outperform average human code.</p>
           <img src="https://placehold.co/800x400?text=Optimization+Comparison" alt="Graph of optimization potential" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Economic Factors',
      content: (
        <>
           <p>Declarative code is denser, faster to write, and easier to read, lowering maintenance costs.</p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability and Security',
      content: (
        <>
           <p>Immutability in functional/declarative code eliminates race conditions.</p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications',
      content: (
        <>
           <p><strong>Imperative:</strong> Drivers, Kernels, Game Engines.</p>
           <p><strong>Declarative:</strong> UI (React), Database Queries (SQL), Infrastructure (Terraform).</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>Facebook:</strong> Created React to solve the complexity of imperative DOM updates ("Cascading Updates").</p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6">
              <li><strong>Imperative:</strong> Control, Performance. Verbose, Bug-prone.</li>
              <li><strong>Declarative:</strong> Concise, Readable. Abstract performance costs.</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p>Functional features are being added to almost all languages (Java Streams, C++ Lambdas).</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical Impact',
      content: (
        <>
           <p>Accessible languages democratize coding.</p>
        </>
      )
    },
    {
      id: 'summary-table',
      title: '15. Comparative Summary',
      content: (
         <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4 text-white">Feature</th>
                <th className="p-4 text-purple-400">Imperative</th>
                <th className="p-4 text-blue-400">Declarative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
               <tr>
                <td className="p-4 font-semibold text-slate-300">Focus</td>
                <td className="p-4">How (Control Flow)</td>
                <td className="p-4">What (Logic)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">State</td>
                <td className="p-4">Mutable</td>
                <td className="p-4">Immutable (mostly)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'conclusion',
      title: '16. Conclusion',
      content: (
        <>
           <p>Use Imperative for the engine. Use Declarative for the steering wheel.</p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Imperative vs Declarative Programming"
      topicA="Imperative (How)"
      topicB="Declarative (What)"
      abstract="A paradigmatic analysis of control flow versus logic flow. This study explores how the shift towards declarative abstractions (SQL, React, Terraform) reduces cognitive load while abstracting computational cost."
      sections={sections}
    />
  );
}
