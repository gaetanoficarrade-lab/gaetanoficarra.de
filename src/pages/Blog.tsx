import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, blogCategories, type BlogCategory } from "@/data/blogPosts";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "Alle">("Alle");

  const filteredPosts =
    activeCategory === "Alle"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
  };

  return (
    <>
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
            <span className="text-gradient-primary">Blog</span>
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

        {/* Categories */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {["Alle", ...blogCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as BlogCategory | "Alle")}
                className={`px-5 py-2 rounded-full text-sm font-body tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block h-full rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-body tracking-wide bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readingTime}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-16">
              Noch keine Artikel in dieser Kategorie.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
