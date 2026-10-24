import { Metadata } from 'next';
import ReportGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Report Generator | Professional Business Reports',
  description: 'Generate comprehensive, structured business reports in seconds. Input your topic and get an executive summary, detailed sections, and conclusions.',
  keywords: ['report generator', 'ai report writer', 'business report creator', 'automated reporting'],
};

export default function ReportGeneratorPage() {
  return <ReportGeneratorClient />;
}
