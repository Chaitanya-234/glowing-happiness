import AcademicComparison, { Section } from '@/components/AcademicComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IPv4 vs IPv6: The Evolution of Internet Addressing | DevMetrix',
  description: 'An academic comparison of Internet Protocol version 4 (IPv4) and version 6 (IPv6) in network engineering.',
  keywords: ['IPv4 vs IPv6', 'internet protocol', 'network addressing', 'subnetting', 'NAT', 'packet header'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The Internet Protocol (IP) is the lifeblood of the global network, providing the addressing scheme that allows billions of devices to communicate. The transition from the legacy IPv4 to the modern IPv6 is one of the most significant and protracted infrastructure upgrades in human history.
          </p>
          <p>
            <strong>Research Objectives:</strong> This study contrasts the limited, fragmented world of IPv4 with the abundant, streamlined world of IPv6, analyzing why the transition has taken decades.
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
             <strong>IPv4 (1981):</strong> Defined in RFC 791. It used 32-bit addresses, providing 4.3 billion unique IPs. In the 80s, this seemed infinite. By 2011, IANA officially ran out of free pools.
           </p>
           <p>
             <strong>IPv6 (1998):</strong> Defined in RFC 2460 to solve the exhaustion problem. It uses 128-bit addresses, providing 3.4 × 10^38 addresses—enough to assign an IP to every atom on Earth.
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
              <strong>Address Space:</strong>
              <br/>IPv4: <code>2^32</code>
              <br/>IPv6: <code>2^128</code>
           </p>
           <p>
              <strong>NAT (Network Address Translation):</strong> The &quot;hack&quot; that saved IPv4. It allows an entire home/office to hide behind a single public IP. IPv6 intends to restore the &quot;end-to-end&quot; principle where every device has a unique, globally reachable public IP (firewalled, of course).
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
              <strong>Router Processing:</strong> IPv4 headers are variable length (options field), requiring software processing or complex hardware parsing. IPv6 headers are fixed length (40 bytes), allowing for faster, more efficient hardware switching at terabit speeds.
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
              <strong>Socket Programming:</strong> Developers must write code that is address-family agnostic (using <code>getaddrinfo</code> instead of hardcoding IPv4 structs).
           </p>
           <p>
              <strong>SLAAC (Stateless Address Auto-Configuration):</strong> IPv6 allows devices to generate their own address upon connecting to a network, removing the absolute dependency on DHCP servers required in IPv4.
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
              <strong>Fragmentation:</strong> In IPv4, routers fragment packets if they exceed MTU, causing CPU load. In IPv6, routers do *not* fragment; the sender must perform Path MTU Discovery. This shifts the burden to the endpoints, speeding up the core network.
           </p>
           <p>
              <strong>Throughput:</strong> While IPv6 headers are larger (overhead), the elimination of NAT lookup tables can make IPv6 faster in carrier-grade networks.
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
              <strong>Market for IPs:</strong> A single IPv4 address now costs ~$50 on the open market. IPv6 addresses are effectively free. For a cloud provider (AWS), sticking with IPv4 is a massive cost; moving to IPv6 is a cost-saving measure.
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
              <strong>IPSec:</strong> Optional in IPv4 (bolted on), mandatory in IPv6 (though often not used).
           </p>
           <p>
              <strong>Scanning:</strong> Scanning the entire IPv4 internet takes minutes (ZMap). Scanning a single IPv6 subnet is mathematically impossible due to the vast size, offering a form of privacy against random scans.
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
              <li><strong>IPv4:</strong> Legacy corporate LANs, older IoT devices, gaming servers.</li>
              <li><strong>IPv6:</strong> Mobile Networks (LTE/5G are native IPv6), IoT/Sensor Networks (Matter protocol), Modern Cloud Infrastructure.</li>
           </ul>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '10. Case Studies',
      content: (
        <>
           <h3 className="text-white font-bold mb-2">Case Study: T-Mobile US</h3>
           <p>
              T-Mobile runs an IPv6-only network for millions of smartphones. When a user accesses an IPv4-only site (like GitHub), it uses DNS64/NAT64 translation. This proved that large-scale IPv6 is not only possible but operationally simpler than dual-stack.
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
                <h4 className="text-lg font-bold text-purple-400 mb-4">IPv4 Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Universal compatibility (100% of devices).</li>
                    <li>Human-readable addresses (192.168.1.1).</li>
                    <li>Mature tooling.</li>
                </ul>
             </div>
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400 mb-4">IPv6 Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Infinite address space.</li>
                    <li>No NAT issues (P2P works better).</li>
                    <li>Simplified routing headers.</li>
                    <li>Better multicast support.</li>
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
              <strong>IPv4 Sunset:</strong> Eventually, IPv4 will become a &quot;service&quot; running on top of IPv6 (IPv4-as-a-Service), rather than the native transport.
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
              The scarcity of IPv4 addresses favored early adopters (US universities/military). IPv6 levels the playing field, ensuring developing nations have equal access to addressing resources for their digital infrastructure.
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
                <th className="p-4 text-purple-400">IPv4</th>
                <th className="p-4 text-blue-400">IPv6</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Bits</td>
                <td className="p-4">32-bit</td>
                <td className="p-4">128-bit</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Format</td>
                <td className="p-4">Decimal (192.0.2.1)</td>
                <td className="p-4">Hexadecimal (2001:db8::1)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Header</td>
                <td className="p-4">Variable (20-60 bytes)</td>
                <td className="p-4">Fixed (40 bytes)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Config</td>
                <td className="p-4">DHCP or Static</td>
                <td className="p-4">SLAAC, DHCPv6, or Static</td>
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
              IPv6 is not just an upgrade; it is the necessary foundation for the next 50 years of the internet. While IPv4 will linger like COBOL, the future belongs to the 128-bit address space.
           </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="IPv4 vs IPv6 Protocol"
      topicA="IPv4 (Legacy)"
      topicB="IPv6 (Modern)"
      abstract="A comprehensive study of internet addressing. This monograph details the technical limitations of IPv4 that necessitated IPv6, analyzing the architectural improvements in routing, security, and configuration that the new standard brings."
      sections={sections}
    />
  );
}
