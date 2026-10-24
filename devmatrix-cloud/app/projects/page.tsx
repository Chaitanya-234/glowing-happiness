// app/projects/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Featured Open Source Projects | DevMetrix',
  description: 'Discover curated open source projects from the developer community. Find inspiration for your next project.',
};

const projects = [
  {
    id: 1,
    name: 'DevTools Pro',
    description: 'A comprehensive suite of developer tools including JSON formatter, regex tester, and more built with Next.js and TypeScript.',
    author: 'johndoe',
    githubUrl: 'https://github.com/johndoe/devtools-pro',
    stars: 1250,
    forks: 180,
    language: 'TypeScript',
    tags: ['developer-tools', 'nextjs', 'typescript'],
    thumbnail: 'https://placehold.co/600x400/1a1a1a/8b5cf6?text=DevTools+Pro',
    featured: true
  },
  {
    id: 2,
    name: 'API Monitor Dashboard',
    description: 'Real-time API monitoring dashboard with beautiful visualizations. Track response times, errors, and uptime.',
    author: 'janesmith',
    githubUrl: 'https://github.com/janesmith/api-monitor',
    stars: 890,
    forks: 120,
    language: 'JavaScript',
    tags: ['monitoring', 'dashboard', 'api'],
    thumbnail: 'https://placehold.co/600x400/1a1a1a/3b82f6?text=API+Monitor',
    featured: true
  },
  {
    id: 3,
    name: 'Code Snippet Manager',
    description: 'Organize and search your code snippets efficiently. Supports 20+ programming languages with syntax highlighting.',
    author: 'bobwilson',
    githubUrl: 'https://github.com/bobwilson/snippet-manager',
    stars: 654,
    forks: 95,
    language: 'React',
    tags: ['snippets', 'react', 'productivity'],
    thumbnail: 'https://placehold.co/600x400/1a1a1a/10b981?text=Snippet+Manager',
    featured: false
  },
  {
    id: 4,
    name: 'Markdown Editor Pro',
    description: 'Lightweight markdown editor with live preview, export to PDF/HTML, and GitHub-flavored markdown support.',
    author: 'alicechen',
    githubUrl: 'https://github.com/alicechen/markdown-pro',
    stars: 2100,
    forks: 310,
    language: 'Vue',
    tags: ['markdown', 'editor', 'vue'],
    thumbnail: 'https://placehold.co/600x400/1a1a1a/f59e0b?text=Markdown+Pro',
    featured: true
  },
  {
    id: 5,
    name: 'Docker Manager UI',
    description: 'Manage Docker containers with an intuitive web interface. Start, stop, view logs, and more.',
    author: 'mikeross',
    githubUrl: 'https://github.com/mikeross/docker-ui',
    stars: 1580,
    forks: 220,
    language: 'Go',
    tags: ['docker', 'devops', 'golang'],
    thumbnail: 'https://placehold.co/600x400/1a1a1a/06b6d4?text=Docker+Manager',
    featured: false
  },
  {
    id: 6,
    name: 'Git Workflow Visualizer',
    description: 'Visualize Git branching strategies and workflows. Perfect for teaching and understanding Git concepts.',
    author: 'sarahlee',
    githubUrl: 'https://github.com/sarahlee/git-viz',
    stars: 780,
    forks: 140,
    language: 'JavaScript',
    tags: ['git', 'visualization', 'education'],
    thumbnail: 'https://placehold.co/600x400/1a1a1a/ec4899?text=Git+Visualizer',
    featured: false
  },
];

const categories = [
  { name: 'All', count: projects.length },
  { name: 'Developer Tools', count: 12 },
  { name: 'Web Apps', count: 18 },
  { name: 'Mobile', count: 8 },
  { name: 'DevOps', count: 15 },
  { name: 'Libraries', count: 24 },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 mb-4">
            Featured Open Source Projects
          </h1>
          <p className="text-lg text-purple-200/60 max-w-2xl mx-auto mb-6">
            Discover amazing projects built by the developer community. Get inspired for your next build.
          </p>

          <Link
            href="/projects/submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-semibold"
          >
            🚀 Submit Your Project
          </Link>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 text-purple-200 rounded-lg hover:bg-purple-800/40 transition-colors text-sm"
            >
              {cat.name} <span className="text-purple-400">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-purple-100 mb-6 flex items-center gap-2">
            <span>⭐</span>
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(p => p.featured).map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-bold text-purple-100 mb-6">
            All Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-purple-100 mb-4">
            🎯 Share Your Project
          </h2>
          <p className="text-purple-200/70 mb-6 max-w-2xl mx-auto">
            Built something awesome? Share it with the DevMetrix community and get discovered by thousands of developers.
          </p>
          <Link
            href="/projects/submit"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-semibold text-lg"
          >
            Submit Your Project →
          </Link>
        </div>
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, featured = false }: { project: any; featured?: boolean }) {
  return (
    <div className={`group bg-gradient-to-br from-purple-900/20 to-blue-900/20 border ${
      featured ? 'border-yellow-500/50' : 'border-purple-500/30'
    } rounded-xl overflow-hidden hover:scale-105 transition-all`}>
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/90 text-black text-xs font-bold rounded-full">
            ⭐ FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-purple-100 group-hover:text-purple-300 transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-purple-400">
            <span>⭐</span>
            <span>{project.stars}</span>
          </div>
        </div>

        <p className="text-sm text-purple-200/60 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-purple-800/30 text-purple-300 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-purple-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              {project.language}
            </span>
            <span>🍴 {project.forks}</span>
          </div>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 transition-colors font-semibold"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
