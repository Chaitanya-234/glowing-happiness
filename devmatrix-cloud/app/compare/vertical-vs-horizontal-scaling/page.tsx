import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vertical vs Horizontal Scaling: A System Design Comparison | DevMetrix',
  description: 'Comparing Scale Up (Vertical) and Scale Out (Horizontal) strategies. Analysis of cost, availability, and architectural requirements.',
  keywords: ['scaling', 'system design', 'cloud architecture', 'scalability', 'load balancing', 'distributed systems'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            Scalability is the property of a system to handle a growing amount of work by adding resources. The two fundamental approaches to scaling are Vertical Scaling (Scaling Up) and Horizontal Scaling (Scaling Out).
          </p>
          <img src="https://placehold.co/800x400?text=Scaling+Strategies" alt="Diagram showing vertical vs horizontal scaling" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="Scale Up vs Scale Out"
              description="Power vs Numbers"
              personaA={{
                name: "The Hardware Enthusiast",
                role: "DBA",
                color: "orange",
              }}
              personaB={{
                name: "The Cloud Native",
                role: "SRE",
                color: "cyan",
              }}
              intro="A bigger beast or a pack of wolves?"
              turns={[
                {
                  speaker: "A",
                  text: "Just give me a bigger server! If I double the RAM and CPU, my database runs faster instantly. No code changes, no complex sharding logic. Simple.",
                  topic: "Simplicity"
                },
                {
                  speaker: "B",
                  text: "But there's a ceiling. You can't buy a server with infinite RAM. And when that one super-server needs maintenance, you have downtime. I add 10 small servers and keep running.",
                  topic: "Limits"
                },
                {
                  speaker: "A",
                  text: "Horizontal scaling is a headache. Distributed data consistency? CAP theorem? Load balancers? You're introducing a thousand points of failure.",
                  topic: "Complexity"
                },
                {
                  speaker: "B",
                  text: "I'm introducing *redundancy*. If one node dies, 9 others take the load. Your single point of failure is your single massive server. Plus, commodity hardware is cheaper.",
                  topic: "Resilience"
                }
              ]}
              conclusion="Start Vertical for simplicity. Go Horizontal for infinite scale and high availability."
              winner="Horizontal (at scale)"
            />
        </div>
      )
    },
    {
      id: 'historical-evolution',
      title: '3. Historical Evolution',
      content: (
        <>
           <p><strong>Mainframe Era:</strong> Scale Up was the only option. <strong>Cloud Era:</strong> Google and Amazon popularized Scale Out using commodity hardware.</p>
           <img src="https://placehold.co/800x400?text=Scaling+Evolution" alt="Timeline of scaling paradigms" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations',
      content: (
        <>
           <p><strong>Amdahl&apos;s Law:</strong> Defines the theoretical limit of speedup in parallel computing (Horizontal).</p>
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture',
      content: (
        <>
           <p><strong>Load Balancing:</strong> Essential for horizontal scaling to distribute traffic. Not needed for vertical.</p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software Implications',
      content: (
        <>
           <p><strong>Statelessness:</strong> Horizontal scaling requires apps to be stateless (store sessions in Redis, not RAM).</p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p>Vertical scaling offers better latency (local memory). Horizontal scaling offers better throughput.</p>
           <img src="https://placehold.co/800x400?text=Throughput+vs+Latency" alt="Graph of throughput vs latency" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Economic Factors',
      content: (
        <>
           <p>High-end hardware (Vertical) has a non-linear price curve (exponentially expensive). Commodity hardware (Horizontal) is linear.</p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability and Security',
      content: (
        <>
           <p><strong>Redundancy:</strong> Horizontal scaling provides automatic failover.</p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications',
      content: (
        <>
           <p><strong>Vertical:</strong> Relational Databases (initially). <strong>Horizontal:</strong> Web Servers, NoSQL.</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>Stack Overflow:</strong> Famous for scaling Vertically with massive SQL servers.</p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6">
              <li><strong>Vertical:</strong> Easy to manage. Hardware limits.</li>
              <li><strong>Horizontal:</strong> Unlimited scale. Complex to manage.</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p>Serverless auto-scales horizontally to zero.</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical Impact',
      content: (
        <>
           <p>Cloud scaling creates massive energy demand.</p>
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
                <th className="p-4 text-purple-400">Vertical</th>
                <th className="p-4 text-blue-400">Horizontal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
               <tr>
                <td className="p-4 font-semibold text-slate-300">Complexity</td>
                <td className="p-4">Low</td>
                <td className="p-4">High</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Limit</td>
                <td className="p-4">Hardware Max</td>
                <td className="p-4">Infinite (Theoretical)</td>
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
           <p>Scale Up until you can&apos;t, then Scale Out.</p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Vertical vs Horizontal Scaling"
      topicA="Vertical (Scale Up)"
      topicB="Horizontal (Scale Out)"
      abstract="A system design analysis of scaling strategies. This monograph evaluates the trade-offs between hardware capacity and software complexity, providing a framework for capacity planning."
      sections={sections}
    />
  );
}
