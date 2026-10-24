import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Devmetrix.in - Support & Feedback',
  description: 'Get in touch with the DevMetrix team for tool support, feature requests, bug reports, and partnership inquiries. We usually respond within 24-48 hours.',
  keywords: [
    'contact devmetrix',
    'developer support',
    'feature request',
    'bug report',
    'tech partnership',
    'programming help',
    'devmetrix email',
    'software development support'
  ],
  openGraph: {
    title: 'Contact Devmetrix.in',
    description: 'Get in touch with the DevMetrix team. We are here to help developers with tools and resources.',
    url: 'https://devmetrix.in/contact',
    siteName: 'Devmetrix.in',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact DevMetrix Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Devmetrix.in',
    description: 'Get in touch with the DevMetrix team.',
    creator: '@DevMetrix',
    images: ['/twitter-image.png'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
