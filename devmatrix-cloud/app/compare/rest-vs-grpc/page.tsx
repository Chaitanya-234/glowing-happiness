import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'REST vs gRPC: API Architectural Styles Compared | DevMetrix',
  description: 'A technical comparison of Representational State Transfer (REST) and Google Remote Procedure Call (gRPC) for microservices communication.',
  keywords: ['REST', 'gRPC', 'API design', 'microservices', 'protobuf', 'JSON', 'HTTP/2'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            In distributed systems, the communication protocol between services defines the performance, scalability, and maintainability of the entire architecture. For over a decade, REST (Representational State Transfer) over HTTP/1.1 with JSON payloads has been the de facto standard. However, the demands of high-throughput microservices have propelled gRPC (gRPC Remote Procedure Calls) into the spotlight.
          </p>
          <img src="https://placehold.co/800x400?text=API+Communication+Models" alt="Diagram showing REST vs gRPC communication flow" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="REST vs gRPC"
              description="Universal vs Specialized"
              personaA={{
                name: "The Web Purist",
                role: "Frontend Lead",
                color: "pink",
              }}
              personaB={{
                name: "The Systems Engineer",
                role: "Backend Architect",
                color: "cyan",
              }}
              intro="Human-readable JSON meets binary efficiency in the API arena."
              turns={[
                {
                  speaker: "A",
                  text: "REST is the language of the web. I can curl an endpoint and see exactly what's happening. JSON is universal. Debugging is trivial.",
                  topic: "Usability"
                },
                {
                  speaker: "B",
                  text: "And parsing that JSON burns CPU cycles. Text-based protocols are inefficient. gRPC uses Protobuf—binary serialization that is 10x smaller and faster.",
                  topic: "Performance"
                },
                {
                  speaker: "A",
                  text: "But browser support for gRPC is still clunky. You need proxies. With REST, I have caching, statelessness, and standard HTTP verbs out of the box.",
                  topic: "Compatibility"
                },
                {
                  speaker: "B",
                  text: "Valid points for public APIs. But for internal microservices? gRPC gives me strong typing, code generation, and HTTP/2 multiplexing for free. It's type-safe across languages.",
                  topic: "Internal Comms"
                }
              ]}
              conclusion="REST remains the king of public-facing and browser-based APIs, while gRPC is rapidly becoming the standard for internal service-to-service communication."
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
           <p><strong>REST (2000):</strong> Defined by Roy Fielding, it aligned API design with the architecture of the web (URI resources, statelessness).</p>
           <p><strong>gRPC (2015):</strong> Created by Google to handle their massive internal traffic efficiently, based on their internal Stubby protocol.</p>
           <img src="https://placehold.co/800x400?text=Protocol+Evolution" alt="Timeline of API protocols" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations',
      content: (
        <>
           <p><strong>Resource vs Action:</strong> REST is resource-oriented (GET /users/1). gRPC is action-oriented (DeleteUser(1)).</p>
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture',
      content: (
        <>
           <p><strong>REST:</strong> Relies on HTTP/1.1 (usually), text-based headers, and stateless requests.</p>
           <p><strong>gRPC:</strong> Built on HTTP/2. Supports bidirectional streaming, multiplexing, and header compression.</p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software Implications',
      content: (
        <>
           <p><strong>Code Generation:</strong> gRPC uses `.proto` files to auto-generate client and server stubs in 10+ languages. REST requires manual client creation or tools like Swagger/OpenAPI.</p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p><strong>Throughput:</strong> gRPC is 7-10x faster than REST for internal calls due to Protobuf serialization.</p>
           <img src="https://placehold.co/800x400?text=Performance+Benchmarks" alt="Bar chart of REST vs gRPC throughput" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Economic Factors',
      content: (
        <>
           <p>Reduced bandwidth and CPU usage with gRPC directly translates to lower cloud infrastructure bills for high-scale systems.</p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability and Security',
      content: (
        <>
           <p>Both use TLS. gRPC has stricter contract enforcement (Type Safety) reducing runtime errors.</p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications',
      content: (
        <>
           <p><strong>REST:</strong> Public APIs (Stripe, Twitter), Browser apps.</p>
           <p><strong>gRPC:</strong> Microservices mesh (Istio), IoT devices, Real-time streaming.</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>Netflix:</strong> Uses gRPC for inter-service communication to reduce latency.</p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6">
              <li><strong>REST:</strong> Easy to debug, universal. Slower, verbose.</li>
              <li><strong>gRPC:</strong> Fast, type-safe. Harder to debug (binary), requires proxy for web.</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p>gRPC-Web and HTTP/3 support will likely bridge the gap for browser support.</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical Impact',
      content: (
        <>
           <p>Efficient protocols reduce the carbon footprint of the internet.</p>
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
                <th className="p-4 text-purple-400">REST</th>
                <th className="p-4 text-blue-400">gRPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
               <tr>
                <td className="p-4 font-semibold text-slate-300">Protocol</td>
                <td className="p-4">HTTP/1.1</td>
                <td className="p-4">HTTP/2</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Format</td>
                <td className="p-4">JSON (Text)</td>
                <td className="p-4">Protobuf (Binary)</td>
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
           <p>Use REST for the edge (User to Cloud). Use gRPC for the center (Service to Service).</p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="REST vs gRPC Architecture"
      topicA="REST (JSON over HTTP/1.1)"
      topicB="gRPC (Protobuf over HTTP/2)"
      abstract="An analysis of the two dominant API paradigms. This paper contrasts the flexibility and ubiquity of REST with the performance and strict contracting of gRPC."
      sections={sections}
    />
  );
}
