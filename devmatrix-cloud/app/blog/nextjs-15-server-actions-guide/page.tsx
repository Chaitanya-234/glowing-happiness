'use client';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Code,
    Database,
    Layers,
    Menu,
    RefreshCw,
    Server,
    Shield,
    X,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface Concept {
  id: string;
  title: string;
  icon: string;
  description: string;
  benefits: string[];
}

export default function ServerActionsGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: Zap },
    { id: 'what-are-actions', title: 'What are Server Actions?', icon: Server },
    { id: 'implementation', title: 'Implementation', icon: Code },
    { id: 'backend-integration', title: 'Spring Boot Integration', icon: Database },
    { id: 'optimistic-ui', title: 'Optimistic UI', icon: RefreshCw },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'best-practices', title: 'Best Practices', icon: Layers },
  ];

  const checklistItems: string[] = [
    'Enable Server Actions in Next.js config (if needed)',
    'Define actions in "use server" files',
    'Implement Zod validation for inputs',
    'Set up Spring Boot API endpoints',
    'Handle loading states with useFormStatus',
    'Implement optimistic updates with useOptimistic',
    'Secure actions with authentication checks',
    'Handle errors gracefully with try/catch',
  ];

  const concepts: Concept[] = [
    {
      id: 'rpcs',
      title: 'RPCs (Remote Procedure Calls)',
      icon: '📞',
      description: 'Server Actions function like RPCs. You call a function in your client component, and Next.js handles the network request to the server automatically.',
      benefits: ['No API routes needed', 'Type safety', 'Reduced boilerplate']
    },
    {
      id: 'progressive-enhancement',
      title: 'Progressive Enhancement',
      icon: '📈',
      description: 'Server Actions work even if JavaScript is disabled in the browser (when used with forms), ensuring your app is robust and accessible.',
      benefits: ['Accessibility', 'Robustness', 'SEO friendly']
    },
    {
      id: 'revalidation',
      title: 'Cache Revalidation',
      icon: '🔄',
      description: 'Integrated directly with the Next.js cache. You can revalidate paths or tags within an action to update the UI instantly.',
      benefits: ['Instant updates', 'Cache control', 'Dynamic data']
    }
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);

      const sectionElements = sections.map(s => document.getElementById(s.id));
      const currentSection = sectionElements.findIndex((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });

      if (currentSection !== -1) {
        setActiveSection(sections[currentSection].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const toggleChecklist = (index: number): void => {
    setChecklist(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleSection = (id: string): void => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const completedItems = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-sans">
      <JsonLdArticle
        headline="Next.js 15 Server Actions: The Complete Guide for 2025"
        description="Master Next.js 15 Server Actions with this comprehensive guide. Learn how to build type-safe, efficient data mutations with Spring Boot integration."
        datePublished="2025-11-21"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/nextjs-15-server-actions-guide"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-purple-600 hover:bg-purple-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-purple-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-purple-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-300 hover:bg-purple-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-purple-900/30 rounded-lg">
            <div className="text-sm text-purple-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-purple-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 leading-tight mb-4 lg:mb-6">
              Next.js 15 Server Actions: The Complete Guide for 2025
            </h1>
            <p className="text-purple-300/90 text-base lg:text-lg mb-4">
              Say goodbye to API routes. Server Actions are changing how we build full-stack React applications. Here is everything you need to know.
            </p>
            <div className="flex flex-wrap gap-3 text-purple-400 text-xs sm:text-sm">
              <span>📅 November 21, 2025</span>
              <span>•</span>
              <span>⏱️ 28 min read</span>
              <span>•</span>
              <span>🏷️ Web Development</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-purple-200/80">
                <p>
                  In the past, handling form submissions in React meant creating an API route, managing loading states, handling errors manually, and ensuring type safety across the network boundary. <strong className="text-purple-300">It was tedious.</strong>
                </p>
                <p>
                  Next.js 15 Server Actions simplify this dramatically. They allow you to execute server-side code directly from your components, acting like inline API endpoints. But how do you integrate them with a robust backend like <strong className="text-blue-400">Spring Boot</strong>?
                </p>
                <div className="bg-purple-800/20 border-l-4 border-purple-500 p-4 rounded mt-6">
                  <p className="text-sm text-purple-300">
                    💡 <strong>Why This Matters:</strong> Server Actions reduce boilerplate, improve performance, and allow for a more seamless developer experience in 2025.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Concepts Section */}
          <section id="what-are-actions" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Server className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Core Concepts</h2>
              </div>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-purple-800/30 hover:bg-purple-800/50 p-4 rounded-lg transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.icon}</span>
                      <span className="font-semibold text-purple-300">{concept.title}</span>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="bg-gray-900/50 p-4 rounded-b-lg border-t-0 border border-purple-500/20 mt-0">
                      <p className="text-purple-200/80 mb-3">{concept.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {concept.benefits.map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full">
                            ✓ {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Section */}
          <section id="implementation" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Implementing Server Actions</h2>
              </div>

              <div className="space-y-4 text-purple-200/80 mb-6">
                <p>Let's build a simple form that creates a user. We define the action in a separate file with the <code>'use server'</code> directive.</p>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-mono">actions/createUser.ts</span>
                  <Code size={16} className="text-purple-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-blue-400">{`'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call Spring Boot Backend
  try {
    const response = await fetch('http://backend-api:8080/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) throw new Error('Failed to create user');

    revalidatePath('/users');
    return { message: 'User created successfully!' };
  } catch (e) {
    return { message: 'Database Error: Failed to Create User' };
  }
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Spring Boot Integration Section */}
          <section id="backend-integration" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">The Spring Boot Backend</h2>
              </div>

              <p className="text-purple-200/80 mb-6">
                In many enterprise architectures, Next.js acts as the "Backend for Frontend" (BFF), while Spring Boot handles the core business logic and database interactions.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-mono">UserController.java</span>
                  <Code size={16} className="text-purple-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-blue-400">{`@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody @Valid CreateUserRequest request) {
        UserDTO user = userService.createUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user);
    }
}

// DTO with Validation
public class CreateUserRequest {
    @NotNull
    @Email
    private String email;

    @NotNull
    @Size(min = 2)
    private String name;

    // Getters and Setters
}`}</code>
                </pre>
              </div>

              <div className="mt-6 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-blue-300">
                  💡 <strong>Pro Tip:</strong> Ensure your Spring Boot API returns clear error codes (400 for validation, 500 for server errors) so your Next.js Server Action can handle them appropriately.
                </p>
              </div>
            </div>
          </section>

          {/* Optimistic UI Section */}
          <section id="optimistic-ui" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Optimistic UI Updates</h2>
              </div>

              <p className="text-purple-200/80 mb-6">
                Users expect instant feedback. With `useOptimistic`, you can update the UI immediately while the server action runs in the background.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-mono">components/UserForm.tsx</span>
                  <Code size={16} className="text-purple-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-blue-400">{`'use client';
import { useOptimistic } from 'react';
import { createUser } from '@/actions/createUser';

export function UserForm({ users }: { users: User[] }) {
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (state, newUser: User) => [...state, newUser]
  );

  async function action(formData: FormData) {
    const newUser = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      id: 'temp-id',
    };

    addOptimisticUser(newUser); // Instant UI update
    await createUser(null, formData); // Actual server request
  }

  return (
    <form action={action}>
       {/* Form fields */}
       <ul>
         {optimisticUsers.map(user => (
           <li key={user.id}>{user.name} ({user.email})</li>
         ))}
       </ul>
    </form>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-purple-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Security Considerations</h2>
              </div>

              <p className="text-purple-200/80 mb-6">
                Server Actions are public API endpoints. Treat them as such.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'Authentication', desc: 'Always check if the user is authenticated inside the Server Action.' },
                  { title: 'Authorization', desc: 'Verify if the user has permission to perform the action.' },
                  { title: 'Input Validation', desc: 'Never trust client data. Validate with Zod or Yup on the server.' },
                  { title: 'Rate Limiting', desc: 'Implement rate limiting to prevent abuse.' },
                ].map((practice, idx) => (
                  <div key={idx} className="bg-gray-900/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-purple-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                ✅ Implementation Checklist
              </h3>
              <p className="text-purple-200/80 mb-6">
                Ensure your Server Actions are production-ready:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-blue-300 line-through' : 'text-purple-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-2">
                  Accelerate Your Development
                </h3>
                <p className="text-purple-200/80 mb-0 max-w-xl">
                    Need to test your new APIs? Use our tools to validate JSON, test regex, and more.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Explore Tools →
                </a>
                <Link
                    href="/blog"
                    className="inline-block bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Read More Blogs
                </Link>
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="mb-16">
             <h2 className="text-2xl font-bold text-purple-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/zero-downtime-springboot-aws-eb" className="block p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 transition-all group">
                    <h3 className="font-bold text-purple-200 group-hover:text-white transition-colors">Spring Boot Deployment</h3>
                    <p className="text-sm text-purple-400/60 mt-2">Deploy your Spring Boot backend with zero downtime.</p>
                </Link>
                <Link href="/blog/rest-api-design-best-practice" className="block p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 transition-all group">
                    <h3 className="font-bold text-purple-200 group-hover:text-white transition-colors">REST API Design</h3>
                    <p className="text-sm text-purple-400/60 mt-2">Design better APIs for your Server Actions to consume.</p>
                </Link>
                 <Link href="/blog/typescript-advanced-patterns" className="block p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 transition-all group">
                    <h3 className="font-bold text-purple-200 group-hover:text-white transition-colors">Advanced TypeScript</h3>
                    <p className="text-sm text-purple-400/60 mt-2">Improve your type safety in Next.js.</p>
                </Link>
                <Link href="/blog/web-security-essentials" className="block p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 transition-all group">
                    <h3 className="font-bold text-purple-200 group-hover:text-white transition-colors">Web Security</h3>
                    <p className="text-sm text-purple-400/60 mt-2">Secure your applications from common threats.</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-purple-300 mb-4">Conclusion</h2>
              <p className="text-purple-200/80 mb-4">
                Next.js 15 Server Actions represent a massive leap forward in React application architecture. They simplify data mutation, improve performance, and reduce the need for separate API layers in the frontend.
              </p>
              <p className="text-purple-200/80">
                By combining them with a robust backend like Spring Boot, you get the best of both worlds: <strong className="text-blue-400">rapid frontend development</strong> and <strong className="text-blue-400">enterprise-grade backend reliability</strong>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
