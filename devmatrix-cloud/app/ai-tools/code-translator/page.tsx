import type { Metadata } from 'next';
import CodeTranslatorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Code Translator | Convert Code Between Languages',
  description: 'Instantly translate code between Python, JavaScript, TypeScript, Java, C++, and more while preserving logic and comments.',
  keywords: ['code translator', 'code converter', 'ai code generator', 'python to javascript', 'java to python', 'developer tools'],
};

export default function Page() {
  return <CodeTranslatorClient />;
}
