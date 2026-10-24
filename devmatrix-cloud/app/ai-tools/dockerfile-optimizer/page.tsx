
import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Dockerfile Optimizer | DevMatrix Cloud',
  description: 'Analyze and optimize your Dockerfiles for security, size, and performance with AI-powered recommendations.',
};

export default function DockerfileOptimizerPage() {
  return <Client />;
}
