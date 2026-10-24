// app/community/page.tsx
'use client';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import NewsletterCTA from '@/components/NewsletterCTA';
import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { number: '15,000+', label: 'Developers' },
  { number: '250+', label: 'Open Source Projects' },
  { number: '1M+', label: 'Code Executions' },
  { number: '50+', label: 'Countries' },
];

const channels = [
  { icon: 'forum', title: 'Discord Server', description: 'Real-time chat with developers. Get help, share projects, and make friends.', members: '12,000+ members', action: 'Join Discord', link: 'https://discord.gg/devmetrix' },
  { icon: 'code', title: 'GitHub Organization', description: 'Contribute to open source projects. Browse repositories and submit PRs.', members: '250+ repositories', action: 'View GitHub', link: 'https://github.com/devmetrix-cloud' },
  { icon: 'groups', title: 'Discussion Forum', description: 'Long-form discussions, tutorials, and Q&A. Search thousands of threads.', members: '5,000+ discussions', action: 'Browse Forum', link: '/forum' },
  { icon: 'terminal', title: 'Code Challenges', description: 'Solve algorithm challenges. Compete on leaderboards and improve skills.', members: '500+ challenges', action: 'Start Coding', link: '/challenges' },
];

const members = [
  { name: 'Sarah Chen', role: 'Full Stack Developer', contribution: 'Created 12 open source tools' },
  { name: 'Alex Kumar', role: 'DevOps Engineer', contribution: 'Solved 150+ code challenges' },
  { name: 'Maria Garcia', role: 'Backend Architect', contribution: 'Contributed to 25 projects' },
];

function ChannelButton({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = 'btn-solid mt-auto self-start inline-flex items-center gap-2 px-6 py-3';
  return href.startsWith('/') ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  );
}

export default function CommunityPage() {
  return (
    <>
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="chip glass mb-4">Developer Network</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground">
              Join the <span className="text-accent">Matrix</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto">
              Connect with 15,000+ developers. Share knowledge, collaborate on open source, and grow together.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass rounded-3xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Channels */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-foreground">
              Connect With <span className="text-accent">Us</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {channels.map((channel, index) => (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group glass glass-hover rounded-3xl p-8 flex flex-col"
                >
                  <span className="w-14 h-14 mb-5 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent transition-transform group-hover:scale-110">
                    <Icon name={channel.icon} className="text-[28px]" />
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{channel.title}</h3>
                  <p className="text-muted mb-3">{channel.description}</p>
                  <div className="text-sm text-accent font-semibold mb-6">{channel.members}</div>
                  <ChannelButton href={channel.link}>
                    {channel.action}
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </ChannelButton>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Spotlight */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-foreground">
              Community <span className="text-accent">Spotlight</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {members.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass glass-hover rounded-3xl p-6 text-center"
                >
                  <span className="w-20 h-20 mx-auto mb-4 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-accent">
                    <Icon name="person" className="text-[40px]" />
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-accent text-sm mb-3">{member.role}</p>
                  <p className="text-muted text-sm">{member.contribution}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <NewsletterCTA />
        </div>
      </div>
      <Footer />
    </>
  );
}