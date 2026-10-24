import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Silent Dependency Risk Scanner | DevMetrix',
  description: 'AI-powered scanner for nested dependencies. Find hidden vulnerabilities, maintenance risks, and supply chain threats.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
