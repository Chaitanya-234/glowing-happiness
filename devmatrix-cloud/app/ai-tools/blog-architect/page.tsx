import type { Metadata } from 'next';
import BlogArchitectClient from './Client';

export const metadata: Metadata = {
  title: 'Smart Blog Architect | AI Content Outliner',
  description: 'Create SEO-optimized blog outlines, metadata, and code snippets instantly. The perfect tool for technical writers and developer advocates.',
  keywords: ['blog outline generator', 'ai content writer', 'seo meta generator', 'technical writing ai', 'content strategy'],
};

export default function Page() {
  return <BlogArchitectClient />;
}
