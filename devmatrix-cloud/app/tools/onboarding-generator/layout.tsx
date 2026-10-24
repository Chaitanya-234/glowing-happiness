import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding Path Generator | DevMetrix - AI-Powered Developer Onboarding',
  description: 'Generate personalized onboarding learning paths for new developers. AI analyzes your codebase structure and creates step-by-step guides from simple to complex, reducing onboarding time by 40-60%.',
  keywords: [
    'developer onboarding',
    'onboarding path generator',
    'codebase learning path',
    'developer training',
    'team onboarding tool',
    'code learning sequence',
    'new developer guide',
    'engineering onboarding',
    'automated onboarding',
    'developer education',
    'code complexity analysis',
    'learning path creator',
    'technical onboarding',
    'software onboarding',
    'codebase tutorial generator',
  ],
  openGraph: {
    title: 'Onboarding Path Generator - AI-Powered Learning Paths',
    description: 'Upload your codebase and get a personalized, progressive learning path in minutes.',
    type: 'website',
    url: 'https://devmetrix.com/tools/onboarding-generator',
    images: [{
      url: '/og-onboarding-generator.png',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onboarding Path Generator | DevMetrix',
    description: 'Generate AI-powered learning paths for new developers.',
    images: ['/og-onboarding-generator.png'],
  },
  alternates: {
    canonical: '/tools/onboarding-generator',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
