import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Compiler | Run Code in 60+ Languages | DevMetrix',
  description: 'Free online compiler supporting 60+ programming languages. Write, compile, and execute code instantly in your browser. Python, Java, C++, JavaScript, and more.',
  keywords: [
    'online compiler', 'online code compiler', 'code executor online', 'run code online', 'compile code online',
    'python online compiler', 'java online compiler', 'c++ online compiler', 'javascript online compiler',
    'online ide', 'browser compiler', 'web compiler'
  ],
  openGraph: {
    title: 'Online Compiler - Run Code in 60+ Languages Instantly',
    description: 'Free online compiler and code executor. Python, Java, C++, JavaScript, and 60+ more languages. No installation needed.',
    type: 'website',
    url: 'https://devmetrix.com/tools/online-compiler',
    siteName: 'DevMetrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Compiler - 60+ Languages',
    description: 'Write, compile & run code instantly. Python, Java, C++, JS & more. No setup needed.',
    creator: '@devmetrix',
  },
  alternates: {
    canonical: 'https://devmetrix.com/tools/online-compiler',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {children}
    </div>
  );
}
