import type { Metadata } from 'next';
import CourseCreatorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Course Creator | Free Curriculum Generator',
  description: 'Generate comprehensive course curriculums, lesson plans, and quizzes instantly with AI. Perfect for educators and course creators.',
  keywords: ['ai course creator', 'curriculum generator', 'lesson planner', 'scorm content', 'course outline'],
};

export default function Page() {
  return <CourseCreatorClient />;
}
