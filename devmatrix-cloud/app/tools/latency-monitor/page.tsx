import React from 'react';
import type { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Latency & Uptime Monitor | Free Website Health Check Tool',
  description: 'Continuously monitor your website or API endpoint availability and response time. Real-time latency charts, uptime percentage tracking, and incident detection for SREs.',
  keywords: [
    'uptime monitor',
    'latency check',
    'website health check',
    'api monitor',
    'ping test',
    'response time tracker',
    'downtime detector',
    'sre tools',
    'devops monitoring'
  ],
  authors: [{ name: 'DevMatrix Team' }],
  openGraph: {
    title: 'Latency & Uptime Monitor | Real-time Health Checks',
    description: 'Monitor HTTP/HTTPS endpoints with live latency charts and uptime statistics. Free professional-grade tool for developers.',
    type: 'website',
  },
};

export default function LatencyMonitorPage() {
  return <Client />;
}
