import AcademicComparison, { Section } from '@/components/AcademicComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Von Neumann vs Harvard Architecture | DevMetrix',
  description: 'A fundamental comparison of the two primary computer memory architectures: Von Neumann and Harvard.',
  keywords: ['Von Neumann architecture', 'Harvard architecture', 'computer organization', 'memory bus', 'CPU design', 'instruction fetch'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            At the heart of every processing unit lies a fundamental decision about how memory is organized and accessed. This architectural choice—whether to unify instruction and data memory (Von Neumann) or separate them (Harvard)—dictates the system&apos;s performance limits, hardware complexity, and suitability for specific applications.
          </p>
          <p>
            <strong>Research Objectives:</strong> This study explores the &quot;Von Neumann Bottleneck&quot; and how the Harvard architecture attempts to solve it. We analyze why general-purpose computers largely stuck with Von Neumann (with modifications), while embedded systems and DSPs embraced Harvard.
          </p>
        </>
      )
    },
    {
      id: 'historical-evolution',
      title: '2. Historical Evolution',
      content: (
        <>
           <p>
             <strong>Von Neumann (1945):</strong> Proposed by John von Neumann in his &quot;First Draft of a Report on the EDVAC.&quot; The key insight was the &quot;stored-program concept&quot;—programs are just data.
           </p>
           <p>
             <strong>Harvard (1944):</strong> Developed for the Harvard Mark I relay-based computer. It physically separated the paper tape (instructions) from the electromechanical counters (data), allowing simultaneous access.
           </p>
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '3. Theoretical Foundations',
      content: (
        <>
           <p>
              <strong>Von Neumann Architecture:</strong> Single memory space for instructions and data. Single bus for transfer.
              <br/><em>Bottleneck:</em> The CPU is faster than the bus. It cannot fetch an instruction and read/write data in the same clock cycle.
           </p>
           <p>
              <strong>Harvard Architecture:</strong> Physically separate memories and buses for instructions (code) and data.
              <br/><em>Advantage:</em> Simultaneous access. The CPU can fetch the next instruction while reading data for the current one.
           </p>
        </>
      )
    },
    {
      id: 'hardware-architecture',
      title: '4. Hardware Architecture Comparison',
      content: (
        <>
           <p>
              <strong>Bus Complexity:</strong> Harvard requires two sets of address and data buses. This increases the pin count on the chip and the complexity of the motherboard routing (if off-chip). Von Neumann is simpler to route.
           </p>
           <p>
              <strong>Modified Harvard Architecture:</strong> Most modern high-performance CPUs (like Intel Core and ARM Cortex-A) use a hybrid. Externally, they look like Von Neumann (one main memory). Internally, they have separate L1 caches for Instructions (L1i) and Data (L1d), effectively behaving like Harvard machines at the core level.
           </p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '5. Software and Programming Implications',
      content: (
        <>
           <p>
              <strong>Self-Modifying Code:</strong> Easy in Von Neumann (write to memory, then jump to it). Difficult or impossible in Pure Harvard because the data path cannot write to the instruction memory. This is a security feature (prevents code injection) but limits flexibility (JIT compilers).
           </p>
           <p>
              <strong>Linker Scripts:</strong> In Harvard machines (embedded), the developer must explicitly define where code and data reside (e.g., .text in Flash, .data in RAM) via linker scripts.
           </p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '6. Performance Analysis',
      content: (
        <>
           <p>
              <strong>Throughput:</strong> Harvard architecture allows for pipelining (Instruction Fetch and Data Access stages can overlap perfectly). This effectively doubles the memory bandwidth available to the CPU compared to a basic Von Neumann machine.
           </p>
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '7. Cost, Manufacturing, and Economic Factors',
      content: (
        <>
           <p>
              Von Neumann is cheaper to implement for large memory systems because you only need one memory controller and one set of memory chips. Harvard is expensive for general-purpose computing because you would need to buy two separate RAM sticks (one for code, one for data) and manage the free space fragmentation between them.
           </p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '8. Reliability, Security, and Fault Tolerance',
      content: (
        <>
           <p>
              <strong>NX Bit (No-Execute):</strong> Modern Von Neumann OSs simulate Harvard security by marking data pages as non-executable. Pure Harvard enforces this physically, making it inherently immune to code injection attacks like buffer overflows executing shellcode on the stack.
           </p>
        </>
      )
    },
    {
      id: 'applications',
      title: '9. Applications and Use Cases',
      content: (
        <>
           <ul className="list-disc pl-6 space-y-2">
              <li><strong>Von Neumann:</strong> Laptops, Desktops, Servers. General purpose where flexibility and cost efficiency of memory are key.</li>
              <li><strong>Harvard:</strong> DSPs (Digital Signal Processors), Microcontrollers (AVR, PIC), FPGAs. Embedded systems where predictable timing and performance per cycle are critical.</li>
           </ul>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '10. Case Studies',
      content: (
        <>
           <h3 className="text-white font-bold mb-2">Case Study: SHARC DSP</h3>
           <p>
              The Analog Devices SHARC DSP uses a Super Harvard Architecture with *dual* data memories + an instruction memory/cache. This allows it to fetch an instruction and *two* data operands (for a MAC operation: A * B + C) in a single cycle, ideal for FFTs and filters.
           </p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '11. Advantages and Disadvantages',
      content: (
         <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-purple-400 mb-4">Von Neumann Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Simpler hardware/bus structure.</li>
                    <li>Efficient memory usage (code/data share space).</li>
                    <li>Supports self-modifying code (Loaders, JIT).</li>
                </ul>
             </div>
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400 mb-4">Harvard Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Higher memory bandwidth.</li>
                    <li>Concurrent instruction/data access.</li>
                    <li>Greater security (Code/Data separation).</li>
                </ul>
             </div>
        </div>
      )
    },
    {
      id: 'future-trends',
      title: '12. Future Trends and Research',
      content: (
        <>
           <p>
              <strong>Processing-in-Memory (PIM):</strong> The future might move away from both by moving computation *into* the memory chips to avoid the bus bottleneck entirely.
           </p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '13. Ethical, Environmental, and Societal Impact',
      content: (
        <>
           <p>
              More efficient architectures (Harvard in DSPs) lead to lower power consumption in mobile devices, reducing battery waste and energy usage.
           </p>
        </>
      )
    },
    {
      id: 'summary-table',
      title: '14. Comparative Summary',
      content: (
         <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4 text-white">Feature</th>
                <th className="p-4 text-purple-400">Von Neumann</th>
                <th className="p-4 text-blue-400">Harvard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Memory Structure</td>
                <td className="p-4">Unified (Code + Data)</td>
                <td className="p-4">Physically Separated</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Buses</td>
                <td className="p-4">1 Set (Address + Data)</td>
                <td className="p-4">2+ Sets</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Speed</td>
                <td className="p-4">Slower (Bottleneck)</td>
                <td className="p-4">Faster (Parallel access)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Complexity</td>
                <td className="p-4">Low</td>
                <td className="p-4">High</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'conclusion',
      title: '15. Conclusion',
      content: (
        <>
           <p>
              The <strong>Modified Harvard Architecture</strong> has effectively won the war in high-performance computing, offering the best of both worlds: the external simplicity and cost-effectiveness of Von Neumann, with the internal performance of Harvard via split caches.
           </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Von Neumann vs Harvard Architecture"
      topicA="Von Neumann Architecture"
      topicB="Harvard Architecture"
      abstract="A foundational analysis of computer organization. This monograph investigates the 'Von Neumann Bottleneck', the parallel advantages of the Harvard model, and how modern processors hybridize both to achieve peak performance."
      sections={sections}
    />
  );
}
