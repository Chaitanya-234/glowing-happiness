import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'REST to GraphQL Converter | AI Schema Generator | DevMetrix',
  description: 'Free AI-powered REST to GraphQL converter. Upload OpenAPI/Swagger, get complete GraphQL schema with resolvers, DataLoader optimization, and migration guide.',
  keywords: [
    'rest to graphql converter', 'graphql schema generator', 'api converter', 'rest api to graphql',
    'graphql migration tool', 'graphql schema design', 'graphql resolver generator', 'dataloader implementation',
    'openapi to graphql', 'swagger to graphql', 'graphql optimization', 'n+1 query solution'
  ],
  openGraph: {
    title: 'AI REST to GraphQL Converter - Generate Schema Automatically',
    description: 'Upload REST API spec, get production-ready GraphQL schema with resolvers, DataLoader, and migration guide. AI infers relationships and optimizes performance.',
    type: 'website',
    url: 'https://devmetrix.com/tools/graphql-designer',
    siteName: 'DevMetrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REST to GraphQL Converter | DevMetrix',
    description: 'Convert REST APIs to GraphQL automatically. Schema generation, resolvers, DataLoader, migration guide. Free AI tool.',
    creator: '@devmetrix',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
