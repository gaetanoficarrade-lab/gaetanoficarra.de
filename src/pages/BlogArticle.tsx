import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, ChevronRight } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, type BlogPost } from "@/lib/supabase";
import { useQuizModal } from "@/context/QuizModalContext";
import portrait from "@/assets/gaetano-portrait.jpg";
import localBanners from "@/lib/blogBanners";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openQuizModal } = useQuizModal();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
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
        data.title = data.title.replace(/\s*[:\u2013\u2014–—]\s*/g, ". ").replace(/\.\s*\./g, ".");
        setPost(data);

        // Fetch related posts (other published posts, exclude current)
        const { data: others } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .neq("slug", slug)
          .order("published_at", { ascending: false })
          .limit(3);
        setRelatedPosts(
          (others || []).map((p) => ({
            ...p,
            title: p.title.replace(/\s*[:\u2013\u2014–—]\s*/g, ". ").replace(/\.\s*\./g, "."),
          }))
        );
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

  const getReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  const parseBold = (text: string) => {
    const html = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: ["strong"], ALLOWED_ATTR: ["class"] });
  };

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
            className="list-disc pl-6 space-y-2 text-muted-foreground leading-[1.7] mb-5"
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
          <h2 key={key++} className="font-display text-2xl md:text-3xl font-bold text-foreground mt-14 mb-5">
            {trimmed.replace("## ", "")}
          </h2>,
        );
      } else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={key++} className="font-display text-xl md:text-2xl font-semibold text-foreground mt-10 mb-4">
            {trimmed.replace("### ", "")}
          </h3>,
        );
      } else if (trimmed.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote
            key={key++}
            className="border-l-4 border-primary bg-muted/50 pl-5 pr-4 py-4 my-6 rounded-r-lg"
          >
            <p
              className="text-muted-foreground italic leading-[1.7]"
              dangerouslySetInnerHTML={{ __html: parseBold(trimmed.replace("> ", "")) }}
            />
          </blockquote>,
        );
      } else if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
        flushList();
        elements.push(
          <hr key={key++} className="border-border my-10" />,
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
            className="text-muted-foreground leading-[1.7] mb-5 text-[17px]"
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

  const readingTime = getReadingTime(post.content);
  const truncatedTitle = post.title.length > 40 ? post.title.slice(0, 40) + "…" : post.title;
  const coverImg = localBanners[post.slug] || post.cover_image;

  return (
    <>
      <SEOHead
        title={`${post.title} | Gaetano Ficarra`}
        description={post.description}
        canonical={`https://gaetanoficarra.de/blog/${post.slug}`}
        ogType="article"
        ogImage={coverImg || "https://gaetanoficarra.de/og-image.png"}
        breadcrumbs={[
          { name: "Startseite", url: "https://gaetanoficarra.de/" },
          { name: "Blog", url: "https://gaetanoficarra.de/blog" },
          { name: post.title, url: `https://gaetanoficarra.de/blog/${post.slug}` },
        ]}
        jsonLd={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: coverImg || "https://gaetanoficarra.de/og-image.png",
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

      {/* HERO BANNER */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {coverImg ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${coverImg})` }}
            />
            <div className="absolute inset-0 bg-foreground/85" />
          </>
        ) : (
          <div className="absolute inset-0 bg-foreground" />
        )}

        <div className="relative container mx-auto px-6 max-w-3xl text-center">
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-white/50">
              <li>
                <Link to="/" className="hover:text-white/80 transition-colors">Startseite</Link>
              </li>
              <li><ChevronRight size={14} /></li>
              <li>
                <Link to="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
              </li>
              <li><ChevronRight size={14} /></li>
              <li className="text-white/70 truncate max-w-[200px]">{truncatedTitle}</li>
            </ol>
          </nav>

          {/* Category tag */}
          {(post as any).category && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block text-xs font-body uppercase tracking-widest text-primary-foreground bg-primary/80 px-3 py-1 rounded-full mb-6"
            >
              {(post as any).category}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-5 line-clamp-2"
          >
            {post.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/60 font-body text-base md:text-lg max-w-2xl mx-auto mb-8 line-clamp-2"
          >
            {post.description}
          </motion.p>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/50 font-body"
          >
            <div className="flex items-center gap-2">
              <img
                src={portrait}
                alt="Gaetano Ficarra"
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
              <span className="text-white/70">Gaetano Ficarra</span>
            </div>
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{formatDate(post.published_at)}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{readingTime} Min. Lesezeit</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <main className="bg-card py-16 md:py-20">
        <article className="container mx-auto px-6 max-w-[720px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* AUTHOR BOX */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 flex items-start gap-5 p-6 md:p-8 rounded-xl border border-border bg-muted/40"
          >
            <img
              src={portrait}
              alt="Gaetano Ficarra"
              className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-border"
            />
            <div>
              <p className="font-display text-lg font-bold text-foreground mb-1">Gaetano Ficarra</p>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                Zertifizierter GoHighLevel Admin. Ich baue Systeme für Coaches und Berater die ihr Business skalieren wollen ohne mehr zu arbeiten.
              </p>
            </div>
          </motion.div>
        </article>
      </main>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="bg-background py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Weitere <span className="text-gradient-primary">Artikel</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((rp, i) => {
                const rpCover = localBanners[rp.slug] || rp.cover_image;
                return (
                  <motion.article
                    key={rp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                  >
                    <Link
                      to={`/blog/${rp.slug}`}
                      className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="aspect-video overflow-hidden">
                        {rpCover ? (
                          <img
                            src={rpCover}
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted" />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {rp.title}
                        </h3>
                        <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2 flex-1">
                          {rp.description}
                        </p>
                        <span className="flex items-center gap-1 text-primary text-xs font-body group-hover:gap-2 transition-all mt-auto">
                          Lesen <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA BOX */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-foreground" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative container mx-auto px-6 max-w-[720px] text-center"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Erkennst du dich wieder?
          </h2>
          <p className="text-white/60 font-body mb-8 max-w-lg mx-auto leading-relaxed">
            Wenn dieser Artikel deine Situation beschreibt, dann lass uns kurz sprechen. Kostenlos, ohne Druck, ohne vorher festgelegtes Ergebnis.
          </p>
          <button
            onClick={openQuizModal}
            className="inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground px-8 py-3 rounded-md text-sm font-body tracking-widest uppercase hover:opacity-90 transition-all duration-300 glow-cta"
          >
            System-Analyse starten
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default BlogArticle;
