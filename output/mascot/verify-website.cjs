const { createRequire } = require('node:module');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const bundled = createRequire('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1104-1290-0_26.1104.1290.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/');
const { chromium } = bundled('playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.hostname !== 'kip.test') return route.abort();
      const relative = url.pathname === '/' || url.pathname === '/docs' ? 'index.html' : url.pathname.slice(1);
      const filename = path.resolve('dist', relative);
      const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' }[path.extname(filename)];
      try { await route.fulfill({ body: await fs.readFile(filename), contentType: type }); }
      catch { await route.fulfill({ status: 404, body: '' }); }
    });
    await page.goto('http://kip.test/');
    const hero = page.locator('[data-hero-mascot] .mascot');
    await hero.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-hero-mascot] .mascot')?.dataset.action === 'toss');
    await page.waitForTimeout(450);
    assert(await page.locator('.mascot-logo-particle').evaluateAll(nodes => nodes.some(n => Number(getComputedStyle(n).opacity) > .5)));
    await page.screenshot({ path: 'output/mascot/website-desktop.png' });
    const actions = await page.evaluate(() => new Promise(resolve => {
      const actions = new Set(['toss']);
      const target = document.querySelector('[data-hero-mascot] .mascot');
      const observer = new MutationObserver(() => {
        actions.add(target.dataset.action);
        if (actions.has('spin')) { observer.disconnect(); clearTimeout(timeout); resolve([...actions]); }
      });
      observer.observe(target, { attributes: true, attributeFilter: ['data-action'] });
      const timeout = setTimeout(() => { observer.disconnect(); resolve([...actions]); }, 30000);
    }));
    for (const action of ['toss', 'glance', 'wiggle', 'sleep', 'spin']) assert(actions.includes(action), `Missing ${action}`);
    await hero.click();
    assert.equal(await hero.getAttribute('data-action'), 'toss');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(2600);
    assert.equal(await hero.getAttribute('data-action'), 'idle');
    const transform = await hero.locator('.mascot-body').evaluate(n => getComputedStyle(n).transform);
    assert(['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(transform), transform);
    await hero.click();
    await page.waitForTimeout(150);
    assert(await page.locator('.mascot-logo-particle').evaluateAll(nodes => nodes.some(n => Number(getComputedStyle(n).opacity) > .5)));
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://kip.test/docs');
    const floating = page.locator('.floating-mascot .mascot');
    await page.waitForFunction(() => document.querySelector('.floating-mascot .mascot')?.dataset.action === 'toss');
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'output/mascot/website-mobile.png' });
    assert.equal(await floating.getAttribute('data-action'), 'toss');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ actions, click: 'passed', reducedMotion: 'passed', mobileFloating: 'passed', pageErrors: errors }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
