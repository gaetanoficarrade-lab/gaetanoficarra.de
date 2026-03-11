import puppeteer from 'puppeteer';
import { createServer } from 'vite';
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

const server = await createServer({
  root: '/var/www/gaetanoficarra',
  server: { port: 3333 },
  preview: false,
  build: { outDir: 'dist' },
});

await server.listen();

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:3333${route}`, { waitUntil: 'networkidle0' });
  const html = await page.content();
  
  const dir = path.join('/var/www/gaetanoficarra/dist', route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  
  console.log(`Prerendered: ${route}`);
  await page.close();
}

await browser.close();
await server.close();
