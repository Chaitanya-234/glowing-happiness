import { ThemeId } from '@/lib/themes/blog-themes';

export interface BlogSubmission {
  _id?: string;
  id: string; // unique ID for the post
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  authorEmail: string;
  themeId: ThemeId;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}
