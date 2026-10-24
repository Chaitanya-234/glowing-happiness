import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Symmetric vs Asymmetric Encryption: A Cryptographic Comparison | DevMetrix',
  description: 'Analyzing Symmetric (AES) and Asymmetric (RSA/ECC) encryption algorithms. Comparing speed, key management, and their role in TLS/SSL.',
  keywords: ['cryptography', 'encryption', 'AES', 'RSA', 'ECC', 'security', 'TLS', 'SSL', 'public key'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            Cryptography is the cornerstone of digital security. The two primary mechanisms for securing data confidentiality are Symmetric Encryption (Shared Secret) and Asymmetric Encryption (Public-Private Key Pair).
          </p>
          <img src="https://placehold.co/800x400?text=Encryption+Types" alt="Diagram showing symmetric vs asymmetric key flows" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="Symmetric vs Asymmetric"
              description="Speed vs Distribution"
              personaA={{
                name: "The AES Agent",
                role: "Security Specialist",
                color: "green",
              }}
              personaB={{
                name: "The RSA Sage",
                role: "Cryptographer",
                color: "purple",
              }}
              intro="A shared secret vs a public announcement."
              turns={[
                {
                  speaker: "A",
                  text: "I am speed. AES encrypts gigabytes of data in milliseconds. I'm efficient, secure, and unbreakable with a strong key.",
                  topic: "Speed"
                },
                {
                  speaker: "B",
                  text: "But how do you share that key? If you send it over the wire, it's stolen. I solve the 'Key Distribution Problem'. Anyone can encrypt with my Public Key, but only I can decrypt.",
                  topic: "Key Exchange"
                },
                {
                  speaker: "A",
                  text: "You're slow. RSA is thousands of times slower than AES. You can't encrypt a whole movie stream.",
                  topic: "Performance"
                },
                {
                  speaker: "B",
                  text: "That's why we work together. I use my heavy math to securely exchange *your* key. Then you take over for the bulk data. It's the TLS handshake.",
                  topic: "Synergy"
                }
              ]}
              conclusion="Symmetric for Data, Asymmetric for Keys. They are the yin and yang of secure communications."
              winner="Collaboration (TLS)"
            />
        </div>
      )
    },
    {
      id: 'historical-evolution',
      title: '3. Historical Evolution',
      content: (
        <>
           <p>Symmetric (Caesar Cipher, Enigma) is ancient. Asymmetric (Diffie-Hellman, RSA) was invented in the 1970s, enabling the secure internet.</p>
           <img src="https://placehold.co/800x400?text=Crypto+History" alt="Timeline of cryptography" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations',
      content: (
        <>
           <p><strong>Trapdoor Functions:</strong> Asymmetric relies on math problems easy to do one way but hard to reverse (Factoring primes).</p>
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture',
      content: (
        <>
           <p><strong>PKI:</strong> Public Key Infrastructure (Certificate Authorities) is built on asymmetric crypto to verify identities.</p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software Implications',
      content: (
        <>
           <p>Developers rarely implement crypto. They use libraries (OpenSSL, Libsodium) that combine both.</p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p>AES is hardware-accelerated (AES-NI). RSA is CPU intensive.</p>
           <img src="https://placehold.co/800x400?text=Encryption+Benchmarks" alt="Graph of encryption speed" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Economic Factors',
      content: (
        <>
           <p>Security breaches cost millions. Proper crypto is insurance.</p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability and Security',
      content: (
        <>
           <p><strong>Key Management:</strong> The hardest part of symmetric crypto is keeping the key safe. Asymmetric simplifies this.</p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications',
      content: (
        <>
           <p><strong>Symmetric:</strong> Disk Encryption, VPN tunnels, WiFi (WPA2).</p>
           <p><strong>Asymmetric:</strong> SSH keys, Bitcoin wallets, Digital Signatures.</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>HTTPS:</strong> The perfect hybrid. Asymmetric handshake + Symmetric session.</p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6">
              <li><strong>Symmetric:</strong> Fast, Simple. Key distribution is hard.</li>
              <li><strong>Asymmetric:</strong> Secure key exchange. Slow, Large keys.</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p><strong>Post-Quantum Cryptography:</strong> NIST is standardizing algorithms resistant to quantum attacks (Lattice-based crypto).</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical Impact',
      content: (
        <>
           <p>Encryption protects privacy and free speech (E2EE).</p>
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
                <th className="p-4 text-purple-400">Symmetric</th>
                <th className="p-4 text-blue-400">Asymmetric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
               <tr>
                <td className="p-4 font-semibold text-slate-300">Keys</td>
                <td className="p-4">One (Shared)</td>
                <td className="p-4">Two (Public/Private)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Use Case</td>
                <td className="p-4">Data Confidentiality</td>
                <td className="p-4">Key Exchange / Signatures</td>
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
           <p>They are not rivals. They are teammates in the TLS protocol stack.</p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="Symmetric vs Asymmetric Encryption"
      topicA="Symmetric (Shared Secret)"
      topicB="Asymmetric (Public Key)"
      abstract="A cryptographic analysis of the two pillars of information security. This study details the mathematical foundations, performance characteristics, and the unified implementation of both in modern secure protocols."
      sections={sections}
    />
  );
}
