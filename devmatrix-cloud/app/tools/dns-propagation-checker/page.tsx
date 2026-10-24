import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'DNS Propagation Checker | Global DNS Lookup Tool',
  description: 'Check DNS propagation status globally in real-time. Query A, AAAA, MX, NS, CNAME, and TXT records from multiple authoritative resolvers including Google and Cloudflare.',
  keywords: ['dns checker', 'dns propagation', 'global dns', 'dns lookup', 'a record', 'mx record', 'ns lookup'],
};

export default function DnsPropagationPage() {
  return <Client />;
}
