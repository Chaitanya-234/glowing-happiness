import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevMetrix Sessions - Animated Developer Video Guides',
  description: 'Watch animated video sessions explaining complex developer topics like DNS, System Design, and more.',
};

const sessions = [
  {
    title: 'How DNS Works',
    slug: 'dns-working',
    description: 'A visual animated guide to the Domain Name System. Understand how your browser finds websites.',
    duration: '5 min',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/6IhBMIJ5HHg/maxresdefault.jpg',
  },
];

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-neonBlue">Dev</span>
            <span className="text-neonGreen">Sessions</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Visual animated guides to master complex concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <Link href={`/sessions/${session.slug}`} key={session.slug} className="group">
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-neonBlue transition-all duration-300 hover:shadow-lg dark:hover:shadow-neonBlue/20">
                <div className="aspect-video relative overflow-hidden">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={session.thumbnail}
                    alt={session.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-neonBlue/90 flex items-center justify-center pl-1">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {session.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neonGreen">
                      {session.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-neonBlue transition-colors">
                    {session.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {session.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
