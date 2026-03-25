import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

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
  root: '/app',
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
  
  const dir = path.join('/app/dist', route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  
  console.log(`Prerendered: ${route}`);
  await page.close();
}

await browser.close();
server.httpServer.close();

// --- Enrich sitemap.xml with blog posts from Supabase ---
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://supabase.gaetanoficarra.de';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNjQxNzY5MjAwLCJleHAiOjE3OTk1MzU2MDB9.ayn7R9jwFZYZCHSFQcpggY8DpS3jIXXm1gFBgeOFdtE';
const BASE_URL = 'https://gaetanoficarra.de';

try {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, published_at, updated_at')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (posts && posts.length > 0) {
    const sitemapPath = path.join('/app/dist', 'sitemap.xml');
    let sitemap = fs.readFileSync(sitemapPath, 'utf-8');

    const today = new Date().toISOString().slice(0, 10);
    const blogUrls = posts.map((post) => {
      const lastmod = (post.updated_at || post.published_at || today).slice(0, 10);
      return `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }).join('\n');

    // Insert blog URLs before closing </urlset>
    sitemap = sitemap.replace('</urlset>', `${blogUrls}\n</urlset>`);
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Sitemap enriched with ${posts.length} blog post(s).`);
  } else {
    console.log('No published blog posts found — sitemap unchanged.');
  }
} catch (err) {
  console.error('Failed to enrich sitemap:', err.message);
}
