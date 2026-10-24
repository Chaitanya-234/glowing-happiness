import AcademicComparison, { Section } from '@/components/AcademicComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Source vs Proprietary Hardware | DevMetrix',
  description: 'An academic comparison of Open Source Hardware (OSH) and Proprietary Hardware ecosystems.',
  keywords: ['Open Source Hardware', 'Proprietary Hardware', 'RISC-V', 'Arduino', 'hardware licensing', 'right to repair'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The philosophy of &quot;Open Source,&quot; originally applied to software, has permeated the hardware world. This comparison evaluates the dichotomy between Open Source Hardware (OSH)—where design schematics and BOMs are public—and Proprietary Hardware, where designs are trade secrets protected by patents.
          </p>
          <p>
            <strong>Research Objectives:</strong> This study analyzes the economic, innovation, and security implications of democratizing hardware design versus maintaining closed, vertical integration.
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
             <strong>Proprietary:</strong> The norm since the dawn of electronics. Companies like IBM, Intel, and Apple protect their R&D investments through secrecy and patents.
           </p>
           <p>
             <strong>Open Source:</strong> Gained momentum with the Arduino project (2005) and RepRap (3D printers). The launch of the RISC-V ISA (2010) marked the arrival of &quot;Linux for Chips.&quot;
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
              <strong>Intellectual Property (IP):</strong>
           </p>
           <ul className="list-disc pl-6 space-y-2">
             <li><strong>Proprietary:</strong> Restrictive licenses. Reverse engineering is often illegal (DMCA).</li>
             <li><strong>OSH:</strong> Permissive licenses (CERN OHL, TAPR OHL). &quot;Copyleft&quot; principles apply to atoms, not just bits.</li>
           </ul>
        </>
      )
    },
    {
      id: 'hardware-architecture',
      title: '4. Hardware Architecture Comparison',
      content: (
        <>
           <p>
              <strong>Modularity:</strong> OSH encourages modularity and standardization (e.g., standard headers on Raspberry Pi). Proprietary hardware often uses custom connectors and form factors to enforce vendor lock-in (e.g., Apple Lightning).
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
              <strong>Drivers:</strong> Proprietary hardware often requires binary blobs (closed-source drivers), which can become obsolete when the vendor stops support. OSH typically uses open drivers, ensuring long-term software support (e.g., in the Linux kernel).
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
              Currently, the highest performance hardware (NVIDIA H100, Apple M2) is strictly proprietary. The R&D budget required for 3nm lithography design is currently beyond the reach of community-driven OSH projects. OSH dominates in the "Good Enough" and "Low Cost" sectors.
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
              <strong>Business Models:</strong>
              <br/>Proprietary: Sell hardware at premium margin.
              <br/>OSH: Sell hardware at commodity prices; monetize support, customization, or services (e.g., Red Hat model applied to hardware).
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
              <strong>Kerckhoffs&apos;s Principle:</strong> &quot;A cryptosystem should be secure even if everything about the system, except the key, is public knowledge.&quot;
           </p>
           <p>
              OSH allows for independent security audits (&quot;Many eyes make all bugs shallow&quot;). Proprietary hardware relies on &quot;Security by Obscurity,&quot; which often fails (e.g., Intel Management Engine vulnerabilities).
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
              <li><strong>Proprietary:</strong> High-end Consumer Electronics, Defense Systems, Cutting-edge Semiconductors.</li>
              <li><strong>OSH:</strong> Education, Maker Community, Scientific Research Equipment, Secure Enclaves (Google Titan).</li>
           </ul>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '10. Case Studies',
      content: (
        <>
           <h3 className="text-white font-bold mb-2">Case Study: RISC-V vs ARM</h3>
           <p>
              ARM is proprietary IP; you pay a royalty for every chip. RISC-V is an open standard. Companies like Western Digital shifted to RISC-V to avoid royalties and gain the freedom to optimize the cores for their storage controllers without asking for permission.
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
                <h4 className="text-lg font-bold text-purple-400 mb-4">Open Source Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Transparency and trust.</li>
                    <li>No vendor lock-in.</li>
                    <li>Community innovation.</li>
                    <li>Long-term maintainability.</li>
                </ul>
             </div>
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400 mb-4">Proprietary Pros</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Peak performance (R&D funding).</li>
                    <li>Integrated user experience (Apple ecosystem).</li>
                    <li>Guaranteed support/warranty.</li>
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
              <strong>Open Silicon:</strong> Projects like OpenLane and SkyWater PDK are making the actual manufacturing of chips (not just the design) accessible to open source, though typical nodes are older (130nm).
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
              <strong>Right to Repair:</strong> OSH is the gold standard for repairability. Schematics are available, parts are standard. Proprietary hardware often actively fights repair (serialization of parts). OSH reduces e-waste by extending device life.
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
                <th className="p-4 text-purple-400">Open Source Hardware</th>
                <th className="p-4 text-blue-400">Proprietary Hardware</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Design Files</td>
                <td className="p-4">Public (GitHub/GitLab)</td>
                <td className="p-4">Private / Trade Secret</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Licensing</td>
                <td className="p-4">Permissive / Copyleft</td>
                <td className="p-4">Restrictive / NDA</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Repairability</td>
                <td className="p-4">High (User Serviceable)</td>
                <td className="p-4">Low (Vendor Only)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Innovation Model</td>
                <td className="p-4">Collaborative</td>
                <td className="p-4">Competitive</td>
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
              The industry needs both. Proprietary hardware pushes the envelope of what is physically possible through massive capital investment. Open source hardware ensures that the resulting technology remains accessible, trustworthy, and adaptable for the common good.
           </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Open Source vs Proprietary Hardware"
      topicA="Open Source Hardware (OSH)"
      topicB="Proprietary Hardware"
      abstract="An evaluation of the openness paradigm in physical engineering. This monograph contrasts the collaborative, transparent model of Open Source Hardware with the competitive, closed model of Proprietary Hardware, discussing innovation, security, and the right to repair."
      sections={sections}
    />
  );
}
