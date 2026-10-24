import type { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'HTTP Load Testing Tool | DevMatrix Cloud',
  description: 'Simulate concurrent HTTP traffic to test your API or website performance. Analyze response times, throughput, and status codes in real-time.',
  keywords: ['load testing', 'http benchmark', 'api stress test', 'performance testing', 'concurrent requests'],
};

export default function HttpLoadTestingPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">HTTP Load Testing Tool</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Simulate real concurrent traffic to benchmark your API or website performance.
        </p>
      </div>

      <Client />

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">How it works</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li><strong>Concurrent Requests:</strong> Generates parallel HTTP requests to your target URL.</li>
            <li><strong>Real-time Metrics:</strong> Streams live performance data including Latency, RPS, and Errors.</li>
            <li><strong>Configurable Load:</strong> Adjust the number of virtual users (concurrency) and test duration.</li>
            <li><strong>Detailed Reports:</strong> Visualize response time distribution and status codes.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Best Practices & Ethics</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li><strong>Own the Target:</strong> Only test servers you own or have explicit permission to test.</li>
            <li><strong>Start Small:</strong> Begin with low concurrency and duration, then ramp up slowly.</li>
            <li><strong>Not a DDoS Tool:</strong> This tool is rate-limited and blocks private IPs to prevent abuse.</li>
            <li><strong>Analyze Logs:</strong>Correlate these results with your server logs for deeper insights.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> This tool runs on our server infrastructure. To prevent abuse, requests are limited to a maximum concurrency of 50 and duration of 60 seconds per test. Private networks (localhost, LAN) are blocked.
        </p>
      </div>
    </div>
  );
}
