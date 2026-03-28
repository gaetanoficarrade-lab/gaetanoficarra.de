import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchBlogSitemapEntries, type SitemapEntry } from "@/utils/generateSitemap";
import { motion } from "framer-motion";
import { Map } from "lucide-react";

const staticPages: SitemapEntry[] = [
  { loc: "https://gaetanoficarra.de/", lastmod: "2026-03-26", changefreq: "weekly", priority: "1.0" },
  { loc: "https://gaetanoficarra.de/leistungen", lastmod: "2026-03-26", changefreq: "monthly", priority: "0.9" },
  {
    loc: "https://gaetanoficarra.de/highlevel-vs-funnelmate",
    lastmod: "2026-03-26",
    changefreq: "monthly",
    priority: "0.8",
  },
  { loc: "https://gaetanoficarra.de/blog", lastmod: "2026-03-26", changefreq: "weekly", priority: "0.7" },
  { loc: "https://gaetanoficarra.de/wa-generator", lastmod: "2026-03-26", changefreq: "monthly", priority: "0.6" },
  { loc: "https://gaetanoficarra.de/utm-generator", lastmod: "2026-03-26", changefreq: "monthly", priority: "0.6" },
];

const Sitemap = () => {
  const [blogEntries, setBlogEntries] = useState<SitemapEntry[]>([]);

  useEffect(() => {
    fetchBlogSitemapEntries().then(setBlogEntries);
  }, []);

  const allEntries = [...staticPages, ...blogEntries];

  return (
    <>
      <SEOHead
        title="Sitemap. Gaetano Ficarra"
        description="Übersicht aller Seiten auf gaetanoficarra.de. Marketing Automation, Blog, Tools und mehr."
        noIndex={true}
      />
      <Header />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        <section className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Map className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Sitemap</h1>
            <p className="text-muted-foreground font-body">Alle Seiten auf einen Blick.</p>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {allEntries.map((entry) => {
              const path = new URL(entry.loc).pathname;
              return (
                <li key={entry.loc}>
                  <Link
                    to={path}
                    className="block rounded-lg border border-border bg-card px-5 py-3 text-sm font-body text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                  >
                    {entry.loc}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Sitemap;
