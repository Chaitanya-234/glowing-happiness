import AcademicComparison, { Section } from '@/components/AcademicComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wired vs Wireless Networks: Reliability vs Mobility | DevMetrix',
  description: 'An academic comparison of Wired (Ethernet/Fiber) and Wireless (Wi-Fi/Cellular) networking technologies.',
  keywords: ['Wired vs Wireless', 'Ethernet vs Wi-Fi', 'network security', 'bandwidth', 'latency', '5G vs Fiber'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The medium of data transmission defines the limitations and capabilities of any network. The choice between physical copper/fiber cables (Wired) and radio frequency waves (Wireless) is a trade-off between stability/speed and flexibility/mobility.
          </p>
          <p>
            <strong>Research Objectives:</strong> This study evaluates the physical layer differences, protocol overheads, and practical deployment scenarios of wired versus wireless communication.
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
             <strong>Wired:</strong> Began with the Telegraph, evolved to Coaxial (Ethernet), Twisted Pair (Cat5/6), and Optical Fiber. The trajectory has been &quot;More Speed, More Shielding.&quot;
           </p>
           <p>
             <strong>Wireless:</strong> Began with ALOHAnet (1971), evolved to 802.11 (Wi-Fi) and Cellular (1G to 5G). The trajectory has been &quot;More Spectrum, Better Modulation.&quot;
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
              <strong>Shannon-Hartley Theorem:</strong> <code>C = B * log2(1 + S/N)</code>.
           </p>
           <p>
              Wired networks (Fiber) have immense Bandwidth (B) and very high Signal-to-Noise ratio (S/N) because the medium is shielded. Wireless networks share a limited spectrum (B) and suffer from interference (low S/N), limiting their theoretical capacity compared to wired.
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
              <strong>Wired:</strong> Switches, Routers, Patch Panels. Physical ports are the limiting factor. Dedicated collision domains (in full-duplex switched networks).
           </p>
           <p>
              <strong>Wireless:</strong> Access Points, Antennas (MIMO). The air is a shared medium (Half-Duplex). Only one device can transmit on a frequency at a time (CSMA/CA), leading to contention.
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
              Network protocols (TCP/IP) are agnostic, but the physical layer behavior affects them. Wireless packet loss is often due to interference, but TCP interprets it as congestion, throttling the speed aggressively. TCP algorithms (like BBR) are designed to handle this &quot;lossy&quot; nature better.
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
              <strong>Latency:</strong> Wired (Fiber) is limited only by the speed of light in glass (~200,000 km/s) and router processing. Wireless adds modulation/demodulation latency and air-interface scheduling latency.
           </p>
           <p>
              <strong>Stability:</strong> Wired is deterministic. Wireless is stochastic (affected by walls, microwaves, weather).
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
              <strong>Installation:</strong> Wired requires pulling cable through walls/ceilings (labor expensive). Wireless requires just mounting APs (labor cheap).
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
              <strong>Security:</strong> Wired requires physical access to tap. Wireless bleeds signal outside the building; anyone in the parking lot can try to crack WPA3.
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
              <li><strong>Wired:</strong> Data Centers (100GbE/400GbE), Desktop Gaming, Financial Trading, Backbone Infrastructure.</li>
              <li><strong>Wireless:</strong> Mobile Phones, Laptops in Cafes, IoT Sensors, Guest Networks.</li>
           </ul>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '10. Case Studies',
      content: (
        <>
           <h3 className="text-white font-bold mb-2">Case Study: Esports Tournaments</h3>
           <p>
              Professional gaming tournaments strictly use Wired connections for players. A 5ms jitter spike on Wi-Fi can cost a team millions in prize money. Wireless is strictly for spectators.
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
                <h4 className="text-lg font-bold text-purple-400 mb-4">Wired Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Maximum speed and throughput.</li>
                    <li>Lowest latency and jitter.</li>
                    <li>Higher security (physical containment).</li>
                    <li>No interference issues.</li>
                </ul>
             </div>
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400 mb-4">Wireless Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Mobility and roaming.</li>
                    <li>Lower deployment cost (no cabling).</li>
                    <li>Scalability for many devices (IoT).</li>
                    <li>Clean aesthetics.</li>
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
              <strong>Wi-Fi 7 and 6G:</strong> Aiming to reduce latency and increase deterministic behavior to rival wired connections.
           </p>
           <p>
              <strong>Li-Fi:</strong> Using light (LEDs) to transmit data wireless but within a contained room, combining wireless convenience with wired-like security/speed.
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
              <strong>Digital Divide:</strong> Wireless (Satellite/5G) is the only viable way to connect rural areas where laying fiber is economically impossible.
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
                <th className="p-4 text-purple-400">Wired Networks</th>
                <th className="p-4 text-blue-400">Wireless Networks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Medium</td>
                <td className="p-4">Copper / Glass</td>
                <td className="p-4">Radio Waves (RF)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Duplex</td>
                <td className="p-4">Full Duplex (Simultaneous Tx/Rx)</td>
                <td className="p-4">Half Duplex (Shared Medium)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Reliability</td>
                <td className="p-4">High (99.999%)</td>
                <td className="p-4">Variable (Environment dependent)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Security</td>
                <td className="p-4">Physical access required</td>
                <td className="p-4">Encryption required (WPA3)</td>
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
              <strong>The Law of Physics:</strong> A dedicated wire will always outperform a shared medium. Wired is for the core, the critical, and the stationary. Wireless is for the edge, the mobile, and the massive.
           </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Wired vs Wireless Networks"
      topicA="Wired Networks (Ethernet/Fiber)"
      topicB="Wireless Networks (Wi-Fi/Cellular)"
      abstract="A technical analysis of the physical layer. This monograph compares the stability and speed of guided media (wired) against the flexibility and mobility of unguided media (wireless), discussing the Shannon capacity limits of both."
      sections={sections}
    />
  );
}
