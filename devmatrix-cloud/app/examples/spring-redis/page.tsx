"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Database,
  Server,
  Settings,
  Code,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  Layers,
  Zap
} from "lucide-react";

export default function SpringRedisExample() {
  const [activeSection, setActiveSection] = useState("intro");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: "intro", title: "Overview & Dependencies", icon: <Layers className="w-5 h-5" /> },
    { id: "properties", title: "Configuration", icon: <Settings className="w-5 h-5" /> },
    { id: "entity", title: "Entity & Repository", icon: <Database className="w-5 h-5" /> },
    { id: "redisconfig", title: "Redis Configuration", icon: <Code className="w-5 h-5" /> },
    { id: "service", title: "Caching Logic (Service)", icon: <Zap className="w-5 h-5" /> },
    { id: "controller", title: "Product APIs", icon: <Server className="w-5 h-5" /> },
    { id: "testing", title: "Testing & Performance", icon: <Terminal className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-purple-50 font-sans selection:bg-purple-500/30 selection:text-purple-100">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-red-400 mb-8 font-medium">
          <Link href="/examples" className="hover:text-red-300 transition-colors">Examples</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-red-200">Spring Redis Caching</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-red-300 to-rose-300">
                Spring Boot + Redis
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-red-200/70 max-w-4xl mx-auto leading-relaxed">
              A complete, production-ready guide to implementing Redis caching in a Spring Boot 3 API to improve performance of frequently accessed database records.
            </p>
          </motion.div>

          {/* Stats / Tech Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {["Spring Boot 3.x", "Spring Data Redis", "Java 17+", "MySQL", "Lombok"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-red-900/30 border border-red-500/20 text-red-300 text-sm font-semibold shadow-[0_0_15px_rgba(244,63,94,0.1)] backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block space-y-2 sticky top-24 h-fit">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 px-3">Table of Contents</h3>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                  activeSection === section.id
                    ? "bg-red-600/20 text-red-100 border border-red-500/30 shadow-lg shadow-red-900/20"
                    : "text-red-400 hover:bg-red-900/10 hover:text-red-200"
                }`}
              >
                <div className={`${activeSection === section.id ? "text-red-300" : "opacity-50"}`}>
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
              <ContentCard title="Overview & Dependencies" icon={<Layers />}>
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-lg text-red-100/90 leading-relaxed mb-6">
                    This example demonstrates a clean approach to implementing Redis caching using <strong>Spring Boot 3</strong> and <strong>Spring Data Redis</strong>. We use Spring&apos;s Cache Abstraction (`@Cacheable`, `@CacheEvict`, `@CachePut`) to minimize boilerplate code.
                  </p>
                  <p className="text-red-200/80 mb-6">
                    <strong>The Flow:</strong> When a GET request is made, the application first checks the Redis cache. If the data exists (Cache Hit), it is returned immediately. If not (Cache Miss), the data is fetched from the MySQL database, saved to Redis, and then returned. Subsequent requests will be served from the cache until the data is updated or deleted, which triggers a cache eviction.
                  </p>

                  <h3 className="text-xl font-bold text-red-100 mt-8 mb-4">pom.xml Dependencies</h3>
                  <p className="text-red-200/80 mb-4">
                    Add the required dependencies for Spring Web, Data Redis, Data JPA, MySQL, and Lombok.
                  </p>

                  <CodeBlock
                    language="xml"
                    title="pom.xml"
                    code={`<!-- Spring Boot Starters -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Redis Caching -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="pom-xml"
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 2: Properties */}
            <section id="properties" className="scroll-mt-32">
              <ContentCard title="Application Properties" icon={<Settings />}>
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-red-200/80 mb-4">
                    Configure your MySQL database connection, enable Redis caching, and set the Redis host and port.
                  </p>

                  <CodeBlock
                    language="properties"
                    title="application.properties"
                    code={`# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/product_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root

# Hibernate Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Redis Configuration
spring.data.redis.host=localhost
spring.data.redis.port=6379

# Enable Caching
spring.cache.type=redis

# Logging to see cache hits vs DB hits
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.springframework.cache=TRACE`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="app-properties"
                  />
                  <div className="mt-4 p-4 bg-red-900/10 rounded-xl border border-red-500/20">
                     <p className="text-sm text-red-200/70">
                        <strong>Note:</strong> Make sure you have a Redis server running locally on port 6379. You can use Docker: `docker run --name redis -p 6379:6379 -d redis`.
                     </p>
                  </div>
                </div>
              </ContentCard>
            </section>

            {/* Section 3: Entity & Repository */}
            <section id="entity" className="scroll-mt-32">
              <ContentCard title="Entity & Repository" icon={<Database />}>
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-red-200/80 mb-4">
                    We define a `Product` entity. Note that the entity must implement `Serializable` for it to be cached in Redis.
                  </p>

                  <CodeBlock
                    language="java"
                    title="entity/Product.java"
                    code={`package com.example.redis.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="product-entity"
                  />

                  <CodeBlock
                    language="java"
                    title="repository/ProductRepository.java"
                    code={`package com.example.redis.repository;

import com.example.redis.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="product-repository"
                  />
                </div>
              </ContentCard>
            </section>

             {/* Section 4: Redis Configuration */}
             <section id="redisconfig" className="scroll-mt-32">
              <ContentCard title="Redis Configuration" icon={<Code />}>
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-red-200/80 mb-4">
                    We configure the `RedisCacheManager` to serialize values as JSON (making them human-readable in Redis) and set a Default Time-To-Live (TTL). Don&apos;t forget `@EnableCaching` on this config or the main application class.
                  </p>

                  <CodeBlock
                    language="java"
                    title="config/RedisConfig.java"
                    code={`package com.example.redis.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@Configuration
@EnableCaching
public class RedisConfig {

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10)) // Set cache expiration to 10 minutes
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()))
                .disableCachingNullValues();

        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(config)
                .build();
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="redis-config"
                  />
                </div>
              </ContentCard>
            </section>

             {/* Section 5: Caching Logic (Service) */}
             <section id="service" className="scroll-mt-32">
              <ContentCard title="Caching Logic (Service Layer)" icon={<Zap />}>
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-red-200/80 mb-4">
                    This is where the magic happens. We use `@Cacheable` to cache read operations, and `@CacheEvict` or `@CachePut` for write/update operations.
                  </p>

                  <CodeBlock
                    language="java"
                    title="service/ProductService.java"
                    code={`package com.example.redis.service;

import com.example.redis.entity.Product;
import com.example.redis.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(Product product) {
        log.info("Creating new product in DB");
        return productRepository.save(product);
    }

    // Cache the result. If key exists, DB is not hit.
    @Cacheable(value = "product", key = "#id")
    public Product getProductById(Long id) {
        log.info("Fetching product from DB for ID: {}", id);
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // Cache the whole list. Note: updating a single product should evict this.
    @Cacheable(value = "products")
    public List<Product> getAllProducts() {
        log.info("Fetching all products from DB");
        return productRepository.findAll();
    }

    // Update DB and update the cache for this specific product.
    // Also evict the "products" cache list so the next get-all fetches fresh data.
    @CachePut(value = "product", key = "#id")
    @CacheEvict(value = "products", allEntries = true)
    public Product updateProduct(Long id, Product productDetails) {
        log.info("Updating product in DB for ID: {}", id);
        Product product = getProductById(id);

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());

        return productRepository.save(product);
    }

    // Delete from DB and remove from cache.
    @CacheEvict(value = "product", key = "#id")
    public void deleteProduct(Long id) {
        log.info("Deleting product from DB for ID: {}", id);
        productRepository.deleteById(id);
        // We should manually or via another annotation evict "products" list here too
        // For simplicity, we can do it programmatically or add another @CacheEvict
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="product-service"
                  />
                </div>
              </ContentCard>
            </section>

             {/* Section 6: Controllers */}
             <section id="controller" className="scroll-mt-32">
              <ContentCard title="Product Controllers" icon={<Server />}>
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-red-200/80 mb-4">
                    The controller exposes REST endpoints and delegates to the caching service.
                  </p>

                  <CodeBlock
                    language="java"
                    title="controller/ProductController.java"
                    code={`package com.example.redis.controller;

import com.example.redis.entity.Product;
import com.example.redis.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return new ResponseEntity<>(productService.createProduct(product), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="product-controller"
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 7: Testing */}
            <section id="testing" className="scroll-mt-32">
              <ContentCard title="Testing & Performance Logs" icon={<Terminal />}>
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-red-200/80 mb-4">
                    With the application running, let&apos;s observe the behavior of the cache hits versus database hits.
                  </p>

                  <h3 className="text-xl font-bold text-red-100 mt-8 mb-4">cURL Commands & Log Output</h3>

                  <CodeBlock
                    language="bash"
                    title="1. Create a Product"
                    code={`curl -X POST http://localhost:8080/api/products \\
-H "Content-Type: application/json" \\
-d '{"name":"Laptop", "description":"High performance laptop", "price":1500.00}'`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="curl-create"
                  />

                  <CodeBlock
                    language="bash"
                    title="2. Get Product (First Request = CACHE MISS)"
                    code={`curl -X GET http://localhost:8080/api/products/1

# LOG OUTPUT:
# Fetching product from DB for ID: 1
# Hibernate: select p1_0.id,p1_0.description,p1_0.name,p1_0.price from products p1_0 where p1_0.id=?
# Response time: ~150ms`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="curl-get-miss"
                  />

                  <CodeBlock
                    language="bash"
                    title="3. Get Product Again (Second Request = CACHE HIT)"
                    code={`curl -X GET http://localhost:8080/api/products/1

# LOG OUTPUT:
# (No DB query logged. No "Fetching product from DB" logged!)
# Response time: ~5ms`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="curl-get-hit"
                  />

                  <div className="mt-6 p-4 bg-red-900/10 rounded-xl border border-red-500/20">
                     <h4 className="text-red-300 font-semibold mb-2">Performance Improvement</h4>
                     <p className="text-sm text-red-200/80 mb-2">
                        By caching frequent read requests (like getting a product by ID), we bypassed the MySQL database and network latency entirely.
                     </p>
                     <p className="text-sm text-red-200/80">
                        In the example logs above, the response time drops from ~150ms (fetching from DB and saving to Redis) to ~5ms (fetching directly from Redis). This drastically reduces database load and speeds up the API response.
                     </p>
                  </div>

                </div>
              </ContentCard>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components

function ContentCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div
      className="bg-gray-900/40 backdrop-blur-md border border-red-500/20 rounded-2xl p-8 overflow-hidden relative group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px] group-hover:bg-red-600/10 transition-colors duration-700" />

      <div className="flex items-center gap-4 mb-8 border-b border-red-500/10 pb-6 relative z-10">
        <div className="p-3 bg-red-900/30 rounded-lg text-red-300 border border-red-500/30 shadow-[0_0_15px_rgba(225,29,72,0.15)]">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-100 to-red-300">
          {title}
        </h2>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ title, code, onCopy, copiedId, id }: {
  language: string,
  title: string,
  code: string,
  onCopy: (code: string, id: string) => void,
  copiedId: string | null,
  id: string
}) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-red-500/30 bg-[#0d1117] shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <span className="text-xs font-mono text-gray-400 ml-2">{title}</span>
        </div>
        <button
          onClick={() => onCopy(code, id)}
          className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
        >
          {copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedId === id ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm leading-relaxed text-red-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
