import { chromium } from 'playwright';
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('PAGE ERROR LOG:', msg.text());
        }
    });
    page.on('pageerror', err => {
        console.log('PAGE UNCAUGHT ERROR:', err.message);
    });
    await page.goto('http://localhost:8081', { waitUntil: 'networkidle' });
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
})();
