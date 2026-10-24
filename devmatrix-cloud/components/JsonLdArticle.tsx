// components/JsonLdArticle.tsx
import Script from 'next/script';

interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
  image?: string;
}

export default function JsonLdArticle({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  url,
  image,
}: ArticleStructuredDataProps) {
  // Default image if none provided
  const imageUrl = image || 'https://devmetrix.in/og-image.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: headline,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://devmetrix.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DevMetrix.cloud',
      logo: {
        '@type': 'ImageObject',
        url: 'https://devmetrix.in/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <Script
      id={`structured-data-article-${url}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
