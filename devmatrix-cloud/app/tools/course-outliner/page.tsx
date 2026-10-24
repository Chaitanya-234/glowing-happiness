import { Metadata } from 'next';
import CourseOutlinerClient from './components/CourseOutlinerClient';

export const metadata: Metadata = {
  title: 'AI Course Outliner & SCORM Helper | DevMatrix',
  description: 'Instantly generate comprehensive course outlines, SCORM metadata, quiz questions, and coding exercises using advanced AI.',
  keywords: ['AI course generator', 'SCORM helper', 'course outline builder', 'lesson plan AI', 'curriculum designer'],
};

export default function CourseOutlinerPage() {
  return <CourseOutlinerClient />;
}
