import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Interview Question Generator | Technical Interview Prep | DevMetrix',
  description: 'Free AI-powered technical interview question generator. Create role-specific coding problems, system design questions, and behavioral interviews with solutions. Tailored for frontend, backend, full-stack, DevOps, and more.',
  keywords: [
    'interview question generator',
    'technical interview questions',
    'coding interview questions',
    'ai interview generator',
    'interview prep tool',
    'frontend interview questions',
    'backend interview questions',
    'full stack interview questions',
    'devops interview questions',
    'data engineer interview questions',
    'machine learning interview questions',
    'react interview questions',
    'python interview questions',
    'javascript interview questions',
    'coding problems with solutions',
    'system design questions',
    'behavioral interview questions',
    'senior developer interview questions',
    'technical screening questions',
    'interview question bank'
  ],
  openGraph: {
    title: 'AI Interview Question Generator - Create Custom Technical Interviews',
    description: 'Generate role-specific technical interview questions in seconds. Coding problems, system design, behavioral questions with solutions, hints, and evaluation guides.',
    type: 'website',
    url: 'https://devmetrix.com/tools/interview-generator',
    siteName: 'DevMetrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Interview Question Generator | DevMetrix',
    description: 'Generate technical interview questions tailored to any role and tech stack. Coding, system design, behavioral with solutions.',
    creator: '@devmetrix',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
