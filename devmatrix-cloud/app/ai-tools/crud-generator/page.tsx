import type { Metadata } from 'next';
import CrudGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI CRUD Generator | Full Stack Code Generator',
  description: 'Generate complete CRUD operations including API endpoints, database queries, frontend forms, and tests from your data model.',
  keywords: ['crud generator', 'code generator', 'backend generator', 'frontend generator', 'scaffold'],
};

export default function Page() {
  return <CrudGeneratorClient />;
}
