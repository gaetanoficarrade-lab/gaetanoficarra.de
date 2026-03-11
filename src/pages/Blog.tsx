import { useState } from "react";
import SEOHead from "@/components/SEOHead";
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
      <SEOHead
        title="Marketing Automation Blog — Tipps & Insights | Gaetano Ficarra"
        description="Praxistipps zu Marketing Automation, CRM, Funnelmate und GoHighLevel. Lerne, wie du dein Business mit smarten Tools skalierst."
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

        {/* Coming Soon */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Hier entsteht demnächst ein <span className="text-gradient-primary">Blog</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Ich arbeite gerade an spannenden Artikeln rund um Marketing-Automatisierung, CRM-Systeme und Marketing. Schau bald wieder vorbei!
            </p>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
