import { Metadata } from 'next';
import CVStudioClient from './components/CVStudioClient';

export const metadata: Metadata = {
  title: 'Free Resume Builder | Export to PDF & LaTeX',
  description: 'Build ATS-friendly resumes visually. Choose from multiple templates, export LaTeX or high-quality PDFs. 100% private, no sign-up.',
};

export default function CVStudioPage() {
  return (
    <div className="flex min-h-screen flex-col pt-16">
      <CVStudioClient />
    </div>
  );
}