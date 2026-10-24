// app/cheat-sheets/[slug]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Git Commands Cheat Sheet | DevMetrix`,
    description: 'Complete Git commands reference with examples',
  };
}

export default function CheatSheetPage({ params }: Props) {
  // Static data - in production, fetch from CMS or markdown files
  const commands = [
    {
      category: 'Setup & Config',
      items: [
        { command: 'git config --global user.name "[name]"', description: 'Set your name for commits' },
        { command: 'git config --global user.email "[email]"', description: 'Set your email for commits' },
        { command: 'git init', description: 'Initialize a new Git repository' },
      ]
    },
    {
      category: 'Basic Snapshots',
      items: [
        { command: 'git status', description: 'Show the working tree status' },
        { command: 'git add [file]', description: 'Add file to staging area' },
        { command: 'git add .', description: 'Add all files to staging area' },
        { command: 'git commit -m "[message]"', description: 'Commit staged changes' },
        { command: 'git commit -am "[message]"', description: 'Add and commit in one command' },
      ]
    },
    {
      category: 'Branching & Merging',
      items: [
        { command: 'git branch', description: 'List all branches' },
        { command: 'git branch [branch-name]', description: 'Create a new branch' },
        { command: 'git checkout [branch-name]', description: 'Switch to a branch' },
        { command: 'git checkout -b [branch-name]', description: 'Create and switch to new branch' },
        { command: 'git merge [branch]', description: 'Merge branch into current branch' },
        { command: 'git branch -d [branch-name]', description: 'Delete a branch' },
      ]
    },
    {
      category: 'Remote Repositories',
      items: [
        { command: 'git clone [url]', description: 'Clone a repository' },
        { command: 'git remote add origin [url]', description: 'Add remote repository' },
        { command: 'git push origin [branch]', description: 'Push changes to remote' },
        { command: 'git pull', description: 'Fetch and merge remote changes' },
        { command: 'git fetch', description: 'Download remote changes' },
      ]
    },
    {
      category: 'Inspection & Comparison',
      items: [
        { command: 'git log', description: 'Show commit history' },
        { command: 'git log --oneline', description: 'Show compact commit history' },
        { command: 'git diff', description: 'Show changes in working directory' },
        { command: 'git show [commit]', description: 'Show commit details' },
      ]
    },
    {
      category: 'Undo Changes',
      items: [
        { command: 'git reset [file]', description: 'Unstage a file' },
        { command: 'git reset --hard', description: 'Reset to last commit (danger!)' },
        { command: 'git revert [commit]', description: 'Revert a commit' },
        { command: 'git checkout -- [file]', description: 'Discard changes in file' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/cheat-sheets"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-8 transition-colors"
        >
          ← Back to Cheat Sheets
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl">
              🔀
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-red-200">
                Git Commands Cheat Sheet
              </h1>
              <p className="text-purple-200/60 mt-2">
                Essential Git commands for version control
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-semibold flex items-center gap-2">
              📥 Download PDF
            </button>
            <button className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 text-purple-100 rounded-lg hover:bg-purple-800/30 transition-colors font-semibold flex items-center gap-2">
              🖨️ Print
            </button>
            <button className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 text-purple-100 rounded-lg hover:bg-purple-800/30 transition-colors font-semibold flex items-center gap-2">
              📋 Copy All
            </button>
          </div>
        </div>

        {/* Commands */}
        <div className="space-y-8">
          {commands.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold text-purple-100 mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></span>
                {section.category}
              </h2>

              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-lg p-4 hover:border-purple-400/40 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <code className="text-purple-300 font-mono text-sm bg-purple-950/50 px-3 py-1 rounded flex-1">
                        {item.command}
                      </code>
                      <button className="text-purple-400 hover:text-purple-300 text-xs transition-colors self-end md:self-auto">
                        📋 Copy
                      </button>
                    </div>
                    <p className="text-sm text-purple-200/60 mt-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related */}
        <div className="mt-16 bg-purple-900/20 border border-purple-500/30 rounded-xl p-8">
          <h3 className="text-xl font-bold text-purple-100 mb-4">
            📚 Related Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/git-workflow-best-practices" className="text-purple-300 hover:text-purple-200 transition-colors">
              → Git Workflow Best Practices
            </Link>
            <Link href="/cheat-sheets/linux-terminal" className="text-purple-300 hover:text-purple-200 transition-colors">
              → Linux Terminal Commands
            </Link>
            <Link href="/examples/javascript" className="text-purple-300 hover:text-purple-200 transition-colors">
              → JavaScript Code Examples
            </Link>
            <Link href="/tools/code-snippets" className="text-purple-300 hover:text-purple-200 transition-colors">
              → Try Code Snippets Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all cheat sheets
export async function generateStaticParams() {
  return [
    { slug: 'git-commands' },
    { slug: 'docker-commands' },
    { slug: 'javascript-array-methods' },
    { slug: 'http-status-codes' },
    { slug: 'regex-patterns' },
    { slug: 'sql-queries' },
    { slug: 'linux-terminal' },
    { slug: 'css-flexbox' },
  ];
}
