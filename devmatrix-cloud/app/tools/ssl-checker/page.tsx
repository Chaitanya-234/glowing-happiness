import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'SSL/TLS Certificate Checker | Security Validation Tool',
  description: 'Analyze SSL/TLS certificates for any domain. Check expiration dates, issuer trust chain, protocol support, and validity in real-time.',
  keywords: ['ssl checker', 'tls validator', 'certificate expiry', 'https check', 'security tool', 'ssl chain', 'cipher suite'],
};

export default function SslCheckerPage() {
  return <Client />;
}
