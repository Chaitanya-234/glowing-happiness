import AcademicComparison, { Section } from '@/components/AcademicComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Embedded Systems vs General-Purpose Computing | DevMetrix',
  description: 'An academic comparison between dedicated Embedded Systems and General-Purpose Computing Systems.',
  keywords: ['Embedded Systems', 'General Purpose Computing', 'RTOS', 'microcontrollers', 'system constraints', 'computing paradigms'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            Computing systems can be broadly categorized into two domains: those designed to do everything (General-Purpose) and those designed to do one thing extremely well (Embedded). This comparison explores the divergence in design philosophy, constraints, and optimization goals between these two worlds.
          </p>
          <p>
            <strong>Research Objectives:</strong> This study aims to define the boundary between general computing and embedded systems—a boundary that is increasingly blurring with the advent of powerful smartphones and IoT devices.
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
             <strong>General-Purpose:</strong> Traces back to ENIAC and the mainframe era. The goal was to build a machine that could solve *any* numerical problem given the right program.
           </p>
           <p>
             <strong>Embedded:</strong> Born with the Apollo Guidance Computer (1960s) and the first microcontroller (1971). The goal was to replace electromechanical controllers with digital logic to save weight and improve reliability.
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
              <strong>Constraint-Driven Design:</strong> Embedded systems are defined by constraints: Power, Cost, Size, Time. General-purpose systems are defined by capabilities: Performance, Usability, Expandability.
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
              <strong>SoC vs Motherboard:</strong> Embedded systems typically use System-on-Chip (SoC) designs where CPU, RAM, Flash, and Peripherals are on a single die. General-purpose systems use a modular motherboard approach (CPU + DRAM slots + PCIe + SSD).
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
              <strong>OS vs Firmware:</strong>
           </p>
           <ul className="list-disc pl-6 space-y-2">
              <li><strong>General-Purpose:</strong> Runs a heavy GPOS (Windows, Linux, macOS) that manages resources, multitasking, and UI.</li>
              <li><strong>Embedded:</strong> Runs &quot;bare metal&quot; firmware or a Real-Time Operating System (RTOS) like FreeRTOS. The code interacts directly with hardware registers.</li>
           </ul>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '6. Performance Analysis',
      content: (
        <>
           <p>
              <strong>Real-Time Requirement:</strong> Many embedded systems are &quot;Hard Real-Time&quot;—missing a deadline is a system failure (e.g., airbag deployment). General-purpose systems are &quot;Best Effort&quot;—a UI lag is annoying but not fatal.
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
              <strong>Volume vs Margin:</strong> Embedded systems (like a microwave controller) are high-volume, low-margin products where saving $0.10 per chip matters. General-purpose systems (gaming PC) are lower volume, high margin.
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
              <strong>Watchdog Timers:</strong> Essential in embedded systems to reset the device if it hangs. Rare in general-purpose user software (which just crashes to desktop).
           </p>
           <p>
              <strong>Lifecycle:</strong> Embedded systems often run for 10-20 years without a reboot or update. General-purpose systems require constant patching.
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
              <li><strong>Embedded:</strong> ABS Brakes, Pacemakers, Washing Machines, Routers, Smart Bulbs.</li>
              <li><strong>General-Purpose:</strong> Video Editing Workstations, Web Browsing Laptops, Database Servers.</li>
           </ul>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '10. Case Studies',
      content: (
        <>
           <h3 className="text-white font-bold mb-2">Case Study: The Mars Rover (Perseverance)</h3>
           <p>
              Uses a RAD750 processor (embedded, radiation-hardened) running VxWorks (RTOS). It is millions of times slower than a modern laptop, but it must survive cosmic radiation and operate autonomously on another planet. Reliability trumps performance.
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
                <h4 className="text-lg font-bold text-purple-400 mb-4">Embedded Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Extremely optimized for the task.</li>
                    <li>Low power / battery operable.</li>
                    <li>High reliability / deterministic.</li>
                </ul>
             </div>
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400 mb-4">General-Purpose Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Flexible (run any app).</li>
                    <li>High peak performance.</li>
                    <li>User-friendly interfaces.</li>
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
              <strong>Edge AI:</strong> Bringing general-purpose AI capabilities (like object recognition) into constrained embedded devices (TinyML).
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
              The ubiquity of embedded systems (IoT) raises massive privacy concerns. When your toaster and fridge have microphones and internet connections, the attack surface of the home explodes.
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
                <th className="p-4 text-purple-400">Embedded System</th>
                <th className="p-4 text-blue-400">General-Purpose System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Functionality</td>
                <td className="p-4">Dedicated / Fixed</td>
                <td className="p-4">Versatile / Programmable</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">OS</td>
                <td className="p-4">RTOS or Bare Metal</td>
                <td className="p-4">GPOS (Win/Linux/Mac)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Resources</td>
                <td className="p-4">Constrained (kB/MB)</td>
                <td className="p-4">Abundant (GB/TB)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Timing</td>
                <td className="p-4">Real-Time Deterministic</td>
                <td className="p-4">Best Effort</td>
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
              While smartphones have brought general-purpose power to the pocket, the world of deep embedded systems remains distinct. The future is a symbiotic relationship where general-purpose clouds manage fleets of billions of specific-purpose embedded devices.
           </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Embedded vs General-Purpose Systems"
      topicA="Embedded Systems"
      topicB="General-Purpose Computing"
      abstract="A comparative monograph on computing paradigms. This study contrasts the resource-constrained, reliability-focused world of embedded engineering with the performance-focused, flexible world of general-purpose computing."
      sections={sections}
    />
  );
}
