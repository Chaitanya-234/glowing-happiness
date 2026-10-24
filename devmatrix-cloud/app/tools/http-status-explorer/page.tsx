import { Metadata } from 'next';
import HttpStatusExplorerClient from './HttpStatusExplorerClient';

export const metadata: Metadata = {
  title: 'HTTP Status Code Explorer - Complete Guide | DevMetrix',
  description: 'A comprehensive guide to HTTP status codes for developers. Learn about success, client errors, server errors, and how to handle them properly.',
  keywords: ['http status codes', 'http error codes', '404 not found', '500 internal server error', 'api development', 'web development'],
};

export default function HttpStatusExplorerPage() {
  return <HttpStatusExplorerClient />;
}
