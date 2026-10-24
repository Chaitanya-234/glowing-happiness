import clientPromise from '@/lib/mongodb';
import { BlogPost, getPostBySlug } from '@/lib/blog-data';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  // Try finding in static data first
  const staticPost = getPostBySlug(id);

  if (staticPost) {
    return { title: staticPost.title };
  }

  // Fallback to DB
  try {
    const client = await clientPromise;
    const db = client.db('blog_database');
    const post = await db.collection('posts').findOne({ slug: id });
    if (post) return { title: post.title };
  } catch (e) {
    // ignore
  }

  return { title: 'Blog Post' };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Try fetching from static data (for legacy/static posts)
  let post: BlogPost | null | undefined = getPostBySlug(id);

  // 2. If not found, try fetching from MongoDB
  if (!post) {
    try {
      const client = await clientPromise;
      const db = client.db('blog_database');
      const dbPost = await db.collection('posts').findOne({ slug: id });

      if (dbPost) {
        // Map DB post to BlogPost interface
        post = {
          id: dbPost.id,
          title: dbPost.title,
          slug: dbPost.slug,
          excerpt: dbPost.excerpt,
          content: dbPost.content,
          category: dbPost.category,
          tags: dbPost.tags || [],
          author: dbPost.author,
          themeId: dbPost.themeId || 'default',
          featuredImage: dbPost.featuredImage || '/blog/placeholders/tech-bg.jpg',
          datePublished: dbPost.datePublished,
          dateModified: dbPost.dateModified,
          readingTime: dbPost.readingTime || 5,
          popularity: dbPost.popularity || 0,
          viewCount: dbPost.viewCount || 0
        };
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black pt-32 px-4 flex flex-col items-center">
        <h1 className="text-purple-200 text-2xl mb-4">Post not found</h1>
        <Link href="/blog" className="text-purple-400 hover:text-purple-300">Back to Blog</Link>
      </div>
    );
  }

  return <BlogPostClient post={post} />;
}
