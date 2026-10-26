const fs = require('fs');
const { execSync } = require('child_process');

const filesOutput = execSync('find devmatrix-cloud/app/blog/ -maxdepth 2 -type f \\( -name "page.tsx" -o -name "ClientPage.tsx" \\) | grep -v "\\[id\\]" | grep -v "submit" | grep -v "devmatrix-cloud/app/blog/page.tsx"').toString().trim().split('\n');

for (const file of filesOutput) {
    if (!file) continue;
    let content = fs.readFileSync(file, 'utf8');

    // We also need to completely remove metadata from being exported from these pages to fix build
    // if the page is a client component

    if (content.includes('const metadata = {')) {
        // Just empty it, or comment it out so it's not exported or crashing
        // actually since we changed `export const metadata` to `const metadata` it shouldn't crash unless there is another export
        // The error was "You are attempting to export "metadata" from a component marked with "use client""
        // so it means `export const metadata` was still there or `const metadata` was somehow exported
    }

    if (content.includes('export const metadata')) {
        content = content.replace(/export const metadata/g, 'const metadata');
        fs.writeFileSync(file, content);
    }
}
