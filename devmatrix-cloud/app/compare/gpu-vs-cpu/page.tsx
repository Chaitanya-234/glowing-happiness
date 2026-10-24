import AcademicComparison, { Section } from '@/components/AcademicComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GPU vs CPU: Parallelism vs Serial Performance | DevMetrix',
  description: 'An academic comparison of Graphics Processing Units (GPUs) and Central Processing Units (CPUs) in modern computing.',
  keywords: ['GPU vs CPU', 'parallel computing', 'CUDA', 'SIMD', 'heterogeneous computing', 'AI hardware'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The distinction between the Central Processing Unit (CPU) and the Graphics Processing Unit (GPU) defines the landscape of modern high-performance computing. What began as a specialized accelerator for rendering pixels has evolved into the engine driving the Artificial Intelligence revolution.
          </p>
          <p>
            <strong>Research Objectives:</strong> This study analyzes the architectural divergence between latency-optimized cores (CPU) and throughput-optimized cores (GPU), exploring why GPUs are essential for deep learning and scientific simulation.
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
             <strong>CPU:</strong> Evolved from single-core scalar processors to multi-core superscalar designs. The focus has always been on executing complex sequential logic and handling OS interrupts efficiently.
           </p>
           <p>
             <strong>GPU:</strong> Started as fixed-function 3D accelerators (3dfx Voodoo, NVIDIA GeForce 256). The breakthrough came with &quot;programmable shaders&quot; and later NVIDIA&apos;s CUDA (2007), which exposed the GPU as a general-purpose parallel processor (GPGPU).
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
              <strong>Flynn&apos;s Taxonomy:</strong>
           </p>
           <ul className="list-disc pl-6 space-y-2">
             <li><strong>CPU:</strong> MIMD (Multiple Instruction, Multiple Data). Each core can run a different thread doing a different task.</li>
             <li><strong>GPU:</strong> SIMT (Single Instruction, Multiple Threads). Thousands of cores execute the exact same instruction on different data elements simultaneously.</li>
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
              <strong>Die Allocation:</strong> A CPU devotes significant silicon to control logic, branch prediction, and large caches to minimize latency. A GPU devotes almost all silicon to ALUs (Arithmetic Logic Units) to maximize throughput, hiding latency by switching between thousands of active threads.
           </p>
           <p>
              <strong>Memory Bandwidth:</strong> GPUs utilize high-bandwidth memory (GDDR6, HBM) offering terabytes per second. CPUs use standard DDR, offering gigabytes per second.
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
              Programming a GPU requires a different mindset. Serial algorithms (like traversing a linked list) perform poorly. Data-parallel algorithms (matrix multiplication) thrive.
           </p>
           <p>
              <strong>Frameworks:</strong> CUDA (NVIDIA) and OpenCL/HIP (AMD/Intel) are the primary tools. High-level libraries (PyTorch, TensorFlow) abstract this complexity for AI researchers.
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
              <strong>TFLOPS War:</strong> A high-end CPU might offer 1-2 TFLOPS (FP32). A high-end Data Center GPU (H100) offers 60+ TFLOPS.
           </p>
           <p>
              <strong>Latency vs Throughput:</strong> The CPU will finish a single task faster (low latency). The GPU will finish 10 million tasks faster (high throughput).
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
              The cost per TFLOP is drastically lower on GPUs. However, enterprise GPUs have high markups due to software ecosystem lock-in (NVIDIA CUDA).
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
              ECC (Error Correction Code) memory is standard on server CPUs and enterprise GPUs to prevent bit flips. Consumer GPUs often lack full ECC, making them risky for long-running scientific calculations.
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
              <li><strong>CPU:</strong> Operating Systems, Databases, Web Servers, Compilers, Logic-heavy apps.</li>
              <li><strong>GPU:</strong> Rendering, Deep Learning Training/Inference, Crypto Mining, Molecular Dynamics, Weather Simulation.</li>
           </ul>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '10. Case Studies',
      content: (
        <>
           <h3 className="text-white font-bold mb-2">Case Study: LLM Training (ChatGPT)</h3>
           <p>
              Training a Large Language Model is impossible on CPUs. It requires thousands of GPUs working in parallel (via NVLink) to process petabytes of text data. The parallel matrix math is the perfect workload for SIMT architecture.
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
                <h4 className="text-lg font-bold text-purple-400 mb-4">CPU Advantages</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Versatility (Can run any code).</li>
                    <li>Low latency for interactive tasks.</li>
                    <li>Large addressable memory (RAM).</li>
                </ul>
             </div>
             <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400 mb-4">GPU Advantages</h4>
                <ul className="list-disc pl-4 space-y-2">
                    <li>Massive parallelism (Thousands of cores).</li>
                    <li>Immense memory bandwidth.</li>
                    <li>Superior energy efficiency for parallel tasks.</li>
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
              <strong>Grace Hopper Superchip:</strong> NVIDIA is fusing the CPU and GPU onto the same board with coherent memory, removing the PCIe bottleneck. This &quot;Heterogeneous Computing&quot; is the future.
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
              The AI boom driven by GPUs has a massive carbon footprint. Training a single model can emit as much carbon as five cars in their lifetimes. Designing more efficient low-precision (FP8, Int8) GPU architectures is crucial for sustainable AI.
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
                <th className="p-4 text-purple-400">CPU</th>
                <th className="p-4 text-blue-400">GPU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Cores</td>
                <td className="p-4">Few (4 - 128)</td>
                <td className="p-4">Many (1000 - 16000+)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Focus</td>
                <td className="p-4">Low Latency</td>
                <td className="p-4">High Throughput</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Architecture</td>
                <td className="p-4">MIMD / Superscalar</td>
                <td className="p-4">SIMT / Vector</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Context Switch</td>
                <td className="p-4">Expensive</td>
                <td className="p-4">Instant (Hardware Threading)</td>
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
              The CPU is the conductor of the orchestra; the GPU is the string section. You need the conductor to make decisions and keep time, but you need the massive section to create the volume of sound (compute).
           </p>
           <p>
              <strong>Verdict:</strong> The future is not CPU *or* GPU, but CPU *plus* GPU.
           </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="GPU vs CPU Computing"
      topicA="CPU (Central Processing Unit)"
      topicB="GPU (Graphics Processing Unit)"
      abstract="A critical examination of heterogeneous computing. This monograph compares the latency-oriented architecture of CPUs with the throughput-oriented architecture of GPUs, explaining why the latter has become the engine of the AI era."
      sections={sections}
    />
  );
}
