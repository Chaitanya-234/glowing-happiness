
import React from 'react';
import type { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Mock API Generator | Generate Functional Mock APIs Instantly',
  description: 'Design and generate fully functional mock APIs from OpenAPI, JSON Schema, or raw JSON. Simulate endpoints, test responses, and export code for local development.',
  keywords: 'mock api generator, openapi mock, json schema faker, mock server, api simulation, rest api tester, developer tools',
  openGraph: {
    title: 'Mock API Generator | DevMatrix Cloud',
    description: 'Generate realistic mock APIs instantly. Support for OpenAPI, JSON Schema, and stateful simulations.',
    type: 'website',
  },
};

export default function MockApiGeneratorPage() {
  return <Client />;
}
