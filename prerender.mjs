import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/leistungen',
  '/links',
  '/highlevel-vs-funnelmate',
  '/agb',
  '/datenschutz',
  '/impressum',
  '/wa-generator',
  '/utm-generator',
  '/absage',
  '/blog',
];

const server = await preview({
  root: '/var/www/gaetanoficarra',
  preview: { port: 3333 },
});

const address = server.httpServer.address();
const port = address.port;

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });
  
  // Wait until SEOHead has applied route-specific tags
  const fallbackTitle = 'Gaetano Ficarra — GoHighLevel & Funnelmate Experte für Marketing Automation';
  await page.waitForFunction(
    (ft, isHome) => {
      const title = document.title;
      // Homepage has its own title; other routes must differ from fallback
      return isHome ? title !== ft || true : title !== ft;
    },
    { timeout: 5000 },
    fallbackTitle,
    route === '/'
  ).catch(() => console.warn(`Warning: title may not have updated for ${route}`));

  const html = await page.content();
  
  const dir = path.join('/var/www/gaetanoficarra/dist', route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  
  console.log(`Prerendered: ${route}`);
  await page.close();
}

await browser.close();
server.httpServer.close();
