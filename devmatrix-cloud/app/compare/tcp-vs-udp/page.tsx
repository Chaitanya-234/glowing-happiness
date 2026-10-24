import AcademicComparison, { Section } from '@/components/AcademicComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TCP vs UDP: Transport Layer Protocols | DevMetrix',
  description: 'An academic comparison of Transmission Control Protocol (TCP) and User Datagram Protocol (UDP).',
  keywords: ['TCP vs UDP', 'transport layer', 'reliable delivery', 'packet loss', 'three-way handshake', 'socket programming'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The Transport Layer (Layer 4) of the OSI model is responsible for end-to-end communication. The two dominant protocols, TCP and UDP, represent opposing philosophies: reliability at the cost of speed (TCP) versus speed at the cost of reliability (UDP).
          </p>
          <p>
            <strong>Research Objectives:</strong> This study dissects the internal mechanisms of flow control, congestion avoidance, and connection management to understand when to use which protocol.
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
             Originally, the Internet Protocol (IP) and TCP were one monolithic protocol. They were split in 1978 by Cerf and Kahn to allow for a datagram mode (UDP) for applications like voice packetization where reliability wasn't needed, but speed was.
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
              <strong>Connection-Oriented vs Connectionless:</strong>
              <br/>TCP is like a phone call: Hello? (SYN), Hello! (SYN-ACK), OK (ACK). A circuit is logically established.
              <br/>UDP is like sending a letter: You drop it in the box. You don&apos;t know if it arrived unless they write back.
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
              <strong>State Management:</strong> Routers and Firewalls must track the state of every TCP connection (Stateful Inspection), consuming RAM and CPU. UDP is stateless, requiring less overhead on intermediate devices (though NAT still tracks it).
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
              <strong>TCP Head-of-Line Blocking:</strong> If packet 2 is lost, packet 3 waits in the buffer until 2 is retransmitted. The application sees a pause.
           </p>
           <p>
              <strong>UDP Programming:</strong> The developer must handle ordering and reliability manually if needed (e.g., implementing a custom sequence number).
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
              <strong>Overhead:</strong> TCP header is min 20 bytes. UDP header is fixed 8 bytes. TCP requires a 3-way handshake (1.5 RTT) before sending data. UDP sends data immediately (0 RTT).
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
              Bandwidth costs are similar, but UDP can be more efficient for streaming (no retransmissions of old frames that are no longer relevant).
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
              <strong>DDoS Amplification:</strong> UDP is spoofable (no handshake). Attackers can spoof the source IP and ask a DNS server (UDP) for a large record, amplifying the attack traffic towards a victim. TCP requires a handshake, making spoofing harder.
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
              <li><strong>TCP:</strong> Web (HTTP/HTTPS), Email (SMTP), File Transfer (FTP), SSH. Anything where data corruption is unacceptable.</li>
              <li><strong>UDP:</strong> DNS, DHCP, VoIP, Video Streaming, Online Gaming (FPS). Anything where "real-time" is more important than "perfect".</li>
           </ul>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '10. Case Studies',
      content: (
        <>
           <h3 className="text-white font-bold mb-2">Case Study: QUIC (HTTP/3)</h3>
           <p>
              Google realized TCP was too slow for the modern web (Head-of-Line blocking). They built QUIC on top of UDP to get the speed of UDP with the reliability of TCP implemented in userspace. This is now HTTP/3.
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
                <h4 className="text-lg font-bold text-purple-400 mb-4">TCP Advantages</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Guaranteed delivery.</li>
                    <li>Ordered delivery.</li>
                    <li>Congestion control (friendliness).</li>
                </ul>
             </div>
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400 mb-4">UDP Advantages</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Lowest latency.</li>
                    <li>Low overhead.</li>
                    <li>Broadcast/Multicast support.</li>
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
              The future is moving towards <strong>UDP-based reliable protocols</strong> (like QUIC). We are bypassing the OS kernel's TCP stack to gain flexibility and speed in userspace.
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
              Inefficient TCP congestion control (like CUBIC vs BBR) can lead to bufferbloat in routers, wasting energy and degrading internet quality for everyone.
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
                <th className="p-4 text-purple-400">TCP</th>
                <th className="p-4 text-blue-400">UDP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Type</td>
                <td className="p-4">Connection-Oriented</td>
                <td className="p-4">Connectionless</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Reliability</td>
                <td className="p-4">High (ACKs, Retries)</td>
                <td className="p-4">Low (Best Effort)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Ordering</td>
                <td className="p-4">Guaranteed</td>
                <td className="p-4">None</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Speed</td>
                <td className="p-4">Slower</td>
                <td className="p-4">Faster</td>
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
              The choice is simple: If the data must arrive intact (File, Web, Email), use TCP. If the data must arrive *now* (Voice, Video, Game), use UDP.
           </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="TCP vs UDP Protocol"
      topicA="TCP (Transmission Control Protocol)"
      topicB="UDP (User Datagram Protocol)"
      abstract="A rigorous analysis of transport layer dynamics. This monograph contrasts the reliable, stateful nature of TCP with the lightweight, stateless nature of UDP, providing the theoretical basis for modern network application design."
      sections={sections}
    />
  );
}
