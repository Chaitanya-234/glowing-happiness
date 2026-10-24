import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { BlogSubmission } from '@/lib/types/submission';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { title, description, content, category, tags, authorName, authorEmail } = body;

    if (!title || !description || !content || !category || !authorName || !authorEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blog_database');

    const submission: Omit<BlogSubmission, '_id'> = {
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      content,
      category,
      tags: tags || [],
      authorName,
      authorEmail,
      themeId: body.themeId || 'default',
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    await db.collection('submissions').insertOne(submission);

    return NextResponse.json({
      success: true,
      message: 'Post submitted successfully and is pending approval',
      submissionId: submission.id
    });
  } catch (error) {
    console.error('Error submitting post:', error);
    return NextResponse.json(
      { error: 'Failed to submit post' },
      { status: 500 }
    );
  }
}
