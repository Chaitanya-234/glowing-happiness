import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { isAdminAuthenticated } from '@/lib/auth';
import { ADMIN_CREDENTIALS } from '@/lib/auth-config';

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, rejectionReason } = await request.json();
    const { id: submissionId } = await params;

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('blog_database');

    // Get the submission
    const submission = await db.collection('submissions').findOne({ id: submissionId });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    if (action === 'approve') {
      // Move to blog posts collection
      const blogPost = {
        id: submission.id,
        title: submission.title,
        slug: generateSlug(submission.title) + '-' + submission.id.slice(-6),
        excerpt: submission.description,
        content: submission.content,
        category: submission.category,
        tags: submission.tags,
        author: {
          name: submission.authorName,
          email: submission.authorEmail,
          avatar: '/authors/team-avatar.png'
        },
        themeId: submission.themeId || 'default',
        featuredImage: '/blog/placeholders/tech-bg.jpg',
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        readingTime: Math.ceil(submission.content.split(/\s+/).length / 200),
        viewCount: 0,
        popularity: 0
      };

      await db.collection('posts').insertOne(blogPost);

      // Update submission status
      await db.collection('submissions').updateOne(
        { id: submissionId },
        {
          $set: {
            status: 'approved',
            reviewedAt: new Date().toISOString(),
            reviewedBy: ADMIN_CREDENTIALS.email
          }
        }
      );

      return NextResponse.json({
        success: true,
        message: 'Post approved and published'
      });
    } else {
      // Reject
      await db.collection('submissions').updateOne(
        { id: submissionId },
        {
          $set: {
            status: 'rejected',
            reviewedAt: new Date().toISOString(),
            reviewedBy: ADMIN_CREDENTIALS.email,
            rejectionReason: rejectionReason || 'No reason provided'
          }
        }
      );

      return NextResponse.json({
        success: true,
        message: 'Post rejected'
      });
    }
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
