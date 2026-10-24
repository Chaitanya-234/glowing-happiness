import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Designer - Free Online UML & Architecture Diagram Tool',
  description: 'Create professional system design diagrams, UML, ERD, flowcharts, and sequence diagrams with our free, privacy-focused online tool. Export to PDF/PNG.',
  keywords: ['System Design', 'UML Tool', 'Class Diagram', 'Sequence Diagram', 'Software Architecture', 'ERD Tool', 'Flowchart Maker', 'Online Diagram', 'DevMetrix', 'System Design Interview'],
  openGraph: {
    title: 'System Designer - Free Online UML & Architecture Diagram Tool',
    description: 'Create professional system design diagrams, UML, ERD, and flowcharts.',
    type: 'website',
    url: 'https://devmetrix.in/system-design',
    images: [
        {
            url: 'https://devmetrix.in/og-system-design.png',
            width: 1200,
            height: 630,
            alt: 'System Designer Tool',
        }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Designer - Free Online UML & Architecture Diagram Tool',
    description: 'Create professional system design diagrams, UML, ERD, and flowcharts.',
  }
};

export default function SystemDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'System Designer',
    'applicationCategory': 'DesignApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': 'A comprehensive tool for creating UML diagrams, system architectures, and flowcharts.',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '150'
    },
    'featureList': [
        'Class Diagrams',
        'Sequence Diagrams',
        'ER Diagrams',
        'Flowcharts',
        'System Architecture Diagrams',
        'Export to PNG/PDF'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
