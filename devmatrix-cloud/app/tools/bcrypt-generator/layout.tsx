import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bcrypt Hash Generator & Verifier | DevMetrix',
  description: 'Generate secure bcrypt password hashes and verify them online. Learn about bcrypt cost factors, salts, and security best practices.',
  keywords: ['bcrypt generator', 'password hash', 'bcrypt verifier', 'security tool', 'hash generator', 'password security'],
};

export default function BcryptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
