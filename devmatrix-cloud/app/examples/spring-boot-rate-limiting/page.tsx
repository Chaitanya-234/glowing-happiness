"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Key,
  Users,
  Database,
  FileCode,
  CheckCircle,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Server,
  Settings,
  Activity
} from "lucide-react";

export default function SpringBootRateLimitingExample() {
  const [activeSection, setActiveSection] = useState("intro");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: "intro", title: "Overview & Dependencies", icon: <ShieldCheck className="w-5 h-5" /> },
    { id: "docker", title: "Redis & App Setup", icon: <Database className="w-5 h-5" /> },
    { id: "config", title: "Rate Limit Configuration", icon: <Settings className="w-5 h-5" /> },
    { id: "service", title: "Rate Limit Service", icon: <Activity className="w-5 h-5" /> },
    { id: "filter", title: "Rate Limit Filter", icon: <Lock className="w-5 h-5" /> },
    { id: "controller", title: "API Controller", icon: <Server className="w-5 h-5" /> },
    { id: "testing", title: "Postman & Flow Analysis", icon: <Terminal className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-purple-50 font-sans selection:bg-purple-500/30 selection:text-purple-100">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-purple-400 mb-8 font-medium">
          <Link href="/examples" className="hover:text-purple-300 transition-colors">Examples</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-purple-200">Spring Boot + Rate Limiting</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
                Spring Boot API Rate Limiting
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-200/70 max-w-4xl mx-auto leading-relaxed">
              Protect your REST APIs from abuse using the Token Bucket Algorithm, implemented with Bucket4j and distributed via Redis in Spring Boot 3.x.
            </p>
          </motion.div>

          {/* Stats / Tech Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {["Spring Boot 3.x", "Java 17+", "Bucket4j", "Redis", "Maven", "Lombok"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/20 text-purple-300 text-sm font-semibold shadow-[0_0_15px_rgba(168,85,247,0.1)] backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block space-y-2 sticky top-24 h-fit">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 px-3">Table of Contents</h3>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                  activeSection === section.id
                    ? "bg-indigo-600/20 text-indigo-100 border border-indigo-500/30 shadow-lg shadow-indigo-900/20"
                    : "text-purple-400 hover:bg-purple-900/10 hover:text-purple-200"
                }`}
              >
                <div className={`${activeSection === section.id ? "text-indigo-300" : "opacity-50"}`}>
                  {section.icon}
                </div>
                <span className="font-medium text-sm">{section.title}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-24">

            {/* Section 1: Introduction & Dependencies */}
            <section id="intro" className="scroll-mt-32">
              <ContentCard title="Overview & Dependencies" icon={<ShieldCheck />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-lg text-purple-100/90 leading-relaxed mb-6">
                    This example demonstrates a production-ready implementation of API rate limiting using <strong>Spring Boot 3.x</strong>, <strong>Bucket4j</strong>, and <strong>Redis</strong>.
                  </p>
                  <p className="text-purple-200/80 mb-6">
                    <strong>Why it&apos;s important:</strong> Rate limiting protects your system from DDoS attacks, brute-force login attempts, and general abuse by malicious actors or misconfigured scripts. It&apos;s a critical component in System Design interviews and real-world microservices.
                  </p>

                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
                    <h4 className="text-lg font-bold text-purple-100 mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                      The Token Bucket Algorithm
                    </h4>
                    <p className="text-purple-200/80 mb-4">
                      Bucket4j uses the <strong>Token Bucket Algorithm</strong>. Imagine a bucket that holds a maximum number of tokens (capacity). Tokens are added to the bucket at a fixed rate (refill rate). Every time a request comes in, it must take a token from the bucket. If the bucket is empty, the request is rejected (HTTP 429 Too Many Requests). This handles both steady traffic and short bursts smoothly.
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-purple-100 mt-8 mb-4">pom.xml Dependencies</h3>
                  <p className="text-purple-200/80 mb-4">
                    Add the required dependencies for Spring Web, Redis (Lettuce), and Bucket4j&apos;s Redis integration.
                  </p>

                  <CodeBlock
                    language="xml"
                    title="pom.xml"
                    code={`<!-- Spring Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Redis for Distributed Caching -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- Bucket4j Core and Redis Integration -->
<dependency>
    <groupId>com.bucket4j</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>8.10.1</version>
</dependency>
<dependency>
    <groupId>com.bucket4j</groupId>
    <artifactId>bucket4j-redis</artifactId>
    <version>8.10.1</version>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>`}
                    onCopy={() => copyToClipboard(`<!-- Spring Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Redis for Distributed Caching -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- Bucket4j Core and Redis Integration -->
<dependency>
    <groupId>com.bucket4j</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>8.10.1</version>
</dependency>
<dependency>
    <groupId>com.bucket4j</groupId>
    <artifactId>bucket4j-redis</artifactId>
    <version>8.10.1</version>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>`, 'pom')}
                    copied={copiedCode === 'pom'}
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 2: Docker & Setup */}
            <section id="docker" className="scroll-mt-32">
              <ContentCard title="Redis & App Configuration" icon={<Database />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-6">
                    For a distributed system (multiple instances of your Spring Boot app), in-memory rate limiting fails because each instance has its own bucket. <strong>Redis solves this</strong> by acting as a centralized datastore for bucket states.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">docker-compose.yml</h3>
                  <CodeBlock
                    language="yaml"
                    title="docker-compose.yml"
                    code={`version: '3.8'
services:
  redis:
    image: redis:alpine
    container_name: rate-limit-redis
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes

  # Optional: Your app config if running in docker
  # app:
  #   build: .
  #   ports:
  #     - "8080:8080"
  #   depends_on:
  #     - redis
  #   environment:
  #     - SPRING_DATA_REDIS_HOST=redis
  #     - SPRING_DATA_REDIS_PORT=6379`}
                    onCopy={() => copyToClipboard(`version: '3.8'
services:
  redis:
    image: redis:alpine
    container_name: rate-limit-redis
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes

  # Optional: Your app config if running in docker
  # app:
  #   build: .
  #   ports:
  #     - "8080:8080"
  #   depends_on:
  #     - redis
  #   environment:
  #     - SPRING_DATA_REDIS_HOST=redis
  #     - SPRING_DATA_REDIS_PORT=6379`, 'docker')}
                    copied={copiedCode === 'docker'}
                  />

                  <h3 className="text-xl font-bold text-purple-100 mt-8 mb-4">application.yml</h3>
                  <CodeBlock
                    language="yaml"
                    title="src/main/resources/application.yml"
                    code={`server:
  port: 8080

spring:
  application:
    name: rate-limiting-api
  data:
    redis:
      host: localhost
      port: 6379
      # password: your-password-if-set

# Custom configuration for dynamic limits (optional extension)
app:
  rate-limit:
    public:
      capacity: 5
      refill-tokens: 5
      refill-duration-seconds: 60
    user:
      capacity: 20
      refill-tokens: 20
      refill-duration-seconds: 60`}
                    onCopy={() => copyToClipboard(`server:
  port: 8080

spring:
  application:
    name: rate-limiting-api
  data:
    redis:
      host: localhost
      port: 6379
      # password: your-password-if-set

# Custom configuration for dynamic limits (optional extension)
app:
  rate-limit:
    public:
      capacity: 5
      refill-tokens: 5
      refill-duration-seconds: 60
    user:
      capacity: 20
      refill-tokens: 20
      refill-duration-seconds: 60`, 'yml')}
                    copied={copiedCode === 'yml'}
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 3: Configuration */}
            <section id="config" className="scroll-mt-32">
              <ContentCard title="Rate Limit Configuration" icon={<Settings />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    Configure Bucket4j to use Redis as its backend. We use Lettuce (Spring&apos;s default Redis client) to create a generic `ProxyManager` that Bucket4j uses to interact with Redis.
                  </p>

                  <CodeBlock
                    language="java"
                    title="src/main/java/com/example/config/RateLimitConfig.java"
                    code={`package com.example.config;

import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class RateLimitConfig {

    @Bean
    public RedisClient redisClient() {
        // Connect to Redis (Update URI if using passwords or external host)
        return RedisClient.create("redis://localhost:6379");
    }

    @Bean
    public ProxyManager<byte[]> proxyManager(RedisClient redisClient) {
        // Create the proxy manager that Bucket4j uses to interact with Redis
        return LettuceBasedProxyManager.builderFor(redisClient)
                .withExpirationStrategy(
                        io.github.bucket4j.distributed.ExpirationAfterWriteStrategy.basedOnTimeForRefillingBucketUpToMax(Duration.ofSeconds(10))
                )
                .build();
    }
}`}
                    onCopy={() => copyToClipboard(`package com.example.config;

import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class RateLimitConfig {

    @Bean
    public RedisClient redisClient() {
        // Connect to Redis (Update URI if using passwords or external host)
        return RedisClient.create("redis://localhost:6379");
    }

    @Bean
    public ProxyManager<byte[]> proxyManager(RedisClient redisClient) {
        // Create the proxy manager that Bucket4j uses to interact with Redis
        return LettuceBasedProxyManager.builderFor(redisClient)
                .withExpirationStrategy(
                        io.github.bucket4j.distributed.ExpirationAfterWriteStrategy.basedOnTimeForRefillingBucketUpToMax(Duration.ofSeconds(10))
                )
                .build();
    }
}`, 'cfg')}
                    copied={copiedCode === 'cfg'}
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 4: Service Layer */}
            <section id="service" className="scroll-mt-32">
              <ContentCard title="Rate Limit Service" icon={<Activity />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    This service handles the creation and retrieval of buckets for specific keys (e.g., IP addresses or User IDs). We define different policies based on the context (Public API vs User-specific API vs Admin API).
                  </p>

                  <CodeBlock
                    language="java"
                    title="src/main/java/com/example/service/RateLimitService.java"
                    code={`package com.example.service;

import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.distributed.BucketProxy;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class RateLimitService {

    private final ProxyManager<byte[]> proxyManager;

    /**
     * Resolves the bucket for a given key and plan type.
     */
    public BucketProxy resolveBucket(String key, Plan plan) {
        Supplier<BucketConfiguration> configSupplier = getConfigSupplierForPlan(plan);
        // Uses Redis backend to retrieve or build the bucket
        return proxyManager.builder().build(key.getBytes(), configSupplier);
    }

    private Supplier<BucketConfiguration> getConfigSupplierForPlan(Plan plan) {
        return () -> {
            switch (plan) {
                case PUBLIC:
                    // 5 requests per minute
                    return BucketConfiguration.builder()
                            .addLimit(limit -> limit.capacity(5).refillGreedy(5, Duration.ofMinutes(1)))
                            .build();
                case USER:
                    // 20 requests per minute
                    return BucketConfiguration.builder()
                            .addLimit(limit -> limit.capacity(20).refillGreedy(20, Duration.ofMinutes(1)))
                            .build();
                case ADMIN:
                    // 100 requests per minute (higher quota)
                    return BucketConfiguration.builder()
                            .addLimit(limit -> limit.capacity(100).refillGreedy(100, Duration.ofMinutes(1)))
                            .build();
                default:
                    return BucketConfiguration.builder()
                            .addLimit(limit -> limit.capacity(1).refillGreedy(1, Duration.ofMinutes(1)))
                            .build();
            }
        };
    }

    public enum Plan {
        PUBLIC, USER, ADMIN
    }
}`}
                    onCopy={() => copyToClipboard(`package com.example.service;

import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.distributed.BucketProxy;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class RateLimitService {

    private final ProxyManager<byte[]> proxyManager;

    /**
     * Resolves the bucket for a given key and plan type.
     */
    public BucketProxy resolveBucket(String key, Plan plan) {
        Supplier<BucketConfiguration> configSupplier = getConfigSupplierForPlan(plan);
        // Uses Redis backend to retrieve or build the bucket
        return proxyManager.builder().build(key.getBytes(), configSupplier);
    }

    private Supplier<BucketConfiguration> getConfigSupplierForPlan(Plan plan) {
        return () -> {
            switch (plan) {
                case PUBLIC:
                    // 5 requests per minute
                    return BucketConfiguration.builder()
                            .addLimit(limit -> limit.capacity(5).refillGreedy(5, Duration.ofMinutes(1)))
                            .build();
                case USER:
                    // 20 requests per minute
                    return BucketConfiguration.builder()
                            .addLimit(limit -> limit.capacity(20).refillGreedy(20, Duration.ofMinutes(1)))
                            .build();
                case ADMIN:
                    // 100 requests per minute (higher quota)
                    return BucketConfiguration.builder()
                            .addLimit(limit -> limit.capacity(100).refillGreedy(100, Duration.ofMinutes(1)))
                            .build();
                default:
                    return BucketConfiguration.builder()
                            .addLimit(limit -> limit.capacity(1).refillGreedy(1, Duration.ofMinutes(1)))
                            .build();
            }
        };
    }

    public enum Plan {
        PUBLIC, USER, ADMIN
    }
}`, 'svc')}
                    copied={copiedCode === 'svc'}
                  />
                  <p className="text-sm text-purple-300/80 mt-4 bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                    💡 <strong>Note on "refillGreedy":</strong> Greedy refill adds tokens continuously based on elapsed time (e.g., if refill rate is 60 tokens/minute, it adds 1 token per second). "refillIntervally" would add all 60 tokens exactly at the 1-minute mark.
                  </p>
                </div>
              </ContentCard>
            </section>

            {/* Section 5: Filter Layer */}
            <section id="filter" className="scroll-mt-32">
              <ContentCard title="Rate Limit Filter" icon={<Lock />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    The Filter intercepts all incoming HTTP requests. It identifies the client (by IP or User ID from JWT context), applies the rate limit logic, and either lets the request proceed or immediately rejects it with a `429 Too Many Requests` status, adding helpful retry headers.
                  </p>

                  <CodeBlock
                    language="java"
                    title="src/main/java/com/example/filter/RateLimitFilter.java"
                    code={`package com.example.filter;

import com.example.service.RateLimitService;
import io.github.bucket4j.ConsumptionProbe;
import io.github.bucket4j.distributed.BucketProxy;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimitService rateLimitService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();

        // Example logic: Skip public endpoints that don't need limiting
        if (uri.startsWith("/api/public")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Determine Plan and Key based on URI or Security Context
        RateLimitService.Plan plan = RateLimitService.Plan.PUBLIC;
        String key = getClientIP(request); // Default to IP based

        if (uri.startsWith("/api/user")) {
            plan = RateLimitService.Plan.USER;
            // In a real app with JWT, extract User ID from SecurityContextHolder here
            // String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            // key = "user:" + userId;
        } else if (uri.startsWith("/api/admin")) {
            plan = RateLimitService.Plan.ADMIN;
            // key = "admin:" + adminId;
        } else if (uri.startsWith("/api/limited")) {
            plan = RateLimitService.Plan.PUBLIC;
            key = "ip:" + getClientIP(request);
        }

        // Resolve bucket and try to consume 1 token
        BucketProxy bucket = rateLimitService.resolveBucket(key, plan);
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

        if (probe.isConsumed()) {
            // Request allowed
            response.addHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
            log.debug("Request allowed for key: {}, remaining tokens: {}", key, probe.getRemainingTokens());
            filterChain.doFilter(request, response);
        } else {
            // Request rejected - rate limit exceeded
            long waitForRefill = probe.getNanosToWaitForRefill() / 1_000_000_000;
            response.addHeader("X-Rate-Limit-Retry-After", String.valueOf(waitForRefill));

            response.setStatus(429); // Too Many Requests
            response.setContentType("application/json");

            String jsonResponse = String.format(
                "{\"status\": 429, \"message\": \"Too many requests. Please try again later.\", \"retryAfterSeconds\": %d}",
                waitForRefill
            );
            response.getWriter().write(jsonResponse);

            log.warn("Rate limit exceeded for key: {}. Retry after {} seconds.", key, waitForRefill);
        }
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}`}
                    onCopy={() => copyToClipboard(`package com.example.filter;

import com.example.service.RateLimitService;
import io.github.bucket4j.ConsumptionProbe;
import io.github.bucket4j.distributed.BucketProxy;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimitService rateLimitService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();

        // Example logic: Skip public endpoints that don't need limiting
        if (uri.startsWith("/api/public")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Determine Plan and Key based on URI or Security Context
        RateLimitService.Plan plan = RateLimitService.Plan.PUBLIC;
        String key = getClientIP(request); // Default to IP based

        if (uri.startsWith("/api/user")) {
            plan = RateLimitService.Plan.USER;
            // In a real app with JWT, extract User ID from SecurityContextHolder here
            // String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            // key = "user:" + userId;
        } else if (uri.startsWith("/api/admin")) {
            plan = RateLimitService.Plan.ADMIN;
            // key = "admin:" + adminId;
        } else if (uri.startsWith("/api/limited")) {
            plan = RateLimitService.Plan.PUBLIC;
            key = "ip:" + getClientIP(request);
        }

        // Resolve bucket and try to consume 1 token
        BucketProxy bucket = rateLimitService.resolveBucket(key, plan);
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

        if (probe.isConsumed()) {
            // Request allowed
            response.addHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
            log.debug("Request allowed for key: {}, remaining tokens: {}", key, probe.getRemainingTokens());
            filterChain.doFilter(request, response);
        } else {
            // Request rejected - rate limit exceeded
            long waitForRefill = probe.getNanosToWaitForRefill() / 1_000_000_000;
            response.addHeader("X-Rate-Limit-Retry-After", String.valueOf(waitForRefill));

            response.setStatus(429); // Too Many Requests
            response.setContentType("application/json");

            String jsonResponse = String.format(
                "{\"status\": 429, \"message\": \"Too many requests. Please try again later.\", \"retryAfterSeconds\": %d}",
                waitForRefill
            );
            response.getWriter().write(jsonResponse);

            log.warn("Rate limit exceeded for key: {}. Retry after {} seconds.", key, waitForRefill);
        }
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}`, 'flt')}
                    copied={copiedCode === 'flt'}
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 6: Controller */}
            <section id="controller" className="scroll-mt-32">
              <ContentCard title="API Controller" icon={<Server />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    Finally, define your REST endpoints. Note how clean the controllers are—they don&apos;t need to know anything about the rate limiting logic, as the Filter handles it transversally.
                  </p>

                  <CodeBlock
                    language="java"
                    title="src/main/java/com/example/controller/ApiController.java"
                    code={`package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "This endpoint is entirely public and has no rate limits applied."
        ));
    }

    @GetMapping("/limited")
    public ResponseEntity<Map<String, String>> limitedEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "This endpoint is limited by IP. Max 5 requests per minute."
        ));
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> userEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "This endpoint is limited by User ID context. Max 20 requests per minute."
        ));
    }

    @GetMapping("/admin")
    public ResponseEntity<Map<String, String>> adminEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "Admin endpoint. Higher quota applied."
        ));
    }
}`}
                    onCopy={() => copyToClipboard(`package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "This endpoint is entirely public and has no rate limits applied."
        ));
    }

    @GetMapping("/limited")
    public ResponseEntity<Map<String, String>> limitedEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "This endpoint is limited by IP. Max 5 requests per minute."
        ));
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> userEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "This endpoint is limited by User ID context. Max 20 requests per minute."
        ));
    }

    @GetMapping("/admin")
    public ResponseEntity<Map<String, String>> adminEndpoint() {
        return ResponseEntity.ok(Map.of(
            "message", "Admin endpoint. Higher quota applied."
        ));
    }
}`, 'ctrl')}
                    copied={copiedCode === 'ctrl'}
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 7: Testing & Flow Analysis */}
            <section id="testing" className="scroll-mt-32">
              <ContentCard title="Postman Testing & Flow Analysis" icon={<Terminal />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <h3 className="text-xl font-bold text-purple-100 mb-4">Request Flow Diagram</h3>
                  <div className="bg-black/50 p-6 rounded-lg border border-purple-500/20 font-mono text-sm text-purple-300 mb-8 overflow-x-auto">
                    Client Request → <code>RateLimitFilter</code><br/>
                    &nbsp;&nbsp;↳ Extract IP/User ID<br/>
                    &nbsp;&nbsp;↳ Check Redis Bucket state via <code>RateLimitService</code><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;├─ [Tokens &gt; 0] → Consume Token → Proceed to <code>ApiController</code> → HTTP 200 OK<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;└─ [Tokens = 0] → Reject early → HTTP 429 Too Many Requests
                  </div>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">Postman Examples</h3>
                  <p className="text-purple-200/80 mb-2"><strong>1. Hitting `/api/limited` for the first time:</strong></p>
                  <CodeBlock
                    language="json"
                    title="Response - HTTP 200 OK"
                    code={`// Headers
X-Rate-Limit-Remaining: 4

// Body
{
  "message": "This endpoint is limited by IP. Max 5 requests per minute."
}`}
                  />

                  <p className="text-purple-200/80 mt-6 mb-2"><strong>2. Hitting `/api/limited` for the 6th time within a minute:</strong></p>
                  <CodeBlock
                    language="json"
                    title="Response - HTTP 429 Too Many Requests"
                    code={`// Headers
X-Rate-Limit-Retry-After: 45

// Body
{
  "status": 429,
  "message": "Too many requests. Please try again later.",
  "retryAfterSeconds": 45
}`}
                  />

                  <h3 className="text-xl font-bold text-purple-100 mt-8 mb-4">Why use Redis instead of ConcurrentHashMap?</h3>
                  <ul className="list-disc list-inside text-purple-200/80 space-y-2">
                    <li><strong>Scalability:</strong> In a Kubernetes cluster with 5 pods of this API, an in-memory map limits users per-pod. Redis centralizes the bucket count across the entire cluster.</li>
                    <li><strong>Persistence (Optional):</strong> Redis can persist rate-limit data across application restarts.</li>
                    <li><strong>Atomic Operations:</strong> Bucket4j utilizes Redis LUA scripts under the hood to perform atomic token consumption, preventing race conditions during burst traffic.</li>
                  </ul>
                </div>
              </ContentCard>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------
// Reusable UI Components
// ------------------------------

function ContentCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-purple-900/10 to-indigo-900/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 hover:border-purple-500/40 transition-colors shadow-xl shadow-black/50 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-[80px] group-hover:bg-purple-500/10 transition-colors" />
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200 mb-8 border-b border-purple-500/20 pb-4 flex items-center gap-3 relative z-10">
        <span className="p-2 bg-purple-900/50 rounded-lg text-indigo-300 border border-purple-500/30">
          {icon}
        </span>
        {title}
      </h2>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ language, title, code, onCopy, copied }: { language: string; title: string; code: string; onCopy?: () => void; copied?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden border border-purple-500/30 bg-[#0d0d12] shadow-2xl mb-6 relative group">
      <div className="flex items-center justify-between px-4 py-3 bg-purple-900/20 border-b border-purple-500/30">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono text-purple-300">{title}</span>
        </div>
        {onCopy && (
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? <span className="text-green-400">Copied!</span> : "Copy"}
          </button>
        )}
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-sm font-mono leading-relaxed">
          <code className={`language-${language} text-purple-100`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
