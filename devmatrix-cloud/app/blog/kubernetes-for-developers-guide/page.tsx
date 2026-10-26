'use client';
import { useTheme } from '@/components/providers/ThemeProvider';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    Anchor, Box,
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Cloud,
    Code, Container,
    Menu,
    Server,
    Shield,
    X
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

export default function KubernetesGuide() {
  const { currentTheme: theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: Anchor },
    { id: 'docker-basics', title: 'Docker Basics', icon: Container },
    { id: 'k8s-architecture', title: 'K8s Architecture', icon: Server },
    { id: 'deployment', title: 'Deploying Apps', icon: Cloud },
    { id: 'spring-boot-k8s', title: 'Spring Boot on K8s', icon: Code },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'tools', title: 'Tools', icon: Box },
  ];

  const checklistItems: string[] = [
    'Containerize application with Dockerfile',
    'Push image to a container registry (Docker Hub/ECR)',
    'Create K8s Deployment manifest',
    'Create K8s Service manifest',
    'Configure Ingress for external access',
    'Set up resource limits (CPU/Memory)',
    'Implement readiness and liveness probes',
    'Configure Secret management',
  ];

  const concepts: Concept[] = [
    {
      id: 'pod',
      title: 'Pod',
      icon: '📦',
      description: 'The smallest deployable unit in Kubernetes. A Pod represents a single instance of a running process in your cluster, often containing one or more containers.',
      benefits: ['Atomic unit', 'Shared networking', 'Ephemeral']
    },
    {
      id: 'deployment',
      title: 'Deployment',
      icon: '🚀',
      description: 'Manages a set of identical Pods. It ensures that the specified number of replicas are running and handles updates and rollbacks.',
      benefits: ['Self-healing', 'Scaling', 'Rolling updates']
    },
    {
      id: 'service',
      title: 'Service',
      icon: '🌐',
      description: 'An abstraction which defines a logical set of Pods and a policy by which to access them (usually via a stable IP address).',
      benefits: ['Load balancing', 'Service discovery', 'Stable networking']
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
    <div className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="Kubernetes for Developers: A Practical Guide from Docker to K8s"
        description="Master Kubernetes without the ops headache. Learn container orchestration, deployments, and how to run Spring Boot and Next.js on K8s."
        datePublished="2025-11-24"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/kubernetes-for-developers-guide"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1  z-[100]">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-blue-600 hover:bg-blue-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full /95 backdrop-blur-sm border-r border-blue-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-blue-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-300 hover:bg-blue-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-blue-900/30 rounded-lg">
            <div className="text-sm text-blue-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2  rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-blue-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 leading-tight mb-4 lg:mb-6">
              Kubernetes for Developers: A Practical Guide from Docker to K8s
            </h1>
            <p className="text-blue-200/90 text-base lg:text-lg mb-4">
              Kubernetes isn't just for Ops teams. Learn the essentials of container orchestration to deploy, scale, and manage your applications with confidence.
            </p>
            <div className="flex flex-wrap gap-3 text-blue-400 text-xs sm:text-sm">
              <span>📅 November 24, 2025</span>
              <span>•</span>
              <span>⏱️ 30 min read</span>
              <span>•</span>
              <span>🏷️ DevOps</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Anchor className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-blue-200/80">
                <p>
                  "It works on my machine" is a phrase every developer dreads. <strong className="text-blue-300">Docker</strong> solved this by packaging apps into containers. But what happens when you have hundreds of containers? How do you manage them, scale them, and ensure they are always running?
                </p>
                <p>
                  That's where <strong className="text-blue-300">Kubernetes (K8s)</strong> comes in. It's the operating system for the cloud. In 2025, understanding K8s primitives is as essential as knowing Git.
                </p>
                <div className="bg-blue-800/20 border-l-4 border-blue-500 p-4 rounded mt-6">
                  <p className="text-sm text-blue-300">
                    💡 <strong>Why This Matters:</strong> K8s gives you the power to define your infrastructure as code, ensuring your production environment matches your design perfectly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Docker Basics */}
          <section id="docker-basics" className="mb-12 lg:mb-16">
             <div className="/50 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Container className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Before K8s: Docker</h2>
              </div>

              <p className="text-blue-200/80 mb-6">
                  Everything in K8s starts with a container image. Here is a standard Dockerfile for a Spring Boot application.
              </p>

              <div className=" rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-blue-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-blue-300 font-mono">Dockerfile</span>
                  <Code size={16} className="text-blue-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-cyan-400">{`FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build \${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build \${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build \${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.DemoApplication"]`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* K8s Architecture Section */}
          <section id="k8s-architecture" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Server className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Core Concepts</h2>
              </div>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-blue-800/30 hover:bg-blue-800/50 p-4 rounded-lg transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.icon}</span>
                      <span className="font-semibold text-blue-300">{concept.title}</span>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="/50 p-4 rounded-b-lg border-t-0 border border-blue-500/20 mt-0">
                      <p className="text-blue-200/80 mb-3">{concept.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {concept.benefits.map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full">
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

          {/* Spring Boot Deployment Section */}
          <section id="deployment" className="mb-12 lg:mb-16">
            <div className="/50 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Deployment Manifest</h2>
              </div>

              <div className="space-y-4 text-blue-200/80 mb-6">
                <p>This YAML file tells Kubernetes how to run your Spring Boot application. It defines the number of replicas, resource limits, and environment variables.</p>
              </div>

              <div className=" rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-blue-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-blue-300 font-mono">deployment.yaml</span>
                  <Code size={16} className="text-blue-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-cyan-400">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-boot-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: spring-boot-app
  template:
    metadata:
      labels:
        app: spring-boot-app
    spec:
      containers:
      - name: spring-boot-app
        image: my-registry/spring-boot-app:v1
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-blue-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Security Considerations</h2>
              </div>

              <p className="text-blue-200/80 mb-6">
                Kubernetes is secure by design, but configuration matters.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'RBAC', desc: 'Use Role-Based Access Control to limit who can do what in the cluster.' },
                  { title: 'Secrets', desc: 'Never store passwords in plain text. Use K8s Secrets or Vault.' },
                  { title: 'Network Policies', desc: 'Restrict traffic between Pods. Only allow necessary communication.' },
                  { title: 'Image Scanning', desc: 'Scan Docker images for vulnerabilities before deployment.' },
                ].map((practice, idx) => (
                  <div key={idx} className="/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-blue-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                ✅ Deployment Checklist
              </h3>
              <p className="text-blue-200/80 mb-6">
                Ready to push to prod?
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 /50 hover:/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-blue-300 line-through' : 'text-blue-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-2">
                  Validate Your Config
                </h3>
                <p className="text-blue-200/80 mb-0 max-w-xl">
                    Use our tools to validate JSON and YAML configurations before applying them.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Explore Tools →
                </a>
                <Link
                    href="/blog"
                    className="inline-block  hover: px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Read More Blogs
                </Link>
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="mb-16">
             <h2 className="text-2xl font-bold text-blue-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/docker-containers-beginners" className="block p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg hover:bg-blue-800/20 transition-all group">
                    <h3 className="font-bold text-blue-200 group-hover:text-white transition-colors">Docker for Beginners</h3>
                    <p className="text-sm text-blue-400/60 mt-2">Start here if you are new to containers.</p>
                </Link>
                <Link href="/blog/zero-downtime-springboot-aws-eb" className="block p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg hover:bg-blue-800/20 transition-all group">
                    <h3 className="font-bold text-blue-200 group-hover:text-white transition-colors">AWS Elastic Beanstalk</h3>
                    <p className="text-sm text-blue-400/60 mt-2">An alternative to K8s for easier deployment.</p>
                </Link>
                 <Link href="/blog/microservices-architecture-guide" className="block p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg hover:bg-blue-800/20 transition-all group">
                    <h3 className="font-bold text-blue-200 group-hover:text-white transition-colors">Microservices</h3>
                    <p className="text-sm text-blue-400/60 mt-2">Designing apps for Kubernetes.</p>
                </Link>
                <Link href="/blog/cron-jobs-scheduling-guide" className="block p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg hover:bg-blue-800/20 transition-all group">
                    <h3 className="font-bold text-blue-200 group-hover:text-white transition-colors">Task Scheduling</h3>
                    <p className="text-sm text-blue-400/60 mt-2">Running jobs in K8s (CronJobs).</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="/50 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-blue-300 mb-4">Conclusion</h2>
              <p className="text-blue-200/80 mb-4">
                Kubernetes is a steep learning curve, but the payoff is immense. It provides a standard language for deploying and managing software anywhere—on-prem, AWS, Google Cloud, or Azure.
              </p>
              <p className="text-blue-200/80">
                By mastering Docker and the basic K8s objects (Pods, Deployments, Services), you unlock the ability to build truly <strong className="text-cyan-400">cloud-native, resilient applications</strong>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
