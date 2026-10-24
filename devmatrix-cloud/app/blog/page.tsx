import { BlogPost, getAllPosts } from '@/lib/blog-data';
import clientPromise from '@/lib/mongodb';
import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Developer Blog - Tutorials & Guides | Devmetrix.in',
  description: 'Learn web development, JavaScript, APIs, and more with our comprehensive tutorials and guides for developers.',
  keywords: ['web development', 'tutorials', 'programming', 'javascript', 'api', 'developer guides'],
};

export const dynamic = 'force-dynamic';

async function getPosts(): Promise<BlogPost[]> {
  const staticPosts = getAllPosts();
  let dbPosts: BlogPost[] = [];

  try {
    const client = await clientPromise;
    const db = client.db('blog_database');
    const posts = await db
      .collection('posts')
      .find({})
      .sort({ datePublished: -1 })
      .toArray();

    dbPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString()
    })) as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching posts from MongoDB:', error);
    // Fallback to empty array for DB posts, will still return static posts
  }

  // Merge and sort
  const allPosts = [...dbPosts, ...staticPosts];

  // Sort by date descending
  return allPosts.sort((a, b) =>
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black pt-24 pb-20 px-4 flex justify-center">
        <Loader2 className="animate-spin text-purple-500" />
      </div>
    }>
      <BlogClient initialPosts={posts} />
    </Suspense>
  );
}
