// app/blog/docker-containers-beginners/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Docker Containers for Beginners: Complete Tutorial 2025 | DevMetrix',
  description: 'Learn Docker from scratch - containers, images, Docker Compose, and deployment strategies. Practical examples for modern applications.',
  keywords: ['docker tutorial', 'docker containers', 'docker compose', 'containerization', 'docker beginners'],
  authors: [{ name: 'DevMetrix DevOps Team', url: 'https://devmetrix.in/about' }],
  openGraph: {
    title: 'Docker Containers for Beginners: Complete Tutorial',
    description: 'Master Docker containerization with practical examples',
    type: 'article',
    publishedTime: '2025-10-15T00:00:00.000Z',
  },
};

export default function DockerBeginnersGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="Docker Containers for Beginners: Complete Tutorial"
        description="Learn Docker from scratch - containers, images, Docker Compose, and deployment strategies for modern applications."
        datePublished="2025-10-15"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/docker-containers-beginners"
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-4 border border-blue-500/30">
              🐳 DevOps
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200 mb-4 leading-tight">
              Docker Containers for Beginners: Complete Tutorial
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 15, 2025</span>
              <span>•</span>
              <span>⏱️ 18 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix DevOps Team</span>
            </div>
            <p className="text-sm text-purple-300/30">Last updated: October 2025 • Reviewed by Docker experts</p>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="sticky top-16 z-40 mb-8 bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-blue-200/60 overflow-x-auto">
            <span className="whitespace-nowrap">🗺️ Topics:</span>
            <a href="#what-is-docker" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">What is Docker</a>
            <a href="#images" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Images</a>
            <a href="#containers" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Containers</a>
            <a href="#compose" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Compose</a>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          {/* Intro */}
          <div className="bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20 border-2 border-blue-500/30 rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">🐳</div>
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4 relative z-10">
              "It works on my machine!" - Every developer's famous last words. Docker fixes this problem forever.
              I remember the days of spending hours configuring environments, dealing with dependency conflicts,
              and the nightmare of "but it worked yesterday!" Docker changed all that.
            </p>
            <p className="text-base text-purple-200/60 relative z-10">
              This isn't a theory guide. This is everything I wish someone told me when I started with Docker.
              We'll build real containers, deploy real apps, and skip all the stuff you don't actually need to know.
            </p>
          </div>

          {/* Learning Path */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-xs font-semibold text-blue-300">Step 1</div>
              <div className="text-xs text-blue-200/50 mt-1">Understand Concepts</div>
            </div>
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🏗️</div>
              <div className="text-xs font-semibold text-cyan-300">Step 2</div>
              <div className="text-xs text-cyan-200/50 mt-1">Build Images</div>
            </div>
            <div className="bg-teal-900/20 border border-teal-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-xs font-semibold text-teal-300">Step 3</div>
              <div className="text-xs text-teal-200/50 mt-1">Run Containers</div>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🎼</div>
              <div className="text-xs font-semibold text-green-300">Step 4</div>
              <div className="text-xs text-green-200/50 mt-1">Use Compose</div>
            </div>
          </div>

          <h2 id="what-is-docker" className="text-3xl font-bold text-blue-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🤔</span>
            What is Docker? (In Plain English)
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            Docker is like a shipping container for your code. Just as shipping containers standardized global
            trade (any container fits on any ship), Docker containers standardize software deployment (any
            container runs on any server).
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-6">
            <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-200/80 mb-3 flex items-center gap-2">
                <span>😰</span> Without Docker
              </h3>
              <ul className="space-y-2 text-sm text-red-200/60">
                <li className="flex gap-2"><span className="text-red-400">•</span> "Works on my machine" syndrome</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Different setups for dev/staging/prod</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Dependency hell and conflicts</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Hours spent on environment setup</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> "Did you install Node 18 or 20?"</li>
              </ul>
            </div>

            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-200/80 mb-3 flex items-center gap-2">
                <span>😎</span> With Docker
              </h3>
              <ul className="space-y-2 text-sm text-green-200/60">
                <li className="flex gap-2"><span className="text-green-400">•</span> Works everywhere, always</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Identical environments everywhere</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Isolated, no conflicts</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Setup in seconds, not hours</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Version locked in the container</li>
              </ul>
            </div>
          </div>

          <h2 id="images" className="text-3xl font-bold text-cyan-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">📸</span>
            Docker Images: The Blueprint
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed mb-6">
            A Docker image is like a recipe. It contains everything your app needs: code, runtime, libraries,
            dependencies. You build an image once, then create containers from it.
          </p>

          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-2 border-blue-500/30 rounded-xl p-6 my-8">
            <h3 className="text-xl font-bold text-blue-200/80 mb-4">Your First Dockerfile:</h3>
            <pre className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30 overflow-x-auto text-xs mb-4">
              <code className="text-blue-100/80">{`# Dockerfile
# Start with Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]`}</code>
            </pre>
            <p className="text-xs text-blue-200/60">
              This Dockerfile creates an image with Node.js, your dependencies, and your code. Simple!
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-cyan-200/80 mt-8 mb-4">Building Your Image:</h3>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`# Build the image
docker build -t my-app:1.0 .

# The dot (.) means "current directory"
# -t tags your image with a name and version

# List your images
docker images

# Output:
# REPOSITORY   TAG       IMAGE ID       SIZE
# my-app       1.0       abc123def456   200MB`}</code>
          </pre>

          <h2 id="containers" className="text-3xl font-bold text-teal-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🏃</span>
            Running Containers: Making It Live
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 mb-6">
            A container is a running instance of an image. Think of the image as a class and containers as instances
            of that class. You can run multiple containers from the same image.
          </p>

          <div className="space-y-6 my-8">
            <div className="bg-gradient-to-r from-teal-900/20 to-green-900/20 border-l-4 border-teal-500 rounded-r-lg p-6">
              <h3 className="text-lg font-semibold text-teal-200/80 mb-3">Basic Container Commands:</h3>
              <pre className="bg-teal-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-teal-100/80">{`# Run container
docker run -p 3000:3000 my-app:1.0

# Run in background (detached mode)
docker run -d -p 3000:3000 --name my-container my-app:1.0

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View logs
docker logs my-container

# Follow logs (like tail -f)
docker logs -f my-container

# Stop container
docker stop my-container

# Remove container
docker rm my-container`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-l-4 border-blue-500 rounded-r-lg p-6">
              <h3 className="text-lg font-semibold text-blue-200/80 mb-3">Useful Flags Explained:</h3>
              <div className="space-y-2 text-sm text-blue-200/60">
                <div className="bg-blue-900/20 p-3 rounded">
                  <code className="text-blue-300">-p 3000:3000</code> - Port mapping (host:container)
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <code className="text-blue-300">-d</code> - Detached mode (runs in background)
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <code className="text-blue-300">--name</code> - Give your container a name
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <code className="text-blue-300">-e</code> - Set environment variables
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <code className="text-blue-300">-v</code> - Mount volumes (persist data)
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-green-200/80 mt-8 mb-4">Real-World Example:</h3>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`# Run with environment variables and volume
docker run -d \\
  --name my-api \\
  -p 3000:3000 \\
  -e DATABASE_URL=postgres://localhost/mydb \\
  -e NODE_ENV=production \\
  -v /app/uploads:/data \\
  my-app:1.0

# Access shell inside container
docker exec -it my-api /bin/sh

# Now you're inside the container!
# ls, cd, whatever you need`}</code>
          </pre>

          <h2 id="compose" className="text-3xl font-bold text-purple-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🎼</span>
            Docker Compose: Multi-Container Magic
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed mb-6">
            Most real apps need multiple services: your app, a database, Redis, maybe a queue. Docker Compose
            lets you define and run all of them together with one command.
          </p>

          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl p-6 my-8">
            <h3 className="text-xl font-bold text-purple-200/80 mb-4">Complete App with docker-compose.yml:</h3>
            <pre className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 overflow-x-auto text-xs mb-4">
              <code className="text-purple-100/80">{`version: '3.8'

services:
  # Your Node.js app
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./src:/app/src  # Hot reload in development

  # PostgreSQL database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # Redis cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  db-data:`}</code>
            </pre>
          </div>

          <h3 className="text-2xl font-semibold text-pink-200/80 mt-8 mb-4">Using Docker Compose:</h3>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`# Start everything
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f app

# Stop everything
docker-compose down

# Stop and remove volumes (deletes data!)
docker-compose down -v

# Rebuild images
docker-compose build

# Restart a service
docker-compose restart app`}</code>
          </pre>

          <h2 className="text-3xl font-bold text-orange-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            Best Practices
          </h2>

          <div className="space-y-6 my-8">
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-200/80 mb-3">✅ Keep Images Small:</h3>
              <pre className="bg-green-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-green-100/80">{`# Bad: 1.2GB
FROM node:18

# Good: 200MB
FROM node:18-alpine

# Better: Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["node", "dist/index.js"]`}</code>
              </pre>
            </div>

            <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-200/80 mb-3">✅ Use .dockerignore:</h3>
              <pre className="bg-blue-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-blue-100/80">{`# .dockerignore
node_modules
npm-debug.log
.git
.env
*.md
.DS_Store
dist
coverage`}</code>
              </pre>
              <p className="text-xs text-blue-200/60 mt-3">
                Like .gitignore but for Docker. Keeps your images clean and small.
              </p>
            </div>

            <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-200/80 mb-3">✅ Don't Run as Root:</h3>
              <pre className="bg-purple-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-purple-100/80">{`FROM node:18-alpine

# Create app user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY . .
RUN npm install

# Switch to non-root user
USER appuser

CMD ["npm", "start"]`}</code>
              </pre>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-red-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🚨</span>
            Common Mistakes to Avoid
          </h2>

          <div className="space-y-4 my-8">
            <div className="bg-red-900/10 border-l-4 border-red-500 rounded-r-lg p-6">
              <h3 className="text-base font-semibold text-red-200/80 mb-2">❌ Storing Data in Containers</h3>
              <p className="text-sm text-red-200/60">
                Containers are ephemeral. Always use volumes for persistent data like databases, uploads, logs.
              </p>
            </div>

            <div className="bg-orange-900/10 border-l-4 border-orange-500 rounded-r-lg p-6">
              <h3 className="text-base font-semibold text-orange-200/80 mb-2">❌ Hardcoding Configuration</h3>
              <p className="text-sm text-orange-200/60">
                Use environment variables! Never bake secrets or config into images.
              </p>
            </div>

            <div className="bg-yellow-900/10 border-l-4 border-yellow-500 rounded-r-lg p-6">
              <h3 className="text-base font-semibold text-yellow-200/80 mb-2">❌ Not Using Health Checks</h3>
              <pre className="bg-yellow-900/20 p-3 rounded text-xs overflow-x-auto mt-2">
                <code className="text-yellow-100/80">{`HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js || exit 1`}</code>
              </pre>
            </div>
          </div>

          {/* Checklist */}
          <div className="my-12 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-2 border-blue-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-100/80 mb-6 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              Docker Learning Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Install Docker Desktop</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Write your first Dockerfile</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Build and run a container</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use volumes for data persistence</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Create docker-compose.yml</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Run multi-container app</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use environment variables</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Create .dockerignore file</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Push image to registry</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Deploy to production</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-12 bg-green-900/10 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-200/80 mb-4">🎯 Final Thoughts</h3>
            <p className="text-sm text-green-200/60 leading-relaxed">
              Start simple. Dockerize one app. Get comfortable with the basic commands. Then add Docker Compose
              for multiple services. Before you know it, you'll wonder how you ever deployed without containers.
              The "it works on my machine" problem? Gone forever. And that's worth the learning curve.
            </p>
          </div>

          {/* Author Box */}
          <div className="mt-16 mb-8 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👥</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-100/80 mb-2">About the Team</h3>
                <p className="text-sm text-blue-200/60 leading-relaxed mb-3">
                  Written by DevMetrix's DevOps engineers who've containerized hundreds of applications from
                  simple APIs to complex microservices architectures.
                </p>
                <p className="text-xs text-blue-300/40">
                  ✓ Docker-certified engineers • ✓ Updated October 2025 • ✓ Production-tested practices
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-br from-blue-900/20 to-teal-900/20 border-2 border-blue-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-blue-100/80 mb-4 flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              Test Your Dockerized APIs
            </h3>
            <p className="text-sm text-blue-200/60 mb-4 leading-relaxed">
              Once your app is containerized, test it with our API tester. Verify your endpoints work correctly
              in the Docker environment.
            </p>
            <Link
              href="/tools/api-tester"
              className="inline-block px-6 py-3 bg-blue-600/30 text-blue-100 rounded-lg border border-blue-500/30 hover:bg-blue-500/40 transition-all font-semibold no-underline text-sm"
            >
              Try API Tester →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
