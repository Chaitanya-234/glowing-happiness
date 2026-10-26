const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to static blog post route...');
    await page.goto('http://localhost:3000/blog/cybersecurity-owasp-top-10-2025', { waitUntil: 'networkidle' });

    console.log('Page loaded. Checking for static post content...');
    await page.waitForTimeout(2000);

    console.log('Taking screenshot...');
    await page.screenshot({ path: '/home/jules/verification/static-blog-theme.png', fullPage: true });

    console.log('Verification script completed successfully.');
  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await browser.close();
  }
})();
