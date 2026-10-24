// app/blog/git-workflow-best-practices/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Git Workflow Best Practices for Development Teams in 2025 | DevMetrix',
  description: 'Master Git workflows with proven branching strategies, commit conventions, and team collaboration practices. Real-world examples from production teams.',
  keywords: ['git workflow', 'git branching', 'gitflow', 'github flow', 'commit conventions', 'team collaboration'],
  authors: [{ name: 'DevMetrix DevOps Team', url: 'https://devmetrix.in/about' }],
  openGraph: {
    title: 'Git Workflow Best Practices for Development Teams',
    description: 'Learn proven Git strategies used by successful development teams',
    type: 'article',
    publishedTime: '2025-10-17T00:00:00.000Z',
  },
};

export default function GitWorkflowGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="Git Workflow Best Practices for Development Teams"
        description="Optimize your team collaboration with proven Git workflows, branching strategies, and commit conventions."
        datePublished="2025-10-17"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/git-workflow-best-practices"
      />
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full mb-4 border border-green-500/30">
              🔀 DevOps
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 mb-4 leading-tight">
              Git Workflow Best Practices for Development Teams
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 17, 2025</span>
              <span>•</span>
              <span>⏱️ 13 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix DevOps Team</span>
            </div>
            <p className="text-sm text-purple-300/30">Last updated: October 2025 • Reviewed by senior DevOps engineers</p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="sticky top-16 z-40 mb-8 bg-green-900/20 backdrop-blur-sm border border-green-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-green-200/60">
            <span className="whitespace-nowrap">🗺️ Sections:</span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <a href="#why-workflow" className="px-2 py-1 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors whitespace-nowrap">Why Workflow</a>
              <a href="#branching" className="px-2 py-1 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors whitespace-nowrap">Branching</a>
              <a href="#commits" className="px-2 py-1 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors whitespace-nowrap">Commits</a>
              <a href="#collaboration" className="px-2 py-1 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors whitespace-nowrap">Collaboration</a>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 border-2 border-green-500/30 rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">🌳</div>
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4 relative z-10">
              Let's be real - Git can be a mess. I've seen teams where nobody knows which branch to commit to,
              merge conflicts happen daily, and the commit history looks like someone smashed their keyboard.
              But it doesn't have to be this way. A good Git workflow is the difference between a smooth
              development process and absolute chaos.
            </p>
            <p className="text-base text-purple-200/60 relative z-10">
              After working with teams ranging from 2 developers to 50+, I've learned what actually works in
              practice. This isn't theoretical stuff - these are battle-tested strategies that real teams use
              to ship code without losing their minds.
            </p>
          </div>

          {/* Team Size Impact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">👤</div>
              <div className="text-sm font-semibold text-blue-300 mb-2">Solo Developer</div>
              <div className="text-xs text-blue-200/50">Simple workflow, direct to main</div>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-sm font-semibold text-green-300 mb-2">Small Team (2-10)</div>
              <div className="text-xs text-green-200/50">Feature branches, PR reviews</div>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
              <div className="text-sm font-semibold text-purple-300 mb-2">Large Team (10+)</div>
              <div className="text-xs text-purple-200/50">Full GitFlow, release branches</div>
            </div>
          </div>

          <h2 id="why-workflow" className="text-3xl font-bold text-green-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🤔</span>
            Why Git Workflows Even Matter
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            When you're working solo, Git is simple. You commit to main, push, done. But add more people and
            suddenly you need answers: Where do new features go? When do we merge? Who reviews what? Without
            a workflow, everyone does their own thing and merge conflicts become a daily nightmare.
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-6">
            <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-200/80 mb-3 flex items-center gap-2">
                <span>❌</span> Without Workflow
              </h3>
              <ul className="space-y-2 text-sm text-red-200/60">
                <li className="flex gap-2"><span className="text-red-400">•</span> Everyone commits to main directly</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Production breaks frequently</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Can't track what changed and why</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Merge conflicts every day</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Hard to rollback broken features</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> No code review process</li>
              </ul>
            </div>

            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-200/80 mb-3 flex items-center gap-2">
                <span>✅</span> With Good Workflow
              </h3>
              <ul className="space-y-2 text-sm text-green-200/60">
                <li className="flex gap-2"><span className="text-green-400">•</span> Main branch always stable</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Features isolated until ready</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Clear history of changes</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Conflicts resolved early</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Easy to revert bad changes</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Peer review catches bugs</li>
              </ul>
            </div>
          </div>

          <h2 id="branching" className="text-3xl font-bold text-blue-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🌿</span>
            Branching Strategies That Actually Work
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed mb-6">
            There are three main branching strategies teams use. Choose based on your team size and release cadence:
          </p>

          <div className="space-y-8 my-10">
            {/* GitHub Flow */}
            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-2 border-blue-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-200/80 mb-4 flex items-center gap-3">
                <span className="text-3xl">🔵</span>
                GitHub Flow (Simple & Fast)
              </h3>
              <p className="text-sm text-blue-200/60 mb-4">
                Perfect for small teams that deploy frequently. Only two types of branches: main and feature branches.
              </p>

              <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-blue-200/80 mb-3">The Process:</h4>
                <ol className="space-y-2 text-xs text-blue-200/60">
                  <li className="flex gap-2"><span className="font-bold text-blue-300">1.</span> Create feature branch from main</li>
                  <li className="flex gap-2"><span className="font-bold text-blue-300">2.</span> Make commits with clear messages</li>
                  <li className="flex gap-2"><span className="font-bold text-blue-300">3.</span> Open Pull Request when ready</li>
                  <li className="flex gap-2"><span className="font-bold text-blue-300">4.</span> Team reviews and discusses changes</li>
                  <li className="flex gap-2"><span className="font-bold text-blue-300">5.</span> Merge to main after approval</li>
                  <li className="flex gap-2"><span className="font-bold text-blue-300">6.</span> Deploy to production immediately</li>
                </ol>
              </div>

              <pre className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30 overflow-x-auto text-xs mb-4">
                <code className="text-blue-100/80">{`# Create feature branch
git checkout -b feature/add-user-auth

# Make your changes, commit often
git add .
git commit -m "Add login endpoint"

# Push to remote
git push origin feature/add-user-auth

# After PR approval, merge to main
git checkout main
git merge feature/add-user-auth
git push origin main

# Delete feature branch
git branch -d feature/add-user-auth`}</code>
              </pre>

              <div className="flex gap-2 text-xs">
                <span className="px-3 py-1 bg-green-800/40 text-green-200 rounded">✓ Simple</span>
                <span className="px-3 py-1 bg-green-800/40 text-green-200 rounded">✓ Fast deployments</span>
                <span className="px-3 py-1 bg-green-800/40 text-green-200 rounded">✓ Less overhead</span>
              </div>
            </div>

            {/* Git Flow */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-purple-200/80 mb-4 flex items-center gap-3">
                <span className="text-3xl">🟣</span>
                Git Flow (Structured Releases)
              </h3>
              <p className="text-sm text-purple-200/60 mb-4">
                Best for larger teams with scheduled releases. More branches, more control.
              </p>

              <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-purple-200/80 mb-3">Branch Types:</h4>
                <ul className="space-y-2 text-xs text-purple-200/60">
                  <li className="flex gap-2"><span className="text-purple-400">•</span> <strong>main</strong> - Production-ready code</li>
                  <li className="flex gap-2"><span className="text-purple-400">•</span> <strong>develop</strong> - Latest development changes</li>
                  <li className="flex gap-2"><span className="text-purple-400">•</span> <strong>feature/*</strong> - New features</li>
                  <li className="flex gap-2"><span className="text-purple-400">•</span> <strong>release/*</strong> - Preparing for release</li>
                  <li className="flex gap-2"><span className="text-purple-400">•</span> <strong>hotfix/*</strong> - Emergency production fixes</li>
                </ul>
              </div>

              <pre className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 overflow-x-auto text-xs mb-4">
                <code className="text-purple-100/80">{`# Start feature from develop
git checkout develop
git checkout -b feature/new-dashboard

# Work on feature
git commit -am "Add dashboard layout"

# Merge back to develop
git checkout develop
git merge feature/new-dashboard

# Create release branch
git checkout -b release/1.0.0

# After testing, merge to main and develop
git checkout main
git merge release/1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

# Emergency hotfix
git checkout main
git checkout -b hotfix/critical-bug
# Fix bug
git checkout main
git merge hotfix/critical-bug`}</code>
              </pre>

              <div className="flex gap-2 text-xs flex-wrap">
                <span className="px-3 py-1 bg-blue-800/40 text-blue-200 rounded">✓ Organized releases</span>
                <span className="px-3 py-1 bg-blue-800/40 text-blue-200 rounded">✓ Clear separation</span>
                <span className="px-3 py-1 bg-yellow-800/40 text-yellow-200 rounded">⚠ More complex</span>
              </div>
            </div>

            {/* Trunk-Based */}
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-2 border-green-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-200/80 mb-4 flex items-center gap-3">
                <span className="text-3xl">🟢</span>
                Trunk-Based Development (Continuous)
              </h3>
              <p className="text-sm text-green-200/60 mb-4">
                Everyone commits to main (trunk) frequently. Requires excellent CI/CD and testing.
              </p>

              <pre className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs mb-4">
                <code className="text-green-100/80">{`# Work directly on main or very short-lived branches
git checkout main
git pull origin main

# Make small change
git commit -m "Update button color"
git push origin main

# Feature flags for incomplete features
if (featureFlags.newDashboard) {
  // New code
} else {
  // Old code
}`}</code>
              </pre>

              <div className="flex gap-2 text-xs flex-wrap">
                <span className="px-3 py-1 bg-green-800/40 text-green-200 rounded">✓ Fastest integration</span>
                <span className="px-3 py-1 bg-green-800/40 text-green-200 rounded">✓ Reduces conflicts</span>
                <span className="px-3 py-1 bg-red-800/40 text-red-200 rounded">⚠ Needs strong CI/CD</span>
              </div>
            </div>
          </div>

          <h2 id="commits" className="text-3xl font-bold text-orange-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">✍️</span>
            Writing Better Commit Messages
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed mb-6">
            Your commit history is documentation. Bad commits make debugging impossible. Good commits tell
            a clear story of what changed and why.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-200/80 mb-3">❌ Bad Commits:</h3>
              <pre className="bg-red-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-red-100/80">{`git commit -m "fix"
git commit -m "update stuff"
git commit -m "wip"
git commit -m "asdfasdf"
git commit -m "final version"
git commit -m "final version 2"`}</code>
              </pre>
            </div>

            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-200/80 mb-3">✅ Good Commits:</h3>
              <pre className="bg-green-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-green-100/80">{`feat: add user authentication
fix: resolve login timeout issue
docs: update API documentation
refactor: simplify payment logic
test: add unit tests for auth`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-blue-900/10 border-l-4 border-blue-500 rounded-r-lg p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-200/80 mb-4">📝 Conventional Commits Format:</h3>
            <pre className="bg-blue-900/20 p-4 rounded text-xs overflow-x-auto mb-4">
              <code className="text-blue-100/80">{`<type>(<scope>): <subject>

<body>

<footer>

Example:
feat(auth): add password reset functionality

Implement email-based password reset flow with
secure token generation and expiration handling.

Closes #123`}</code>
            </pre>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <span className="px-2 py-1 bg-blue-800/30 rounded"><strong>feat:</strong> New feature</span>
              <span className="px-2 py-1 bg-blue-800/30 rounded"><strong>fix:</strong> Bug fix</span>
              <span className="px-2 py-1 bg-blue-800/30 rounded"><strong>docs:</strong> Documentation</span>
              <span className="px-2 py-1 bg-blue-800/30 rounded"><strong>style:</strong> Formatting</span>
              <span className="px-2 py-1 bg-blue-800/30 rounded"><strong>refactor:</strong> Code cleanup</span>
              <span className="px-2 py-1 bg-blue-800/30 rounded"><strong>test:</strong> Add tests</span>
            </div>
          </div>

          <h2 id="collaboration" className="text-3xl font-bold text-purple-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🤝</span>
            Team Collaboration Best Practices
          </h2>

          <div className="space-y-6 my-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-200/80 mb-3">Pull Request Guidelines:</h3>
              <ul className="space-y-2 text-sm text-purple-200/60">
                <li className="flex gap-2"><span className="text-purple-400">✓</span> Keep PRs small (under 400 lines changed)</li>
                <li className="flex gap-2"><span className="text-purple-400">✓</span> Write clear PR descriptions</li>
                <li className="flex gap-2"><span className="text-purple-400">✓</span> Link related issues</li>
                <li className="flex gap-2"><span className="text-purple-400">✓</span> Add screenshots for UI changes</li>
                <li className="flex gap-2"><span className="text-purple-400">✓</span> Request specific reviewers</li>
                <li className="flex gap-2"><span className="text-purple-400">✓</span> Respond to review comments promptly</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-200/80 mb-3">Code Review Best Practices:</h3>
              <ul className="space-y-2 text-sm text-green-200/60">
                <li className="flex gap-2"><span className="text-green-400">✓</span> Review within 24 hours</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Be constructive, not critical</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Focus on logic, not style (use linters)</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Ask questions, don't demand changes</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Approve if it's good enough, not perfect</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-cyan-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🚨</span>
            Common Problems and Solutions
          </h2>

          <div className="space-y-6 my-8">
            <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-200/80 mb-3">Problem: Merge Conflicts</h3>
              <p className="text-sm text-yellow-200/60 mb-3">
                Solution: Pull from main frequently, keep branches short-lived, communicate with team about overlapping work.
              </p>
              <pre className="bg-yellow-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-yellow-100/80">{`# Stay in sync with main
git checkout main
git pull origin main
git checkout feature/my-branch
git merge main  # Or rebase: git rebase main`}</code>
              </pre>
            </div>

            <div className="bg-orange-900/10 border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-200/80 mb-3">Problem: Accidental Commits to Main</h3>
              <p className="text-sm text-orange-200/60 mb-3">
                Solution: Protect main branch in GitHub/GitLab settings. Require PR reviews before merge.
              </p>
            </div>

            <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-200/80 mb-3">Problem: Need to Undo Changes</h3>
              <pre className="bg-red-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-red-100/80">{`# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a specific commit
git revert <commit-hash>

# Restore deleted file
git checkout HEAD -- <filename>`}</code>
              </pre>
            </div>
          </div>

          {/* Workflow Checklist */}
          <div className="my-12 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-100/80 mb-6 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              Your Git Workflow Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Choose workflow that fits team size</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Create feature branches from main/develop</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Write clear, conventional commit messages</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Keep branches short-lived (1-3 days)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Pull from main frequently</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Open PR when feature is ready</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Require code reviews before merge</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Protect main branch from direct pushes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Delete merged feature branches</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Document workflow in team README</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-12 bg-green-900/10 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-200/80 mb-4">🎯 Bottom Line</h3>
            <p className="text-sm text-green-200/60 leading-relaxed">
              Pick a workflow that matches your team size and stick with it. For most teams, GitHub Flow is
              perfect - it's simple, fast, and gets out of your way. Document your workflow, train new team
              members, and adjust as you grow. The best workflow is the one your team actually follows consistently.
            </p>
          </div>

          {/* Author Box */}
          <div className="mt-16 mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👨‍💻</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-100/80 mb-2">About the Authors</h3>
                <p className="text-sm text-purple-200/60 leading-relaxed mb-3">
                  Written by DevMetrix's DevOps team with experience managing Git workflows for teams from
                  2 to 100+ developers across startups and enterprise companies.
                </p>
                <p className="text-xs text-purple-300/40">
                  ✓ Peer-reviewed by senior engineers • ✓ Updated October 2025 • ✓ Based on real team experiences
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-br from-green-900/20 to-blue-900/20 border-2 border-green-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-green-100/80 mb-4 flex items-center gap-3">
              <span className="text-3xl">🛠️</span>
              Manage Your Code Better
            </h3>
            <p className="text-sm text-green-200/60 mb-4 leading-relaxed">
              Use our code snippet manager to save and organize your Git commands, workflow templates, and
              team conventions for quick reference.
            </p>
            <Link
              href="/tools/code-snippets"
              className="inline-block px-6 py-3 bg-green-600/30 text-green-100 rounded-lg border border-green-500/30 hover:bg-green-500/40 transition-all font-semibold no-underline text-sm"
            >
              Try Code Snippet Manager →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
