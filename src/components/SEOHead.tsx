import { useEffect, useRef } from "react";

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

const setCanonical = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

/** Upsert a JSON-LD script by ID — prevents duplicates after pre-rendering */
const upsertJsonLd = (id: string, data: Record<string, unknown>) => {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

/**
 * Apply critical SEO tags synchronously (outside useEffect) so they are
 * present in the DOM when Puppeteer calls page.content().
 */
const applyCriticalTags = (
  title: string,
  description: string,
  canonical: string,
  ogTitle: string,
  ogDescription: string,
  ogImage: string,
  ogType: string,
) => {
  document.title = title;
  setMeta("name", "description", description);
  setCanonical(canonical);

  setMeta("property", "og:title", ogTitle);
  setMeta("property", "og:description", ogDescription);
  setMeta("property", "og:url", canonical);
  setMeta("property", "og:image", ogImage);
  setMeta("property", "og:type", ogType);
  setMeta("property", "og:site_name", "Gaetano Ficarra");
  setMeta("property", "og:locale", "de_DE");

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", ogTitle);
  setMeta("name", "twitter:description", ogDescription);
  setMeta("name", "twitter:image", ogImage);
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
  const canonicalUrl = canonical || `${BASE_URL}${window.location.pathname}`;
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDesc = ogDescription || description;

  // Apply critical tags synchronously during render — ensures they exist
  // in the DOM before Puppeteer snapshots, regardless of useEffect timing.
  const appliedRef = useRef(false);
  if (!appliedRef.current) {
    applyCriticalTags(title, description, canonicalUrl, resolvedOgTitle, resolvedOgDesc, ogImage, ogType);
    appliedRef.current = true;
  }

  useEffect(() => {
    // Re-apply on prop changes (client-side navigation)
    applyCriticalTags(title, description, canonicalUrl, resolvedOgTitle, resolvedOgDesc, ogImage, ogType);

    // Track IDs for cleanup on unmount
    const scriptIds: string[] = [];

    // Global Person schema
    upsertJsonLd("seo-person-ld", {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Gaetano Ficarra",
      "jobTitle": "Marketing Automation Berater für Selbstständige",
      "url": BASE_URL,
      "image": `${BASE_URL}/og-image.png`,
      "address": { "@type": "PostalAddress", "addressLocality": "Bielefeld", "addressCountry": "DE" },
      "sameAs": [
        "https://www.linkedin.com/in/gaetano-ficarra/",
        "https://www.instagram.com/gaetano.ficarra/",
        "https://share.google/x4un2oyPVnb9DxDXL"
      ]
    });
    scriptIds.push("seo-person-ld");

    // Global ProfessionalService schema
    upsertJsonLd("seo-professional-service-ld", {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Gaetano Ficarra",
      "description": "Marketing Automation Berater für Selbstständige, Coaches und Dienstleister im DACH-Raum. Zertifizierter GoHighLevel Admin aus Bielefeld.",
      "url": BASE_URL,
      "image": `${BASE_URL}/og-image.png`,
      "address": { "@type": "PostalAddress", "addressLocality": "Bielefeld", "addressRegion": "NRW", "addressCountry": "DE" },
      "areaServed": [
        { "@type": "Country", "name": "Deutschland" },
        { "@type": "Country", "name": "Österreich" },
        { "@type": "Country", "name": "Schweiz" }
      ],
      "priceRange": "€€",
      "knowsAbout": ["GoHighLevel", "Funnelmate", "Marketing Automation", "CRM", "Funnel Building", "Marketing Automation Beratung", "CRM Setup", "Business Systeme"]
    });
    scriptIds.push("seo-professional-service-ld");

    // Breadcrumbs
    if (breadcrumbs && breadcrumbs.length > 0) {
      upsertJsonLd("seo-breadcrumb-ld", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((bc, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": bc.name,
          "item": bc.url,
        })),
      });
      scriptIds.push("seo-breadcrumb-ld");
    }

    // Page-specific schemas
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => {
        upsertJsonLd(`seo-page-ld-${i}`, { "@context": "https://schema.org", ...schema });
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
  }, [title, description, canonicalUrl, resolvedOgTitle, resolvedOgDesc, ogImage, ogType, jsonLd, breadcrumbs]);

  return null;
};

export default SEOHead;
