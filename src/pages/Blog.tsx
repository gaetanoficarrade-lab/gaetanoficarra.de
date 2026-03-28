import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, type BlogPost } from "@/lib/supabase";

// Local blog banner images mapped by slug
const localBanners: Record<string, string> = Object.fromEntries(
  Object.entries(import.meta.glob("@/assets/blog/*-banner.{jpg,png,webp}", { eager: true, import: "default" })).map(
    ([path, url]) => {
      const filename = path.split("/").pop() || "";
      const slug = filename.replace(/-banner\.\w+$/, "");
      return [slug, url as string];
    }
  )
);

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      // Clean titles: replace colons/dashes used as separators with periods
      const cleaned = (data || []).map(p => ({
        ...p,
        title: p.title.replace(/\s*[:\u2013\u2014–—]\s*/g, ". ").replace(/\.\s*\./g, ".")
      }));
      setPosts(cleaned);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
  };

  return (
    <>
      <SEOHead
        title="Marketing Automation Blog — Tipps & Insights | Gaetano Ficarra"
        description="Marketing Automation Blog: Praxistipps zu GoHighLevel, Funnelmate & CRM-Strategie. Wissen für Selbstständige, die ihr Business skalieren wollen."
        canonical="https://gaetanoficarra.de/blog"
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
          { name: "Blog", url: "https://gaetanoficarra.de/blog" },
        ]}
        jsonLd={{
          "@type": "Blog",
          name: "Marketing Automation Blog",
          url: "https://gaetanoficarra.de/blog",
          description: "Praxistipps zu Marketing Automation, CRM, Funnelmate und GoHighLevel.",
          author: { "@type": "Person", name: "Gaetano Ficarra", url: "https://gaetanoficarra.de" },
          inLanguage: "de-DE",
        }}
      />
      <Header />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        {/* Hero */}
        <section className="container mx-auto px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-6xl font-bold mb-6"
          >
            Marketing Automation <span className="text-gradient-primary">Blog & Ressourcen</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body"
          >
            Praxiswissen rund um Marketing-Automatisierung, CRM-Systeme und digitales Wachstum für Selbstständige.
          </motion.p>
        </section>

        {/* Posts */}
        <section className="container mx-auto px-6 pb-20">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl mx-auto text-center py-20"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Artikel in Vorbereitung — <span className="text-gradient-primary">bald verfügbar</span>
              </h2>
              <p className="text-muted-foreground font-body text-lg">
                Ich arbeite gerade an spannenden Artikeln rund um Marketing-Automatisierung, CRM-Systeme und Marketing.
                Schau bald wieder vorbei!
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300"
                  >
                    {(localBanners[post.slug] || post.cover_image) && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={localBanners[post.slug] || post.cover_image!}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2">{post.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(post.published_at)}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                          Lesen <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Vergleichs-Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto mt-16 rounded-xl border border-primary/20 bg-card p-8 md:p-10 text-center"
          >
            <p className="text-muted-foreground font-body text-lg mb-4">Nicht sicher welches Tool das Richtige ist?</p>
            <Link
              to="/highlevel-vs-funnelmate"
              className="inline-flex items-center gap-2 text-primary font-body text-sm tracking-widest uppercase hover:gap-3 transition-all duration-300"
            >
              GoHighLevel vs. Funnelmate — der direkte Vergleich
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
