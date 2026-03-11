

## SEO-Analyse und Optimierungsplan

### Das Problem

Die SEO-Analyse hat drei kritische Probleme identifiziert, die alle auf die SPA-Architektur (React + Vite) zuruckzufuhren sind:

1. **Canonical-Tag ist auf allen Seiten identisch** (`https://gaetanoficarra.de/`) -- Google behandelt alle Unterseiten als Duplikate der Startseite
2. **Identisches HTML fur alle Seiten** -- Crawler sehen nur das leere `<div id="root"></div>`
3. **Keine seitenspezifischen Meta-Tags im Server-HTML** -- Title, Description, OG-Tags sind nur fur die Startseite gesetzt

### Was wir innerhalb von Lovable (Vite/React SPA) losen konnen

Lovable unterstutzt kein SSR/SSG (kein Next.js, kein Astro). Wir konnen aber trotzdem **deutliche Verbesserungen** erzielen:

#### 1. Dynamische Meta-Tags pro Seite (client-seitig)

Eine `useSEO`-Hook oder `SEOHead`-Komponente erstellen, die per `document.title`, `document.querySelector('meta[name="description"]')` etc. die Meta-Tags **dynamisch pro Seite aktualisiert** -- inkl. Canonical, OG-Tags.

Google rendert JavaScript und wird diese Tags dann korrekt lesen (mit Verzogerung, aber es funktioniert).

**Betroffene Seiten:** Index, Leistungen, HighLevelVsFunnelmate, Blog, BlogArticle, Links, UTMGenerator, WAGenerator, Impressum, Datenschutz, AGB

#### 2. Canonical-Tag dynamisch pro Seite setzen

Statt des hartcodierten `<link rel="canonical" href="https://gaetanoficarra.de/" />` in `index.html` wird der Canonical per JavaScript auf die aktuelle URL gesetzt. Das ist der wichtigste Fix.

#### 3. Sitemap aktualisieren

Blog-Seite (`/blog`) zur Sitemap hinzufugen, `lastmod`-Daten aktualisieren.

#### 4. Prerendering fur Crawler (empfohlen, aber extern)

Fur maximale SEO-Wirkung wird empfohlen, **nach dem Deployment** einen Prerendering-Service (z.B. Prerender.io, Cloudflare Workers) einzurichten. Das ist ausserhalb von Lovable und wird als Empfehlung dokumentiert.

### Technischer Plan

**Neue Datei: `src/components/SEOHead.tsx`**
- React-Komponente die `useEffect` nutzt um `document.title`, meta description, canonical, OG-Tags dynamisch zu setzen
- Props: `title`, `description`, `canonical`, `ogTitle`, `ogDescription`, `ogImage`
- Entfernt/aktualisiert bestehende Meta-Tags im `<head>`

**Anderung: `index.html`**
- Canonical-Tag entfernen (wird dynamisch gesetzt)
- Standard-Meta-Tags als Fallback behalten

**Anderung: Jede Page-Komponente**
- `<SEOHead>` mit seitenspezifischen Werten einbinden
- Z.B. `/leistungen` bekommt `canonical="https://gaetanoficarra.de/leistungen"`, eigenen Title, eigene Description

**Anderung: `public/sitemap.xml`**
- `/blog` hinzufugen
- Daten aktualisieren

**Anderung: `src/pages/BlogArticle.tsx`**
- Bestehende `<title>` und `<meta>` Tags durch `<SEOHead>` ersetzen

### Was das NICHT lost

- Der initiale HTML-Source bleibt fur alle Seiten identisch (SPA-Limitierung)
- Crawler die kein JS ausfuhren sehen weiterhin leeres HTML
- **Empfehlung:** Prerender.io oder ahnlichen Service einrichten -- das ist die einzige Losung fur das "leeres HTML"-Problem innerhalb einer SPA-Architektur

