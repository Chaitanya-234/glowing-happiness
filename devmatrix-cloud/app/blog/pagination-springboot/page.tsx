'use client';
// app/blog/pagination-springboot/page.tsx
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

const metadata: Metadata = {
  title: 'Mastering Pagination in Spring Boot: Comprehensive Guide 2025 | DevMetrix',
  description: 'Learn everything about pagination in Spring Boot: methods, examples, best practices, GitHub repo demos, and real-world applications.',
  keywords: [
    'pagination Spring Boot',
    'Spring Data pagination',
    'Pageable Spring Boot',
    'API pagination',
    'Spring Boot demo',
    'GitHub pagination examples',
  ],
  authors: [{ name: 'DevMetrix Engineering Team' }],
  openGraph: {
    title: 'Mastering Pagination in Spring Boot: Complete Guide',
    description:
      'Explore all ways of implementing pagination in Spring Boot with real examples and best practices used in popular projects on GitHub.',
    type: 'article',
    publishedTime: '2025-11-19T00:00:00.000Z',
  },
};

export default function PaginationSpringBootBlog() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="Mastering Pagination in Spring Boot: The Ultimate 2025 Guide"
        description="Explore all popular ways to implement pagination in Spring Boot, complete with examples, best practices, GitHub repo demos, and security considerations."
        datePublished="2025-11-19"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/pagination-springboot"
      />
      {/* Header */}
      <header className="mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-green-600 to-green-400 bg-clip-text text-transparent leading-tight">
          Mastering Pagination in Spring Boot: The Ultimate 2025 Guide
        </h1>
        <p className="text-green-300/70 text-xl max-w-3xl mx-auto">
          Pagination is essential for building scalable APIs & apps. This guide covers all the popular ways to paginate data in Spring Boot,
          backed with code samples, real GitHub repos, and best practices.
        </p>
        <div className="mt-4 text-green-500 text-sm flex gap-3 flex-wrap">
          <span>📅 November 19, 2025</span>
          <span>•</span>
          <span>⏱️ 25 min read</span>
          <span>•</span>
          <span>✍️ By DevMetrix Engineering Team</span>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="sticky top-24 z-40 mb-12 bg-green-900/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 flex flex-wrap gap-3 text-sm text-green-300/80">
        <a href="#intro" className="hover:text-green-200 transition-colors">Intro</a>
        <a href="#why-pagination" className="hover:text-green-200 transition-colors">Why Pagination</a>
        <a href="#basic-pagination" className="hover:text-green-200 transition-colors">Basic Pagination</a>
        <a href="#pageable-pagination" className="hover:text-green-200 transition-colors">Pageable</a>
        <a href="#custom-pagination" className="hover:text-green-200 transition-colors">Custom Pagination</a>
        <a href="#github-examples" className="hover:text-green-200 transition-colors">GitHub Examples</a>
        <a href="#best-practices" className="hover:text-green-200 transition-colors">Best Practices</a>
        <a href="#security" className="hover:text-green-200 transition-colors">Security</a>
        <a href="#conclusion" className="hover:text-green-200 transition-colors">Conclusion</a>
      </nav>

      {/* Content Sections */}
      <section id="intro">
        <h2 className="text-3xl font-bold mb-4">Introduction to Pagination</h2>
        <p>
          Pagination helps split large datasets into manageable chunks, improving performance and user experience.
          Spring Boot offers multiple ways to paginate data from databases or APIs, including manual query params, Spring Data's Pageable interface,
          and custom implementations.
        </p>
        <p>
          This guide covers all techniques plus usage in popular GitHub projects.
        </p>
      </section>

      <section id="why-pagination" className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Why Pagination Matters</h2>
        <p>
          Paging limits the amount of data sent per API call. Without it, large query results can cause:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Network strain with huge payloads</li>
          <li>Memory issues in clients or servers</li>
          <li>Slow UI performance and bad UX</li>
          <li>Harder to implement infinite scroll or filtering</li>
        </ul>
        <p>
          Pagination, paired with filtering and sorting, builds scalable, user-friendly APIs.
        </p>
      </section>

      <section id="basic-pagination" className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Basic Pagination with Query Params</h2>
        <p>
          The simplest pagination passes <code>page</code> and <code>size</code> parameters in the request.
          Example controller method:
        </p>
        <pre className="bg-green-900/20 p-6 rounded text-sm overflow-x-auto">
          <code>{`
@GetMapping("/items")
public List<Item> getItems(@RequestParam int page, @RequestParam int size) {
  int start = page * size;
  return itemRepository.findAll()
    .stream()
    .skip(start)
    .limit(size)
    .collect(Collectors.toList());
}
          `}</code>
        </pre>
        <p>
          While easy, this approach doesn't handle sorting or total counts well.
        </p>
      </section>

      <section id="pageable-pagination" className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Pagination Using Spring Data Pageable</h2>
        <p>
          Spring Data provides the <code>Pageable</code> interface and <code>Page</code> response for pagination implementation.
        </p>
        <pre className="bg-green-900/20 p-6 rounded text-sm overflow-x-auto">
          <code>{`
@GetMapping("/items")
public Page<Item> getItems(Pageable pageable) {
  return itemRepository.findAll(pageable);
}
          `}</code>
        </pre>
        <p>
          This supports page, size, sorting params automatically, returns page metadata (total pages, total elements), improving UX.
        </p>
      </section>

      <section id="custom-pagination" className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Custom Pagination Strategies</h2>
        <p>
          For complex queries or NoSQL DBs, you might implement keyset pagination or cursor-based pagination to improve performance with very large data.
        </p>
        <p>
          These techniques use last-seen IDs or timestamps for efficient next-page retrieval without offset skips.
        </p>
      </section>

      <section id="github-examples" className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Real GitHub Projects Doing Pagination</h2>
        <p>
          <strong>Spring Boot Pagination Repository:</strong> <Link className="text-green-400 underline" href="https://github.com/spring-projects/spring-data-examples/tree/main/jpa/pagination">github.com/spring-projects/spring-data-examples</Link>
        </p>
        <p>
          <strong>Sample API with Cursor Pagination:</strong> <Link className="text-green-400 underline" href="https://github.com/thombergs/code-examples/tree/master/spring-boot/graphql-pagination">github.com/thombergs/code-examples</Link>
        </p>
        <p>
          Reviewing popular open-source repos shows various approaches and best practices that can be adapted to your needs.
        </p>
      </section>

      <section id="best-practices" className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Pagination Best Practices</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Always provide clear metadata (totalPages, totalElements, currentPage)</li>
          <li>Support sorting and filtering along with pagination</li>
          <li>Use cursor/keyset pagination for large data to improve performance</li>
          <li>Validate query parameters and handle out-of-range pages gracefully</li>
          <li>Document API pagination clearly for clients</li>
        </ul>
      </section>

      <section id="security" className="mt-12 bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-green-200/80">
        <h2 className="text-3xl font-bold mb-4">Security Considerations in Pagination</h2>
        <p>
          Pagination APIs must validate user input to prevent injection or denial-of-service via large requests.
          Sanitize query parameters and authenticate users to avoid data leaks.
        </p>
        <p>
          Real-world example: An e-commerce API restricted max page size to 50 elements, avoiding resource exhaustion.
        </p>
        <p>
          Always use parameterized queries or ORM pagination features (e.g., Spring Data) to avoid SQL injection risks.
        </p>
      </section>

      <section id="conclusion" className="mt-12 mb-24">
        <h2 className="text-3xl font-bold mb-6">Conclusion</h2>
        <p>
          Pagination in Spring Boot is essential for scalable, fast APIs. Whether you use simple query param pagination, Spring Data's built-in Pageable,
          or custom cursor-based methods, understanding the trade-offs and security considerations will help build robust systems.
        </p>
        <p>
          Explore popular GitHub repos for implementation ideas and keep your APIs user-friendly with clear metadata and good documentation.
        </p>
        <p>
          Master pagination to make your Spring Boot backends ready for production traffic and real-world demands!
        </p>
      </section>

      {/* CTA Section */}
      <section className="fixed bottom-4 right-4 bg-gradient-to-r from-green-700 to-green-500 text-green-100 rounded-lg p-4 shadow-lg max-w-xs">
        <h3 className="font-bold mb-2 flex items-center gap-2 text-lg">
          🚀 Explore DevMetrix Tools
        </h3>
        <p className="text-green-200 text-sm mb-4">
          Supercharge your dev workflow with tools like TOON Converter, JSON Formatter, and API Tester.
        </p>
        <Link href="/tools" className="underline font-semibold hover:text-green-300">Check them out →</Link>
      </section>
    </article>
  );
}
