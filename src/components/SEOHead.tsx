import { useEffect } from "react";

const BASE_URL = "https://gaetanoficarra.de";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: { name: string; url: string }[];
}

const setMeta = (attr: string, key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = `${BASE_URL}/og-image.png`,
  ogType = "website",
  jsonLd,
  breadcrumbs,
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);

    const canonicalUrl = canonical || `${BASE_URL}${window.location.pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    setMeta("property", "og:title", ogTitle || title);
    setMeta("property", "og:description", ogDescription || description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", "Gaetano Ficarra");
    setMeta("property", "og:locale", "de_DE");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", ogTitle || title);
    setMeta("name", "twitter:description", ogDescription || description);
    setMeta("name", "twitter:image", ogImage);

    // Dynamic JSON-LD
    const scriptIds: string[] = [];

    if (breadcrumbs && breadcrumbs.length > 0) {
      const bcSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((bc, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": bc.name,
          "item": bc.url,
        })),
      };
      const bcScript = document.createElement("script");
      bcScript.type = "application/ld+json";
      bcScript.id = "seo-breadcrumb-ld";
      bcScript.textContent = JSON.stringify(bcSchema);
      document.head.appendChild(bcScript);
      scriptIds.push("seo-breadcrumb-ld");
    }

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = `seo-page-ld-${i}`;
        script.textContent = JSON.stringify({ "@context": "https://schema.org", ...schema });
        document.head.appendChild(script);
        scriptIds.push(`seo-page-ld-${i}`);
      });
    }

    return () => {
      document.title = "Gaetano Ficarra — GoHighLevel & Funnelmate Experte für Marketing Automation";
      scriptIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, jsonLd, breadcrumbs]);

  return null;
};

export default SEOHead;
