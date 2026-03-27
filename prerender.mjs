import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://supabase.gaetanoficarra.de';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNjQxNzY5MjAwLCJleHAiOjE3OTk1MzU2MDB9.ayn7R9jwFZYZCHSFQcpggY8DpS3jIXXm1gFBgeOFdtE';
const BASE_URL = 'https://gaetanoficarra.de';

// Statische Routen — /absage raus (noindex), /admin/blog raus (kein SEO-Wert)
const staticRoutes = [
  '/',
  '/leistungen',
  '/links',
  '/highlevel-vs-funnelmate',
  '/agb',
  '/datenschutz',
  '/impressum',
  '/wa-generator',
  '/utm-generator',
  '/blog',
];

// Blog-Artikel aus Supabase laden
let blogRoutes = [];
let blogPosts = [];

try {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, published_at, updated_at')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (posts && posts.length > 0) {
    blogPosts = posts;
    blogRoutes = posts.map((post) => `/blog/${post.slug}`);
    console.log(`Blog-Artikel gefunden: ${posts.length} — werden vorgerendert.`);
  } else {
    console.log('Keine veröffentlichten Blog-Artikel gefunden.');
  }
} catch (err) {
  console.warn('Blog-Artikel konnten nicht geladen werden:', err.message);
}

const routes = [...staticRoutes, ...blogRoutes];

// Vite Preview Server starten
const server = await preview({
  root: '/app',
  preview: { port: 3333 },
});

const address = server.httpServer.address();
const port = address.port;

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const fallbackTitle = 'Gaetano Ficarra — GoHighLevel & Funnelmate Experte für Marketing Automation';

for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });

  // Warten bis SEOHead die seitenspezifischen Tags gesetzt hat
  await page.waitForFunction(
    (ft, isHome) => {
      const title = document.title;
      return isHome ? true : title !== ft;
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

// SITEMAP AKTUALISIEREN — mit automatischen lastmod-Daten
try {
  const sitemapPath = path.join('/app/dist', 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const today = new Date().toISOString().slice(0, 10);

  // 1. Alle statischen Seiten: lastmod = heute
  staticRoutes.forEach((route) => {
    const loc = route === '/' ? BASE_URL + '/' : BASE_URL + route;
    const oldPattern = `<loc>${loc}</loc>\\s*<lastmod>\\d{4}-\\d{2}-\\d{2}</lastmod>`;
    const replacement = `<loc>${loc}</loc>\n    <lastmod>${today}</lastmod>`;
    sitemap = sitemap.replace(new RegExp(oldPattern), replacement);
  });

  // 2. Blog-Artikel: lastmod = updated_at (oder published_at falls nicht vorhanden)
  if (blogPosts.length > 0) {
    const blogUrls = blogPosts.map((post) => {
      const lastmod = (post.updated_at || post.published_at || today).slice(0, 10);
      return `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }).join('\n');

    sitemap = sitemap.replace('</urlset>', `${blogUrls}\n</urlset>`);
    console.log(`Sitemap angereichert mit ${blogPosts.length} Blog-Artikel(n).`);
  } else {
    console.log('Keine Blog-Artikel — Sitemap unverändert.');
  }

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Sitemap aktualisiert — alle lastmod-Daten sind aktuell (${today}).`);
} catch (err) {
  console.error('Sitemap konnte nicht angereichert werden:', err.message);
}