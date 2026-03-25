import { supabase } from "@/lib/supabase";

const BASE_URL = "https://gaetanoficarra.de";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

/**
 * Fetches published blog posts from Supabase and returns sitemap entries for them.
 */
export const fetchBlogSitemapEntries = async (): Promise<SitemapEntry[]> => {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, published_at, updated_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (!posts || posts.length === 0) return [];

  return posts.map((post) => {
    const lastmod = (post.updated_at || post.published_at || new Date().toISOString()).slice(0, 10);
    return {
      loc: `${BASE_URL}/blog/${post.slug}/`,
      lastmod,
      changefreq: "weekly",
      priority: "0.6",
    };
  });
};

/**
 * Generates a complete sitemap XML string including static pages and dynamic blog posts.
 */
export const generateSitemapXml = (staticEntries: SitemapEntry[], blogEntries: SitemapEntry[]): string => {
  const allEntries = [...staticEntries, ...blogEntries];
  const urls = allEntries
    .map(
      (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};
