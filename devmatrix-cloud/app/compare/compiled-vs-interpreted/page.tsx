import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compiled vs Interpreted Languages: A Performance Analysis | DevMetrix',
  description: 'Comparing Compiled languages (C++, Rust, Go) and Interpreted languages (Python, JavaScript, Ruby). Analysis of execution speed, development velocity, and JIT compilation.',
  keywords: ['compiled', 'interpreted', 'JIT', 'compiler', 'interpreter', 'C++', 'Python', 'performance'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The distinction between compiled and interpreted languages is a foundational concept in computer science, defining how human-readable source code is transformed into machine-executable instructions.
          </p>
          <img src="https://placehold.co/800x400?text=Compilation+Process" alt="Diagram showing source code to binary vs source to interpreter" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="Compiled vs Interpreted"
              description="Raw Speed vs Iteration Speed"
              personaA={{
                name: "The Systems Programmer",
                role: "C++ Expert",
                color: "blue",
              }}
              personaB={{
                name: "The Scripter",
                role: "Python Data Scientist",
                color: "yellow",
              }}
              intro="The tortoise and the hare, if the tortoise was a compiler."
              turns={[
                {
                  speaker: "A",
                  text: "You can't optimize what you don't see. My compiler analyzes the whole program, unrolls loops, and vectorizes instructions before it ever runs. I run on bare metal.",
                  topic: "Optimization"
                },
                {
                  speaker: "B",
                  text: "And you wait 20 minutes for a build. I press 'Run' and it works. My development cycle is 10x faster. Developer time is more expensive than CPU time.",
                  topic: "Velocity"
                },
                {
                  speaker: "A",
                  text: "Until you put it in production. Interpreters add massive overhead. Your Python script is 50x slower than my C++ code for number crunching.",
                  topic: "Runtime"
                },
                {
                  speaker: "B",
                  text: "That's why I use C-extensions (NumPy). I get C speeds with Python syntax. It's the best of both worlds.",
                  topic: "Hybrid"
                }
              ]}
              conclusion="The gap is narrowing with JIT (Just-In-Time) compilers (V8, JVM), but for raw performance constraints, AOT compilation remains king."
              winner="Context Dependent"
            />
        </div>
      )
    },
    {
      id: 'historical-evolution',
      title: '3. Historical Evolution',
      content: (
        <>
           <p>Fortran (1957) was the first compiled language. LISP (1958) introduced interpretation via REPL.</p>
           <img src="https://placehold.co/800x400?text=Language+Generations" alt="Timeline of language generations" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations',
      content: (
        <>
           <p><strong>AOT vs JIT:</strong> Ahead-of-Time compilation builds a binary once. Just-in-Time compiles hot paths during execution.</p>
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture',
      content: (
        <>
           <p>Compiled binaries are OS-specific. Interpreted scripts are OS-agnostic (require runtime).</p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software Implications',
      content: (
        <>
           <p><strong>Type Safety:</strong> Compiled languages are usually static. Interpreted are usually dynamic.</p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p>Compiled is orders of magnitude faster for CPU-bound tasks. I/O bound tasks show less difference.</p>
           <img src="https://placehold.co/800x400?text=Benchmark+Results" alt="Bar chart of C++ vs Python speed" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Economic Factors',
      content: (
        <>
           <p>Compiled apps save cloud costs. Interpreted apps save developer salary costs.</p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability and Security',
      content: (
        <>
           <p>Compile-time checks catch bugs early. Interpreted languages crash in production more often due to type errors.</p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications',
      content: (
        <>
           <p><strong>Compiled:</strong> Browsers, OS, AAA Games.</p>
           <p><strong>Interpreted:</strong> Web Backends, Scripts, ML Prototyping.</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>Discord:</strong> Switched from Go (GC) to Rust (Compiled, no GC) to fix latency spikes.</p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6">
              <li><strong>Compiled:</strong> Fast execution, safe. Slow build.</li>
              <li><strong>Interpreted:</strong> Fast dev, flexible. Slow execution.</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p>WASM allows compiled languages to run in the browser alongside JS.</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical Impact',
      content: (
        <>
           <p>Efficient software consumes less energy.</p>
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
                <th className="p-4 text-purple-400">Compiled</th>
                <th className="p-4 text-blue-400">Interpreted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
               <tr>
                <td className="p-4 font-semibold text-slate-300">Translation</td>
                <td className="p-4">Before Run (Full)</td>
                <td className="p-4">During Run (Line by Line)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Errors</td>
                <td className="p-4">At Compile Time</td>
                <td className="p-4">At Runtime</td>
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
           <p>Optimize for the bottleneck. If it is CPU, compile. If it is human time, interpret.</p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Compiled vs Interpreted Languages"
      topicA="Compiled (AOT)"
      topicB="Interpreted (JIT/Runtime)"
      abstract="A technical evaluation of execution strategies. This monograph explores the spectrum from bare-metal machine code to high-level dynamic interpretation, analyzing the role of modern JIT compilers in bridging the performance gap."
      sections={sections}
    />
  );
}
