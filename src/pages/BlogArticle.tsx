import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, type BlogPost } from "@/lib/supabase";
import { useQuizModal } from "@/context/QuizModalContext";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openQuizModal } = useQuizModal();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (notFound) return <Navigate to="/blog" replace />;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
  };

  const parseBold = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');

  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={key++}
            className="list-disc list-inside space-y-2 text-muted-foreground font-body leading-relaxed mb-6 ml-4"
          >
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
            ))}
          </ul>,
        );
        listItems = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        continue;
      }

      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={key++} className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">
            {trimmed.replace("## ", "")}
          </h2>,
        );
      } else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={key++} className="font-display text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">
            {trimmed.replace("### ", "")}
          </h3>,
        );
      } else if (trimmed.startsWith("- ")) {
        listItems.push(trimmed.replace("- ", ""));
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushList();
        listItems.push(trimmed.replace(/^\d+\.\s/, ""));
      } else {
        flushList();
        elements.push(
          <p
            key={key++}
            className="text-muted-foreground font-body leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: parseBold(trimmed) }}
          />,
        );
      }
    }
    flushList();
    return elements;
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-20 bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (!post) return null;

  return (
    <>
      <SEOHead
        title={`${post.title} | Gaetano Ficarra`}
        description={post.description}
        canonical={`https://gaetanoficarra.de/blog/${post.slug}`}
        ogType="article"
        ogImage={post.cover_image || "https://gaetanoficarra.de/og-image.png"}
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
          { name: "Blog", url: "https://gaetanoficarra.de/blog" },
          { name: post.title, url: `https://gaetanoficarra.de/blog/${post.slug}` },
        ]}
        jsonLd={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.cover_image || "https://gaetanoficarra.de/og-image.png",
          url: `https://gaetanoficarra.de/blog/${post.slug}`,
          datePublished: post.published_at,
          dateModified: post.updated_at || post.published_at,
          author: { "@type": "Person", name: "Gaetano Ficarra", url: "https://gaetanoficarra.de" },
          publisher: { "@type": "Person", name: "Gaetano Ficarra", url: "https://gaetanoficarra.de" },
          inLanguage: "de-DE",
          mainEntityOfPage: { "@type": "WebPage", "@id": `https://gaetanoficarra.de/blog/${post.slug}` },
        }}
      />

      <Header />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        <article className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
            >
              <ArrowLeft size={16} /> Zurück zum Blog
            </Link>
          </motion.div>

          {post.cover_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 rounded-xl overflow-hidden"
            >
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full aspect-video object-cover"
                fetchPriority="high"
              />
            </motion.div>
          )}

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            {post.published_at && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(post.published_at)}
                </span>
              </div>
            )}
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {renderContent(post.content)}
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 rounded-xl border border-border bg-card p-8 md:p-12 text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Du willst das auch für dein Business?
            </h2>
            <p className="text-muted-foreground font-body mb-6 max-w-lg mx-auto">
              Lass uns gemeinsam herausfinden, wie du dein Marketing automatisieren und dein Business aufs nächste Level
              bringen kannst.
            </p>
            <button
              onClick={openQuizModal}
              className="inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground px-8 py-3 rounded-md text-sm font-body tracking-widest uppercase hover:opacity-90 transition-all duration-300 glow-cta"
            >
              Kostenloses Erstgespräch buchen
              <ArrowRight size={16} />
            </button>
          </motion.section>

          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
            >
              ← Alle Artikel anzeigen
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;
