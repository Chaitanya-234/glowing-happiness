const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to dynamic blog post route...');
    // "theme-system-demo" is defined in blog-data.ts but has no static folder,
    // so it should route to app/blog/[id]/page.tsx
    await page.goto('http://localhost:3000/blog/theme-system-demo', { waitUntil: 'networkidle' });

    console.log('Page loaded. Checking for dynamic post content...');

    // Check if the page has rendered our BlogPostClient content
    await page.waitForSelector('article', { timeout: 10000 });

    // Click the theme selector button (assumed to be the button with a palette icon)
    console.log('Opening theme selector...');
    // We can use a more robust selector. The ThemeSelector button usually has role="button" or an aria-label,
    // or we can just find it by some text or class if we know it.
    // Looking at the previous screenshot, it might be in the bottom right corner.
    // Let's find any button that might be the theme toggle.
    await page.evaluate(() => {
        // Theme selector is likely a fixed button
        const buttons = Array.from(document.querySelectorAll('button'));
        const themeButton = buttons.find(b => b.textContent.includes('Theme') || b.className.includes('fixed'));
        if (themeButton) themeButton.click();
    });

    await page.waitForTimeout(1000);

    // Click on "Ocean Breeze" theme option
    console.log('Selecting "Ocean Breeze" theme...');
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const oceanBtn = buttons.find(b => b.textContent.includes('Ocean'));
        if (oceanBtn) oceanBtn.click();
    });

    await page.waitForTimeout(1000);

    console.log('Taking screenshot...');
    await page.screenshot({ path: '/home/jules/verification/dynamic-blog-theme.png', fullPage: true });

    console.log('Verification script completed successfully.');
  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await browser.close();
  }
})();
