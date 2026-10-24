import type { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Port Scanner | Online Network Scan Tool',
  description: 'Free online port scanner. Scan common ports on an IP or domain to check for open services. Fast, ethical, and secure.',
  keywords: ['port scanner', 'network scanner', 'open ports', 'port check', 'online port scanner', 'security tool'],
};

export default function PortScannerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Port Scanner',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online port scanner. Scan common ports on an IP or domain to check for open services. Fast, ethical, and secure.',
    featureList: 'Host Scan, Common Ports, Open/Closed Detection, Real-time Results',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Client />
    </>
  );
}
