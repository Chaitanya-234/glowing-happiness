'use client';
import JsonLdArticle from '@/components/JsonLdArticle';
import { CheckCircle, ChevronDown, ChevronUp, Circle, Cloud, Code, GitBranch, Menu, PlayCircle, Shield, X, Zap } from 'lucide-react';
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

export default function ZeroDowntimeGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: PlayCircle },
    { id: 'aws-eb-overview', title: 'AWS EB Overview', icon: Cloud },
    { id: 'zero-downtime-concepts', title: 'Zero-Downtime Concepts', icon: Zap },
    { id: 'setup-blue-green', title: 'Blue/Green Setup', icon: GitBranch },
    { id: 'automation', title: 'Automation & CI/CD', icon: Code },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'real-world', title: 'Real-World Examples', icon: CheckCircle },
  ];

  const checklistItems: string[] = [
    'Setup two identical EB environments (Blue/Green)',
    'Automate build and test via AWS CodePipeline',
    'Implement health checks and monitoring',
    'Use IAM roles with least privilege',
    'Enable encrypted environment variables',
    'Automate CNAME swap on successful deploy',
    'Plan rollback strategy and audit logging',
    'Test deployment in non-production first',
    'Document procedures and contacts',
  ];

  const concepts: Concept[] = [
    {
      id: 'blue-green',
      title: 'Blue/Green Deployments',
      icon: '🔵🟢',
      description: 'Maintain two identical production environments. Deploy to inactive environment, test thoroughly, then switch traffic instantly. Provides immediate rollback capability.',
      benefits: ['Instant rollback', 'Zero downtime', 'Full testing before switch']
    },
    {
      id: 'rolling',
      title: 'Rolling Deployments',
      icon: '🔄',
      description: 'Update instances incrementally, replacing a subset at a time. Ensures healthy instances remain available throughout the deployment process.',
      benefits: ['Resource efficient', 'Gradual updates', 'Continuous availability']
    },
    {
      id: 'health',
      title: 'Health Checks & Load Balancing',
      icon: '❤️',
      description: 'Load balancers continuously monitor instance health. Traffic only routes to healthy instances that pass health check endpoints.',
      benefits: ['Automatic failover', 'Traffic optimization', 'Real-time monitoring']
    },
    {
      id: 'flags',
      title: 'Feature Flags',
      icon: '🚩',
      description: 'Decouple deployment from feature releases. Deploy code with features disabled, then enable gradually for specific user segments.',
      benefits: ['Risk mitigation', 'A/B testing', 'Fine-grained control']
    },
    {
      id: 'cicd',
      title: 'CI/CD Automation',
      icon: '⚙️',
      description: 'Fully automated pipeline for build, test, and deploy. Ensures consistent, error-free deployments with comprehensive audit trails.',
      benefits: ['Reduced errors', 'Faster releases', 'Complete auditability']
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <JsonLdArticle
        headline="Zero-Downtime Deployments of Spring Boot on AWS Elastic Beanstalk: Complete Setup"
        description="Master zero-downtime deployments for Spring Boot apps on AWS Elastic Beanstalk with detailed setup, blue/green deployments, CI/CD pipelines, security best practices, and real-world examples."
        datePublished="2025-11-19"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/zero-downtime-springboot-aws-eb"
      />
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-purple-600 hover:bg-purple-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
                  className="h-full bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-purple-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-green-500 to-purple-400 leading-tight mb-4 lg:mb-6">
              Zero-Downtime Deployments of Spring Boot on AWS Elastic Beanstalk
            </h1>
            <p className="text-purple-300/90 text-base lg:text-lg mb-4">
              Master the art of deploying Spring Boot applications with zero downtime using AWS Elastic Beanstalk
            </p>
            <div className="flex flex-wrap gap-3 text-purple-400 text-xs sm:text-sm">
              <span>📅 November 19, 2025</span>
              <span>•</span>
              <span>⏱️ 30 min read</span>
              <span>•</span>
              <span>✍️ DevMetrix Team</span>
            </div>
          </header>

          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-purple-900/30 to-green-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <PlayCircle className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-purple-200/80">
                <p>
                  Zero-downtime deployment is a crucial goal for production-grade web applications. It ensures your users experience no interruptions or errors during app updates. In today's competitive landscape, even a few seconds of downtime can result in <strong className="text-purple-300">lost revenue</strong>, <strong className="text-purple-300">damaged reputation</strong>, and <strong className="text-purple-300">frustrated users</strong>.
                </p>
                <p>
                  AWS Elastic Beanstalk (EB) combined with Spring Boot offers powerful methods to achieve this by using techniques such as blue/green deployments, health checks, and automation pipelines.
                </p>
                <div className="bg-purple-800/20 border-l-4 border-purple-500 p-4 rounded mt-6">
                  <p className="text-sm text-purple-300">
                    💡 <strong>Key Takeaway:</strong> This guide provides actionable insights with detailed code samples, security best practices, and lessons learned from industry leaders.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="aws-eb-overview" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">AWS Elastic Beanstalk Overview</h2>
              </div>
              <div className="space-y-4 text-purple-200/80">
                <p>
                  AWS Elastic Beanstalk is a <strong className="text-green-400">Platform-as-a-Service (PaaS)</strong> offering that simplifies the deployment and scaling of web applications. It abstracts away infrastructure complexity while giving developers full control when needed.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-300 mb-2">✨ Key Features</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Auto-scaling & Load Balancing</li>
                      <li>• Health Monitoring</li>
                      <li>• CloudWatch Integration</li>
                      <li>• Multiple Deployment Strategies</li>
                    </ul>
                  </div>
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/20">
                    <h3 className="font-semibold text-green-300 mb-2">🚀 Spring Boot Support</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Native Java Runtime</li>
                      <li>• Easy JAR Deployment</li>
                      <li>• Environment Variables</li>
                      <li>• Custom Configuration</li>
                    </ul>
                  </div>
                </div>

                <p>
                  For Spring Boot applications, EB seamlessly integrates with RDS for databases, S3 for artifact storage, and CodePipeline for continuous delivery—allowing you to focus on building features rather than managing servers.
                </p>
              </div>
            </div>
          </section>

          <section id="zero-downtime-concepts" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Zero-Downtime Deployment Concepts</h2>
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
                          <span key={idx} className="text-xs bg-green-900/30 text-green-300 px-3 py-1 rounded-full">
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

          <section id="setup-blue-green" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Setting Up Blue/Green Deployments</h2>
              </div>

              <div className="space-y-4 text-purple-200/80 mb-6">
                <p>Follow these steps to configure blue/green deployments in AWS Elastic Beanstalk:</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  'Create two EB environments with identical configurations',
                  'Deploy new app versions to the inactive environment',
                  'Perform health checks using EB status and CloudWatch',
                  'Swap CNAMEs to redirect traffic once verified healthy'
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-purple-900/20 p-3 rounded-lg">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-purple-200">{step}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-mono">bash</span>
                  <Code size={16} className="text-purple-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`# Create blue environment
eb create springboot-blue --envvars SPRING_PROFILES_ACTIVE=blue

# Create green environment
eb create springboot-green --envvars SPRING_PROFILES_ACTIVE=green

# Deploy new version to green (inactive)
eb use springboot-green
eb deploy

# Check health
eb health springboot-green

# Swap CNAME to switch traffic
aws elasticbeanstalk swap-environment-cnames \\
  --source-environment-name springboot-blue \\
  --destination-environment-name springboot-green`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section id="automation" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Automation & CI/CD</h2>
              </div>

              <p className="text-purple-200/80 mb-6">
                Use AWS CodePipeline and CodeBuild to automate builds, tests, and deployments. This reduces manual steps and ensures consistency across all releases.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-mono">buildspec.yml</span>
                  <Code size={16} className="text-purple-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`version: 0.2

phases:
  install:
    commands:
      - echo Installing JDK 17
      - amazon-linux-extras enable corretto17
      - yum install -y java-17-amazon-corretto-devel
  build:
    commands:
      - echo Build started on \`date\`
      - ./mvnw clean package -DskipTests
      - echo Build completed on \`date\`
artifacts:
  files:
    - target/*.jar
  discard-paths: yes`}</code>
                </pre>
              </div>

              <div className="mt-6 bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-green-300">
                  💡 <strong>Pro Tip:</strong> Integrate your CodePipeline to automatically deploy artifacts to EB environments and trigger CNAME swaps after successful tests.
                </p>
              </div>
            </div>
          </section>

          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-purple-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Security Best Practices</h2>
              </div>

              <p className="text-purple-200/80 mb-6">
                Security is paramount in any deployment. Here are key recommendations for safe, zero-downtime deployments:
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'Least Privilege IAM Roles', desc: 'Attach minimal permissions to EB instances and pipelines' },
                  { title: 'Encrypt Environment Variables', desc: 'Use AWS Secrets Manager or Parameter Store' },
                  { title: 'Health Checks & Rollbacks', desc: 'Automate rollback on unhealthy deployments' },
                  { title: 'Network Security', desc: 'Use private subnets and security groups' },
                  { title: 'Audit Logs', desc: 'Enable CloudTrail for tracking changes and access' }
                ].map((practice, idx) => (
                  <div key={idx} className="bg-gray-900/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-purple-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
                <p className="text-sm text-yellow-300">
                  ⚠️ <strong>Real-World Example:</strong> A fintech startup implemented blue/green deployments with automated rollback and strict IAM policies, preventing exposure of sensitive data and ensuring regulatory compliance.
                </p>
              </div>
            </div>
          </section>

          <section id="real-world" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Real-World Examples</h2>
              </div>

              <p className="text-purple-200/80 mb-6">
                Industry leaders like Netflix and Airbnb use blue/green deployments to push millions of updates without downtime. Learn from open-source examples:
              </p>

              <div className="space-y-4">
                <a
                  href="https://github.com/aws-samples/aws-elastic-beanstalk-blue-green"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-900/20 hover:bg-purple-900/40 p-4 rounded-lg border border-purple-500/20 transition-all"
                >
                  <h3 className="font-semibold text-purple-300 mb-2">AWS Blue/Green Sample Repository</h3>
                  <p className="text-sm text-purple-200/70 mb-2">Official AWS sample demonstrating blue/green deployment patterns</p>
                  <span className="text-xs text-green-400">→ View on GitHub</span>
                </a>

                <a
                  href="https://github.com/spring-projects/spring-petclinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-900/20 hover:bg-purple-900/40 p-4 rounded-lg border border-purple-500/20 transition-all"
                >
                  <h3 className="font-semibold text-purple-300 mb-2">Spring PetClinic on EB</h3>
                  <p className="text-sm text-purple-200/70 mb-2">Popular Spring Boot reference application with EB deployment examples</p>
                  <span className="text-xs text-green-400">→ View on GitHub</span>
                </a>
              </div>
            </div>
          </section>

          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-green-900/30 to-purple-900/30 border border-green-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-2">
                ✅ Deployment Checklist
              </h3>
              <p className="text-purple-200/80 mb-6">
                Track your progress as you implement zero-downtime deployments:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-green-300 line-through' : 'text-purple-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-900/20 rounded-lg">
                <div className="text-sm text-green-300 mb-2">
                  Progress: {completedItems} of {checklistItems.length} completed
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-gradient-to-r from-purple-900/30 to-green-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-purple-300 mb-4">
                🚀 Explore DevMetrix Tools
              </h3>
              <p className="text-purple-200/80 mb-4">
                Streamline your development workflow with our suite of powerful tools designed to accelerate cloud deployments and simplify common development tasks.
              </p>
              <p className="text-purple-200/80 mb-6">
                From our TOON Converter for rapid image transformations to our comprehensive API Tester for validating endpoints, we've built tools that solve real development challenges with the same attention to detail demonstrated in this guide.
              </p>
              <a
                href="/tools"
                className="inline-block bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg"
              >
                Browse All Tools →
              </a>
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-purple-300 mb-4">Conclusion</h2>
              <p className="text-purple-200/80 mb-4">
                Zero-downtime deployments require a combination of sound architecture, automation, and security measures. AWS Elastic Beanstalk simplifies infrastructure management while enabling best practices like blue/green deployments.
              </p>
              <p className="text-purple-200/80">
                With the right setup, you can continuously deliver features without impacting your users—a capability proven repeatedly in both enterprise and startup environments. <strong className="text-green-400">Start with small deployments, automate incrementally, and secure every stage.</strong>
              </p>
            </div>
          </section>
        </div>
      </main>

      {progress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 p-4 rounded-full shadow-lg transition-all z-[45]"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}