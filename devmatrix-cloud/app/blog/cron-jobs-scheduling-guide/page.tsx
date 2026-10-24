// app/blog/cron-jobs-scheduling-guide/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cron Jobs and Task Scheduling: A Practical Guide | DevMetrix',
  description: 'Master cron expressions and automated task scheduling. Real-world examples, common patterns, and debugging tips.',
  keywords: ['cron jobs', 'task scheduling', 'automation', 'cron expression', 'linux cron'],
};

export default function CronJobsGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="Cron Jobs and Task Scheduling: A Practical Guide"
        description="Master cron expressions, scheduling patterns, and best practices for automated task execution in production environments."
        datePublished="2025-10-21"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/cron-jobs-scheduling-guide"
      />
      <div className="max-w-4xl mx-auto prose prose-invert prose-purple prose-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-100/80 mb-4">
          Cron Jobs and Task Scheduling: A Practical Guide
        </h1>

        <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-8">
          <span>October 21, 2025</span>
          <span>•</span>
          <span>12 min read</span>
          <span>•</span>
          <span>DevOps</span>
        </div>

        <p className="text-lg md:text-xl text-purple-200/60 leading-relaxed">
          Ever needed something to run automatically at 3 AM? Or maybe send out emails every Monday
          morning? That's where cron jobs come in. They're one of those things that seem complicated
          until you actually use them, then you wonder how you ever lived without them.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          What the Heck is Cron Anyway?
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed">
          Cron is basically a time-based job scheduler in Unix-like systems. Think of it as your
          server's personal assistant that never sleeps, never forgets, and does exactly what you
          tell it to do, when you tell it to do it. Need to back up your database every night?
          Cron's got you. Want to clean up temporary files every hour? Cron can handle that too.
        </p>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed mt-4">
          The name comes from "chronos," the Greek word for time. And yeah, it's been around since
          the 1970s. Old school? Sure. But it still works perfectly, which is why every modern
          cloud platform and container system has some version of it.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Understanding Cron Expressions
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Here's where people usually get confused. A cron expression looks like gibberish at first:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`0 3 * * *`}</code>
        </pre>

        <p className="text-sm md:text-base text-purple-200/50 mt-4">
          But it's actually pretty logical once you know the pattern:
        </p>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 md:p-6 my-6">
          <pre className="text-xs md:text-sm text-purple-100/80 overflow-x-auto">
            <code>{`┌───────────── minute (0-59)
│ ┌─────────── hour (0-23)
│ │ ┌───────── day of month (1-31)
│ │ │ ┌─────── month (1-12)
│ │ │ │ ┌───── day of week (0-7, Sunday is 0 or 7)
│ │ │ │ │
* * * * *`}</code>
          </pre>
        </div>

        <p className="text-sm md:text-base text-purple-200/50">
          So that <code className="text-purple-300/70">0 3 * * *</code> we saw earlier? It means
          "run at 3:00 AM every day." The zeros and asterisks each tell cron something specific about
          when to run your job.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Common Patterns You'll Actually Use
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Let me show you the patterns I use most often. Forget the theory - these are the ones that
          solve real problems:
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <code className="text-purple-300 font-semibold">* * * * *</code>
            <p className="text-sm text-purple-200/50 mt-2">Every minute (good for testing, terrible for production)</p>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <code className="text-purple-300 font-semibold">*/5 * * * *</code>
            <p className="text-sm text-purple-200/50 mt-2">Every 5 minutes - perfect for health checks</p>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <code className="text-purple-300 font-semibold">0 * * * *</code>
            <p className="text-sm text-purple-200/50 mt-2">Every hour on the hour - data sync, anyone?</p>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <code className="text-purple-300 font-semibold">0 2 * * *</code>
            <p className="text-sm text-purple-200/50 mt-2">2 AM daily - the classic backup time</p>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <code className="text-purple-300 font-semibold">0 9 * * 1</code>
            <p className="text-sm text-purple-200/50 mt-2">9 AM every Monday - weekly reports</p>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <code className="text-purple-300 font-semibold">0 0 1 * *</code>
            <p className="text-sm text-purple-200/50 mt-2">First day of every month - billing cycles</p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Advanced Patterns (When Simple Isn't Enough)
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Sometimes you need more control. Here's where cron gets really powerful:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`// Run every weekday at 9 AM (Monday-Friday)
0 9 * * 1-5

// Run every 15 minutes during business hours
*/15 9-17 * * 1-5

// Run on the 1st and 15th of every month
0 0 1,15 * *

// Run every 2 hours
0 */2 * * *

// Run every Sunday at midnight
0 0 * * 0

// Multiple times a day (9 AM, 2 PM, 6 PM)
0 9,14,18 * * *`}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Setting Up Your First Cron Job
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Alright, enough theory. Let's actually set one up. On Linux or Mac, you use the crontab command:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`// Open your crontab file for editing
crontab -e

// List your current cron jobs
crontab -l

// Remove all your cron jobs (careful!)
crontab -r`}</code>
        </pre>

        <p className="text-sm md:text-base text-purple-200/50 mt-4 mb-4">
          When you run <code className="text-purple-300/70">crontab -e</code>, it opens a text editor.
          Add your jobs one per line:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`// Back up database every night at 2 AM
0 2 * * * /home/user/scripts/backup.sh

// Clean temp files every hour
0 * * * * rm -rf /tmp/cache/*

// Send reminder emails Monday mornings
0 9 * * 1 node /app/send-reminders.js

// Health check every 5 minutes
*/5 * * * * curl https://myapp.com/health`}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Real-World Examples That Actually Matter
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Database Backup Script
        </h3>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          This is probably the most common use case. Here's how I do it:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="myapp"

# Create backup
pg_dump $DB_NAME > "$BACKUP_DIR/backup_$DATE.sql"

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete

# Cron entry: 0 2 * * * /home/user/scripts/backup.sh`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Log Rotation
        </h3>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Logs can eat up disk space fast. Clean them up automatically:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`// Every day at 3 AM, compress old logs
0 3 * * * gzip /var/log/app/*.log

// Delete logs older than 30 days
0 4 * * * find /var/log/app -name "*.log.gz" -mtime +30 -delete`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Monitoring and Alerts
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`#!/bin/bash
# check-disk-space.sh

THRESHOLD=90
USAGE=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')

if [ $USAGE -gt $THRESHOLD ]; then
    echo "Disk usage is $USAGE%" | mail -s "ALERT: High Disk Usage" admin@example.com
fi

# Run every hour
# 0 * * * * /home/user/scripts/check-disk-space.sh`}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Common Gotchas (Learn From My Mistakes)
        </h2>

        <div className="space-y-6 my-8">
          <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-red-300 mb-3">Problem: Your Cron Job Isn't Running</h3>
            <p className="text-xs md:text-sm text-red-200/70 mb-3">
              First thing to check: Is cron actually running? On most systems:
            </p>
            <pre className="bg-red-900/20 p-3 rounded text-xs overflow-x-auto">
              <code className="text-red-100/80">{`systemctl status cron
// or
service cron status`}</code>
            </pre>
          </div>

          <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-yellow-300 mb-3">Problem: Path Issues</h3>
            <p className="text-xs md:text-sm text-yellow-200/70 mb-3">
              Cron runs with a minimal environment. Always use full paths:
            </p>
            <pre className="bg-yellow-900/20 p-3 rounded text-xs overflow-x-auto">
              <code className="text-yellow-100/80">{`// Bad
0 0 * * * backup.sh

// Good
0 0 * * * /home/user/scripts/backup.sh

// Even better - set PATH at top of crontab
PATH=/usr/local/bin:/usr/bin:/bin
0 0 * * * backup.sh`}</code>
            </pre>
          </div>

          <div className="bg-orange-900/10 border border-orange-500/30 rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-orange-300 mb-3">Problem: No Error Messages</h3>
            <p className="text-xs md:text-sm text-orange-200/70 mb-3">
              By default, cron emails errors. But who checks email anymore? Redirect output to a log file:
            </p>
            <pre className="bg-orange-900/20 p-3 rounded text-xs overflow-x-auto">
              <code className="text-orange-100/80">{`// Send output to log file
0 2 * * * /path/to/script.sh >> /var/log/cron.log 2>&1

// Or just errors
0 2 * * * /path/to/script.sh 2>> /var/log/cron-errors.log`}</code>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Modern Alternatives (Because Options Are Good)
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Don't get me wrong - cron is great. But sometimes you need something with more features:
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-base font-semibold text-purple-100/70 mb-2">Node.js: node-cron</h3>
            <pre className="bg-purple-900/20 p-3 rounded text-xs overflow-x-auto mt-2">
              <code className="text-purple-100/80">{`const cron = require('node-cron');

cron.schedule('0 2 * * *', () => {
  console.log('Running backup at 2 AM');
  backupDatabase();
});`}</code>
            </pre>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-base font-semibold text-purple-100/70 mb-2">Python: APScheduler</h3>
            <pre className="bg-purple-900/20 p-3 rounded text-xs overflow-x-auto mt-2">
              <code className="text-purple-100/80">{`from apscheduler.schedulers.blocking import BlockingScheduler

scheduler = BlockingScheduler()
scheduler.add_job(backup_function, 'cron', hour=2)
scheduler.start()`}</code>
            </pre>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-base font-semibold text-purple-100/70 mb-2">Cloud: AWS EventBridge, Google Cloud Scheduler</h3>
            <p className="text-xs text-purple-200/50 mt-2">
              These give you better monitoring, retries, and don't depend on a single server staying up.
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Testing Your Cron Jobs
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Never wait until 3 AM to see if your job works. Test it first:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`// Run the script manually first
bash /path/to/script.sh

// Set up a test job that runs every minute
* * * * * /path/to/script.sh >> /tmp/test.log 2>&1

// Check the log after a minute
tail -f /tmp/test.log

// Once it works, change to your actual schedule
// And remove the test logging if you don't need it`}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Final Tips
        </h2>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 md:p-6 my-6">
          <ul className="space-y-3 text-sm text-purple-200/50">
            <li>✅ Always log your cron job output somewhere</li>
            <li>✅ Use locking mechanisms to prevent overlap on long-running jobs</li>
            <li>✅ Consider time zones - cron uses the server's timezone</li>
            <li>✅ Document your cron jobs in your project README</li>
            <li>✅ Set up monitoring alerts if critical jobs fail</li>
            <li>❌ Don't schedule resource-intensive jobs during peak hours</li>
            <li>❌ Don't forget about daylight saving time changes</li>
          </ul>
        </div>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed">
          Cron jobs are one of those tools that seem intimidating at first but become indispensable
          once you start using them. Start with something simple - maybe a daily backup or a weekly
          cleanup script. Once you see how well it works, you'll find yourself automating all sorts
          of repetitive tasks.
        </p>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed mt-4">
          And remember: if you can't remember a cron expression, don't feel bad. Neither can anyone
          else. That's what tools and generators are for.
        </p>

        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-purple-900/20 border border-purple-500/20 rounded-lg">
          <h3 className="text-xl md:text-2xl font-semibold text-purple-100/70 mb-3 md:mb-4">
            Build Cron Expressions Visually
          </h3>
          <p className="text-sm md:text-base text-purple-200/50 mb-4">
            Use our cron generator to create expressions with a visual interface. No memorization needed!
          </p>
          <Link
            href="/tools/cron-generator"
            className="inline-block px-4 md:px-6 py-2 md:py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline text-sm md:text-base"
          >
            Try Cron Generator →
          </Link>
        </div>
      </div>
    </article>
  );
}
