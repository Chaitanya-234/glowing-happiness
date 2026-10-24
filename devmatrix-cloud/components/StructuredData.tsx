// components/StructuredData.tsx
export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Devmetrix.in',
    url: 'https://devmetrix.in',
    logo: 'https://devmetrix.in/logo.png',
    description: 'Free developer tools and utilities for modern web development',
    sameAs: [
      'https://twitter.com/devmetrix',
      'https://github.com/devmetrix-cloud',
      'https://discord.gg/devmetrix',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@Devmetrix.in',
      contactType: 'Customer Support',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Devmetrix.in',
    url: 'https://devmetrix.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://devmetrix.in/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
