import { Metadata } from 'next';
import DocumentProcessorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Document Processor | Summarize & Extract Insights',
  description: 'Instantly summarize documents, extract key points, and analyze sentiment with our AI-powered Document Processor.',
  keywords: ['document summarizer', 'ai document analysis', 'text extractor', 'sentiment analysis'],
};

export default function DocumentProcessorPage() {
  return <DocumentProcessorClient />;
}
