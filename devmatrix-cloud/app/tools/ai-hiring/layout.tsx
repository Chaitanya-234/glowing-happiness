import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Hiring Assistant for Startups | Automate Resume Screening',
  description: 'Free AI-powered hiring tool for startups. Automate resume screening, candidate scoring, skill matching. Generate interview questions. Rank candidates instantly.',
  keywords: 'ai hiring tool, startup hiring, resume screening ai, candidate scoring, automated recruiting, startup recruitment, ai recruiter, hiring without hr, resume parser, skill matching tool, interview question generator, candidate comparison, hiring automation, small business hiring, applicant screening, resume analyzer, talent acquisition ai, recruitment automation, ai ats, startup talent, hiring assistant, resume ranking, candidate evaluation, hiring software for startups',
  openGraph: {
    title: 'AI Hiring Assistant - Automate Startup Recruitment',
    description: 'Screen resumes, score candidates, generate interviews with AI. Made for startups without HR teams. Free, fast, accurate.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {children}
    </div>
  );
}
