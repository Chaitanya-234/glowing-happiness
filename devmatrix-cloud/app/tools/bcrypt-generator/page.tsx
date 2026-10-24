import { Metadata } from 'next';
import BcryptGeneratorClient from './components/BcryptGeneratorClient';

export const metadata: Metadata = {
  title: 'Bcrypt Hash Generator & Verifier | DevMetrix - Secure Password Hashing Tool',
  description: 'Generate secure bcrypt password hashes and verify them online. Learn about bcrypt cost factors, salts, and security best practices.',
  keywords: ['bcrypt generator', 'password hash', 'bcrypt verifier', 'security tool', 'hash generator', 'password security'],
};

export default function BcryptGeneratorPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Bcrypt Hash Generator & Verifier
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Securely generate and verify bcrypt password hashes. Adjust cost factors to balance security and performance.
          All operations are performed securely on the server.
        </p>
      </div>

      {/* Tool Interface */}
      <BcryptGeneratorClient />

      {/* Educational Content */}
      <div className="max-w-4xl mx-auto mt-16 space-y-12">
        <section className="prose prose-invert prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-white mb-4">What is Bcrypt?</h2>
          <p className="text-slate-300 leading-relaxed">
            Bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher.
            Unlike fast hashing algorithms like MD5 or SHA-256, bcrypt is intentionally slow and computationally expensive.
            This property, known as &quot;key stretching,&quot; makes it resistant to brute-force attacks and rainbow table lookups.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Why use Bcrypt?</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>
              <strong className="text-blue-400">Adaptive Cost:</strong> The &quot;cost factor&quot; (work factor) can be increased over time as hardware becomes faster, keeping your hashes secure against evolving threats.
            </li>
            <li>
              <strong className="text-blue-400">Built-in Salting:</strong> Bcrypt automatically generates a random salt for every hash, preventing rainbow table attacks where attackers use precomputed lists of hashes.
            </li>
            <li>
              <strong className="text-blue-400">Slow by Design:</strong> By making hash generation slow, it drastically reduces the number of guesses an attacker can attempt per second.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Understanding the Cost Factor</h3>
          <p className="text-slate-300 leading-relaxed">
            The cost factor determines the number of iterations the algorithm runs (2<sup>cost</sup>).
            A cost of 10 is the current standard default, meaning 2<sup>10</sup> (1,024) iterations.
            Increasing the cost by 1 doubles the time it takes to compute the hash.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
              <div className="text-blue-400 font-bold mb-1">Cost 10</div>
              <div className="text-sm text-slate-400">Standard for most applications. ~100ms verification time.</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
              <div className="text-purple-400 font-bold mb-1">Cost 12</div>
              <div className="text-sm text-slate-400">Higher security. Recommended for sensitive data. ~400ms.</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
              <div className="text-yellow-400 font-bold mb-1">Cost 14+</div>
              <div className="text-sm text-slate-400">Very high security. Can significantly impact server load.</div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Security Best Practices</h3>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <span>Always use a unique salt (bcrypt handles this automatically).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <span>Adjust the cost factor so hashing takes about 250ms-500ms on your server.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <span>Never log passwords or raw hashes in your application logs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">⚠</span>
                <span>Do not roll your own crypto. Use established libraries like <code>bcryptjs</code> or <code>argon2</code>.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-4">
            {[
              {
                q: "Is bcrypt secure in 2024?",
                a: "Yes, bcrypt remains a very secure choice for password hashing. While newer algorithms like Argon2 are memory-hard (resistant to GPU/ASIC attacks), bcrypt is still widely recommended and secure when used with an appropriate cost factor."
              },
              {
                q: "What happens if I change the cost factor?",
                a: "Existing hashes created with a lower cost factor remain valid. When a user logs in, you can detect the old cost, verify the password, and then re-hash it with the new higher cost to seamlessly upgrade security."
              },
              {
                q: "Can I decrypt a bcrypt hash?",
                a: "No. Hashing is a one-way function. You cannot retrieve the original password from the hash. You can only verify if a candidate password matches the hash."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                <h3 className="font-semibold text-slate-200 mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
