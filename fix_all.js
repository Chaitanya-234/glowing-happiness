const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const filesOutput = execSync('find devmatrix-cloud/app/blog/ -maxdepth 2 -type f \\( -name "page.tsx" -o -name "ClientPage.tsx" \\) | grep -v "\\[id\\]" | grep -v "submit" | grep -v "devmatrix-cloud/app/blog/page.tsx"').toString().trim().split('\n');

for (const file of filesOutput) {
    if (!file) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Check if it's already using ThemeProvider
    if (content.includes("import { useTheme } from '@/components/providers/ThemeProvider'")) {
        // console.log(`Skipping ${file} - already has useTheme`);
        continue;
    }

    let isClient = false;
    let isPage = false;

    if (content.includes("'use client'") || content.includes('"use client"')) {
        isClient = true;
    }

    if (!isClient) {
        // If it's a server component just rendering a ClientPage, skip
        if (content.includes('export default function Page() {') && content.includes('<ClientPage />')) {
            // console.log(`Skipping ${file} - Server wrapper for ClientPage`);
            continue;
        }
    }

    // We need to find the function component
    // Assuming the main export default function

    const lines = content.split('\n');
    let newLines = [];
    let importAdded = false;
    let componentStarted = false;
    let hookAdded = false;
    let divReplaced = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Add import
        if (!importAdded && (line.startsWith('import ') || line.trim() === '')) {
            newLines.push("import { useTheme } from '@/components/providers/ThemeProvider';");
            importAdded = true;
        }

        if (line.includes('export default function')) {
            componentStarted = true;
        }

        if (componentStarted && !hookAdded && line.includes('{') && !line.includes('return') && !line.includes('=')) {
            newLines.push(line);
            newLines.push('  const { currentTheme: theme } = useTheme();');
            hookAdded = true;
            continue;
        }

        if (componentStarted && line.includes('className=') && line.includes('min-h-screen') && !divReplaced) {
            const replacement = 'className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}';
            line = line.replace(/className="[^"]*"/, replacement);
            line = line.replace(/className=\{`[^`]*`\}/, replacement);
            divReplaced = true;
        }

        // Remove text-gray-900 or dark:text-white inside article if possible
        if (componentStarted && divReplaced) {
             line = line.replace(/bg-black|bg-gray-\d+|dark:bg-gray-\d+/g, '');
        }

        newLines.push(line);
    }

    fs.writeFileSync(file, newLines.join('\n'));
    console.log(`Processed ${file}`);
}
