'use client';

import Editor, { OnMount } from '@monaco-editor/react';
import { useRef, useEffect } from 'react';
import { languages } from '../lib/judge0-languages';

interface CodeEditorProps {
  languageId: number;
  theme: string;
  code: string;
  onChange: (value: string) => void;
  fontSize: number;
}

// Map Judge0 language ID or extension to Monaco language ID
const getMonacoLanguage = (langId: number): string => {
  const lang = languages.find((l) => l.id === langId);
  if (!lang) return 'plaintext';

  switch (lang.extension) {
    case 'js': return 'javascript';
    case 'ts': return 'typescript';
    case 'py': return 'python';
    case 'java': return 'java';
    case 'c': return 'c';
    case 'cpp': return 'cpp';
    case 'cs': return 'csharp';
    case 'php': return 'php';
    case 'rb': return 'ruby';
    case 'go': return 'go';
    case 'rs': return 'rust';
    case 'swift': return 'swift';
    case 'kt': return 'kotlin';
    case 'sh': return 'shell';
    case 'pl': return 'perl';
    case 'r': return 'r';
    case 'lua': return 'lua';
    case 'sql': return 'sql';
    case 'html': return 'html';
    case 'css': return 'css';
    default: return 'plaintext';
  }
};

export default function CodeEditor({ languageId, theme, code, onChange, fontSize }: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const monacoLanguage = getMonacoLanguage(languageId);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 shadow-inner bg-[#1e1e1e]">
      <Editor
        height="100%"
        width="100%"
        language={monacoLanguage}
        value={code}
        theme={theme}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          fontSize: fontSize,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
          fontLigatures: true,
        }}
      />
    </div>
  );
}
