import AcademicComparison, { Section } from '@/components/AcademicComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud Computing vs Edge Computing: Distributed Systems Analysis | DevMetrix',
  description: 'An academic comparison of centralized Cloud Computing versus distributed Edge Computing architectures.',
  keywords: ['Cloud vs Edge', 'distributed systems', 'latency', 'bandwidth', 'IoT', 'cloud architecture'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The paradigm of computing has oscillated between centralization and decentralization throughout history. From mainframes to personal computers, back to the cloud, and now shifting towards the edge. The comparison between Cloud Computing and Edge Computing represents the current frontier of this oscillation in distributed systems architecture.
          </p>
          <p>
             <strong>Research Objectives:</strong> This study aims to quantify the trade-offs between processing data centrally (Cloud) versus processing data at the source (Edge). We will explore metrics such as latency, bandwidth consumption, privacy, and reliability.
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
             <strong>Cloud Computing (2006-Present):</strong> Popularized by Amazon Web Services (AWS), the cloud model offered &quot;utility computing&quot;—unlimited resources on demand. It centralized computation in massive datacenters, benefiting from economies of scale.
           </p>
           <p>
             <strong>Edge Computing (2015-Present):</strong> As IoT devices proliferated, sending all data to the cloud became impractical due to bandwidth constraints and speed-of-light latency limitations. Edge computing emerged to bring computation closer to the data source.
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
              <strong>The Latency Equation:</strong> <code>Total Latency = Transmission Delay + Propagation Delay + Processing Delay + Queuing Delay</code>.
           </p>
           <p>
              Cloud computing suffers from high propagation delay (distance to datacenter) and varying transmission delay (internet congestion). Edge computing minimizes propagation delay by placing servers physically close (e.g., cell towers, on-premise gateways).
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
              <strong>Cloud Architecture:</strong> Homogeneous, massive scale. Racks of standardized servers, specialized cooling, redundant power. Uses virtualization and containers (Kubernetes) to abstract hardware.
           </p>
           <p>
              <strong>Edge Architecture:</strong> Heterogeneous, constrained. Devices range from Raspberry Pis to ruggedized gateways and micro-datacenters. Power and cooling are often limited. Hardware accelerators (TPUs, VPUs) are crucial for performance per watt.
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
              Developing for the Edge introduces the challenge of <strong>orchestration</strong>. Deploying updates to 10,000 distributed edge nodes is significantly harder than updating a centralized cloud service.
           </p>
           <p>
              Technologies like WebAssembly (Wasm) and lightweight Kubernetes (K3s) are pivotal in enabling portable, secure code execution on constrained edge devices.
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
              <strong>Latency:</strong> Edge offers single-digit millisecond latency (critical for AR/VR, industrial automation). Cloud latency is typically 50-100ms+.
           </p>
           <p>
              <strong>Compute Power:</strong> Cloud offers effectively infinite elasticity. Edge is resource-constrained; heavy training workloads (AI) usually happen in the Cloud, while inference happens at the Edge.
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
              <strong>Bandwidth Cost:</strong> Transmitting terabytes of raw sensor data to the cloud is expensive. Edge computing filters/compresses data locally, reducing uplink costs significantly.
           </p>
           <p>
              <strong>CAPEX vs OPEX:</strong> Cloud is OPEX (pay-as-you-go). Edge often involves CAPEX (buying and installing hardware), though &quot;Edge-as-a-Service&quot; is emerging.
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
              <strong>Privacy:</strong> Edge is superior for privacy (e.g., analyzing video streams locally without sending footage to the cloud).
           </p>
           <p>
              <strong>Security:</strong> Physical security is a risk at the Edge (devices can be stolen/tampered with). Cloud datacenters are fortresses.
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
              <li><strong>Cloud:</strong> Big Data analytics, archival storage, training large AI models, web hosting, SaaS applications.</li>
              <li><strong>Edge:</strong> Autonomous vehicles (split-second decisions), Industrial IoT (predictive maintenance), Smart Cities (traffic control), Remote healthcare.</li>
           </ul>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '10. Case Studies',
      content: (
        <>
           <h3 className="text-white font-bold mb-2">Case Study: Chick-fil-A Edge Computing</h3>
           <p>
              Chick-fil-A deploys Kubernetes clusters in every restaurant (Edge) to process data locally, ensuring operations continue even if the internet connection goes down. This hybrid approach ensures high availability and low latency for kitchen operations.
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
                <h4 className="text-lg font-bold text-purple-400 mb-4">Cloud Advantages</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Unlimited scalability.</li>
                    <li>No hardware maintenance.</li>
                    <li>Centralized management.</li>
                </ul>
             </div>
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400 mb-4">Edge Advantages</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Low latency.</li>
                    <li>Bandwidth efficiency.</li>
                    <li>Data sovereignty/privacy.</li>
                    <li>Offline operation.</li>
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
              <strong>Fog Computing:</strong> An intermediate layer between Edge and Cloud.
           </p>
           <p>
              <strong>5G MEC (Multi-access Edge Computing):</strong> Telcos are placing compute resources directly at base stations, providing ultra-low latency without on-premise hardware.
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
              Edge computing can reduce the carbon footprint of the internet by reducing the amount of data traversing the global backbone network. However, the proliferation of billions of edge devices creates an e-waste challenge.
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
                <th className="p-4 text-purple-400">Cloud Computing</th>
                <th className="p-4 text-blue-400">Edge Computing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Location</td>
                <td className="p-4">Centralized Datacenters</td>
                <td className="p-4">Distributed (Near Source)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Latency</td>
                <td className="p-4">High (variable)</td>
                <td className="p-4">Low (deterministic)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Bandwidth Cost</td>
                <td className="p-4">High</td>
                <td className="p-4">Low</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Scalability</td>
                <td className="p-4">Vertical & Horizontal (Easy)</td>
                <td className="p-4">Horizontal (Complex)</td>
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
              Cloud and Edge are not mutually exclusive; they form a continuum. The <strong>&quot;Cloud-to-Edge Continuum&quot;</strong> is the future architecture where workloads dynamically migrate based on requirements.
           </p>
           <p>
              Engineers must design systems that are &quot;Edge-Native&quot;—capable of running autonomously at the edge while leveraging the cloud for global aggregation and heavy lifting.
           </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Cloud vs Edge Computing"
      topicA="Cloud Computing"
      topicB="Edge Computing"
      abstract="A strategic analysis of where computation should reside. This monograph explores the shift from centralized cloud architectures to distributed edge systems, driven by the needs of IoT, AI, and 5G networks."
      sections={sections}
    />
  );
}
