import { Metadata } from 'next';
import MicroserviceManager from '@/components/games/MicroserviceManager';

export const metadata: Metadata = {
  title: 'Microservices Simulation Game | Learn Distributed Systems',
  description: 'Manage a microservices architecture. Balance load, handle failures, and scale your services to keep the system running.',
  keywords: ['microservices', 'system design', 'distributed systems', 'load balancing', 'devops game'],
  openGraph: {
    title: 'Microservice Manager',
    description: 'Build and manage a microservice architecture.',
    type: 'website',
  },
};

export default function MicroservicePage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
         <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
                Microservice Manager
            </h1>
            <p className="text-gray-400">
                Scale your architecture, manage budget, and prevent system crashes under load.
            </p>
        </div>
        <MicroserviceManager />
    </div>
  );
}
