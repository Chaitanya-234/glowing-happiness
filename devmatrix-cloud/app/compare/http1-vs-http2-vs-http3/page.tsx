import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3: The Evolution of Web Protocols | DevMetrix',
  description: 'A comprehensive comparison of the HTTP protocol evolution. Analyzing text vs binary framing, TCP vs QUIC (UDP), and the impact on web performance.',
  keywords: ['HTTP', 'HTTP/2', 'HTTP/3', 'QUIC', 'TCP', 'UDP', 'web performance', 'networking'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The Hypertext Transfer Protocol (HTTP) is the nervous system of the World Wide Web. For nearly two decades, HTTP/1.1 served as the foundation. However, the complexity of modern web applications—requiring hundreds of resources per page—exposed its limitations, driving the development of HTTP/2 and subsequently HTTP/3 (QUIC).
          </p>
          <img src="https://placehold.co/800x400?text=HTTP+Protocol+Versions" alt="Diagram showing HTTP version stack" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="TCP vs UDP (QUIC)"
              description="Reliability vs Speed"
              personaA={{
                name: "The TCP Traditionalist",
                role: "Network Engineer",
                color: "blue",
              }}
              personaB={{
                name: "The QUIC Radical",
                role: "Protocol Designer",
                color: "red",
              }}
              intro="The 40-year reign of TCP is challenged by a UDP-based upstart."
              turns={[
                {
                  speaker: "A",
                  text: "TCP is the backbone of the internet. It guarantees order and delivery. We built the world on it. Why replace it with UDP? UDP is for gaming and streaming, not banking.",
                  topic: "Reliability"
                },
                {
                  speaker: "B",
                  text: "TCP has Head-of-Line (HOL) blocking. One lost packet delays *everything*. HTTP/2 multiplexed streams, but TCP didn't know about them. If one packet drops, all streams pause.",
                  topic: "HOL Blocking"
                },
                {
                  speaker: "A",
                  text: "So you reinvent TCP on top of UDP? That sounds like user-space complexity.",
                  topic: "Complexity"
                },
                {
                  speaker: "B",
                  text: "Exactly! QUIC moves congestion control to user space. We can iterate faster than OS kernel updates. Plus, 0-RTT handshakes mean instant connections.",
                  topic: "Innovation"
                }
              ]}
              conclusion="HTTP/3 (QUIC) solves the transport-layer bottlenecks that HTTP/2 couldn't, marking the biggest shift in web networking since 1999."
              winner="HTTP/3 (Eventually)"
            />
        </div>
      )
    },
    {
      id: 'historical-evolution',
      title: '3. Historical Evolution',
      content: (
        <>
           <p><strong>HTTP/1.1 (1997):</strong> Standardized connections. <strong>HTTP/2 (2015):</strong> Introduced Multiplexing (SPDY). <strong>HTTP/3 (2022):</strong> Moved to UDP (QUIC).</p>
           <img src="https://placehold.co/800x400?text=Web+Protocol+Timeline" alt="Timeline of HTTP versions" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations',
      content: (
        <>
           <p><strong>Transport Layer:</strong> HTTP/1 & 2 rely on TCP (ordered, reliable). HTTP/3 relies on UDP (unordered, unreliable) but implements reliability in the application layer (QUIC).</p>
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture',
      content: (
        <>
           <p><strong>Multiplexing:</strong> HTTP/2 allows multiple requests over one connection. HTTP/3 does too, but without TCP HOL blocking.</p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software Implications',
      content: (
        <>
           <p>Servers (Nginx, Apache) need updates to support UDP listeners for HTTP/3.</p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p><strong>Handshake:</strong> HTTP/3 supports 0-RTT (Zero Round Trip Time) resumption, making connections instant.</p>
           <img src="https://placehold.co/800x400?text=Connection+Setup+Time" alt="Bar chart of handshake latency" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Economic Factors',
      content: (
        <>
           <p>Faster mobile sites lead to higher e-commerce conversion rates.</p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability and Security',
      content: (
        <>
           <p>HTTP/3 encrypts everything, including packet metadata, preventing middlebox interference.</p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications',
      content: (
        <>
           <p><strong>Use Cases:</strong> Mobile apps, Video streaming, Real-time collaboration.</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>Google & Facebook:</strong> Saw significant latency reduction on mobile networks with QUIC.</p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6">
              <li><strong>HTTP/2:</strong> Widely supported. Suffer from TCP HOL blocking.</li>
              <li><strong>HTTP/3:</strong> No blocking, fast roaming. High CPU usage (UDP handling).</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p>QUIC will likely become the transport for non-HTTP protocols too.</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical Impact',
      content: (
        <>
           <p>Better performance for users on slow/unstable networks (Developing nations).</p>
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
                <th className="p-4 text-purple-400">HTTP/2</th>
                <th className="p-4 text-blue-400">HTTP/3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
               <tr>
                <td className="p-4 font-semibold text-slate-300">Transport</td>
                <td className="p-4">TCP</td>
                <td className="p-4">UDP (QUIC)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Encryption</td>
                <td className="p-4">TLS 1.2+</td>
                <td className="p-4">TLS 1.3 (Baked in)</td>
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
           <p>HTTP/3 is the reliable UDP we always wanted. It fixes the last major bottleneck of the web.</p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="HTTP/1.1 vs HTTP/2 vs HTTP/3"
      topicA="HTTP/1.1 (TCP Text)"
      topicB="HTTP/3 (QUIC UDP)"
      abstract="A rigorous analysis of web transport protocols. This monograph details the architectural limitations of TCP that led to the development of QUIC, and compares the performance characteristics of the three generations of HTTP."
      sections={sections}
    />
  );
}
