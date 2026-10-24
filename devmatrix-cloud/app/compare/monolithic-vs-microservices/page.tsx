import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monolithic vs Microservices Architecture: A Strategic Comparison | DevMetrix',
  description: 'Comparing Monolithic and Microservices software architectures. Analyzing scalability, deployment complexity, and organizational impact (Conway\'s Law).',
  keywords: ['monolith', 'microservices', 'software architecture', 'distributed systems', 'scalability', 'Kubernetes', 'SOA'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The architectural style of a software system dictates its lifecycle, scalability, and the organizational structure of the teams building it. The industry has oscillated between the simplicity of Monolithic architectures and the distributed agility of Microservices.
          </p>
          <img src="https://placehold.co/800x400?text=Monolith+vs+Microservices" alt="Diagram showing single block vs distributed services" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="Monolith vs Microservices"
              description="Unity vs Distribution"
              personaA={{
                name: "The Monolith Defender",
                role: "Senior Engineer",
                color: "red",
              }}
              personaB={{
                name: "The Microservices Evangelist",
                role: "Cloud Architect",
                color: "indigo",
              }}
              intro="One repo to rule them all, or a thousand repos blooming?"
              turns={[
                {
                  speaker: "A",
                  text: "Stop over-engineering! A modular monolith is faster to build, easier to test, and trivial to deploy. No network latency between function calls.",
                  topic: "Simplicity"
                },
                {
                  speaker: "B",
                  text: "Until you scale. Then your build takes an hour, and a bug in the billing module crashes the entire site. Microservices let teams deploy independently.",
                  topic: "Decoupling"
                },
                {
                  speaker: "A",
                  text: "But you're trading code complexity for operational complexity. Now I need service discovery, distributed tracing, circuit breakers... It's a nightmare.",
                  topic: "Complexity"
                },
                {
                  speaker: "B",
                  text: "That's the price of scale. Netflix and Uber didn't get there with a monolith. We can scale the hot services and leave the rest. It aligns with Conway's Law.",
                  topic: "Scale"
                }
              ]}
              conclusion="Start with a Monolith. Extract Microservices only when the organizational or scaling pain becomes unbearable."
              winner="Monolith First"
            />
        </div>
      )
    },
    {
      id: 'historical-evolution',
      title: '3. Historical Evolution',
      content: (
        <>
           <p>From Mainframes (Monoliths) to SOA (Service Oriented Architecture) in the 2000s, to Microservices in the 2010s driven by Cloud and Containers.</p>
           <img src="https://placehold.co/800x400?text=Architecture+Evolution" alt="Timeline of software architecture" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations',
      content: (
        <>
           <p><strong>Coupling and Cohesion:</strong> Monoliths aim for high cohesion but risk high coupling. Microservices enforce loose coupling via network boundaries.</p>
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture',
      content: (
        <>
           <p><strong>Monolith:</strong> Single process, shared database.</p>
           <p><strong>Microservices:</strong> Many processes, database-per-service pattern.</p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software Implications',
      content: (
        <>
           <p><strong>Conway&apos;s Law:</strong> &quot;Organizations design systems that mirror their communication structure.&quot; Microservices enable autonomous two-pizza teams.</p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p>Monoliths have zero network latency for internal calls. Microservices incur network hops, serialization costs, and consistency delays.</p>
           <img src="https://placehold.co/800x400?text=Latency+Analysis" alt="Graph showing network overhead" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Economic Factors',
      content: (
        <>
           <p>Microservices increase infrastructure costs (more servers, load balancers) and devops salaries but accelerate feature delivery (Time to Market).</p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability and Security',
      content: (
        <>
           <p><strong>Blast Radius:</strong> A crash in a microservice is contained. A crash in a monolith kills everything.</p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications',
      content: (
        <>
           <p><strong>Monolith:</strong> Startups, CRUD apps, Admin tools.</p>
           <p><strong>Microservices:</strong> E-commerce platforms, Social Networks, Streaming.</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>Amazon:</strong> Famous internal mandate for service interfaces transformed them into the AWS platform.</p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6">
              <li><strong>Monolith:</strong> Simple, fast dev initially. Hard to maintain later.</li>
              <li><strong>Microservices:</strong> Scalable, independent deployment. Operationally complex.</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p><strong>Serverless:</strong> Functions as a Service (FaaS) is the extreme decomposition of microservices.</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical Impact',
      content: (
        <>
           <p>Distributed systems complexity can lead to unmaintainable &quot;ghost&quot; services.</p>
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
                <th className="p-4 text-purple-400">Monolith</th>
                <th className="p-4 text-blue-400">Microservices</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
               <tr>
                <td className="p-4 font-semibold text-slate-300">Deployment</td>
                <td className="p-4">All-at-once</td>
                <td className="p-4">Independent</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Database</td>
                <td className="p-4">Shared</td>
                <td className="p-4">Isolated per service</td>
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
           <p>Start with a Monolith. Extract Microservices only when the organizational or scaling pain becomes unbearable.</p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Monolithic vs Microservices Architecture"
      topicA="Monolithic Architecture"
      topicB="Microservices Architecture"
      abstract="A strategic evaluation of software architecture patterns. This monograph analyzes the inflection point where the benefits of distributed microservices outweigh the operational complexity costs of abandoning the monolith."
      sections={sections}
    />
  );
}
