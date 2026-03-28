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
  noIndex?: boolean;
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

const removeMeta = (attr: string, key: string) => {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
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

const resolveCanonical = (canonical: string | undefined, pathname: string): string => {
  const raw = canonical || `${BASE_URL}${pathname}`;
  const isHome = raw === BASE_URL || raw === `${BASE_URL}/`;
  return isHome ? `${BASE_URL}/` : raw.replace(/\/+$/, "");
};

const applyAllTags = (
  title: string,
  description: string,
  canonicalUrl: string,
  ogTitle: string,
  ogDescription: string,
  ogImage: string,
  ogType: string,
  noIndex: boolean,
) => {
  document.title = title;
  setMeta("name", "description", description);
  setCanonical(canonicalUrl);

  setMeta("property", "og:title", ogTitle);
  setMeta("property", "og:description", ogDescription);
  setMeta("property", "og:url", canonicalUrl);
  setMeta("property", "og:image", ogImage);

  // Fix K2: og:image:alt ohne Duplikat
  const altText = ogTitle.includes("Gaetano Ficarra") ? ogTitle : `${ogTitle} — Gaetano Ficarra`;
  setMeta("property", "og:image:alt", altText);

  // Fix H6: og:image:width/height nur für Standard-Bild
  if (ogImage === `${BASE_URL}/og-image.png`) {
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:type", "image/png");
  } else {
    removeMeta("property", "og:image:width");
    removeMeta("property", "og:image:height");
    removeMeta("property", "og:image:type");
  }

  setMeta("property", "og:type", ogType);
  setMeta("property", "og:site_name", "Gaetano Ficarra");
  setMeta("property", "og:locale", "de_DE");

  setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@gaetano_ficarra");
    setMeta("name", "twitter:creator", "@gaetano_ficarra");
  setMeta("name", "twitter:title", ogTitle);
  setMeta("name", "twitter:description", ogDescription);
  setMeta("name", "twitter:image", ogImage);
  // Fix N4: twitter:image:alt setzen
  setMeta("name", "twitter:image:alt", altText);

  if (noIndex) {
    setMeta("name", "robots", "noindex, nofollow");
  } else {
    setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  }
};

const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = `${BASE_URL}/og-image.png`,
  ogType = "website",
  noIndex = false,
  jsonLd,
  breadcrumbs,
}: SEOHeadProps) => {
  const canonicalUrl = resolveCanonical(canonical, window.location.pathname);
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDesc = ogDescription || description;

  const appliedRef = useRef<string>("");
  const currentKey = `${title}|${canonicalUrl}|${noIndex}`;
  if (appliedRef.current !== currentKey) {
    applyAllTags(title, description, canonicalUrl, resolvedOgTitle, resolvedOgDesc, ogImage, ogType, noIndex);
    appliedRef.current = currentKey;
  }

  useEffect(() => {
    applyAllTags(title, description, canonicalUrl, resolvedOgTitle, resolvedOgDesc, ogImage, ogType, noIndex);

    const scriptIds: string[] = [];

    upsertJsonLd("seo-person-ld", {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Gaetano Ficarra",
      jobTitle: "Marketing Automation Berater für Selbstständige",
      url: BASE_URL,
      image: `${BASE_URL}/og-image.png`,
      address: { "@type": "PostalAddress", addressLocality: "Bielefeld", addressCountry: "DE" },
      // Fix M7: share.google entfernt, nur valide sameAs-URLs
      sameAs: ["https://www.linkedin.com/in/gaetano-ficarra/", "https://www.instagram.com/gaetano.ficarra_/"],
    });
    scriptIds.push("seo-person-ld");

    upsertJsonLd("seo-professional-service-ld", {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Gaetano Ficarra",
      description:
        "Done-for-you Business Systeme für selbstständige Coaches, Berater und Dienstleister. Funnel aufbauen lassen, CRM einrichten und Prozesse automatisieren – in 2 Wochen.",
      url: BASE_URL,
      image: `${BASE_URL}/og-image.png`,
      telephone: "+4915223856537",
      email: "kontakt@gaetanoficarra.de",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Elverdisser Str. 51",
        addressLocality: "Bielefeld",
        postalCode: "33729",
        addressRegion: "NRW",
        addressCountry: "DE",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      areaServed: [
        { "@type": "Country", name: "Deutschland" },
        { "@type": "Country", name: "Österreich" },
        { "@type": "Country", name: "Schweiz" },
      ],
      priceRange: "€€",
      hasMap: "https://maps.google.com/?q=Elverdisser+Str.+51,+33729+Bielefeld",
      knowsAbout: [
        "Business Systeme",
        "Funnel aufbauen lassen",
        "CRM einrichten",
        "Prozesse automatisieren",
        "GoHighLevel",
        "Coaching Business skalieren",
        "Done-for-you Setup",
        "Marketing Automation",
      ],
    });
    scriptIds.push("seo-professional-service-ld");

    if (breadcrumbs && breadcrumbs.length > 0) {
      upsertJsonLd("seo-breadcrumb-ld", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((bc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: bc.name,
          item: bc.url,
        })),
      });
      scriptIds.push("seo-breadcrumb-ld");
    }

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => {
        upsertJsonLd(`seo-page-ld-${i}`, { "@context": "https://schema.org", ...schema });
        scriptIds.push(`seo-page-ld-${i}`);
      });
    }

    return () => {
      scriptIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, [
    title,
    description,
    canonicalUrl,
    resolvedOgTitle,
    resolvedOgDesc,
    ogImage,
    ogType,
    noIndex,
    jsonLd,
    breadcrumbs,
  ]);

  return null;
};

export default SEOHead;
