// components/Navbar.tsx
'use client';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from '../styles/theme/ThemeToggle';
import Icon from './Icon';

type NavItem = {
  name: string;
  href?: string;
  dropdown?: { name: string; href: string; description: string; icon: string }[];
};

const navStructure: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Tools',
    dropdown: [
      { name: 'All Tools', href: '/tools', description: 'Browse our toolkit', icon: 'build' },
      { name: 'Online Compiler', href: '/tools/online-compiler', description: 'Code in your browser', icon: 'terminal' },
      { name: 'System Designer', href: '/system-design', description: 'Design architecture', icon: 'account_tree' },
    ],
  },
  { name: 'Games', href: '/games' },
  {
    name: 'Resources',
    dropdown: [
      { name: 'Blog', href: '/blog', description: 'Latest articles', icon: 'article' },
      { name: 'Code Examples', href: '/examples', description: 'Learn by example', icon: 'code' },
      { name: 'Cheat Sheets', href: '/cheat-sheets', description: 'Quick reference', icon: 'fact_check' },
      { name: 'Comparisons', href: '/compare', description: 'Tech comparisons', icon: 'compare_arrows' },
    ],
  },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150 && !isOpen && !activeDropdown);
  });

  // Close menus on navigation
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href?: string) =>
    !!href && (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const isGroupActive = (item: NavItem) => item.dropdown?.some((d) => isActive(d.href)) ?? false;

  const pill = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-sm transition-all inline-flex items-center gap-1 ${
      active ? 'bg-surface/20 text-foreground font-semibold shadow-sm' : 'text-muted hover:text-foreground hover:bg-surface/15'
    }`;

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: '-120%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 inset-x-0 z-[100] px-4 md:px-12 pt-3"
    >
      <div className="glass mx-auto max-w-[1340px] h-16 rounded-full px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-surface/20 border border-border/30 grid place-items-center text-foreground">
            <Icon name="bubble_chart" className="text-[20px]" />
          </span>
          <span className="font-bold text-xl tracking-tight text-foreground">
            DevMetrix<span className="text-accent font-mono text-xs ml-1">cloud</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-surface/10 border border-border/10">
          {navStructure.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.dropdown ? (
                <>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={activeDropdown === item.name}
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    onKeyDown={(e) => e.key === 'Escape' && setActiveDropdown(null)}
                    className={pill(isGroupActive(item) || activeDropdown === item.name)}
                  >
                    {item.name}
                    <Icon
                      name="expand_more"
                      className={`text-[18px] transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 pt-3 w-80"
                      >
                        <div role="menu" className="rounded-3xl bg-background/90 backdrop-blur-xl border border-border/25 shadow-2xl p-2">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              role="menuitem"
                              className={`group flex items-start gap-3 px-3 py-3 rounded-2xl transition-colors hover:bg-surface/15 ${
                                isActive(sub.href) ? 'bg-surface/15' : ''
                              }`}
                            >
                              <span className="w-9 h-9 shrink-0 rounded-full bg-surface/15 border border-border/20 grid place-items-center text-accent">
                                <Icon name={sub.icon} className="text-[18px]" />
                              </span>
                              <span>
                                <span className="block text-sm font-bold text-foreground">{sub.name}</span>
                                <span className="block text-xs text-muted mt-0.5">{sub.description}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href={item.href!} aria-current={isActive(item.href) ? 'page' : undefined} className={pill(isActive(item.href))}>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden xl:block"><ThemeToggle /></div>
          <Link href="/blog/submit" className="hidden sm:inline-flex btn-solid items-center gap-1.5 px-5 py-2.5 text-sm">
            <Icon name="edit" className="text-[16px]" />
            Submit Post
          </Link>
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-surface/15 border border-border/25 grid place-items-center text-foreground"
          >
            <Icon name={isOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden mx-auto max-w-[1340px] mt-2"
          >
            <div className="rounded-3xl bg-background/90 backdrop-blur-xl border border-border/25 shadow-2xl p-3 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {navStructure.map((item) =>
                item.dropdown ? (
                  <div key={item.name}>
                    <button
                      type="button"
                      aria-expanded={mobileExpanded === item.name}
                      onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-foreground font-semibold hover:bg-surface/10"
                    >
                      {item.name}
                      <Icon name="expand_more" className={`text-[20px] transition-transform ${mobileExpanded === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === item.name && (
                      <div className="pl-3 pb-2 space-y-1">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-surface/10 ${isActive(sub.href) ? 'bg-surface/15' : ''}`}
                          >
                            <Icon name={sub.icon} className="text-[20px] text-accent" />
                            <span>
                              <span className="block text-sm font-bold text-foreground">{sub.name}</span>
                              <span className="block text-xs text-muted">{sub.description}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href!}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block px-4 py-3 rounded-2xl font-semibold hover:bg-surface/10 ${
                      isActive(item.href) ? 'bg-surface/20 text-foreground' : 'text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}

              <div className="p-2 pt-4 space-y-3">
                <Link href="/blog/submit" className="btn-solid w-full inline-flex items-center justify-center gap-2 px-6 py-3">
                  <Icon name="edit" className="text-[18px]" />
                  Submit Post
                </Link>
                <div className="flex justify-center"><ThemeToggle /></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}