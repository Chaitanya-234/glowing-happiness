import { Metadata } from 'next';
import DataAnalyzerClient from './Client';

export const metadata: Metadata = {
  title: 'AI Data Analyzer | Insights from CSV & JSON',
  description: 'Upload your data and get instant analysis, trend identification, and visualization recommendations.',
  keywords: ['data analysis', 'ai data insights', 'trend spotting', 'csv analyzer'],
};

export default function DataAnalyzerPage() {
  return <DataAnalyzerClient />;
}
