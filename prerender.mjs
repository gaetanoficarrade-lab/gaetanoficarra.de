import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const BASE_URL = 'https://gaetanoficarra.de';

// Validierung: Keys müssen vorhanden sein
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  VITE_SUPABASE_URL oder VITE_SUPABASE_ANON_KEY nicht gesetzt!');
  console.warn('Blog-Artikel werden übersprungen.');
}

// Statische Routen — /links raus (noindex)
const staticRoutes = [
  '/',
  '/leistungen',
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

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
      console.log(`✅ Blog-Artikel gefunden: ${posts.length} — werden vorgerendert.`);
    } else {
      console.log('⚠️  Keine veröffentlichten Blog-Artikel gefunden.');
    }
  } catch (err) {
    console.warn('⚠️  Blog-Artikel konnten nicht geladen werden:', err.message);
  }
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
const fallbackTitle = 'Marketing Automation Berater für Coaches | Gaetano Ficarra';

// Prerendering mit Error Handling pro Route
let successCount = 0;
let failedRoutes = [];

for (const route of routes) {
  try {
    const page = await browser.newPage();

    try {
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });

      // Warten bis SEOHead die seitenspezifischen Tags gesetzt hat
      await page.waitForFunction(
        (ft, isHome) => {
          const title = document.title;
          return isHome ? true : title !== ft;
        },
        { timeout: 5000 },
        fallbackTitle,
        route === '/'
      ).catch(() => console.warn(`⚠️  Warning: title may not have updated for ${route}`));

      const html = await page.content();

      if (!html || html.length < 100) {
        console.warn(`⚠️  WARNUNG: ${route} hat leeres oder zu kurzes HTML — möglicherweise Fehler`);
        failedRoutes.push(route);
      } else {
        const dir = path.join('/app/dist', route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
        console.log(`✅ Prerendered: ${route}`);
        successCount++;
      }
    } finally {
      await page.close();
    }
  } catch (err) {
    console.error(`❌ FEHLER beim Prerendering von ${route}:`, err.message);
    failedRoutes.push(route);
  }
}

await browser.close();
server.httpServer.close();

// Zusammenfassung
console.log(`\n${'='.repeat(60)}`);
console.log(`Prerendering abgeschlossen:`);
console.log(`✅ Erfolgreich: ${successCount}/${routes.length}`);
if (failedRoutes.length > 0) {
  console.log(`❌ Fehler bei: ${failedRoutes.join(', ')}`);
}
console.log(`${'='.repeat(60)}\n`);

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
    console.log(`✅ Sitemap angereichert mit ${blogPosts.length} Blog-Artikel(n).`);
  } else {
    console.log('⚠️  Keine Blog-Artikel — Sitemap unverändert.');
  }

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Sitemap aktualisiert — alle lastmod-Daten sind aktuell (${today}).`);
} catch (err) {
  console.error('❌ Sitemap konnte nicht angereichert werden:', err.message);
}