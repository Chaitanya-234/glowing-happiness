const fs = require('fs');
const { execSync } = require('child_process');

const filesOutput = execSync('find devmatrix-cloud/app/blog/ -maxdepth 2 -type f \\( -name "page.tsx" -o -name "ClientPage.tsx" \\) | grep -v "\\[id\\]" | grep -v "submit" | grep -v "devmatrix-cloud/app/blog/page.tsx"').toString().trim().split('\n');

for (const file of filesOutput) {
    if (!file) continue;
    let content = fs.readFileSync(file, 'utf8');

    // We added useTheme which is a hook, so the component MUST be a client component
    if (content.includes("useTheme") && !content.includes("'use client'") && !content.includes('"use client"')) {
        // add 'use client'; at the very top
        content = "'use client';\n" + content;
        fs.writeFileSync(file, content);
        console.log(`Added 'use client' to ${file}`);
    }
}
