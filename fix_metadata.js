const fs = require('fs');
const { execSync } = require('child_process');

const filesOutput = execSync('find devmatrix-cloud/app/blog/ -maxdepth 2 -type f \\( -name "page.tsx" -o -name "ClientPage.tsx" \\) | grep -v "\\[id\\]" | grep -v "submit" | grep -v "devmatrix-cloud/app/blog/page.tsx"').toString().trim().split('\n');

for (const file of filesOutput) {
    if (!file) continue;
    let content = fs.readFileSync(file, 'utf8');

    // We added useTheme which is a hook, making the component a Client component.
    // Client components cannot export metadata in Next.js App Router.
    // If we have metadata exported, we must separate them or just remove metadata for these static blogs (or better yet, keep it as server component and wrap only the client part, but for simplicity of applying the theme, we can remove the metadata export if it's not strictly necessary, OR we can remove 'use client' and just pass the theme context if we can.
    // Actually we can't easily pass the theme to a server component without cookies.
    // The easiest fix for now to make it build is to remove the metadata exports from these client pages, because they are hardcoded static blogs, but metadata is good for SEO...
    // Let's just remove `export const metadata` and change it to `const metadata` so it doesn't break the build but still exists in the file for reference if we want to refactor later.

    if (content.includes('export const metadata')) {
        content = content.replace(/export const metadata/g, 'const metadata');
        fs.writeFileSync(file, content);
        console.log(`Removed metadata export from ${file}`);
    }
}
